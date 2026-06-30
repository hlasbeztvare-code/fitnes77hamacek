import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkComgatePayment } from '@/lib/comgate';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    const transId = params.get('transId');
    const refId = params.get('refId'); // Naše Order ID

    if (!transId || !refId) {
      return new NextResponse('code=1&message=Missing parameters', { 
        status: 400,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
    }

    // 1. Anti-Spoofing: Nebereme status z webhooku naslepo.
    // Zavoláme přímo Comgate API, abychom měli 100% jistotu o stavu platby.
    const actualStatus = await checkComgatePayment(transId);

    // 3. Spuštění business logiky po úspěšném zaplacení
    if (actualStatus === 'PAID') {
      const order = await prisma.order.findUnique({ where: { id: refId } });
      
      if (order && order.status !== 'PAID') { // Zabráníme dvojímu odečtení, pokud Comgate pošle webhook vícekrát
        // A) Změna statusu
        await prisma.order.update({
          where: { id: refId },
          data: { status: 'PAID' },
        });

        // B) Odečtení skladu
        const items = typeof order.itemsJson === 'string' ? JSON.parse(order.itemsJson) : order.itemsJson;
        for (const item of items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          }).catch(err => console.error(`Nepodařilo se odečíst sklad pro ${item.productId}:`, err));
        }

        // C) Odeslání e-mailu zákazníkovi a Telegramu Hamáčkovi (asynchronně)
        const { sendOrderConfirmationEmail } = await import('@/lib/email');
        const { sendTelegramNotification } = await import('@/lib/telegram');
        
        sendOrderConfirmationEmail(order).catch(console.error);
        sendTelegramNotification(order).catch(console.error);
      }
    } else {
      // Pokud platba selže / je zamítnuta, jen zaktualizujeme status
      await prisma.order.update({
        where: { id: refId },
        data: { status: actualStatus },
      });
    }

    // Comgate striktně vyžaduje odpověď v tomto formátu
    return new NextResponse('code=0&message=OK', { 
      status: 200,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    
    // Pokud je chyba Prisma (nenalezená objednávka), Comgate dostane code=1, aby věděl o chybě
    return new NextResponse('code=1&message=Internal error', { 
      status: 500,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }
}

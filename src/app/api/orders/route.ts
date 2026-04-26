import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';


const orderSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/),
  shippingMethod: z.enum(['zasilkovna', 'ppl', 'pickup']),
  items: z.array(z.object({
    id: z.string(),
    variantCode: z.string().optional(),
    quantity: z.number().min(1),
  })).min(1),
});

/**
 * GOLIÁŠ | Shoptet Order Bridge
 * Push objednávky do Shoptet systému pro fakturaci.
 */
async function sendToShoptet(orderData: any) {
  // TODO: Připojit Shoptet API v3.1
  console.log("🛠️ GOLIÁŠ Bridge: Pushing to Shoptet...", orderData.items.length, "items");
  return { success: true };
}

async function sendToTelegram(orderData: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.HAMACEK_CHAT_ID;

  if (!botToken || !chatId) return;

  const itemsList = orderData.items.map((item: any) => `• ${item.name} (${item.quantity}ks)`).join('\n');
  const message = `🚀 *NOVÁ OBJEDNÁVKA!* \n\n👤 *Klient:* ${orderData.firstName} ${orderData.lastName}\n📍 *Město:* ${orderData.city}\n📦 *Doprava:* ${orderData.shippingMethod.toUpperCase()}\n\n*POLOŽKY:*\n${itemsList}\n\n💰 *CELKEM: ${orderData.total} Kč*\n\n_Šéfe, jdi do gymu vyskladňovat!_ 🦾`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch (err) {
    console.error('Telegram Notify Error:', err);
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const validated = orderSchema.safeParse(rawBody);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid order data', issues: validated.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, address, city, zip, items, shippingMethod } = validated.data;

    const productIds = items.map(item => item.id);
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    let calculatedTotal = 0;
    const finalItems = items.map(item => {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) throw new Error('Product not found');
      calculatedTotal += product.price * item.quantity;
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const shippingPrice = shippingMethod === 'zasilkovna' ? 89 : (shippingMethod === 'ppl' ? 129 : 0);
    const finalTotal = calculatedTotal + shippingPrice;

    const order = await db.order.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        zip,
        total: finalTotal,
        itemsJson: JSON.stringify(finalItems),
      },
    });

    // 1. PUSH TO SHOPTET (Faktury, Doprava)
    await sendToShoptet({
        ...validated.data,
        items: finalItems,
        shippingPrice
    });

    // 2. NOTIFY JAROSLAV ON TELEGRAM (Vyskladnění)
    await sendToTelegram({
        ...validated.data,
        items: finalItems,
        total: finalTotal
    });

    // 3. STOCK MONITORING & WARNINGS
    for (const item of finalItems) {
        const updatedProduct = await db.product.update({
            where: { id: item.id },
            data: { stock: { decrement: item.quantity } }
        });

        if (updatedProduct.stock <= 3) {
            const botToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.HAMACEK_CHAT_ID;
            if (botToken && chatId) {
                const warning = `⚠️ *VAROVÁNÍ: DOCHÁZÍ ZÁSOBY!* \n\nProdukt: *${updatedProduct.name}*\nAktuální stav: *${updatedProduct.stock} ks*\n\n_Šéfe, objednej další, jinak budeme mít prázdný regály!_ 📉`;
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: warning, parse_mode: 'Markdown' })
                });
            }
        }
    }

    // 4. GENERATE SHOPTET PAYMENT LINK (Bridge)
    // GOLIÁŠ v4.0: Shoptet nás na lomítko přesměrovává, tak tam půjdeme rovnou, aby se neztratil POST.
    const shoptetBaseUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
    
    const queryParams = new URLSearchParams();
    queryParams.append('action', 'Cart:addBatch'); // Plný název akce
    
    items.forEach(i => {
      const dbProduct = dbProducts.find(p => p.id === i.id);
      const code = i.variantCode || dbProduct?.shoptetId || dbProduct?.slug || i.id; 
      queryParams.append(`products[${code}]`, i.quantity.toString());
    });
    
    const paymentRedirectUrl = `${shoptetBaseUrl}?${queryParams.toString()}`;

    return NextResponse.json({ 
        success: true, 
        orderId: order.id,
        redirectUrl: paymentRedirectUrl 
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    
    // POSLAT SOS NA TELEGRAM (ROZDĚLENÉ)
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const hamacekId = process.env.HAMACEK_CHAT_ID;
    const honzaId = '7968309829'; // Honza

    if (botToken) {
        // 1. DETAIL PRO HONZU
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: honzaId,
                text: `🚨 *WEB SOS: OBJEDNÁVKA SELHALA!*\n\nDetail chyby: \`${error.message}\`\n\n_Honzo, koukni na to!_ 🕵️‍♂️`,
                parse_mode: 'Markdown'
            })
        }).catch(() => {});

        // 2. KLID PRO JARSU
        if (hamacekId && hamacekId !== honzaId) {
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: hamacekId,
                    text: `⚠️ *Šéfe, máme malej zásek v pokladně.*\n\nNičeho se neboj, Honza už o tom ví a dává to dohromady. 🦾`,
                    parse_mode: 'Markdown'
                })
            }).catch(() => {});
        }
    }

    return NextResponse.json(
      { success: false, error: 'Order processing failed' },
      { status: 500 }
    );
  }
}

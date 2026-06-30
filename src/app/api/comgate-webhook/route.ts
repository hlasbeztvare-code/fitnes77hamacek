import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Comgate odesílá POST request s daty formátovanými jako application/x-www-form-urlencoded
export async function POST(req: Request) {
  try {
    const textBody = await req.text();
    const params = new URLSearchParams(textBody);
    
    const transId = params.get('transId');
    const refId = params.get('refId');
    const status = params.get('status');
    // const secret = params.get('secret'); // Zde bychom mohli validovat IP Comgatu či secret, ale dle oficiální docs Comgate posílá background http POST

    if (!transId || !refId || !status) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: refId }
    });

    if (!order) {
      return new NextResponse('OK', { status: 200 }); // Comgate expects 200 OK or it retries
    }

    // Aktualizace objednávky na základě stavu platby
    if (status === 'PAID') {
      // V produkci přidat logiku odečtení stocku, odeslání emailu, atd.
      // prisma.product.update(...)
      console.log(`Objednávka ${refId} zaplacena.`);
    } else if (status === 'CANCELLED') {
      console.log(`Platba pro objednávku ${refId} zrušena.`);
    }

    // Musíme vrátit plain text s "OK" podle Comgate specifikace (code=0&message=OK)
    return new NextResponse('code=0&message=OK', {
      status: 200,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

  } catch (error) {
    console.error('Comgate Webhook Error:', error);
    return new NextResponse('code=1&message=Error', { status: 500 });
  }
}

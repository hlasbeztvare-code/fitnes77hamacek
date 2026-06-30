import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json({ error: 'Chybí parametr ids' }, { status: 400 });
    }

    const ids = idsParam.split(',').filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json({ prices: {} });
    }

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: { id: true, price: true, stock: true }
    });

    // Mapování id -> price & stock
    const pricesMap: Record<string, { price: number, stock: number }> = {};
    for (const product of products) {
      pricesMap[product.id] = {
        price: product.price,
        stock: product.stock,
      };
    }

    return NextResponse.json({ prices: pricesMap }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });

  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

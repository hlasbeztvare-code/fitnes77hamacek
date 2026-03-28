import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const products = await db.product.findMany({
    select: {
      name: true,
      slug: true,
      category: true,
    },
  });

  return NextResponse.json(products);
}

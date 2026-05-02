import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Bezpečnostní kernel: Jen pro majitele
  if (secret !== 'GOLIAS_SVR_31_SECRET_KEY_8877') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log("🚀 Zahajuji synchronizaci cen přes Prisma Bridge...");
    const updates = [
      { name: 'Creatine', price: 555 },
      { name: 'Kreatin', price: 555 },
      { name: 'Black Dead', price: 990 },
      { name: 'Dead Pump', price: 990 },
      { name: 'Glutamine', price: 580 },
      { name: 'Opasek', price: 1890 },
      { name: 'Kase', price: 90 },
      { name: 'Kaše', price: 90 }
    ];

    const results = [];

    for (const update of updates) {
      const products = await db.product.findMany({
        where: {
          name: { contains: update.name, mode: 'insensitive' }
        }
      });

      for (const product of products) {
        // Hluboká aktualizace variant (pokud existují)
        let updatedVariants = product.variants;
        if (Array.isArray(updatedVariants)) {
          updatedVariants = updatedVariants.map((v: any) => ({
            ...v,
            price: update.price
          }));
        }

        await db.product.update({
          where: { id: product.id },
          data: {
            price: update.price,
            variants: updatedVariants || []
          }
        });

        results.push(`✅ ${product.name} -> ${update.price} Kč`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Synchronizace dokončena přes L-CODE Prisma Bridge',
      log: results
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

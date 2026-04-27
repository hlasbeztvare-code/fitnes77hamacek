import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GOLIÁŠ Sync v6.0: ID Mapping Logic (Aligned with orders/route.ts)
const SHOPTET_MANUAL_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': '58',
  'heavy-duty-powerlifting-opasek': '46',
  'black-dead---pre-workout': '52',
  'dead-pump---stim-free': '49',
  'ryzova-kase': '79',
};

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'Invalid items' }, { status: 400 });
    }

    const productIds = items.map(item => item.id);
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    const shoptetItems = items.map(item => {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) return null;

      // 1. Resolve priceId (Priorita: variantCode -> shoptetId -> Manual Map -> ID)
      let priceId = (item.variantCode && /^\d+$/.test(item.variantCode)) ? item.variantCode : null;
      if (!priceId) priceId = product.shoptetId;
      if (!priceId && SHOPTET_MANUAL_MAP[product.slug]) {
        priceId = SHOPTET_MANUAL_MAP[product.slug];
      }
      if (!priceId && /^\d+$/.test(product.id)) {
        priceId = product.id;
      }

      if (!priceId) return null;

      return {
        priceId: priceId,
        amount: item.quantity
      };
    }).filter(item => item !== null);

    // Vracíme shoptetItems pro JIT Bridge formulářový výstřel
    return NextResponse.json({ 
      success: true, 
      shoptetItems
    });
  } catch (error: any) {
    console.error('🛒 Cart Sync Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
// "Zameť stopy" - Cart Sync Bridge v10.0: Logicky neprůstřelné mapování pro "Výstřel". smrk

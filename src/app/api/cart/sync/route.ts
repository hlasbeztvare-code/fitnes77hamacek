import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GOLIÁŠ Sync v8.0 — 100% verified from productsComplete.xml export
// SHOPITEM id = priceId pro produkty BEZ variant
const SHOPTET_MANUAL_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': '55',  // SHOPITEM id=55, CODE=55
  'black-dead---pre-workout':          '49',  // SHOPITEM id=49, CODE=49 ✓
  'dead-pump---stim-free':             '46',  // SHOPITEM id=46, CODE=46 ✓
  'heavy-duty-powerlifting-opasek':    '43',  // SHOPITEM id=43, CODE=43
  // Fallback pro variantové produkty (pokud chybí variantCode)
  'ryzova-kase':                       '79',  // default = Čokoláda (VARIANT id=79)
  'bcaa-411-glutamine---fitness-77':   '67',  // default = Grep (VARIANT id=67)
};

// VARIANT id = interní Shoptet ID varianty (z VARIANT id="..." v XML)
const SHOPTET_VARIANT_MAP: Record<string, string> = {
  // Rýžová Kaše — SHOPITEM id=61
  'COK': '79',  // Čokoláda      (VARIANT id=79, CODE=61/COK)
  'PIS': '85',  // Piškotový dort (VARIANT id=85, CODE=61/PIS)
  'SLA': '82',  // Slaný karamel  (VARIANT id=82, CODE=61/SLA)
  // BCAA 4:1:1 + Glutamine — SHOPITEM id=58
  'BOR': '73',  // Borůvka  (VARIANT id=73, CODE=58/BOR)
  'GRE': '67',  // Grep     (VARIANT id=67, CODE=58/GRE)
  'MAL': '70',  // Malina   (VARIANT id=70, CODE=58/MAL)
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

      let priceId: string | null = null;

      // 1. Priorita: variantCode přes VARIANT_MAP (pro BCAA, Rýžová kaše)
      if (item.variantCode) {
        const variantUpper = item.variantCode.toUpperCase();
        if (SHOPTET_VARIANT_MAP[variantUpper]) {
          priceId = SHOPTET_VARIANT_MAP[variantUpper];
        }
        // Pokud je variantCode přímo číslice (interní ID)
        else if (/^\d+$/.test(item.variantCode)) {
          priceId = item.variantCode;
        }
      }

      // 2. shoptetId z DB
      if (!priceId) priceId = product.shoptetId ?? null;

      // 3. Manual mapa ze slug
      if (!priceId && SHOPTET_MANUAL_MAP[product.slug]) {
        priceId = SHOPTET_MANUAL_MAP[product.slug];
      }

      // 4. Fallback: product.id pokud je číslice
      if (!priceId && /^\d+$/.test(product.id)) {
        priceId = product.id;
      }

      if (!priceId) return null;

      return {
        priceId,
        amount: item.quantity,
      };
    }).filter(item => item !== null);

    return NextResponse.json({ success: true, shoptetItems });

  } catch (error: any) {
    console.error('🛒 Cart Sync Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
// „Zameť stopy" — GOLIÁŠ Sync v8.0: VARIANT id mapování z XML. Logicky neprůstřelné. smrk

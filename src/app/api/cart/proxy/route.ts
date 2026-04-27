import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items' }, { status: 400 });
    }

    // Načti produkty z DB
    const productIds = items.map(item => item.id);
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, shoptetId: true, slug: true, variants: true },
    });

    // Sestav shoptetItems s priceId z DB
    const shoptetItems = [];
    for (const item of items) {
      const product = products.find(p => p.id === item.id);
      if (!product) continue;

      let priceId: string | null = null;
      let productId: string | null = null;

      // Pokud má variantCode → najdi v variants poli
      if (item.variantCode && product.variants) {
        const variants = Array.isArray(product.variants) ? product.variants : JSON.parse(product.variants as any);
        const variant = variants.find((v: any) => 
          v.code?.toUpperCase().includes(item.variantCode.toUpperCase()) ||
          v.name?.toUpperCase() === item.variantCode.toUpperCase()
        );
        if (variant?.code) {
          priceId = variant.code; // např. "58/GRE"
          productId = variant.code.split('/')[0]; // např. "58"
        }
      }

      // Fallback na shoptetId z produktu
      if (!priceId && product.shoptetId) {
        priceId = product.shoptetId;
        productId = product.shoptetId.split('/')[0];
      }

      if (priceId && productId) {
        shoptetItems.push({
          priceId,
          productId,
          amount: item.quantity,
        });
      }
    }

    if (shoptetItems.length === 0) {
      return NextResponse.json({ success: false, error: 'No valid items' }, { status: 400 });
    }

    // Zavolej Shoptet addCartItem pro každý produkt
    const cookieHeader = req.headers.get('cookie') || '';
    const results = [];

    for (const item of shoptetItems) {
      const body = new URLSearchParams({
        priceId: item.priceId,
        productId: item.productId,
        amount: item.amount.toString(),
        language: 'cs',
      });

      const response = await fetch('https://obchod.fit77.cz/action/Cart/addCartItem/?simple_ajax_cart=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader,
        },
        body: body.toString(),
      });

      results.push({ priceId: item.priceId, status: response.status });
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Cart proxy error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { resolveShoptetIds } from '@/lib/shoptet-map';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    // GOLIÁŠ Proxy v13.0: Server-side ID Resolver
    const shoptetItems = items.map(item => {
      const ids = resolveShoptetIds(item.slug, item.variantCode);
      return {
        priceId: ids?.priceId,
        productId: ids?.productId,
        amount: item.quantity
      };
    }).filter(item => item.priceId);

    if (shoptetItems.length === 0) {
      return NextResponse.json({ error: 'No valid Shoptet IDs found' }, { status: 400 });
    }

    // Konstrukce addBatch URL
    // Formát: ?priceId[]=123&amount[]=1&priceId[]=456&amount[]=2
    const baseUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
    const params = new URLSearchParams();
    
    shoptetItems.forEach(item => {
      params.append('priceId[]', item.priceId!.toString());
      params.append('amount[]', item.amount.toString());
    });

    const finalUrl = `${baseUrl}?${params.toString()}`;

    return NextResponse.json({ 
      success: true, 
      redirectUrl: finalUrl 
    });

  } catch (error) {
    console.error('[GOLIÁŠ PROXY] Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// clean code comment: GOLIÁŠ Proxy Engine v13.0. Server-side batch generation. smrk

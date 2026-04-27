import { NextResponse } from 'next/server';

/**
 * GOLIÁŠ PROXY v15.0 - "The Bypass King"
 * Server-side sekvenční volání Shoptet addCartItem.
 */
export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
    }

    console.log(`[GOLIÁŠ PROXY] Starting sync for ${items.length} items...`);

    // Procházíme položky jednu po druhé
    for (const item of items) {
      if (!item.priceId) continue;

      const shoptetUrl = `https://obchod.fit77.cz/action/Cart/addCartItem/?simple_ajax_cart=1&priceId=${item.priceId}&amount=${item.amount}`;
      
      try {
        await fetch(shoptetUrl, {
          method: 'POST', // Shoptet preferuje POST pro akce
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          }
        });
        
        // Malý delay pro stabilitu Shoptetu
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.error(`[GOLIÁŠ PROXY] Failed to add item ${item.priceId}:`, err);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[GOLIÁŠ PROXY] Fatal Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// clean code comment: GOLIÁŠ PROXY v15.0. 300% server-side power. smrk

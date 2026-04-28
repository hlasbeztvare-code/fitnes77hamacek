import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items' }, { status: 400 });
    }

    let shoptetSessionId = '';

    for (const item of items) {
      const body = new URLSearchParams({
        priceId: item.priceId.toString(),
        productId: item.productId.toString(),
        amount: item.amount.toString(),
        language: 'cs',
      });

      const response = await fetch('https://obchod.fit77.cz/action/Cart/addCartItem/?simple_ajax_cart=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Origin': 'https://obchod.fit77.cz',
          'Referer': 'https://obchod.fit77.cz/',
          'Accept': 'application/json, text/javascript, */*; q=0.01',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Cookie': shoptetSessionId ? `PHPSESSID=${shoptetSessionId}` : '',
        },
        body: body.toString(),
      });

      // Získat Set-Cookie od Shoptetu a vyextrahovat PHPSESSID
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        const match = setCookie.match(/PHPSESSID=([^;]+)/);
        if (match && match[1]) {
          shoptetSessionId = match[1];
        }
      }
    }

    // Máme naplněnou session a její ID. Teď ji předáme Next.js klientovi přímo v JSONu.
    return NextResponse.json({ 
      success: true, 
      shoptetSessionId: shoptetSessionId 
    });
  } catch (error: any) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

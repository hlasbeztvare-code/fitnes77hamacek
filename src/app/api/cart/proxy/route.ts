import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items' }, { status: 400 });
    }

    const cookieHeader = req.headers.get('cookie') || '';
    const results = [];
    let lastSetCookie = '';

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
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': cookieHeader + (lastSetCookie ? '; ' + lastSetCookie : ''),
          'Origin': 'https://obchod.fit77.cz',
          'Referer': 'https://obchod.fit77.cz/',
        },
        body: body.toString(),
      });

      const setCookie = response.headers.get('set-cookie');
      if (setCookie) lastSetCookie = setCookie;

      results.push({ priceId: item.priceId, status: response.status });
    }

    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (lastSetCookie) headers.set('Set-Cookie', lastSetCookie);

    return new Response(JSON.stringify({ success: true, results }), { status: 200, headers });
  } catch (error: any) {
    console.error('Cart proxy error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

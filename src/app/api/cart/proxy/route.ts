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
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': shoptetSessionId ? `PHPSESSID=${shoptetSessionId}` : '',
        },
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

    // Máme naplněnou session a její ID. Teď ji předáme Next.js klientovi.
    const res = NextResponse.json({ success: true });
    
    if (shoptetSessionId) {
      // Zásadní trik: Nastavujeme Cookie pro nadřazenou doménu .fit77.cz
      // Prohlížeč ji pak pošle i na obchod.fit77.cz
      const isDev = process.env.NODE_ENV === 'development';
      
      res.cookies.set('PHPSESSID', shoptetSessionId, {
        domain: isDev ? undefined : '.fit77.cz', // Na localhostu nepoužívat .fit77.cz
        path: '/',
        secure: !isDev,
        sameSite: 'lax',
        httpOnly: true, // Shoptet cookies jsou typicky HttpOnly
      });
    }

    return res;
  } catch (error: any) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

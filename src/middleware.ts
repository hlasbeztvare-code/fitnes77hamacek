import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** 
 * PRO TIP: Tady můžeme integrovat Vercel Edge Config.
 * Umožňuje to vypnout e-shop nebo přepnout do maintenance módu v řádu milisekund
 * bez nutnosti doplňovat kód nebo dělat nový build.
 */
export async function middleware(request: NextRequest) {
  // Příklad kontroly (pro budoucí nasazení):
  // const isMaintenance = await get('maintenance');
  // if (isMaintenance && !request.nextUrl.pathname.startsWith('/maintenance')) {
  //   return NextResponse.redirect(new URL('/maintenance', request.url));
  // }

  const response = NextResponse.next();
  const country = request.geo?.country || 'CZ';
  
  // Pokud uživatel nemá nastavenou měnu v cookie, nastavíme ji podle země
  if (!request.cookies.has('NEXT_CURRENCY')) {
    const currency = country === 'CZ' ? 'CZK' : 'EUR';
    // Cookie nastavíme s platností na rok
    response.cookies.set('NEXT_CURRENCY', currency, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

// Spouštíme middleware pouze na relevantních cestách
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

import { NextRequest, NextResponse } from 'next/server';
import { sendMetaCapiEvent } from '@/lib/meta-capi';

export const dynamic = 'force-dynamic';

// Web Crypto API – kompatibilní s Edge i Node.js bez nutnosti importovat "crypto"
async function hashValue(val: string): Promise<string | undefined> {
  if (!val) return undefined;
  const msgBuffer = new TextEncoder().encode(val.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

type PurchaseItemInput = {
  id?: string;
  shoptetProductId?: string;
  slug?: string;
  price?: number | string;
  quantity?: number;
};

export async function POST(req: NextRequest) {
  // Kontrola přítomnosti CAPI Tokenu v prostředí přímo na API route
  if (!process.env.META_CONVERSIONS_API_TOKEN) {
    const errMsg = '❌ ERROR: Chybí META_CONVERSIONS_API_TOKEN v proměnných prostředí! Měření nákupů padá.';
    console.error(errMsg);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }

  if (!process.env.META_PIXEL_ID) {
    const errMsg = '❌ ERROR: Chybí META_PIXEL_ID v proměnných prostředí! Měření nákupů padá.';
    console.error(errMsg);
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { orderId, value, currency, items, email, firstName, lastName } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Chybí povinný parametr orderId' },
        { status: 400 }
      );
    }

    // Získání klientských hlaviček (IP a User Agent)
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      undefined;
    const clientUserAgent = req.headers.get('user-agent') || undefined;

    // Příprava zahashovaných uživatelských dat (SHA-256 dle Meta specifikace)
    const userData: Record<string, string[]> = {};
    
    if (email) {
      const hashedEmail = await hashValue(email);
      if (hashedEmail) userData.em = [hashedEmail];
    }
    if (firstName) {
      const hashedFn = await hashValue(firstName);
      if (hashedFn) userData.fn = [hashedFn];
    }
    if (lastName) {
      const hashedLn = await hashValue(lastName);
      if (hashedLn) userData.ln = [hashedLn];
    }

    // Mapování položek objednávky
    const contents = Array.isArray(items)
      ? items.map((item: PurchaseItemInput) => ({
          id: item.shoptetProductId || item.id || item.slug || 'unknown',
          quantity: item.quantity || 1,
          item_price: parseFloat(String(item.price || '0')),
        }))
      : [];

    const result = await sendMetaCapiEvent({
      eventName: 'Purchase',
      eventId: orderId,
      value: parseFloat(String(value || '0')),
      currency: currency || 'CZK',
      clientIp,
      clientUserAgent,
      userData,
      customData: {
        content_type: 'product',
        contents,
      },
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('❌ Chyba v API route /api/orders/success:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

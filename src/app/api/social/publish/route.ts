/**
 * API Route: POST /api/social/publish
 * =====================================
 * Interní endpoint pro publikování obsahu na FB + IG.
 * Volá se automaticky po přidání nového produktu / blog postu.
 *
 * Zabezpečen INTERNAL_API_SECRET – volat jen server-side!
 */

import { NextRequest, NextResponse } from 'next/server';
import { publishToSocials, buildProductPost, buildBlogPost, buildPromoPost } from '@/lib/meta-social';

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  // Ověření interního secretu
  const secret = req.headers.get('x-internal-secret');
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { type, data } = body;

  let payload;
  switch (type) {
    case 'product':
      payload = buildProductPost(data);
      break;
    case 'blog':
      payload = buildBlogPost(data);
      break;
    case 'promo':
      payload = buildPromoPost(data.text, data.imageUrl);
      break;
    default:
      return NextResponse.json({ error: `Neznámý typ: ${type}` }, { status: 400 });
  }

  const result = await publishToSocials(payload);

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}

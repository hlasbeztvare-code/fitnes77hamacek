/**
 * API Route: POST /api/products/create
 * =========================================
 * Vytvoří nový produkt v DB a automaticky postuje na FB + IG.
 * Používáno Telegram botem i budoucím admin panelem.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { publishToSocials, buildProductPost } from '@/lib/meta-social';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret');
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  // Validace povinných polí
  const { name, slug, shortDescription, description, price, image, category } = body;
  if (!name || !slug || !category) {
    return NextResponse.json({ error: 'Chybí povinná pole: name, slug, category' }, { status: 400 });
  }

  // Ulož do DB
  const product = await db.product.create({
    data: {
      name,
      slug,
      shortDescription: shortDescription ?? '',
      description: description ?? '',
      price: price ?? 0,
      compareAtPrice: body.compareAtPrice ?? null,
      image: image ?? '/images/products/placeholder.webp',
      stock: body.stock ?? 0,
      category,
      featured: body.featured ?? false,
    },
  });

  // Automaticky postuj na sociální sítě (neblokuje odpověď)
  if (process.env.META_FB_PAGE_ACCESS_TOKEN) {
    const payload = buildProductPost({
      name: product.name,
      shortDescription: product.shortDescription,
      slug: product.slug,
      image: product.image,
      category: product.category,
    });
    publishToSocials(payload).catch((e) =>
      console.error('Social post se nezdařil:', e)
    );
  }

  return NextResponse.json({ success: true, product }, { status: 201 });
}

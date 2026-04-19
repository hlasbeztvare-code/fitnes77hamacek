import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await db.product.findMany();

    // Generování XML ve formátu Shoptet / Heureka (univerzální pro import)
    let xml = `<?xml version="1.0" encoding="utf-8"?>
<SHOP>
`;

    products.forEach((product) => {
      xml += `  <SHOPITEM>
    <ITEM_ID>${product.id}</ITEM_ID>
    <PRODUCTNAME>${product.name}</PRODUCTNAME>
    <DESCRIPTION>${product.description || ''}</DESCRIPTION>
    <URL>https://fitness77.cz/product/${product.slug}</URL>
    <IMGURL>https://fitness77.cz${product.image}</IMGURL>
    <PRICE_VAT>${product.price}</PRICE_VAT>
    <MANUFACTURER>Fitness 77</MANUFACTURER>
    <CATEGORYTEXT>${product.category === 'supplement' ? 'Suplementy' : 'Vybavení'}</CATEGORYTEXT>
    <STOCK_QUANTITY>${product.stock}</STOCK_QUANTITY>
  </SHOPITEM>
`;
    });

    xml += `</SHOP>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Shoptet Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate feed' }, { status: 500 });
  }
}

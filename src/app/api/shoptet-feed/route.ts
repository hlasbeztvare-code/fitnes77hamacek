import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await db.product.findMany();
    
    // Sestavení XML podle Shoptet specifikace (Heureka / Zboží formát, který Shoptet umí importovat)
    let xml = `<?xml version="1.0" encoding="utf-8"?>
<SHOP>`;

    products.forEach((product) => {
      // Shoptet potřebuje URL obrázku s celou doménou
      const imageUrl = product.image.startsWith('http') 
        ? product.image 
        : `https://fitness77.cz${product.image}`;

      xml += `
  <SHOPITEM>
    <ITEM_ID>${product.id}</ITEM_ID>
    <PRODUCTNAME>${product.name}</PRODUCTNAME>
    <DESCRIPTION><![CDATA[${product.description}]]></DESCRIPTION>
    <SHORT_DESCRIPTION><![CDATA[${product.shortDescription}]]></SHORT_DESCRIPTION>
    <PRICE_VAT>${product.price}</PRICE_VAT>
    <IMGURL>${imageUrl}</IMGURL>
    <MANUFACTURER>Fitness 77</MANUFACTURER>
    <CATEGORYTEXT>${product.category.toUpperCase()}</CATEGORYTEXT>
    <DELIVERY_DATE>0</DELIVERY_DATE>
  </SHOPITEM>`;
    });

    xml += `
</SHOP>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při generování feedu' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await db.product.findMany();
    
    // Hlavička CSV pro Shoptet (přesně podle specifikace pro import)
    // code;name;price;vat;short_description;description;image;category
    let csv = "code;name;price;vat;short_description;description;image;category\n";

    products.forEach((p) => {
      // Shoptet potřebuje URL obrázku s celou doménou
      const imageUrl = p.image.startsWith('http') 
        ? p.image 
        : `https://fitness77.cz${p.image}`;

      // Čištění dat pro CSV (odstranění středníků a zalomení řádků)
      const cleanDesc = p.description.replace(/;/g, ',').replace(/\n/g, ' ');
      const cleanShortDesc = p.shortDescription.replace(/;/g, ',').replace(/\n/g, ' ');

      csv += `${p.id};${p.name};${p.price};21;${cleanShortDesc};${cleanDesc};${imageUrl};${p.category}\n`;
    });

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename=shoptet_produkty.csv',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Chyba při generování CSV' }, { status: 500 });
  }
}

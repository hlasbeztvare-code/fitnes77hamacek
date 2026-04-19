import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get('key') || req.headers.get('x-api-key');
    const secret = process.env.API_SECRET_KEY || 'fitness77-super-secret-default-key';

    if (apiKey !== secret) {
      return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 403 });
    }

    const feedUrl = 'https://obchod.fit77.cz/universal.xml';
    const response = await fetch(feedUrl, { cache: 'no-store' });
    const xmlData = await response.text();
    
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      isArray: (name) => ['SHOPITEM'].indexOf(name) !== -1
    });
    const jsonObj = parser.parse(xmlData);
    const items = jsonObj?.SHOP?.SHOPITEM || [];

    const products = Array.isArray(items) ? items : (items ? [items] : []);
    console.log(`📦 Shoptet Sync: Nalezeno ${products.length} produktů ve feedu.`);

    for (const item of products) {
      if (!item.ITEM_ID) continue;

      const name = item.PRODUCTNAME || item.PRODUCT || 'Nepojmenovaný produkt';
      const slug = item.URL ? item.URL.split('/').pop()?.replace('.html', '') : slugify(name);
      
      // Inteligentní mapování kategorií
      const categoryText = (item.CATEGORYTEXT || '').toLowerCase();
      let category = 'supplement';
      
      if (categoryText.includes('vybaveni') || 
          categoryText.includes('opasky') || 
          categoryText.includes('trhacky') ||
          categoryText.includes('prislusenstvi')) {
        category = 'equipment';
      }

      await db.product.upsert({
        where: { id: String(item.ITEM_ID) },
        update: {
          name: name,
          price: parseFloat(item.PRICE_VAT || '0'),
          stock: parseInt(item.STOCK_AMOUNT || '0'),
          description: item.DESCRIPTION || '',
          shortDescription: item.DESCRIPTION?.substring(0, 160) || '',
          image: item.IMGURL || '',
          category: category,
        },
        create: {
          id: String(item.ITEM_ID),
          name: name,
          slug: slug || String(item.ITEM_ID),
          price: parseFloat(item.PRICE_VAT || '0'),
          stock: parseInt(item.STOCK_AMOUNT || '0'),
          description: item.DESCRIPTION || '',
          shortDescription: item.DESCRIPTION?.substring(0, 160) || '',
          image: item.IMGURL || '',
          category: category,
          featured: false
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: `Synchronizace dokončena. Zpracováno ${products.length} produktů.` 
    });
  } catch (error: any) {
    console.error("❌ Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

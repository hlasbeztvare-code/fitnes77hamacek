import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import { db } from '@/lib/db';
import { createHash } from 'crypto';

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

function generateStableId(url: string, name: string): string {
  if (url) return createHash('md5').update(url).digest('hex');
  return createHash('md5').update(name).digest('hex');
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get('key') || req.headers.get('x-api-key');
    const secret = process.env.INTERNAL_API_SECRET || 'fitness77-super-secret-default-key';

    if (apiKey !== secret) {
      return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 403 });
    }

    const feedUrl = process.env.SHOPTET_FEED_URL || 'https://obchod.fit77.cz/universal.xml';
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

    let processedCount = 0;

    for (const item of products) {
      const name = item.PRODUCTNAME || item.PRODUCT || 'Nepojmenovaný produkt';
      const itemUrl = item.URL || '';
      
      // Stabilní ID: Přednost má ITEM_ID, jinak hash z URL
      const stableId = item.ITEM_ID ? String(item.ITEM_ID) : generateStableId(itemUrl, name);
      
      const slug = itemUrl ? itemUrl.split('/').pop()?.replace('.html', '').split('?')[0] : slugify(name);
      
      // GOLIÁŠ Bridge: Extrakce variantId (priceId) pro přímé vložení do košíku
      const variantMatch = itemUrl.match(/[?&](variantId|priceId)=(\d+)/);
      let shoptetId = variantMatch ? variantMatch[2] : null;

      // DOOMSDAY FALLBACK: Shoptet feed často neobsahuje ID pro základní produkty.
      const SHOPTET_MANUAL_MAP: Record<string, string> = {
        'creatine-monohydrate---fitness-77': '58',
        'heavy-duty-powerlifting-opasek': '46',
        'black-dead---pre-workout': '64',
        'dead-pump---stim-free': '61',
      };

      if (!shoptetId && SHOPTET_MANUAL_MAP[slug]) {
        shoptetId = SHOPTET_MANUAL_MAP[slug];
      }

      // Inteligentní mapování kategorií
      const categoryText = (item.CATEGORYTEXT || '').toLowerCase();
      let category = 'supplement';
      if (categoryText.includes('vybaveni') || categoryText.includes('opasky') || categoryText.includes('trhacky') || categoryText.includes('prislusenstvi')) {
        category = 'equipment';
      }

      // DOOMSDAY FALLBACK: Shoptet feed často neobsahuje obrázky.
      const SHOPTET_IMAGE_MAP: Record<string, string> = {
        'creatine-monohydrate---fitness-77': 'creatine-pure.png',
        'black-dead---pre-workout': 'Blackdead.webp',
        'dead-pump---stim-free': 'Deadpump.webp',
        'bcaa-4-1-1-glutamine---fitness-77': 'bcaa.png',
        'ryzova-kase': 'rice-chocolate.png',
      };

      // Fallback pro obrázek (Shoptet někdy IMGURL nedává do universal.xml)
      const image = SHOPTET_IMAGE_MAP[slug] || item.IMGURL || '';

      await db.product.upsert({
        where: { slug: slug }, // Slug je v Shoptetu unikátní a stabilnější než chybějící ID
        update: {
          name: name,
          price: parseFloat(item.PRICE_VAT || '0'),
          oldPrice: item.PRICE_BEFORE_DISCOUNT ? parseFloat(item.PRICE_BEFORE_DISCOUNT) : null,
          stock: parseInt(item.STOCK_AMOUNT || '0'),
          description: item.DESCRIPTION || '',
          shortDescription: item.DESCRIPTION?.substring(0, 160) || '',
          image: image,
          category: category,
          shoptetId: shoptetId, 
        },
        create: {
          id: stableId,
          name: name,
          slug: slug,
          price: parseFloat(item.PRICE_VAT || '0'),
          oldPrice: item.PRICE_BEFORE_DISCOUNT ? parseFloat(item.PRICE_BEFORE_DISCOUNT) : null,
          stock: parseInt(item.STOCK_AMOUNT || '0'),
          description: item.DESCRIPTION || '',
          shortDescription: item.DESCRIPTION?.substring(0, 160) || '',
          image: image,
          category: category,
          featured: false,
          shoptetId: shoptetId,
        }
      });
      processedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `GOLIÁŠ Sync v9.0: Synchronizace dokončena. Zpracováno ${processedCount} produktů. smrk` 
    });
  } catch (error: any) {
    console.error("❌ Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
// "Zameť stopy" - synchronizace je čistá a logicky neprůstřelná. smrk

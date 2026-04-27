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
      isArray: (name) => ['SHOPITEM', 'item', 'ITEM'].indexOf(name) !== -1
    });
    const jsonObj = parser.parse(xmlData);
    
    // Detekce formátu a extrakce položek
    let rawItems = [];
    if (jsonObj?.SHOP?.SHOPITEM) rawItems = jsonObj.SHOP.SHOPITEM; // Shoptet Universal
    else if (jsonObj?.rss?.channel?.item) rawItems = jsonObj.rss.channel.item; // Google Merchant
    else if (jsonObj?.SHOP?.ITEM) rawItems = jsonObj.SHOP.ITEM; // Heureka
    
    const products = Array.isArray(rawItems) ? rawItems : (rawItems ? [rawItems] : []);
    console.log(`📦 GOLIÁŠ Sync v10.0: Nalezeno ${products.length} produktů (Detekován formát: ${jsonObj?.rss ? 'Google' : 'Shoptet/Heureka'}).`);

    let processedCount = 0;

    for (const item of products) {
      // Unifikované mapování polí napříč formáty
      const name = item.PRODUCTNAME || item.PRODUCT || item.title || item['g:title'] || 'Nepojmenovaný produkt';
      const itemUrl = item.URL || item.link || item['g:link'] || '';
      const description = item.DESCRIPTION || item.description || item['g:description'] || '';
      const priceStr = item.PRICE_VAT || item.price || item['g:price'] || '0';
      const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
      const imgUrl = item.IMGURL || item['g:image_link'] || item.image_link || '';
      
      // Stabilní ID
      const stableId = item.ITEM_ID || item['g:id'] || item.id || generateStableId(itemUrl, name);
      
      const slug = itemUrl ? itemUrl.split('/').pop()?.replace('.html', '').split('?')[0] : slugify(name);
      
      // GOLIÁŠ Bridge: Extrakce variantId (priceId)
      const variantMatch = itemUrl.match(/[?&](variantId|priceId)=(\d+)/);
      let shoptetId = variantMatch ? variantMatch[2] : null;

      // DOOMSDAY FALLBACK: Shoptet feed často neobsahuje ID pro základní produkty.
      const SHOPTET_MANUAL_MAP: Record<string, string> = {
        'creatine-monohydrate---fitness-77': '58',
        'heavy-duty-powerlifting-opasek': '46',
        'black-dead---pre-workout': '52',
        'dead-pump---stim-free': '49',
        'ryzova-kase-77': '79',
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
        'ryzova-kase-77': 'rice-chocolate.png',
        'heavy-duty-powerlifting-opasek': 'bcaa.png', // Fallback
      };

      // Fallback pro obrázek
      const image = SHOPTET_IMAGE_MAP[slug] || imgUrl || '';

      await db.product.upsert({
        where: { slug: slug },
        update: {
          name: name,
          price: price,
          oldPrice: item.PRICE_BEFORE_DISCOUNT ? parseFloat(item.PRICE_BEFORE_DISCOUNT) : null,
          stock: parseInt(item.STOCK_AMOUNT || item['g:availability'] === 'in stock' ? '10' : '0'),
          description: description,
          shortDescription: description?.substring(0, 160) || '',
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

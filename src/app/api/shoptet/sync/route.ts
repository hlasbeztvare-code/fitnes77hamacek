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

// GOLIÁŠ v10.5: Global ID Mapping for Critical Items
const SHOPTET_MANUAL_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': '58',
  'heavy-duty-powerlifting-opasek': '46',
  'black-dead---pre-workout': '52',
  'dead-pump---stim-free': '49',
  'ryzova-kase': '79', // Default variant for rice porridge
};

const SHOPTET_IMAGE_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': 'creatine-pure.png',
  'black-dead---pre-workout': 'Blackdead.webp',
  'dead-pump---stim-free': 'Deadpump.webp',
  'bcaa-4-1-1-glutamine---fitness-77': 'bcaa.png',
  'ryzova-kase': 'rice-chocolate.png',
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const apiKey = searchParams.get('key') || req.headers.get('x-api-key');
    const secret = process.env.INTERNAL_API_SECRET || 'fitness77-super-secret-default-key';

    if (apiKey !== secret) {
      return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 403 });
    }

    const feedUrl = process.env.SHOPTET_FEED_URL || 'https://obchod.fit77.cz/google/export/products.xml';
    console.log(`🔗 Fetching feed from: ${feedUrl}`);
    const response = await fetch(feedUrl, { cache: 'no-store' });
    const xmlData = await response.text();
    
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      isArray: (name) => ['SHOPITEM', 'item', 'ITEM'].indexOf(name) !== -1
    });
    const jsonObj = parser.parse(xmlData);
    
    let rawItems = [];
    if (jsonObj?.SHOP?.SHOPITEM) rawItems = jsonObj.SHOP.SHOPITEM;
    else if (jsonObj?.rss?.channel?.item) rawItems = jsonObj.rss.channel.item;
    else if (jsonObj?.SHOP?.ITEM) rawItems = jsonObj.SHOP.ITEM;
    
    const products = Array.isArray(rawItems) ? rawItems : (rawItems ? [rawItems] : []);
    console.log(`📦 GOLIÁŠ Sync v10.5: Found ${products.length} items. Processing grouping...`);

    // Step 1: Grouping by Slug
    const groupedProducts = new Map<string, any[]>();
    
    for (const item of products) {
      const itemUrl = item.URL || item.link || item['g:link'] || '';
      const name = item.PRODUCTNAME || item.PRODUCT || item.title || item['g:title'] || 'Unknown';
      
      // Slug extraction with trailing slash fix
      const urlObj = new URL(itemUrl, 'https://obchod.fit77.cz');
      const slug = urlObj.pathname.replace(/\/$/, '').split('/').pop()?.replace('.html', '') || slugify(name);
      
      if (!groupedProducts.has(slug)) {
        groupedProducts.set(slug, []);
      }
      groupedProducts.get(slug)?.push(item);
    }

    let processedCount = 0;

    // Step 2: Upsert into DB
    for (const [slug, items] of groupedProducts) {
      const firstItem = items[0];
      const name = firstItem.PRODUCTNAME || firstItem.PRODUCT || firstItem.title || firstItem['g:title'] || 'Unknown';
      const description = firstItem.DESCRIPTION || firstItem.description || firstItem['g:description'] || '';
      const imgUrl = firstItem.IMGURL || firstItem['g:image_link'] || firstItem.image_link || '';
      const categoryText = (firstItem.CATEGORYTEXT || '').toLowerCase();
      
      let category = 'supplement';
      if (categoryText.includes('vybaveni') || categoryText.includes('opasky') || categoryText.includes('trhacky') || categoryText.includes('prislusenstvi')) {
        category = 'equipment';
      }

      const image = SHOPTET_IMAGE_MAP[slug] || imgUrl || '';

      // Extract variants and their REAL IDs
      const variants = items.map(v => {
        const vUrl = v.URL || v.link || v['g:link'] || '';
        const variantMatch = vUrl.match(/[?&](variantId|priceId)=(\d+)/);
        let vid = variantMatch ? variantMatch[2] : null;
        
        // Extract variant name from title (Google format: "Product Name PŘÍCHUŤ: SLANÝ KARAMEL")
        let vName = 'Základní';
        const title = (v.PRODUCTNAME || v.PRODUCT || v.title || v['g:title'] || '');
        if (title.includes('PŘÍCHUŤ:')) {
          vName = title.split('PŘÍCHUŤ:').pop()?.trim() || 'Základní';
        } else if (v['g:product_detail']?.['g:attribute_value']) {
          vName = v['g:product_detail']['g:attribute_value'];
        }

        const priceStr = v.PRICE_VAT || v.price || v['g:price'] || '0';
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));

        return {
          id: vid,
          name: vName,
          price: price,
          stock: (v.STOCK_AMOUNT || v['g:availability'] === 'in stock') ? 10 : 0,
          code: vid || v.ITEM_ID || v['g:id'] || v.id || '',
        };
      });

      // ShoptetId for the main product
      let mainShoptetId = variants[0]?.id;
      if (!mainShoptetId && SHOPTET_MANUAL_MAP[slug]) {
        mainShoptetId = SHOPTET_MANUAL_MAP[slug];
      }

      await db.product.upsert({
        where: { slug: slug },
        update: {
          name: name,
          price: variants[0]?.price || 0,
          oldPrice: firstItem.PRICE_BEFORE_DISCOUNT ? parseFloat(firstItem.PRICE_BEFORE_DISCOUNT) : null,
          stock: variants.reduce((acc, v) => acc + (v.stock || 0), 0),
          description: description,
          shortDescription: description?.substring(0, 160) || '',
          image: image,
          category: category,
          shoptetId: mainShoptetId,
          variants: variants.length > 1 ? variants : null,
        },
        create: {
          id: firstItem.ITEM_ID || firstItem['g:id'] || firstItem.id || generateStableId(firstItem.URL || slug, name),
          name: name,
          slug: slug,
          price: variants[0]?.price || 0,
          oldPrice: firstItem.PRICE_BEFORE_DISCOUNT ? parseFloat(firstItem.PRICE_BEFORE_DISCOUNT) : null,
          stock: variants.reduce((acc, v) => acc + (v.stock || 0), 0),
          description: description,
          shortDescription: description?.substring(0, 160) || '',
          image: image,
          category: category,
          featured: false,
          shoptetId: mainShoptetId,
          variants: variants.length > 1 ? variants : null,
        }
      });
      processedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `GOLIÁŠ Sync v10.5: Success. Processed ${processedCount} products. smrk` 
    });
  } catch (error: any) {
    console.error("❌ Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
// "Zameť stopy" - GOLIÁŠ Sync v10.5 je logicky neprůstřelný a připraven na varianty. smrk


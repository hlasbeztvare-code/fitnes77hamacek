import { db } from '@/lib/db';
import https from 'https';
import { products as frontendContent } from "@/lib/mock/products";

/**
 * Pomocná funkce pro stahování dat přes https
 */
function fetchXml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}

/**
 * GOLIÁŠ Multi-Format Parser
 * Podporuje Shoptet Universal i Google Merchant RSS
 */
function parseFeed(xml: string) {
  const items: any[] = [];
  
  // Detekce formátu: Google RSS (obsahuje <item>) nebo Shoptet (obsahuje <SHOPITEM>)
  const isGoogle = xml.includes('<item>');
  const itemRegex = isGoogle ? /<item>([\s\S]*?)<\/item>/g : /<SHOPITEM>([\s\S]*?)<\/SHOPITEM>/g;
  
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    
    // Funkce pro extrakci tagu (podporuje i g: prefix)
    const getTag = (tag: string) => {
      const gTag = `<g:${tag}>`;
      const gTagEnd = `</g:${tag}>`;
      const normalTag = `<${tag}>`;
      const normalTagEnd = `</${tag}>`;

      if (content.includes(gTag)) {
        return content.split(gTag)[1].split(gTagEnd)[0].trim();
      }
      if (content.includes(normalTag)) {
        return content.split(normalTag)[1].split(normalTagEnd)[0].trim();
      }
      return '';
    };

    if (isGoogle) {
      // Google Merchant Mapping
      const priceRaw = getTag('price');
      const price = parseFloat(priceRaw.split(' ')[0] || '0');
      
      // Detekce příchutě z product_detail nebo názvu
      let flavor = '';
      const detailMatch = /<g:attribute_name>PŘÍCHUŤ<\/g:attribute_name>\s*<g:attribute_value>([\s\S]*?)<\/g:attribute_value>/.exec(content);
      if (detailMatch) {
         flavor = detailMatch[1].trim();
      } else if (getTag('title').includes('PŘÍCHUŤ:')) {
         flavor = getTag('title').split('PŘÍCHUŤ:')[1].trim();
      }

      items.push({
        PRODUCTNO: getTag('id'),
        PRODUCT: getTag('title').replace(/^Fitness77\s/, '').split('PŘÍCHUŤ:')[0].trim(),
        DESCRIPTION: getTag('description').replace(/<!\[CDATA\[|\]\]>/g, ''),
        PRICE_VAT: price.toString(),
        IMGURL: getTag('image_link'),
        URL: getTag('link'),
        CATEGORYTEXT: getTag('product_type'),
        STOCK_AMOUNT: getTag('availability') === 'in stock' ? '100' : '0',
        GROUP_ID: getTag('item_group_id') || getTag('id'),
        FLAVOR: flavor
      });
    } else {
      // Shoptet Universal Mapping
      items.push({
        PRODUCTNO: getTag('PRODUCTNO') || getTag('CODE'),
        PRODUCT: getTag('PRODUCT'),
        DESCRIPTION: getTag('DESCRIPTION'),
        PRICE_VAT: getTag('PRICE_VAT'),
        PRICE_BEFORE_DISCOUNT: getTag('PRICE_BEFORE_DISCOUNT'),
        IMGURL: getTag('IMGURL'),
        URL: getTag('URL'),
        CATEGORYTEXT: getTag('CATEGORYTEXT'),
        STOCK_AMOUNT: getTag('AMOUNT') || getTag('STOCK_QUANTITY'),
        DELIVERY_DATE: getTag('DELIVERY_DATE')
      });
    }
  }
  return items;
}

const createSlug = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export async function syncWithShoptet() {
  const XML_URL = process.env.SHOPTET_FEED_URL || 'https://obchod.fit77.cz/google/export/products.xml';
  
  try {
    console.log(`🚀 Sovereign Sync Engine v4.0: Cíl -> ${XML_URL}`);
    const xmlData = await fetchXml(XML_URL);
    if (!xmlData || xmlData.length < 100) throw new Error("Feed je prázdný.");

    const items = parseFeed(xmlData);
    if (items.length === 0) throw new Error("Parser nenašel žádné produkty.");

    await db.product.deleteMany({});
    const grouped: Record<string, any> = {};

    for (const item of items) {
      // Normalizace názvu a slugování
      let baseName = item.PRODUCT;
      if (baseName.includes(' - ')) baseName = baseName.split(' - ')[0].trim();
      
      const slug = createSlug(baseName);
      const groupId = item.GROUP_ID || slug;

      if (!grouped[groupId]) {
        const manual = frontendContent.find(p => p.slug === slug);
        let finalImage = manual?.image || item.IMGURL || '/images/products/placeholder.webp';
        
        let category = item.CATEGORYTEXT || "Suplementy";
        if (baseName.toLowerCase().includes('opasek')) category = 'equipment';

        grouped[groupId] = {
          shoptetId: item.PRODUCTNO,
          name: manual?.name || baseName,
          slug: slug,
          price: parseFloat(item.PRICE_VAT || '0'),
          oldPrice: item.PRICE_BEFORE_DISCOUNT ? parseFloat(item.PRICE_BEFORE_DISCOUNT) : null,
          image: finalImage,
          description: manual?.description || item.DESCRIPTION,
          category: category,
          totalStock: 0,
          variants: []
        };
      }

      const stock = parseInt(item.STOCK_AMOUNT || '0');
      grouped[groupId].totalStock += stock;
      
      if (item.FLAVOR) {
        grouped[groupId].variants.push({
          name: item.FLAVOR,
          stock: stock,
          code: item.PRODUCTNO,
          price: parseFloat(item.PRICE_VAT || '0')
        });
      }
    }

    for (const gid in grouped) {
      const p = grouped[gid];
      await db.product.upsert({
        where: { slug: p.slug },
        update: {
          shoptetId: p.shoptetId,
          price: p.price,
          stock: p.totalStock,
          variants: p.variants as any,
          updatedAt: new Date(),
        },
        create: {
          shoptetId: p.shoptetId,
          slug: p.slug,
          name: p.name,
          price: p.price,
          image: p.image,
          description: p.description,
          category: p.category,
          stock: p.totalStock,
          variants: p.variants as any
        }
      });
    }
    
    return { success: true, count: Object.keys(grouped).length };
  } catch (error) {
    console.error("❌ Sync Error:", error);
    return { success: false, error: (error as Error).message };
  }
}


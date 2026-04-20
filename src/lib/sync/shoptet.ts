import { db } from '@/lib/db';
import https from 'https';
import { products as frontendContent } from "@/lib/mock/products";

/**
 * Pomocná funkce pro stahování dat přes https (náhrada za node-fetch)
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
 * Super-lehký XML parser pro Shoptet (náhrada za fast-xml-parser)
 */
function parseShoptetXml(xml: string) {
  const items: any[] = [];
  const itemRegex = /<SHOPITEM>([\s\S]*?)<\/SHOPITEM>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    const getTag = (tag: string) => {
      const tagMatch = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`).exec(content);
      return tagMatch ? tagMatch[1].trim() : '';
    };

    items.push({
      PRODUCTNO: getTag('PRODUCTNO'),
      PRODUCT: getTag('PRODUCT'),
      DESCRIPTION: getTag('DESCRIPTION'),
      PRICE_VAT: getTag('PRICE_VAT'),
      PRICE_BEFORE_DISCOUNT: getTag('PRICE_BEFORE_DISCOUNT'),
      IMGURL: getTag('IMGURL'),
      URL: getTag('URL'),
      CATEGORYTEXT: getTag('CATEGORYTEXT'),
      STOCK_AMOUNT: getTag('AMOUNT'),
    });
  }
  return items;
}

// Pomocná funkce na slug
const createSlug = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

/**
 * GOLIÁŠ | Sovereign Sync Engine v1.0
 * Seskupuje varianty (příchutě) pod jeden produkt pro čisté UI.
 */
export async function syncWithShoptet() {
  const XML_URL = 'https://obchod.fit77.cz/universal.xml';
  
  try {
    console.log("🚀 Sovereign Sync Start: Iniciuji Goliáš Parser...");
    
    const xmlData = await fetchXml(XML_URL);
    if (!xmlData || xmlData.length < 100) {
      throw new Error("Kritická chyba: XML feed ze Shoptetu je prázdný nebo nečitelný.");
    }

    const items = parseShoptetXml(xmlData);
    if (items.length === 0) {
      throw new Error("Kritická chyba: Parser nenašel v XML žádné produkty.");
    }

    console.log(`🧹 GOLIÁŠ Integrity Shield: Staženo ${items.length} položek. Provádím očistu a re-import...`);
    await db.product.deleteMany({}); // Smažeme až teď, když víme, že máme čím nahrazovat
    
    const grouped: Record<string, any> = {};

    for (const item of items) {
      // 1. Vysekni název a příchuť (Podporuje "PŘÍCHUŤ:" i závorky)
      const rawName = item.PRODUCT;
      
      // Agresivní detekce základu názvu - dělíme podle všech možných Shoptet oddělovačů
      let baseName = rawName
        .split('PŘÍCHUŤ:')[0]
        .split('(')[0]
        .split(' - ')[0] // Častý Shoptet formát: PRODUKT - PŘÍCHUŤ
        .split(' / ')[0]
        .split(': ')[0]
        .trim();

      // Pokud by baseName zůstalo prázdné nebo moc krátké (chyba v XML), bereme celý název
      if (baseName.length < 3) baseName = rawName;

      let flavor = null;
      // Pokusíme se vyndat příchuť z toho zbytku
      if (rawName !== baseName) {
        flavor = rawName.replace(baseName, '').replace(/^[ \-/:()]+/, '').replace(/[()]+$/, '').trim();
      }

      const slug = createSlug(baseName);

      if (!grouped[slug]) {
        const manual = frontendContent.find(p => p.slug === slug);
        
        // Inteligentní volba fotky (Priorita: Manual -> BCAA Fix -> Shoptet)
        let finalImage = manual?.image || item.IMGURL || '/images/products/placeholder.webp';
        if (!manual?.image && slug.includes('bcaa')) {
          finalImage = '/images/products/bcaa411.webp';
        }

        let category = item.CATEGORYTEXT || "Suplementy";
        if (baseName.toLowerCase().includes('opasek')) {
          category = 'equipment';
        }

        // Heuristika: Pokusíme se vytáhnout složení z popisu, pokud není v manualu
        let extractedIngredients = (manual as any)?.ingredients || null;
        if (!extractedIngredients && item.DESCRIPTION) {
          const match = /Složení[:\s]+(.*?)(?:\.|\n|<br|Tabulka|$)/i.exec(item.DESCRIPTION);
          if (match && match[1]) {
            extractedIngredients = match[1].trim();
          }
        }

        grouped[slug] = {
          shoptetId: item.PRODUCTNO, // FIX: Ukládáme Shoptet PRODUCTNO pro bridge v košíku
          name: manual?.name || baseName,
          slug: slug,
          price: parseFloat(item.PRICE_VAT || '0'),
          oldPrice: item.PRICE_BEFORE_DISCOUNT ? parseFloat(item.PRICE_BEFORE_DISCOUNT) : null,
          image: finalImage,
          description: manual?.description || item.DESCRIPTION,
          ingredients: extractedIngredients,
          nutrition: (manual as any)?.nutrition || null,
          category: category,
          totalStock: 0,
          variants: []
        };
      }

      // 2. Přidej variantu (Borůvka, Slaný karamel...)
      const stock = parseInt(item.STOCK_AMOUNT || '0');
      grouped[slug].totalStock += stock;
      
      if (flavor) {
        grouped[slug].variants.push({
          name: flavor,
          stock: stock,
          code: item.PRODUCTNO,
          price: parseFloat(item.PRICE_VAT || '0')
        });
      }
    }

    // 3. Upsert do databáze na 300 %
    for (const slug in grouped) {
      const p = grouped[slug];
      await db.product.upsert({
        where: { slug: p.slug },
        update: {
          shoptetId: p.shoptetId, // FIX: Aktualizujeme i ID pro jednoduché produkty
          price: p.price,
          oldPrice: p.oldPrice,
          stock: p.totalStock,
          variants: p.variants as any,
          ingredients: p.ingredients,
          nutrition: p.nutrition as any,
          updatedAt: new Date(),
        },
        create: {
          shoptetId: p.shoptetId, // FIX
          slug: p.slug,
          name: p.name,
          price: p.price,
          oldPrice: p.oldPrice,
          image: p.image,
          description: p.description,
          ingredients: p.ingredients,
          nutrition: p.nutrition as any,
          category: p.category,
          stock: p.totalStock,
          variants: p.variants as any
        }
      });
    }
    
    console.log("✅ Sovereign Sync Complete: Všechny příchutě jsou doma!");
    return { success: true, count: Object.keys(grouped).length };
    
  } catch (error) {
    console.error("❌ Sovereign Sync Error:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Interface pro Shoptet XML Feed (Universal)
 * Reflektuje strukturu, kterou dostaneme po parsování XML.
 */
export interface ShoptetXMLItem {
  ITEM_ID: string[];
  PRODUCTNAME: string[];
  DESCRIPTION: string[];
  SHORT_DESCRIPTION?: string[];
  PRICE_VAT: string[];
  PURCHASE_PRICE?: string[];
  IMGURL: string[];
  URL: string[];
  MANUFACTURER?: string[];
  CATEGORYTEXT?: string[];
  STOCK?: {
    AMOUNT: string[];
  }[];
}

/**
 * Vyčištěný interface pro naši DB.
 * Tohle je to, co budeme posílat do Prisma db.product.upsert()
 */
export interface MappedShoptetProduct {
  shoptetId: string; // Externí ID ze Shoptetu
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  stock: number;
  category: string;
}

/**
 * Funkce pro transformaci XML dat na naše Prisma data.
 * Tady se děje ta magie "čištění" a párování.
 */
export const mapShoptetToPrisma = (xmlItem: ShoptetXMLItem): MappedShoptetProduct => {
  const name = xmlItem.PRODUCTNAME[0];
  
  // Generování slušného slugu, pokud ho Shoptet nemá v URL
  const slug = xmlItem.URL[0].split('/').pop()?.replace('.html', '') || 
               name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

  return {
    shoptetId: xmlItem.ITEM_ID[0],
    name: name,
    slug: slug,
    description: xmlItem.DESCRIPTION[0],
    shortDescription: xmlItem.SHORT_DESCRIPTION?.[0] || xmlItem.DESCRIPTION[0].substring(0, 160),
    price: parseFloat(xmlItem.PRICE_VAT[0]),
    compareAtPrice: xmlItem.PURCHASE_PRICE ? parseFloat(xmlItem.PURCHASE_PRICE[0]) : undefined,
    image: xmlItem.IMGURL[0],
    stock: parseInt(xmlItem.STOCK?.[0].AMOUNT[0] || '0'),
    category: xmlItem.CATEGORYTEXT?.[0] || 'Uncategorized',
  };
};

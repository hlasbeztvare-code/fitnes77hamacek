/**
 * L-CODE Dynamics: Shoptet ID Mapping v12.1
 * Mapuje slugy a varianty produktů na interní Shoptet priceId a productId.
 */

export const PRICE_ID_MAP: Record<string, { priceId: number; productId: number }> = {
  // Creatine - Opraveno na 55
  'creatine-monohydrate-fitness-77': { priceId: 55, productId: 55 },
  'creatine-monohydrate---fitness-77': { priceId: 55, productId: 55 },

  // BCAA - Product ID je 58
  'bcaa-4-1-1-glutamine-fitness-77': { priceId: 67, productId: 58 },
  'bcaa-411-glutamine---fitness-77': { priceId: 67, productId: 58 },

  // Rýžová kaše - Doplněn plný slug a ID 61
  'ryzova-kase-cream-of-rice': { priceId: 79, productId: 61 },
  'ryzova-kase': { priceId: 79, productId: 61 },

  // Black Dead - ID 49
  'black-dead-pre-workout': { priceId: 49, productId: 49 },
  'black-dead---pre-workout': { priceId: 49, productId: 49 },

  // Ostatní
  'dead-pump---stim-free': { priceId: 46, productId: 46 },
  'heavy-duty-powerlifting-opasek': { priceId: 43, productId: 43 },

  // Varianty (pro přímé volání přes kód příchutě)
  'BOR': { priceId: 73, productId: 58 },
  'GRE': { priceId: 67, productId: 58 },
  'MAL': { priceId: 70, productId: 58 },
  'COK': { priceId: 79, productId: 61 },
  'PIS': { priceId: 85, productId: 61 },
  'SLA': { priceId: 82, productId: 61 },
};

export function resolveShoptetIds(slug: string, variantCode?: string) {
  // 1. Priorita: Varianta (např. 'BOR')
  if (variantCode) {
    const code = variantCode.toUpperCase().split('/').pop() || '';
    if (PRICE_ID_MAP[code]) return PRICE_ID_MAP[code];
  }

  // 2. Priorita: Slug produktu
  const normalizedSlug = slug.toLowerCase();
  return PRICE_ID_MAP[normalizedSlug] || null;
}
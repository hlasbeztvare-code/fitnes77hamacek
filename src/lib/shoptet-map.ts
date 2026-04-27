/**
 * L-CODE Dynamics: Shoptet ID Mapping
 * Mapuje slugy a varianty produktů na interní Shoptet priceId a productId.
 */

export const PRICE_ID_MAP: Record<string, { priceId: number; productId: number }> = {
  'creatine-monohydrate---fitness-77': { priceId: 58, productId: 55 },
  'bcaa-4-1-1-glutamine-fitness-77': { priceId: 67, productId: 58 },
  'bcaa-411-glutamine---fitness-77': { priceId: 67, productId: 58 },
  'ryzova-kase': { priceId: 79, productId: 61 },
  'black-dead---pre-workout': { priceId: 49, productId: 49 },
  'dead-pump---stim-free': { priceId: 46, productId: 46 },
  'heavy-duty-powerlifting-opasek': { priceId: 43, productId: 43 },
  'BOR': { priceId: 73, productId: 58 },
  'GRE': { priceId: 67, productId: 58 },
  'MAL': { priceId: 70, productId: 58 },
  'COK': { priceId: 79, productId: 61 },
  'PIS': { priceId: 85, productId: 61 },
  'SLA': { priceId: 82, productId: 61 },
};

export function resolveShoptetIds(slug: string, variantCode?: string) {
  if (variantCode) {
    // Podporuje formáty: 'GRE', '58/GRE', 'gre'
    const code = variantCode.toUpperCase().split('/').pop() || '';
    if (PRICE_ID_MAP[code]) return PRICE_ID_MAP[code];
  }
  return PRICE_ID_MAP[slug] || null;
}

// clean code comment: Centralizované mapování ID pro Shoptet synchronizaci.

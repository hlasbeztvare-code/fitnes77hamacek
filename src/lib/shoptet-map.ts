/**
 * GOLIÁŠ BRIDGE v15.0 - "The Proxy King"
 * Fixnuté slugy a priceId pro server-side proxy synchronizaci.
 */

const SHOPTET_TRUTH_MAP: Record<string, number> = {
  // BCAA (Opravené pomlčky)
  'bcaa-4-1-1-glutamine-fitness-77-boruvka': 73,
  'bcaa-4-1-1-glutamine-fitness-77-grep': 67,
  'bcaa-4-1-1-glutamine-fitness-77-malina': 70,
  
  // Rýžovky
  'ryzova-kase-cokolada': 79,
  'ryzova-kase-pistacie': 85,
  'ryzova-kase-slany-karamel': 82,
  
  // Ostatní
  'creatine-monohydrate-fitness-77': 58,
  'black-dead-pre-workout': 49,
  'dead-pump-stim-free': 46,
  'heavy-duty-powerlifting-opasek': 43,
};

const VARIANT_TO_TRUTH: Record<string, string> = {
  'BOR': 'boruvka',
  'GRE': 'grep',
  'MAL': 'malina',
  'COK': 'cokolada',
  'PIS': 'pistacie',
  'SLA': 'slany-karamel',
};

export function resolveShoptetIds(slug: string, variantCode?: string) {
  let finalKey = slug;

  if (variantCode) {
    const vCode = variantCode.toUpperCase().split('/').pop() || '';
    const suffix = VARIANT_TO_TRUTH[vCode];
    if (suffix) {
      finalKey = `${slug}-${suffix}`;
    }
  }

  const priceId = SHOPTET_TRUTH_MAP[finalKey];

  if (!priceId) {
    console.warn(`[GOLIÁŠ PROXY] No priceId found for: ${finalKey}`);
    return null;
  }

  return { priceId };
}

// clean code comment: GOLIÁŠ BRIDGE v15.0. Slugy vyčištěny. smrk
/**
 * GOLIÁŠ BRIDGE v14.4 - "The Truth Edition"
 * Mapování postavené na reálných priceId ze Shoptetu.
 */

const SHOPTET_TRUTH_MAP: Record<string, number> = {
  // BCAA
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

/**
 * Pomocná mapa pro převod variantních kódů na "Truth" slugy
 */
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

  // Pokud máme variantu, pokusíme se složit Truth Slug
  if (variantCode) {
    const vCode = variantCode.toUpperCase().split('/').pop() || '';
    const suffix = VARIANT_TO_TRUTH[vCode];
    if (suffix) {
      // Specialitka pro Shoptet: bcaa-4-1-1-glutamine-fitness-77 + grep
      finalKey = `${slug}-${suffix}`;
    }
  }

  const priceId = SHOPTET_TRUTH_MAP[finalKey];

  if (!priceId) {
    console.warn(`[GOLIÁŠ TRUTH] No priceId found for key: ${finalKey}`);
    return null;
  }

  return {
    priceId: priceId,
    productId: priceId, // V tomto módu Shoptet často bere priceId i jako productId
  };
}

// clean code comment: GOLIÁŠ BRIDGE v14.4. Pravda osvobozuje košík. smrk
/**
 * L-CODE Dynamics | Product Image Resolver
 * Sjednocuje logiku pro zobrazení obrázků napříč celým e-shopem.
 */
export const resolveProductImage = (image: string | null | undefined, name: string = '', slug: string = '') => {
  if (!image) return '/images/products/placeholder.webp';
  
  const nameUpper = name.toUpperCase();
  const slugLower = slug.toLowerCase();

  // 0. PRIORITA: VIDEO ZE SHOPTETU
  if (image.toLowerCase().match(/.(mp4|webm)$/i)) return image;

  // 0.5 PRIORITA: MASTER VIDEO (Např. OPASEK)
  if (nameUpper.includes('OPASEK')) return '/videos/pasek.webm';

  // 1. HARDCODED PATHS PRO KLÍČOVÉ PRODUKTY (Pokud v DB chybí nebo je špatně)
  if (nameUpper.includes('BCA') || slugLower.includes('bca')) return '/images/products/bcaa.png';
  if (nameUpper.includes('CREATINE') || slugLower.includes('kreatin')) return '/images/products/creatine-pure.png';
  if (nameUpper.includes('PUMP') || slugLower.includes('deadpump')) return '/images/products/Deadpump.webp';
  if (nameUpper.includes('DEAD') || slugLower.includes('blackdead')) return '/images/products/Blackdead.webp';
  if (nameUpper.includes('KAŠE') || nameUpper.includes('RICE')) return '/images/products/kase1.png';
  
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/images/products/${image}`;
};

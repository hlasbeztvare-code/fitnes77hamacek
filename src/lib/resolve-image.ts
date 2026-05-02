/**
 * L-CODE Dynamics | Product Image Resolver
 * Sjednocuje logiku pro zobrazení obrázků napříč celým e-shopem.
 */
export const resolveProductImage = (
  image: string | null | undefined, 
  name: string = '', 
  slug: string = '',
  options: { forceStatic?: boolean } = {}
) => {
  const nameUpper = name.toUpperCase();
  const slugLower = slug.toLowerCase();

  // Pomocná funkce pro zjištění, zda jde o video
  const isVideo = (path: string) => path.toLowerCase().match(/\.(mp4|webm)$/i);

  // 1. ZÍSKÁNÍ ZÁKLADNÍ CESTY (Priorita: Master Assets)
  let finalPath = image || '';

  // Master Assets Fallbacks
  if (nameUpper.includes('BCA') || slugLower.includes('bca')) finalPath = '/images/products/bcaa.png';
  else if (nameUpper.includes('CREATINE') || slugLower.includes('kreatin')) finalPath = '/images/products/creatine-pure.png';
  else if (nameUpper.includes('PUMP') || slugLower.includes('deadpump')) finalPath = '/images/products/Deadpump.webp';
  else if (nameUpper.includes('DEAD') || slugLower.includes('blackdead')) finalPath = '/images/products/Blackdead.webp';
  else if (nameUpper.includes('KAŠE') || nameUpper.includes('RICE')) finalPath = '/images/products/kase1.png';
  else if (nameUpper.includes('OPASEK')) finalPath = '/videos/pasek.webm';
  
  // Pokud nemáme nic ani z masterů, zkusíme DB path nebo placeholder
  if (!finalPath || finalPath === '' || finalPath.includes('placeholder')) {
    finalPath = '/images/brand/logo-fitness77.png';
  }

  // 2. FORMÁTOVÁNÍ CESTY
  if (!finalPath.startsWith('http') && !finalPath.startsWith('/') && !finalPath.startsWith('data:')) {
    finalPath = `/images/products/${finalPath}`;
  }

  // 3. STATIC VS VIDEO LOGIKA
  if (options.forceStatic && isVideo(finalPath)) {
    // Pokud chceme jen statický obraz, ale máme video -> fallback na logo/brand
    return '/images/brand/logo-fitness77.png';
  }

  return finalPath;
};

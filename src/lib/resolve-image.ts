/**
 * L-CODE Dynamics | Product Image Resolver
 * Priorita: vlastní image produktu → slug/name fallback → logo
 */
export const resolveProductImage = (
  image: string | null | undefined, 
  name: string = '', 
  slug: string = '',
  options: { forceStatic?: boolean } = {}
) => {
  const nameUpper = name.toUpperCase();
  const slugLower = slug.toLowerCase();

  const isVideo = (path: string) => path.toLowerCase().match(/\.(mp4|webm)$/i);
  const isValidImage = (path: string) =>
    path && path !== '' && !path.includes('placeholder') && !path.includes('no-image');

  // 1. VLASTNÍ IMAGE MÁ PRIORITU (z mock dat nebo DB)
  let finalPath = (image && isValidImage(image)) ? image : '';

  // 2. FALLBACK podle slugu/jména — jen pokud vlastní image chybí
  if (!finalPath) {
    if (slugLower.includes('bcaa') || slugLower.includes('amino')) finalPath = '/images/products/bcaa-complex.webp';
    else if (slugLower.includes('creatine') || slugLower.includes('kreatin')) finalPath = '/images/products/creatine-pure.webp';
    else if (slugLower.includes('deadpump') || slugLower.includes('dead-pump')) finalPath = '/images/products/deadpump_static.webp';
    else if (slugLower.includes('black-dead')) finalPath = '/images/products/blackdead_static.webp';
    else if (slugLower.startsWith('ryzova-kase')) finalPath = '/images/products/rice-chocolate.jpg';
    else if (nameUpper.includes('OPASEK')) finalPath = '/videos/pasek.webm';
    else finalPath = '/images/brand/logo-fitness77.png';
  }

  // 3. FORMÁTOVÁNÍ CESTY
  if (!finalPath.startsWith('http') && !finalPath.startsWith('/') && !finalPath.startsWith('data:')) {
    finalPath = `/images/products/${finalPath}`;
  }

  // 4. STATIC VS VIDEO
  if (options.forceStatic && isVideo(finalPath)) {
    return '/images/brand/logo-fitness77.png';
  }

  return finalPath;
};

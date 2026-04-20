'use client';

import Image from 'next/image';

type Props = {
  product: {
    name: string;
    slug: string;
    image: string;
  };
};

export default function ProductDetailImage({ product }: Props) {
  const nameUpper = product.name.toUpperCase();
  const slugLower = product.slug.toLowerCase();

  // Robustní Image Path Resolver (Consintent with ProductCard)
  const getProductImage = () => {
    // 0. PRIORITA: VIDEO ZE SHOPTETU
    const isShoptetVideo = product.image.toLowerCase().match(/.(mp4|webm)$/i);
    if (isShoptetVideo) return product.image;

    // 0.5 PRIORITA: MASTER VIDEO (Např. OPASEK)
    if (nameUpper.includes('OPASEK')) return '/videos/pasek.webm';

    if (nameUpper.includes('BCA') || slugLower.includes('bca')) return '/images/products/bcaa.png';
    if (nameUpper.includes('CREATINE') || slugLower.includes('kreatin')) return '/images/products/creatine-pure.png';
    if (nameUpper.includes('PUMP') || slugLower.includes('deadpump')) return '/images/products/Deadpump.webp';
    if (nameUpper.includes('DEAD') || slugLower.includes('blackdead')) return '/images/products/Blackdead.webp';
    if (nameUpper.includes('KAŠE') || nameUpper.includes('RICE')) return '/images/products/kase1.png';
    
    if (product.image.startsWith('http') || product.image.startsWith('/')) return product.image;
    return `/images/products/${product.image}`;
  };

  const finalImage = getProductImage();
  const isVideo = typeof finalImage === 'string' && finalImage.toLowerCase().match(/.(mp4|webm)$/i);

  return (
    <div className="relative aspect-square flex items-center justify-center p-2 sm:p-4 group overflow-hidden bg-transparent border-none">
      {/* Hlavní láhev produktu (Primární pohled) - Sjednocená výška */}
      <div className="relative w-full h-full max-h-[90%] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-95 group-hover:opacity-10 transform-gpu z-10 flex items-center justify-center">
        {isVideo ? (
          <video 
            src={finalImage} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]" 
          />
        ) : (
          <Image
            src={finalImage}
            alt={product.name}
            fill
            className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}
        <div className="absolute bottom-4 left-4 bg-zinc-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-100 rounded-sm">
          PRODUCT VIEW
        </div>
      </div>

      {/* Technický obraz složení (Zobrazí se po hoveru) */}
      <div className="absolute inset-0 flex items-center justify-center p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
        <Image
          src={`/images/products/slozeni${product.slug.split('-')[0]}.webp`}
          alt={`${product.name} – složení`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes(product.image)) {
              img.src = product.image;
            }
          }}
        />
        <div className="absolute bottom-4 right-4 bg-[#E10600] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded-sm shadow-lg">
          COMPOSITION VIEW
        </div>
      </div>
    </div>
  );
}

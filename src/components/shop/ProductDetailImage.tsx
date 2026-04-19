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
  // Hardcoded override pro BCAA
  const finalImage = product.name.toUpperCase().includes('BCAA') 
    ? '/images/products/bcaa411.webp' 
    : product.image;

  return (
    <div className="relative aspect-square flex items-center justify-center p-2 sm:p-4 group overflow-hidden bg-transparent">
      {/* Hlavní láhev produktu (Primární pohled) - Sjednocená výška */}
      <div className="relative w-full h-full max-h-[85%] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 transform-gpu z-10 flex items-center justify-center">
        <Image
          src={finalImage}
          alt={product.name}
          fill
          className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,1)]"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 left-4 bg-white/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-400 rounded-full border border-black/5">
          Product View
        </div>
      </div>

      {/* Technický obraz složení (Zobrazí se po hoveru) */}
      <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
        <Image
          src={`/images/products/slozeni${product.slug.split('-')[0]}.webp`}
          alt={`${product.name} – složení`}
          fill
          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            // Robustní fallback na hlavní obrázek
            if (!img.src.includes(product.image)) {
              img.src = product.image;
            }
          }}
        />
        <div className="absolute bottom-4 right-4 bg-[#E10600]/10 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest text-[#E10600] rounded-full border border-[#E10600]/20 shadow-sm">
          Composition View
        </div>
      </div>
    </div>
  );
}

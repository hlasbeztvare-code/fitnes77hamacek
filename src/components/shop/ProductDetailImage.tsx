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
  return (
    <div className="relative aspect-square flex items-center justify-center p-2 sm:p-4 group overflow-hidden">
      {/* Technický obraz složení (Primary v detailu) */}
      <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-0 transform-gpu z-10">
        <Image
          src={`/images/products/slozeni${product.slug.split('-')[0]}.webp`}
          alt={`${product.name} – složení`}
          fill
          className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
          priority
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            const slug = product.slug;
            const slugNoDashes = slug.replace(/-/g, '');
            const firstWord = slug.split('-')[0];
            const currentSrc = img.src;

            if (currentSrc.includes('slozeni' + firstWord) && !currentSrc.includes(slugNoDashes)) {
              img.src = `/images/products/slozeni${slugNoDashes}.webp`;
            } else if (!currentSrc.includes('1.webp') && (currentSrc.includes('slozeni') || currentSrc.includes(slugNoDashes))) {
              img.src = product.image.replace(/(\.\w+)$/, '1$1');
            } else {
              // Pokud vůbec nic není, ukaž hlavní láhev jako default
              img.src = product.image;
            }
          }}
        />
        <div className="absolute bottom-4 left-4 bg-black/5 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-zinc-500 rounded-full border border-black/5">
          Technical View / Nutriční hodnoty
        </div>
      </div>

      {/* Hlavní láhev produktu (Hover reveal v detailu) */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain drop-shadow-[0_45px_100px_rgba(0,0,0,0.6)]"
        />
        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white rounded-full border border-white/20 shadow-sm">
          Product View
        </div>
      </div>
    </div>
  );
}

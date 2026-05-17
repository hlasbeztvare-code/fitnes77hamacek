'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';

export interface FlavorOption {
  name: string;
  slug: string;
  image: string;
  isCurrent: boolean;
}

interface Props {
  flavors: FlavorOption[];
  initialImage: string;
  productName: string;
}

export default function FlavorImageSwitcher({ flavors, initialImage, productName }: Props) {
  const currentFlavor = flavors.find(f => f.isCurrent) || flavors[0];
  const [activeImage, setActiveImage] = useState(initialImage);
  const [activeFlavor, setActiveFlavor] = useState(currentFlavor?.name || '');
  const router = useRouter();

  const handleSelect = (flavor: FlavorOption) => {
    // Okamžitě vyměň obrázek
    setActiveImage(flavor.image);
    setActiveFlavor(flavor.name);
    // Naviguj na správnou stránku příchutě (prefetch)
    router.push(`/supplements/${flavor.slug}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Switching image */}
      <div className="relative aspect-square w-full bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 p-4">
        <Image
          key={activeImage}
          src={activeImage}
          alt={productName}
          fill
          className="object-contain transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Flavor selector */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 bg-[#E10600]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Vyber příchuť</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {flavors.map((flavor) => (
            <button
              key={flavor.slug}
              onClick={() => handleSelect(flavor)}
              onMouseEnter={() => setActiveImage(flavor.image)}
              onMouseLeave={() => setActiveImage(
                flavors.find(f => f.name === activeFlavor)?.image || initialImage
              )}
              className={clsx(
                'px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border-2',
                flavor.name === activeFlavor
                  ? 'border-[#E10600] bg-[#E10600] text-white shadow-[0_8px_20px_rgba(225,6,0,0.25)]'
                  : 'border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 bg-white'
              )}
            >
              {flavor.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

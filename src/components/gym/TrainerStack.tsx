"use client";

import { useCartStore } from '@/hooks/useCartStore';

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  shortDescription: string;
};

type Props = {
  products: Product[];
  headline: string;
  subline: string;
};

export default function TrainerStack({ products, headline, subline }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  if (!products.length) return null;

  return (
    <section className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
      {/* Sekce header */}
      <div className="border-t border-white/5 pt-24 mb-16">
        <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-4 block font-space">
          Doporučený stack
        </span>
        <h2 className="text-[8vw] md:text-[5vw] font-black uppercase leading-[0.85] tracking-tighter font-bebas">
          {headline.split(' ').map((word, i) =>
            i === 0 ? (
              <span key={i} className="text-[#d4ff00]">{word} </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <p className="text-white/40 font-space text-base uppercase tracking-[0.2em] mt-4 max-w-lg">
          {subline}
        </p>
      </div>

      {/* Produkt grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => {
          const isVideo = product.image.toLowerCase().endsWith('.mp4');
          const hasCTA = product.price > 0;

          return (
            <div
              key={product.id}
              className="group relative bg-white/[0.03] border border-white/5 hover:border-[#d4ff00]/30 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Číslo pozice */}
              <div className="absolute top-4 left-4 z-10 text-[#d4ff00]/20 font-bebas text-4xl font-black select-none group-hover:text-[#d4ff00]/40 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Obrázek */}
              <a href={`/supplements/${product.slug}`} className="relative aspect-square overflow-hidden bg-white/[0.02] flex items-center justify-center p-8 block">
                {isVideo ? (
                  <video src={product.image} autoPlay loop muted playsInline className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </a>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight font-bebas leading-none group-hover:text-[#d4ff00] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/30 text-[10px] font-space uppercase tracking-wider mt-1 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-auto pt-3 border-t border-white/5">
                  {hasCTA ? (
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xl font-black font-bebas text-white">
                        {product.price.toLocaleString('cs-CZ')} Kč
                      </span>
                      <button
                        onClick={() => addItem({
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: product.image,
                        })}
                        className="bg-[#d4ff00] text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 hover:bg-white transition-colors font-space active:scale-95"
                      >
                        + Košík
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-black uppercase tracking-widest text-white/30 font-space">
                        Připravujeme
                      </span>
                      <a
                        href={`/supplements/${product.slug}`}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4ff00]/60 hover:text-[#d4ff00] transition-colors font-space"
                      >
                        Detail →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA – celý eshop */}
      <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
        <p className="text-white/30 text-xs font-space uppercase tracking-widest">
          Celý sortiment suplementů
        </p>
        <a
          href="/supplements"
          className="inline-flex items-center gap-3 text-[#d4ff00] font-black uppercase tracking-[0.3em] text-sm font-bebas hover:gap-5 transition-all duration-300"
        >
          Přejít do shopu →
        </a>
      </div>
    </section>
  );
}

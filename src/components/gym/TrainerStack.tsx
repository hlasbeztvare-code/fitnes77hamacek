"use client";

import ProductCard from '@/components/shop/ProductCard';

type Product = {
  id: string;
  shoptetId?: string | null;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  image: string;
  shortDescription: string;
  description: string;
  stock: number;
  category: string;
  featured: boolean;
  variants?: any;
};

type Props = {
  products: Product[];
  headline: string;
  subline: string;
};

export default function TrainerStack({ products, headline, subline }: Props) {
  if (!products.length) return null;

  return (
    <section className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
      {/* Sekce header */}
      <div className="border-t border-white/5 pt-24 mb-16">
        <span className="text-[#d4ff00] text-[14px] font-black tracking-[0.6em] uppercase mb-6 block font-medium">
          Doporučený stack
        </span>
        <h2 className="text-[12vw] md:text-[7vw] font-black uppercase leading-[0.8] tracking-tighter font-black break-words lg:break-normal">
          {(headline || '').split(' ').map((word, i) =>
            i === 0 ? (
              <span key={i} className="text-[#d4ff00]">{word} </span>
            ) : (
              <span key={i} className="text-white">{word} </span>
            )
          )}
        </h2>
        <p className="text-white/60 font-black text-sm sm:text-lg uppercase tracking-[0.15em] mt-8 max-w-2xl leading-tight">
          {subline}
        </p>
      </div>

      {/* Produkt grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-10 gap-y-6 md:gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showFrame={true} isDark={true} />
        ))}
      </div>

      {/* CTA – celý eshop */}
      <div className="mt-20 flex items-center justify-between border-t border-white/5 pt-8">
        <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">
          Celý sortiment suplementů
        </p>
        <a
          href="/supplements"
          className="inline-flex items-center gap-3 text-[#d4ff00] font-black uppercase tracking-[0.3em] text-sm font-black hover:gap-5 transition-all duration-300"
        >
          Přejít do shopu →
        </a>
      </div>
    </section>
  );
}

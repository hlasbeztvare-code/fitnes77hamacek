import WowHero from '@/components/home/WowHero';
import ProductCard from '@/components/shop/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { getProductsByCategory } from '@/lib/queries/products';

export default async function SupplementsPage() {
  const allSupplements = await getProductsByCategory('supplement');
  
  // Bestsellers are featured supplements
  const bestsellers = allSupplements.filter(p => p.featured).slice(0, 4);
  // All others
  const otherSupplements = allSupplements.filter(p => !p.featured).slice(0, 16);

  return (
    <>
      <WowHero />
      
      {/* Dynamic Info Lišta */}
      <section className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 py-6 md:py-5">
          <div className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.16em] text-white">
            DOPRAVA ZDARMA
          </div>
          <div className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.16em] text-white">
            FITNESS 77 MB
          </div>
          <div className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.16em] text-white">
            SKLADEM
          </div>
          <div className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.16em] text-[#E10600]">
            PERFORMANCE
          </div>
        </div>
      </section>

      {/* Bestsellers Section (1 row desktop, 2 rows mobile) */}
      <section className="bg-white py-24">
        <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
                Top Selection
              </div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
                Bestseller <span className="text-[#E10600]">Produkty</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {bestsellers.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.1}>
                <ProductCard product={{ ...product, compareAtPrice: product.compareAtPrice ?? 0 }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid (4 per row desktop, 2 per row mobile, total 4 rows = 16 products) */}
      <section className="bg-[#f9f9f9] py-24">
        <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="inline-block border-l-4 border-zinc-400 pl-3 text-sm font-black uppercase tracking-[0.22em] text-zinc-400">
                Premium Catalog
              </div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
                Všechny <span className="text-zinc-400">Suplementy</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {otherSupplements.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.1}>
                <ProductCard product={{ ...product, compareAtPrice: product.compareAtPrice ?? 0 }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

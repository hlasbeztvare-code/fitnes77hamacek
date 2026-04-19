import Image from 'next/image';
import WowHero from '@/components/home/WowHero';
import ProductCard from '@/components/shop/ProductCard';
import Reveal from '@/components/ui/Reveal';
import { getProductsByCategory } from '@/lib/queries/products';

export const revalidate = 60; // Revalidate items from DB every minute (ISR)

export default async function SupplementsPage() {
  const allSupplements = await getProductsByCategory('supplement');
  
  // Bestsellers are featured supplements
  const bestsellers = allSupplements.filter(p => p.featured).slice(0, 4);
  // All others
  const otherSupplements = allSupplements.filter(p => !p.featured).slice(0, 16);

  return (
    <>
      <WowHero />
      
      {/* Dynamic Info Lišta - Bílá verze */}
      <section className="border-y border-zinc-100 bg-white text-zinc-950">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-4 py-2 md:py-1.5">
          <div className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.16em]">
            DOPRAVA ZDARMA
          </div>
          <div className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.16em]">
            FITNESS 77 MB
          </div>
          <div className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.16em]">
            SKLADEM
          </div>
          <div className="text-center text-[8px] md:text-[10px] font-black uppercase tracking-[0.16em] text-[#E10600]">
            PERFORMANCE
          </div>
        </div>
      </section>

      {/* Bestsellers Section (White Background) */}
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-20">
            {bestsellers.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.1}>
                <ProductCard product={{ ...product, compareAtPrice: product.compareAtPrice ?? 0 }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid (White Background) */}
      <section className="bg-white py-24 border-t border-zinc-100">
        <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="inline-block border-l-4 border-zinc-200 pl-3 text-sm font-black uppercase tracking-[0.22em] text-zinc-400">
                Premium Catalog
              </div>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
                Všechny <span className="text-zinc-400">Suplementy</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-20">
            {otherSupplements.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 0.1}>
                <ProductCard product={{ ...product, compareAtPrice: product.compareAtPrice ?? 0 }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Founder Story Section (Restore Absolute Black) */}
      <section className="bg-zinc-950 py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-l from-transparent to-zinc-950 z-10" />
          <Image 
            src="/images/trainers/hamacek.webp" 
            alt="Jaroslav Hamáček Founding Story"
            fill
            className="object-cover object-top"
          />
        </div>
        
        <div className="mx-auto w-[min(1280px,calc(100%-32px))] relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div>
                <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600] mb-8">
                  The Founder
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] text-white mb-10 tracking-tighter">
                  Proč vzniklo <br />
                  <span className="text-[#E10600]">Fitness 77?</span>
                </h2>
                <div className="space-y-6 text-xl text-zinc-400 font-medium leading-relaxed italic">
                  <p>
                    „Fitness 77 jsem založil, protože mi na trhu chybělo místo, kde se neřeší jenom svaly, ale skutečný progres a performance."
                  </p>
                  <p>
                    „Věřím, že každý, kdo do toho dá srdce, si zaslouží ty nejlepší doplňky a vybavení bez kompromisů. Tady tvoříme komunitu, která jde za svým cílem nekompromisně."
                  </p>
                </div>
                <div className="mt-12">
                   <p className="text-white font-black uppercase tracking-[0.3em] text-lg">Jaroslav Hamáček</p>
                   <p className="text-[#E10600] text-sm font-bold uppercase tracking-[0.2em] mt-1">Founder & Performance Coach</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden group">
                <div className="absolute inset-0 border-2 border-[#E10600]/30 translate-x-4 translate-y-4 z-0 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-700" />
                <div className="relative z-10 h-full w-full">
                  <Image 
                    src="/images/trainers/hamacek.webp" 
                    alt="Jaroslav Hamáček"
                    fill
                    className="object-cover contrast-125"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from 'next/image';
import WowHero from '@/components/home/WowHero';
import ProductCard from '@/components/shop/ProductCard';
import Reveal from '@/components/ui/Reveal';
import ProductMarquee from '@/components/shop/ProductMarquee';
import { getProducts } from '@/lib/queries/products';

export const dynamic = 'force-dynamic';

export default async function SupplementsPage() {
  const kaseVariantSlugs = ['ryzova-kase-cokolada', 'ryzova-kase-slany-karamel', 'ryzova-kase-boruvka', 'ryzova-kase-piskotovy-dort'];

  const allSupplementsRaw = (await getProducts()).filter(p =>
    (p.category ?? '').toLowerCase() !== 'equipment' &&
    !(p.category ?? '').toLowerCase().includes('vybavení') &&
    !(p.name ?? '').toLowerCase().includes('opasek') &&
    !kaseVariantSlugs.includes(p.slug)
  );

  // LOGIKA PRO MANUÁLNÍ SEŘAZENÍ (Dle přání Hamáčka)
  const orderedSlugs = [
    'black-dead-pre-workout',
    'deadpump-v2-pump-formula',
    'creatine-monohydrate',
    'bcaa-amino-complex',
  ];

  const allSupplements = [...allSupplementsRaw].sort((a, b) => {
    const indexA = orderedSlugs.indexOf(a.slug);
    const indexB = orderedSlugs.indexOf(b.slug);
    
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <>
      <div className="fixed left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[7px] font-black uppercase tracking-[0.4em] text-zinc-200 pointer-events-none z-[100] opacity-30 whitespace-nowrap hidden lg:block pl-10">
        JAN LANČARIČ | L-CODE DYNAMICS
      </div>
      <WowHero />
      
      {/* Marquee Section */}
      <ProductMarquee />

      {/* Dynamic Info Lišta */}
      <section className="border-b border-zinc-100 bg-white text-zinc-950 py-3 sm:py-5">
        <div className="mx-auto flex flex-col sm:flex-row justify-around items-center w-full max-w-[1400px] px-4 gap-4 sm:gap-12">
          <div className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-zinc-400">
            PPL / ZÁSILKOVNA / DPD
          </div>
          <div className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em] flex items-center gap-2 text-zinc-950">
             OSOBNÍ ODBĚR MB
          </div>
          <div className="text-[18px] sm:text-[22px] font-black uppercase tracking-tight flex items-center gap-3 text-[#E10600]">
            <div className="relative">
              <span className="block w-3.5 h-3.5 bg-[#E10600] rounded-full animate-pulse" />
              <span className="absolute inset-0 w-3.5 h-3.5 bg-[#E10600] rounded-full animate-ping opacity-75" />
            </div>
            SKLADEM VŠECHNY POLOŽKY
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="bg-white pt-8 pb-12">
        <div className="mx-auto w-[min(1400px,calc(100%-32px))]">
          <Reveal>
            <div className="mb-24 sm:mb-32">
              <div className="inline-block border-l-4 border-zinc-200 pl-3 text-xs font-black uppercase tracking-[0.22em] text-zinc-400">
                Premium Performance
              </div>
              <h2 className="mt-2 text-5xl font-black uppercase leading-[1.1] text-zinc-950 md:text-7xl tracking-tight pb-1">
                Všechny <span className="text-[#E10600]">Produkty</span>
              </h2>
            </div>
          </Reveal>

          {/* MAIN GRID */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-16 sm:gap-x-12 sm:gap-y-24 mb-32">
            {allSupplements.map((product, index) => {
              return (
                <Reveal key={product.id} delay={(index % 2) * 0.1}>
                  <div className="w-full">
                    <ProductCard 
                      product={product as any} 
                      index={index}
                      isDark={false}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* Founder Story Section */}
      <section className="bg-zinc-950 py-16 md:py-24 overflow-hidden relative">
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
                <div className="space-y-6 text-xl text-zinc-400 font-medium leading-relaxed">
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

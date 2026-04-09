import WowHero from '@/components/home/WowHero';
import WowHomepageSections from '@/components/home/WowHomepageSections';

export default function SupplementsPage() {
  return (
    <>
      <WowHero />
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
      <WowHomepageSections hideCategories={true} />
    </>
  );
}

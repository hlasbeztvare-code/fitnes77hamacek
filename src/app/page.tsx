import WowHero from '@/components/home/WowHero';
import WowHomepageSections from '@/components/home/WowHomepageSections';

export default function HomePage() {
  return (
    <>
      <WowHero />
      <section className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-4 py-5 md:grid-cols-4">
          <div className="text-center text-xs font-black uppercase tracking-[0.16em] text-white">
            DOPRAVA ZDARMA NAD 2000 Kč
          </div>
          <div className="text-center text-xs font-black uppercase tracking-[0.16em] text-white">
            FITNESS 77 MB
          </div>
          <div className="text-center text-xs font-black uppercase tracking-[0.16em] text-white">
            SKLADEM V MLADÉ BOLESLAVI
          </div>
          <div className="text-center text-xs font-black uppercase tracking-[0.16em] text-[#E10600]">
            PERFORMANCE STANDARD
          </div>
        </div>
      </section>
      <WowHomepageSections />
    </>
  );
}

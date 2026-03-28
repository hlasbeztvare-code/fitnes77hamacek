import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';

export default function GymPage() {
  // Hardcoded fotky pro jistotu, aby web nespadl, když galerie neexistuje
  const services = [
    { name: 'RAW_ENTRY', price: '180', time: '1_Day' },
    { name: 'WARRIOR_30', price: '1290', time: '30_Days' },
    { name: 'ELITE_365', price: '10900', time: '365_Days' }
  ];

  return (
    <main className="bg-white min-h-screen text-black selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. COMPACT HERO (The Levitating Brand) */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-white border-b border-black/5">
        <div className="max-w-[1200px] w-full mx-auto relative z-20 flex flex-col items-center justify-center">
          <Reveal>
            <h1 className="text-6xl md:text-[8.5rem] font-black uppercase italic leading-[0.8] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="mt-[-2px]">
              <h2 className="text-7xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2.5px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 15px 30px rgba(225,6,0,0.2))' 
                  }}>
                HARDCORE
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. THE COMMANDERS (Frameless & World-Class) */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal x={-30}>
            <div className="group relative">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom" priority />
              </div>
              <div className="mt-8 border-l-4 border-[#E10600] pl-6">
                <h3 className="text-4xl font-black uppercase italic leading-none">Hamáček</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] italic mt-2">Founder // FTVS_UK</p>
              </div>
            </div>
          </Reveal>
          
          <Reveal x={30} delay={0.2}>
            <div className="group relative md:mt-24">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom" priority />
              </div>
              <div className="mt-8 border-l-4 border-black pl-6">
                <h3 className="text-4xl font-black uppercase italic leading-none">Soustružník</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] italic mt-2">Elite_Coach // Pro_Unit</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. PRICING (Sovereign Strip List) */}
      <section className="py-32 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal><h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-[#E10600] mb-12 italic text-center">Pricing_Units</h2></Reveal>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map((p, i) => (
              <div key={i} className="py-12 flex justify-between items-center group cursor-pointer hover:bg-white hover:text-black transition-all duration-500 px-4">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100">{p.time}</span>
                <h4 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                <span className="text-4xl md:text-5xl font-black italic">{p.price},-</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

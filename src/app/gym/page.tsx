import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';

export default function GymPage() {
  return (
    <main className="bg-white min-h-screen text-black selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. IRON HERO - Typo Overlap */}
      <section className="relative h-[60vh] flex flex-col justify-end px-4 pb-12 border-b-8 border-black">
        <Reveal y={50}>
          <div className="max-w-[1800px] mx-auto w-full">
            <h1 className="text-[12vw] md:text-[15vw] font-black uppercase italic leading-[0.7] tracking-tighter text-black">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex justify-between items-end mt-4">
               <p className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400">RAW_HERITAGE // UNIT_01</p>
               <h2 className="text-[10vw] font-black uppercase italic leading-[0.7] tracking-tighter"
                   style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. THE ELITE COMMANDERS - IronVault Style */}
      <section className="bg-black text-white">
        <div className="grid md:grid-cols-2">
          {/* Hamáček - old_web_1 */}
          <div className="relative group border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
            <div className="absolute top-10 left-10 z-20">
               <span className="text-[#E10600] font-black italic text-6xl">01</span>
               <h3 className="text-4xl font-black uppercase italic leading-none mt-2">Hamáček</h3>
            </div>
            <div className="relative h-[80vh] w-full grayscale contrast-150 brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-center" priority />
            </div>
            <div className="absolute bottom-10 left-10 z-20 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#E10600]">Founder // Head Coach</p>
               <p className="mt-2 text-xs font-medium uppercase italic leading-relaxed text-zinc-400">
                 Absolvent FTVS UK. Strategie, síla, nekompromisní výsledky. Jiráskova 1320.
               </p>
            </div>
          </div>

          {/* Soustružník - old_web_2 */}
          <div className="relative group border-white/10 overflow-hidden">
            <div className="absolute top-10 right-10 z-20 text-right">
               <span className="text-white/20 font-black italic text-6xl group-hover:text-[#E10600] transition-colors">02</span>
               <h3 className="text-4xl font-black uppercase italic leading-none mt-2">Soustružník</h3>
            </div>
            <div className="relative h-[80vh] w-full grayscale contrast-150 brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-center" priority />
            </div>
            <div className="absolute bottom-10 right-10 z-20 max-w-xs text-right opacity-0 group-hover:opacity-100 transition-opacity">
               <p className="text-[10px] font-black uppercase tracking-widest text-[#E10600]">Elite Coach // Pro Unit</p>
               <p className="mt-2 text-xs font-medium uppercase italic leading-relaxed text-zinc-400">
                 Technika, dynamika a posouvání hranic lidského těla v každém tréninku.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCESS PROTOCOL - Brutalist List */}
      <section className="py-40 bg-white">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-baseline justify-between mb-20 border-b-4 border-black pb-4">
             <h2 className="text-8xl font-black uppercase italic tracking-tighter">PRICING</h2>
             <p className="text-xs font-black uppercase tracking-[0.5em] text-zinc-300 italic">No_Bullshit_Policy</p>
          </div>
          <div className="space-y-0">
            {[
              { id: '01', name: 'SINGLE_ENTRY', price: '180' },
              { id: '02', name: 'MONTH_WARRIOR', price: '1290' },
              { id: '03', name: 'YEAR_LEGACY', price: '10900' }
            ].map((p) => (
              <div key={p.id} className="group py-16 border-b-2 border-black/5 flex justify-between items-center hover:bg-black transition-all duration-700 hover:px-12 cursor-pointer">
                <h4 className="text-5xl md:text-8xl font-black uppercase italic leading-none tracking-tighter group-hover:text-white transition-colors">{p.name}</h4>
                <div className="text-right group-hover:text-white transition-colors">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#E10600] mb-2">ACCESS_LEVEL_{p.id}</span>
                  <span className="text-6xl font-black italic leading-none">{p.price} CZK</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA - The Final Smash */}
      <section className="h-[50vh] bg-[#E10600] flex flex-col items-center justify-center text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 text-[25vw] font-black italic tracking-tighter whitespace-nowrap select-none pointer-events-none">
          JOIN THE VAULT JOIN THE VAULT
        </div>
        <Reveal>
           <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter relative z-10">PŘIJĎ TRÉNOVAT</h2>
           <div className="mt-8 flex justify-center relative z-10">
              <button className="bg-black text-white px-12 py-5 font-black uppercase italic tracking-widest hover:scale-110 transition-transform">Get_Access_Now</button>
           </div>
        </Reveal>
      </section>
    </main>
  );
}

import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';

export default async function GymPage() {
  const galleryDir = path.join(process.cwd(), 'public/images/gym/gallery');
  let galleryFiles: string[] = [];
  try {
    if (fs.existsSync(galleryDir)) {
      galleryFiles = fs.readdirSync(galleryDir).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    }
  } catch (e) {}

  return (
    <main className="bg-black min-h-screen text-white selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO - Typo Overlap (The Built Different Vibe) */}
      <section className="relative h-screen flex flex-col justify-end px-4 pb-20 border-b-8 border-[#E10600]">
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <Reveal y={50}>
          <div className="max-w-[1800px] mx-auto w-full relative z-10">
            <h1 className="text-[15vw] md:text-[18vw] font-black uppercase italic leading-[0.7] tracking-tighter text-white drop-shadow-2xl">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex justify-between items-end mt-4">
               <p className="text-[10px] font-black uppercase tracking-[1em] text-zinc-400">RAW_HERITAGE // UNIT_01</p>
               <h2 className="text-[12vw] font-black uppercase italic leading-[0.7] tracking-tighter"
                   style={{ WebkitTextStroke: '2px #E10600', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
            <p className="mt-10 text-xl font-bold uppercase tracking-widest text-zinc-300 max-w-2xl">
              Elite training environment for those who refuse average. Discipline Changes Everything.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 2. OUR PROGRAMS - IronVault Grid (Brutalist Blocks) */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-[1600px] mx-auto px-4">
          <Reveal><h2 className="text-8xl font-black uppercase italic tracking-tighter mb-20">OUR PROGRAMS</h2></Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: '01', name: 'STRENGTH & HYPERTROPHY', text: 'Build raw power. Intense sessions, measurable results.' },
              { id: '02', name: 'ATHLETIC CONDITIONING', text: 'Move like an elite. Agility, speed, and endurance.' },
              { id: '03', name: 'PERSONAL COACHING', text: 'One-on-one transformation. Tailored to your legacy.' }
            ].map((program) => (
              <Reveal key={program.id} y={30} delay={parseInt(program.id) * 0.1}>
                <div className="relative group border-4 border-black/10 hover:border-[#E10600] transition-all duration-700 bg-black">
                   <div className="absolute top-8 left-8 z-20">
                      <span className="text-white/20 font-black italic text-6xl group-hover:text-[#E10600] transition-colors">{program.id}</span>
                      <h3 className="text-4xl font-black uppercase italic leading-none mt-2 group-hover:text-white transition-colors">{program.name}</h3>
                   </div>
                   <div className="relative aspect-[4/5] grayscale group-hover:grayscale-0 transition-all duration-1000">
                      {/* You'd put relevant image here later */}
                   </div>
                   <div className="absolute bottom-8 left-8 z-20 max-w-xs text-left">
                      <p className="text-sm font-medium uppercase italic leading-relaxed text-zinc-400">
                         {program.text}
                      </p>
                      <button className="mt-6 bg-[#E10600] text-white px-8 py-3 font-black uppercase italic tracking-widest text-sm hover:scale-110 transition-transform">Learn_More</button>
                   </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE ELITE COMMANDERS - IronVault Swapped (old_web_1 is Hamacek) */}
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

      {/* 4. MEMBERSHIP - Brutalist Cards */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-[1600px] mx-auto px-4">
          <Reveal><h2 className="text-8xl font-black uppercase italic tracking-tighter mb-20 text-center">MEMBERSHIP</h2></Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { id: '01', name: 'RAW_ENTRY', price: '180', text: '1_Day_Pass // Single_Unit' },
              { id: '02', name: 'WARRIOR_30', price: '1290', text: '30_Days // Full_Access' },
              { id: '03', name: 'ELITE_365', price: '10900', text: '365_Days // Legacy_Pass' }
            ].map((p) => (
              <Reveal key={p.id} y={30} delay={parseInt(p.id) * 0.1}>
                 <div className="bg-black border-4 border-black/10 hover:border-[#E10600] transition-all duration-700 p-10 flex flex-col items-start h-full cursor-pointer">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E10600] mb-2">{p.text}</span>
                    <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">{p.name}</h4>
                    <div className="flex-grow"></div>
                    <div className="flex justify-between items-baseline w-full mt-10">
                       <span className="text-6xl font-black italic">{p.price} CZK</span>
                       <button className="bg-[#E10600] text-white px-10 py-4 font-black uppercase italic tracking-widest text-sm hover:scale-110 transition-transform">Get_Access</button>
                    </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

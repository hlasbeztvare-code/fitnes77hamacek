import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

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
      
      {/* 1. HERO - NEDOTKNUTELNÁ SEKCE (Zůstává přesně podle tvého přání) */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 border-b-4 border-[#E10600] bg-zinc-950">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex justify-between items-center mt-2">
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. TRAINERS & PERSONAL STACKS - High-End Integration */}
      <section className="bg-black">
        <div className="grid md:grid-cols-2 max-w-[1800px] mx-auto border-b border-white/5">
          
          {/* HAMÁČEK - THE FOUNDER STACK */}
          <div className="relative group border-r border-white/5 overflow-hidden flex flex-col justify-end min-h-[60vh] p-10">
            <div className="absolute inset-0 grayscale contrast-125 brightness-[0.2] group-hover:brightness-[0.4] transition-all duration-1000">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000" priority />
            </div>
            
            <div className="relative z-20 space-y-6">
              <div className="mb-4">
                <span className="text-[#E10600] font-black italic text-5xl">01</span>
                <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter">Hamáček</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.6em] mt-2 italic">COMMANDER_UNIT</p>
              </div>

              {/* TECHNICAL STACK DISPLAY */}
              <div className="space-y-2 max-w-sm">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">DAILY_STACK_PROTOCOL</p>
                {[
                  { name: '100%_WHEY_ISOLATE', slug: 'whey', price: '790' },
                  { name: 'CREATINE_MONO_PRO', slug: 'creatine', price: '450' },
                  { name: 'F77_PRE_IGNITER', slug: 'pre-workout', price: '890' }
                ].map((item, idx) => (
                  <Link key={idx} href={`/shop/${item.slug}`} className="group/item flex justify-between items-center border border-white/10 p-3 hover:bg-[#E10600] hover:border-[#E10600] transition-all">
                    <span className="text-[10px] font-black italic tracking-widest">{item.name}</span>
                    <span className="text-[9px] font-black opacity-40 group-hover/item:opacity-100">{item.price}_CZK</span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <Link href="/shop?category=plans" className="bg-white text-black px-8 py-3 text-[10px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all transform hover:scale-105">
                  GET_BATTLE_PLAN
                </Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK - THE ELITE STACK */}
          <div className="relative group overflow-hidden flex flex-col justify-end min-h-[60vh] p-10 text-right">
            <div className="absolute inset-0 grayscale contrast-125 brightness-[0.2] group-hover:brightness-[0.4] transition-all duration-1000">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000" priority />
            </div>
            
            <div className="relative z-20 flex flex-col items-end space-y-6">
              <div className="mb-4">
                <span className="text-white/20 font-black italic text-5xl group-hover:text-[#E10600] transition-colors">02</span>
                <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter">Soustružník</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.6em] mt-2 italic">ELITE_CONDITIONING</p>
              </div>

              {/* TECHNICAL STACK DISPLAY */}
              <div className="space-y-2 w-full max-w-sm">
                <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 text-right">PERFORMANCE_STACK_PROTOCOL</p>
                {[
                  { name: 'BCAA_8:1:1_ELITE', slug: 'bcaa', price: '590' },
                  { name: 'ZMB_CORE_TESTO', slug: 'zmb', price: '420' },
                  { name: 'VITA_COMPLEX_F77', slug: 'vitamins', price: '380' }
                ].map((item, idx) => (
                  <Link key={idx} href={`/shop/${item.slug}`} className="group/item flex justify-between items-center border border-white/10 p-3 hover:bg-white hover:text-black hover:border-white transition-all">
                    <span className="text-[9px] font-black opacity-40 group-hover/item:opacity-100">{item.price}_CZK</span>
                    <span className="text-[10px] font-black italic tracking-widest">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <Link href="/shop?category=plans" className="bg-[#E10600] text-white px-8 py-3 text-[10px] font-black uppercase italic hover:bg-white hover:text-black transition-all transform hover:scale-105">
                  ELITE_PROGRAMS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCESS PROTOCOL - SUPER CLEAN */}
      <section className="py-20 bg-zinc-950 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-t border-white/10">
            {[
              { name: 'RAW_ENTRY', price: '180' },
              { name: 'WARRIOR_30', price: '1290' },
              { name: 'ELITE_365', price: '10900' }
            ].map((p, i) => (
              <div key={i} className="group py-8 border-b border-white/10 flex justify-between items-center hover:px-6 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black">
                <h4 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                <span className="text-3xl font-black italic">{p.price} CZK</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

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
      
      {/* 1. HERO - NEDOTKNUTELNÁ SEKCE (Respektuju tvůj příkaz) */}
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

      {/* 2. THE CORE TRINITY - Compact 3-Column Layout */}
      <section className="bg-black border-b border-white/5">
        <div className="grid md:grid-cols-[1fr,minmax(300px,400px),1fr] max-w-[1800px] mx-auto items-stretch">
          
          {/* LEFT FLANK - HAMÁČEK (Color, Compact) */}
          <div className="relative group border-r border-white/5 overflow-hidden flex flex-col justify-end h-[50vh] p-6">
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top" priority />
            </div>
            
            <div className="relative z-20 space-y-3 bg-black/60 backdrop-blur-sm p-4 border border-white/10 max-w-sm">
              <div>
                <span className="text-[#E10600] font-black italic text-3xl">01</span>
                <h3 className="text-2xl font-black uppercase italic leading-none">Hamáček</h3>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 italic">UNIT_COMMANDER</p>
              </div>
              <div className="flex gap-2">
                <Link href="/shop?category=plans" className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all transform hover:skew-x-[-12deg]">
                  BATTLE_PLANS
                </Link>
                <Link href="/shop/hamacek-stack" className="px-4 py-2 border border-white/30 text-white text-[9px] font-black uppercase italic hover:border-white transition-all transform hover:skew-x-[-12deg]">
                  THE_STACK
                </Link>
              </div>
            </div>
          </div>

          {/* CENTER CORE - PERMANENTKY (Super Compact) */}
          <div className="bg-zinc-950 px-4 py-8 flex flex-col justify-center border-r border-white/5">
            <div className="space-y-0 border-t border-white/10">
              {[
                { name: 'RAW_ENTRY', price: '180' },
                { name: 'WARRIOR_30', price: '1290' },
                { name: 'ELITE_365', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="group py-5 border-b border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all duration-300 px-3 cursor-pointer">
                  <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                  <span className="text-xl md:text-2xl font-black italic">{p.price} CZK</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FLANK - SOUSTRUŽNÍK (Color, Compact) */}
          <div className="relative group overflow-hidden flex flex-col justify-end h-[50vh] p-6 text-right">
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top" priority />
            </div>
            
            <div className="relative z-20 flex flex-col items-end space-y-3 bg-black/60 backdrop-blur-sm p-4 border border-white/10 max-w-sm">
              <div>
                <span className="text-white/20 font-black italic text-3xl group-hover:text-[#E10600] transition-colors">02</span>
                <h3 className="text-2xl font-black uppercase italic leading-none">Soustružník</h3>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1 italic">ELITE_CONDITIONING</p>
              </div>
              <div className="flex gap-2">
                <Link href="/shop/soustruznik-stack" className="px-4 py-2 border border-white/30 text-white text-[9px] font-black uppercase italic hover:border-white transition-all transform hover:skew-x-[-12deg]">
                  ELITE_STACK
                </Link>
                <Link href="/shop?category=plans" className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all transform hover:skew-x-[-12deg]">
                  PROGRAMS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VAULT GALLERY - ATOMIC GRID (No borders, just fuel) */}
      <section className="p-0.5 bg-black">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-0.5">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group border border-white/5">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

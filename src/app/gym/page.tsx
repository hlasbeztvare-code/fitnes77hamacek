import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import { db } from "@/lib/db";

export default async function GymPage() {
  const galleryDir = path.join(process.cwd(), 'public/images/gym/gallery');
  let galleryFiles: string[] = [];
  try {
    if (fs.existsSync(galleryDir)) {
      galleryFiles = fs.readdirSync(galleryDir).filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    }
  } catch (e) {}

  return (
    <main className="bg-zinc-950 min-h-screen text-white pb-32 selection:bg-[#E10600]">
      {/* SECTION 1: HERO & CORE DNA */}
      <section className="relative py-32 px-4 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none italic font-black text-[20vw] leading-none select-none -translate-x-10 uppercase">BOLESLAV</div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#E10600]" /> Jiráskova 1320, Mladá Boleslav
            </span>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase italic mt-6 mb-16 leading-[0.8] tracking-tighter">
              HARDCORE <br/><span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}>HERITAGE</span>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-16 mt-24">
              {/* LEVÝ SLOUPEC: BIO TRENÉRA (Rozsekaný) */}
              <div className="space-y-8">
                <div className="border-l-4 border-[#E10600] pl-8">
                  <h2 className="text-2xl font-black uppercase italic mb-4">Elite Coaching DNA</h2>
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                    Absolvent FTVS při UK a zkušený fitness trenér se specializací na individuální tréninkové plány.
                  </p>
                </div>
                
                <div className="pl-9 space-y-4">
                  <p className="text-zinc-500 text-base leading-relaxed uppercase font-bold tracking-tight">
                    • Odborné znalosti anatomie & fyziologie<br/>
                    • Prevence zranění & správná technika<br/>
                    • Postupný pokrok k tvým cílům
                  </p>
                  <p className="text-[#E10600] font-black uppercase tracking-widest text-sm italic mt-6">
                    „Aby jsi i TY dosáhl svých cílů.“
                  </p>
                </div>
              </div>
              
              {/* PRAVÝ SLOUPEC: INFO BOX (Otevíračka & Adresa) */}
              <div className="bg-zinc-900/30 p-10 border border-white/5 backdrop-blur-sm relative">
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E10600]/30" />
                
                <h3 className="text-zinc-500 text-xs tracking-[0.3em] mb-10 uppercase font-black">Provozní doba</h3>
                
                <div className="space-y-6 uppercase font-black tracking-tighter italic text-2xl">
                  <div className="flex justify-between items-center group">
                    <span className="text-zinc-600 group-hover:text-white transition-colors">PO - PÁ</span>
                    <span className="text-[#E10600]">06:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-zinc-600 group-hover:text-white transition-colors">SO - NE</span>
                    <span className="text-[#E10600]">08:00 - 20:00</span>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5">
                  <p className="text-xs text-zinc-500 tracking-[0.2em] mb-2 uppercase">Lokace</p>
                  <p className="text-lg font-black italic uppercase">Jiráskova 1320, Mladá Boleslav</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: GALLERY GRID (40+ fotek) */}
      <section className="px-4 py-24">
        <div className="max-w-[1800px] mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryFiles.map((file, i) => (
            <Reveal key={file} delay={i * 0.01}>
              <div className="relative group overflow-hidden border border-white/5 bg-zinc-900 hover:border-[#E10600]/40 transition-all duration-700">
                <img src={`/images/gym/gallery/${file}`} alt={`F77 DNA ${i}`} className="w-full h-auto grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.05] transition-all duration-1000" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3: ALPHA CONVERSION */}
      <section className="py-40 text-center px-4">
        <Reveal>
          <span className="text-zinc-600 font-black uppercase tracking-widest text-xs">Nejlépe vybavené fitness v MB</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase italic mt-4 mb-12 tracking-tighter">VYBAVENÍ <span className="text-[#E10600]">ELITE</span></h2>
          <a href="/supplements" className="bg-[#E10600] text-white px-20 py-8 font-black uppercase italic text-3xl transition-all hover:bg-white hover:text-black hover:-skew-x-6 inline-block">KOUPIT SUPLEMENTY</a>
        </Reveal>
      </section>
    </main>
  );
}

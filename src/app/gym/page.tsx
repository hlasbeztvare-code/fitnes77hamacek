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
    <main className="bg-zinc-950 min-h-screen text-white pb-20 selection:bg-[#E10600]">
      {/* SECTION 1: HERO & CORE DNA (Zmenšeno) */}
      <section className="relative py-16 md:py-24 px-4 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none italic font-black text-[15vw] leading-none select-none -translate-x-5 uppercase">BOLESLAV</div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <span className="text-[#E10600] font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#E10600]" /> Jiráskova 1320, Mladá Boleslav
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic mt-4 mb-10 leading-[0.9] tracking-tighter">
              HARDCORE <br/><span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}>HERITAGE</span>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div className="space-y-6">
                <div className="border-l-2 border-[#E10600] pl-6">
                  <h2 className="text-xl font-black uppercase italic mb-2">Elite Coaching DNA</h2>
                  <p className="text-zinc-400 text-base leading-relaxed">
                    Absolvent FTVS při UK a zkušený fitness trenér se specializací na individuální tréninkové plány.
                  </p>
                </div>
                
                <div className="pl-7 space-y-2">
                  <p className="text-zinc-500 text-sm uppercase font-bold tracking-tight leading-snug">
                    • Odborná anatomie & fyziologie<br/>
                    • Prevence zranění & technika<br/>
                    • Postupný pokrok k cílům
                  </p>
                  <p className="text-[#E10600] font-black uppercase tracking-widest text-[11px] italic mt-4">
                    „Aby jsi i TY dosáhl svých cílů.“
                  </p>
                </div>
              </div>
              
              <div className="bg-zinc-900/40 p-6 border border-white/5 backdrop-blur-sm relative max-w-sm">
                <h3 className="text-zinc-600 text-[10px] tracking-[0.2em] mb-6 uppercase font-black">Provozní doba</h3>
                
                <div className="space-y-4 uppercase font-black tracking-tighter italic text-xl">
                  <div className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-white transition-colors">PO - PÁ</span>
                    <span className="text-[#E10600]">06:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-zinc-500 group-hover:text-white transition-colors">SO - NE</span>
                    <span className="text-[#E10600]">08:00 - 20:00</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-sm font-black italic uppercase text-zinc-300 tracking-tight">Jiráskova 1320, Mladá Boleslav</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: COMPACT GALLERY GRID */}
      <section className="px-2 py-12">
        <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <Reveal key={file} delay={i * 0.01}>
              <div className="relative group overflow-hidden border border-white/5 bg-zinc-900 transition-all duration-500">
                <img src={`/images/gym/gallery/${file}`} alt={`F77 DNA ${i}`} className="w-full h-auto grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3: COMPACT ALPHA CONVERSION */}
      <section className="py-20 text-center px-4">
        <Reveal>
          <span className="text-zinc-600 font-black uppercase tracking-widest text-[10px]">Nejlépe vybavené fitness v MB</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic mt-3 mb-10 tracking-tighter">VYBAVENÍ <span className="text-[#E10600]">ELITE</span></h2>
          <a href="/supplements" className="bg-[#E10600] text-white px-10 py-5 font-black uppercase italic text-xl transition-all hover:bg-white hover:text-black hover:-skew-x-3 inline-block">KOUPIT SUPLEMENTY</a>
        </Reveal>
      </section>
    </main>
  );
}

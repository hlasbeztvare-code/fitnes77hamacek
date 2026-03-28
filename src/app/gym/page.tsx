import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import { db } from "@/lib/db";
import Image from 'next/image';

export default async function GymPage() {
  // 1. Automatické načtení stažených fotek z galerie (těch 40 kousků)
  const galleryDir = path.join(process.cwd(), 'public/images/gym/gallery');
  let galleryFiles: string[] = [];
  try {
    if (fs.existsSync(galleryDir)) {
      galleryFiles = fs.readdirSync(galleryDir).filter(file => 
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      );
    }
  } catch (e) {
    console.error("Galerie nenalezena, koukoute!");
  }

  // 2. Načtení 'vstříknutých' textů z databáze (z inject.ts)
  const legacyContent = await db.trainer.findUnique({
    where: { slug: 'heritage-data' }
  });

  return (
    <main className="bg-zinc-950 min-h-screen text-white pb-32 selection:bg-[#E10600]">
      {/* SECTION 1: HERITAGE HERO - Starej web v novým kabátu */}
      <section className="relative py-32 px-4 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none italic font-black text-[25vw] leading-none select-none -translate-x-10">
          77_DNA
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#E10600]" /> Mladá Boleslav // Est. 2014
            </span>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase italic mt-6 mb-10 leading-[0.8] tracking-tighter">
              Hardcore <br/><span className="text-zinc-800 outline-text">Heritage</span>
            </h1>
            <div className="grid md:grid-cols-2 gap-16 items-end mt-20">
              <p className="text-zinc-400 text-xl leading-relaxed font-medium border-l-2 border-[#E10600] pl-8">
                {legacyContent?.bio || "Vzali jsme duši původního fitness77.cz a voperovali ji do moderního kódu. Takhle vypadá 10 let disciplíny, železa a výsledků."}
              </p>
              <div className="hidden md:flex flex-col gap-2 items-end">
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Archive Status: Online</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Assets: {galleryFiles.length} Raw Images</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: THE GALLERY MASHUP - Agresivní Masonry Grid */}
      <section className="px-4 py-16">
        <div className="max-w-[1800px] mx-auto columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {galleryFiles.map((file, i) => (
            <Reveal key={file} delay={i * 0.02}>
              <div className="relative group overflow-hidden border border-white/5 bg-zinc-900 rounded-none shadow-2xl hover:border-[#E10600]/40 transition-all duration-700">
                <img
                  src={`/images/gym/gallery/${file}`}
                  alt={`Fitness 77 Archive ${i}`}
                  className="w-full h-auto grayscale contrast-150 brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-1000 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#E10600] mb-2">RAW_DATA_MB // 0{i+1}</span>
                  <p className="text-sm font-black text-white uppercase italic tracking-tighter">Vizuální historie Fitness 77</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3: ALFA & OMEGA CONVERSION - Tady se prodává */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black uppercase italic mb-10 tracking-tighter">
              Chceš stejný <span className="text-[#E10600]">výsledky?</span>
            </h2>
            <p className="text-zinc-500 text-xl mb-16 max-w-2xl mx-auto uppercase font-bold tracking-tight">
              Díváš se na 10 let historie. Pokud chceš bejt součástí další kapitoly, potřebuješ správný palivo.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <a 
                href="/supplements" 
                className="group relative bg-[#E10600] text-white px-16 py-8 font-black uppercase italic text-2xl transition-all duration-300 hover:pr-20"
              >
                Koupit suplementy
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all">→</span>
              </a>
              <a 
                href="/kontakt" 
                className="text-white px-16 py-8 font-black uppercase italic text-2xl border border-white/10 hover:bg-white hover:text-black transition-all"
              >
                Domluvit trénink
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
      `}</style>
    </main>
  );
}

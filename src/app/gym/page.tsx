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
    <main className="bg-white min-h-screen text-black pb-32 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. CLEAN LIGHT HERO (Zmenšeno, bílé pozadí, masivní hloubka) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#fbfbfb]">
        
        {/* Jemný technický grid pro Apple-Vibe */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          
          {/* HAMÁČEK - LEFT (Clean Grayscale) */}
          <div className="absolute left-[-2%] bottom-[-5%] hidden lg:block w-[380px] h-[500px] z-30">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom grayscale contrast-125" priority />
                {/* Přechod do bílé místo černé */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fbfbfb] via-transparent to-transparent z-40" />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRANDING (Masivní drop-shadow hloubka) */}
          <div className="relative z-20 text-center px-4">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-3 bg-black/5 px-4 py-1 border border-black/5 transform -skew-x-12">
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] italic">RAW_BOLKA // SINCE 2014</span>
              </div>
              
              {/* FITNESS77 (Bílá záře nahrazena černým hlubokým stínem) */}
              <h1 className="text-6xl md:text-[8rem] font-black uppercase italic leading-[0.85] tracking-tighter text-black drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              
              {/* HARDCORE (Červený obrys s hloubkou) */}
              <div className="mt-[-5px]">
                <h2 className="text-7xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                    style={{ WebkitTextStroke: '2.5px #E10600', color: 'transparent', filter: 'drop-shadow(0 15px 30px rgba(225,6,0,0.2))' }}>
                  HARDCORE
                </h2>
              </div>

              <p className="mt-6 text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] italic">
                  Jiráskova 1320 // Mladá Boleslav
              </p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - RIGHT (Secondary) */}
          <div className="absolute right-[-2%] bottom-[-5%] hidden lg:block w-[320px] h-[450px] z-10 opacity-40">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom grayscale contrast-110" priority />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbfbfb] via-transparent to-transparent z-40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. GALLERY (Masonry on Light) */}
      <section className="py-20 px-2 bg-white">
        <div className="max-w-[1800px] mx-auto columns-2 md:columns-5 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group overflow-hidden border border-black/5 grayscale hover:grayscale-0 transition-all duration-700 bg-zinc-50 shadow-sm hover:shadow-xl">
               <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full opacity-80 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

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
    <main className="bg-white min-h-screen text-black pb-40 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. SOVEREIGN WHITE HERO (The Levitating Brand) */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-[#fdfdfd]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-4 bg-black/[0.03] px-5 py-1.5 border border-black/5 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#E10600] rounded-full animate-pulse" />
              <span className="text-black font-bold uppercase tracking-[0.4em] text-[9px] italic">Fitness77_Unit // MB_Core</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.08)) drop-shadow(0 30px 45px rgba(0,0,0,0.12))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="mt-[-8px]">
              <h2 className="text-8xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2.5px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 25px 50px rgba(225,6,0,0.22))' 
                  }}>
                HARDCORE
              </h2>
            </div>

            <div className="mt-12 flex items-center gap-6">
               <span className="h-[1px] w-12 bg-black/10" />
               <p className="text-zinc-400 font-bold uppercase tracking-[0.5em] text-[10px] italic">EST. 2014 // Heritage Hub</p>
               <span className="h-[1px] w-12 bg-black/10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY (Minimalist Brutalism) */}
      <section className="py-32 px-4 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid md:grid-cols-2 gap-20">
          <Reveal x={-20}>
            <div className="space-y-8">
              <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter">
                VĚDA POTKÁVÁ <br/><span className="text-[#E10600]">ŽELEZO.</span>
              </h3>
              <div className="w-20 h-2 bg-[#E10600]" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-xl font-medium leading-relaxed text-zinc-600 italic uppercase">
                Absolvent FTVS UK. Přes 10 let budování elitní komunity v Mladé Boleslavi. Jiráskova 1320 není jen adresa, je to standard.
              </p>
              <div className="flex gap-10 pt-6">
                <div>
                  <p className="text-4xl font-black italic">40+</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Strojů</p>
                </div>
                <div>
                  <p className="text-4xl font-black italic">100%</p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Výsledky</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. THE MUSEUM GALLERY (World-Class Dynamic Grid) */}
      <section className="bg-[#f8f8f8] py-32 border-y border-black/5">
        <div className="max-w-[1600px] mx-auto px-4">
          <Reveal>
            <div className="mb-20 text-center">
              <h2 className="text-xs font-black uppercase tracking-[0.8em] text-zinc-300 mb-4 italic">The_Visual_Archive</h2>
              <div className="h-[1px] w-20 bg-[#E10600] mx-auto" />
            </div>
          </Reveal>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {galleryFiles.map((file, i) => (
              <Reveal key={i} delay={i * 0.05} y={30}>
                <div className="relative group overflow-hidden bg-white shadow-2xl p-3 border border-black/5 transition-all duration-700 hover:-translate-y-4">
                  <div className="relative aspect-[4/5] overflow-hidden grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0">
                    <img 
                      src={`/images/gym/gallery/${file}`} 
                      alt="F77 Heritage" 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000"
                    />
                  </div>
                  <div className="pt-4 flex justify-between items-center px-2">
                    <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest">RAW_CAPTURE_{i}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION (The Closing) */}
      <section className="py-40 text-center">
        <Reveal>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-12">
            PŘESTAŇ <span className="text-[#E10600]">SNÍT.</span>
          </h2>
          <button className="px-12 py-5 bg-black text-white font-black uppercase italic tracking-widest hover:bg-[#E10600] transition-all transform hover:scale-110">
            Začít trénovat
          </button>
        </Reveal>
      </section>
    </main>
  );
}

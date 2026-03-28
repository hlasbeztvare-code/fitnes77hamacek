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
      
      {/* 1. THE PEAK HERO (Tvůj bílý masterpiece) */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-3 bg-black/5 px-4 py-1 border border-black/5 transform -skew-x-12">
              <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[9px] italic">F77_CORE // UNIT_01</span>
            </div>
            
            <h1 className="text-6xl md:text-[9.5rem] font-black uppercase italic leading-[0.85] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.1)) drop-shadow(0 30px 40px rgba(0,0,0,0.15))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="mt-[-5px]">
              <h2 className="text-7xl md:text-[10.5rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2.5px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 20px 40px rgba(225,6,0,0.3))' 
                  }}>
                HARDCORE
              </h2>
            </div>
          </Reveal>
        </div>
        {/* Agresivní řez do černé */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* 2. THE RAW PHILOSOPHY (Dark & Aggressive) */}
      <section className="relative py-32 bg-black border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 text-[15vw] font-black italic opacity-[0.02] pointer-events-none select-none leading-none">
          LEGACY
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 relative z-10">
          <Reveal x={-50}>
            <div className="space-y-6">
              <h3 className="text-6xl font-black italic uppercase leading-none tracking-tighter">
                ŽÁDNÝ <span className="text-[#E10600]">SRANÍ.</span><br/>JEN VÝSLEDKY.
              </h3>
              <p className="text-zinc-500 text-xl font-bold uppercase italic tracking-tighter border-l-4 border-[#E10600] pl-6">
                Absolvent FTVS UK. 10+ let budování elitní komunity. Jiráskova 1320 není adresa, je to diagnóza.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 p-8 border border-white/5">
                <p className="text-5xl font-black italic text-[#E10600]">40+</p>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">Masivních strojů</p>
              </div>
              <div className="bg-zinc-900/50 p-8 border border-white/5">
                <p className="text-5xl font-black italic text-white">100%</p>
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-2">Krev a pot</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. THE ARCHIVE (Industrial Masonry) */}
      <section className="py-20 bg-black">
        <div className="max-w-[1800px] mx-auto px-2 columns-2 md:columns-4 lg:columns-5 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <Reveal key={i} delay={i * 0.05} y={20}>
              <div className="relative group overflow-hidden border border-white/5 bg-zinc-900 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src={`/images/gym/gallery/${file}`} 
                  alt="Archive" 
                  className="w-full h-auto opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#E10600]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. THE COMMAND BAR (Permanentky) */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'ENTRY_PASS', price: '180' },
              { name: 'SOLDIER_30', price: '1290' },
              { name: 'ELITE_365', price: '10900' }
            ].map((p, i) => (
              <div key={i} className="bg-black border border-white/5 p-10 hover:border-[#E10600] transition-all group">
                <h4 className="text-zinc-600 font-black italic text-xs mb-4">TYPE_{p.name}</h4>
                <div className="text-5xl font-black italic mb-8 text-white group-hover:text-[#E10600] transition-colors">{p.price},-</div>
                <button className="w-full py-4 bg-zinc-900 text-white font-black uppercase italic tracking-widest hover:bg-[#E10600] transition-all">Grab_It</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

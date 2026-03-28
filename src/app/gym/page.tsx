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
      
      {/* 1. THE PEAK HERO (Tvůj bílý Masterpiece) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#fdfdfd]">
        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-3 bg-black/5 px-4 py-1 border border-black/5 transform -skew-x-12">
              <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[9px] italic font-mono">UNIT_F77_RAW // SINCE 2014</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.1)) drop-shadow(0 30px 45px rgba(0,0,0,0.12))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="mt-[-5px]">
              <h2 className="text-8xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2.5px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 20px 40px rgba(225,6,0,0.25))' 
                  }}>
                HARDCORE
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. TRAINERS SECTION (Vracíme Hamáčka a Soustružníka ve velkým stylu) */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-black/5">
        <Reveal><h2 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-300 mb-16 italic text-center">Elite_Commanders</h2></Reveal>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Hamáček */}
          <Reveal x={-30}>
            <div className="group relative bg-zinc-50 border border-black/5 p-8 flex gap-8 items-end overflow-hidden hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl">
              <div className="w-1/2 aspect-[3/4] relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom" />
              </div>
              <div className="w-1/2 pb-4">
                <h3 className="text-3xl font-black uppercase italic leading-none mb-2">Hamáček</h3>
                <p className="text-[10px] font-bold text-[#E10600] uppercase tracking-widest mb-4 italic">Founder // Head Coach</p>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase italic">Absolvent FTVS UK. Strategie, síla, nekompromisní výsledky.</p>
              </div>
            </div>
          </Reveal>
          {/* Soustružník */}
          <Reveal x={30} delay={0.2}>
            <div className="group relative bg-zinc-50 border border-black/5 p-8 flex gap-8 items-end overflow-hidden hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl">
              <div className="w-1/2 aspect-[3/4] relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom" />
              </div>
              <div className="w-1/2 pb-4">
                <h3 className="text-3xl font-black uppercase italic leading-none mb-2">Soustružník</h3>
                <p className="text-[10px] font-bold text-[#E10600] uppercase tracking-widest mb-4 italic">Elite Coach // Pro Unit</p>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed uppercase italic">Technika, dynamika a posouvání hranic lidskýho těla.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. PRICING (Sovereign White Cards) */}
      <section className="py-24 bg-[#f9f9f9] border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-0 border border-black/5 bg-white shadow-2xl">
          {[
            { name: 'RAW_ENTRY', price: '180', note: 'SINGLE_UNIT' },
            { name: 'WARRIOR_30', price: '1290', note: 'MOST_WANTED' },
            { name: 'ELITE_365', price: '10900', note: 'TOP_LEAGUE' }
          ].map((p, i) => (
            <div key={i} className="p-12 border-r last:border-0 border-black/5 hover:bg-black hover:text-white transition-all duration-700 group">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-[#E10600] italic">{p.note}</p>
              <h3 className="text-5xl font-black italic mb-12">{p.price},-</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-10 group-hover:text-zinc-600 transition-colors">TYPE_{p.name}</p>
              <button className="w-full py-4 border border-black/10 font-black uppercase italic text-[10px] tracking-widest group-hover:bg-[#E10600] group-hover:border-[#E10600] transition-all">
                Grab_Access
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE INFINITE WALL (World-Class Gallery) */}
      <section className="py-24 px-4 max-w-[1600px] mx-auto">
        <Reveal><h2 className="text-xs font-black uppercase tracking-[0.8em] text-zinc-300 mb-20 italic text-center">Visual_Archive_F77</h2></Reveal>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryFiles.map((file, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative overflow-hidden group border border-black/5 shadow-lg">
                <img 
                  src={`/images/gym/gallery/${file}`} 
                  alt="F77 Heritage" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

    </main>
  );
}

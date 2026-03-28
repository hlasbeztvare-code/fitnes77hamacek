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
      
      {/* 1. THE PEAK HERO (Tvůj Masterpiece) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-[#fdfdfd]">
        <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-3 bg-black/5 px-4 py-1 border border-black/5 transform -skew-x-12">
              <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[9px] italic">UNIT_F77_RAW // SINCE 2014</span>
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

      {/* 2. THE TECHNICAL GRID (Místo nudnýho textu) */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-black/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'AREA', value: '600m2' },
            { label: 'EQUIPMENT', value: '40+ UNITS' },
            { label: 'LOCATION', value: 'BOLKA' },
            { label: 'LEVEL', value: 'ELITE' }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">{item.label}</p>
                <p className="text-4xl font-black italic uppercase">{item.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. THE INFINITE WALL (World-Class Gallery) */}
      <section className="relative py-10 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {galleryFiles.map((file, i) => (
            <Reveal key={i} delay={i * 0.02} y={0} x={0}>
              <div className="relative aspect-square overflow-hidden group bg-zinc-100">
                <img 
                  src={`/images/gym/gallery/${file}`} 
                  alt="F77" 
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#E10600]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. THE PRICING (Sovereign Cards) */}
      <section className="py-32 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-0 border border-black/5">
          {[
            { name: 'ENTRY', price: '180' },
            { name: 'WARRIOR', price: '1290' },
            { name: 'ELITE', price: '10900' }
          ].map((p, i) => (
            <div key={i} className="p-12 border-r last:border-0 border-black/5 hover:bg-black hover:text-white transition-all duration-500 group">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-[#E10600]">TYPE_{p.name}</p>
              <h3 className="text-5xl font-black italic mb-12">{p.price},-</h3>
              <button className="w-full py-4 border border-black/10 font-black uppercase italic text-[10px] tracking-widest group-hover:border-white/20 transition-all">
                Select_Access
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

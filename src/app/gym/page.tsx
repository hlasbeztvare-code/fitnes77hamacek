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
    <main className="bg-white min-h-screen text-black pb-20 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. COMPACT HERO (Jen 45% výšky, masivní hloubka) */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-[#fdfdfd] border-b border-black/5">
        <div className="max-w-[1200px] w-full mx-auto relative z-10 flex flex-col items-center justify-center">
          <Reveal>
            <div className="mb-2 inline-flex items-center gap-2 bg-black/5 px-3 py-0.5 border border-black/5 transform -skew-x-12">
              <span className="text-[#E10600] font-black uppercase tracking-[0.3em] text-[8px] italic font-mono">F77_CORE</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black uppercase italic leading-[0.85] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 8px 8px rgba(0,0,0,0.08)) drop-shadow(0 20px 30px rgba(0,0,0,0.12))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="mt-[-4px]">
              <h2 className="text-6xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '1.8px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 15px 30px rgba(225,6,0,0.25))' 
                  }}>
                HARDCORE
              </h2>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. COMPACT TRAINERS & PRICES (Vše na jednom místě) */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* TRENÉŘI - Menší karty */}
          <div className="space-y-4">
            <Reveal><h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-4 italic">Commanders</h3></Reveal>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Hamáček', img: '/images/trainers/hlavacek.png', role: 'Head Coach' },
                { name: 'Soustružník', img: '/images/trainers/soustruznik.png', role: 'Elite Coach' }
              ].map((t, i) => (
                <Reveal key={i} x={-20} delay={i * 0.1}>
                  <div className="group relative bg-zinc-50 border border-black/5 p-4 flex flex-col items-center overflow-hidden hover:bg-white transition-all shadow-sm">
                    <div className="w-full aspect-[4/5] relative grayscale group-hover:grayscale-0 transition-all duration-700">
                      <Image src={t.img} alt={t.name} fill className="object-contain object-bottom" />
                    </div>
                    <div className="text-center pt-4">
                      <h4 className="text-lg font-black uppercase italic leading-none">{t.name}</h4>
                      <p className="text-[8px] font-bold text-[#E10600] uppercase tracking-widest italic">{t.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* PERMANENTKY - Úzký elegantní list */}
          <div className="space-y-4">
            <Reveal><h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-4 italic">Pricing_Units</h3></Reveal>
            <div className="border border-black/5 bg-white shadow-xl divide-y divide-black/5">
              {[
                { name: 'RAW_ENTRY', price: '180' },
                { name: 'WARRIOR_30', price: '1290' },
                { name: 'ELITE_365', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="p-6 flex justify-between items-center hover:bg-black hover:text-white transition-all group cursor-pointer">
                  <div>
                    <p className="text-[8px] font-black text-[#E10600] uppercase tracking-widest italic">TYPE_{p.name}</p>
                    <h4 className="text-2xl font-black italic">ACCESS_GRANTED</h4>
                  </div>
                  <div className="text-3xl font-black italic">{p.price},-</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. GALLERY - Menší Masonry pro šetření místa */}
      <section className="py-12 px-4 max-w-[1600px] mx-auto border-t border-black/5">
        <Reveal><h3 className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-300 mb-8 italic text-center">Archive_Scan</h3></Reveal>
        <div className="columns-3 md:columns-5 lg:columns-6 gap-2 space-y-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative overflow-hidden group border border-black/5 shadow-sm">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

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
    <main className="bg-white min-h-screen text-black selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. ULTRA-CLEAN COMPACT HERO (The Levitating Core) */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="max-w-[1200px] w-full mx-auto relative z-20 flex flex-col items-center justify-center pt-8">
          <Reveal>
            <h1 className="text-6xl md:text-[8.5rem] font-black uppercase italic leading-[0.8] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.12))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="mt-[-2px]">
              <h2 className="text-7xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 15px 30px rgba(225,6,0,0.25))' 
                  }}>
                HARDCORE
              </h2>
            </div>
            <div className="mt-8 flex items-center gap-4">
               <span className="h-[1px] w-8 bg-[#E10600]" />
               <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 italic">Mladá Boleslav // Jiráskova 1320</p>
               <span className="h-[1px] w-8 bg-[#E10600]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. THE ELITE COMMANDERS (Frameless & Aggressive) */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-4">
          <Reveal x={-40}>
            <div className="relative group cursor-crosshair">
              <div className="absolute top-0 left-0 text-[8rem] font-black italic opacity-[0.03] leading-none select-none">FOUNDER</div>
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom" />
              </div>
              <div className="mt-6">
                <h3 className="text-4xl font-black uppercase italic leading-none mb-1">Hamáček</h3>
                <p className="text-[10px] font-black text-[#E10600] uppercase tracking-[0.4em] italic">Head_of_Units // FTVS_UK</p>
              </div>
            </div>
          </Reveal>
          
          <Reveal x={40} delay={0.2}>
            <div className="relative group cursor-crosshair md:mt-32">
              <div className="absolute top-0 right-0 text-[8rem] font-black italic opacity-[0.03] leading-none select-none">ELITE</div>
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom" />
              </div>
              <div className="mt-6">
                <h3 className="text-4xl font-black uppercase italic leading-none mb-1">Soustružník</h3>
                <p className="text-[10px] font-black text-[#E10600] uppercase tracking-[0.4em] italic">Elite_Coach // Pro_Division</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. PRICING (Sovereign Minimalist List) */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal><h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-300 mb-12 italic text-center">Pricing_Structure</h2></Reveal>
          <div className="divide-y-2 divide-black/5 border-y-2 border-black/5">
            {[
              { name: 'RAW_ENTRY', price: '180', time: '1_Day' },
              { name: 'WARRIOR_30', price: '1290', time: '30_Days' },
              { name: 'ELITE_365', price: '10900', time: '365_Days' }
            ].map((p, i) => (
              <div key={i} className="py-10 flex flex-wrap justify-between items-center group hover:px-6 transition-all duration-500 cursor-pointer hover:bg-[#E10600] hover:text-white">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-white transition-all">{p.time}</span>
                <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                <span className="text-5xl font-black italic group-hover:translate-x-[-10px] transition-transform">{p.price},-</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE INFINITE WALL (Gallery without borders) */}
      <section className="py-20 bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-black italic text-[10px] tracking-widest">VIEW_ARCHIVE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

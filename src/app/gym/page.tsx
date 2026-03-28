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
      
      {/* 1. THE FLOATING HERO (Čistá síla, žádný ohraničení) */}
      <section className="relative h-[55vh] flex items-center justify-center bg-white">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <h1 className="text-7xl md:text-[9.5rem] font-black uppercase italic leading-[0.8] tracking-tighter text-black drop-shadow-2xl">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="mt-[-2px]">
              <h2 className="text-8xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 20px 40px rgba(225,6,0,0.15))' 
                  }}>
                HARDCORE
              </h2>
            </div>
            <div className="mt-12 flex items-center gap-6 justify-center">
               <span className="h-[1px] w-12 bg-black/20" />
               <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 italic">Jiráskova 1320 // MB</p>
               <span className="h-[1px] w-12 bg-black/20" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. ARCHITECTURAL TRAINERS (Vtekají do prostoru) */}
      <section className="py-20 bg-white relative">
        {/* Masivní background text, co spojuje sekce */}
        <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] select-none pointer-events-none z-0">
          <span className="text-[15rem] font-black italic tracking-tighter">ELITE COMMANDERS F77</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 grid md:grid-cols-2 gap-20 relative z-10">
          {/* HAMÁČEK */}
          <Reveal x={-40}>
            <div className="group relative">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:-translate-y-4">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom drop-shadow-xl" priority />
              </div>
              <div className="absolute bottom-10 left-[-20px] bg-white p-6 shadow-2xl border border-black/5 transform -skew-x-6 group-hover:border-[#E10600] transition-all duration-500">
                <h3 className="text-5xl font-black uppercase italic leading-none">Hamáček</h3>
                <p className="text-[10px] font-black text-[#E10600] uppercase tracking-[0.4em] italic mt-2">Founder // Head_Coach</p>
              </div>
            </div>
          </Reveal>
          
          {/* SOUSTRUŽNÍK */}
          <Reveal x={40} delay={0.2}>
            <div className="group relative md:mt-40">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:-translate-y-4">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom drop-shadow-xl" priority />
              </div>
              <div className="absolute bottom-10 right-[-20px] bg-white p-6 shadow-2xl border border-black/5 transform skew-x-6 group-hover:border-[#E10600] transition-all duration-500">
                <h3 className="text-5xl font-black uppercase italic leading-none text-right">Soustružník</h3>
                <p className="text-[10px] font-black text-[#E10600] uppercase tracking-[0.4em] italic mt-2 text-right">Elite_Coach // Pro_Unit</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. FLUID PRICING (Lineární elegance místo boxů) */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal><h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-zinc-300 mb-16 italic text-center">Access_Protocols</h2></Reveal>
          <div className="flex flex-col border-y-2 border-black/5">
            {[
              { name: 'RAW_ENTRY', price: '180', time: 'Single_Unit' },
              { name: 'WARRIOR_30', price: '1290', time: '30_Days' },
              { name: 'ELITE_365', price: '10900', time: '365_Days' }
            ].map((p, i) => (
              <div key={i} className="py-12 border-b last:border-0 border-black/5 flex flex-wrap justify-between items-center group cursor-pointer hover:bg-black hover:px-8 transition-all duration-500">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 transition-colors w-1/4">{p.time}</span>
                <h4 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter group-hover:text-white transition-colors w-1/2 text-center">{p.name}</h4>
                <span className="text-5xl font-black italic text-[#E10600] group-hover:scale-110 transition-transform w-1/4 text-right">{p.price},-</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FULL-BLEED INFINITE WALL (Galerie bez mezer) */}
      <section className="w-full bg-black">
        <div className="flex flex-wrap">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square w-1/2 md:w-1/4 lg:w-1/5 overflow-hidden group">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#E10600] mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

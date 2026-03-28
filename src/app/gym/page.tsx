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
    <main className="bg-black min-h-screen text-white pb-20 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. COMPACT ALPHA HERO - High Tension */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-[#E10600]/20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black">
        
        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          
          {/* HAMÁČEK - Compact & Sharp */}
          <div className="absolute left-[5%] bottom-0 hidden lg:block w-[380px] h-[550px] z-30">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full">
                <Image 
                  src="/images/trainers/hlavacek.png" 
                  alt="Hamáček" 
                  fill
                  className="object-contain object-bottom grayscale contrast-150 brightness-110 drop-shadow-[0_0_30px_rgba(225,6,0,0.2)]"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-40" />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRAND - FITNESS77 (Dominant but balanced) */}
          <div className="relative z-20 text-center">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-[1px] w-12 bg-[#E10600]" />
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] italic">EST. 2014</span>
                <span className="h-[1px] w-12 bg-[#E10600]" />
              </div>
              <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-[0_0_20px_rgba(225,6,0,0.4)]">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              <p className="mt-6 text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Mladá Boleslav // Hardcore Heritage</p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - Compact & Backgrounded */}
          <div className="absolute right-[5%] bottom-0 hidden lg:block w-[320px] h-[480px] z-10 opacity-50 contrast-125">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image 
                  src="/images/trainers/soustruznik.png" 
                  alt="Soustružník" 
                  fill
                  className="object-contain object-bottom grayscale"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent z-40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. PRICE LIST - Aggressive Red Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { name: 'SINGLE_PASS', price: '180', note: 'NO_LIMITS' },
            { name: 'WARRIOR_30', price: '1290', note: 'MOST_POPULAR' },
            { name: 'ELITE_365', price: '10900', note: 'BEST_VALUE' }
          ].map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="group relative bg-zinc-950 border-l-2 border-zinc-800 p-8 hover:border-[#E10600] transition-all duration-500 hover:bg-zinc-900/50 shadow-2xl">
                <p className="text-[#E10600] text-[10px] font-black mb-2 tracking-widest">{p.note}</p>
                <h3 className="text-xl font-black uppercase italic mb-6">{p.name}</h3>
                <div className="text-5xl font-black italic mb-8">{p.price},-</div>
                <button className="w-full py-4 border border-white/10 font-black uppercase italic text-sm group-hover:bg-[#E10600] group-hover:text-white transition-all">Grab Now</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. GALLERY - Compressed Masonry */}
      <section className="px-2">
        <div className="max-w-7xl mx-auto columns-2 md:columns-5 gap-2 space-y-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-auto opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

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
    <main className="bg-white min-h-screen text-black pb-24 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO MASTERPIECE (Tvůj bílý nápis se stínem) */}
      <section className="relative h-[50vh] flex items-center justify-center bg-white border-b border-black/5">
        <div className="max-w-[1400px] w-full mx-auto relative z-20 flex flex-col items-center justify-center pt-10">
          <Reveal>
            <h1 className="text-7xl md:text-[9.5rem] font-black uppercase italic leading-[0.8] tracking-tighter text-black"
                style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.15))' }}>
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="mt-[-2px]">
              <h2 className="text-8xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2.5px #E10600', 
                    color: 'transparent', 
                    filter: 'drop-shadow(0 25px 45px rgba(225,6,0,0.25))' 
                  }}>
                HARDCORE
              </h2>
            </div>
            <p className="mt-8 text-zinc-400 font-bold uppercase tracking-[0.5em] text-[10px] italic">MB // JIRÁSKOVA 1320</p>
          </Reveal>
        </div>
      </section>

      {/* 2. TRAINERS (S názvy old_web_1 a old_web_2) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          {/* Hamáček */}
          <Reveal x={-30}>
            <div className="group relative">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0">
                <Image 
                  src="/images/trainers/old_web_2.jpg" 
                  alt="Hamáček" 
                  fill 
                  className="object-contain object-bottom" 
                  priority 
                />
              </div>
              <div className="mt-6 border-l-4 border-[#E10600] pl-6">
                <h3 className="text-5xl font-black uppercase italic leading-none">Hamáček</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2 italic font-mono">UNIT_FOUNDER</p>
              </div>
            </div>
          </Reveal>
          
          {/* Soustružník */}
          <Reveal x={30} delay={0.2}>
            <div className="group relative md:mb-20">
              <div className="relative aspect-[3/4] w-full grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0">
                <Image 
                  src="/images/trainers/old_web_1.jpg" 
                  alt="Soustružník" 
                  fill 
                  className="object-contain object-bottom" 
                  priority 
                />
              </div>
              <div className="mt-6 border-l-4 border-black pl-6">
                <h3 className="text-5xl font-black uppercase italic leading-none">Soustružník</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-2 italic font-mono">UNIT_ELITE</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. PRICING STRIP (Kompaktní) */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              { name: 'RAW_ENTRY', price: '180' },
              { name: 'WARRIOR_30', price: '1290' },
              { name: 'ELITE_365', price: '10900' }
            ].map((p, i) => (
              <div key={i} className="py-10 flex justify-between items-center group cursor-pointer hover:bg-white hover:text-black transition-all duration-500 px-6">
                <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                <span className="text-4xl font-black italic">{p.price},-</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="py-20 px-2">
        <div className="columns-2 md:columns-5 gap-2 space-y-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative overflow-hidden group border border-black/5">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Archive" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

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
      
      {/* 1. COMPACT HERO (Jen 40% výšky) */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 border-b-4 border-[#E10600] bg-zinc-950">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex justify-between items-center mt-2">
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. TRAINERS GRID (Kompaktní, vedle sebe) */}
      <section className="bg-black border-b border-white/5">
        <div className="grid md:grid-cols-2 max-w-[1400px] mx-auto">
          {/* Hamáček - old_web_1 */}
          <div className="relative group border-r border-white/5 overflow-hidden flex items-end h-[50vh]">
            <div className="absolute top-6 left-6 z-20">
               <span className="text-[#E10600] font-black italic text-4xl">01</span>
               <h3 className="text-2xl font-black uppercase italic leading-none mt-1">Hamáček</h3>
            </div>
            <div className="absolute inset-0 grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top" priority />
            </div>
          </div>

          {/* Soustružník - old_web_2 */}
          <div className="relative group overflow-hidden flex items-end h-[50vh]">
            <div className="absolute top-6 right-6 z-20 text-right">
               <span className="text-white/20 font-black italic text-4xl group-hover:text-[#E10600] transition-colors">02</span>
               <h3 className="text-2xl font-black uppercase italic leading-none mt-1">Soustružník</h3>
            </div>
            <div className="absolute inset-0 grayscale contrast-125 brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top" priority />
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP - Stripped List (Úspora místa) */}
      <section className="py-16 bg-zinc-950 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0 border-t border-white/10">
            {[
              { id: '01', name: 'RAW_ENTRY', price: '180' },
              { id: '02', name: 'WARRIOR_30', price: '1290' },
              { id: '03', name: 'ELITE_365', price: '10900' }
            ].map((p) => (
              <div key={p.id} className="group py-8 border-b border-white/10 flex justify-between items-center hover:bg-white hover:text-black transition-all duration-300 px-4">
                <div className="flex items-center gap-6">
                  <span className="text-xs font-black text-[#E10600] font-mono">{p.id}</span>
                  <h4 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">{p.name}</h4>
                </div>
                <span className="text-3xl font-black italic">{p.price} CZK</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY - Compact Masonry */}
      <section className="p-2 bg-black">
        <div className="columns-3 md:columns-6 gap-2 space-y-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative overflow-hidden group border border-white/5">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-auto grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

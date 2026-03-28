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
    <main className="bg-black min-h-screen text-white pb-32 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO - SANDWICH MODE */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black border-b border-white/5">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-20" />
         {/* Tady bude tvůj Sandwich Hero s Hamáčkem a Soustružníkem */}
         <Reveal>
            <h1 className="text-7xl md:text-[11rem] font-black italic uppercase text-center relative z-10 leading-none tracking-tighter">
               HARDCORE <br/>
               <span style={{ WebkitTextStroke: '2px #E10600', color: 'transparent' }}>HERITAGE</span>
            </h1>
         </Reveal>
      </section>

      {/* 2. THE ACCESS - PERMANENTKY */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 text-center underline decoration-[#E10600]">Vstupy & Permice</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jednorázový', price: '180', desc: 'Bez závazků. Čistá síla.' },
              { name: 'Měsíční', price: '1290', desc: 'Nejoblíbenější volba v Bolce.' },
              { name: 'Roční', price: '10900', desc: 'Pro ty, co to myslí vážně.' }
            ].map((p, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/10 p-10 hover:border-[#E10600] transition-all group relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-black text-zinc-700">F77_MB</div>
                <h3 className="text-xl font-black uppercase mb-4">{p.name}</h3>
                <div className="text-5xl font-black mb-6 italic">{p.price},-</div>
                <p className="text-zinc-500 mb-10 text-sm uppercase font-bold">{p.desc}</p>
                <button className="w-full py-4 bg-[#E10600] text-white font-black uppercase italic hover:bg-white hover:text-black transition-all">Koupit online</button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3. UTILITY & STORY */}
      <section className="py-24 border-y border-white/5 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-20 italic">
          <Reveal>
            <div className="border-l-4 border-[#E10600] pl-8">
               <h3 className="text-3xl font-black uppercase mb-6 italic">Tradice od 2014</h3>
               <p className="text-zinc-400 text-lg leading-relaxed uppercase font-bold">
                  Nejsme jen fitko. Jsme elitní jednotka v Mladé Boleslavi. Jiráskova 1320. 40+ strojů. 100% krev a pot.
               </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-black p-8 border border-white/5 shadow-2xl">
               <p className="text-[#E10600] font-black mb-4 tracking-widest text-xs uppercase">Opening Hours</p>
               <div className="space-y-4 text-3xl font-black uppercase italic">
                  <div className="flex justify-between"><span>PO-PÁ</span><span>06-21</span></div>
                  <div className="flex justify-between"><span>SO-NE</span><span>08-20</span></div>
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. ARCHIVE GALLERY */}
      <section className="py-24 px-2">
         <div className="max-w-7xl mx-auto columns-2 md:columns-4 gap-4 space-y-4">
            {galleryFiles.map((file, i) => (
               <div key={i} className="border border-white/5 overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                  <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full" loading="lazy" />
               </div>
            ))}
         </div>
      </section>
    </main>
  );
}

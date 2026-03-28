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
      
      {/* 1. HERO - THE ELITE SANDWICH (Oživenej & Zafixovanej) */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-black border-b border-white/5">
        
        {/* Floating Data Background */}
        <div className="absolute top-20 left-10 text-[10px] font-mono text-zinc-800 vertical-text hidden md:block">
          COORD_50.4114_N_14.9032_E // UNIT_F77_RAW_MB
        </div>

        {/* HERO CONTENT */}
        <div className="max-w-[1600px] w-full mx-auto relative z-10 flex flex-col items-center h-full">
          
          <div className="relative w-full flex items-center justify-center h-full">
            
            {/* HAMÁČEK - LEFT ALPHA (Ostrý, Usazený, Scanline) */}
            <div className="absolute left-[-10%] bottom-[-10%] hidden lg:block w-[550px] h-[750px] z-30 scanline-effect overflow-hidden">
              <Reveal delay={0.1} x={-100}>
                <Image 
                  src="/images/trainers/hlavacek.png" 
                  alt="Hamáček" 
                  width={600} height={800} 
                  className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_0_80px_rgba(225,6,0,0.15)]"
                  priority
                />
              </Reveal>
              {/* GRADIENT MASK - Schová ořez ruky do černé */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-40" />
            </div>

            {/* CENTRAL BRAND TITLE */}
            <div className="relative z-20 text-center">
              <Reveal>
                <div className="inline-block mb-6 px-4 py-1 border border-[#E10600]/30 bg-[#E10600]/5 skew-x-[-12deg]">
                  <span className="text-[#E10600] font-black uppercase tracking-[0.5em] text-[10px] italic">
                    Legacy since 2014
                  </span>
                </div>
                <h1 className="text-7xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter text-glow">
                  HARDCORE <br/>
                  <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>
                    HERITAGE
                  </span>
                </h1>
                <p className="text-[#E10600] font-black uppercase tracking-widest text-sm italic mt-6">
                    Mladá Boleslav // Jiráskova 1320
                </p>
              </Reveal>
            </div>

            {/* SOUSTRUŽNÍK - RIGHT SUPPORT (Ostrý, Usazený, Blur) */}
            <div className="absolute right-[-10%] bottom-[-10%] hidden lg:block w-[450px] h-[650px] z-10 opacity-70 blur-[1px] hover:blur-0 transition-all duration-700 overflow-hidden">
              <Reveal delay={0.3} x={100}>
                <Image 
                  src="/images/trainers/soustruznik.png" 
                  alt="Soustružník" 
                  width={500} height={700} 
                  className="object-contain object-bottom grayscale contrast-110 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                  priority
                />
              </Reveal>
              {/* GRADIENT MASK - Schová ořez ruky */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent z-40" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE OFFER - PERMANENTKY (Dynamický UI, Vibruje) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-16 text-center text-white underline decoration-[#E10600]">Vstupy & Permice</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'RAW_START', price: '180', desc: 'Jednorázový vstup. Žádný závazky.' },
              { name: 'SOLDIER_MONTH', price: '1290', desc: 'Měsíční členství. Bestseller.' },
              { name: 'ELITE_YEAR', price: '10900', desc: 'Roční členství. Nejvýhodnější.' }
            ].map((p, i) => (
              <div key={i} className={`group relative bg-zinc-950 border ${p.name === 'SOLDIER_MONTH' ? 'border-[#E10600]' : 'border-white/5'} p-10 overflow-hidden hover:border-[#E10600] transition-colors`}>
                <div className="absolute -right-4 -top-4 text-7xl font-black opacity-[0.03] italic text-zinc-600">{i+1}</div>
                <h3 className="text-xl font-black uppercase mb-3 tracking-tighter text-white">{p.name}</h3>
                <div className="text-6xl font-black mb-8 italic text-white group-hover:text-[#E10600] transition-colors">{p.price}<span className="text-sm">,-</span></div>
                <p className="text-zinc-500 mb-10 text-xs uppercase font-bold tracking-tight">{p.desc}</p>
                <button className="w-full py-5 bg-white text-black font-black uppercase italic text-lg hover:bg-[#E10600] hover:text-white transition-all transform group-hover:skew-x-[-3deg]">
                  Grab Access
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 3. STORY & UTILITY (Otevíračka & Adresa) */}
      <section className="py-24 border-y border-white/5 bg-zinc-950/30 italic">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-20">
          <Reveal>
            <div className="border-l-4 border-[#E10600] pl-8">
               <h3 className="text-3xl font-black uppercase mb-6 italic text-white">Elite Coaching DNA</h3>
               <p className="text-zinc-400 text-lg leading-relaxed uppercase font-bold">
                  Spojujeme vědu (FTVS) s agresivitou železa. 40+ strojů. 10+ let tradice. V Mladé Boleslavi.
               </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="bg-black p-10 border border-white/5 shadow-2xl relative">
               <div className="absolute top-0 right-0 p-2 text-[10px] font-black text-zinc-700">F77_RAW</div>
               <p className="text-[#E10600] font-black mb-4 tracking-widest text-xs uppercase">Opening Hours</p>
               <div className="space-y-4 text-3xl font-black uppercase italic text-white">
                  <div className="flex justify-between items-center group"><span className="text-zinc-500 group-hover:text-white transition-colors">PO-PÁ</span><span className="text-[#E10600] text-glow">06-21</span></div>
                  <div className="flex justify-between items-center group"><span className="text-zinc-500 group-hover:text-white transition-colors">SO-NE</span><span className="text-[#E10600] text-glow">08-20</span></div>
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. ARCHIVE GALLERY */}
      <section className="py-24 px-2">
         <div className="max-w-[1800px] mx-auto columns-2 md:columns-4 lg:columns-5 gap-3 space-y-3">
            {galleryFiles.map((file, i) => (
               <div key={i} className="border border-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-zinc-900 shadow-xl hover:-translate-y-1">
                  <img src={`/images/gym/gallery/${file}`} alt="F77 DNA" className="w-full contrast-125 brightness-75 hover:brightness-110" loading="lazy" />
               </div>
            ))}
         </div>
      </section>
    </main>
  );
}

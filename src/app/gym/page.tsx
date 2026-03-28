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
    <main className="bg-zinc-950 min-h-screen text-white pb-20 selection:bg-[#E10600] overflow-hidden">
      {/* SECTION 1: THE ELITE HERO (Sandwich, Fixed, Dominant Hamacek) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 border-b border-white/5 overflow-hidden">
        
        {/* Background Effect - Šum z loga, aby to nebylo hnusně čistý */}
        <div className="absolute inset-0 bg-[url('/images/bg_noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

        {/* Background Text - Masivní RAW77 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.02] pointer-events-none italic font-black text-[30vw] leading-none select-none z-0">
          RAW77
        </div>

        <div className="max-w-[1600px] w-full mx-auto relative z-10 px-4">
          <div className="relative flex items-center justify-center min-h-[600px]">
            
            {/* VLEVO: HAMÁČEK (Dominant, Fixed Arm, Lower) */}
            <div className="absolute left-[-10%] bottom-[-15%] hidden lg:block w-[550px] h-[750px] z-30">
              <Reveal delay={0.1} x={-100}>
                <Image 
                  src="/images/trainers/hlavacek.png" 
                  alt="Hamáček" 
                  width={600} 
                  height={800} 
                  className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] scale-105"
                  priority
                />
              </Reveal>
            </div>

            {/* STŘED: HLAVNÍ NÁPIS */}
            <div className="relative z-20 text-center mx-auto">
              <Reveal>
                <span className="text-[#E10600] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block bg-black/60 px-4 py-2 border border-white/10 inline-block transform -skew-x-12">
                  Boleslav Elite Unit // Unit: RAW_MB
                </span>
                <h1 className="text-6xl md:text-[11rem] font-black uppercase italic leading-[0.8] tracking-tighter text-white">
                  HARDCORE <br/>
                  <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent', textShadow: '0 0 20px #E1060020' }}>
                    HERITAGE
                  </span>
                </h1>
              </Reveal>
            </div>

            {/* VPRAVO: SOUSTRUŽNÍK (Secondary, Fixed Arm, Shifted) */}
            <div className="absolute right-[-10%] bottom-[-15%] hidden lg:block w-[450px] h-[650px] z-10">
              <Reveal delay={0.3} x={100}>
                <Image 
          src="/images/trainers/soustruznik.png" 
                  alt="Soustružník" 
                  width={500} 
                  height={700} 
                  className="object-contain object-bottom grayscale contrast-110 brightness-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-90 scale-95"
                  priority
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BLOKY & GALERIE (Zůstává, Vykostěno) */}
      <section className="py-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 border-b border-white/5">
        <Reveal><div className="space-y-6"><h3 className="text-[#E10600] font-black italic uppercase text-2xl tracking-tighter">Elite Coaching DNA</h3><p className="text-zinc-400 text-lg leading-relaxed">Absolvent FTVS při UK a špička v silovém tréninku. Spojujeme anatomii s čistou agresivitou železa. Žádný sraní, jen výsledky.</p></div></Reveal>
        <Reveal delay={0.2}><div className="bg-zinc-950/80 p-8 border border-white/5 backdrop-blur-sm relative"><div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#E10600]/30" /><h4 className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-4">Provozní doba</h4><div className="flex justify-between text-xl font-black mb-2"><span>PO-PÁ</span><span className="text-[#E10600]">06-21</span></div><div className="flex justify-between text-xl font-black"><span>SO-NE</span><span className="text-[#E10600]">08-20</span></div></div></Reveal>
      </section>
      <section className="px-3 py-16"><div className="max-w-[1800px] mx-auto columns-2 md:columns-4 gap-4 space-y-4">{galleryFiles.map((file, i) => (<div key={i} className="relative group overflow-hidden border border-white/5 bg-zinc-900 shadow-xl transition-all duration-500 hover:border-[#E10600]/30"><img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100" /></div>))}</div></section>
    </main>
  );
}

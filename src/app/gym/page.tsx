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
      {/* SECTION 1: THE SANDWICH HERO (Podle screenu) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 border-b border-white/5">
        
        {/* Background Text - Masivní MB_RAW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] pointer-events-none italic font-black text-[30vw] leading-none select-none z-0">
          RAW77
        </div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 px-4">
          <div className="relative flex items-center justify-center min-h-[500px]">
            
            {/* VLEVO: HAMÁČEK */}
            <div className="absolute left-[-5%] bottom-[-10%] hidden lg:block w-[400px] h-[600px] z-20">
              <Reveal delay={0.2} x={-100}>
                <Image 
                  src="/images/trainers/hlavacek.png" 
                  alt="Hamáček" 
                  width={500} 
                  height={700} 
                  className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  priority
                />
              </Reveal>
            </div>

            {/* STŘED: HLAVNÍ NÁPIS */}
            <div className="relative z-10 text-center">
              <Reveal>
                <span className="text-[#E10600] font-black uppercase tracking-[0.6em] text-[10px] mb-6 block">
                  Boleslav Elite Unit
                </span>
                <h1 className="text-6xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter">
                  HARDCORE <br/>
                  <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>
                    HERITAGE
                  </span>
                </h1>
              </Reveal>
            </div>

            {/* VPRAVO: SOUSTRUŽNÍK */}
            <div className="absolute right-[-5%] bottom-[-10%] hidden lg:block w-[400px] h-[600px] z-20">
              <Reveal delay={0.4} x={100}>
                <Image 
                  src="/images/trainers/soustruznik.png" 
                  alt="Soustružník" 
                  width={500} 
                  height={700} 
                  className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  priority
                />
              </Reveal>
            </div>
          </div>
        </div>

        {/* MOBILNÍ VERZE TRENÉRŮ (Pod sebou) */}
        <div className="flex lg:hidden gap-2 px-4 mt-12 w-full max-w-md">
           <div className="relative aspect-[3/4] flex-1 border border-white/10 overflow-hidden">
              <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-cover object-top grayscale" />
              <div className="absolute bottom-2 left-2 text-[10px] font-black bg-black px-2 py-1">HAMÁČEK</div>
           </div>
           <div className="relative aspect-[3/4] flex-1 border border-white/10 overflow-hidden">
              <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-cover object-top grayscale" />
              <div className="absolute bottom-2 left-2 text-[10px] font-black bg-black px-2 py-1">SOUSTRUŽNÍK</div>
           </div>
        </div>
      </section>

      {/* INFO BLOKY (Vykostěno pro čistotu) */}
      <section className="py-20 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 border-b border-white/5">
        <Reveal>
          <div className="space-y-6">
            <h3 className="text-[#E10600] font-black italic uppercase text-2xl tracking-tighter">Elite Coaching DNA</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">Absolvent FTVS při UK a špička v silovém tréninku. Spojujeme anatomii s čistou agresivitou železa. Žádný sraní, jen výsledky.</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="bg-zinc-900/40 p-8 border border-white/5 italic">
            <h4 className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-4">Provozní doba</h4>
            <div className="flex justify-between text-xl font-black mb-2"><span>PO-PÁ</span><span className="text-[#E10600]">06-21</span></div>
            <div className="flex justify-between text-xl font-black"><span>SO-NE</span><span className="text-[#E10600]">08-20</span></div>
          </div>
        </Reveal>
      </section>

      {/* GALERIE GRID (Compact) */}
      <section className="px-2 py-12">
        <div className="max-w-6xl mx-auto columns-2 md:columns-4 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group overflow-hidden border border-white/5 bg-zinc-900">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full grayscale brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

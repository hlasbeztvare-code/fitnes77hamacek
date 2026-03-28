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

  // Použijeme jednu z fotek jako background, pokud existuje
  const bgImage = galleryFiles.length > 0 ? `/images/gym/gallery/${galleryFiles[0]}` : null;

  return (
    <main className="bg-black min-h-screen text-white pb-20 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. ATMOSPHERIC HERO - The Real Gym Vibe */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-[#E10600]/30">
        
        {/* BACKGROUND IMAGE - Ta fotka fitka, co to oživí */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={bgImage || "/images/gym-bg.jpg"} 
            alt="Fitness77 Arena"
            fill
            className="object-cover opacity-30 grayscale contrast-125 brightness-[0.3]"
            priority
          />
          {/* Červenej šum a přechod do černé, aby to nebyl pohřeb */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E10600]/10 via-transparent to-transparent opacity-50" />
        </div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          
          {/* HAMÁČEK - Alfa vlevo */}
          <div className="absolute left-[2%] bottom-[-5%] hidden lg:block w-[400px] h-[580px] z-30">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full">
                <Image 
                  src="/images/trainers/hlavacek.png" 
                  alt="Hamáček" 
                  fill
                  className="object-contain object-bottom grayscale contrast-150 brightness-110 drop-shadow-[0_0_40px_rgba(0,0,0,1)]"
                  priority
                />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRAND - FITNESS77 */}
          <div className="relative z-20 text-center px-4">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-1 border border-white/10 transform -skew-x-12">
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] italic font-mono">Unit_F77_MB</span>
              </div>
              <h1 className="text-7xl md:text-[9.5rem] font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              <p className="mt-6 text-white font-black uppercase tracking-[0.2em] text-[11px] italic bg-[#E10600] inline-block px-3 py-1 transform -skew-x-12">
                Hardcore Heritage // Mladá Boleslav
              </p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - Support vpravo */}
          <div className="absolute right-[2%] bottom-[-5%] hidden lg:block w-[340px] h-[500px] z-10 opacity-60 mix-blend-screen">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image 
                  src="/images/trainers/soustruznik.png" 
                  alt="Soustružník" 
                  fill
                  className="object-contain object-bottom grayscale contrast-125"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR - Aby to žilo */}
      <div className="bg-[#E10600] py-4 relative z-40 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee font-black uppercase italic text-sm tracking-[0.3em] text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-10">40+ Strojů // 10+ Let Tradice // FTVS UK Specialisté // Raw Gym Culture // </span>
          ))}
        </div>
      </div>

      {/* 3. PRICE LIST & Rest of page (Zůstává, ale čistší) */}
      <section className="py-24 px-4 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Tady jsou ty tvoje karty permanentek, co už máš hotový */}
        </div>
      </section>

    </main>
  );
}

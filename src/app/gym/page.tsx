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
    <main className="bg-zinc-950 min-h-screen text-white pb-32 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO - THE DYNAMIC GLOW SANDWICH */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black border-b border-[#E10600]/30">
        
        {/* Floating Background Data */}
        <div className="absolute top-20 left-10 text-[9px] font-mono text-zinc-800 vertical-text hidden md:block opacity-40">
          COORD_50.4114_N_14.9032_E // UNIT_F77_RAW_MB
        </div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          
          {/* HAMÁČEK - LEFT (Zvýrazněnej) */}
          <div className="absolute left-[2%] bottom-[-5%] hidden lg:block w-[450px] h-[600px] z-30 overflow-hidden">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full group">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_0_50px_rgba(225,6,0,0.2)] hover:grayscale-0 transition-all duration-700" priority />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-40" />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRAND TITLE (Masivní Glow Fix) */}
          <div className="relative z-20 text-center px-4">
            <Reveal>
              {/* Malý nápis nad (Skewed & Glow) */}
              <div className="inline-block mb-4 px-3 py-1 border border-[#E10600]/30 bg-[#E10600]/5 skew-box">
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[9px] italic font-mono text-shadow-[0_0_5px_#E10600]">
                  Legacy Hub // Unit: Raw_MB
                </span>
              </div>
              
              {/* FITNESS77 (Zmenšeno a se září) */}
              <h1 className="text-7xl md:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter text-neon-glow">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              
              {/* HARDCORE HERITAGE (S Červeným Obrysem a Glow) */}
              <p className="text-8xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter text-outline-red mt-[-10px] text-shadow-[0_0_15px_rgba(225,6,0,0.3)]">
                HARDCORE
              </p>
              <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] italic mt-4 bg-zinc-900 px-3 py-1 inline-block transform skew-x-[-12deg]">
                  Mladá Boleslav // Jiráskova 1320
              </p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - RIGHT */}
          <div className="absolute right-[2%] bottom-[-5%] hidden lg:block w-[380px] h-[520px] z-10 opacity-70 blur-[1px] hover:blur-0 transition-all duration-700 overflow-hidden">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom grayscale contrast-110 drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]" priority />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent z-40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Aby to žilo) */}
      <div className="bg-[#E10600] py-3 relative z-40 overflow-hidden skew-y-1">
        <div className="flex whitespace-nowrap animate-marquee font-black uppercase italic text-xs tracking-[0.3em] text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-10 text-shadow-[0_0_5px_#fff]">40+ Strojů // 10+ Let Tradice // FTVS UK Specialisté // Raw Gym Culture // </span>
          ))}
        </div>
      </div>
    </main>
  );
}

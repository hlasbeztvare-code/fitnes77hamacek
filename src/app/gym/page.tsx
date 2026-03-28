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

  // Vezmeme první fotku jako BG, nebo fallback
  const bgImage = galleryFiles.length > 0 ? `/images/gym/gallery/${galleryFiles[0]}` : null;

  return (
    <main className="bg-black min-h-screen text-white pb-32 selection:bg-[#E10600] overflow-x-hidden">
      
      {/* HERO SECTION - REANIMATION */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden border-b border-[#E10600]/30">
        <div className="absolute inset-0 z-0">
          {bgImage && (
            <Image 
              src={bgImage} 
              alt="Gym Vibe"
              fill
              className="object-cover opacity-30 grayscale contrast-125 brightness-[0.4]"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          {/* HAMÁČEK - LEFT */}
          <div className="absolute left-[2%] bottom-[-5%] hidden lg:block w-[450px] h-[600px] z-30">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom grayscale contrast-125 brightness-110 drop-shadow-[0_0_40px_rgba(225,6,0,0.3)]" priority />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-40" />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRAND */}
          <div className="relative z-20 text-center px-4">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-1 border border-white/10 transform -skew-x-12">
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] italic">RAW_BOLKA // EST. 2014</span>
              </div>
              <h1 className="text-7xl md:text-[9.5rem] font-black uppercase italic leading-[0.8] tracking-tighter text-white">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              <p className="mt-6 text-white font-black uppercase tracking-[0.2em] text-[11px] italic bg-[#E10600] inline-block px-3 py-1 transform -skew-x-12">
                Hardcore Heritage // No Bullshit
              </p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - RIGHT */}
          <div className="absolute right-[2%] bottom-[-5%] hidden lg:block w-[380px] h-[520px] z-10 opacity-60">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom grayscale contrast-110" priority />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent z-40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY - Aby to viděl i slepej */}
      <section className="py-20 px-2 bg-zinc-950/50">
        <h2 className="text-center text-zinc-800 font-black uppercase italic text-4xl mb-12 tracking-widest opacity-20 italic">Archive_Data</h2>
        <div className="max-w-[1800px] mx-auto columns-2 md:columns-5 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-auto opacity-70 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

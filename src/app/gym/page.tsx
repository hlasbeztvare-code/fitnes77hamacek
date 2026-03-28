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
      
      {/* HERO SECTION WITH BG IMAGE TO KILL THE 'FUNERAL' VIBE */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden border-b border-[#E10600]/30 bg-black">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/gym/gallery/gym_photo_0.jpg" 
            alt="Gym Background"
            fill
            className="object-cover opacity-20 grayscale contrast-125 brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10 h-full flex items-center justify-center">
          {/* HAMÁČEK - LEFT ALPHA */}
          <div className="absolute left-[-2%] bottom-[-5%] hidden lg:block w-[450px] h-[600px] z-30">
            <Reveal delay={0.1} x={-50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/hlavacek.png" alt="Hamáček" fill className="object-contain object-bottom grayscale contrast-150 brightness-110 drop-shadow-[0_0_40px_rgba(225,6,0,0.2)]" priority />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-40" />
              </div>
            </Reveal>
          </div>

          {/* CENTRAL BRANDING */}
          <div className="relative z-20 text-center px-4">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm px-4 py-1 border border-white/10 transform -skew-x-12">
                <span className="text-[#E10600] font-black uppercase tracking-[0.4em] text-[10px] italic">EST. 2014 // RAW_UNIT</span>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,1)] text-white">
                FITNESS<span className="text-[#E10600]">77</span>
              </h1>
              <p className="mt-6 text-white font-black uppercase tracking-[0.2em] text-[11px] italic bg-[#E10600] inline-block px-3 py-1 transform -skew-x-12">
                Mladá Boleslav // Hardcore Heritage
              </p>
            </Reveal>
          </div>

          {/* SOUSTRUŽNÍK - RIGHT SUPPORT */}
          <div className="absolute right-[-2%] bottom-[-5%] hidden lg:block w-[380px] h-[520px] z-10 opacity-60">
            <Reveal delay={0.3} x={50}>
              <div className="relative w-full h-full">
                <Image src="/images/trainers/soustruznik.png" alt="Soustružník" fill className="object-contain object-bottom grayscale" priority />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent z-40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACCESS & PRICES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'RAW_ENTRY', price: '180', desc: 'Jednorázový trénink.' },
            { name: 'WARRIOR_30', price: '1290', desc: 'Měsíční vstup. Bestseller.' },
            { name: 'ELITE_365', price: '10900', desc: 'Roční členství. Top cena.' }
          ].map((p, i) => (
            <div key={i} className="bg-zinc-900/30 border border-white/5 p-10 hover:border-[#E10600] transition-all group">
              <h3 className="text-xl font-black uppercase mb-4 italic">{p.name}</h3>
              <div className="text-5xl font-black mb-6">{p.price},-</div>
              <p className="text-zinc-500 mb-10 text-xs font-bold uppercase">{p.desc}</p>
              <button className="w-full py-4 bg-[#E10600] text-white font-black uppercase italic hover:bg-white hover:text-black transition-all">Grab Access</button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION (The 40+ images) */}
      <section className="px-2 py-20 bg-black/50">
        <div className="max-w-[1800px] mx-auto columns-2 md:columns-4 lg:columns-5 gap-3 space-y-3">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative group overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Archive" className="w-full h-auto" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

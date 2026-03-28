import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

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
      
      {/* 1. HERO - NEDOTKNUTELNÁ SEKCE */}
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

      {/* 2. THE CORE: LEVÝ TRENÉR - PERMICE - PRAVÝ TRENÉR */}
      <section className="bg-black py-16 px-4 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* VLEVO: HAMÁČEK (Barevný, Ostrý) */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 border border-white/10 overflow-hidden">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="w-full">
              <span className="text-[#E10600] font-black italic text-2xl">01</span>
              <h3 className="text-4xl font-black uppercase italic leading-none">Hamáček</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 mb-4 italic">FOUNDER // HEAD COACH</p>
              <Link href="/shop/hamacek-stack" className="inline-block px-6 py-3 bg-white text-black text-[10px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">
                Hamáček_Stack →
              </Link>
            </div>
          </div>

          {/* UPROSTŘED: PERMANENTKY */}
          <div className="flex flex-col justify-center bg-zinc-950/50 p-8 border border-white/5 h-full">
            <h2 className="text-center text-xl font-black uppercase tracking-[0.5em] text-zinc-500 italic mb-10">ACCESS_PROTOCOL</h2>
            <div className="space-y-2">
              {[
                { name: 'RAW_ENTRY', price: '180' },
                { name: 'WARRIOR_30', price: '1290' },
                { name: 'ELITE_365', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="py-6 border-b border-white/10 flex flex-col items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center group">
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter group-hover:scale-110 transition-transform">{p.name}</h4>
                  <span className="text-xl font-black italic text-[#E10600] group-hover:text-black mt-2">{p.price} CZK</span>
                </div>
              ))}
            </div>
          </div>

          {/* VPRAVO: SOUSTRUŽNÍK (Barevný, Ostrý) */}
          <div className="flex flex-col items-center lg:items-end space-y-4 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 border border-white/10 overflow-hidden">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="w-full">
              <span className="text-[#E10600] font-black italic text-2xl">02</span>
              <h3 className="text-4xl font-black uppercase italic leading-none">Soustružník</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 mb-4 italic">ELITE // PRO UNIT</p>
              <Link href="/shop/soustruznik-stack" className="inline-block px-6 py-3 bg-white text-black text-[10px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">
                Soustružník_Stack →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POD TÍM: GALERIE (Kompaktní fotky vedle sebe) */}
      <section className="py-8 px-4 bg-black">
         <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600 italic mb-8">F77_VAULT_ARCHIVE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group border border-white/10">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

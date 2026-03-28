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
    <main className="bg-white min-h-screen text-black selection:bg-[#E10600] overflow-x-hidden">
      
      {/* 1. HERO - NEDOTKNUTELNÁ SEKCE (Respektuju tvůj příkaz) */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 border-b-4 border-[#E10600] bg-zinc-950">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
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

      {/* 2. THE CORE (Trinity): BÍLÝ BACK, ČERVENÝ AKCENTY */}
      <section className="bg-white py-20 px-4 border-b-8 border-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* VLEVO: HAMÁČEK (Barevný, Ostrý, Bílé pozadí) */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="relative w-full aspect-[4/5] bg-white border-4 border-black overflow-hidden group">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-3">
                 <span className="text-black font-black italic text-4xl">01</span>
                 <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter">Hamáček</h3>
              </div>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-2 italic border-l-2 border-[#E10600] pl-3">ZAKLADATEL // UNIT_01</p>
              
              <p className="text-sm text-zinc-800 mt-6 mb-8 leading-relaxed max-w-sm">
                Hlavní mozek F77. Specialista na naturální kulturistiku a extrémní silový rozvoj. Naturální přístup, nekompromisní výsledky. Jiráskova 1320.
              </p>
              
              <div className="flex flex-col gap-3">
                <Link href="/shop/hamacek-stack" className="w-full text-center py-4 bg-[#E10600] text-white text-[11px] font-black uppercase italic hover:bg-black transition-all">
                  Rezervovat Trénink
                </Link>
                <Link href="/shop/plans" className="w-full text-center py-3 bg-black text-white text-[10px] font-black uppercase italic hover:bg-white hover:text-black border border-black transition-all">
                  Get_Battle_Plan →
                </Link>
              </div>
            </div>
          </div>

          {/* UPROSTŘED: PERMANENTKY (Bílý list, Červený hover) */}
          <div className="flex flex-col justify-center bg-zinc-50 p-10 border-4 border-black h-full sticky top-10">
            <h2 className="text-center text-4xl font-black uppercase tracking-tighter text-black italic mb-12 border-b-2 border-black pb-4">
               Ceník Vstupů
            </h2>
            <div className="space-y-3">
              {[
                { name: 'RAW_ENTRY', czech: 'Jednorázový Vstup', price: '180' },
                { name: 'WARRIOR_30', czech: 'Měsíční Permanentka', price: '1290' },
                { name: 'ELITE_365', czech: 'Roční Permanentka', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="py-6 border-b border-black/5 flex justify-between items-center hover:bg-[#E10600] transition-all duration-300 px-5 group cursor-pointer hover:border-[#E10600]">
                  <div>
                     <h4 className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-white transition-colors">{p.name}</h4>
                     <p className="text-[9px] font-black text-zinc-500 uppercase tracking-wider group-hover:text-white transition-colors">{p.czech}</p>
                  </div>
                  <span className="text-3xl font-black italic text-[#E10600] group-hover:text-white transition-colors">{p.price} CZK</span>
                </div>
              ))}
            </div>
          </div>

          {/* VPRAVO: SOUSTRUŽNÍK (Barevný, Ostrý, Bílé pozadí) */}
          <div className="flex flex-col items-center lg:items-end space-y-6 text-right">
            <div className="relative w-full aspect-[4/5] bg-white border-4 border-black overflow-hidden group">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top hover:scale-105 transition-transform duration-500" priority />
            </div>
            <div className="w-full flex flex-col items-end">
              <div className="flex items-center gap-3">
                 <h3 className="text-5xl font-black uppercase italic leading-none tracking-tighter">Soustružník</h3>
                 <span className="text-black/30 font-black italic text-4xl group-hover:text-[#E10600] transition-colors">02</span>
              </div>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-2 italic border-r-2 border-[#E10600] pr-3">ELITE COACH // UNIT_02</p>
              
              <p className="text-sm text-zinc-800 mt-6 mb-8 leading-relaxed max-w-sm text-right">
                Elitní coach a aktivní závodník. Nekompromisní technika, dynamika a posouvání hranic lidského těla. Každý trénink je bitva.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <Link href="/shop/soustruznik-stack" className="w-full text-center py-4 bg-[#E10600] text-white text-[11px] font-black uppercase italic hover:bg-black transition-all">
                  Rezervovat Trénink
                </Link>
                <Link href="/shop/plans" className="w-full text-center py-3 bg-black text-white text-[10px] font-black uppercase italic hover:bg-white hover:text-black border border-black transition-all">
                  ELITE_PROGRAMS →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. POD TÍM: GALERIE (Kompaktní na černém podkladu pro kontrast) */}
      <section className="py-12 px-2 bg-black">
         <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-zinc-600 italic mb-10">F77_VAULT_ARCHIVE</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-1">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group border border-black/5">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const files = Array.from({ length: 40 }, (_, i) => `gym_photo_${i + 1}.jpg`);
    setGalleryFiles(files);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO */}
      <section className="relative h-[45vh] flex flex-col justify-center px-6 border-b border-zinc-100/10 bg-black z-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white"
                style={{ textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' }}>
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 4px 10px rgba(225,6,0,0.5)' }}>77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-5 shadow-[0_0_30px_rgba(225,6,0,0.2)] bg-black/50 backdrop-blur-sm p-4 relative">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-2xl font-black italic text-white">06:00 - 22:00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-2xl font-black italic text-white">08:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent', textShadow: '0 0 15px rgba(225,6,0,0.3)' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. MEZERA - 4 OBRÁZKY STATS */}
      <section className="bg-black py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-64 overflow-hidden group border border-white/10">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-3xl font-black italic text-[#E10600] tracking-tighter">{item.t}</p>
                <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE CORE TRINITY */}
      <section className="relative py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* HAMÁČEK */}
          <div className="flex flex-col group relative">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
            </div>
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 transition-all group-hover:border-[#E10600]/50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">HAMÁČEK</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">01</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6 border-l-2 border-[#E10600] pl-3 italic">ZAKLADATEL // HLAVNÍ KOUČ</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed italic uppercase">NEKOMPROMISNÍ PŘÍSTUP, NATURÁLNÍ CESTA. HAMÁČEK JE TVŮJ PRŮVODCE PEKLEM, ZE KTERÉHO VYJDEŠ JAKO NOVÁ VERZE SEBE SAMA.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          {/* STŘED: NAŠE FILOZOFIE + ČLENSTVÍ */}
          <div className="flex flex-col gap-12 lg:mt-10 text-center">
            
            {/* FILOZOFIE - ČISTÝ TEXT BEZ SMRKÁNÍ */}
            <div className="relative bg-black/60 backdrop-blur-2xl p-10 border border-white/10 shadow-2xl transition-all hover:border-[#E10600]/50 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <h3 className="text-3xl font-black uppercase italic text-white mb-8 tracking-[0.3em]">NAŠE FILOZOFIE</h3>
              <p className="text-2xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter">
                NAŠE FITNESS MÁ ROZLOHU 220 M², NAJDETE ZDE 30 POSILOVACÍCH STROJŮ ČESKÉ ZNAČKY VITA A PROFESIONÁLNÍ KARDIO-ZÓNU.
              </p>
              <p className="text-[11px] text-zinc-500 leading-relaxed italic uppercase tracking-widest">
                V NAŠEM FITNESS DBÁME NA TO, ABY SE U NÁS KLIENTI CÍTILI CO NEJLÉPE A BYLO O NĚ DOBŘE POSTARÁNO. TADY SE NETRÉNUJE PRO FOTKY, TADY SE DŘE PRO VÝSLEDKY.
              </p>
            </div>

            {/* ČLENSTVÍ */}
            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/10 backdrop-blur-md h-32 flex items-center justify-center border-t-2 border-[#E10600]">
                 <span className="text-5xl font-black italic opacity-20 uppercase tracking-[0.3em] text-white">ČLENSTVÍ</span>
              </div>
              <div className="relative -mt-10 mx-2 bg-black/60 backdrop-blur-3xl p-8 text-white border border-white/10 shadow-2xl z-20 transition-all group-hover:border-[#E10600]/50 group-hover:translate-y-[-10px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter">VSTUPY</h3>
                <div className="space-y-1 mb-10 text-white">
                  {[
                    { name: 'JEDNORÁZOVÝ VSTUP', price: '180', label: 'ZÁKLADNÍ' },
                    { name: 'MĚSÍČNÍ ČLENSTVÍ', price: '1290', label: 'NEJPRODÁVANĚJŠÍ' },
                    { name: 'ROČNÍ ČLENSTVÍ', price: '10900', label: 'ELITNÍ' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-white/5 hover:bg-white/5 transition-all px-2 group/item">
                      <div>
                        <h4 className="font-black italic text-xl uppercase tracking-tighter group-hover/item:text-[#E10600] transition-colors">{item.name}</h4>
                        <p className="text-[9px] text-zinc-500 font-bold tracking-[0.4em] uppercase">{item.label}</p>
                      </div>
                      <span className="text-2xl font-black italic text-white tracking-tighter">{item.price} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]">KOUPIT PERMICI ONLINE →</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="flex flex-col group relative text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-1000" priority />
            </div>
            <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end transition-all group-hover:border-[#E10600]/50">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <div className="flex justify-between items-end mb-4 w-full flex-row-reverse">
                <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">SOUSTRUŽNÍK</h3>
                <span className="text-[#E10600] font-black italic text-2xl opacity-30">02</span>
              </div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 tracking-widest border-r-2 border-[#E10600] pr-3 italic">ELITNÍ KOUČ // PRO UNIT</p>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed italic text-right uppercase">SPECIALISTA NA TECHNIKU A SVALOVOU HYPERTROFII. POKUD CHCEŠ RŮST, MUSÍŠ POSLOUCHAT MISTRA SOUSTRUHU.</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section className="py-24 bg-black relative z-10 border-t border-white/5 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-4 mb-10">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter underline decoration-[#E10600] decoration-4 underline-offset-8">GALERIE</h2>
         </div>
         <div className="flex gap-2 overflow-x-auto pb-10 px-4 scrollbar-hide no-scrollbar">
            {galleryFiles.map((file, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="relative min-w-[300px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 group"
                onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
              >
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-8 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

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
      
      {/* 1. HERO - MOBILNÍ FIX (smrk) */}
      <section className="relative min-h-[40vh] md:h-[45vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 bg-black z-20 py-12 md:py-0">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[14vw] md:text-[10vw] font-black uppercase italic leading-[0.8] tracking-tighter text-white"
                style={{ textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' }}>
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 4px 10px rgba(225,6,0,0.5)' }}>77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-6 md:mt-4 gap-8 md:gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-zinc-500 italic">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-wrap gap-4 md:gap-8 border-l-4 border-[#E10600] pl-4 md:pl-5 shadow-[0_0_30px_rgba(225,6,0,0.2)] bg-black/50 backdrop-blur-sm p-4 relative">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                    <div>
                       <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-xl md:text-2xl font-black italic text-white">06:00 - 21:00</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-xl md:text-2xl font-black italic text-white">09:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <h2 className="text-[12vw] md:text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10 opacity-20 md:opacity-100"
                   style={{ WebkitTextStroke: '1px #E10600', color: 'transparent', textShadow: '0 0 15px rgba(225,6,0,0.3)' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. MEZERA - STATS (RESPONSIVE) */}
      <section className="bg-black py-8 md:py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-48 md:h-64 overflow-hidden group border border-white/10">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <p className="text-2xl md:text-3xl font-black italic text-[#E10600] tracking-tighter">{item.t}</p>
                <p className="text-[9px] md:text-[10px] font-bold text-white tracking-[0.3em] uppercase">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE CORE TRINITY (MOBILE STACKED) */}
      <section className="relative py-16 md:py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 md:gap-12 lg:gap-16 items-start">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" priority />
            </div>
            <div className="relative -mt-20 md:-mt-28 mx-2 md:mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-6 md:p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent"></div>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#E10600] pl-3 italic">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic mt-6">REZERVOVAT</Link>
            </div>
          </div>

          {/* STŘED: MANIFEST + PERMICE */}
          <div className="w-full flex flex-col gap-12 order-1 lg:order-2">
            <div className="relative bg-black/60 backdrop-blur-2xl p-8 md:p-10 border border-white/10 shadow-2xl text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent"></div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-6 tracking-[0.2em]">NAŠE FILOZOFIE</h3>
              <p className="text-xl md:text-2xl font-black text-white leading-tight mb-6 uppercase italic">DŘEME PRO VÝSLEDKY, NE PRO FOTKY.</p>
              <p className="text-[10px] md:text-[11px] text-zinc-500 italic uppercase">220 M², 30 STROJŮ VITA A ELITNÍ PŘÍSTUP.</p>
            </div>

            <div className="flex flex-col group relative lg:mt-12">
              <div className="bg-black/10 backdrop-blur-md h-24 md:h-32 flex items-center justify-center border-t-2 border-[#E10600]">
                 <span className="text-3xl md:text-5xl font-black italic opacity-20 uppercase tracking-[0.3em]">ČLENSTVÍ</span>
              </div>
              <div className="relative -mt-10 mx-1 bg-black/60 backdrop-blur-3xl p-6 md:p-8 border border-white/10 shadow-2xl z-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E10600] to-transparent"></div>
                <div className="space-y-1 mb-10">
                  {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍC', p: '1490' }, { n: 'ROK', p: '12990' }].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-5 border-b border-white/5">
                      <h4 className="font-black italic text-lg uppercase">{item.n}</h4>
                      <span className="text-xl font-black italic text-[#E10600]">{item.p} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic">KOUPIT ONLINE</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 md:-mt-28 mx-2 md:mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-6 md:p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent"></div>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-r-2 border-[#E10600] pr-3 italic">PRO UNIT</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic mt-6">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE - MOBILNÍ SWIPE (smrk) */}
      <section className="py-16 md:py-24 bg-black relative z-10 border-t border-white/5">
         <div className="max-w-[1400px] mx-auto px-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic text-white tracking-tighter">GALERIE</h2>
         </div>
         <div className="flex gap-2 overflow-x-auto pb-10 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {galleryFiles.map((file, i) => (
              <motion.div 
                key={i} 
                className="relative min-w-[280px] md:min-w-[400px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/5 snap-center"
                onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
              >
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

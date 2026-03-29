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

  const triggerHaptic = (intensity = 15) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(intensity);
    }
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO */}
      <section className="relative min-h-[45vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 bg-black z-20 py-16 md:py-0">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[15vw] md:text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 md:mt-4 gap-10 md:gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-zinc-500 italic">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-col sm:flex-row gap-6 md:gap-8 border-l-4 border-[#E10600] pl-5 bg-black/40 backdrop-blur-md p-5 relative shadow-2xl">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600]"></div>
                    <div>
                       <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-xl md:text-2xl font-black italic text-white">06:00 - 21:00</p>
                    </div>
                    <div>
                       <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-xl md:text-2xl font-black italic text-white">09:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <Link href="/shop" 
                     onClick={() => triggerHaptic(20)}
                     className="group relative px-8 py-4 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-[#E10600] hover:text-white transition-all overflow-hidden">
                 <span className="relative z-10">VSTOUPIT_DO_ESHOPU →</span>
               </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS S LINKY DO SHOPU */}
      <section className="bg-black py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { t: "PERMICE", d: "KOUPIT ČLENSTVÍ", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/pernamentky" },
            { t: "SUPLEMENTY", d: "CO SYPOU PROFI", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "MERCH", d: "OBLEČENÍ JEDNOTKY", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/shop/merch" },
            { t: "BAZAR", d: "STROJE NA PRODEJ", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/bazar" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)}>
              <div className="relative h-56 md:h-64 overflow-hidden group border border-white/10 cursor-pointer">
                <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-3xl font-black italic text-[#E10600] tracking-tighter">{item.t}</p>
                  <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{item.d}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. THE CORE TRINITY - S DOPORUČENÝM STACKEM (smrk) */}
      <section className="relative py-20 md:py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-20 md:gap-16 items-start">
          
          {/* HAMÁČEK + STACK */}
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/80 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#E10600] pl-3 italic">HLAVNÍ KOUČ</p>
              
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-[#E10600] tracking-widest mb-3 uppercase">UNIT_01_RECOMMENDED_STACK</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/protein" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>RAW_PROTEIN_80</span><span>→</span></Link>
                  <Link href="/shop/creatine" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>PURE_CREATINE_MONO</span><span>→</span></Link>
                </div>
              </div>
              
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          {/* STŘED - FILOZOFIE + PERMICE */}
          <div className="w-full flex flex-col gap-12 order-1 lg:order-2 text-center">
            <div className="relative bg-black/60 backdrop-blur-2xl p-10 border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black uppercase italic text-white mb-8 tracking-[0.3em]">FILOZOFIE</h3>
              <p className="text-2xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter">DŘEME PRO VÝSLEDKY, NE PRO FOTKY.</p>
              <p className="text-[11px] text-zinc-500 italic uppercase">220 M², 30 STROJŮ VITA A PROFESIONÁLNÍ KARDIO-ZÓNA.</p>
            </div>

            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/10 backdrop-blur-md h-24 flex items-center justify-center border-t-2 border-[#E10600]">
                 <span className="text-4xl md:text-5xl font-black italic opacity-20 uppercase tracking-[0.3em]">ČLENSTVÍ</span>
              </div>
              <div className="relative -mt-10 mx-1 bg-black/60 backdrop-blur-3xl p-8 border border-white/10 shadow-2xl z-20">
                <div className="space-y-1 mb-10">
                  {[{ n: 'JEDNORÁZ', p: '160', l: '/shop/entry' }, { n: 'MĚSÍC', p: '1490', l: '/shop/month' }, { n: 'ROK', p: '12990', l: '/shop/year' }].map((item, idx) => (
                    <Link href={item.l} key={idx} onClick={() => triggerHaptic(10)} className="flex justify-between items-center py-6 border-b border-white/5 hover:bg-white/5 transition-all px-2">
                      <h4 className="font-black italic text-xl uppercase tracking-tighter">{item.n}</h4>
                      <span className="text-2xl font-black italic text-[#E10600] tracking-tighter">{item.p} CZK</span>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" onClick={() => triggerHaptic(30)} className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">PŘEJÍT_DO_ESHOPU</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK + STACK */}
          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/80 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-r-2 border-[#E10600] pr-3 italic">PRO UNIT</p>
              
              <div className="mt-6 pt-6 border-t border-white/5 w-full">
                <p className="text-[9px] font-black text-[#E10600] tracking-widest mb-3 uppercase">UNIT_02_RECOMMENDED_STACK</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/preworkout" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>PUMP_HARDCORE</span><span>←</span></Link>
                  <Link href="/shop/bcaa" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>AMINO_FUEL_MB</span><span>←</span></Link>
                </div>
              </div>

              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section className="py-20 bg-black relative z-10 border-t border-white/5 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter">GALERIE</h2>
         </div>
         <div className="flex gap-3 overflow-x-auto pb-10 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {galleryFiles.map((file, i) => (
              <motion.div key={i} whileTap={{ scale: 0.95 }} className="relative min-w-[300px] md:min-w-[450px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/10 snap-center" onClick={() => { setSelectedImage(`/images/gym/gallery/${file}`); triggerHaptic(15); }}>
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </motion.div>
            ))}
         </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => { setSelectedImage(null); triggerHaptic(10); }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

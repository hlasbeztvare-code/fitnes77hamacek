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
    <main className="bg-black text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth min-h-screen">
      
      {/* --- BACKGROUND LAYER: BETON (smrk) --- */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay bg-fixed bg-center bg-cover" 
           style={{ backgroundImage: "url('/images/textures/beton_hardcore.jpg')" }}></div>

      {/* 1. HERO - S ČERVENOU ZÁŘÍ */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 z-20 py-16 md:py-0">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E10600]/15 blur-[120px] pointer-events-none animate-pulse"></div>

        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[15vw] md:text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-12 gap-10 md:gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-col sm:flex-row gap-8 border-l-4 border-[#E10600] pl-5 bg-black/60 backdrop-blur-md p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600]"></div>
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">PO - PÁ</p><p className="text-xl md:text-2xl font-black italic text-white tracking-tighter">06:00 - 21:00</p></div>
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">SO - NE</p><p className="text-xl md:text-2xl font-black italic text-white tracking-tighter">09:00 - 20:00</p></div>
                 </div>
               </div>
               <Link href="/shop" onClick={() => triggerHaptic(20)} className="px-12 py-5 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-[#E10600] hover:text-white transition-all shadow-2xl text-center">
                 VSTOUPIT DO E-SHOPU →
               </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS ROZCESTNÍK */}
      <section className="relative py-10 px-4 border-b border-zinc-100/10 z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { t: "ČLENSTVÍ", d: "PERMICE VSTUPY ČLENSTVÍ", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "SUPLEMENTY", d: "PROTEINY KREATIN NAKOPÁVAČE", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "MERCH F77", d: "TRIKA MIKINY ČEPICE DOPLŇKY", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/shop/merch" },
            { t: "BAZAR", d: "POUŽITÉ STROJE VITA NA PRODEJ", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/bazar" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)}>
              <div className="relative h-64 overflow-hidden group border border-white/10 cursor-pointer shadow-xl">
                <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-3xl font-black italic text-[#E10600] tracking-tighter drop-shadow-lg">{item.t}</p>
                  <p className="text-[9px] font-black text-white tracking-[0.2em] uppercase max-w-[200px] leading-tight italic opacity-70">{item.d}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI TRINITY - OCELOVÉ PRVKY (smrk) */}
      <section className="relative py-20 md:py-32 px-4 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E10600]/5 blur-[180px] pointer-events-none"></div>

        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-20 md:gap-16 items-start relative z-10">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm border border-white/5">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/80 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#E10600] pl-3 italic">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8 hover:bg-white hover:text-black transition-all">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          {/* STŘED: OCELOVÁ DESKA MANIFESTU */}
          <div className="w-full flex flex-col gap-12 order-1 lg:order-2 text-center">
            <div className="relative bg-black/60 backdrop-blur-3xl p-10 border border-white/10 shadow-2xl overflow-hidden group">
              {/* OCELOVÝ OVERLAY JEN PRO TENTO BOX (smrk) */}
              <div className="absolute inset-0 opacity-10 mix-blend-color-dodge pointer-events-none bg-cover bg-center" 
                   style={{ backgroundImage: "url('/images/textures/ocel_deska.jpg')" }}></div>
              <h3 className="text-3xl font-black uppercase italic text-white mb-8 tracking-[0.3em] relative z-10">FILOZOFIE</h3>
              <p className="text-2xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter relative z-10 drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">DŘEME PRO VÝSLEDKY, NE PRO FOTKY.</p>
              <p className="text-[11px] text-zinc-500 italic uppercase tracking-widest relative z-10">220 M², 30 STROJŮ VITA A PROFI KARDIO ZÓNA.</p>
            </div>

            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/20 backdrop-blur-md h-24 flex items-center justify-center border-t-2 border-[#E10600] shadow-xl">
                 <span className="text-4xl md:text-5xl font-black italic opacity-10 uppercase tracking-[0.3em]">CENÍK</span>
              </div>
              <div className="relative -mt-10 mx-1 bg-black/60 backdrop-blur-3xl p-8 border border-white/10 shadow-2xl z-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 mix-blend-soft-light pointer-events-none bg-cover bg-center" 
                     style={{ backgroundImage: "url('/images/textures/ocel_deska.jpg')" }}></div>
                <div className="space-y-1 mb-10 relative z-10">
                  {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                    <div key={idx} onClick={() => triggerHaptic(10)} className="flex justify-between items-center py-6 border-b border-white/5 hover:bg-white/5 transition-all px-2 cursor-pointer">
                      <h4 className="font-black italic text-xl uppercase tracking-tighter text-white">{item.n}</h4>
                      <span className="text-2xl font-black italic text-[#E10600] drop-shadow-[0_0_10px_rgba(225,6,0,0.3)]">{item.p} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" onClick={() => triggerHaptic(30)} className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all shadow-2xl relative z-10">PŘEJÍT DO E-SHOPU →</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm border border-white/5">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/80 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#E10600] shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter uppercase">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-r-2 border-[#E10600] pr-3 italic">PRO UNIT</p>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8 hover:bg-white hover:text-black transition-all">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE - ČISTÁ V TEMNOTĚ */}
      <section className="relative py-20 overflow-hidden border-t border-white/5">
         <div className="max-w-[1400px] mx-auto px-6 mb-12 relative z-10">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter underline decoration-[#E10600] decoration-4 underline-offset-8">GALERIE</h2>
         </div>
         <div className="flex gap-3 overflow-x-auto pb-16 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <motion.div key={i} whileTap={{ scale: 0.95 }} className="relative min-w-[320px] md:min-w-[480px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/10 snap-center shadow-2xl" 
                          onClick={() => { setSelectedImage(`/images/gym/gallery/${file}`); triggerHaptic(15); }}>
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* 5. PARTNEŘI - DECENTNĚ NA KONCI */}
      <section className="py-16 border-t border-white/5 relative overflow-hidden bg-black/40">
        <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
          <p className="text-zinc-700 font-black italic uppercase tracking-[0.5em] text-[9px] mb-10">S NÁMI SPOLUPRACUJÍ</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 hover:opacity-100 transition-all">
            <div className="relative w-[140px] h-[40px]"><Image src="/images/partners/multi_sport.png" alt="MultiSport" fill className="object-contain grayscale" /></div>
            <div className="relative w-[140px] h-[40px]"><Image src="/images/partners/aktiva_pronet.png" alt="AktivaPronet" fill className="object-contain grayscale" /></div>
          </div>
        </div>
      </section>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain drop-shadow-[0_0_50px_rgba(225,6,0,0.2)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

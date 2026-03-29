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

  const sluzby = [
    { n: "OSOBNÍ TRENÉR", i: "👤" },
    { n: "POSILOVÁNÍ SVALŮ", i: "🏋️" },
    { n: "POÚRAZOVÉ CVIČENÍ", i: "🏥" },
    { n: "REDUKCE HMOTNOSTI", i: "📉" },
    { n: "SILOVÝ TRÉNINK", i: "💪" },
    { n: "ZLEPŠENÍ KONDICE", i: "🏃" },
    { n: "OBČERSTVENÍ", i: "🍎" },
    { n: "CVIČEBNÍ PLÁNY", i: "📅" },
    { n: "PRODEJ DOPLŇKŮ", i: "🧴" }
  ];

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth font-black uppercase italic">
      
      {/* 1. HERO S MENŠÍM PÍSMEM (smrk) */}
      <section className="relative min-h-[40vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 bg-black z-20 py-12 md:py-0">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-6 md:mt-4 gap-8 md:gap-6">
               <div className="flex flex-col gap-4 relative z-20">
                 <p className="text-[7px] md:text-[8px] tracking-[0.5em] text-zinc-500 italic uppercase">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-wrap gap-4 md:gap-6 border-l-4 border-[#E10600] pl-4 md:pl-5 bg-black/40 backdrop-blur-sm p-4 relative shadow-2xl">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600]"></div>
                    <div><p className="text-[8px] text-zinc-600 font-bold tracking-widest uppercase">PO - PÁ</p><p className="text-xl md:text-2xl text-white tracking-tighter leading-none">06:00 - 21:00</p></div>
                    <div><p className="text-[8px] text-zinc-600 font-bold tracking-widest uppercase">SO - NE</p><p className="text-xl md:text-2xl text-white tracking-tighter leading-none">09:00 - 20:00</p></div>
                 </div>
               </div>
               <Link href="/shop" 
                     onClick={() => triggerHaptic(20)}
                     className="px-8 py-3.5 bg-white text-black text-[10px] tracking-widest hover:bg-[#E10600] hover:text-white transition-all overflow-hidden group">
                 <span className="relative z-10 group-hover:scale-110 transition-transform block italic tracking-tighter uppercase">VSTOUPIT DO E-SHOPU</span>
               </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS ROZCESTNÍK S VRÁCENÝMI ČESKÝMI TEXTY (smrk) */}
      <section className="bg-black py-8 md:py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { t: "ČLENSTVÍ", d: "KOUPIT PERMICI", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "SUPLEMENTY", d: "CO SYPOU PROFI", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "MERCH", d: "OBLEČENÍ JEDNOTKY", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/shop/merch" },
            { t: "BAZAR", d: "STROJE NA PRODEJ", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/bazar" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)}>
              <div className="relative h-56 md:h-64 overflow-hidden group border border-white/10 cursor-pointer">
                <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-2xl md:text-3xl text-[#E10600] tracking-tighter drop-shadow-md uppercase italic">{item.t}</p>
                  <p className="text-[8px] md:text-[9px] font-bold text-white tracking-[0.3em] uppercase max-w-[200px] leading-tight italic">{item.d}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI TRINITY - MENŠÍ PÍSMO & KOMPAKTNÍ SLUŽBY (smrk) */}
      <section className="relative py-16 md:py-28 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 md:gap-12 lg:gap-16 items-start">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 md:-mt-24 mx-2 md:mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-6 md:p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-3xl md:text-4xl uppercase italic text-white tracking-tighter leading-none">HAMÁČEK</h3>
              <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase mt-2 border-l-2 border-[#E10600] pl-3 italic tracking-widest">HLAVNÍ KOUČ // UNIT_01</p>
              
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[8px] md:text-[9px] text-[#E10600] tracking-widest mb-3 uppercase italic">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/protein" className="text-[10px] md:text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>RAW PROTEIN 80</span><span>→</span></Link>
                  <Link href="/shop/creatine" className="text-[10px] md:text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>KREATIN MONOHYDRÁT</span><span>→</span></Link>
                </div>
              </div>
              
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-4 bg-[#E10600] text-white text-[10px] uppercase italic mt-8 tracking-widest">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          {/* STŘED: SLUŽBY & CENÍK (KOMPAKTNÍ) */}
          <div className="w-full flex flex-col gap-10 md:gap-12 order-1 lg:order-2 text-center">
            <div className="relative bg-black/60 backdrop-blur-2xl p-8 md:p-10 border border-white/10 shadow-2xl overflow-hidden text-left">
               <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: "url('/images/textures/ocel_deska.jpg')" }}></div>
              <h3 className="text-3xl uppercase italic text-[#E10600] mb-10 tracking-[0.3em] text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">SLUŽBY F77</h3>
              
              {/* KOMPAKTNÍ MŘÍŽKA SLUŽEB (smrk) */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 relative z-10 px-2">
                {sluzby.map((s, i) => (
                  <motion.div 
                    key={i} 
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 group border-l border-zinc-800 pl-5 py-2 hover:border-[#E10600] transition-colors bg-white/5 shadow-inner"
                  >
                    <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="font-black italic uppercase tracking-tighter text-[11px] md:text-sm text-zinc-400 group-hover:text-white transition-colors leading-none">
                      {s.n}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/10 backdrop-blur-md h-20 flex items-center justify-center border-t-2 border-[#E10600] shadow-xl"><span className="text-3xl md:text-4xl uppercase italic opacity-20 tracking-[0.3em]">CENÍK</span></div>
              <div className="relative -mt-8 mx-1 bg-black/60 backdrop-blur-3xl p-6 md:p-8 border border-white/10 shadow-2xl z-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: "url('/images/textures/ocel_deska.jpg')" }}></div>
                <div className="space-y-1 mb-8 relative z-10">
                  {[{ n: 'JEDNORÁZ', p: '160', l: '/shop/vstup' }, { n: 'MĚSÍČNÍ', p: '1490', l: '/shop/mesic' }, { n: 'ROČNÍ', p: '12990', l: '/shop/rok' }].map((item, idx) => (
                    <Link href={item.l} key={idx} onClick={() => triggerHaptic(10)} className="flex justify-between items-center py-5 border-b border-white/5 hover:bg-white/5 transition-all px-2 cursor-pointer group/row">
                      <h4 className="uppercase italic text-lg uppercase tracking-tighter text-white group-hover/row:text-[#E10600] transition-colors leading-none">{item.n}</h4>
                      <span className="text-2xl text-[#E10600] tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.4)] leading-none">{item.p} CZK</span>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" onClick={() => triggerHaptic(30)} className="block w-full text-center py-4 bg-white text-black text-[10px] uppercase italic tracking-widest hover:bg-[#E10600] hover:text-white transition-all shadow-2xl relative z-10">PŘEJÍT DO E-SHOPU</Link>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 md:-mt-24 mx-2 md:mx-4 lg:mx-8 bg-black/60 backdrop-blur-2xl p-6 md:p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end transition-all">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-3xl md:text-4xl uppercase italic text-white tracking-tighter leading-none">SOUSTRUŽNÍK</h3>
              <p className="text-[9px] md:text-[10px] text-zinc-400 uppercase mt-2 border-r-2 border-[#E10600] pr-3 italic tracking-widest">PRO UNIT // KOUČ</p>
              <div className="mt-6 pt-6 border-t border-white/5 w-full">
                <p className="text-[8px] md:text-[9px] text-[#E10600] tracking-widest mb-3 uppercase italic text-right">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/nakopavac" className="text-[10px] md:text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>PŘEDTRÉNINKOVKA</span><span>←</span></Link>
                  <Link href="/shop/aminokyseliny" className="text-[10px] md:text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>AMINO FUEL MB</span><span>←</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-4 bg-[#E10600] text-white text-[10px] uppercase italic mt-8 tracking-widest">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE & PARTNEŘI - ZŮSTÁVÁ STEJNÉ JEDNOTNÉ (smrk) */}
      <section className="relative py-24 bg-[#0A0A0A] overflow-hidden border-t-2 border-[#E10600]/10">
         <div className="max-w-[1400px] mx-auto px-6 mb-12 relative z-10">
            <h2 className="text-4xl uppercase italic text-white tracking-tighter underline decoration-[#E10600] decoration-4 underline-offset-8">GALERIE</h2>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-16 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <motion.div key={i} whileTap={{ scale: 0.95 }} className="relative min-w-[320px] md:min-w-[480px] aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer border-2 border-white/5 snap-center shadow-xl" onClick={() => { setSelectedImage(`/images/gym/gallery/${file}`); triggerHaptic(15); }}>
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100" />
              </motion.div>
            ))}
         </div>
      </section>

      <section className="py-16 border-t border-white/5 relative bg-black/60">
        <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
          <p className="text-zinc-800 font-black italic uppercase tracking-[0.8em] text-[10px] mb-12">S NÁMI SPOLUPRACUJÍ</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-20">
            <div className="relative w-[160px] h-[50px]"><Image src="/images/partners/multi_sport.png" alt="MultiSport" fill className="object-contain grayscale" /></div>
            <div className="relative w-[160px] h-[40px]"><Image src="/images/partners/aktiva_pronet.png" alt="AktivaPronet" fill className="object-contain grayscale" /></div>
          </div>
        </div>
      </section>

      {/* MODAL ZOOM */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => triggerHaptic(10)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

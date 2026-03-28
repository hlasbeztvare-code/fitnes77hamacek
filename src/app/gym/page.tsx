"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden">
      
      {/* 1. HERO - ČISTÁ BÍLÁ + ANIMACE (smrk) */}
      <section className="relative h-[50vh] flex flex-col justify-center px-6 bg-white border-b border-zinc-100 z-20">
        <div className="max-w-[1400px] mx-auto w-full relative">
          
          {/* FITNESS77 - PŘÍLET ZPRAVA */}
          <motion.h1 
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-black"
          >
            FITNESS<span className="text-[#E10600]">77</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 gap-6">
             
             {/* OTEVÍRAČKA - PŘÍLET SHORA + JEMNÉ PODTRŽENÍ */}
             <motion.div 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-col gap-2"
             >
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-400 italic">RAW_HERITAGE // MB</p>
               <div className="flex gap-10 border-b border-zinc-200 pb-4 pr-10">
                  <div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase">PO - PÁ</p>
                     <p className="text-2xl font-black italic">06:00 - 22:00</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase">SO - NE</p>
                     <p className="text-2xl font-black italic">08:00 - 20:00</p>
                  </div>
               </div>
             </motion.div>

             {/* HARDCORE - PŘÍLET ZLEVA */}
             <motion.h2 
               initial={{ x: -500, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
               className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter"
               style={{ WebkitTextStroke: '2px black', color: 'transparent' }}
             >
               HARDCORE
             </motion.h2>
          </div>
        </div>
      </section>

      {/* 2. SKLENĚNÉ POZADÍ PRO ZBYTEK (smrk) */}
      <section className="relative py-28 px-4 z-10 bg-gradient-to-b from-white via-zinc-200 to-zinc-400 min-h-screen">
        <div className="absolute inset-0 backdrop-blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10 max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* TRENÉR 01: HAMÁČEK */}
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="relative -mt-20 mx-6 bg-white/40 backdrop-blur-xl p-8 border border-white/40 shadow-2xl transition-all group-hover:-translate-y-4">
              <div className="h-1 w-12 bg-[#E10600] mb-4"></div>
              <h3 className="text-3xl font-black uppercase italic text-black">Hamáček</h3>
              <p className="text-[10px] font-bold text-zinc-600 tracking-widest mb-6">HEAD_COACH // 01</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-black text-white text-xs font-black uppercase italic hover:bg-[#E10600] transition-all">REZERVOVAT</Link>
            </div>
          </div>

          {/* PERMANENTKY - SKLENĚNÝ STYL */}
          <div className="group relative lg:mt-20">
            <div className="bg-black/10 backdrop-blur-md h-32 flex items-center justify-center border-t-2 border-black">
               <span className="text-4xl font-black italic opacity-20 uppercase tracking-[0.5em]">PASS</span>
            </div>
            <div className="relative -mt-10 mx-2 bg-white/60 backdrop-blur-2xl p-10 border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-20 transition-all group-hover:-translate-y-4">
              <h3 className="text-4xl font-black uppercase italic mb-8 text-black">Vstupy</h3>
              <div className="space-y-6 mb-10 text-black">
                <div className="flex justify-between border-b border-black/5 pb-2"><span>JEDNORÁZ</span><span className="font-black italic">180 CZK</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>MĚSÍČNÍ</span><span className="font-black italic">1290 CZK</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>ROČNÍ</span><span className="font-black italic">10900 CZK</span></div>
              </div>
              <Link href="/shop" className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-black transition-all">KOUPIT ONLINE</Link>
            </div>
          </div>

          {/* TRENÉR 02: SOUSTRUŽNÍK */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="relative -mt-20 mx-6 bg-white/40 backdrop-blur-xl p-8 border border-white/40 shadow-2xl transition-all group-hover:-translate-y-4 flex flex-col items-end">
              <div className="h-1 w-12 bg-[#E10600] mb-4"></div>
              <h3 className="text-3xl font-black uppercase italic text-black">Soustružník</h3>
              <p className="text-[10px] font-bold text-zinc-600 tracking-widest mb-6 uppercase">Elite_Coach // 02</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-black text-white text-xs font-black uppercase italic hover:bg-[#E10600] transition-all">REZERVOVAT</Link>
            </div>
          </div>

        </div>

        {/* 3. GALERIE - VŠECHNY FOTKY + MODAL (smrk) */}
        <div className="mt-40">
           <h2 className="text-center text-[10px] font-black uppercase tracking-[1em] text-black/30 mb-12 italic">F77_ARCHIVE</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-4 px-4">
             {galleryFiles.map((file, i) => (
               <motion.div 
                 whileHover={{ scale: 1.05, zIndex: 10 }}
                 key={i} 
                 className="relative aspect-square cursor-pointer shadow-xl overflow-hidden rounded-sm border border-white/30"
                 onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
               >
                 <img src={`/images/gym/gallery/${file}`} className="w-full h-full object-cover transition-opacity hover:opacity-80" />
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* FULLSCREEN MODAL (smrk) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-6xl w-full h-[85vh]"
            >
              <Image src={selectedImage} alt="F77 Vault" fill className="object-contain" />
              <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-black uppercase tracking-widest text-[10px]">ESC TO CLOSE // CLICK OUTSIDE</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

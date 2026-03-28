"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const marqueeText = " // HARDCORE MB // RAW_HERITAGE // UNIT_01 // UNIT_02 // NO_BULLSHIT // GYM // ";

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth bg-white">
      
      {/* 1. HERO - ČISTÁ BÍLÁ + ANIMACE + KAPY/ODLESKY */}
      <section className="relative h-[50vh] flex flex-col justify-center px-6 bg-white z-20">
        <div className="max-w-[1400px] mx-auto w-full relative">
          
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter relative inline-block
                           bg-gradient-to-b from-black via-zinc-800 to-black bg-clip-text text-transparent
                           after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-textShine"
            >
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 gap-6">
             <motion.div 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-400 italic">RAW_HERITAGE // MB</p>
               <div className="border-b border-zinc-200 pb-2 flex gap-8">
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

      {/* 2. JEZDÍCÍ PROUŽEK */}
      <section className="bg-black py-4 border-y border-[#E10600] z-20 relative">
        <div className="overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-12 text-[#E10600] font-black uppercase italic text-2xl"
            animate={{ x: [0, -100 + "%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...Array(10)].map((_, j) => marqueeText)}
          </motion.div>
        </div>
      </section>

      {/* 3. ZBYTEK STRÁNKY - ŠEDÉ SKLO (smrk) */}
      <section className="relative py-28 px-4 z-10 bg-[#E5E7EB] bg-opacity-30 backdrop-blur-3xl min-h-screen">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* TRENÉR 01: HAMÁČEK */}
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 mx-6 bg-white/60 backdrop-blur-xl p-8 border border-white/40 shadow-2xl">
              <h3 className="text-3xl font-black uppercase italic text-black">Hamáček</h3>
              <p className="text-sm text-zinc-700 mt-4 leading-relaxed">Zakladatel F77. Nekompromisní naturální cesta a brutální síla.</p>
              <div className="mt-4 p-3 bg-black/5 border border-black/10 rounded">
                <p className="text-[10px] font-black uppercase text-zinc-500">Unit_01_Stack</p>
                <p className="text-xs text-black font-bold mt-1">Isolát + Creapure + Hardcore Pump</p>
              </div>
            </div>
          </div>

          {/* PERMANENTKY - SKLO */}
          <div className="group relative lg:mt-20">
            <div className="relative bg-white/60 backdrop-blur-xl p-10 border border-white/40 shadow-2xl">
              <h3 className="text-4xl font-black uppercase italic mb-8 text-black text-center">Vstupy</h3>
              <div className="space-y-6 mb-10 text-black">
                <div className="flex justify-between border-b border-black/5 pb-2"><span>JEDNORÁZ</span><span className="font-black">180 CZK</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>MĚSÍČNÍ</span><span className="font-black">1290 CZK</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>ROČNÍ</span><span className="font-black">10900 CZK</span></div>
              </div>
              <Link href="/shop" className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-black transition-all">KOUPIT ONLINE</Link>
            </div>
          </div>

          {/* TRENÉR 02: SOUSTRUŽNÍK */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 mx-6 bg-white/60 backdrop-blur-xl p-8 border border-white/40 shadow-2xl flex flex-col items-end">
              <h3 className="text-3xl font-black uppercase italic text-black">Soustružník</h3>
              <p className="text-sm text-zinc-700 mt-4 leading-relaxed">Elitní kouč a aktivní závodník. Nekompromisní technika a drill.</p>
              <div className="mt-4 p-3 bg-black/5 border border-black/10 rounded w-full">
                <p className="text-[10px] font-black uppercase text-zinc-500">Pro_Unit_Stack</p>
                <p className="text-xs text-black font-bold mt-1">Vitamin + Joint Support + ZMA</p>
              </div>
            </div>
          </div>
        </div>

        {/* GALERIE */}
        <div className="mt-40 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 px-4 max-w-[1800px] mx-auto">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square cursor-pointer overflow-hidden group shadow-lg" onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}>
              <img src={`/images/gym/gallery/${file}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-6xl w-full h-[85vh]">
              <Image src={selectedImage} alt="F77 Vault" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

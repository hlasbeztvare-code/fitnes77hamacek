"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const marqueeText = " // HARDCORE MB // RAW_HERITAGE // UNIT_01 // UNIT_02 // ";

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth bg-white">
      
      {/* 1. HERO - ČISTÁ BÍLÁ + MOKRÝ NÁPIS (smrk) */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 bg-white z-20 border-b border-zinc-100">
        <div className="max-w-[1100px] mx-auto w-full relative">
          
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-[7vw] font-black uppercase italic leading-[0.75] tracking-tighter relative inline-block
                           bg-gradient-to-b from-black via-zinc-800 to-black bg-clip-text text-transparent
                           after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-textShine"
            >
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-4">
             <motion.div 
               initial={{ y: -50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 0.3 }}
             >
               <p className="text-[7px] font-black uppercase tracking-[0.6em] text-zinc-400 italic mb-2">RAW_HERITAGE // MB</p>
               <div className="border-b border-zinc-200 pb-1 flex gap-6">
                  <div>
                     <p className="text-[8px] text-zinc-500 font-bold uppercase">PO - PÁ</p>
                     <p className="text-xl font-black italic">06:00 - 22:00</p>
                  </div>
                  <div>
                     <p className="text-[8px] text-zinc-500 font-bold uppercase">SO - NE</p>
                     <p className="text-xl font-black italic">08:00 - 20:00</p>
                  </div>
               </div>
             </motion.div>

             <motion.h2 
               initial={{ x: -300, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
               className="text-[5vw] font-black uppercase italic leading-[0.75] tracking-tighter"
               style={{ WebkitTextStroke: '1px black', color: 'transparent' }}
             >
               HARDCORE
             </motion.h2>
          </div>
        </div>
      </section>

      {/* 2. TENKÝ JEZDÍCÍ PROUŽEK (smrk) */}
      <section className="bg-black py-2 border-y border-[#E10600] z-20 relative">
        <div className="overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-8 text-[#E10600] font-black uppercase italic text-lg"
            animate={{ x: [0, -100 + "%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...Array(15)].map((_, j) => marqueeText)}
          </motion.div>
        </div>
      </section>

      {/* 3. ŠEDÉ SKLO - DIRECTIVE LAYOUT (smrk) */}
      <section className="relative py-16 px-4 z-10 bg-[#E5E7EB] bg-opacity-20 backdrop-blur-3xl min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* TRENÉR VLEVO: HAMÁČEK (smrk) */}
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl border border-white/20 scale-95 group-hover:scale-100 transition-transform">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top" priority />
            </div>
            <div className="relative -mt-16 mx-8 bg-white/70 backdrop-blur-xl p-5 border border-white/40 shadow-xl">
              <h3 className="text-xl font-black uppercase italic text-black tracking-tighter">Hamáček</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-tight">Unit_01 // Founder</p>
              <div className="mt-3 p-2 bg-black/5 border border-black/5 rounded">
                <p className="text-[9px] font-black text-zinc-400">STACK: ISOLAT + CREAPURE</p>
              </div>
            </div>
          </div>

          {/* PERMANENTKY STŘED - LUXUSNÍ SKLO (smrk) */}
          <div className="group relative lg:mt-10">
            <div className="relative bg-white/70 backdrop-blur-xl p-8 border border-white/40 shadow-xl border-t-4 border-t-[#E10600]">
              <h3 className="text-2xl font-black uppercase italic mb-6 text-black text-center tracking-tighter">Vstupy</h3>
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between border-b border-black/5 pb-1"><span>JEDNORÁZ</span><span className="font-black italic">180</span></div>
                <div className="flex justify-between border-b border-black/5 pb-1"><span>MĚSÍČNÍ</span><span className="font-black italic">1290</span></div>
                <div className="flex justify-between border-b border-black/5 pb-1"><span>ROČNÍ</span><span className="font-black italic">10900</span></div>
              </div>
              <Link href="/shop" className="block w-full text-center py-3 bg-[#E10600] text-white text-[10px] font-black uppercase italic hover:bg-black transition-all">KOUPIT_ONLINE →</Link>
            </div>
          </div>

          {/* TRENÉR VPRAVO: SOUSTRUŽNÍK (smrk) */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl border border-white/20 scale-95 group-hover:scale-100 transition-transform">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top" priority />
            </div>
            <div className="relative -mt-16 mx-8 bg-white/70 backdrop-blur-xl p-5 border border-white/40 shadow-xl flex flex-col items-end">
              <h3 className="text-xl font-black uppercase italic text-black tracking-tighter">Soustružník</h3>
              <p className="text-xs text-zinc-600 mt-2 leading-tight">Unit_02 // Elite</p>
              <div className="mt-3 p-2 bg-black/5 border border-black/5 rounded w-full text-right">
                <p className="text-[9px] font-black text-zinc-400">STACK: VITAMINS + ZMA</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4. GALERIE - KOMPAKTNÍ GRID (smrk) */}
        <div className="mt-24 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-1 px-4 max-w-[1400px] mx-auto">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square cursor-pointer overflow-hidden opacity-70 hover:opacity-100 transition-all shadow-lg" onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}>
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL (smrk) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative max-w-4xl w-full h-[70vh]">
              <Image src={selectedImage} alt="F77 Vault Zoom" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

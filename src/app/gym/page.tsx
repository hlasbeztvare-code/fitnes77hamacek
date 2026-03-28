"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from "@/components/ui/Reveal";

export default function GymPage() {
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth relative">
      
      {/* 1. HERO - ČISTÁ BÍLÁ + MOKRÝ ANIMOVANÝ NÁPIS (smrk) */}
      <section className="relative h-[55vh] flex flex-col justify-center px-6 bg-white border-b border-zinc-100 z-20">
        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          
          {/* FITNESS77 - WET LOOK MASTERPIECE (smrk) */}
          <motion.div
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Samotný nápis s "mokrým" efektem a odlesky */}
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter relative inline-block
                           bg-gradient-to-b from-black via-zinc-900 to-black bg-clip-text text-transparent
                           before:content-['FITNESS77'] before:absolute before:inset-0 before:text-transparent before:bg-clip-text before:bg-[url('/images/water_droplets_mask.png')] before:bg-cover before:animate-waterDrop
                           after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-textShine"
            >
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 0 15px rgba(225,6,0,0.4)' }}>77</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 gap-6">
             
             {/* OTEVÍRAČKA - PŘÍLET SHORA */}
             <motion.div 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="flex flex-col gap-2 relative z-20"
             >
               <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-400 italic">RAW_HERITAGE // MB</p>
               {/* Čistá otevíračka bez prosvítání s linkou */}
               <div className="flex gap-10 border-b-2 border-zinc-100 pb-5 pr-12 bg-white/50 backdrop-blur-sm shadow-xl">
                  <div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                     <p className="text-3xl font-black italic text-black">06:00 - 22:00</p>
                  </div>
                  <div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                     <p className="text-3xl font-black italic text-black">08:00 - 20:00</p>
                  </div>
               </div>
             </motion.div>

             {/* HARDCORE - PŘÍLET ZLEVA */}
             <motion.h2 
               initial={{ x: -500, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
               className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10"
               style={{ WebkitTextStroke: '2px black', color: 'transparent', textShadow: '0 0 15px rgba(225,6,0,0.3)' }}
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
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" priority />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="relative -mt-20 mx-6 bg-white/40 backdrop-blur-xl p-8 border border-white/40 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:border-[#E10600]/50">
              <div className="h-1 w-12 bg-[#E10600] mb-4 shadow-[0_0_15px_rgba(225,6,0,0.5)]"></div>
              <h3 className="text-3xl font-black uppercase italic text-black tracking-tighter">Hamáček</h3>
              <p className="text-[10px] font-bold text-zinc-600 tracking-widest mb-6 uppercase"> Zakladatel // Head Coach</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-black text-white text-xs font-black uppercase italic hover:bg-[#E10600] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-none">REZERVOVAT</Link>
            </div>
          </div>

          {/* PERMANENTKY - SKLENĚNÝ STYL */}
          <div className="group relative lg:mt-20">
            <div className="bg-black/10 backdrop-blur-md h-32 flex items-center justify-center border-t-2 border-black">
               <span className="text-5xl font-black italic opacity-20 uppercase tracking-[0.3em]">Pass Protocol</span>
            </div>
            <div className="relative -mt-10 mx-2 bg-white/60 backdrop-blur-2xl p-10 border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-20 transition-all duration-500 group-hover:-translate-y-4 group-hover:border-[#E10600]/50">
              <h3 className="text-4xl font-black uppercase italic mb-8 text-black tracking-tighter">Vstupy</h3>
              <div className="space-y-6 mb-10 text-black">
                {[
                  { name: 'JEDNORÁZ', price: '180' },
                  { name: 'MĚSÍČNÍ', price: '1290' },
                  { name: 'ROČNÍ', price: '10900' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-5 border-b border-black/5 hover:bg-black/5 transition-all px-2 group/item cursor-pointer">
                    <div>
                      <h4 className="font-black italic text-xl group-hover/item:text-[#E10600] transition-colors">{item.name}</h4>
                      <p className="text-[9px] text-zinc-500 font-bold tracking-widest">RAW_ACCESS_77</p>
                    </div>
                    <span className="text-2xl font-black italic">{item.price} CZK</span>
                  </div>
                ))}
              </div>
              <Link href="/shop" className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-none">KOUPIT PERMICI ONLINE →</Link>
            </div>
          </div>

          {/* TRENÉR 02: SOUSTRUŽNÍK */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/20 transition-all duration-700 group-hover:shadow-[0_0_50px_rgba(225,6,0,0.2)] rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="relative -mt-20 mx-6 bg-white/40 backdrop-blur-xl p-8 border border-white/40 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:border-[#E10600]/50 flex flex-col items-end">
              <div className="h-1 w-12 bg-[#E10600] mb-4 shadow-[0_0_15px_rgba(225,6,0,0.5)]"></div>
              <h3 className="text-3xl font-black uppercase italic text-black tracking-tighter">Soustružník</h3>
              <p className="text-[10px] font-bold text-zinc-600 tracking-widest mb-6 uppercase">Elite_Coach // Závodník</p>
              <Link href="/kontakt" className="block w-full text-center py-4 bg-black text-white text-xs font-black uppercase italic hover:bg-[#E10600] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-none">REZERVOVAT</Link>
            </div>
          </div>

        </div>

        {/* 3. GALERIE - VŠECHNY FOTKY + MODAL (smrk) */}
        <div className="mt-48 relative z-10">
           <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-black/40 mb-16 italic">F77_VAULT_ARCHIVE</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2.5 px-4 max-w-[1800px] mx-auto">
             {galleryFiles.map((file, i) => (
               <motion.div 
                 whileHover={{ scale: 1.07, zIndex: 10, shadow: "0px 20px 40px rgba(0,0,0,0.5)" }}
                 key={i} 
                 className="relative aspect-square cursor-pointer overflow-hidden rounded-sm border border-white/30 bg-zinc-900 group shadow-lg"
                 onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
               >
                 <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" loading="lazy" />
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
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-6xl w-full h-[85vh] shadow-2xl"
            >
              <Image src={selectedImage} alt="F77 Vault" fill className="object-contain shadow-2xl shadow-[#E10600]/20" />
              <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-white/50 font-black uppercase tracking-widest text-[10px] bg-black px-4 py-1">CLICK OUTSIDE TO CLOSE</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

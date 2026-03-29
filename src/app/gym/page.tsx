"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from "@/components/ui/Reveal";

export default function GymPage() {
  const galleryFiles = Array.from({ length: 39 }, (_, i) => `gym_photo_${i + 1}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const marqueeText = " // HARDCORE MB // RAW_HERITAGE // UNIT_01 // UNIT_02 // ";

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth bg-black relative">
      
      {/* 1. HERO - ČISTÁ BÍLÁ (smrk) */}
      <section className="relative h-[40vh] flex flex-col justify-center px-6 bg-white z-20 border-b border-zinc-100">
        <div className="max-w-[1100px] mx-auto w-full relative z-10">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-block"
          >
            <h1 className="text-[7vw] font-black uppercase italic leading-[0.75] tracking-tighter relative
                           bg-gradient-to-b from-black via-zinc-800 to-black bg-clip-text text-transparent
                           after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-textShine"
            >
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-4 text-black">
             <Reveal y={20}>
               <p className="text-[7px] font-black uppercase tracking-[0.6em] text-zinc-400 italic mb-2">RAW_HERITAGE // MB</p>
               <div className="border-b border-zinc-200 pb-1 flex gap-6">
                  <div><p className="text-[8px] text-zinc-500 font-bold uppercase">PO - PÁ</p><p className="text-xl font-black italic">06:00 - 22:00</p></div>
                  <div><p className="text-[8px] text-zinc-500 font-bold uppercase">SO - NE</p><p className="text-xl font-black italic">08:00 - 20:00</p></div>
               </div>
             </Reveal>
             <motion.h2 
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="text-[5vw] font-black uppercase italic leading-[0.75] tracking-tighter"
               style={{ WebkitTextStroke: '1px black', color: 'transparent' }}
             >
               HARDCORE
             </motion.h2>
          </div>
        </div>
      </section>

      {/* 2. JEZDÍCÍ PROUŽEK */}
      <section className="bg-black py-2 border-y border-[#E10600] z-20 relative">
        <div className="overflow-hidden flex whitespace-nowrap">
          <motion.div className="flex items-center gap-8 text-[#E10600] font-black uppercase italic text-lg"
            animate={{ x: [0, -100 + "%"] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
            {[...Array(15)].map((_, j) => <span key={j}>{marqueeText}</span>)}
          </motion.div>
        </div>
      </section>

      {/* 3. ZBYTEK - TOTÁLNÍ ČERNÁ (smrk) */}
      <section className="relative py-16 px-4 z-10 bg-black min-h-screen">
        
        {/* POZADÍ NAPEWNO (FIXED) A NÍŽ */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image src="/images/hero_revealed.jpg" alt="F77 Background" fill className="object-cover grayscale opacity-10 object-[center_80%]" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl"></div>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
          
          {/* TRENÉR VLEVO: HAMÁČEK */}
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/10 scale-95 group-hover:scale-100 transition-transform">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-16 mx-6 bg-black/80 backdrop-blur-xl p-5 border border-white/10 shadow-2xl">
              <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">Hamáček</h3>
              <p className="text-[10px] text-[#E10600] font-bold tracking-widest mt-1">UNIT_01 // FOUNDER</p>
            </div>
          </div>

          {/* STŘED: INFO + PERMICE NÍŽ */}
          <div className="flex flex-col gap-8 lg:mt-24">
            <div className="relative bg-black/80 backdrop-blur-xl p-6 border border-white/10 shadow-2xl border-l-4 border-l-[#E10600]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4 italic">Hardcore_Philosophy</h4>
              <p className="text-xs text-white font-bold leading-relaxed mb-4">
                Rozloha 220 m², 30 strojů VITA a profesionální kardio-zóna.
              </p>
              <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                Tady se netrénuje pro fotky, tady se dře pro výsledky. (smrk)
              </p>
            </div>

            <div className="relative bg-black/80 backdrop-blur-xl p-8 border border-white/10 shadow-2xl border-t-4 border-t-[#E10600]">
              <h3 className="text-2xl font-black uppercase italic mb-6 text-white text-center">Vstupy</h3>
              <div className="space-y-4 text-white text-sm">
                <div className="flex justify-between border-b border-white/5 pb-1"><span>JEDNORÁZ</span><span className="font-black italic">180</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>MĚSÍČNÍ</span><span className="font-black italic">1290</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span>ROČNÍ</span><span className="font-black italic">10900</span></div>
              </div>
              <Link href="/shop" className="mt-8 block w-full text-center py-3 bg-white text-black text-[10px] font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">KOUPIT_ONLINE</Link>
            </div>
          </div>

          {/* TRENÉR VPRAVO: SOUSTRUŽNÍK */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-white/10 scale-95 group-hover:scale-100 transition-transform">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-16 mx-6 bg-black/80 backdrop-blur-xl p-5 border border-white/10 shadow-2xl flex flex-col items-end">
              <h3 className="text-xl font-black uppercase italic text-white tracking-tighter">Soustružník</h3>
              <p className="text-[10px] text-[#E10600] font-bold tracking-widest mt-1 uppercase">Unit_02 // Elite</p>
            </div>
          </div>
        </div>

        {/* GALERIE */}
        <div className="mt-32 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-1 px-4 max-w-[1400px] mx-auto relative z-10">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square cursor-pointer overflow-hidden opacity-40 hover:opacity-100 transition-all shadow-lg" onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}>
              <img src={`/images/gym/gallery/${file}`} alt="F77" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

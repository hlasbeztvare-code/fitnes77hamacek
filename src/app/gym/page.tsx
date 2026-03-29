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
    { n: "PO ÚRAZOVÉ CVIČENÍ", i: "🏥" },
    { n: "REDUKCE HMOTNOSTI", i: "📉" },
    { n: "SILOVÝ TRÉNINK", i: "💪" },
    { n: "ZLEPŠENÍ KONDICE", i: "🏃" },
    { n: "OBČERSTVENÍ", i: "🍎" },
    { n: "CVIČEBNÍ PLÁNY", i: "📅" },
    { n: "PRODEJ DOPLŇKŮ", i: "🧴" }
  ];

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO - ZŮSTÁVÁ STEJNÉ */}
      <section className="relative min-h-[45vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 bg-black z-20 py-16 md:py-0">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[15vw] md:text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-8 md:mt-4 gap-10 md:gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic uppercase">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-col sm:flex-row gap-8 border-l-4 border-[#E10600] pl-5 bg-black/40 backdrop-blur-md p-5 relative shadow-2xl">
                    <div className="absolute inset-y-0 -left-1 w-1 bg-[#E10600]"></div>
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">PO - PÁ</p><p className="text-xl md:text-2xl font-black italic text-white">06:00 - 21:00</p></div>
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">SO - NE</p><p className="text-xl md:text-2xl font-black italic text-white">09:00 - 20:00</p></div>
                 </div>
               </div>
               <Link href="/shop" className="px-8 py-4 bg-white text-black font-black uppercase italic text-xs tracking-widest hover:bg-[#E10600] hover:text-white transition-all">VSTOUPIT DO E-SHOPU →</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS - ZŮSTÁVÁ STEJNÉ */}

      {/* 3. TRINITY TRENÉŘI - ZŮSTÁVÁ STEJNÉ */}

      {/* 4. NOVINKA: SEKCE SLUŽBY (ČERVENÁ AGRESE) */}
      <section className="relative py-24 bg-[#E10600] text-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-black/10"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 text-white">SLUŽBY</h2>
          <div className="w-full h-px bg-white/30 border-t border-dashed border-white mb-16"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8">
            {sluzby.map((s, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-2xl">
                  {s.i}
                </div>
                <p className="font-black italic uppercase tracking-tighter text-lg md:text-xl text-white drop-shadow-md leading-none">
                  {s.n}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* DEKORATIVNÍ TEXT */}
        <div className="absolute -bottom-10 -right-10 text-[20vw] font-black italic text-white/5 pointer-events-none select-none">F77</div>
      </section>

      {/* 5. PARTNEŘI (MULTISPORT ATD.) */}
      <section className="py-20 bg-black border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-zinc-500 font-black italic uppercase tracking-[0.5em] text-[10px] mb-12">S NÁMI SPOLUPRACUJÍ</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-50 hover:opacity-100 transition-opacity">
            <Image src="/images/partners/multi_sport.png" alt="MultiSport" width={250} height={80} className="grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/images/partners/aktiva_pronet.png" alt="AktivaPronet" width={220} height={70} className="grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </section>

      {/* 6. GALERIE - ZŮSTÁVÁ STEJNÉ */}

      {/* MODAL ZOOM - ZŮSTÁVÁ STEJNÉ */}

    </main>
  );
}

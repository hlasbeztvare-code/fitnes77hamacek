"use client";
import React, { useState, useEffect } from 'react';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);

  useEffect(() => {
    const files = Array.from({ length: 40 }, (_, i) => `gym_photo_${i + 1}.jpg`);
    setGalleryFiles(files);
  }, []);

  const sluzby = [
    { n: "OSOBNÍ TRENÉR", i: "👤" }, { n: "POSILOVÁNÍ SVALŮ", i: "🏋️" },
    { n: "POÚRAZOVÉ CVIČENÍ", i: "🏥" }, { n: "REDUKCE HMOTNOSTI", i: "📉" },
    { n: "SILOVÝ TRÉNINK", i: "💪" }, { n: "ZLEPŠENÍ KONDICE", i: "🏃" },
    { n: "OBČERSTVENÍ", i: "🍎" }, { n: "CVIČEBNÍ PLÁNY", i: "📅" },
    { n: "PRODEJ DOPLŇKŮ", i: "🧴" }
  ];

  return (
    <main className="bg-black text-white overflow-x-hidden relative scroll-smooth min-h-screen font-black uppercase tracking-tighter">
      
      {/* 1. HERO - ULTRA KOMPRIMOVÁNO NA 35VH + PLKÁ VIDITELNOST NÁPISU (smrk) */}
      <section className="relative min-h-[35vh] flex flex-col justify-center px-6 z-20 py-12 overflow-hidden border-b border-[#FF0000]/20 bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image 
            src="/images/hero/hero_beton_fitness77.png" 
            alt="BETON_F77" 
            fill 
            className="object-cover grayscale" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60"></div>
        </div>

        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center md:text-left flex flex-col items-center md:items-start gap-6">
            <h1 className="text-[10vw] md:text-[6.5vw] leading-[0.8] text-white font-black uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,1)] tracking-tighter">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            <div className="bg-black/95 p-5 shadow-2xl inline-block border-l-[6px] border-[#FF0000] backdrop-blur-md">
              <p className="text-[8px] text-zinc-600 font-bold tracking-[0.4em] mb-1.5 uppercase leading-none">MLADÁ BOLESLAV // ORIGINÁL_GYM_01</p>
              <p className="text-xl md:text-2xl text-white font-black tracking-tighter">PO–PÁ 06:00 – 21:00 / SO–NE 09:00 – 20:00</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ... zbytek kódu zůstává neprůstřelně stejný (smrk) ... */}
      {/* 2. STATS, 3. TRENÉŘI, SLUŽBY, GALERIE... */}
    </main>
  );
}

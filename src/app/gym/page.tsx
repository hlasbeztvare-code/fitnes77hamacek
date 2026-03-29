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
      {/* BACKGROUND - TVŮJ NOVEJ BETON V PNG (smrk) */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Image 
          src="/images/hero/hero_beton_fitness77.png" 
          alt="BETON_F77" 
          fill 
          className="object-cover grayscale" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      {/* 1. HERO - TOTAL STRAIGHT */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-6 z-20 py-24">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center md:text-left">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.7] text-white font-black uppercase">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            <div className="mt-10 border-l-[6px] border-[#FF0000] pl-6 bg-black/80 p-8 shadow-2xl inline-block border border-white/5 backdrop-blur-xl">
              <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] mb-2 uppercase">BOLESLAVSKÝ ORIGINÁL</p>
              <p className="text-xl md:text-3xl text-white font-black">PO–PÁ 06:00 – 21:00 / SO–NE 09:00 – 20:00</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ... zbytek kódu zůstává neprůstřelně stejný ... */}
      {/* 2. STATS, 3. TRENÉŘI, SLUŽBY, GALERIE... */}
    </main>
  );
}

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

  const triggerHaptic = (intensity = 20) => {
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
    <main className="bg-[#050505] text-white selection:bg-[#FF0000] selection:text-white overflow-x-hidden relative scroll-smooth min-h-screen font-black uppercase italic tracking-tighter">
      
      {/* BACKGROUND LAYER: BRUTAL BETON */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-fixed bg-center bg-cover scale-110" 
           style={{ backgroundImage: "url('/images/textures/beton_hardcore.jpg')" }}></div>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* 1. HERO */}
      <section className="relative min-h-[45vh] flex flex-col justify-center px-4 md:px-6 border-b border-[#FF0000]/20 z-20 py-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.7] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,1)] font-black uppercase">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-12 gap-10">
               <div className="flex flex-col gap-6 relative">
                 <p className="text-[8px] tracking-[1em] text-zinc-600 font-black">MLADÁ BOLESLAV // UNIT_01</p>
                 <div className="flex flex-col sm:flex-row gap-8 border-l-[6px] border-[#FF0000] pl-6 bg-black/80 backdrop-blur-xl p-5 shadow-2xl border border-white/5">
                    <div>
                      <p className="text-[9px] text-zinc-500 tracking-widest uppercase mb-1 font-black">PO - PÁ</p>
                      <p className="text-xl md:text-2xl text-white tracking-tighter font-black italic">06:00 - 21:00</p>
                    </div>
                    <div className="sm:border-l sm:border-white/10 sm:pl-10">
                      <p className="text-[9px] text-zinc-500 tracking-widest uppercase mb-1 font-black">SO - NE</p>
                      <p className="text-xl md:text-2xl text-white tracking-tighter font-black italic">09:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <Link href="/shop" onClick={() => triggerHaptic(30)} className="px-12 py-5 bg-white text-black text-[10px] tracking-[0.2em] hover:bg-[#FF0000] hover:text-white transition-all shadow-2xl text-center font-black italic">VSTOUPIT DO E-SHOPU</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS */}
      <section className="relative py-12 px-4 border-b border-white/5 z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/bazar" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/kontakt" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)} className="relative h-64 overflow-hidden group border-2 border-white/5">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-5 left-5">
                <p className="text-3xl text-[#FF0000] tracking-tighter font-black italic leading-none">{item.t}</p>
                <p className="text-[9px] font-black text-white tracking-[0.2em] uppercase leading-tight mt-1 italic">{item.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI - TEXTY HAMACEK A SOUSTRUZNIK (smrk) */}
      <section className="relative py-20 md:py-32 px-4 z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-24 md:gap-16 items-start relative z-10">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group relative order-2 lg:order-1 scale-95 origin-top font-black italic">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform duration-700">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl uppercase tracking-tighter text-white leading-none font-black italic">HAMÁČEK</h3>
              <p className="text-[10px] font-black italic text-zinc-500 uppercase mt-2 border-l-2 border-[#FF0000] pl-3">HLAVNÍ KOUČ</p>
              <p className="text-[9px] text-zinc-600 max-w-xs leading-tight mt-6 font-black uppercase italic tracking-tighter">
                LEGENDÁRNÍ_TRENÉR. SVALOVÁ_MECHANIKA. NEKOMPROMISNÍ_DISCIPLÍNA. 15+ LET_ZKUŠENOSTÍ.
              </p>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#FF0000] text-white text-[10px] uppercase mt-8 tracking-[0.2em] shadow-xl font-black italic">REZERVOVAT</Link>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group relative order-3 text-right scale-95 origin-top font-black italic">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform duration-700">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-black italic text-zinc-500 uppercase mt-2 border-r-2 border-[#FF0000] pr-4">PRO UNIT</p>
              <p className="text-[9px] text-zinc-600 max-w-xs leading-tight mt-6 font-black uppercase italic tracking-tighter text-right">
                TAKTICKÝ_KOUČING. SILOVÁ_TAKTIKA. UNIT_METHODOLOGY. NEKOMPROMISNÍ_DRIL.
              </p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[10px] font-black italic uppercase mt-8 tracking-[0.2em] shadow-xl">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

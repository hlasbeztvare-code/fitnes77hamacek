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
      
      {/* 1. HERO - KOMPRIMOVÁNO NA 60VH + IZOLACE BETONU (smrk) */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-6 z-20 py-20 overflow-hidden border-b border-[#FF0000]/20 bg-zinc-950">
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
          <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center md:text-left">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.7] text-white font-black uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            <div className="mt-10 bg-black/95 p-6 shadow-2xl inline-block border-l-[6px] border-[#FF0000] backdrop-blur-md">
              <p className="text-[9px] text-zinc-600 font-bold tracking-[0.4em] mb-1.5 uppercase leading-none">MLADÁ BOLESLAV // ORIGINÁL_GYM</p>
              <p className="text-xl md:text-3xl text-white font-black">PO–PÁ 06:00 – 21:00 / SO–NE 09:00 – 20:00</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS - ZPÁTKY NA SVÝM MÍSTĚ (smrk) */}
      <section className="relative py-16 px-4 z-20 bg-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-64 overflow-hidden border border-white/10 group bg-zinc-900">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-20 group-hover:opacity-60 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-4xl text-[#FF0000] font-black leading-none">{item.t}</p>
                <p className="text-[11px] font-black text-white tracking-widest mt-2 leading-none uppercase">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI, SLUŽBY A CENÍK - ZPÁTKY NA SVÝM MÍSTĚ (smrk) */}
      <section className="relative py-24 px-4 z-10 bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 items-start relative z-10">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col font-black">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/5">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top grayscale" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black p-8 border-t-4 border-[#FF0000] shadow-2xl">
              <h3 className="text-5xl tracking-tighter font-black uppercase leading-none">HAMÁČEK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mt-3 uppercase font-black leading-none">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all mt-8">REZERVOVAT</Link>
            </div>
          </div>

          {/* SLUŽBY & CENÍK - ZPÁTKY UPPROSTŘED (smrk) */}
          <div className="w-full flex flex-col gap-10 order-first lg:order-none font-black text-center">
            <div className="relative bg-zinc-900 p-8 border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-black text-[#FF0000] mb-10 tracking-[0.4em] uppercase">SLUŽBY F77</h3>
              <div className="grid grid-cols-1 gap-3">
                {sluzby.map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 border border-zinc-800 py-3.5 px-6 hover:border-[#FF0000] bg-black/40 transition-all group">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="text-[12px] text-zinc-300 group-hover:text-white font-black uppercase tracking-widest">{s.n}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 p-8 border border-white/5 shadow-2xl">
              <h4 className="text-[10px] text-zinc-500 mb-8 tracking-[0.5em] font-black uppercase">CENÍK VSTUPŮ</h4>
              <div className="grid grid-cols-3 gap-3">
                {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center py-6 border border-white/5 bg-black/40">
                    <h4 className="text-[9px] text-zinc-500 mb-2 font-black uppercase tracking-widestleading-none">{item.n}</h4>
                    <span className="text-xl text-[#FF0000] font-black leading-none">{item.p} CZK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col font-black text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/5">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top grayscale" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black p-8 border-t-4 border-[#FF0000] shadow-2xl flex flex-col items-end">
              <h3 className="text-5xl tracking-tighter font-black uppercase leading-none">SOUSTRUŽNÍK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mt-3 uppercase font-black leading-none">PRO UNIT</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all mt-8">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE - ZPÁTKY NA KONCI (smrk) */}
      <section className="relative py-24 border-t border-white/5 bg-zinc-950 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center relative z-10">
            <h2 className="text-7xl text-white tracking-tighter border-b-[8px] border-[#FF0000] inline-block font-black uppercase px-4 pb-2">GALERIE_MB</h2>
         </div>
         <div className="flex gap-6 overflow-x-auto pb-20 px-6 no-scrollbar scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <div key={i} className="relative min-w-[400px] md:min-w-[650px] aspect-[16/10] overflow-hidden border border-white/10 group">
                <Image src={`/images/gym/gallery/${file}`} alt="F77" fill className="object-cover grayscale opacity-40 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
              </div>
            ))}
         </div>
      </section>
    </main>
  );
}

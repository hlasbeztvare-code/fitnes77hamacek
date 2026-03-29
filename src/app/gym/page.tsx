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
      {/* BACKGROUND - TVŮJ NOVEJ BETON (smrk) */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Image 
          src="/images/hero/hero_beton_fitness77.jpg" 
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

      {/* 2. STATS - 4 KARTY */}
      <section className="relative py-12 px-4 border-y border-white/5 z-20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-64 overflow-hidden group border-2 border-white/5">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-30 group-hover:opacity-60 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-4xl text-[#FF0000] tracking-tighter font-black leading-none">{item.t}</p>
                <p className="text-[11px] font-black text-white tracking-[0.2em] uppercase mt-2">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI, SLUŽBY A CENÍK */}
      <section className="relative py-24 px-4 z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 items-start relative z-10">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group font-black">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black/95 p-8 border-t-4 border-[#FF0000] shadow-2xl backdrop-blur-xl">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black uppercase">HAMÁČEK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mb-4">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] tracking-[0.3em] mt-8 font-black hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>

          {/* STŘED - SLUŽBY & CENÍK */}
          <div className="w-full flex flex-col gap-10 order-first lg:order-none font-black text-center">
            <div className="relative bg-black/80 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl">
              <h3 className="text-2xl font-black text-[#FF0000] mb-10 tracking-[0.4em]">SLUŽBY F77</h3>
              <div className="grid grid-cols-1 gap-3">
                {sluzby.map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 border border-zinc-800 py-3.5 px-6 hover:border-[#FF0000] bg-white/5 transition-all group cursor-default">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="text-[12px] text-zinc-300 group-hover:text-white tracking-widest font-black uppercase">{s.n}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/90 p-8 border-2 border-white/10 shadow-2xl relative">
              <h4 className="text-[10px] text-zinc-500 mb-8 tracking-[0.5em] uppercase font-black">CENÍK VSTUPŮ</h4>
              <div className="grid grid-cols-3 gap-3">
                {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center py-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                    <h4 className="text-[9px] text-zinc-500 mb-2 tracking-widest uppercase font-black">{item.n}</h4>
                    <span className="text-xl text-[#FF0000] leading-none tracking-tighter font-black">{item.p} CZK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group font-black text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black/95 p-8 border-t-4 border-[#FF0000] shadow-2xl flex flex-col items-end backdrop-blur-xl">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black uppercase">SOUSTRUŽNÍK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mb-4 uppercase">PRO UNIT</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] tracking-[0.3em] mt-8 font-black hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="relative py-24 border-t-2 border-[#FF0000]/20 bg-black/60 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center relative z-10">
            <h2 className="text-7xl text-white tracking-tighter border-b-[8px] border-[#FF0000] inline-block font-black uppercase px-4 pb-2">GALERIE_MB</h2>
         </div>
         <div className="flex gap-6 overflow-x-auto pb-20 px-6 no-scrollbar scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <div key={i} className="relative min-w-[400px] md:min-w-[650px] aspect-[16/10] overflow-hidden bg-zinc-900 border-2 border-white/5 shadow-2xl group">
                <Image src={`/images/gym/gallery/${file}`} alt="F77" fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              </div>
            ))}
         </div>
      </section>
    </main>
  );
}

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
      
      {/* 1. HERO - FULLSCREEN + NÁPIS PŘESNĚ PŘES OBRÁZEK (smrk) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-[#FF0000]/20 bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image 
            src="/images/hero/hero_beton_fitness77.png" 
            alt="BETON_F77" 
            fill 
            className="object-cover md:object-contain object-center" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full flex justify-center items-center h-full">
           {/* NÁPIS PŘESNĚ PŘES TEN NA OBRÁZKU (smrk) */}
           <h1 className="text-[14vw] md:text-[11.2vw] leading-none text-white font-black uppercase tracking-tighter opacity-90 mix-blend-overlay">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
        </div>
      </section>

      {/* 2. STATS (smrk) */}
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
              <div className="absolute bottom-6 left-6 z-10 text-left">
                <p className="text-4xl text-[#FF0000] font-black leading-none tracking-tighter">{item.t}</p>
                <p className="text-[11px] font-black text-white tracking-widest mt-2 leading-none uppercase">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI, SLUŽBY A CENÍK (smrk) */}
      <section className="relative py-24 px-4 z-10 bg-black">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 items-start relative z-10 font-black">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/5">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black p-8 border-t-4 border-[#FF0000] shadow-2xl">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black uppercase">HAMÁČEK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mt-3 uppercase font-black leading-none">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all mt-8">REZERVOVAT</Link>
            </div>
          </div>

          {/* SLUŽBY & CENÍK */}
          <div className="w-full flex flex-col gap-10 order-first lg:order-none text-center relative z-20">
            <div className="relative bg-zinc-900 p-8 border border-white/5 shadow-2xl backdrop-blur-3xl">
              <h3 className="text-2xl font-black text-[#FF0000] mb-10 tracking-[0.4em] uppercase">SLUŽBY F77</h3>
              <div className="grid grid-cols-1 gap-3 px-2">
                {sluzby.map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 border border-zinc-800 py-3.5 px-6 hover:border-[#FF0000] bg-black/40 transition-all group">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="text-[12px] text-zinc-300 group-hover:text-white font-black uppercase tracking-widest leading-none">{s.n}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 p-8 border border-white/5 shadow-2xl relative">
              <h4 className="text-[10px] text-zinc-500 mb-8 tracking-[0.5em] font-black uppercase">CENÍK VSTUPŮ</h4>
              <div className="grid grid-cols-3 gap-3">
                {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center py-6 border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                    <h4 className="text-[9px] text-zinc-500 mb-2 font-black uppercase tracking-widest leading-none">{item.n}</h4>
                    <span className="text-xl text-[#FF0000] font-black leading-none">{item.p} CZK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/5">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black p-8 border-t-4 border-[#FF0000] shadow-2xl flex flex-col items-end backdrop-blur-xl">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black uppercase">SOUSTRUŽNÍK</h3>
              <p className="text-[11px] text-zinc-500 tracking-[0.4em] mt-3 uppercase font-black leading-none">PRO UNIT</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] font-black tracking-[0.3em] hover:bg-white hover:text-black transition-all mt-8">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE (smrk) */}
      <section className="relative py-24 border-t border-white/5 bg-zinc-950 overflow-hidden font-black">
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

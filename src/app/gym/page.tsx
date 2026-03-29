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
    <main className="bg-[#050505] text-white selection:bg-[#FF0000] selection:text-white overflow-x-hidden relative scroll-smooth min-h-screen font-black uppercase tracking-tighter">
      
      {/* BACKGROUND LAYER: BRUTAL BETON */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-fixed bg-center bg-cover scale-110" 
           style={{ backgroundImage: "url('/images/textures/beton_hardcore.jpg')" }}></div>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* 1. HERO - BEZ KURZÍVY (smrk) */}
      <section className="relative min-h-[45vh] flex flex-col justify-center px-4 md:px-6 border-b border-[#FF0000]/20 z-20 py-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.7] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,1)] font-black uppercase">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-12 gap-10">
               <div className="flex flex-col gap-6 relative">
                 <p className="text-[8px] tracking-[1em] text-zinc-500 font-black">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-col sm:flex-row gap-10 border-l-[6px] border-[#FF0000] pl-6 bg-black/80 backdrop-blur-xl p-8 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] border border-white/5">
                    <div>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-1">PO - PÁ</p>
                      <p className="text-xl md:text-2xl text-white tracking-tighter font-black">06:00 - 21:00</p>
                    </div>
                    <div className="sm:border-l sm:border-white/10 sm:pl-10">
                      <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mb-1">SO - NE</p>
                      <p className="text-xl md:text-2xl text-white tracking-tighter font-black">09:00 - 20:00</p>
                    </div>
                 </div>
               </div>

               <Link href="/shop" 
                     onClick={() => triggerHaptic(30)}
                     className="px-12 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#FF0000] hover:text-white transition-all shadow-2xl text-center">
                 VSTOUPIT DO E-SHOPU →
               </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS - ROVNÝ FONT (smrk) */}
      <section className="relative py-12 px-4 border-b border-white/5 z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/bazar" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/kontakt" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)} className="relative h-64 overflow-hidden group border-2 border-white/5">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-5 left-5">
                <p className="text-3xl text-[#FF0000] tracking-tighter drop-shadow-2xl font-black">{item.t}</p>
                <p className="text-[10px] font-bold text-white tracking-[0.2em] uppercase max-w-[200px] leading-tight font-black">{item.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI - ROVNÝ FONT (smrk) */}
      <section className="relative py-20 md:py-32 px-4 z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-24 md:gap-16 items-start relative z-10">
          
          <div className="w-full flex flex-col group relative order-2 lg:order-1 scale-95 origin-top">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform duration-700">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl uppercase tracking-tighter text-white leading-none font-black">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#FF0000] pl-3 font-black">HLAVNÍ KOUČ</p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-[#FF0000] tracking-widest mb-3 uppercase">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/protein" className="text-[11px] font-black text-zinc-400 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between tracking-tighter"><span>RAW PROTEIN 80</span><span>→</span></Link>
                  <Link href="/shop/creatine" className="text-[11px] font-black text-zinc-400 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between tracking-tighter"><span>KREATIN MONOHYDRÁT</span><span>→</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#FF0000] text-white text-[10px] uppercase mt-8 tracking-[0.2em] shadow-xl font-black">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          <div className="w-full flex flex-col gap-12 order-1 lg:order-2 text-center relative z-20">
            <div className="relative bg-black/80 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl overflow-hidden text-center">
              <h3 className="text-2xl font-black text-[#FF0000] mb-10 tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">SLUŽBY F77</h3>
              <div className="space-y-3 relative z-10 px-2 flex flex-col items-center">
                {sluzby.map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 group border border-zinc-800 py-2.5 px-6 hover:border-[#FF0000] transition-colors bg-white/5 w-full">
                    <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="tracking-tighter text-xs font-black text-zinc-300 group-hover:text-white uppercase leading-none">
                      {s.n}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col group relative text-center">
              <div className="bg-black/10 backdrop-blur-md h-20 flex items-center justify-center border-t-2 border-[#FF0000] shadow-xl">
                 <span className="text-3xl font-black opacity-20 tracking-[0.3em] uppercase">CENÍK</span>
              </div>
              <div className="relative -mt-8 mx-1 bg-black/80 backdrop-blur-3xl p-6 border-2 border-white/10 shadow-2xl z-20">
                <div className="grid grid-cols-3 gap-2 relative z-10 font-black">
                  {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                    <div key={idx} className="flex flex-col justify-center items-center py-6 border border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                      <h4 className="text-[10px] md:text-xs tracking-tighter text-zinc-500 uppercase mb-1 leading-none">{item.n}</h4>
                      <span className="text-lg md:text-xl text-[#FF0000] drop-shadow-[0_0_15px_rgba(255,0,0,0.4)] leading-none font-black">{item.p} CZK</span>
                    </div>
                  ))}
                </div>
                <Link href="/shop" className="block w-full text-center py-4 bg-white text-black text-[9px] hover:bg-[#FF0000] hover:text-white transition-all shadow-2xl relative z-10 tracking-[0.3em] mt-6 font-black uppercase">VSTOUPIT DO E-SHOPU →</Link>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col group relative order-3 text-right scale-95 origin-top">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform duration-700">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-black text-zinc-500 uppercase mt-2 border-r-2 border-[#FF0000] pr-4">PRO UNIT</p>
              <div className="mt-6 pt-6 border-t border-white/5 w-full">
                <p className="text-[9px] font-black text-[#FF0000] tracking-widest mb-3 uppercase text-right">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/nakopavac" className="text-[11px] font-black text-zinc-400 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between flex-row-reverse tracking-tighter"><span>PŘEDTRÉNINKOVKA</span><span>←</span></Link>
                  <Link href="/shop/aminokyseliny" className="text-[11px] font-black text-zinc-400 hover:text-white transition-colors border-b border-white/5 pb-2 flex justify-between flex-row-reverse tracking-tighter"><span>AMINO FUEL MB</span><span>←</span></Link>
                </div>
              </div>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[10px] font-black uppercase mt-8 tracking-[0.2em] shadow-xl">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section className="relative py-24 border-t-2 border-[#FF0000]/10 bg-black/40 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-16 relative z-10 text-center">
            <h2 className="text-5xl font-black uppercase text-white tracking-tighter inline-block relative underline decoration-[#FF0000] decoration-4 underline-offset-8">GALERIE_MB</h2>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-20 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <div key={i} className="relative min-w-[320px] md:min-w-[500px] aspect-[16/10] overflow-hidden bg-zinc-900 border-2 border-white/5 snap-center shadow-2xl">
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100" />
              </div>
            ))}
         </div>
      </section>

    </main>
  );
}

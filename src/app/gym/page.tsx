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
    <main className="bg-[#050505] text-white selection:bg-[#FF0000] selection:text-white overflow-x-hidden relative scroll-smooth min-h-screen font-black uppercase italic">
      
      {/* BACKGROUND LAYER: BRUTAL BETON */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-fixed bg-center bg-cover scale-110" 
           style={{ backgroundImage: "url('/images/textures/beton_hardcore.jpg')" }}></div>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

      {/* 1. HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-center px-4 md:px-6 border-b border-[#FF0000]/20 z-20 py-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.75] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
              FITNESS<span className="text-[#FF0000] drop-shadow-[0_0_30px_rgba(255,0,0,0.6)]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-12 gap-10">
               <div className="flex flex-col gap-6 relative">
                 <p className="text-[9px] tracking-[1em] text-zinc-500 italic drop-shadow-md">MLADÁ BOLESLAV // LEGENDÁRNÍ_GYM</p>
                 <div className="flex flex-col sm:flex-row gap-10 border-l-[6px] border-[#FF0000] pl-6 bg-black/80 backdrop-blur-xl p-8 shadow-[20px_20px_60px_rgba(0,0,0,0.8)]">
                    <div>
                      <p className="text-[10px] text-zinc-600 font-bold tracking-widest mb-1 uppercase">PO - PÁ</p>
                      <p className="text-2xl md:text-3xl text-white tracking-tighter">06:00 - 21:00</p>
                    </div>
                    <div className="sm:border-l sm:border-white/10 sm:pl-10">
                      <p className="text-[10px] text-zinc-600 font-bold tracking-widest mb-1 uppercase">SO - NE</p>
                      <p className="text-2xl md:text-3xl text-white tracking-tighter">09:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <Link href="/shop" onClick={() => triggerHaptic(30)} className="px-12 py-5 bg-white text-black text-[11px] tracking-widest hover:bg-[#FF0000] hover:text-white transition-all shadow-2xl text-center">VSTOUPIT DO E-SHOPU</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS - BEZ MERCHE, JEN HARDCORE DATA (smrk) */}
      <section className="relative py-12 px-4 border-b border-white/5 z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/bazar" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/kontakt" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)} className="relative h-72 overflow-hidden group border-2 border-white/5 hover:border-[#FF0000]/50 transition-all duration-500">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-3xl md:text-4xl text-[#FF0000] tracking-tighter drop-shadow-2xl">{item.t}</p>
                <p className="text-[10px] font-bold text-white tracking-[0.2em] uppercase max-w-[200px] leading-tight italic">{item.d}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI TRINITY - VRÁCENÉ TEXTY A BAREVNÉ FOTKY */}
      <section className="relative py-24 md:py-40 px-4 z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-24 md:gap-16 items-start relative z-10">
          
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform hover:scale-105 duration-700">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20 transition-all hover:border-[#FF0000]/50 text-left">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl uppercase tracking-tighter text-white">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#FF0000] pl-3 italic">HLAVNÍ KOUČ</p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-[#FF0000] tracking-widest mb-3 uppercase italic">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/protein" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>RAW PROTEIN 80</span><span>→</span></Link>
                  <Link href="/shop/creatine" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>KREATIN MONOHYDRÁT</span><span>→</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] uppercase italic mt-10 hover:bg-white hover:text-black transition-all shadow-xl tracking-widest">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          {/* STŘED: SLUŽBY - VYCENTROVANÉ (smrk) */}
          <div className="w-full flex flex-col gap-12 order-1 lg:order-2 text-center relative z-20">
            <div className="relative bg-black/80 backdrop-blur-3xl p-10 border-2 border-white/10 shadow-2xl overflow-hidden text-center">
              <h3 className="text-3xl uppercase text-[#FF0000] mb-10 tracking-[0.4em] drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]">SLUŽBY F77</h3>
              <div className="space-y-3 relative z-10 px-2 flex flex-col items-center">
                {sluzby.map((s, i) => (
                  <motion.div key={i} whileTap={{ scale: 0.98 }} className="flex items-center justify-center gap-4 group border border-zinc-800 py-3 px-6 hover:border-[#FF0000] transition-colors bg-white/5 w-full">
                    <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{s.i}</span>
                    <p className="tracking-tighter text-[11px] md:text-sm text-zinc-300 group-hover:text-white transition-colors leading-none uppercase">{s.n}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col group relative text-left">
              <div className="relative mx-1 bg-black/60 backdrop-blur-3xl p-8 border border-white/10 shadow-2xl z-20">
                <div className="space-y-1 mb-10 relative z-10">
                  {[{ n: 'JEDNORÁZ', p: '160', l: '/shop/vstup' }, { n: 'MĚSÍČNÍ', p: '1490', l: '/shop/mesic' }, { n: 'ROČNÍ', p: '12990', l: '/shop/rok' }].map((item, idx) => (
                    <Link href={item.l} key={idx} onClick={() => triggerHaptic(10)} className="flex justify-between items-center py-6 border-b border-white/5 hover:bg-white/5 transition-all px-4 cursor-pointer group/row">
                      <h4 className="text-xl uppercase tracking-tighter text-white group-hover/row:text-[#FF0000] transition-colors">{item.n}</h4>
                      <span className="text-2xl text-[#FF0000] drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">{item.p} CZK</span>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" onClick={() => triggerHaptic(30)} className="block w-full text-center py-5 bg-white text-black text-[11px] uppercase italic hover:bg-[#FF0000] hover:text-white transition-all shadow-2xl relative z-10 tracking-widest">PŘEJÍT DO E-SHOPU</Link>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5 transition-transform hover:scale-105 duration-700">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-4 bg-black/90 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1.5 bg-[#FF0000] shadow-[0_0_20px_#FF0000]"></div>
              <h3 className="text-4xl uppercase tracking-tighter text-white">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-r-2 border-[#FF0000] pr-3 italic">PRO UNIT // KOUČ</p>
              <div className="mt-6 pt-6 border-t border-white/5 w-full">
                <p className="text-[9px] font-black text-[#FF0000] tracking-widest mb-3 uppercase italic text-right">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/nakopavac" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>PŘEDTRÉNINKOVKA</span><span>←</span></Link>
                  <Link href="/shop/aminokyseliny" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>AMINO FUEL MB</span><span>←</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-6 bg-[#FF0000] text-white text-[11px] uppercase italic mt-8 hover:bg-white hover:text-black transition-all shadow-xl tracking-widest">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE */}
      <section className="relative py-24 border-t-2 border-[#FF0000]/10 bg-black/40 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-16 relative z-10">
            <h2 className="text-4xl uppercase text-white tracking-tighter inline-block relative underline decoration-[#FF0000] decoration-4 underline-offset-8">GALERIE</h2>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-20 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <motion.div key={i} whileTap={{ scale: 0.95 }} className="relative min-w-[350px] md:min-w-[550px] aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer border-2 border-white/5 snap-center shadow-xl" onClick={() => { setSelectedImage(`/images/gym/gallery/${file}`); triggerHaptic(15); }}>
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* 5. PARTNEŘI */}
      <section className="py-20 border-t border-white/5 relative bg-black/80">
        <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
          <p className="text-zinc-800 font-black italic uppercase tracking-[0.8em] text-[10px] mb-12 italic">S NÁMI SPOLUPRACUJÍ</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-20 hover:opacity-100 transition-opacity">
            <div className="relative w-[160px] h-[50px]"><Image src="/images/partners/multi_sport.png" alt="MultiSport" fill className="object-contain grayscale" /></div>
            <div className="relative w-[160px] h-[40px]"><Image src="/images/partners/aktiva_pronet.png" alt="AktivaPronet" fill className="object-contain grayscale" /></div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/98 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-7xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain shadow-[0_0_100px_rgba(255,0,0,0.4)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

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

  const sluzbyShort = [
    "OSOBNÍ TRENÉR", "SILOVÝ TRÉNINK", "REDUKCE VÁHY", 
    "POÚRAZOVÉ STAVY", "STRAVOVACÍ PLÁNY", "PRODEJ DOPLŇKŮ"
  ];

  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white selection:bg-[#E10600] selection:text-white overflow-x-hidden relative scroll-smooth">
      
      {/* 1. HERO S INTEGROVANÝMI SLUŽBAMI (smrk) */}
      <section className="relative min-h-[70vh] md:min-h-[60vh] flex flex-col justify-center px-4 md:px-6 border-b border-zinc-100/10 bg-black z-20 py-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[15vw] md:text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,1)]">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mt-12 gap-12">
               <div className="flex flex-col gap-8 w-full lg:w-auto">
                 {/* SLUŽBY PŘÍMO V HERO (smrk) */}
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 border-l-2 border-[#E10600] pl-6 py-2 bg-white/5 backdrop-blur-sm p-6">
                    {sluzbyShort.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 group">
                        <div className="w-1 h-1 bg-[#E10600] group-hover:scale-[3] transition-transform"></div>
                        <span className="text-[10px] md:text-[11px] font-black italic uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{s}</span>
                      </div>
                    ))}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-8 border-l-4 border-white/10 pl-5 bg-black/40 p-5 relative">
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">PO - PÁ</p><p className="text-xl md:text-2xl font-black italic text-white tracking-tighter">06:00 - 21:00</p></div>
                    <div><p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">SO - NE</p><p className="text-xl md:text-2xl font-black italic text-white tracking-tighter">09:00 - 20:00</p></div>
                 </div>
               </div>

               <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
                  <h2 className="text-[10vw] md:text-[6vw] font-black uppercase italic leading-none tracking-tighter opacity-10"
                      style={{ WebkitTextStroke: '1px #E10600', color: 'transparent' }}>
                    HARDCORE_MB
                  </h2>
                  <Link href="/shop" onClick={() => triggerHaptic(20)} className="w-full lg:w-auto px-12 py-5 bg-white text-black font-black uppercase italic text-xs tracking-[0.2em] hover:bg-[#E10600] hover:text-white transition-all text-center">
                    VSTOUPIT DO E-SHOPU →
                  </Link>
               </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. STATS ROZCESTNÍK */}
      <section className="bg-black py-10 px-4 border-b border-zinc-100/10 z-20 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { t: "ČLENSTVÍ", d: "KOUPIT PERMICI", i: "/images/gym/gallery/gym_photo_1.jpg", l: "/shop/permanentky" },
            { t: "SUPLEMENTY", d: "CO SYPOU PROFI", i: "/images/gym/gallery/gym_photo_2.jpg", l: "/shop/suplementy" },
            { t: "MERCH", d: "OBLEČENÍ JEDNOTKY", i: "/images/gym/gallery/gym_photo_3.jpg", l: "/shop/merch" },
            { t: "BAZAR", d: "STROJE NA PRODEJ", i: "/images/gym/gallery/gym_photo_4.jpg", l: "/bazar" }
          ].map((item, idx) => (
            <Link href={item.l} key={idx} onClick={() => triggerHaptic(15)}>
              <div className="relative h-56 md:h-64 overflow-hidden group border border-white/10 cursor-pointer">
                <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-3xl font-black italic text-[#E10600] tracking-tighter">{item.t}</p>
                  <p className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">{item.d}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TRENÉŘI TRINITY */}
      <section className="relative py-20 md:py-32 px-4 z-10 bg-[#0A0A0A]">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-20 md:gap-16 items-start">
          <div className="w-full flex flex-col group relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter tracking-tighter">HAMÁČEK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-l-2 border-[#E10600] pl-3 italic">HLAVNÍ KOUČ</p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-[9px] font-black text-[#E10600] tracking-widest mb-3 uppercase italic">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/protein" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>RAW PROTEIN 80</span><span>→</span></Link>
                  <Link href="/shop/creatine" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between"><span>KREATIN MONOHYDRÁT</span><span>→</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-5 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>

          <div className="w-full flex flex-col gap-12 order-1 lg:order-2 text-center">
            <div className="relative bg-black/60 backdrop-blur-2xl p-10 border border-white/10 shadow-2xl">
              <h3 className="text-3xl font-black uppercase italic text-white mb-8 tracking-[0.3em]">FILOZOFIE</h3>
              <p className="text-2xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter">DŘEME PRO VÝSLEDKY, NE PRO FOTKY.</p>
              <p className="text-[11px] text-zinc-500 italic uppercase tracking-widest">220 M², 30 STROJŮ VITA A PROFI KARDIO ZÓNA.</p>
            </div>
            <div className="flex flex-col group relative lg:mt-12 text-left">
              <div className="bg-black/10 backdrop-blur-md h-24 flex items-center justify-center border-t-2 border-[#E10600]"><span className="text-4xl md:text-5xl font-black italic opacity-20 uppercase tracking-[0.3em]">CENÍK</span></div>
              <div className="relative -mt-10 mx-1 bg-black/60 backdrop-blur-3xl p-8 border border-white/10 shadow-2xl z-20">
                <div className="space-y-1 mb-10">
                  {[{ n: 'JEDNORÁZ', p: '160', l: '/shop/vstup' }, { n: 'MĚSÍČNÍ', p: '1490', l: '/shop/mesic' }, { n: 'ROČNÍ', p: '12990', l: '/shop/rok' }].map((item, idx) => (
                    <Link href={item.l} key={idx} onClick={() => triggerHaptic(10)} className="flex justify-between items-center py-6 border-b border-white/5 hover:bg-white/5 transition-all px-2">
                      <h4 className="font-black italic text-xl uppercase tracking-tighter">{item.n}</h4>
                      <span className="text-2xl font-black italic text-[#E10600] tracking-tighter">{item.p} CZK</span>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" onClick={() => triggerHaptic(30)} className="block w-full text-center py-5 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">PŘEJÍT DO E-SHOPU</Link>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col group relative order-3 text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-24 mx-2 md:mx-8 bg-black/60 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl z-20 flex flex-col items-end">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#E10600]"></div>
              <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter tracking-tighter">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase mt-2 border-r-2 border-[#E10600] pr-3 italic">PRO UNIT</p>
              <div className="mt-6 pt-6 border-t border-white/5 w-full">
                <p className="text-[9px] font-black text-[#E10600] tracking-widest mb-3 uppercase italic">DOPORUČENÉ SUPLE</p>
                <div className="flex flex-col gap-2">
                  <Link href="/shop/nakopavac" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>PŘEDTRÉNINKOVKA</span><span>←</span></Link>
                  <Link href="/shop/aminokyseliny" className="text-[11px] font-bold text-zinc-300 hover:text-white transition-colors uppercase italic tracking-tighter border-b border-white/5 pb-2 flex justify-between flex-row-reverse"><span>AMINO FUEL MB</span><span>←</span></Link>
                </div>
              </div>
              <Link href="/kontakt" onClick={() => triggerHaptic(25)} className="block w-full text-center py-4 bg-[#E10600] text-white text-xs font-black uppercase italic mt-8">REZERVOVAT TRÉNINK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNEŘI */}
      <section className="py-20 bg-black border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-zinc-600 font-black italic uppercase tracking-[0.5em] text-[10px] mb-12 italic">S NÁMI SPOLUPRACUJÍ</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 hover:opacity-100 transition-opacity">
            <div className="relative w-[180px] h-[50px] grayscale hover:grayscale-0 transition-all cursor-pointer"><Image src="/images/partners/multi_sport.png" alt="MultiSport" fill className="object-contain" /></div>
            <div className="relative w-[180px] h-[50px] grayscale hover:grayscale-0 transition-all cursor-pointer"><Image src="/images/partners/aktiva_pronet.png" alt="AktivaPronet" fill className="object-contain" /></div>
          </div>
        </div>
      </section>

      {/* 5. GALERIE */}
      <section className="py-20 bg-black relative z-10 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-12">
            <h2 className="text-4xl font-black uppercase italic text-white tracking-tighter underline decoration-[#E10600] decoration-4 underline-offset-8 uppercase">GALERIE</h2>
         </div>
         <div className="flex gap-3 overflow-x-auto pb-10 px-6 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {galleryFiles.map((file, i) => (
              <motion.div key={i} whileTap={{ scale: 0.95 }} className="relative min-w-[300px] md:min-w-[450px] aspect-[4/3] overflow-hidden bg-zinc-900 cursor-pointer border border-white/10 snap-center" onClick={() => { setSelectedImage(`/images/gym/gallery/${file}`); triggerHaptic(15); }}>
                <Image src={`/images/gym/gallery/${file}`} alt="VAULT" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </motion.div>
            ))}
         </div>
      </section>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => { setSelectedImage(null); triggerHaptic(10); }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full h-full max-w-6xl">
              <Image src={selectedImage} alt="ZOOM" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

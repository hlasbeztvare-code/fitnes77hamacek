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
    <main className="bg-[#050505] text-white overflow-x-hidden relative scroll-smooth min-h-screen font-black uppercase tracking-tighter">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-overlay bg-fixed bg-center bg-cover scale-110" 
           style={{ backgroundImage: "url('/images/textures/beton_hardcore.jpg')" }}></div>

      {/* HERO */}
      <section className="relative min-h-[40vh] flex flex-col justify-center px-6 border-b border-[#FF0000]/20 z-20 py-20">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[16vw] md:text-[10vw] leading-[0.7] text-white font-black uppercase">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h1>
            <div className="mt-8 border-l-[6px] border-[#FF0000] pl-6 bg-black/80 p-6 shadow-2xl inline-block border border-white/5">
              <p className="text-[9px] text-zinc-600 font-bold tracking-widest mb-1">PROVOZNÍ DOBA</p>
              <p className="text-xl md:text-2xl text-white font-black">PO–PÁ 06:00 – 21:00 / SO–NE 09:00 – 20:00</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CORE SECTION - TRENÉŘI A SLUŽBY (smrk) */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-16 items-start relative z-10">
          
          {/* HAMÁČEK */}
          <div className="w-full flex flex-col group font-black">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black/95 p-8 border-t-4 border-[#FF0000] shadow-2xl">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black">HAMÁČEK</h3>
              <p className="text-[10px] text-zinc-500 tracking-[0.4em] mb-4">HLAVNÍ KOUČ</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] tracking-[0.3em] mt-8 font-black">REZERVOVAT</Link>
            </div>
          </div>

          {/* STŘED: SLUŽBY A CENÍK (VRÁCENO DOPICII - smrk) */}
          <div className="w-full flex flex-col gap-8 order-first lg:order-none font-black text-center">
            <div className="relative bg-black/80 backdrop-blur-3xl p-8 border-2 border-white/10 shadow-2xl">
              <h3 className="text-2xl font-black text-[#FF0000] mb-8 tracking-[0.4em]">SLUŽBY F77</h3>
              <div className="grid grid-cols-1 gap-2">
                {sluzby.map((s, i) => (
                  <div key={i} className="flex items-center justify-center gap-4 border border-zinc-800 py-3 px-6 hover:border-[#FF0000] bg-white/5 transition-all group">
                    <span className="text-xl grayscale group-hover:grayscale-0">{s.i}</span>
                    <p className="text-[11px] text-zinc-300 group-hover:text-white tracking-tighter">{s.n}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/90 p-6 border-2 border-white/10 shadow-2xl relative">
              <div className="grid grid-cols-3 gap-2">
                {[{ n: 'JEDNORÁZ', p: '160' }, { n: 'MĚSÍČNÍ', p: '1490' }, { n: 'ROČNÍ', p: '12990' }].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center py-5 border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                    <h4 className="text-[8px] text-zinc-500 mb-1 tracking-widest">{item.n}</h4>
                    <span className="text-xl text-[#FF0000] leading-none tracking-tighter">{item.p} CZK</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div className="w-full flex flex-col group font-black text-right">
            <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl border border-white/5">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover object-top" />
            </div>
            <div className="relative -mt-20 mx-4 bg-black/95 p-8 border-t-4 border-[#FF0000] shadow-2xl flex flex-col items-end">
              <h3 className="text-5xl tracking-tighter leading-none mb-1 font-black">SOUSTRUŽNÍK</h3>
              <p className="text-[10px] text-zinc-500 tracking-[0.4em] mb-4">PRO UNIT</p>
              <Link href="/kontakt" className="block w-full text-center py-5 bg-[#FF0000] text-white text-[11px] tracking-[0.3em] mt-8 font-black">REZERVOVAT</Link>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="relative py-20 border-t-2 border-[#FF0000]/20 bg-black/40 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center relative z-10">
            <h2 className="text-6xl text-white tracking-tight border-b-4 border-[#FF0000] inline-block font-black">GALERIE_MB</h2>
         </div>
         <div className="flex gap-4 overflow-x-auto pb-16 px-6 no-scrollbar scroll-smooth relative z-10">
            {galleryFiles.map((file, i) => (
              <div key={i} className="relative min-w-[350px] md:min-w-[550px] aspect-[16/10] overflow-hidden bg-zinc-900 border-2 border-white/5 shadow-2xl group">
                <Image src={`/images/gym/gallery/${file}`} alt="F77" fill className="object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
              </div>
            ))}
         </div>
      </section>
    </main>
  );
}

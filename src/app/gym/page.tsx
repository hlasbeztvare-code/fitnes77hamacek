"use client";
import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import Reveal from "@/components/ui/Reveal";
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  // Simulujeme seznam fotek (v reálu bys je mohl načítat přes API nebo props)
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-[#E10600] selection:text-white overflow-x-hidden">
      
      {/* 1. HERO - ČISTÝ FIX BEZ PROSVÍTÁNÍ */}
      <section className="relative h-[45vh] flex flex-col justify-center px-6 border-b border-zinc-100 bg-[#F9F9F9]">
        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-black drop-shadow-sm">
              FITNESS<span className="text-[#E10600]">77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-6 gap-6">
               <div className="flex flex-col gap-4">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-400 italic">RAW_HERITAGE // MB</p>
                 {/* FIX OTEVÍRAČKY - Solidní podklad, žádný prosvítání */}
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-6 py-2 bg-white shadow-xl">
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">PO - PÁ</p>
                       <p className="text-2xl font-black italic">06:00 - 22:00</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">SO - NE</p>
                       <p className="text-2xl font-black italic">08:00 - 20:00</p>
                    </div>
                 </div>
               </div>
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter text-zinc-100 drop-shadow-md"
                   style={{ WebkitTextStroke: '1px #000' }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. THE CORE TRINITY (Hamáček, Soustružník, Permice) - S hloubkou */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* TRENÉR 01: HAMÁČEK - SKLO A HLOUBKA */}
          <div className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative -mt-20 mx-6 bg-black/80 backdrop-blur-xl p-6 text-white border border-white/10 shadow-2xl transition-transform group-hover:-translate-y-2">
              <h3 className="text-3xl font-black uppercase italic italic">Hamáček</h3>
              <p className="text-[10px] font-bold text-[#E10600] tracking-widest mb-4">HEAD_COACH // UNIT_01</p>
              <Link href="/kontakt" className="block w-full text-center py-3 bg-[#E10600] text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>

          {/* PERMANENTKY - STEJNÝ STYLE JAKO TRENÉŘI */}
          <div className="group relative lg:mt-12">
            <div className="bg-zinc-100 h-32 flex items-center justify-center border-t-4 border-[#E10600]">
               <span className="text-4xl font-black italic opacity-10 uppercase">Membership</span>
            </div>
            <div className="relative -mt-10 mx-2 bg-black/80 backdrop-blur-xl p-8 text-white border border-white/10 shadow-2xl transition-transform group-hover:-translate-y-2">
              <h3 className="text-3xl font-black uppercase italic mb-6">Permanentky</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-white/10 pb-2"><span>Jednoráz</span><span className="font-black">180 CZK</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>Měsíční</span><span className="font-black">1290 CZK</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span>Roční</span><span className="font-black">10900 CZK</span></div>
              </div>
              <Link href="/shop" className="block w-full text-center py-4 bg-white text-black text-xs font-black uppercase italic hover:bg-[#E10600] hover:text-white transition-all">KOUPIT ONLINE</Link>
            </div>
          </div>

          {/* TRENÉR 02: SOUSTRUŽNÍK */}
          <div className="group relative text-right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative -mt-20 mx-6 bg-black/80 backdrop-blur-xl p-6 text-white border border-white/10 shadow-2xl transition-transform group-hover:-translate-y-2">
              <h3 className="text-3xl font-black uppercase italic italic">Soustružník</h3>
              <p className="text-[10px] font-bold text-[#E10600] tracking-widest mb-4">ELITE_COACH // UNIT_02</p>
              <Link href="/kontakt" className="block w-full text-center py-3 bg-[#E10600] text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all">REZERVOVAT</Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. GALERIE - FUNKČNÍ NA KLIK */}
      <section className="py-20 px-4 bg-zinc-50 border-t border-zinc-100">
        <h2 className="text-center text-[10px] font-black uppercase tracking-[0.8em] text-zinc-400 mb-12">F77_VAULT</h2>
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {galleryFiles.map((file, i) => (
            <div 
              key={i} 
              className="relative aspect-square cursor-pointer overflow-hidden group shadow-lg"
              onClick={() => setSelectedImage(`/images/gym/gallery/${file}`)}
            >
              <img src={`/images/gym/gallery/${file}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* MODÁLNÍ OKNO PRO ZVĚTŠENÍ FOTKY */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image src={selectedImage} alt="F77 Zoom" fill className="object-contain shadow-2xl shadow-[#E10600]/20" />
            <button className="absolute -top-10 right-0 text-white font-black uppercase tracking-widest text-sm hover:text-[#E10600]">ZAVŘÍT [X]</button>
          </div>
        </div>
      )}

    </main>
  );
}

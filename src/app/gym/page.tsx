"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function GymPage() {
  const galleryFiles = Array.from({ length: 40 }, (_, i) => `gym_photo_${i}.jpg`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Marquee text pro jezdící proužek
  const marqueeText = " // HARDCORE MB // RAW_HERITAGE // UNIT_01 // UNIT_02 // NO_BULLSHIT // GYM // TRÉNUJ_NEBO_ZEMŘI // ";

  return (
    <main className="min-h-screen selection:bg-[#E10600] selection:text-white overflow-x-hidden scroll-smooth relative bg-[#FFFFFF]">
      
      {/* GLOBAL BOKY GLOW: Agresivní červená záře a odlesky na bocích */}
      <div className="absolute inset-y-0 left-0 w-32 z-0 bg-gradient-to-r from-[#E10600] via-[#E10600]/50 to-transparent opacity-70 backdrop-blur-3xl pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 z-0 bg-gradient-to-l from-[#E10600] via-[#E10600]/50 to-transparent opacity-70 backdrop-blur-3xl pointer-events-none"></div>

      {/* 1. HERO - Nude White + Masivní 3D Typo s opraveným HARDCORE a Orošením fotky */}
      <section className="relative h-[45vh] flex flex-col justify-center px-6 border-b border-black/10 bg-[#FFFFFF] z-20">
        
        {/* SOVEREIGN HERO REVEAL: Orošená fotka na pozadí, která se plynule mění */}
        <motion.div
           initial={{ opacity: 0.8, filter: "blur(10px) drop-shadow(0px 0px 50px rgba(225,6,0,0.3))" }}
           animate={{ opacity: 1, filter: "blur(0px) drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="absolute inset-0 z-0 bg-cover bg-center"
           style={{ backgroundImage: "url('/images/hero_revealed.jpg')" }}
        >
        </motion.div>

        <Reveal y={20}>
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            {/* 3D Typo s vrstveným text-shadow pro hloubku */}
            <h1 className="text-[10vw] font-black uppercase italic leading-[0.75] tracking-tighter text-black"
                style={{ textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' }}>
              FITNESS<span className="text-[#E10600]" style={{ textShadow: '0 4px 10px rgba(225,6,0,0.5)' }}>77</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-between md:items-end mt-4 gap-6">
               <div className="flex flex-col gap-6 relative z-20">
                 <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-500 italic">RAW_HERITAGE // MB</p>
                 
                 {/* OTEVÍRACÍ HODINY - s hloubkou */}
                 <div className="flex gap-8 border-l-4 border-[#E10600] pl-5 shadow-[0_0_30px_rgba(225,6,0,0.2)]">
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

               {/* Pevný černý nápis s tlustým obrysem pro maximální Hardcore vibe */}
               <h2 className="text-[8vw] font-black uppercase italic leading-[0.75] tracking-tighter relative z-10"
                   style={{ 
                     WebkitTextStroke: '2px black', 
                     color: 'black', 
                     textShadow: '0 4px 4px rgba(0,0,0,0.8), 0 8px 10px rgba(0,0,0,0.6)' 
                   }}>
                 HARDCORE
               </h2>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. SOVEREIGN MARQUEE (Jezdící proužek) - MEZI HERO A TRENÉRY */}
      <section className="bg-black py-4 border-b-4 border-[#E10600] z-20 relative">
        <div className="overflow-hidden flex whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-12 text-[#E10600] font-black uppercase italic text-2xl tracking-widest"
              animate={{ x: i === 0 ? [0, -100 + "%"] : [0, -100 + "%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {[...Array(10)].map((_, j) => marqueeText)}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. THE CORE (Trinity): Vrstvení a Glassmorphism na Nude White podkladu */}
      <section className="relative py-28 px-4 bg-[#FFFFFF] z-10">
        {/* Jemný pozadní přechod pro hloubku celé sekce */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] to-[#FDFDFD] z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          
          {/* TRENÉŘI V SOVEREIGN STYLE ZATMAVENÝM SKLEM */}
          <div className="flex flex-col relative z-10 col-span-1 lg:col-span-2">
            <h3 className="text-center text-5xl font-black uppercase tracking-widest text-black italic mb-10 border-b-2 border-[#E10600] pb-4 relative">VELITELÉ JEDNOTKY</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* HAMÁČEK - Vrstvení, Sklo, Hloubka */}
               <motion.div 
                 whileHover={{ y: -10, scale: 1.03, shadow: "0px 40px 80px rgba(225,6,0,0.2)" }}
                 className="flex flex-col group relative transition-all duration-500"
               >
                 <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-sm">
                   <Image src="/images/trainers/old_web_1.jpg" alt="Hamáček" fill className="object-cover object-top hover:scale-105 transition-transform duration-1000" priority />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                 </div>
                 
                 {/* ZATMAVENÉ SKLO Box */}
                 <div className="relative -mt-28 mx-4 lg:mx-8 bg-black/40 backdrop-blur-xl p-7 border border-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)] z-20 group-hover:border-[#E10600]/50 relative">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                   <div className="flex justify-between items-end mb-2">
                     <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-white">Hamáček</h3>
                     <span className="text-[#E10600] font-black italic text-2xl opacity-50">01</span>
                   </div>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-5 italic border-l-2 border-[#E10600] pl-3"> Zakladatel // Head Coach</p>
                   
                   {/* Popis k trenérovi */}
                   <p className="text-sm text-zinc-300 mb-6 leading-relaxed">Hlavní mozek F77. Specialista na silový trénink a naturální kulturistiku. Tady končí sranda a začíná dřina, která přináší výsledky.</p>
                   
                   {/* STACK sekce */}
                   <div className="bg-white/10 border border-white/5 p-4 mb-7 space-y-2 w-full flex flex-col items-end">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-2 w-full text-right">Unit_01_Stack</p>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">Vitamín Complex</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">Joint Support "Elite"</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">ZMA Sovereign</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                   </div>

                   <div className="flex flex-col gap-2 w-full">
                     <Link href="/kontakt" className="w-full text-center py-3.5 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-none">REZERVOVAT TRÉNINK</Link>
                   </div>
                 </div>
               </motion.div>

               {/* SOUSTRUŽNÍK */}
               <motion.div 
                 whileHover={{ y: -10, scale: 1.03, shadow: "0px 40px 80px rgba(225,6,0,0.2)" }}
                 className="flex flex-col group relative transition-all duration-500 text-right flex-col-reverse"
               >
                 {/* ZATMAVENÉ SKLO Box */}
                 <div className="relative mt-10 mx-4 lg:mx-8 bg-black/40 backdrop-blur-xl p-7 border border-white/10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)] z-20 group-hover:border-[#E10600]/50 flex flex-col items-end relative">
                   <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#E10600] to-transparent shadow-[0_0_15px_rgba(225,6,0,0.8)]"></div>
                   <div className="flex justify-between items-end mb-2 w-full flex-row-reverse">
                     <h3 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-white">Soustružník</h3>
                     <span className="text-[#E10600] font-black italic text-2xl opacity-50">02</span>
                   </div>
                   <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-5 italic border-r-2 border-[#E10600] pr-3">Elitní Kouč // Pro Unit</p>
                   
                   {/* Popis k trenérovi */}
                   <p className="text-sm text-zinc-300 mb-6 leading-relaxed text-right">Elitní trenér a aktivní závodník. Nekompromisní technika, dynamika a posouvání lidských limitů v každém tréninku.</p>
                   
                   {/* STACK sekce */}
                   <div className="bg-white/10 border border-white/5 p-4 mb-7 space-y-2 w-full flex flex-col items-end">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-2 w-full text-right">Pro_Unit_Stack</p>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">Protein Isolát Raw</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">Creatine Creapure</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                      <div className="flex items-center gap-3"><p className="text-xs text-zinc-200">Pre-Workout "Hardcore"</p><span className="h-1.5 w-1.5 bg-[#E10600] rounded-full"></span></div>
                   </div>

                   <div className="flex flex-col gap-2 w-full">
                     <Link href="/kontakt" className="w-full text-center py-3.5 bg-[#E10600] text-white text-xs font-black uppercase italic hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-none">REZERVOVAT TRÉNINK</Link>
                   </div>
                 </div>

                 <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-sm">
                   <Image src="/images/trainers/old_web_2.jpg" alt="Soustružník" fill className="object-cover object-top hover:scale-105 transition-transform duration-1000" priority />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                 </div>
               </motion.div>
            </div>
          </div>

          {/* PERMANENTKY - Čisté Bílé boxes se stíny na Nude White */}
          <div className="flex flex-col justify-center bg-[#FFFFFF] text-black p-10 lg:p-12 shadow-[0_40px_100px_rgba(225,6,0,0.2)] relative z-30 transform lg:translate-y-24 border-t-8 border-[#E10600] border-l border-r border-b border-white/5 transition-transform hover:scale-[1.02] duration-500 col-span-1">
            <h2 className="text-center text-4xl font-black uppercase tracking-widest text-black italic mb-3">ČLENSTVÍ</h2>
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.4em] text-[#E10600] mb-10">Hardcore_Access_Protocol</p>
            
            <div className="space-y-0">
              {[
                { name: 'WARRIOR_30', czech: 'Měsíční Členství', price: '1290' },
                { name: 'ELITE_365', czech: 'Roční Členství', price: '10900' }
              ].map((p, i) => (
                <div key={i} className="py-7 border-b border-black/10 flex justify-between items-center hover:bg-black/5 transition-all duration-300 cursor-pointer px-5 group">
                  <div>
                     <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter group-hover:scale-105 group-hover:text-[#E10600] transition-all">{p.name}</h4>
                     <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{p.czech}</p>
                  </div>
                  <span className="text-3xl font-black italic text-black mt-1 group-hover:text-[#E10600]">{p.price} CZK</span>
                </div>
              ))}
            </div>
            
            <Link href="/shop" className="mt-10 block w-full text-center py-4.5 bg-black text-white text-sm font-black uppercase italic hover:bg-[#E10600] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]">KOUPIT ČLENSTVÍ ONLINE →</Link>
          </div>

        </div>
      </section>

      {/* 4. POD TÍM: GALERIE - Všechny fotky venku! 10-sloupcová mřížka */}
      <section className="py-16 px-4 bg-[#FFFFFF] border-t border-white/5 relative z-10 mt-24">
         <h2 className="text-center text-[11px] font-black uppercase tracking-[0.8em] text-zinc-600 italic mb-10">F77_VAULT_ARCHIVE</h2>
         {/* Masivní mřížka pro všechny fotky, žádné skrývání */}
        <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {galleryFiles.map((file, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group shadow-[0_15px_35px_-5px_rgba(0,0,0,0.7)] border border-white/5 hover:border-white/10 transition-all duration-500 hover:scale-[1.07] hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
              <img src={`/images/gym/gallery/${file}`} alt="F77 Vault" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

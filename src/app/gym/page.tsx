"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from "framer-motion";

export default function GymPage() {
  const [galleryFiles, setGalleryFiles] = useState<string[]>([]);

  useEffect(() => {
    const files = Array.from({ length: 40 }, (_, i) => "gym_photo_" + (i + 1) + ".jpg");
    setGalleryFiles(files);
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 120]);
  const yText = useTransform(scrollY, [0, 800], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.6]);

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
    <main className="bg-black text-white overflow-x-hidden min-h-screen font-black uppercase tracking-tighter">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-black">

        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-80">
          <Image 
            src="/images/hero/hero_beton_fitness77.png"
            alt="BETON_F77"
            fill
            className="object-cover object-center scale-[1.05]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_90%)]"></div>
        </motion.div>

        <div className="absolute inset-0 z-10 opacity-[0.08] mix-blend-overlay pointer-events-none 
          bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <motion.div style={{ y: yText, opacity }} className="absolute inset-0 z-20 pointer-events-none">
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-[18%] left-1/2 -translate-x-1/2 text-[15vw] md:text-[11.5vw] leading-none text-white tracking-[-0.05em] whitespace-nowrap mix-blend-overlay"
          >
            FITNESS
            <span className="text-[#FF0000] drop-shadow-[0_0_25px_rgba(255,0,0,0.7)]">
              77
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-[33%] left-1/2 -translate-x-1/2 text-[10px] md:text-[11px] tracking-[0.5em] text-white/70 text-center whitespace-nowrap"
          >
            JIRÁSKOVA 1320 // MB NATIVE // NO LIMITS
            <br />
            MLADÁ BOLESLAV
          </motion.div>

        </motion.div>

      </section>

      {/* STATS */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { t: "220 M²", d: "ROZLOHA FITKA", i: "/images/gym/gallery/gym_photo_1.jpg" },
            { t: "30 STROJŮ", d: "ČESKÁ ZNAČKA VITA", i: "/images/gym/gallery/gym_photo_2.jpg" },
            { t: "NEJVĚTŠÍ", d: "V MLADÉ BOLESLAVI", i: "/images/gym/gallery/gym_photo_3.jpg" },
            { t: "TOP SLUŽBY", d: "NEKOMPROMISNÍ PŘÍSTUP", i: "/images/gym/gallery/gym_photo_4.jpg" }
          ].map((item, idx) => (
            <div key={idx} className="relative h-64 overflow-hidden border border-white/10 group bg-zinc-900">
              <Image src={item.i} alt={item.t} fill className="object-cover grayscale opacity-20 group-hover:opacity-60 transition-all duration-700" />
              <div className="absolute bottom-6 left-6">
                <p className="text-4xl text-[#FF0000]">{item.t}</p>
                <p className="text-[11px] text-white tracking-widest mt-2">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLUŽBY */}
      <section className="py-20 px-6 bg-zinc-950 text-center">
        <h2 className="text-3xl text-[#FF0000] mb-10 tracking-[0.4em]">SLUŽBY</h2>
        <div className="grid gap-4 max-w-2xl mx-auto">
          {sluzby.map((s, i) => (
            <div key={i} className="flex justify-center gap-4 border border-zinc-800 py-3 hover:border-[#FF0000] transition">
              <span>{s.i}</span>
              <span>{s.n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIE */}
      <section className="py-20 bg-black">
        <div className="flex gap-6 overflow-x-auto px-6">
          {galleryFiles.map((file, i) => (
            <div key={i} className="min-w-[300px] h-[200px] relative">
              <Image src={`/images/gym/gallery/${file}`} alt="F77" fill className="object-cover opacity-40 hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

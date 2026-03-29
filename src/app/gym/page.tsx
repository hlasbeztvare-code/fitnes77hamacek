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

        {/* BG PARALLAX */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-80">
          <Image 
            src="/images/hero/hero_beton_fitness77.png"
            alt="BETON_F77"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40"></div>
        </motion.div>

        {/* TEXT — FIXED NA OBRAZ */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <h1 className="
            absolute
            top-[17%]
            left-1/2
            -translate-x-1/2
            text-[14.5vw] md:text-[11vw]
            tracking-[-0.05em]
            whitespace-nowrap
            mix-blend-overlay
          ">
            FITNESS<span className="text-[#FF0000] drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">77</span>
          </h1>

          <div className="
            absolute
            top-[32%]
            left-1/2
            -translate-x-1/2
            text-[10px]
            tracking-[0.5em]
            text-white/70
            text-center
          ">
            JIRÁSKOVA 1320 // MB NATIVE // NO LIMITS
            <br />
            MLADÁ BOLESLAV
          </div>
        </div>

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

      {/* TRENÉŘI + SLUŽBY + CENÍK */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-[1700px] mx-auto grid lg:grid-cols-3 gap-16">

          {/* HAMÁČEK */}
          <div>
            <div className="relative aspect-[4/5]">
              <Image src="/images/trainers/old_web_1.jpg" alt="HAMÁČEK" fill className="object-cover grayscale hover:grayscale-0" />
            </div>
            <div className="-mt-16 bg-black p-6 border-t-4 border-[#FF0000]">
              <h3 className="text-4xl">HAMÁČEK</h3>
              <p className="text-xs text-zinc-500 mt-2">HLAVNÍ KOUČ</p>
            </div>
          </div>

          {/* SLUŽBY + CENÍK */}
          <div className="text-center space-y-10">
            <div>
              <h3 className="text-xl text-[#FF0000] mb-6">SLUŽBY</h3>
              {sluzby.map((s, i) => (
                <div key={i} className="py-2 border-b border-zinc-800">{s.n}</div>
              ))}
            </div>

            <div>
              <h3 className="text-xs text-zinc-500 mb-4">CENÍK</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>160</div>
                <div>1490</div>
                <div>12990</div>
              </div>
            </div>
          </div>

          {/* SOUSTRUŽNÍK */}
          <div>
            <div className="relative aspect-[4/5]">
              <Image src="/images/trainers/old_web_2.jpg" alt="SOUSTRUŽNÍK" fill className="object-cover grayscale hover:grayscale-0" />
            </div>
            <div className="-mt-16 bg-black p-6 border-t-4 border-[#FF0000]">
              <h3 className="text-4xl">SOUSTRUŽNÍK</h3>
              <p className="text-xs text-zinc-500 mt-2">PRO UNIT</p>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

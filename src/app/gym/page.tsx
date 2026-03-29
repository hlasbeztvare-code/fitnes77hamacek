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

  return (
    <main className="bg-black text-white overflow-x-hidden min-h-screen font-black uppercase tracking-tighter">

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

    </main>
  );
}

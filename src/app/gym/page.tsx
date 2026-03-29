"use client";

import Trainers from "@/components/Trainers";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";

export default function GymPage() {

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 120]);

  const sluzby = [
    "OSOBNÍ TRENÉR",
    "POSILOVÁNÍ SVALŮ",
    "POÚRAZOVÉ CVIČENÍ",
    "REDUKCE HMOTNOSTI",
    "SILOVÝ TRÉNINK",
    "ZLEPŠENÍ KONDICE",
    "OBČERSTVENÍ",
    "CVIČEBNÍ PLÁNY",
    "PRODEJ DOPLŇKŮ"
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
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40"></div>
        </motion.div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <h1 className="absolute top-[17%] left-1/2 -translate-x-1/2 text-[14.5vw] md:text-[11vw] tracking-[-0.05em] whitespace-nowrap mix-blend-overlay">
            FITNESS<span className="text-[#FF0000] drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]">77</span>
          </h1>

          <div className="absolute top-[32%] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/70 text-center">
            JIRÁSKOVA 1320 // MB NATIVE // NO LIMITS
            <br />
            MLADÁ BOLESLAV
          </div>
        </div>
      </section>

      {/* CHAOS SLUŽBY */}
      <section className="relative h-[900px] md:h-[1100px] overflow-hidden bg-black">
        {sluzby.map((s, i) => {

          const offset = (i % 2 === 0 ? -1 : 1) * (80 + i * 20);
          const top = 100 + i * 90;

          return (
            <motion.div
              key={i}
              initial={{ x: offset * 2, opacity: 0 }}
              whileInView={{ x: offset, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top }}
            >
              <div className="
                text-white
                text-xl md:text-3xl
                tracking-widest
                border border-white/10
                px-6 py-3
                bg-black/60
                backdrop-blur-sm
                hover:scale-110
                hover:border-[#FF0000]
                transition
              ">
                {s}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* TRENÉŘI */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-[1700px] mx-auto">
          <Trainers />
        </div>
      </section>

    </main>
  );
}

"use client";

import Trainers from "@/components/Trainers";
import Image from "next/image";
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
            alt="hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50"></div>
        </motion.div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <h1 className="absolute top-[18%] left-1/2 -translate-x-1/2 text-[15vw] md:text-[11vw] tracking-[-0.05em] mix-blend-overlay">
            FITNESS<span className="text-[#FF0000] drop-shadow-[0_0_25px_rgba(255,0,0,0.7)]">77</span>
          </h1>

          <div className="absolute top-[34%] left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/60 text-center">
            JIRÁSKOVA 1320 // MB NATIVE // NO LIMITS
            <br />
            MLADÁ BOLESLAV
          </div>
        </div>
      </section>

      {/* CHAOS TYPO */}
      <section className="relative h-[1400px] bg-black overflow-hidden flex items-center justify-center">

        {sluzby.map((s, i) => {

          const x = (i % 2 === 0 ? -1 : 1) * (200 + i * 50);
          const y = (i - sluzby.length / 2) * 140;
          const scale = 1 + (i % 3) * 0.4;
          const opacity = 0.12 + (i * 0.08);

          return (
            <motion.div
              key={i}
              initial={{ x: x * 2, opacity: 0 }}
              whileInView={{ x, opacity }}
              transition={{ duration: 1, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ y }}
            >
              <div
                className="whitespace-nowrap select-none"
                style={{
                  fontSize: `${5 + i * 0.6}vw`,
                  opacity,
                  transform: \`scale(\${scale})\`,
                }}
              >
                {s}
              </div>
            </motion.div>
          );
        })}

        {/* subtle grain */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

      </section>

      {/* TRENÉŘI */}
      <section className="py-32 px-4 bg-black">
        <div className="max-w-[1700px] mx-auto">
          <Trainers />
        </div>
      </section>

    </main>
  );
}

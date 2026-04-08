'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Dumbbell, Package, Trophy } from 'lucide-react'; // Přidána Trophy pro GYM
import React from 'react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden pt-20">
      {/* Background lebka/oheň - optimalizovaný pro mobile */}
      <div className="absolute inset-0 z-0 opacity-60">
        {/* Tady máš ten svůj obrázek s lebkou */}
        <img 
          src="/path-to-your-skull-bg.jpg" 
          className="w-full h-full object-cover object-center"
          alt="Fitness 77 Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* 1. Horní staty - na mobilu pod sebou, na desktopu v řadě (fialová čmáranice) */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-8 uppercase tracking-widest text-sm font-bold">
          <div className="flex flex-col">
            <span className="text-red-600 text-2xl">5000+</span>
            <span className="text-white/70">Zákazníků</span>
          </div>
          <div className="flex flex-col">
            <span className="text-red-600 text-2xl">150+</span>
            <span className="text-white/70">Produktů</span>
          </div>
          <div className="flex flex-col">
            <span className="text-red-600 text-2xl">4.9/5</span>
            <span className="text-white/70">Recenzí</span>
          </div>
        </div>

        {/* 2. Hlavní nadpis - ošetřený pro přetečení (bílá čmáranice) */}
        <div className="mb-12">
          <span className="bg-red-600 text-white px-3 py-1 text-xs font-black uppercase mb-4 inline-block">
            #1 Suplementy v ČR
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none uppercase">
            FITNESS 77<br />
            <span className="text-red-600">E-SHOP</span>
          </h1>
          {/* Performance text - na mobilu menší a s efektem, ať nezavazí */}
          <p className="text-3xl md:text-6xl font-black text-transparent stroke-white/20 uppercase mt-[-10px] md:mt-[-20px]" 
             style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            PERFORMANCE
          </p>
        </div>

        {/* 3. Grid buttonů - na mobilu jeden sloupec, na desktopu dva (ta spodní mřížka) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
          {['GYM', 'SUPLEMENTY', 'VYBAVENÍ', 'BAZAR'].map((item) => (
            <button 
              key={item}
              className="group relative bg-white/5 border border-white/10 hover:border-red-600 transition-all duration-300 py-6 px-4 text-xl font-bold text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors" />
              {item}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

const trustItems = [
  'Doprava zdarma',
  'Mladá Boleslav',
  'Skladem',
];

// Data pro ty čtyři ORANŽOVÉ dlaždice - TEĎ I S GYMEM!
const categoryActions = [
  { href: '/gym', label: 'GYM', icon: Trophy }, // Tady je ten tvůj GYM!
  { href: '/supplements', label: 'SUPLEMENTY', icon: Zap },
  { href: '/equipment', label: 'VYBAVENÍ', icon: Dumbbell },
  { href: '/bazar', label: 'BAZAR', icon: Package },
];

export default function HeroScene() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden bg-[#f5f5f6]">
      {/* aggressive background structure */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_52%,rgba(225,6,0,0.05)_52%,rgba(225,6,0,0.05)_58%,transparent_58%,transparent_100%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* red motion fields */}
      <motion.div
        className="absolute right-[8%] top-[10%] h-[380px] w-[380px] rounded-full bg-red-500/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid min-h-[94vh] w-[min(1320px,calc(100%-32px))] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#E10600]/20 bg-white/75 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#E10600]" />
            <span className="text-xs font-black uppercase tracking-[0.28em] text-[#E10600]">
              American muscle standard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="mt-8 max-w-5xl text-5xl font-black uppercase leading-[0.88] text-zinc-950 md:text-7xl xl:text-[98px]"
          >
            Agrese.
            <br />
            výkon.
            <br />
            výsledky.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl"
          >
            Fitness 77 je performance brand z Mladé Boleslavi. Suplementy, vybavení, trenéři a obsah postavené tak, aby návštěvník okamžitě cítil sílu značky.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="mt-10 flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:gap-3 max-w-2xl" 
          >
            {categoryActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href} className="group w-full">
                  <div className="flex h-[50px] flex-row items-center justify-center gap-2.5 rounded-lg bg-white px-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0f0f0] hover:shadow-lg active:scale-[0.98] border-none">
                    <Icon className="h-5 w-5 text-black transition-transform duration-300 group-hover:scale-110 shrink-0" />
                    <span className="text-base font-extrabold uppercase tracking-wider text-black not-italic leading-none whitespace-nowrap">
                      {action.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } }
            }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {trustItems.map((item) => (
              <motion.div
                key={item}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-900 shadow-sm"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT - Logo a vizuál */}
        <div className="relative flex min-h-[660px] items-center justify-center">
          <motion.div
            className="absolute h-[660px] w-[660px] rounded-full bg-[radial-gradient(circle,rgba(225,6,0,0.20),transparent_62%)] blur-[70px]"
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.92 }}
            animate={{ opacity: 1, rotate: -8, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute h-[82%] w-[68%] rounded-[38px] border border-zinc-200 bg-white/70 shadow-2xl backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.86, rotate: -4, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
            className="relative z-10"
          >
            <motion.img
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              className="max-h-[760px] w-auto object-contain drop-shadow-[0_30px_70px_rgba(225,6,0,0.20)]"
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
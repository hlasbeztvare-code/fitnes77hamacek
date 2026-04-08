'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function WowHero() {
  return (
    <section className="relative min-h-[90vh] md:h-[95vh] w-full flex flex-col overflow-hidden bg-[#050505]" aria-label="Hlavní banner">
      {/* Celoplošné video v pozadí - nezvětšujeme, jen ladíme viditelnost */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-70" // Snížená opacita pro lepší kontrast
        />
        {/* Průhledný střed pro video, ztmavení jen u okrajů pro čitelnost textu */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.8)_90%)] pointer-events-none" />
      </div>

      {/* TOP: STATS BAR - decentní, aby nezavazel */}
      <div className="relative z-20 w-full pt-24">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex justify-around items-center bg-black/10 backdrop-blur-[2px] border-y border-white/5">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.8 }} className="flex gap-2 items-center">
            <span className="text-lg font-black text-[#E10600]">5000+</span>
            <span className="text-[9px] uppercase tracking-widest text-white/50">Zákazníků</span>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.9 }} className="flex gap-2 items-center border-x border-white/10 px-6">
            <span className="text-lg font-black text-[#E10600]">150+</span>
            <span className="text-[9px] uppercase tracking-widest text-white/50">Produktů</span>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 1.0 }} className="flex gap-2 items-center">
            <span className="text-lg font-black text-[#E10600]">4.9/5</span>
            <span className="text-[9px] uppercase tracking-widest text-white/50">Recenzí</span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex-1 flex flex-col justify-between py-12">
        {/* NÁPISY - Kompaktní, aby video dejchalo */}
        <div className="mt-4">
          <motion.div variants={slideLeft} initial="hidden" animate="show" className="hero-bdg mb-3 inline-block scale-75 origin-left">
            <span>🏆 #1 SUPLEMENTY V ČR</span>
          </motion.div>

          <div className="flex flex-col -space-y-2 md:-space-y-4">
            <motion.span
              variants={slideLeft}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white opacity-90"
            >
              FITNESS 77
            </motion.span>
            
            <motion.span
              variants={slideRight}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest text-[#E10600]"
            >
              E-SHOP
            </motion.span>
            
            <motion.span
              variants={slideLeft}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
            >
              PERFORMANCE
            </motion.span>
          </div>
        </div>

        {/* TLAČÍTKA - Dole, aby nezakrývala produkt ve videu */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 w-full max-w-2xl"
        >
          <Link href="/supplements" className="flex h-12 items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#E10600] transition-all rounded-lg group">
            <span className="text-[11px] font-black uppercase tracking-widest text-white">Suplementy</span>
          </Link>
          <Link href="/equipment" className="flex h-12 items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#E10600] transition-all rounded-lg group">
            <span className="text-[11px] font-black uppercase tracking-widest text-white">Vybavení</span>
          </Link>
          <Link href="/bazaar" className="flex h-12 items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#E10600] transition-all rounded-lg group">
            <span className="text-[11px] font-black uppercase tracking-widest text-white">Bazar</span>
          </Link>
          <Link href="/gym" className="flex h-12 items-center justify-center bg-[#d4ff00]/10 border border-[#d4ff00]/20 hover:bg-[#d4ff00] transition-all rounded-lg group">
            <span className="text-[11px] font-black uppercase tracking-widest text-white group-hover:text-black">Gym</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
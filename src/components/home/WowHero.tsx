'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function WowHero() {
  return (
    <section className="relative min-h-[90vh] md:h-[95vh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-12" aria-label="Hlavní banner">
      {/* Celoplošné video v pozadí */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Ztmavení nahoře a dole, aby byl text a tlačítka vždy čitelné */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* TOP: Text a Nadpisy */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-4 md:mt-8">
        <div className="max-w-2xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5 }}
            className="hero-bdg mb-6 inline-block"
          >
            <span>🏆 #1 SUPLEMENTY V ČESKÉ REPUBLICE</span>
          </motion.div>

          <div className="hero-title">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.12 }}
              className="hero-title-main block"
            >
            FITNESS 77
            </motion.span>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.24 }}
              className="hero-title-sub block text-[#E10600]"
            >
            E-SHOP
            </motion.span>
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.36 }}
              className="hero-title-outline block"
            >
            PERFORMANCE
            </motion.span>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.48 }}
            className="mt-6 text-lg md:text-xl text-white/90 font-medium max-w-xl font-space drop-shadow-md"
          >
          Vybavení a suplementy pro skutečný progress. Vše, co potřebuješ pro překonání vlastních limitů.
          </motion.p>
        </div>
      </div>

      {/* MIDDLE: Prostor pro produkt ve videu (prázdné místo, aby tlačítka a text nepřekážely) */}
      <div className="flex-1 relative z-0 pointer-events-none"></div>

      {/* BOTTOM: 4 Tlačítka */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 w-full"
        >
          <Link href="/supplements" className="flex h-14 md:h-16 flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#E10600] hover:border-[#E10600] hover:scale-[1.02] active:scale-95 rounded-xl group">
            <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">⚡</span>
            <span className="text-sm md:text-lg font-black uppercase tracking-widest text-white whitespace-nowrap">Suplementy</span>
          </Link>
          
          <Link href="/equipment" className="flex h-14 md:h-16 flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#E10600] hover:border-[#E10600] hover:scale-[1.02] active:scale-95 rounded-xl group">
            <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">🏋️</span>
            <span className="text-sm md:text-lg font-black uppercase tracking-widest text-white whitespace-nowrap">Vybavení</span>
          </Link>
          
          <Link href="/bazaar" className="flex h-14 md:h-16 flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#E10600] hover:border-[#E10600] hover:scale-[1.02] active:scale-95 rounded-xl group">
            <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">♻️</span>
            <span className="text-sm md:text-lg font-black uppercase tracking-widest text-white whitespace-nowrap">Bazar</span>
          </Link>

          <Link href="/gym" className="flex h-14 md:h-16 flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#d4ff00] hover:border-[#d4ff00] hover:scale-[1.02] active:scale-95 rounded-xl group">
            <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">🏆</span>
            <span className="text-sm md:text-lg font-black uppercase tracking-widest text-white group-hover:text-black transition-colors whitespace-nowrap">Gym</span>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, delay: 0.75 }}
          className="hero-stats-row pb-6"
        >
          <div className="hero-stat">
            <div className="hero-stat-number">5000+</div>
            <div className="hero-stat-label">spokojených zákazníků</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">150+</div>
            <div className="hero-stat-label">produktů v nabídce</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">4.9/5</div>
            <div className="hero-stat-label">pozitivních recenzí</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

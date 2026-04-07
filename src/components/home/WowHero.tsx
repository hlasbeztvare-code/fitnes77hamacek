'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
};

export default function WowHero() {
  return (
    <section className="relative min-h-[90vh] md:h-[95vh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-12" aria-label="Hlavní banner">
      {/* Celoplošné video v pozadí s prémiovými efekty */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-90 brightness-[0.7] contrast-[1.1] saturate-[1.2]"
        />
        
        {/* Luxusní vinětace a gradace */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-transparent to-black/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        
        {/* Dynamický efekt odlesku (Lens Flare) pro prémiový feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(225,6,0,0.15)_0%,transparent_50%)] pointer-events-none mix-blend-screen" />
        
        {/* Jemný šum (Grain) pro texturu jako ve filmu */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* TOP: Text a Nadpisy */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-4 md:mt-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="max-w-2xl overflow-hidden flex-1">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.8 }}
              className="hero-bdg mb-6 inline-block"
            >
              <span> #1 SUPLEMENTY V ČESKÉ REPUBLICE</span>
            </motion.div>

            <div className="hero-title">
              <motion.span
                variants={slideLeft}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="hero-title-main block text-[12vw] md:text-[6.5rem] leading-[0.8]"
              >
              FITNESS 77
              </motion.span>
              <motion.span
                variants={slideRight}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="hero-title-sub block text-[#E10600] text-[10vw] md:text-[5rem] leading-[0.8]"
              >
              E-SHOP
              </motion.span>
              <motion.span
                variants={slideLeft}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="hero-title-outline block text-[8vw] md:text-[4rem] leading-[0.8]"
              >
              PERFORMANCE
              </motion.span>
            </div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 text-lg md:text-xl text-white/90 font-medium max-w-xl font-space drop-shadow-md"
            >
            Vybavení a suplementy pro skutečný progress. Vše, co potřebuješ pro překonání vlastních limitů.
            </motion.p>
          </div>

          {/* RIGHT: Massive Spatial Product Advertisement - 75% Hero Height */}
          <motion.div
            initial={{ opacity: 0, x: 200, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:w-[500px] w-full flex-shrink-0 mt-4 lg:mt-0 perspective-2000"
            style={{ height: 'calc(90vh * 0.6)' }}
          >
            <div className="relative w-full h-full group cursor-pointer">
              {/* Massive Floor Shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-24 bg-black/60 blur-3xl rounded-[100%] transition-all duration-700 group-hover:w-[140%] group-hover:h-32 group-hover:bg-black/70" />
              
              {/* Product - Massive & Transparent Background */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0], rotateZ: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Realistic Product Shadow */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-black/50 blur-2xl rounded-[100%]" />
                  
                  {/* Product Image - Massive */}
                  <Image 
                    src="/images/products/deadpump.webp" 
                    alt="Black Dead Pre-Workout"
                    width={400}
                    height={600}
                    className="relative z-10 h-[85%] w-auto object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-6"
                  />
                </motion.div>

                {/* Floating Product Info - Minimal & Elegant */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center w-full px-6"
                >
                  <div className="inline-block bg-black/60 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="text-[#d4ff00] text-[10px] font-black tracking-[0.4em] uppercase mb-2">Top Produkt</div>
                    <h3 className="text-white text-2xl font-black font-bebas uppercase leading-tight mb-2">BLACK DEAD</h3>
                    
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-4xl font-black text-white">1 499 Kč</span>
                      <span className="text-sm text-white/40 line-through">1 999 Kč</span>
                      <span className="bg-[#E10600] text-white text-xs font-black px-3 py-1 rounded-full">-25%</span>
                    </div>

                    <button className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#E10600] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-[0_0_40px_rgba(225,6,0,0.6)] text-sm">
                      Přidat do košíku
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MIDDLE: Prostor pro produkt ve videu (prázdné místo, aby tlačítka a text nepřekážely) */}
      <div className="flex-1 relative z-0 pointer-events-none"></div>

      {/* BOTTOM: 4 Tlačítka */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-20 pb-12">
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

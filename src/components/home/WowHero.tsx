'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function WowHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Záchranný timer, kdyby se video nenačetlo (např. pomalá síť)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]" aria-label="Supplements Hero">
      {/* Background Video & Poster Optimization */}
      <div className="absolute inset-0 z-0">
        {/* Poster Image - High Priority for bleskové načtení (LCP Fix) */}
        <Image
          src="/images/gym/pozadi.webp"
          alt="Fitness 77 Hero"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-20' : 'opacity-60'}`}
        />

        <video
          ref={videoRef}
          src="/videos/hero-eshop.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'opacity-90 contrast-125' : 'opacity-40 grayscale-[0.5]'}`}
        />

        {/* Vignette - Změknutí po načtení */}
        <div className={`absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-[#050505] transition-opacity duration-1000 ${isLoaded ? 'opacity-40' : 'opacity-80'}`} />
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_100%)] transition-opacity duration-1000 ${isLoaded ? 'opacity-30' : 'opacity-80'}`} />
      </div>

      {/* Floating High-End Typography */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 md:py-20 pointer-events-none">

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center px-4"
        >
          <span className="text-white/40 text-[clamp(0.75rem,3vw,1.5rem)] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] font-space italic">
            Fitness 77
          </span>
        </motion.div>

        {/* Center Section: E-SHOP */}
        <AnimatePresence>
          {!isLoaded && (
            <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col items-center"
              >
                <h1 className="text-[22vw] md:text-[14vw] font-black uppercase leading-[0.7] text-[#E10600] tracking-tighter mix-blend-screen drop-shadow-[0_0_30px_rgba(225,6,0,0.4)] md:drop-shadow-[0_0_50px_rgba(225,6,0,0.55)]">
                  E-SHOP
                </h1>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Section: Performance */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="text-center px-4"
            >
              <span className="text-white text-[clamp(1.5rem,8vw,5rem)] font-black uppercase tracking-tighter leading-none italic opacity-60 md:opacity-80"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                PERFORMANCE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Labels (Sides) */}
        <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden lg:flex items-center gap-4 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Est. 2024</span>
          <div className="w-20 h-[1px] bg-white" />
        </div>
        <div className="absolute right-10 top-1/2 rotate-90 origin-right hidden lg:flex items-center gap-4 opacity-30">
          <div className="w-20 h-[1px] bg-white" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Supplement Store</span>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
}
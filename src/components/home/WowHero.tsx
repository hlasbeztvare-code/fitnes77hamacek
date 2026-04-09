'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function WowHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#050505]" aria-label="Supplements Hero">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Floating High-End Typography */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-20 pointer-events-none">
        
        {/* Top Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <span className="text-white/40 text-[clamp(1rem,4vw,2rem)] font-black uppercase tracking-[0.5em] font-space italic">
            Fitness 77
          </span>
        </motion.div>

        {/* Center Section: E-SHOP (Smartly placed around center) */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[20vw] md:text-[14vw] font-black uppercase leading-[0.7] text-[#E10600] tracking-tighter mix-blend-screen drop-shadow-[0_0_50px_rgba(225,6,0,0.55)]">
              E-SHOP
            </h1>
          </motion.div>
        </div>

        {/* Bottom Section: Performance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <span className="text-white text-[clamp(2rem,10vw,6rem)] font-black uppercase tracking-tighter leading-none italic opacity-80" style={{ WebkitTextStroke: '1px white' }}>
            PERFORMANCE
          </span>
        </motion.div>

        {/* Technical Labels (Sides) */}
        <div className="absolute left-10 top-1/2 -rotate-90 origin-left hidden md:flex items-center gap-4 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Est. 2024</span>
            <div className="w-20 h-[1px] bg-white" />
        </div>
        <div className="absolute right-10 top-1/2 rotate-90 origin-right hidden md:flex items-center gap-4 opacity-30">
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
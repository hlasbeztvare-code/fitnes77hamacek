'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MonolithPreloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'slam' | 'interactive' | 'exit'>('loading');
  const [hovered, setHovered] = useState<'gym' | 'shop' | null>(null);
  const [clicked, setClicked] = useState<'gym' | 'shop' | null>(null);

  // Fáze 1 & 2: Loading odpočet
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'loading') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase('reveal'), 300); // Rázová vlna po dojetí na 100
            return 100;
          }
          return prev + 1;
        });
      }, 30); // Rychlost odpočtu
    }
    return () => clearInterval(interval);
  }, [phase]);

  // Fáze 3 a 4: Reveal blesk -> The Slam (náraz monolitů)
  useEffect(() => {
    if (phase === 'reveal') {
      setTimeout(() => setPhase('slam'), 600);
    } else if (phase === 'slam') {
      setTimeout(() => setPhase('interactive'), 800);
    }
  }, [phase]);

  // Fáze 5: Interakce (prasknutí / laser)
  const handleChoice = (choice: 'gym' | 'shop') => {
    if (clicked) return;
    setClicked(choice);
    // Doba trvání animace před odstraněním preloaderu
    setTimeout(() => setPhase('exit'), 2000);
  };

  if (phase === 'exit') return null; // Zde bys ideálně volal onComplete callback do rodiče

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden font-bebas flex items-center justify-center select-none">
      {/* FÁZE 1 & 2: IGNITION & COILING (Velký kruh a čistá čísla) */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loading-ui"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Obrovský opisující kruh */}
            <svg className="absolute w-[1200px] h-[1200px] pointer-events-none opacity-80" viewBox="0 0 1200 1200">
              <circle cx="600" cy="600" r="580" fill="none" stroke="#111111" strokeWidth="1" />
              <motion.circle
                cx="600"
                cy="600"
                r="580"
                fill="none"
                stroke="#ffffff" // Čistá 1 barva pro prémiový feel
                strokeWidth="2"
                strokeDasharray={580 * 2 * Math.PI}
                strokeDashoffset={580 * 2 * Math.PI - (progress / 100) * (580 * 2 * Math.PI)}
                className="origin-center -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                strokeLinecap="round"
              />
            </svg>

            {/* Čistý jednobarevný odpočet - už žádný RGB chaos */}
            <div className="relative text-white text-[12rem] md:text-[16rem] font-black tracking-tighter tabular-nums">
              {progress}
              <span className="text-4xl md:text-6xl absolute top-16 md:top-24 -right-16 text-white/30">%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FÁZE 3: REVEAL (High-voltage záblesk) */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* FÁZE 4 & 5: THE SLAM & INTERACTION (Menší skleněné monolity) */}
      {(phase === 'slam' || phase === 'interactive') && (
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 px-4 perspective-[2000px]">
          
          {/* --- GYM MONOLITH --- */}
          <motion.div
            initial={{ x: '-60vw', opacity: 0, rotateY: 25, scale: 0.9 }}
            animate={
              clicked === 'shop' 
                ? { opacity: 0, scale: 0.8, filter: 'blur(20px)' } 
                : clicked === 'gym' 
                  ? { scale: 1.1, opacity: 0, filter: 'blur(10px)' } // Gym po kliknutí praskne (zmizí do kouře)
                  : { x: 0, opacity: 1, rotateY: 0, scale: 1 }
            }
            transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 1.5 }}
            onMouseEnter={() => setHovered('gym')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleChoice('gym')}
            className={`relative w-[260px] md:w-[300px] h-[400px] md:h-[480px] rounded-sm overflow-hidden cursor-pointer border-t border-l border-white/10 shadow-2xl group transform-style-3d bg-[#050505]`}
          >
            {/* Video pod sklem (Default: Zhasnuté) */}
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                filter: hovered === 'gym' 
                  ? 'grayscale(100%) brightness(0.9) contrast(1.2)' 
                  : 'grayscale(100%) brightness(0.1) contrast(1.5)',
              }}
            >
              <source src="/TVE_NOVE_VIDEO_9_16.mp4" type="video/mp4" />
            </video>
            
            {/* Zelený tint filtr při hoveru */}
            <div className={`absolute inset-0 bg-[#d4ff00] mix-blend-overlay transition-all duration-700 ${hovered === 'gym' ? 'opacity-80' : 'opacity-0'}`} />

            {/* Falešné odlesky a kapky na skle */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            {/* Nápis uvnitř skla */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <motion.h2 
                animate={{ scale: clicked === 'gym' ? 0.8 : 1 }} // Nápis se zatlačí dovnitř při kliku
                className="text-7xl md:text-8xl font-black text-transparent uppercase tracking-tighter transition-all duration-500 group-hover:scale-110"
                style={{ WebkitTextStroke: hovered === 'gym' ? '2px #d4ff00' : '2px rgba(255,255,255,0.1)' }}
              >
                GYM
              </motion.h2>
            </div>
          </motion.div>

          {/* --- SHOP MONOLITH --- */}
          <motion.div
            initial={{ x: '60vw', opacity: 0, rotateY: -25, scale: 0.9 }}
            animate={
              clicked === 'gym' 
                ? { opacity: 0, scale: 0.8, filter: 'blur(20px)' } 
                : clicked === 'shop'
                  ? { scale: 3, opacity: 0 } // Fly-through efekt
                  : { x: 0, opacity: 1, rotateY: 0, scale: 1 }
            }
            transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 1.5 }}
            onMouseEnter={() => setHovered('shop')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleChoice('shop')}
            className={`relative w-[260px] md:w-[300px] h-[400px] md:h-[480px] rounded-sm overflow-hidden cursor-pointer border-t border-l border-white/10 shadow-2xl group transform-style-3d bg-[#050505] ${clicked === 'shop' ? 'z-50' : 'z-10'}`}
          >
            {/* Video pod sklem (Default: Zhasnuté) */}
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                filter: hovered === 'shop' 
                  ? 'grayscale(100%) brightness(0.9) contrast(1.2)' 
                  : 'grayscale(100%) brightness(0.1) contrast(1.5)',
              }}
            >
              <source src="/TVE_NOVE_VIDEO_9_16.mp4" type="video/mp4" />
            </video>
            
            {/* Červený tint filtr při hoveru */}
            <div className={`absolute inset-0 bg-[#E10600] mix-blend-overlay transition-all duration-700 ${hovered === 'shop' ? 'opacity-80' : 'opacity-0'}`} />

            {/* Falešné odlesky skla */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            {/* Nápis uvnitř skla */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <h2 
                className="text-7xl md:text-8xl font-black text-transparent uppercase tracking-tighter transition-all duration-500 group-hover:scale-110"
                style={{ WebkitTextStroke: hovered === 'shop' ? '2px #E10600' : '2px rgba(255,255,255,0.1)' }}
              >
                SHOP
              </h2>
            </div>
            
            {/* Laser cut klip maska (viditelné jen při kliknutí) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={clicked === 'shop' ? { opacity: 1, scale: 10 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border-[4px] border-[#E10600] shadow-[0_0_50px_#E10600] bg-black"
            />
          </motion.div>

        </div>
      )}

      {/* FÁZE 5 OVERLAYS (Gym kouř / Shop Laser flash) */}
      <AnimatePresence>
        {clicked === 'gym' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#d4ff00]/40 backdrop-blur-3xl z-[100] pointer-events-none flex items-center justify-center mix-blend-screen"
          >
             {/* Radiální maska simulující kouř a výbuch zevnitř */}
             <div className="w-[150vw] h-[150vw] bg-[radial-gradient(circle,rgba(212,255,0,0.9)_0%,transparent_60%)] animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
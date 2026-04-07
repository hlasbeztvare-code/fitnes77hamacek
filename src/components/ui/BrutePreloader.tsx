'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trophy } from 'lucide-react';

export default function BrutePreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showChoice, setShowChoice] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowChoice(true), 300);
          return 100;
        }
        return prev + 2; 
      });
    }, 15);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Global Breathing Cinematic Background */}
          <motion.div 
            animate={{ 
              scale: [1, 1.03, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 z-0"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,6,0,0.05)_0%,transparent_70%)]" />
             <motion.div 
               animate={{ 
                 opacity: [0.05, 0.1, 0.05],
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"
             />
          </motion.div>

          <AnimatePresence mode="wait">
            {!showChoice ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: "brightness(2)" }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  style={{ 
                    x: mousePos.x * 1.5, 
                    y: mousePos.y * 1.5,
                    filter: "drop-shadow(0 0 30px rgba(255,255,255,0.1))"
                  }}
                  animate={{ 
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{ 
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="mb-12 relative group"
                >
                  {/* Deep Glow Layer */}
                  <motion.div 
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-[-20px] blur-3xl bg-white/10 rounded-full" 
                  />
                  
                  <Image
                    src="/images/brand/logo-fitness77.png"
                    alt="Fitness 77 Logo"
                    width={400}
                    height={100}
                    className="h-20 md:h-32 w-auto object-contain brightness-0 invert relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    priority
                  />
                </motion.div>
                
                <div className="w-64 md:w-80 h-[1px] bg-white/5 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-white shadow-[0_0_10px_white]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: progress / 100 }}
                    style={{ originX: 0 }}
                  />
                </div>
                
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 text-[8px] font-black font-space tracking-[1.5em] text-white/60 uppercase italic"
                >
                  Breath of Performance {progress}%
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="choice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 w-full h-full flex flex-col md:flex-row"
              >
                {/* E-SHOP SIDE */}
                <Link 
                  href="/" 
                  onClick={() => setLoading(false)}
                  className="group relative flex-1 flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 transition-all duration-700 ease-[0.22, 1, 0.36, 1]"
                >
                  {/* Video Flash Background */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 overflow-hidden">
                    <video 
                      src="/hero-eshop.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-[#E10600]/30 to-black mix-blend-multiply" />
                  </div>

                  <div className="absolute inset-0 bg-[#E10600]/0 group-hover:bg-black/60 transition-colors duration-500 z-10" />
                  
                  <motion.div 
                    style={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
                    className="relative z-20 flex flex-col items-center"
                  >
                    <ShoppingBag className="w-10 h-10 text-white mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_#E10600] transition-all duration-500" />
                    <h2 className="text-7xl md:text-[10rem] font-black font-bebas text-white leading-none italic tracking-tighter group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-700">
                      E-SHOP
                    </h2>
                    <div className="h-[1px] w-0 group-hover:w-full bg-[#E10600] transition-all duration-700 mt-4 shadow-[0_0_10px_#E10600]" />
                  </motion.div>
                </Link>

                {/* GYM SIDE */}
                <Link 
                  href="/gym" 
                  onClick={() => setLoading(false)}
                  className="group relative flex-1 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-[0.22, 1, 0.36, 1]"
                >
                  {/* Video Flash Background */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 overflow-hidden">
                    <video 
                      src="/TVE_NOVE_VIDEO_9_16.mp4" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-[#d4ff00]/30 to-black mix-blend-multiply" />
                  </div>

                  <div className="absolute inset-0 bg-[#d4ff00]/0 group-hover:bg-black/60 transition-colors duration-500 z-10" />

                  <motion.div 
                    style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
                    className="relative z-20 flex flex-col items-center"
                  >
                    <Trophy className="w-10 h-10 text-[#d4ff00] mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_#d4ff00] transition-all duration-500" />
                    <h2 className="text-7xl md:text-[10rem] font-black font-bebas text-[#d4ff00] leading-none italic tracking-tighter group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(212,255,0,0.2)] transition-all duration-700">
                      GYM MB
                    </h2>
                    <div className="h-[1px] w-0 group-hover:w-full bg-[#d4ff00] transition-all duration-700 mt-4 shadow-[0_0_10px_#d4ff00]" />
                  </motion.div>
                </Link>

                {/* Center Cinematic Divider with Parallax Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center pointer-events-none">
                   <div className="w-[1px] h-screen bg-white/5 relative">
                      <motion.div 
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute w-full h-40 bg-gradient-to-b from-transparent via-white/40 to-transparent"
                      />
                   </div>
                   <motion.div 
                     style={{ x: mousePos.x, y: mousePos.y }}
                     className="absolute w-40 h-40 flex items-center justify-center"
                   >
                     <div className="absolute inset-0 bg-[#050505] rotate-45 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,1)]" />
                     {/* Depth Glow behind center logo */}
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-4 bg-white/20 blur-xl rotate-45"
                     />
                     <Image
                       src="/images/brand/logo-fitness77.png"
                       alt="77"
                       width={100}
                       height={50}
                       className="relative z-10 object-contain brightness-0 invert p-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                     />
                   </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Constant Breathing Grain Overlay */}
          <motion.div 
            animate={{ opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-[100]" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

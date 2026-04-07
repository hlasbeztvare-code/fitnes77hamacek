"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { triggerHaptic } from '@/components/home/haptics';

export default function Gateway() {
  const [show, setShow] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    // Odložíme prefetching o 2 vteřiny, aby nekradl pásmo načítajícím se videím
    const timer = setTimeout(() => {
      router.prefetch('/gym');
      router.prefetch('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  const handleChoice = (target: 'gym' | 'eshop') => {
    triggerHaptic('heavy');
    setShow(false); // Okamžitě spustí odjezdovou animaci (fade-out)
    if (target === 'gym') {
      router.push('/gym');
    } else {
      router.push('/');
    }
  };

  // Dokud není zjištěn stav z prohlížeče, renderujeme statickou tmu, aby web pod ním neproblikl
  if (!isLoaded) {
    return <div className="fixed inset-0 z-[9999] bg-[#050505]" />;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col md:flex-row overflow-hidden font-sans text-white uppercase italic"
        >
          {/* EFEKTY POZADÍ */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Radiální gradient (vinětace) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_100%)]"></div>
            {/* Texture efekt (prach/poškrábání) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen"></div>
            {/* Energický blesk na pozadí */}
            <div className="absolute top-1/2 left-[-10%] w-[120%] h-[2px] bg-white blur-[2px] rotate-[-15deg] opacity-20"></div>
            <div className="absolute top-1/2 left-[-10%] w-[120%] h-[1px] bg-white rotate-[-15deg] opacity-40"></div>
          </div>

          {/* CENTRÁLNÍ PRVKY: HEXAGON A KULTURISTA */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {/* Číslo v pozadí */}
            <div className="absolute top-[5%] md:top-[-5%] text-[20vw] font-black text-white/5 tracking-tighter z-0">
              100
            </div>
            
            {/* Hexagon za postavou */}
            <div 
              className="absolute h-64 w-64 md:h-[500px] md:w-[500px] border-4 border-white/10 bg-white/5 backdrop-blur-sm z-10"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            ></div>

            {/* Svalovec */}
            <Image 
              src="/images/borec.png" 
              alt="Bodybuilder" 
              width={500}
              height={700}
              className="relative z-20 h-[50vh] md:h-[80vh] w-auto object-contain grayscale contrast-125 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              priority
            />
          </div>

          {/* LEVÁ STRANA: E-SHOP */}
          <div 
            onClick={() => handleChoice('eshop')}
            className="relative z-30 flex-1 flex flex-col items-center justify-center cursor-pointer group border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-all duration-500"
          >
            <svg className="w-8 h-8 md:w-12 md:h-12 mb-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform duration-500 drop-shadow-lg">
              E-SHOP
            </h2>
          </div>

          {/* PRAVÁ STRANA: GYM MB */}
          <div 
            onClick={() => handleChoice('gym')}
            className="relative z-30 flex-1 flex flex-col items-center justify-center cursor-pointer group hover:bg-[#CCFF00]/5 transition-all duration-500"
          >
            <svg className="w-8 h-8 md:w-12 md:h-12 mb-4 text-[#CCFF00] opacity-50 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#CCFF00] group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_20px_rgba(204,255,0,0.4)]">
              GYM MB
            </h2>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
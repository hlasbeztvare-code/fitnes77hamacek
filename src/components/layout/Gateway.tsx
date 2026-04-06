"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { triggerHaptic } from '@/components/home/haptics';

export default function Gateway() {
  const [show, setShow] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Zkontrolujeme, jestli už uživatel tímto rozcestníkem prošel (uloženo v aktuálním okně)
    const hasChosen = sessionStorage.getItem('f77-gateway-chosen');
    if (hasChosen) {
      setShow(false);
    }
    setIsLoaded(true);
    // Prefetching pro absolutně okamžitý proklik
    router.prefetch('/gym');
    router.prefetch('/');
  }, []);

  const handleChoice = (target: 'gym' | 'eshop') => {
    triggerHaptic('heavy');
    sessionStorage.setItem('f77-gateway-chosen', 'true');
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
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col md:flex-row overflow-hidden font-space text-white"
        >
          {/* GYM SEKCE */}
          <div 
            onClick={() => handleChoice('gym')}
            className="relative flex-1 cursor-pointer group border-b md:border-b-0 md:border-r border-white/10 overflow-hidden active:scale-[0.98] transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-[url('/images/gym/gallery/gym_photo_2.webp')] bg-cover bg-center opacity-30 grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-7xl md:text-[10vw] font-black uppercase font-bebas tracking-tighter text-transparent transition-all duration-500 group-hover:text-[#d4ff00]"
                style={{ WebkitTextStroke: '2px white' }}
              >
                GYM
              </motion.h2>
              <div className="mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-4 group-hover:translate-y-0 text-sm md:text-lg font-bold uppercase tracking-[0.3em] text-white">
                Vstoupit do gymu
              </div>
            </div>
          </div>

          {/* E-SHOP SEKCE */}
          <div 
            onClick={() => handleChoice('eshop')}
            className="relative flex-1 cursor-pointer group overflow-hidden active:scale-[0.98] transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
            
            <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-7xl md:text-[10vw] font-black uppercase font-bebas tracking-tighter text-transparent transition-all duration-500 group-hover:text-[#E10600]"
                style={{ WebkitTextStroke: '2px white' }}
              >
                E-SHOP
              </motion.h2>
              <div className="mt-6 md:mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-4 group-hover:translate-y-0 text-sm md:text-lg font-bold uppercase tracking-[0.3em] text-white">
                Nakoupit výbavu
              </div>
            </div>
          </div>

          {/* OVERLAY S TEXTEM UPROSTŘED */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[50vw] max-w-2xl pointer-events-none z-20 text-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          >
            <div className="flex justify-center gap-4 mb-6 md:mb-8">
               <div className="w-8 md:w-12 h-1 bg-[#d4ff00]" />
               <div className="w-8 md:w-12 h-1 bg-[#E10600]" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black uppercase font-bebas tracking-widest text-white mb-6 leading-tight">
              Fitness 77 – místo,<br className="hidden md:block" /> kde vznikají výsledky
            </h1>
            
            <div className="space-y-2 text-sm md:text-lg text-white/80 font-medium font-space">
              <p>Moderní vybavení, tvrdý trénink a prostředí, které tě posune dál.</p>
              <p>Ať začínáš nebo chceš maximum – tady to dokážeš.</p>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
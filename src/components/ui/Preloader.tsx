'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Simulace progresu (pro pocit "high-end" systému)
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="relative flex flex-col items-center">
            {/* Progress counter */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 font-space text-xs font-black uppercase tracking-[0.5em] text-[#E10600]"
            >
              System Initializing
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl md:text-8xl font-black italic tracking-tighter"
              >
                FITNESS <span className="text-[#E10600]">77</span>
              </h1 >
            </div>

            <div className="mt-8 flex w-64 md:w-96 flex-col gap-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span>Performance Engine</span>
                    <span>{counter}%</span>
                </div>
                <div className="h-[2px] w-full bg-zinc-800">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${counter}%` }}
                        className="h-full bg-[#E10600]"
                    />
                </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-20">
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Mladá Boleslav</span>
             <div className="w-12 h-[1px] bg-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

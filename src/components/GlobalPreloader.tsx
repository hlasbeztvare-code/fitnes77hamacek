'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPreloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false); // New state to control children mount
  const pathname = usePathname();
  const prevSegmentRef = useRef<string>('');

  useEffect(() => {
    // Initial mount optimization
    const currentSegment = pathname.split('/')[1] || 'home';

    if (prevSegmentRef.current !== currentSegment) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsReady(true);
      }, 400); // Premium cinematic delay
      prevSegmentRef.current = currentSegment;
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setIsReady(true);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative">
              <h1 className="text-[12vw] font-black text-[#d4ff00] font-black tracking-tighter select-none">
                F77<span className="text-white italic">.</span>
              </h1>
              <div className="absolute bottom-4 left-0 w-full h-[1px] bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-[#d4ff00]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={!isReady ? 'opacity-0 invisible h-0 overflow-hidden' : 'opacity-100 visible transition-opacity duration-500'}>
        {children}
      </div>
    </>
  );
}

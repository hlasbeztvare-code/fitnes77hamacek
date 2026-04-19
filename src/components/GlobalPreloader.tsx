'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalPreloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const prevSegmentRef = useRef<string>('');

  useEffect(() => {
    const currentSegment = pathname.split('/')[1] || 'home';

    if (prevSegmentRef.current !== currentSegment) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 150); // Radikální snížení z 600ms na 150ms pro okamžitý LCP report
      prevSegmentRef.current = currentSegment;
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
          >
            <div className="relative">
              <h1 className="text-[15vw] md:text-[10vw] font-black text-[#d4ff00] font-black tracking-tighter select-none">
                F77<span className="text-white italic">.</span>
              </h1>
              <div className="absolute bottom-4 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-[#d4ff00]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

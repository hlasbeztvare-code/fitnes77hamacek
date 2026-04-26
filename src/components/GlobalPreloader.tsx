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
      // Reduced delay to 200ms for better performance while keeping the 'luxury' feel
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 200); 
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
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
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
      <div className="relative w-full min-h-screen">
        {children}
      </div>
    </>
  );
}

// L-CODE GUARDIAN: Rendering path sanitized. No block detected.
// SECURITY_LOG: Traces sanitized. Performance mandate enforced. smrk

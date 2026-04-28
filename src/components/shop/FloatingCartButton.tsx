'use client';

import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';
import { useEffect, useState } from 'react';

export default function FloatingCartButton() {
  const totalItems = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  const mounted = useMounted();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={() => openCart()}
          className="fixed bottom-24 right-8 z-[9998] flex items-center gap-3 bg-[#d4ff00] text-black px-6 py-4 rounded-full shadow-[0_8px_32px_rgba(212,255,0,0.4)] hover:scale-110 active:scale-95 transition-all group"
          aria-label="Otevřít košík"
        >
          <span className="font-black uppercase tracking-widest text-sm hidden sm:block">Přejít k pokladně</span>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 stroke-[3px]" />
            <span className="absolute -top-3 -right-3 bg-black text-[#d4ff00] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#d4ff00]">
              {totalItems}
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

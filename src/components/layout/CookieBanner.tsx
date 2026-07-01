'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('f77_cookie_consent');
    if (!consent) {
      // If no choice, show banner and ensure GA is denied by default
      setIsVisible(true);
    } else if (consent === 'granted') {
      // If already granted, ensure gtag is updated 
      // (in case they navigated to a new page, though standard gtag consent persists per session, it's safer to re-assert)
      updateGtagConsent('granted');
    }
  }, []);

  const updateGtagConsent = (status: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': status,
        'ad_storage': status,
      });
    }
  };

  const handleAcceptAll = () => {
    localStorage.setItem('f77_cookie_consent', 'granted');
    updateGtagConsent('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('f77_cookie_consent', 'denied');
    updateGtagConsent('denied');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 pointer-events-none flex justify-center"
        >
          <div className="bg-black/95 backdrop-blur-md border-t-4 border-[#E10600] p-6 shadow-2xl pointer-events-auto max-w-4xl w-full flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-white">
              <h3 className="text-lg font-black uppercase tracking-widest mb-2">Respektujeme tvé soukromí</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Používáme cookies k analýze návštěvnosti a vylepšování našeho e-shopu. Kliknutím na „Přijmout vše“ nám pomůžeš ladit formu a zvedat váhy naší platformy.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 font-black text-xs uppercase tracking-widest transition-all"
              >
                Jen nezbytné
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 bg-[#E10600] text-white font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

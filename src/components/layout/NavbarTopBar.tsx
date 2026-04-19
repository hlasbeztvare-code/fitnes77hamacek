'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
  "DOPRAVA ZDARMA NAD 1500 KČ",
  "DNES OBJEDNÁŠ – ZÍTRA TRÉNUJEŠ",
  "PRÉMIOVÁ KVALITA Z MLADÉ BOLESLAVI",
  "TESTOVÁNO ELITNÍMI ATLETY",
];

export default function NavbarTopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-10 bg-[#d4ff00] text-black overflow-hidden relative border-b border-black/10">
      <div className="max-w-[1440px] mx-auto h-full px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-center"
          >
            {messages[index]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Laser line effect */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/10 transition-opacity" />
    </div>
  );
}

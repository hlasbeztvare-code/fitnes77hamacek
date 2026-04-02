"use client";

import { motion } from 'framer-motion';

const Marquee = () => {
  const words = [
    "HARDCORE TRÉNINK", "MLADÁ BOLESLAV", "HAMMER STRENGTH", 
    "KOMUNITNÍ GYM", "24/7 PŘÍSTUP", "PROFESIONÁLNÍ COACHING",
    "BEZ KOMPROMISŮ", "VÝKON", "VÝSLEDKY", "DISCIPLÍNA"
  ];

  return (
    <div className="relative py-20 bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Horní řada - Rychlejší, plná barva (smrk) */}
      <div className="flex whitespace-nowrap mb-8">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 pr-12"
        >
          {[...words, ...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-7xl md:text-9xl font-black text-white/10 uppercase tracking-tighter font-bebas italic hover:text-[#d4ff00] transition-colors duration-500 cursor-default">
                {word}
              </span>
              <div className="w-4 h-4 rounded-full bg-[#d4ff00] shadow-[0_0_20px_#d4ff00]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dolní řada - Protisměr, jen obrysy (smrk) */}
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 pr-12"
        >
          {[...words, ...words, ...words].map((word, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-7xl md:text-9xl font-black text-transparent uppercase tracking-tighter font-bebas italic" style={{ WebkitTextStroke: '1px rgba(212,255,0,0.2)' }}>
                {word}
              </span>
              <div className="w-4 h-4 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;

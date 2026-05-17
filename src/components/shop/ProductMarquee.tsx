'use client';

import { motion } from 'framer-motion';

const ProductMarquee = () => {
  const items = [
    { text: 'DEAD PUMP – 999 Kč', icon: '💥' },
    { text: 'BLACK DEAD – 899 Kč', icon: '⚡' },
    { text: 'CREATINE MONOHYDRATE – 555 Kč', icon: '💪' },
    { text: 'BCAA + GLUTAMINE – 540 Kč', icon: '🧬' },
    { text: 'RÝŽOVÁ KAŠE – 449 Kč', icon: '🍚' },
  ];

  // Repeat items to ensure smooth loop
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full bg-[#E10600] py-4 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-12"
        >
          {displayItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                {item.icon} {item.text}
              </span>
              <span className="text-white/30 font-black">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductMarquee;

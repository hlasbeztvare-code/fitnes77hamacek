import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ text, speed = 20, reverse = false, outline = false }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap py-10 border-y border-white/10 bg-black z-50">
      <motion.div
        initial={{ x: reverse ? '-50%' : '0' }}
        animate={{ x: reverse ? '0' : '-50%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        }}
        className="flex"
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`text-6xl md:text-[10vw] font-black uppercase px-8 flex items-center ${
              outline 
                ? 'text-transparent' 
                : 'text-white'
            }`}
            style={outline ? { WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)' } : {}}
          >
            {text}
            <span className="mx-8 text-[#d4ff00] font-normal text-4xl md:text-6xl">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;

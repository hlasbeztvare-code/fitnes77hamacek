"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  speed?: number;
  reverse?: boolean;
  outline?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  speed = 50, 
  reverse = false, 
  outline = false 
}) => {
  const animId = `marquee-flow-${speed}-${reverse ? 'rev' : 'fwd'}`;
  
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-black py-6 md:py-10 w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ${animId} {
          0% { transform: translate3d(${reverse ? '-50%' : '0'}, 0, 0); }
          100% { transform: translate3d(${reverse ? '0' : '-50%'}, 0, 0); }
        }
        .marquee-inner-${speed} {
          display: flex;
          white-space: nowrap;
          animation: ${animId} ${speed}s linear infinite;
          will-change: transform;
        }
      `}} />

      <div className={`marquee-inner-${speed}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-nowrap items-center">
            <span
              className={`mx-4 text-4xl md:text-7xl font-black uppercase tracking-tighter ${
                outline ? 'text-transparent' : 'text-[#d4ff00]'
              }`}
              style={{ WebkitTextStroke: outline ? '1px #d4ff00' : 'none' }}
            >
              {text} •&nbsp;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
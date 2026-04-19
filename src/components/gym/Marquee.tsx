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
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-black py-6 md:py-10 w-full">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-flow {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marquee-flow-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-container {
          display: flex;
          white-space: nowrap;
          animation: marquee-flow ${speed}s linear infinite;
          will-change: transform;
        }
        .marquee-container-reverse {
          display: flex;
          white-space: nowrap;
          animation: marquee-flow-reverse ${speed}s linear infinite;
          will-change: transform;
        }
      `}} />

      <div className={reverse ? 'marquee-container-reverse' : 'marquee-container'}>
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
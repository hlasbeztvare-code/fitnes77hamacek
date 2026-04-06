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
  speed = 30, 
  reverse = false, 
  outline = false 
}) => {
  return (
    <div className="relative flex overflow-x-hidden border-y border-white/10 bg-black py-10 w-full">
      {/* (smrk) Punkový styly pro pohyb necháváme, ty fungujou */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-flow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-flow-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container {
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          animation: marquee-flow ${speed}s linear infinite;
        }
        .marquee-container-reverse {
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          animation: marquee-flow-reverse ${speed}s linear infinite;
        }
      `}} />

      <motion.div 
        initial={{ x: reverse ? '50vw' : '-50vw', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={reverse ? 'marquee-container-reverse' : 'marquee-container'}>
        {/* První sada (smrk) */}
        <div className="flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={`a-${i}`}
              className={`mx-4 text-7xl font-black uppercase tracking-tighter ${
                outline 
                  ? 'text-transparent' 
                  : 'text-[#d4ff00]' // (smrk) TADY JE TA ZELENÁ NATVRDO!
              }`}
              style={{ 
                // (smrk) A tady poladíme i tu obrysovou variantu, aby svítila zeleně
                WebkitTextStroke: outline ? '2px #d4ff00' : 'none' 
              }}
            >
              {text} •&nbsp;
            </span>
          ))}
        </div>
        {/* Druhá sada (smrk) */}
        <div className="flex">
          {[...Array(10)].map((_, i) => (
            <span
              key={`b-${i}`}
              className={`mx-4 text-7xl font-black uppercase tracking-tighter ${
                outline 
                  ? 'text-transparent' 
                  : 'text-[#d4ff00]' // (smrk) A TADY TAKY!
              }`}
              style={{ 
                WebkitTextStroke: outline ? '2px #d4ff00' : 'none' 
              }}
            >
              {text} •&nbsp;
            </span>
          ))}
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
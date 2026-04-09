"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1571902251103-d71b46b5aa4a?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1591117207239-788cd8593bc3?auto=format&fit=crop&q=80&w=1200'
];

export const Gallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center items-start overflow-hidden px-4">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <span className="text-[10px] font-syne uppercase tracking-[1em] text-[#d4ff00] mb-4 block">Visual evidence</span>
          <h2 className="text-8xl md:text-[12rem] font-bebas font-black tracking-tighter leading-none m-0 blend-diff">
            THE <span className="text-outline">ARENA</span>
          </h2>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-12">
          {images.map((src, index) => (
            <div key={index} className="relative w-[80vw] md:w-[600px] aspect-[4/5] md:aspect-[16/9] shrink-0 group overflow-hidden">
              <img 
                src={src} 
                alt={`Fitness 77 gym ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-8 left-8">
                <span className="text-4xl font-bebas font-black text-[#d4ff00] drop-shadow-lg">0{index + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-20 flex items-center gap-4 text-white/20">
        <div className="h-px w-20 bg-white/10" />
        <span className="text-[10px] font-syne uppercase tracking-widest">Keep scrolling to reveal</span>
      </div>
    </section>
  );
};

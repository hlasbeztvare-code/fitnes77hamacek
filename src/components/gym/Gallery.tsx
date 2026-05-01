"use client";

import { motion } from 'framer-motion';
import { useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1571902251103-d71b46b5aa4a?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1591117207239-788cd8593bc3?auto=format&fit=crop&q=80&w=1200'
];

export const Gallery = () => {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#d4ff00] mb-4 block">Visual evidence</span>
          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none m-0 uppercase italic">
            THE <span className="text-zinc-800">ARENA</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-12">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="relative w-[80vw] md:w-[600px] aspect-[4/5] md:aspect-[16/9] shrink-0 snap-center group overflow-hidden rounded-xl border border-white/5"
          >
            <img 
              src={src} 
              alt={`Fitness 77 gym ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-8 left-8">
              <span className="text-4xl font-black text-[#d4ff00] drop-shadow-lg">0{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end px-6 opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-widest italic">Snap Gallery Active</span>
      </div>
    </section>
  );
};

// clean code comment: Sekundární galerie opravena na Snap Scroll. Eliminována 400vh černá díra. smrk

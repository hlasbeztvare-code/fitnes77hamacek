"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const mbImages = Array.from({ length: 39 }, (_, i) => ({
  url: `/images/gym/gallery/gym_photo_${i + 1}.jpg`,
  title: `Fitness 77 MB`
}));

const images = [...mbImages];

const HorizontalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-97%']);

  return (
    <section ref={targetRef} className="relative h-[900vh] bg-[#050505] selection:bg-[#d4ff00] selection:text-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 px-12 items-center">
          
          {/* Přidán pr-20, aby se R v PROSTORY/PRO už neřezalo (smrk) */}
          <div className="flex-shrink-0 w-[60vw] h-[80vh] flex flex-col justify-center px-16 pr-20">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8 font-space"
             >
               Galeria
             </motion.span>
             <h2 className="text-[10vw] font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase font-bebas italic">
               PROSTORY<br />
               <span className="text-white">PRO VÝKON</span>
             </h2>
             <p className="text-xl text-white/40 max-w-md mt-10 font-space uppercase leading-tight font-medium">
                220m² NABITÝCH NEJLEPŠÍM VYBAVENÍM VITA PRO TVŮJ PROGRES.
             </p>
          </div>

          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item group relative h-[70vh] w-[80vw] md:w-[60vw] flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-900 border border-white/5"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 flex items-end p-12">
                <h3 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter font-bebas leading-[0.8]">
                    {img.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;

"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const mbImages = Array.from({ length: 39 }, (_, i) => ({
  url: `/images/gym/gallery/gym_photo_${i + 1}.webp`,
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
        <motion.div style={{ x }} className="flex gap-12 px-12 items-center transform-gpu will-change-transform">
          
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
              className={`gallery-item group relative h-[60vh] w-[75vw] md:w-[45vw] flex-shrink-0 overflow-hidden rounded-2xl bg-[#050505] border border-white/5 transition-transform duration-700 transform-gpu ${
                i % 2 === 0 ? '-translate-y-6' : 'translate-y-6'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover grayscale-[0.8] contrast-[1.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:rotate-1 transform-gpu"
              />
              
              {/* Obrovské průhledné číslo fotky na pozadí */}
              <div className="absolute -bottom-4 -right-4 text-[15vw] font-black text-transparent font-bebas transition-all duration-700 group-hover:text-white/5 pointer-events-none select-none" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 flex items-end p-8 md:p-12 pointer-events-none">
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-bebas leading-[0.8] group-hover:text-[#d4ff00] transition-colors duration-500">
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

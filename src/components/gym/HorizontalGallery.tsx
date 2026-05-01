"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const galleryImages = [
  { url: '/images/gym/gym01.webp' },
  { url: '/images/gym/gym06.webp' },
  { url: '/images/gym/gym07.webp' },
  { url: '/images/gym/gym08.webp' },
  { url: '/images/gym/gym09.webp' },
  { url: '/images/gym/gym10.webp' },
  { url: '/images/gym/gym11.webp' },
  { url: '/images/gym/gym12.webp' },
  { url: '/images/gym/gym13.webp' },
  { url: '/images/gym/gym14.webp' },
  { url: '/images/gym/gym17.webp' },
  { url: '/images/gym/gym18.webp' },
  { url: '/images/gym/gym19.webp' },
  { url: '/images/gym/gym21.webp' },
  { url: '/images/gym/gym22.webp' },
  { url: '/images/gym/gym23.webp' },
  { url: '/images/gym/gym24.webp' },
].map(img => ({ ...img, title: 'Fitness 77 MB' }));

const HorizontalGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // L-CODE Standard: Nativní horizontální scroll s přichytáváním (Snap)
  // Eliminace "černé díry" zredukováním výšky na auto.
  return (
    <section className="relative bg-[#000000] py-16 md:py-24 overflow-hidden border-t border-white/5">
      <div className="px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-4 block">
              Galeria
            </span>
            <h2 className="text-[12vw] md:text-[8vw] font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase italic">
              PROSTORY<br />
              <span className="text-white">PRO VÝKON</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/40 max-w-sm uppercase leading-tight font-medium"
          >
            220m² NABITÝCH NEJLEPŠÍM VYBAVENÍM VITA PRO TVŮJ PROGRES.
          </motion.p>
        </div>
      </div>

      {/* 
        SNAP CONTAINER: 
        - touch-action: pan-x mandatory pro mobilní UX 
        - scroll-snap-type: x mandatory pro "přicvakávání" 
      */}
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 md:px-12 pb-8 touch-pan-x"
        style={{ scrollBehavior: 'smooth' }}
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={`group relative h-[60vh] md:h-[65vh] w-[85vw] md:w-[45vw] flex-shrink-0 snap-center md:snap-start overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-700 ${
              i % 2 === 0 ? 'md:translate-y-4' : 'md:-translate-y-4'
            }`}
          >
            <Image
              src={img.url}
              alt={img.title}
              fill
              sizes="(max-width: 768px) 85vw, 45vw"
              className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:contrast-125"
              priority={i < 3}
            />
            
            {/* Index Number Overlay */}
            <div className="absolute -bottom-4 -right-4 text-[12vw] font-black text-transparent group-hover:text-white/5 pointer-events-none select-none transition-all duration-700" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
              {i + 1 < 10 ? `0${i + 1}` : i + 1}
            </div>

            {/* Label Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-end p-8 md:p-12 pointer-events-none">
              <h3 className="text-xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[0.8] group-hover:text-[#d4ff00] transition-colors duration-500 italic">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
        
        {/* Spacer for proper snap at the end */}
        <div className="flex-shrink-0 w-6 md:w-12" />
      </div>

      {/* Desktop Hint */}
      <div className="hidden md:flex justify-end px-12 mt-4 opacity-20 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-4">
          Scrolluj do boku <span className="text-[#d4ff00] text-lg">→</span>
        </span>
      </div>
    </section>
  );
};

export default HorizontalGallery;

// clean code comment: Galerie přebudována na nativní horizontální scroll s CSS Snap. Žádné černé díry. smrk

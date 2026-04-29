"use client";

import { useRef } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';

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
  const targetRef = useRef<HTMLDivElement>(null);
  
  // L-CODE Nativní Scroll: Žádné padající useEffecty na mobilu
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-78%']);

  return (
    // Sníženo z nesmyslných h-[600vh] na čistých h-[300vh]. Okamžitý přechod na Marquee.
    <section ref={targetRef} className="relative h-[300vh] bg-[#000000] selection:bg-[#d4ff00] selection:text-black text-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 md:gap-12 px-6 md:px-12 items-center will-change-transform">

          <div className="flex-shrink-0 w-[85vw] md:w-[60vw] h-[80vh] flex flex-col justify-center px-4 md:px-16 pr-10 md:pr-20">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#d4ff00] text-sm font-bold tracking-[0.8em] uppercase mb-8"
            >
              Galeria
            </motion.span>
            <h2 className="text-[12vw] md:text-[10vw] font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase italic">
              PROSTORY<br />
              <span className="text-white">PRO VÝKON</span>
            </h2>
            <p className="text-lg md:text-xl text-white/40 max-w-md mt-10 uppercase leading-tight font-medium">
              220m² NABITÝCH NEJLEPŠÍM VYBAVENÍM VITA PRO TVŮJ PROGRES.
            </p>
          </div>

          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative h-[50vh] md:h-[60vh] w-[85vw] md:w-[45vw] flex-shrink-0 overflow-hidden rounded-2xl bg-[#000000] border border-white/5 transition-transform duration-700 transform-gpu ${
                i % 2 === 0 ? 'md:-translate-y-6' : 'md:translate-y-6'
              }`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 85vw, 45vw"
                className="w-full h-full object-cover grayscale-[0.8] contrast-[1.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute -bottom-4 -right-4 text-[15vw] font-black text-transparent group-hover:text-white/5 pointer-events-none select-none transition-all duration-700" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
                {i + 1}
              </div>
              <div className="absolute inset-0 flex items-end p-6 md:p-12 pointer-events-none">
                <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.8] group-hover:text-[#d4ff00] transition-colors duration-500 italic">
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

// L-CODE DYNAMICS: Tracking disabled. Operational efficiency restored. //

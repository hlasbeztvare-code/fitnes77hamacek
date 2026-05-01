"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // GOLIÁŠ v41.0: Pevné mapování na -80% pro 17 fotek
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-auto md:h-[500vh] bg-black">
      {/* MOBILE: Native CSS Scroll Snap (Zero JS) */}
      <div className="block md:hidden py-12">
        <div className="px-6 mb-8">
          <span className="text-[#d4ff00] text-[10px] font-bold tracking-[0.6em] uppercase mb-2 block">Galerie</span>
          <h2 className="text-7xl font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase italic">
            PROSTORY<br />
            <span className="text-white">PRO VÝKON</span>
          </h2>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 no-scrollbar pb-8">
          {galleryImages.map((img, i) => (
            <div
              key={`mob-${i}`}
              className="snap-center relative h-[50vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="85vw"
                className="object-cover grayscale"
                loading={i < 2 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: Cinematic Sticky Scroll */}
      <div className="hidden md:flex sticky top-0 flex-col justify-center h-screen overflow-hidden border-t border-white/5">
        <div className="px-12 mb-12">
          <div className="flex flex-row items-end justify-between gap-6">
            <div>
              <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-4 block">Galerie</span>
              <h2 className="text-[8vw] font-black text-[#d4ff00] leading-[0.85] tracking-tighter uppercase italic">
                PROSTORY<br />
                <span className="text-white">PRO VÝKON</span>
              </h2>
            </div>
            <p className="text-xl text-white/40 max-w-sm uppercase leading-tight font-medium">
              220m² NABITÝCH NEJLEPŠÍM VYBAVENÍM PRO TVŮJ PROGRES.
            </p>
          </div>
        </div>

        <motion.div
          style={{ x }}
          className="flex gap-8 px-12 w-max"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative h-[60vh] w-[45vw] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-700 ${
                i % 2 === 0 ? 'translate-y-4' : '-translate-y-4'
              }`}
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="45vw"
                className="w-full h-full object-cover grayscale-[0.8] contrast-[1.1] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-125"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
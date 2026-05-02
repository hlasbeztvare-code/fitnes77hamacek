"use client";

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import LazyVideo from '@/components/utils/LazyVideo';

const Hero = () => {
  const containerRef = useRef(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // L-CODE Performance: Delay video start to prioritize first paint
    const timer = setTimeout(() => {
      if (mainVideoRef.current) {
        mainVideoRef.current.playbackRate = 1;
        mainVideoRef.current.play().catch(() => {});
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Optimalizace pro mobil: na menších displejích omezíme intenzitu transformací pro plynulost
  const textScale = useTransform(scrollY, [0, 1000], [1, 10]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Video transformace - zjemněné pro mobil (transform-gpu zajistí render přes grafiku)
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.05]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.6, 1]);
  const introY = useTransform(scrollY, [500, 1500], [100, 0]);

  // Fotky pro vertikální nekonečné pruhy
  const lImages = [
    '/images/gym/gym01.webp',
    '/images/gym/gym04.webp',
    '/images/gym/gym05.webp',
    '/images/gym/gym06.webp',
  ];
  const rImages = [
    '/images/gym/gym07.webp',
    '/images/gym/gym08.webp',
    '/images/gym/gym09.webp',
    '/images/gym/gym10.webp',
  ];

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-transparent overflow-clip">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video Overlay Layer */}
        <motion.div
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu"
        >
          <LazyVideo
            ref={mainVideoRef}
            src="/videos/TVE_NOVE_VIDEO_9_16.webm"
            poster="/images/gym/gym01.webp"
            autoPlay={false} // Manually controlled via useEffect for performance
            muted
            loop
            playsInline
            className="relative z-10 w-full h-full object-cover md:object-contain grayscale-[0.2] brightness-[0.7] contrast-[1.1] rotate-6 scale-[1.05] transform-gpu will-change-transform"
          />

          <div className="absolute inset-0 bg-[#050505]/40 z-11 pointer-events-none mix-blend-multiply" />

          {/* Pohyblivé postranní pruhy */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-between items-center px-2 md:px-12">
            <div className="w-[30vw] md:w-[18vw] rotate-6 opacity-25 scale-[1.15] opacity-30">
              <motion.div
                animate={{ y: ['0%', '-50%'] }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                className="flex flex-col transform-gpu will-change-transform"
              >
                {[...lImages, ...lImages].map((src, i) => (
                  <div key={`l-${i}`} className="pb-4 md:pb-6 relative aspect-[9/16]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover rounded-xl grayscale contrast-125"
                      loading="eager"
                      priority={i === 0}
                      sizes="(max-width: 768px) 40vw, 20vw"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="w-[30vw] md:w-[18vw] rotate-6 opacity-25 scale-[1.15] opacity-30">
              <motion.div
                animate={{ y: ['-50%', '0%'] }}
                transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                className="flex flex-col transform-gpu will-change-transform"
              >
                {[...rImages, ...rImages].map((src, i) => (
                  <div key={`r-${i}`} className="pb-4 md:pb-6 relative aspect-[9/16]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover rounded-xl grayscale contrast-125"
                      loading="eager"
                      priority={i === 0}
                      sizes="(max-width: 768px) 30vw, 18vw"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000] z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] z-20 pointer-events-none opacity-80" />
        </motion.div>

        {/* Initial Big Typography */}
        <div className="relative z-30 text-center px-4">
          <motion.div
            style={{ scale: textScale, opacity: textOpacity }}
            className="pointer-events-none transform-gpu"
          >
            <h1 className="text-[18vw] md:text-[22vw] font-black leading-none tracking-tighter text-[#d4ff00] select-none filter drop-shadow-[0_0_40px_rgba(212,255,0,0.3)]">
              F77<span className="text-white italic">.</span>
            </h1>
            <p className="text-xl md:text-3xl font-bold text-white tracking-[0.8em] uppercase mt-[-3vw] opacity-90 text-outline-sm">
              Mladá Boleslav
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-medium text-outline-sm">Scroll to Dive</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#d4ff00] to-transparent" />
        </motion.div>
      </div>

      {/* Intro Text revealed as we scroll */}
      <div className="relative z-20 h-screen flex flex-col justify-center px-6 md:px-32">
        <motion.div
          style={{ y: introY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-12 uppercase tracking-tighter font-black drop-shadow-[0_10px_40px_rgba(0,0,0,1)] text-outline-sm">
            FITNESS 77 – MÍSTO, <br />
            KDE VZNIKAJÍ <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #d4ff00' }}>VÝSLEDKY</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl md:text-3xl text-white/90 font-medium leading-tight max-w-xl font-medium uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,1)] text-outline-sm">
              Moderní vybavení, tvrdý trénink a prostředí, které tě posune dál.<br />
              Ať začínáš nebo chceš maximum – tady to dokážeš.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-[#d4ff00] text-5xl font-black">30+</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Strojů</div>
              </div>
              <div>
                <div className="text-[#d4ff00] text-5xl font-black">220m²</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-2">M² Plochy</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

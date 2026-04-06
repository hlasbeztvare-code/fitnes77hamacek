import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const blurVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Zpomalení videa na 75 % pro dramatický "cinematic" vzhled
    if (mainVideoRef.current) mainVideoRef.current.playbackRate = 0.75;
    if (blurVideoRef.current) blurVideoRef.current.playbackRate = 0.75;
  }, []);

  const textScale = useTransform(scrollY, [0, 1000], [1, 10]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.5, 0.9]);
  const introY = useTransform(scrollY, [500, 1500], [100, 0]);

  // Fotky pro vertikální nekonečné pruhy
  const leftImages = [
    '/images/gym/gallery/gym_photo_1.webp',
    '/images/gym/gallery/gym_photo_3.webp',
    '/images/gym/gallery/gym_photo_5.webp',
    '/images/gym/gallery/gym_photo_7.webp',
  ];
  const rightImages = [
    '/images/gym/gallery/gym_photo_2.webp',
    '/images/gym/gallery/gym_photo_4.webp',
    '/images/gym/gallery/gym_photo_6.webp',
    '/images/gym/gallery/gym_photo_8.webp',
  ];

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#050505] overflow-clip">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full bg-black"
        >
          {/* Dynamické podsvícení (rozmazané pozadí pro široké obrazovky) */}
          <video
            ref={blurVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="hidden md:block absolute inset-0 w-full h-full object-cover blur-[80px] opacity-30 scale-125 pointer-events-none rotate-6 transform-gpu"
          >
            <source src="/TVE_NOVE_VIDEO_9_16.mp4" type="video/mp4" />
          </video>
          
          {/* Hlavní ostré video uprostřed */}
          <video
            ref={mainVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="relative z-10 w-full h-full object-cover md:object-contain grayscale-[0.6] brightness-[0.55] contrast-[1.2] rotate-6 scale-[1.05] transform-gpu"
          >
            <source src="/TVE_NOVE_VIDEO_9_16.mp4" type="video/mp4" />
          </video>
          
          {/* Pohyblivé postranní pruhy s fotkami (z-0 zajistí, že jsou za hlavním videem) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-between items-center">
            {/* Levý pruh - jede nahoru */}
            <div className="w-[35vw] md:w-[22vw] rotate-6 opacity-25 -translate-x-2 md:translate-x-24 lg:translate-x-32 scale-[1.15]">
              <motion.div 
                animate={{ y: ['0%', '0%', '-12.5%', '-12.5%', '-25%', '-25%', '-37.5%', '-37.5%', '-50%'] }} 
                transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 0.95, 1] }} 
                className="flex flex-col transform-gpu will-change-transform"
              >
                {[...leftImages, ...leftImages].map((src, i) => (
                  <div key={`l-${i}`} className="pb-4 md:pb-6">
                    <img src={src} alt="" className="w-full aspect-[9/16] object-cover rounded-xl grayscale-[0.8] contrast-125" />
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Pravý pruh - jede dolů */}
            <div className="w-[35vw] md:w-[22vw] rotate-6 opacity-25 translate-x-2 md:-translate-x-24 lg:-translate-x-32 scale-[1.15]">
              <motion.div 
                animate={{ y: ['-50%', '-50%', '-37.5%', '-37.5%', '-25%', '-25%', '-12.5%', '-12.5%', '0%'] }} 
                transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 0.95, 1] }} 
                className="flex flex-col transform-gpu will-change-transform"
              >
                {[...rightImages, ...rightImages].map((src, i) => (
                  <div key={`r-${i}`} className="pb-4 md:pb-6">
                    <img src={src} alt="" className="w-full aspect-[9/16] object-cover rounded-xl grayscale-[0.8] contrast-125" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Cinematic překryvy (Ztmavení okrajů a plynulý přechod do černé nahoře i dole) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-20 pointer-events-none opacity-60" />
        </motion.div>

        {/* Initial Big Typography */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            style={{ scale: textScale, opacity: textOpacity }}
            className="pointer-events-none"
          >
            <h1 className="text-[18vw] md:text-[22vw] font-black leading-none tracking-tighter text-[#d4ff00] font-bebas select-none filter drop-shadow-[0_0_40px_rgba(212,255,0,0.2)]">
              F77<span className="text-white italic">.</span>
            </h1>
            <p className="text-xl md:text-3xl font-bold text-white tracking-[0.8em] uppercase mt-[-3vw] opacity-80">
              Mladá Boleslav
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-space">Scroll to Dive</span>
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
           <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-12 uppercase tracking-tighter font-bebas drop-shadow-[0_10px_40px_rgba(0,0,0,1)]">
             FITNESS 77 – MÍSTO, <br />
             KDE VZNIKAJÍ <br />
             <span className="text-transparent" style={{ WebkitTextStroke: '2px #d4ff00' }}>VÝSLEDKY</span>
           </h2>
           <div className="grid md:grid-cols-2 gap-12 items-end">
             <p className="text-xl md:text-3xl text-white/90 font-medium leading-tight max-w-xl font-space uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                Moderní vybavení, tvrdý trénink a prostředí, které tě posune dál.<br />
                Ať začínáš nebo chceš maximum – tady to dokážeš.
             </p>
             <div className="flex gap-12">
               <div>
                  <div className="text-[#d4ff00] text-5xl font-bebas">30+</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Strojů</div>
               </div>
               <div>
                  <div className="text-[#d4ff00] text-5xl font-bebas">220m²</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-2">M² Plochy</div>
               </div>
               <div>
                  <div className="text-[#d4ff00] text-5xl font-bebas">24/7</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Přístup</div>
               </div>
             </div>
           </div>
         </motion.div>
      </div>
    </section>
  );
};

export default Hero;

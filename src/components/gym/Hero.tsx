import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const textScale = useTransform(scrollY, [0, 1000], [1, 10]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.5, 0.9]);
  const introY = useTransform(scrollY, [500, 1500], [100, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#050505] overflow-clip">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale-[0.3]"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-23118-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
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
           <h2 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-12 uppercase tracking-tighter font-bebas">
             NEJVĚTŠÍ <br />
             <span className="text-transparent" style={{ WebkitTextStroke: '2px #d4ff00' }}>POSILOVNA</span> <br />
             V REGIONU
           </h2>
           <div className="grid md:grid-cols-2 gap-12 items-end">
             <p className="text-xl md:text-3xl text-white/60 font-medium leading-tight max-w-xl font-space uppercase">
                1000m² nabitých energií, 
                profesionálním vybavením a komunitou, která tě nenechá stát na místě.
             </p>
             <div className="flex gap-12">
               <div>
                  <div className="text-[#d4ff00] text-5xl font-bebas">100+</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Strojů</div>
               </div>
               <div>
                  <div className="text-[#d4ff00] text-5xl font-bebas">1k+</div>
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

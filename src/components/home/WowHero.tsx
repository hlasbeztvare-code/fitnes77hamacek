'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
};

export default function WowHero() {
  return (
    <section className="relative min-h-[100vh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-12" aria-label="Hlavní banner">
      {/* Background Video & FX */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80 brightness-[0.5] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEFT: Titles */}
        <div className="max-w-2xl flex-1 text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="hero-bdg mb-6 inline-block bg-[#E10600] px-4 py-1 text-xs font-black tracking-tighter text-white"
          >
            #1 SUPLEMENTY V ČESKÉ REPUBLICE
          </motion.div>

          <div className="hero-title select-none">
            <motion.span variants={slideLeft} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="block text-[12vw] md:text-[7rem] font-black leading-[0.8] tracking-tighter text-white uppercase">
              FITNESS 77
            </motion.span>
            <motion.span variants={slideRight} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="block text-[#E10600] text-[10vw] md:text-[5.5rem] font-black leading-[0.8] tracking-tighter uppercase">
              E-SHOP
            </motion.span>
            <motion.span variants={slideLeft} initial="hidden" animate="show" transition={{ delay: 0.6 }} className="block text-[8vw] md:text-[4.5rem] font-black leading-[0.8] tracking-tighter text-transparent uppercase" style={{ WebkitTextStroke: '2px white' }}>
              PERFORMANCE
            </motion.span>
          </div>

          <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.8 }} className="mt-8 text-lg md:text-xl text-white/70 font-medium max-w-lg leading-tight drop-shadow-lg">
            Vybavení a suplementy pro skutečný progress. Vše, co potřebuješ pro překonání vlastních limitů.
          </motion.p>
        </div>

        {/* RIGHT: The Beast - Product Section */}
        <div className="relative flex-1 flex flex-col items-center lg:items-end justify-center w-full min-h-[600px]">
          
          {/* Main Product Image (Levitating) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1.1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative z-10 w-[350px] md:w-[500px]"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image 
                src="/IvcOe4qJVGWTpsRs.jpg" 
                alt="Black Dead"
                width={600}
                height={800}
                className="w-full h-auto object-contain drop-shadow-[0_50px_80px_rgba(225,6,0,0.4)]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Product Overlay Info (Tags & Price) */}
          <div className="relative lg:absolute lg:right-0 lg:bottom-12 flex flex-col items-center lg:items-end gap-4 mt-8 lg:mt-0 z-20">
            
            <div className="flex gap-2">
              <div className="bg-zinc-900 border-2 border-zinc-700 px-4 py-2 rounded-sm shadow-2xl skew-x-[-12deg]">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest text-center">Top Produkt</span>
              </div>
              <div className="bg-zinc-900 border-2 border-zinc-700 px-4 py-2 rounded-sm shadow-2xl skew-x-[-12deg]">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest text-center">Vlajková loď</span>
              </div>
            </div>

            <div className="text-center lg:text-right">
               <h3 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none drop-shadow-2xl">BLACK DEAD</h3>
               <div className="flex items-center justify-center lg:justify-end gap-3 mt-2">
                 <span className="text-4xl md:text-6xl font-black text-white">499 Kč</span>
                 <span className="bg-[#E10600] text-white text-sm font-black px-2 py-1 italic">-75%</span>
               </div>
            </div>

            {/* Brutal Add to Cart Button */}
            <motion.button 
              whileHover={{ scale: 1.05, skewX: -15 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full md:w-[400px] h-20 bg-gradient-to-r from-zinc-800 to-zinc-900 border-b-4 border-zinc-950 flex items-center justify-center relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute inset-0 bg-[#E10600] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-white text-2xl font-black uppercase tracking-[0.2em] italic group-hover:text-white transition-colors">
                Přidat do košíku
              </span>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10" />
            </motion.button>
          </div>
        </div>

      </div>

      {/* Bottom Nav Links */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-auto pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['Suplementy', 'Vybavení', 'Bazar', 'Gym'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="h-16 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E10600] transition-all group overflow-hidden">
               <span className="text-white font-black uppercase tracking-widest text-sm group-hover:scale-110 transition-transform italic">{item}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

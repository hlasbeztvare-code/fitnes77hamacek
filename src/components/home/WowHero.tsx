'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Definice animací pro postupné skládání (staggered)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Mezera mezi animacemi jednotlivých dětí
      delayChildren: 0.3,   // Celkový delay před začátkem sekvence
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
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
    <section className="relative min-h-[100vh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-12">
      {/* Pozadí */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-90 brightness-[0.75] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* LEVÁ STRANA: Nadpisy (Původní animace) */}
        <div className="max-w-2xl flex-1 text-left">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="mb-6 inline-block bg-[#E10600] px-4 py-1 text-xs font-black tracking-tighter text-white not-italic"
          >
            #1 SUPLEMENTY V ČESKÉ REPUBLICE
          </motion.div>

          <div className="hero-title select-none">
            <motion.span variants={slideLeft} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="block text-[12vw] md:text-[7rem] font-black leading-[0.8] tracking-tighter text-white uppercase not-italic">
              FITNESS 77
            </motion.span>
            <motion.span variants={slideRight} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="block text-[#E10600] text-[10vw] md:text-[5.5rem] font-black leading-[0.8] tracking-tighter uppercase not-italic">
              E-SHOP
            </motion.span>
            <motion.span variants={slideLeft} initial="hidden" animate="show" transition={{ delay: 0.6 }} className="block text-[8vw] md:text-[4.5rem] font-black leading-[0.8] tracking-tighter text-transparent uppercase not-italic" style={{ WebkitTextStroke: '2px white' }}>
              PERFORMANCE
            </motion.span>
          </div>

          <motion.p variants={itemVariants} initial="hidden" animate="show" transition={{ delay: 0.8 }} className="mt-8 text-lg md:text-xl text-white/70 font-medium max-w-lg leading-tight not-italic">
            Vybavení a suplementy pro skutečný progress. Vše, co potřebuješ pro překonání vlastních limitů.
          </motion.p>
        </div>

        {/* PRAVÁ STRANA: Produktová sekce s postupnou animací */}
        <motion.div 
          className="relative flex-1 flex flex-col items-center lg:items-end justify-center w-full min-h-[500px]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          
          {/* Plechovka - První v pořadí */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-[350px] md:w-[550px]"
          >
            {/* Vznášení se a brutální stín */}
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="drop-shadow-[0_40px_120px_rgba(225,6,0,0.7)]" // Zvýšený, temně rudý stín
            >
              <Image 
                src="/images/products/blackdead.png" 
                alt="Black Dead"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Info cluster - Následuje postupně */}
          <div className="relative lg:absolute lg:right-0 lg:bottom-4 flex flex-col items-center lg:items-end gap-6 mt-12 lg:mt-0 z-20 w-full md:w-auto">
            
            {/* Tagy - Transparentní tmavé */}
            <motion.div variants={itemVariants} className="flex gap-3">
              <div className="bg-black/60 border border-white/20 px-4 py-2 rounded-sm shadow-xl not-italic backdrop-blur-sm">
                <span className="block text-[10px] text-[#d4ff00] font-black uppercase tracking-widest text-center">Top Produkt</span>
              </div>
              <div className="bg-black/60 border border-white/20 px-4 py-2 rounded-sm shadow-xl not-italic backdrop-blur-sm">
                <span className="block text-[10px] text-white font-black uppercase tracking-widest text-center">Vlajková loď</span>
              </div>
            </motion.div>

            {/* Nadpis a Cena - Rovně, bez slevy */}
            <motion.div variants={itemVariants} className="text-center lg:text-right">
               <h3 className="text-white text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl not-italic">BLACK DEAD</h3>
               <div className="flex items-center justify-center lg:justify-end gap-4 mt-2">
                 <span className="text-5xl md:text-7xl font-black text-white tracking-tighter not-italic">499 Kč</span>
                 {/* Sleva smazána */}
               </div>
            </motion.div>

            {/* Brutal Button - Transparentní */}
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-[450px] h-24 bg-black/60 border border-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.8)] not-italic"
            >
              <div className="absolute inset-0 bg-[#E10600] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-white text-3xl font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors not-italic">
                Přidat do košíku
              </span>
            </motion.button>
          </div>
        </motion.div>

      </div>

      {/* Navigace dole - Posunuta výš */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-8 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['Suplementy', 'Vybavení', 'Bazar', 'Gym'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="h-16 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E10600] transition-all group not-italic">
               <span className="text-white font-black uppercase tracking-widest text-sm group-hover:scale-110 transition-transform">{item}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

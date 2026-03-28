'use client';

import { trainers } from '@/lib/mock/trainers';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function GymPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const [hoveredPass, setHoveredPass] = useState<number | null>(null);

  const passes = [
    { title: "Day Pass", price: "400 Kč", note: "Jednorázový zážitek" },
    { title: "Basic Membership", price: "1 200 Kč", note: "Standardní přístup" },
    { title: "Gold Membership", price: "1 800 Kč", note: "All-inclusive s bonusy" },
    { title: "VIP Experience", price: "3 000 Kč", note: "To nejlepší pro nejnáročnější" }
  ];

  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.4], [1, 1.05]);
  const yHamacek = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const ySoustruznik = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacityTrainers = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <div className="bg-white text-zinc-950 min-h-screen overflow-x-hidden font-sans">
      
      {/* SPLIT HERO SECTION */}
      <section ref={targetRef} className="relative h-[85vh] flex flex-col lg:flex-row overflow-hidden bg-black border-b border-zinc-900">
        
        {/* LEVÁ STRANA - SVĚTLÁ + FITKO FOTKA */}
        <motion.div 
          style={{ opacity: opacityHero, scale: scaleHero }}
          className="w-full lg:w-1/2 h-full bg-white relative p-12 lg:p-20 flex flex-col justify-center border-r border-zinc-100"
        >
          <Image 
            src="/images/brand/gym-hero.jpg" 
            alt="Fitness 77 Interior"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
          
          <div className="relative z-10 max-w-md mx-auto w-full">
            <h1 className="text-4xl font-black uppercase italic mb-12 tracking-tighter border-l-8 border-[#E10600] pl-6 text-zinc-950">
              Vstupy a <br /><span className="text-[#E10600]">Permanentky</span>
            </h1>
            <div className="grid gap-6">
              {passes.map((p, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-end border-b border-zinc-200 pb-4 group cursor-pointer"
                  onMouseEnter={() => setHoveredPass(i)}
                  onMouseLeave={() => setHoveredPass(null)}
                >
                  <div className="relative">
                    <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-[#E10600] transition-colors">{p.title}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{p.note}</p>
                    {hoveredPass === i && (
                      <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-1 bg-[#E10600]" />
                    )}
                  </div>
                  <div className="text-3xl font-black text-[#E10600] italic transition-transform group-hover:scale-110">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* PRAVÁ STRANA - TMAVÁ + LOGO + PNG BORCI */}
        <div className="w-full lg:w-1/2 h-full bg-zinc-950 relative overflow-hidden flex flex-col items-center justify-center p-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-20 text-center flex flex-col items-center"
          >
            <Image 
              src="/images/brand/f77_full.png"
              alt="Logo Fitness 77"
              width={350}
              height={100}
              className="mb-8 w-[250px] md:w-[380px] h-auto drop-shadow-[0_0_25px_rgba(225,6,0,0.4)]"
            />
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
              TRAINING <span className="text-[#E10600]">NATION</span>
            </h2>
          </motion.div>
          
          {/* PNG HAMÁČEK */}
          <motion.div 
            style={{ y: yHamacek, opacity: opacityTrainers }} 
            className="absolute -top-40 left-[-15%] w-[550px] h-[750px] z-10 pointer-events-none hidden lg:block"
          >
            <Image 
              src="/images/trainers/hlavacek.png" 
              alt="Hamáček"
              fill
              className="object-contain grayscale contrast-125 saturate-150"
            />
          </motion.div>

          {/* PNG SOUSTRUŽNÍK */}
          <motion.div 
            style={{ y: ySoustruznik, opacity: opacityTrainers }} 
            className="absolute top-1/4 -right-[-15%] w-[550px] h-[750px] z-10 pointer-events-none hidden lg:block"
          >
            <Image 
              src="/images/trainers/soustruznik.png" 
              alt="Soustružník"
              fill
              className="object-contain grayscale contrast-125 saturate-150"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-black text-center border-t border-zinc-900">
        <Image 
          src="/images/brand/f77_full.png"
          alt="Logo Footer"
          width={150}
          height={50}
          className="mx-auto mb-6 opacity-30 grayscale"
        />
        <p className="text-zinc-700 text-[10px] uppercase font-bold tracking-[0.5em]">
          F77 — PERFORMANCE DESIGN — WORLD CLASS *smrk*
        </p>
      </footer>
    </div>
  );
}

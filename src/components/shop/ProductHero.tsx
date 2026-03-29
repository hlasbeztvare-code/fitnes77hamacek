"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductHero() {
  const addToCart = () => {
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
    console.log("PŘIDÁNO DO KOŠÍKU");
    alert("PŘIDÁNO DO KOŠÍKU - JEDEME BOMBY!");
  };

  return (
    <section className="relative bg-[#0A0A0A] min-h-screen overflow-hidden flex items-center pt-20">
      <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* LEVÁ STRANA */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#E10600] text-white text-[10px] font-black px-4 py-1.5 w-fit tracking-widest">
            #1 SUPLEMENTY V ČESKÉ REPUBLICE
          </div>
          <h2 className="text-[14vw] lg:text-[10vw] font-black leading-[0.7] tracking-tighter text-white">
            PŘEKONÁVEJ<br />SVÉ<br />
            <span className="text-white/20" style={{ WebkitTextStroke: '1px white' }}>LIMITY</span>
          </h2>
          <p className="text-zinc-500 text-xs font-black max-w-sm tracking-widest">
            PRÉMIOVÉ SUPLEMENTY A VYBAVENÍ PRO SPARTÁNSKÉ VÁLEČNÍKY. LABORATORNĚ TESTOVÁNO. BRUTÁLNÍ VÝSLEDKY.
          </p>
          <div className="flex gap-4 mt-4">
             <button className="bg-[#E10600] text-white px-10 py-4 text-[11px] font-black tracking-[0.2em] shadow-2xl">🛒 NAKUPOVAT</button>
             <button className="border border-white/20 text-white px-10 py-4 text-[11px] font-black tracking-[0.2em]">🔥 AKCE -30%</button>
          </div>
        </div>

        {/* PRAVÁ STRANA - PRODUKT */}
        <div className="relative flex justify-center items-center">
          <div className="absolute top-0 right-[-10%] w-[120%] h-full bg-[#E10600] skew-x-[-15deg] z-0"></div>
          
          <div className="relative z-10 w-full aspect-square max-w-[600px]">
            <Image 
              src="/images/products/protein_blueberry.png" 
              alt="80% WHEY PROTEIN" 
              fill 
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
            />
            
            {/* TY TŘI KOKOTINY - POSUNUTO VÍC DOPRAVA (smrk) */}
            <div className="absolute top-[15%] right-[-15%] flex flex-col gap-10 items-end">
              <div className="bg-black text-white p-2 px-4 border-l-4 border-[#E10600] translate-x-12 shadow-2xl">
                <p className="text-[10px] font-black tracking-widest">🔬 LAB TESTED 100%</p>
              </div>
              <div className="bg-black text-white p-2 px-4 border-l-4 border-[#E10600] translate-x-20 shadow-2xl">
                <p className="text-[10px] font-black tracking-widest">🏆 BESTSELLER #1</p>
              </div>
              <div className="bg-black text-white p-2 px-4 border-l-4 border-[#E10600] translate-x-24 shadow-2xl">
                <p className="text-[10px] font-black tracking-widest">⭐ RATING 4.9/5</p>
              </div>
            </div>

            {/* TLAČÍTKO - TEĎ UŽ FUNGUJE (smrk) */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={addToCart}
              className="absolute bottom-[-5%] right-0 bg-black text-white px-12 py-6 font-black text-xs tracking-[0.3em] flex items-center gap-4 hover:bg-zinc-900 transition-all border border-white/10 shadow-2xl cursor-pointer pointer-events-auto"
            >
              <span className="text-[#E10600]">⚡</span> PŘIDAT DO KOŠÍKU
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

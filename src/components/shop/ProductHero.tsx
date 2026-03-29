"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductHero() {
  const addToCart = () => {
    // Tady triggerujeme haptiku a košík
    if (navigator.vibrate) navigator.vibrate(20);
    console.log("PŘIDÁNO DO KOŠÍKU");
    // Sem pak napojíš svůj cart context
  };

  return (
    <section className="relative bg-[#0A0A0A] min-h-[90vh] overflow-hidden flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* LEVÁ STRANA - TEXTY */}
        <div className="flex flex-col gap-8">
          <div className="inline-block px-3 py-1 bg-[#E10600] text-[10px] font-black uppercase italic tracking-widest w-fit">
            #1 SUPLEMENTY V ČESKÉ REPUBLICE
          </div>
          <h2 className="text-[8vw] lg:text-[6vw] font-black uppercase italic leading-[0.8] tracking-tighter">
            PŘEKONÁVEJ<br />SVÉ<br />
            <span className="text-white opacity-20" style={{ WebkitTextStroke: '1px white' }}>LIMITY</span>
          </h2>
          <p className="max-w-md text-zinc-500 text-sm font-bold uppercase italic leading-relaxed">
            PRÉMIOVÉ SUPLEMENTY A VYBAVENÍ PRO SPARTÁNSKÉ VÁLEČNÍKY. LABORATORNĚ TESTOVÁNO. BRUTÁLNÍ VÝSLEDKY.
          </p>
          <div className="flex gap-4">
            <button className="px-10 py-4 bg-[#E10600] text-white font-black uppercase italic text-xs tracking-widest hover:bg-white hover:text-black transition-all">
              NAKUPOVAT
            </button>
            <button className="px-10 py-4 border border-white/20 text-white font-black uppercase italic text-xs tracking-widest hover:bg-white/10 transition-all">
              🔥 AKCE -30%
            </button>
          </div>
          
          {/* STATS */}
          <div className="flex gap-12 mt-12 border-t border-white/5 pt-12">
            <div>
              <p className="text-3xl font-black italic text-white tracking-tighter">5000+</p>
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.2em]">SPOKOJENÝCH ZÁKAZNÍKŮ</p>
            </div>
            <div>
              <p className="text-3xl font-black italic text-white tracking-tighter">150+</p>
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.2em]">PRODUKTŮ V NABÍDCE</p>
            </div>
            <div>
              <p className="text-3xl font-black italic text-white tracking-tighter text-[#E10600]">4.9/5</p>
              <p className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.2em]">POZITIVNÍCH RECENZÍ</p>
            </div>
          </div>
        </div>

        {/* PRAVÁ STRANA - PRODUKT A TY "PÍČOVINKY" */}
        <div className="relative h-full flex items-center justify-center">
          {/* Červený šikmý podklad */}
          <div className="absolute top-0 right-[-20%] w-[120%] h-full bg-[#E10600] skew-x-[-15deg] z-0"></div>
          
          <div className="relative z-10 w-full aspect-square max-w-[600px]">
            <Image 
              src="/images/products/protein_blueberry.png" 
              alt="Ultra CFM Whey Protein" 
              fill 
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
            />
            
            {/* TY TŘI PÍČOVINKY - POSUNUTO VÍC DOPRAVA */}
            <div className="absolute top-[10%] right-[-10%] flex flex-col gap-12 items-end">
              <div className="bg-black text-white p-2 px-4 border-l-2 border-[#E10600] translate-x-12">
                <p className="text-[10px] font-black uppercase italic tracking-tighter">🔬 LAB TESTED 100%</p>
              </div>
              <div className="bg-black text-white p-2 px-4 border-l-2 border-[#E10600] translate-x-20">
                <p className="text-[10px] font-black uppercase italic tracking-tighter">🏆 BESTSELLER #1</p>
              </div>
              <div className="bg-black text-white p-2 px-4 border-l-2 border-[#E10600] translate-x-24">
                <p className="text-[10px] font-black uppercase italic tracking-tighter">⭐ RATING 4.9/5</p>
              </div>
            </div>

            {/* TLAČÍTKO PŘIDAT DO KOŠÍKU - TEĎ UŽ BUDE FUNGOVAT */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className="absolute bottom-[-5%] right-0 bg-black text-white px-12 py-6 font-black uppercase italic text-sm tracking-[0.3em] flex items-center gap-4 hover:bg-zinc-900 transition-all border border-white/10 shadow-2xl z-[20] cursor-pointer"
            >
              <span className="text-[#E10600]">⚡</span> PŘIDAT DO KOŠÍKU
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}

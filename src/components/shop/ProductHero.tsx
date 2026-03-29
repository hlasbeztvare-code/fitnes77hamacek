"use client";
import React from 'react';
import Image from 'next/image';

export default function ProductHero() {
  return (
    <section className="relative bg-[#0A0A0A] min-h-screen overflow-hidden flex items-center pt-20">
      <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="flex flex-col gap-6">
          <div className="bg-[#E10600] text-white text-[10px] font-black px-4 py-1.5 w-fit tracking-widest">
            #1 SUPLEMENTY V ČESKÉ REPUBLICE
          </div>
          <h2 className="text-[14vw] lg:text-[10vw] font-black leading-[0.75] tracking-tighter text-white">
            PŘEKONÁVEJ<br />SVÉ<br />
            <span className="text-white/20" style={{ WebkitTextStroke: '1.5px white' }}>LIMITY</span>
          </h2>
          <p className="text-zinc-500 text-xs font-black max-w-sm tracking-[0.2em]">
            PRÉMIOVÉ SUPLEMENTY A VYBAVENÍ PRO SPARTÁNSKÉ VÁLEČNÍKY. LABORATORNĚ TESTOVÁNO. BRUTÁLNÍ VÝSLEDKY.
          </p>
          <div className="flex gap-4 mt-8">
             <button className="bg-white text-black px-12 py-5 text-[11px] font-black tracking-[0.3em] hover:bg-[#E10600] hover:text-white transition-all">NAKUPOVAT →</button>
             <button className="border-2 border-white/10 text-white px-12 py-5 text-[11px] font-black tracking-[0.3em]">AKCE -30%</button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="absolute top-0 right-[-10%] w-[120%] h-full bg-[#E10600] skew-x-[-15deg] z-0"></div>
          <div className="relative z-10 w-full aspect-square max-w-[650px]">
            <Image src="/images/products/protein_blueberry.png" alt="PROTEIN" fill className="object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.7)]" />
            
            <div className="absolute top-[20%] right-[-5%] flex flex-col gap-8 items-end">
              <div className="bg-black text-white p-3 px-6 border-l-4 border-[#E10600] shadow-2xl">
                <p className="text-[11px] font-black tracking-widest">LAB TESTED 100%</p>
              </div>
              <div className="bg-black text-white p-3 px-6 border-l-4 border-[#E10600] shadow-2xl">
                <p className="text-[11px] font-black tracking-widest">BESTSELLER #1</p>
              </div>
              <div className="bg-black text-white p-3 px-6 border-l-4 border-[#E10600] shadow-2xl">
                <p className="text-[11px] font-black tracking-widest">RATING 4.9/5</p>
              </div>
            </div>

            <button className="absolute bottom-0 right-0 bg-white text-black px-12 py-6 font-black text-xs tracking-[0.3em] shadow-2xl hover:bg-[#E10600] hover:text-white transition-all">
              PŘIDAT DO KOŠÍKU
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

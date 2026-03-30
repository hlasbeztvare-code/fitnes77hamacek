"use client";
import React from 'react';

export default function ProductCard() {
  return (
    <div className="max-w-6xl mx-auto my-10 flex flex-col md:flex-row bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden group border border-zinc-100">
      <div className="md:w-1/2 bg-zinc-50 flex items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-black text-9xl italic select-none">F77</div>
        <img 
          src="/omega3.png" 
          alt="Omega 3" 
          className="w-full max-w-[320px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
      </div>

      <div className="md:w-1/2 p-12 flex flex-col justify-center text-black">
        <span className="text-red-600 font-black italic uppercase text-[10px] tracking-[0.4em] mb-4">FITNESS 77 SUPPLEMENT</span>
        <h2 className="font-[1000] italic uppercase text-5xl tracking-tighter leading-[0.85] mb-6">
          BCAA AMINO<br/>COMPLEX
        </h2>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-4xl font-[1000] italic text-red-600 tracking-tighter">1 499 Kč</span>
          <span className="text-zinc-300 line-through font-bold italic text-xl">1 999 Kč</span>
        </div>

        <div className="flex flex-col gap-4">
          <button className="bg-red-600 text-white font-black italic uppercase py-5 skew-x-[-12deg] hover:bg-black transition-all shadow-xl active:scale-95 text-lg">
            <span className="inline-block skew-x-[12deg]">PŘIDAT DO KOŠÍKU</span>
          </button>
          <button className="border-2 border-black text-black font-black italic uppercase py-3 hover:bg-black hover:text-white transition-all text-sm tracking-widest">
            ZJISTIT VÍCE O PRODUKTU
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-100 flex gap-6 text-[9px] font-black italic uppercase text-zinc-400">
          <span className="flex items-center gap-2 underline decoration-green-500 decoration-2 underline-offset-4">SKLADEM V PRAZE</span>
          <span className="flex items-center gap-2 underline decoration-red-600 decoration-2 underline-offset-4">DOPRAVA ZDARMA</span>
        </div>
      </div>
    </div>
  );
}

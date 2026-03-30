import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-[70vh] bg-black flex items-center overflow-hidden border-b border-zinc-900">
      {/* Velkej agresivní nápis na pozadí (smrk) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <h1 className="text-[25vw] font-[1000] italic uppercase tracking-tighter text-white">
          77
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <span className="text-red-600 font-black italic uppercase tracking-[0.4em] text-sm mb-4 block">
            The Hardest Gym in Prague
          </span>
          <h2 className="text-white font-[1000] italic uppercase text-6xl md:text-8xl tracking-tighter leading-[0.85] mb-8">
            LIMITS ARE <br />FOR LOSERS. (smrk)
          </h2>
          <div className="flex gap-4">
            <button className="bg-white text-black font-black italic uppercase px-8 py-4 skew-x-[-12deg] hover:bg-red-600 hover:text-white transition-all shadow-xl">
              <span className="inline-block skew-x-[12deg]">VSTOUPIT DO GYMU</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

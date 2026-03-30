import React from 'react';

// Tady máš ty svoje fotky z fitka (smrk)
const gymImages = ['/gym/1.jpg', '/gym/2.jpg', '/gym/3.jpg', '/gym/4.jpg', '/gym/5.jpg', '/gym/6.jpg'];

export default function GymGallery() {
  return (
    <section className="bg-black py-4 border-y border-zinc-900 overflow-hidden">
      {/* Nadpis skoro neviditelnej, jen pro styl (smrk) */}
      <div className="px-4 mb-2">
        <h2 className="text-[10px] text-zinc-600 font-black italic uppercase tracking-[0.2em]">
          Inside the Gym
        </h2>
      </div>

      {/* Grid: 6 sloupců i na mobilu, aby ty fotky byly fakt malý (smrk) */}
      <div className="grid grid-cols-6 gap-1 px-1">
        {gymImages.map((src, i) => (
          <div key={i} className="aspect-square bg-zinc-950 border border-zinc-900 overflow-hidden">
            <img 
              src={src} 
              alt="Gym detail" 
              className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

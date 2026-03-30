"use client"; // Tohle tam chybělo, koukoute! (smrk)
import React from 'react';

const images = [
  { id: 1, src: '/gallery/1.jpg' },
  { id: 2, src: '/gallery/2.jpg' },
  { id: 3, src: '/gallery/3.jpg' },
  { id: 4, src: '/gallery/4.jpg' },
  { id: 5, src: '/gallery/5.jpg' },
  { id: 6, src: '/gallery/6.jpg' },
];

export default function Gallery() {
  return (
    <section className="bg-black py-6 border-t border-zinc-900">
      <div className="px-4 mb-4">
        <h2 className="text-[10px] text-zinc-600 font-black italic uppercase tracking-[0.3em]">
          #FITNESS77 LIFESTYLE
        </h2>
      </div>
      
      <div className="grid grid-cols-6 gap-1 px-1">
        {images.map((img) => (
          <div key={img.id} className="aspect-square bg-zinc-950 border border-zinc-900 overflow-hidden group">
            <img 
              src={img.src} 
              alt="Gym Life" 
              className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-crosshair"
              onError={(e) => {
                // Pokud fotka chybí, schováme ji, ať to nedělá ostudu (smrk)
                (e.currentTarget as HTMLImageElement).style.opacity = '0';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

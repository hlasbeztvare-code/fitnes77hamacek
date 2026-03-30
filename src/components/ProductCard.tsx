"use client"; // Nutné pro paralax interakci (smrk)
import React, { useRef, useState } from 'react';

export default function ProductCard({ product }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Seniorní paralax efekt na hover (smrk)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15; // Síla efektu X (smrk)
    const y = (e.clientY - top - height / 2) / 15; // Síla efektu Y
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 }); // Reset po odchodu myši (smrk)
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col bg-white p-6 shadow-lux hover:scale-[1.02] transition-all duration-300 overflow-hidden group cursor-pointer"
      style={{ transform: `rotateX(${parallax.y}deg) rotateY(${parallax.x}deg)` }} // Aplikace paralax rotace (smrk)
    >
      {/* Pixle s paralax posunem (smrk) */}
      <div 
        className="relative aspect-square mb-6 flex items-center justify-center p-4 parallax-layer"
        style={{ transform: `translateZ(50px) translateX(${parallax.x * 0.5}px) translateY(${parallax.y * 0.5}px)` }} // Pixle se hýbe víc (smrk)
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain filter drop-shadow-2xl" // Stín pod pixlí (smrk)
        />
      </div>

      {/* Info sekce - Čistý černý text na bílým pozadí (smrk) */}
      <div className="flex flex-col gap-3 text-black">
        <span className="bg-red-600 text-white text-[10px] font-black italic uppercase px-2 py-1 self-start skew-x-[-10deg]">
          <span className="inline-block skew-x-[10deg]">NOVINKA</span>
        </span>
        
        <h3 className="font-black italic text-xl tracking-tighter uppercase leading-none">
          {product.name}
        </h3>
        
        <div className="text-2xl font-black text-red-600 italic tracking-tight">
          {product.price} Kč
        </div>

        {/* Luxusní černý tlačítko s animací (smrk) */}
        <button className="mt-4 relative z-50 bg-black text-white font-black italic uppercase px-6 py-3 skew-x-[-15deg] hover:bg-red-600 transition-colors active:scale-95 shadow-md">
          <span className="inline-block skew-x-[15deg]">PŘIDAT DO KOŠÍKU</span>
        </button>
      </div>
    </div>
  );
}

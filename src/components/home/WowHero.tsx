'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// ... (animace slideLeft, slideRight, fadeUp zůstávají)

export default function WowHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force loading videa hned po mountu
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Natvrdo řekneme prohlížeči: "Makej, nahrávej!"
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] md:h-[95vh] w-full flex flex-col overflow-hidden bg-[#050505]" aria-label="Hlavní banner">
      {/* Background Video - Optimalizované pro bleskové načtení */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          src="/hero-eshop.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto" // Klíčová vlastnost pro načítání dopředu
          poster="/images/hero/hero.webp" // Placeholder, než se video spustí
          className="w-full h-full object-cover opacity-70 transition-opacity duration-1000"
          onCanPlayThrough={(e) => {
            // Jakmile je video schopné hrát bez sekání, můžeme třeba vypnout skeleton
            (e.target as HTMLVideoElement).classList.remove('opacity-0');
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.8)_90%)] pointer-events-none" />
      </div>

      {/* Zbytek obsahu (Stats Bar, Nadpisy, Tlačítka) - viz předchozí fix pro mobile */}
      {/* ... */}
    </section>
  );
}
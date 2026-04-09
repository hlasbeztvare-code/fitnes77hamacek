"use client";

import { useState, useEffect } from 'react';

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
};

export default function StickyMobileBuy({ product }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (product.price <= 0) return null;

  return (
    <div
      className={`md:hidden fixed bottom-5 left-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={() => {
          // Dispatch custom event AddToCartButton will listen to
          window.dispatchEvent(new CustomEvent('sticky-add-to-cart', { detail: product }));
        }}
        className="w-full bg-[#E10600] text-white font-black text-base uppercase tracking-[0.2em] py-4 px-6 shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
      >
        <span>🛒</span>
        <span>KOUPIT — {product.price.toLocaleString('cs-CZ')} Kč</span>
      </button>
    </div>
  );
}

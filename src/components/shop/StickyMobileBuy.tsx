"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/hooks/useCartStore';

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    variantCode?: string;
  };
};

export default function StickyMobileBuy({ product }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (product.price <= 0) return null;

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      variantCode: product.variantCode,
    });
    // AGRESIVNÍ PŘESMĚROVÁNÍ (L-CODE REDIRECT STRATEGY)
    router.push('/cart');
  };

  return (
    <div
      className={`md:hidden fixed bottom-5 left-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={handleBuyNow}
        className="f77-button-master w-full bg-black text-white py-4 px-6 shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all border-b-4 border-[#E10600]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E10600] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E10600]"></span>
        </span>
        <span className="uppercase font-black tracking-widest">Koupit hned</span>
      </button>
    </div>
  );
}
// "Zameť stopy" - Redirect logic implementován. smrk

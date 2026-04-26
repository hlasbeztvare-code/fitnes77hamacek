'use client';

import { useEffect, useState, useRef } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Stránka košíku | GOLIÁŠ Seamless Bridge v2.0
 * Optimalizováno pro eliminaci všech race conditions a nechtěných redirectů.
 */
export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'checking' | 'preparing' | 'empty'>('checking');
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;

    // Grace period: Počkáme 50ms na stabilizaci stavu pro pomalejší persistence
    const timer = setTimeout(() => {
      if (items.length === 0) {
        setStatus('empty');
      } else if (!hasTriggered.current) {
        hasTriggered.current = true;
        setStatus('preparing');

        // Sestavení Shoptet URL - PŘIDÁNA LOMÍTKA A ENCODING (Oprava 404)
        const shoptetBaseUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
        const query = items.map(i => {
          const code = i.variantCode || i.shoptetId || i.slug;
          return `products[${encodeURIComponent(code)}]=${i.quantity}`;
        }).join('&');
        
        const finalUrl = `${shoptetBaseUrl}?${query}`;

        // Přesměrování po vizuální pauze
        setTimeout(() => {
          window.location.href = finalUrl;
        }, 1200);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [items, hasHydrated]);

  // STAV: PRÁZDNÝ KOŠÍK (Místo tvrdého redirectu, který zlobil)
  if (status === 'empty') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md"
        >
          <span className="text-[#E10600] font-black text-6xl mb-6 block">!</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Košík je <span className="text-[#E10600]">prázdný</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">Zdá se, že sypání zůstalo v regálu.</p>
          <Link href="/supplements" className="inline-block bg-white text-black px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-[#E10600] hover:text-white transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]">
             ZPĚT DO OBCHODU
          </Link>
        </motion.div>
      </div>
    );
  }

  // STAV: PŘÍPRAVA (Loader)
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-8">
          <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_50px_rgba(225,6,0,0.2)]"></div>
          <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Příprava <span className="text-[#E10600]">objednávky</span>
          </h1>
          <p className="mt-4 text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
            Směřujeme do Shoptet pokladny...
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// clean code comment: Cart Logic v2.0. Race condition eliminována skrze status-based rendering. smrk



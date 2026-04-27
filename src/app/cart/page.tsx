'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * GOLIÁŠ Sync Engine v17.0 - "The Silent Assassin"
 * 
 * Production-ready Bridge. Čistý loading, tichý sync, 
 * okamžitý redirect. Žádný šum. smrk
 */

function CartBridgeContent() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'empty'>('idle');
  const hasTriggered = useRef(false);

  const startSync = async () => {
    if (items.length === 0) return;
    setStatus('sending');
    
    try {
      const res = await fetch('/api/cart/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = 'https://obchod.fit77.cz/objednavka/';
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    if (hasHydrated && items.length > 0 && !hasTriggered.current) {
      hasTriggered.current = true;
      startSync();
    } else if (hasHydrated && items.length === 0) {
      setStatus('empty');
    }
  }, [hasHydrated, items.length]);

  if (!hasHydrated) return null;

  if (status === 'empty') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 text-zinc-500 italic">Košík je prázdný</h1>
          <button onClick={() => window.location.href = '/'} className="text-[#E10600] font-black uppercase tracking-widest text-[10px]">Zpět do obchodu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <AnimatePresence mode="wait">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 1.05 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              width={180}
              height={45}
              className="mx-auto brightness-0 invert"
              priority
            />
          </div>

          {/* Spinner */}
          <div className="relative h-24 w-24 mx-auto mb-12">
            <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin shadow-[0_0_50px_rgba(225,6,0,0.3)]"></div>
          </div>

          {/* Text */}
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white mb-4 italic">
            Příprava <span className="text-[#E10600]">objednávky</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">
            Synchronizujeme tvoji session se Shoptetem...
          </p>

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="mt-12"
            >
              <button 
                onClick={() => { hasTriggered.current = false; startSync(); }}
                className="bg-[#E10600] text-white px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:brightness-110 transition-all"
              >
                Zkusit znovu
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartBridgeContent />
    </Suspense>
  );
}
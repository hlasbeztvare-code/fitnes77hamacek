'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * GOLIÁŠ Sync Engine v16.7 - "The Automatic Tunnel"
 * 
 * Strategie: Automaticky pálí sync po vstupu na stránku. 
 * Pokud selže, ukáže chybu a tlačítko pro ruční pokus. smrk
 */

function CartBridgeContent() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'idle' | 'sending' | 'empty' | 'error'>('idle');
  const hasTriggered = useRef(false);

  // GOLIÁŠ v16.7: Jádro synchronizace
  const startSync = async () => {
    if (items.length === 0) return;
    setStatus('sending');
    
    try {
      console.log('🚀 GOLIÁŠ: Spouštím sync přes proxy...');
      const res = await fetch('/api/cart/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      console.log('📦 GOLIÁŠ Proxy Response:', data);

      if (data.success) {
        console.log('✅ GOLIÁŠ: Sync OK, přesměrovávám na Shoptet...');
        window.location.href = 'https://obchod.fit77.cz/objednavka/';
      } else {
        throw new Error(data.error || 'Proxy failed');
      }
    } catch (err) {
      console.error('❌ GOLIÁŠ Sync Error:', err);
      setStatus('error');
    }
  };

  // Auto-start při loadu
  useEffect(() => {
    if (hasHydrated && items.length > 0 && !hasTriggered.current) {
      hasTriggered.current = true;
      startSync();
    } else if (hasHydrated && items.length === 0) {
      setStatus('empty');
    }
  }, [hasHydrated, items.length]);

  const handleCancel = () => {
    useCartStore.getState().openCart();
    window.location.href = '/';
  };

  if (!hasHydrated) return null;

  if (status === 'empty') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">!</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Košík je <span className="text-[#E10600]">prázdný</span></h1>
          <Link href="/supplements" className="inline-block bg-white text-black px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-[#E10600] hover:text-white transition-all">
            ZPĚT DO OBCHODU
          </Link>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center text-zinc-400">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">Chyba <span className="text-[#E10600]">synchronizace</span></h1>
          <p className="mb-8 font-medium italic">Shoptet session se nepodařilo navázat. Zkus to znovu.</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => startSync()}
              className="bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_20px_50px_rgba(225,6,0,0.3)]"
            >
              ZKUSIT ZNOVU
            </button>
            <button onClick={handleCancel} className="text-[10px] font-black uppercase tracking-widest hover:text-white">
              Zpět do obchodu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
      <div className="w-full max-w-xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          <div className="mb-12">
            <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_50px_rgba(225,6,0,0.2)]"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl mb-2">
              Příprava <span className="text-[#E10600]">košíku</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
              Sypeme tvoji objednávku do Shoptetu...
            </p>
          </div>
          
          <div className="flex justify-between items-end mb-12 px-2 border-t border-white/5 pt-8">
            <span className="text-zinc-500 font-black uppercase tracking-[0.2em] text-xs">Celková hodnota</span>
            <span className="text-4xl font-black tracking-tighter text-white">
              {totalPrice.toLocaleString('cs-CZ')} <span className="text-[#E10600]">Kč</span>
            </span>
          </div>

          <button 
            onClick={handleCancel}
            className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[9px] hover:text-white transition-colors"
          >
            Zrušit synchronizaci
          </button>
        </motion.div>
      </div>
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
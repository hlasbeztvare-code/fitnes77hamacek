'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { resolveShoptetIds } from '@/lib/shoptet-map';

/**
 * GOLIÁŠ Sync Engine v15.1 - "The Dirty Millionaire"
 * 
 * Strategie: Používá skrytý auto-submit formulář. 
 * Výhoda: Prohlížeč při odeslání formuláře automaticky přibalí cookies, 
 * což serverová proxy neuměla. Tohle je cesta k milionu. smrk
 */

function CartBridgeContent() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'idle' | 'sending' | 'empty' | 'error'>('idle');
  const clearCart = useCartStore((state) => state.clearCart);
  // GOLIÁŠ v16.4: Manuální odpal přes DB-Fix Proxy
  const handleCheckout = async () => {
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
        // Shoptet session by měla být díky cookie forwardingu v proxy aktivní
        window.location.href = 'https://obchod.fit77.cz/objednavka/';
      } else {
        throw new Error(data.error || 'Proxy failed');
      }
    } catch (err) {
      console.error('❌ Proxy Sync Error:', err);
      // Fallback: Pokud proxy selže, zkusíme aspoň přímý skok
      window.location.href = 'https://obchod.fit77.cz/objednavka/';
    }
  };

  const handleCancel = () => {
    useCartStore.getState().openCart();
    window.location.href = '/';
  };

  if (!hasHydrated) return null;

  if (items.length === 0) {
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

  // Příprava dat pro skrytý formulář
  const shoptetItemsForForm = items.map(item => {
    const ids = resolveShoptetIds(item.slug, item.variantCode);
    return {
      priceId: ids?.priceId,
      amount: item.quantity,
    };
  }).filter(i => i.priceId);

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
        >
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl mb-2">
              Tvoje <span className="text-[#E10600]">Objednávka</span>
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              Poslední kontrola před vstupem do pokladny
            </p>
          </div>

          <div className="flex justify-between items-end mb-8 px-2">
            <span className="text-zinc-500 font-black uppercase tracking-[0.2em] text-xs">Celková hodnota</span>
            <span className="text-4xl font-black tracking-tighter text-white">
              {totalPrice.toLocaleString('cs-CZ')} <span className="text-[#E10600]">Kč</span>
            </span>
          </div>

          <div className="space-y-6 mb-12">
            <button
              onClick={handleCheckout}
              disabled={status === 'sending'}
              className="w-full bg-[#E10600] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xl hover:brightness-110 transition-all shadow-[0_20px_50px_rgba(225,6,0,0.3)] disabled:opacity-50 disabled:cursor-wait relative overflow-hidden"
            >
              <span className={status === 'sending' ? 'opacity-0' : 'opacity-100'}>
                DOKONČIT OBCHOD
              </span>
              {status === 'sending' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-sm font-bold">PŘIPRAVUJI POKLADNU...</span>
                </div>
              )}
            </button>
          </div>

          <div className="space-y-4 mb-8 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar opacity-60">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Rekapitulace sypání:</p>
            {items.map(item => (
              <div key={`${item.id}-${item.variantCode}`} className="flex justify-between items-center py-2 border-b border-white/5 group">
                <div>
                  <h3 className="font-black uppercase text-[11px] tracking-wide group-hover:text-[#E10600] transition-colors">
                    {item.name}
                  </h3>
                  {item.variantName && (
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                      {item.variantName}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-black text-[11px]">{item.quantity} ks</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleCancel}
              disabled={status === 'sending'}
              className="w-full py-2 text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
            >
              Zpět k výběru produktů
            </button>
          </div>
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
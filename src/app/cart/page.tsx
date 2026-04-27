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
  const [status, setStatus] = useState<'checking' | 'preparing' | 'sending' | 'empty' | 'error' | 'success'>('checking');
  const clearCart = useCartStore((state) => state.clearCart);
  const hasTriggered = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!hasHydrated) return;
    if (items.length === 0) { setStatus('empty'); return; }
    if (hasTriggered.current) return;

    const prepareSync = async () => {
      hasTriggered.current = true;
      setStatus('preparing');

      // GOLIÁŠ v15.1: Příprava dat pro Truth Edition
      const shoptetItems = items.map(item => {
        const ids = resolveShoptetIds(item.slug, item.variantCode);
        return {
          priceId: ids?.priceId,
          amount: item.quantity,
        };
      }).filter(i => i.priceId);

      if (shoptetItems.length === 0) {
        setStatus('empty');
        return;
      }

      // Malá pauza na wow-efekt designu
      setTimeout(() => {
        setStatus('sending');
        // AUTO-SUBMIT: Tohle je ta prasárna, co funguje.
        if (formRef.current) {
          formRef.current.submit();
        }
      }, 1500);
    };

    prepareSync();
  }, [items, hasHydrated]);

  const handleCancel = () => {
    hasTriggered.current = true;
    useCartStore.getState().openCart();
    window.location.href = '/';
  };

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Chyba <span className="text-[#E10600]">košíku</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">Synchronizace se nezdařila. Zkusíme to vyčistit.</p>
          <button
            onClick={() => { 
              localStorage.removeItem('fitness77-cart');
              clearCart(); 
              window.location.href = '/'; 
            }}
            className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)] shadow-[0_20px_50px_rgba(225,6,0,0.3)]"
          >
            VYČISTIT A ZKUSIT ZNOVU
          </button>
        </motion.div>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
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

  // Příprava dat pro skrytý formulář
  const shoptetItemsForForm = items.map(item => {
    const ids = resolveShoptetIds(item.slug, item.variantCode);
    return {
      priceId: ids?.priceId,
      amount: item.quantity,
    };
  }).filter(i => i.priceId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
      <AnimatePresence mode="wait">
        <motion.div 
          key={status}
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_50px_rgba(225,6,0,0.2)]"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
              Příprava <span className="text-[#E10600]">košíku</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
              {status === 'sending' ? 'Právě sypeme produkty do Shoptetu...' : 'Synchronizujeme tvou session...'}
            </p>
          </div>
          
          <div className="mt-12 max-w-sm mx-auto space-y-2 opacity-60">
            {items.map(item => (
              <div key={`${item.id}-${item.variantCode}`} className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-2">
                <span className="truncate pr-4">{item.name} {item.variantName && `(${item.variantName})`}</span>
                <span className="flex-none">{item.quantity} ks</span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button onClick={handleCancel} className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto">
              <span className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
              Zrušit a upravit produkty
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* GOLIÁŠ "FINAL STRIKE" FORM (v15.2) */}
      <form 
        ref={formRef} 
        action="https://obchod.fit77.cz/action/Cart/addBatch/" 
        method="POST" 
        className="hidden"
      >
        {shoptetItemsForForm.map((item, idx) => (
          <div key={`form-item-${idx}`}>
            <input type="hidden" name={`priceId[${idx}]`} value={item.priceId!} />
            <input type="hidden" name={`amount[${idx}]`} value={item.amount} />
          </div>
        ))}
        <input type="hidden" name="returnUrl" value="/objednavka/" />
      </form>
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
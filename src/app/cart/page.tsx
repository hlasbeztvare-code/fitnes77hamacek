'use client';

import { useEffect, useState, useRef } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Shoptet priceId mapa — ověřeno z Network tabu
const PRICE_ID_MAP: Record<string, { priceId: number; productId: number }> = {
  'creatine-monohydrate---fitness-77': { priceId: 58, productId: 55 },
  'black-dead---pre-workout':          { priceId: 49, productId: 49 },
  'dead-pump---stim-free':             { priceId: 46, productId: 46 },
  'heavy-duty-powerlifting-opasek':    { priceId: 43, productId: 43 },
  'BOR': { priceId: 73, productId: 58 },
  'GRE': { priceId: 67, productId: 58 },
  'MAL': { priceId: 70, productId: 58 },
  'COK': { priceId: 79, productId: 61 },
  'PIS': { priceId: 85, productId: 61 },
  'SLA': { priceId: 82, productId: 61 },
};

function resolveIds(slug: string, variantCode?: string) {
  if (variantCode) {
    // Podporuje formáty: 'GRE', '58/GRE', 'gre'
    const code = variantCode.toUpperCase().split('/').pop() || '';
    if (PRICE_ID_MAP[code]) return PRICE_ID_MAP[code];
  }
  return PRICE_ID_MAP[slug] || null;
}

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'checking' | 'preparing' | 'sending' | 'empty' | 'error'>('checking');
  const clearCart = useCartStore((state) => state.clearCart);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (items.length === 0) { setStatus('empty'); return; }
    if (hasTriggered.current) return;

    const resolved = items.map(i => ({
      item: i,
      ids: resolveIds(i.slug, i.variantCode),
    }));

    if (resolved.some(r => !r.ids)) {
      console.error('❌ Chybí priceId pro:', resolved.filter(r => !r.ids).map(r => r.item.slug));
      setStatus('error');
      return;
    }

    setStatus('preparing');

    const timer = setTimeout(async () => {
      if (hasTriggered.current) return;
      hasTriggered.current = true;
      setStatus('sending');

      try {
        const shoptetItems = resolved.map(({ item, ids }) => ({
          priceId: ids!.priceId,
          productId: ids!.productId,
          amount: item.quantity,
        }));

        // Voláme náš server-side proxy (obchází CORS)
        const res = await fetch('/api/cart/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: shoptetItems }),
          credentials: 'include',
        });

        const data = await res.json();

        if (data.success) {
          // Přesměruj na Shoptet pokladnu
          window.location.href = 'https://obchod.fit77.cz/objednavka/';
        } else {
          console.error('Proxy error:', data.error);
          setStatus('error');
        }
      } catch (err) {
        console.error('Cart Bridge Error:', err);
        setStatus('error');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [items, hasHydrated]);

  const handleCancel = () => {
    hasTriggered.current = true;
    useCartStore.getState().openCart();
    window.history.back();
  };

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Chyba <span className="text-[#E10600]">košíku</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">V košíku jsou stará data. Musíme to vyčistit.</p>
          <button
            onClick={() => { clearCart(); setStatus('empty'); }}
            className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)] shadow-[0_20px_50px_rgba(225,6,0,0.3)]"
          >
            VYČISTIT KOŠÍK A ZKUSIT ZNOVU
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_50px_rgba(225,6,0,0.2)]"></div>
          <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Příprava <span className="text-[#E10600]">objednávky</span>
          </h1>
          <p className="mt-4 text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
            {status === 'sending' ? 'Odesílám do Shoptet...' : 'Směřujeme do Shoptet pokladny...'}
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
    </div>
  );
}
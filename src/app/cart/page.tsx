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
  const [status, setStatus] = useState<'checking' | 'preparing' | 'empty' | 'error'>('checking');
  const clearCart = useCartStore((state) => state.clearCart);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;

    let timer: NodeJS.Timeout;

    if (items.length === 0) {
      setStatus('empty');
    } else if (!hasTriggered.current) {
      // Kontrola, zda mají VŠECHNY produkty ID/kód
      const hasMissingIds = items.some(i => !(i.variantCode || i.shoptetId));

      if (hasMissingIds) {
        console.error("❌ Detekovány produkty bez Shoptet ID. Automatický redirect zrušen.");
        setStatus('error');
        return;
      }

      setStatus('preparing');

      // Sestavení Shoptet URL
      const shoptetBaseUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
      
      const query = items.map(i => {
        const code = i.variantCode || i.shoptetId;
        return `products[${encodeURIComponent(code!)}]=${i.quantity}`;
      }).join('&');
      
      const finalUrl = `${shoptetBaseUrl}?${query}`;

      // Přesměrování po vizuální pauze (HIDDEN FORM BRIDGE LOGIC v6.0)
      timer = setTimeout(() => {
        if (!hasTriggered.current) {
            hasTriggered.current = true;
            
            try {
              // POST na addBatch/ - Ověřeno browser analýzou jako jediná funkční cesta
              const shoptetUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
              const form = document.createElement('form');
              form.method = 'POST';
              form.action = shoptetUrl;
              form.style.display = 'none';

              const params = new URLSearchParams(query);
              params.set('action', 'addBatch'); // Mandatory action parameter

              params.forEach((value, key) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value;
                form.appendChild(input);
              });

              document.body.appendChild(form);
              form.submit();
            } catch (err) {
              console.error("Cart Bridge Error:", err);
              setStatus('error');
            }
        }
      }, 2500); 
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [items, hasHydrated]);

  const handleCancel = () => {
    hasTriggered.current = true; // Zabráníme redirectu v tomto cyklu
    useCartStore.getState().openCart();
    // Vracíme se na supplements, aby uživatel nezůstal na prázdném loaderu
    window.history.back();
  };

  // STAV: CHYBA (Záchranná brzda)
  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-md"
        >
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Chyba <span className="text-[#E10600]">košíku</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">V košíku jsou stará data, která Shoptet odmítá. Musíme to vyčistit.</p>
          <button 
            onClick={() => {
              clearCart();
              setStatus('empty');
            }}
            className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)] shadow-[0_20px_50px_rgba(225,6,0,0.3)]"
          >
             VYČISTIT KOŠÍK A ZKUSIT ZNOVU
          </button>
        </motion.div>
      </div>
    );
  }

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

        <div className="mt-12 max-w-sm mx-auto space-y-2 opacity-60">
           {items.map(item => (
             <div key={`${item.id}-${item.variantCode}`} className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/10 pb-2">
               <span className="truncate pr-4">{item.name} {item.variantName && `(${item.variantName})`}</span>
               <span className="flex-none">{item.quantity} ks</span>
             </div>
           ))}
        </div>

        <div className="mt-12">
          <button 
            onClick={handleCancel}
            className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <span className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
            Zrušit a upravit produkty
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// clean code comment: Cart Logic v2.0. Race condition eliminována skrze status-based rendering. smrk



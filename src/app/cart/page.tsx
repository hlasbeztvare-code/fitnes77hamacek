'use client';

import { useState } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import useMounted from '@/hooks/useMounted';

// GOLIÁŠ v41.0: Real Cart Page (Mezibod před Shoptetem)
export default function CartPage() {
  const { items, increaseItem, decreaseItem, removeItem, totalPrice, clearCart } = useCartStore();
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const mounted = useMounted();
  
  const [status, setStatus] = useState<'idle' | 'preparing' | 'sending' | 'error'>('idle');

  if (!mounted || !hasHydrated) return null;

  // L-CODE BYPASS: Spouští se AŽ po kliknutí na "K POKLADNĚ"
  const handleCheckout = () => {
    setStatus('preparing');

    const resolved = items.map(i => ({
      item: i,
      ids: { productId: i.shoptetProductId, priceId: i.shoptetPriceId }
    }));

    if (resolved.some(r => !r.ids.productId || !r.ids.priceId)) {
      console.error('❌ Chybí shoptetProductId nebo shoptetPriceId pro:', resolved.filter(r => !r.ids.productId || !r.ids.priceId).map(r => r.item.slug));
      setStatus('error');
      return;
    }

    setTimeout(() => {
      setStatus('sending');
      try {
        // GOLIÁŠ Sync - Odpal na Shoptet URL
        const itemsPayload = resolved.map(({ item, ids }) => {
          return `${ids.productId}:${ids.priceId}:${item.quantity}`;
        }).join(',');

        window.location.href = `https://obchod.fit77.cz/?sync_cart=1&items=${itemsPayload}`;
      } catch (err) {
        console.error('Cart Bridge Error:', err);
        setStatus('error');
      }
    }, 1000);
  };

  // 1. CHYBOVÁ OBRAZOVKA
  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Chyba <span className="text-[#E10600]">košíku</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">Nepodařilo se připojit pokladnu. Vyčistěte košík a zkuste to znovu.</p>
          <button
            onClick={() => { clearCart(); setStatus('idle'); }}
            className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]"
          >
            VYČISTIT KOŠÍK
          </button>
        </motion.div>
      </div>
    );
  }

  // 2. NAČÍTACÍ OBRAZOVKA (Během přesměrování na Shoptet)
  if (status === 'preparing' || status === 'sending') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
              Příprava <span className="text-[#E10600]">objednávky</span>
            </h1>
            <p className="mt-4 text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
              {status === 'sending' ? 'Přesměrování na pokladnu...' : 'Ověřování položek...'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. PRÁZDNÝ KOŠÍK
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4 text-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-white/20 font-black text-6xl mb-6 block">!</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Košík je <span className="text-[#E10600]">prázdný</span></h1>
          <p className="text-zinc-500 mb-8 font-medium italic">Zdá se, že sypání zůstalo v regálu.</p>
          <Link href="/supplements" className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]">
            ZPĚT DO OBCHODU
          </Link>
        </motion.div>
      </div>
    );
  }

  // 4. PLNOTUČNÁ STRÁNKA KOŠÍKU (Mezibod)
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">
          Tvůj <span className="text-[#E10600]">Košík</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Výpis produktů */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variantCode || 'base'}`} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white/[0.03] p-4 border border-white/5">
                <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 bg-black overflow-hidden border border-white/5">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                
                <div className="flex-1 text-center sm:text-left min-w-0 w-full sm:w-auto">
                  <h3 className="text-sm md:text-base font-black uppercase truncate tracking-widest">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">{item.variantName}</p>
                  )}
                  <p className="text-[#E10600] font-black text-lg mt-2">{(item.price * item.quantity).toLocaleString('cs-CZ')} Kč</p>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0 bg-black/40 p-2 border border-white/10">
                  <button onClick={() => decreaseItem(item.id, item.variantCode)} className="p-2 text-white/40 hover:text-white transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black text-white">{item.quantity}</span>
                  <button onClick={() => increaseItem(item.id, item.variantCode)} className="p-2 text-white/40 hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" />
                  <button onClick={() => removeItem(item.id, item.variantCode)} className="p-2 text-white/20 hover:text-[#E10600] transition-colors ml-auto sm:ml-0">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sumář a Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/10 p-6 sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6">Shrnutí</h3>
              
              <div className="flex justify-between items-end mb-8 pb-6 border-b border-white/10">
                <span className="text-xs uppercase tracking-widest font-black">Celkem</span>
                <span className="text-3xl font-black text-white">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#E10600] text-white font-black py-5 px-6 flex items-center justify-between transition-all hover:brightness-110 [clip-path:polygon(3%_0,100%_0,97%_100%,0%_100%)] group"
              >
                <span className="uppercase text-lg tracking-[0.2em]">K POKLADNĚ</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// L-CODE DYNAMICS: Tracking disabled. Operational efficiency restored. //
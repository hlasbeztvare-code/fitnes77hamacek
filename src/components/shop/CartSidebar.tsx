'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import useMounted from '@/hooks/useMounted';
import { resolveProductImage } from '@/lib/resolve-image';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const mounted = useMounted();
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const { items, isOpen, closeCart, removeItem, increaseItem, decreaseItem, totalPrice } = useCartStore();

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[11000] bg-black/80 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[11001] w-full max-w-[450px] bg-zinc-950 text-white shadow-2xl flex flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#E10600]" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Váš košík</h2>
                <span className="bg-[#E10600] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button 
                    onClick={async () => {
                      if (isSyncing) return;
                      setIsSyncing(true);
                      // Fallback na lokální navigaci, pokud by Shoptet sync selhal
                      try {
                        const res = await fetch('/api/cart/sync', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ items }),
                        });
                        const data = await res.json();
                        if (data.success && data.shoptetItems) {
                          const form = document.createElement('form');
                          form.method = 'POST';
                          form.action = data.shoptetBaseUrl;
                          data.shoptetItems.forEach((item: any, index: number) => {
                            const idInput = document.createElement('input');
                            idInput.type = 'hidden';
                            idInput.name = `products[${index}][priceId]`;
                            idInput.value = item.priceId.toString();
                            form.appendChild(idInput);

                            const amountInput = document.createElement('input');
                            amountInput.type = 'hidden';
                            amountInput.name = `products[${index}][amount]`;
                            amountInput.value = item.amount.toString();
                            form.appendChild(amountInput);
                          });
                          document.body.appendChild(form);
                          form.submit();
                          return;
                        }
                      } catch (err) {
                        console.error('Sync failed:', err);
                      }
                      router.push('/checkout');
                      closeCart();
                      setIsSyncing(false);
                    }}
                    className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-red-600 transition-colors px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                    disabled={isSyncing}
                  >
                    {isSyncing ? 'Synchronizace...' : 'Zaplatit'}
                  </button>
                )}
                <button 
                  onClick={closeCart}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold uppercase tracking-widest text-zinc-400">Košík je prázdný</p>
                    <p className="text-sm text-zinc-600 mt-2">Doplňte sypání a vraťte se sem.</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="px-8 py-3 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-[#E10600] hover:text-white transition-all"
                  >
                    Pokračovat v nákupu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variantCode || 'base'}`} className="flex gap-4 group">
                        <div className="relative w-24 h-24 bg-white/5 flex-none rounded-lg overflow-hidden border border-white/5">
                          <img
                            src={resolveProductImage(item.image, item.name, item.slug)}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/products/placeholder.webp';
                            }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-sm font-black uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h3>
                              <button 
                                onClick={() => removeItem(item.id, item.variantCode)}
                                className="p-1 text-zinc-600 hover:text-[#E10600] transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            {item.variantName && (
                              <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">{item.variantName}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-white/10 rounded-full bg-white/5">
                              <button 
                                onClick={() => decreaseItem(item.id, item.variantCode)}
                                className="p-1.5 hover:text-[#E10600] transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                              <button 
                                onClick={() => increaseItem(item.id, item.variantCode)}
                                className="p-1.5 hover:text-[#E10600] transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-sm font-black text-[#E10600]">
                              {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sticky Footer CTA - ALWAYS VISIBLE (UX 300%) */}
            {items.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Celková hodnota</span>
                  <span className="text-2xl font-black text-[#E10600]">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
                </div>
                
                <button 
                  onClick={async () => {
                    if (isSyncing) return;
                    setIsSyncing(true);
                    try {
                      const res = await fetch('/api/cart/sync', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items }),
                      });
                      const data = await res.json();
                      if (data.success && data.shoptetItems) {
                        const form = document.createElement('form');
                        form.method = 'POST';
                        form.action = data.shoptetBaseUrl;
                        data.shoptetItems.forEach((item: any, index: number) => {
                          const idInput = document.createElement('input');
                          idInput.type = 'hidden';
                          idInput.name = `products[${index}][priceId]`;
                          idInput.value = item.priceId.toString();
                          form.appendChild(idInput);

                          const amountInput = document.createElement('input');
                          amountInput.type = 'hidden';
                          amountInput.name = `products[${index}][amount]`;
                          amountInput.value = item.amount.toString();
                          form.appendChild(amountInput);
                        });
                        document.body.appendChild(form);
                        form.submit();
                        return;
                      }
                    } catch (err) {
                      console.error('Sync failed:', err);
                    }
                    router.push('/checkout');
                    closeCart();
                    setIsSyncing(false);
                  }}
                  disabled={isSyncing}
                  aria-label={`Přejít k pokladně a zaplatit ${totalPrice()} Kč`}
                  className="w-full flex items-center justify-between bg-[#E10600] text-white px-8 py-7 font-black uppercase tracking-[0.25em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)] shadow-[0_30px_70px_rgba(225,6,0,0.45)] relative z-20 active:scale-[0.98] disabled:opacity-50"
                >
                  <span className="text-sm">{isSyncing ? 'Synchronizace...' : 'Přejít k pokladně'}</span>
                  <ArrowRight className="w-7 h-7" />
                </button>

                <p className="text-[9px] text-zinc-600 text-center font-bold uppercase tracking-widest pt-2">
                  Zabezpečený checkout Fitness 77
                </p>
              </div>
            )}

            {/* Empty Footer - Keep spacing but remove content that is now above */}
            <div className="h-4 bg-zinc-950" />

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// clean code comment: CartSidebar JIT Bridge v9.5. Sync přes hidden form POST eliminuje Ghost košíky. smrk

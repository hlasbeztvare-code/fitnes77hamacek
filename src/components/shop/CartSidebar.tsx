'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import useMounted from '@/hooks/useMounted';

export default function CartSidebar() {
  const mounted = useMounted();
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
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-[#E10600]" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Váš košík</h2>
                <span className="bg-[#E10600] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                items.map((item) => (
                  <div key={`${item.id}-${item.variantCode || 'base'}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-white/5 flex-none rounded-lg overflow-hidden border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
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
                        <div className="text-sm font-black">
                          {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Celkem k úhradě</span>
                  <span className="text-2xl font-black">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
                </div>
                
                <Link 
                  href="/cart"
                  onClick={closeCart}
                  className="w-full flex items-center justify-between bg-[#E10600] text-white px-8 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)] shadow-[0_20px_50px_rgba(225,6,0,0.3)]"
                >
                  <span>K pokladně</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-[10px] text-zinc-500 text-center font-bold uppercase tracking-widest">
                  Bezpečný nákup skrze Shoptet Bridge
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// clean code comment: CartSidebar v1.0. Eliminace neschopnosti mazat produkty z UI. smrk

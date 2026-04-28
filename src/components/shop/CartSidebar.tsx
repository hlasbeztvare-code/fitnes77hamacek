'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/hooks/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import useMounted from '@/hooks/useMounted';
import { resolveProductImage } from '@/lib/resolve-image';

import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const mounted = useMounted();
  const router = useRouter();
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
                    onClick={() => {
                      router.push('/cart');
                      closeCart();
                    }}
                    className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-red-600 transition-colors px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
                  >
                    Pokladna
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
            <div 
              id="cart-items-container"
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide scroll-smooth"
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-zinc-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold uppercase tracking-widest text-zinc-400">Košík je prázdný</p>
                    <p className="text-sm text-zinc-600 mt-2 uppercase text-[10px] tracking-widest">Doplňte sypání a vraťte se sem.</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="px-8 py-3 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-full"
                  >
                    Zpět do shopu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* ZOBRAZUJEME OD NEJNOVĚJŠÍHO (REVERSE) */}
                  {[...items].reverse().map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${item.id}-${item.variantCode || 'base'}`} 
                      className="flex gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all"
                    >
                      <div className="relative w-20 h-20 bg-black flex-none rounded-xl overflow-hidden border border-white/10 group-hover:border-[#E10600]/30 transition-colors">
                        <img
                          src={resolveProductImage(item.image, item.name, item.slug, { forceStatic: true })}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/products/placeholder.webp';
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-[11px] font-black uppercase tracking-tight leading-tight line-clamp-2 pr-4">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id, item.variantCode)}
                              className="p-1 text-zinc-600 hover:text-[#E10600] transition-colors absolute right-4"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.variantName && (
                            <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1 tracking-wider">{item.variantName}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-white/10 rounded-full bg-black/40">
                            <button 
                              onClick={() => decreaseItem(item.id, item.variantCode)}
                              className="p-1.5 hover:text-red-500 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-[11px] font-black">{item.quantity}</span>
                            <button 
                              onClick={() => increaseItem(item.id, item.variantCode)}
                              className="p-1.5 hover:text-[#E10600] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[13px] font-black text-[#E10600] tracking-tighter">
                            {(item.price * item.quantity).toLocaleString('cs-CZ')} Kč
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky Footer CTA - ALWAYS VISIBLE & AGGRESSIVE (L-CODE UX) */}
            {items.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Mezisoučet</span>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
                    <p className="text-[9px] text-[#E10600] font-black uppercase tracking-widest mt-1">Doprava zdarma od 2 000 Kč</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    router.push('/cart');
                    closeCart();
                  }}
                  className="w-full flex items-center justify-between bg-[#E10600] text-white px-8 py-6 md:py-8 font-black uppercase tracking-[0.25em] hover:bg-red-600 transition-all rounded-2xl shadow-[0_20px_40px_rgba(225,6,0,0.3)] group active:scale-[0.98]"
                >
                  <span className="text-sm md:text-base">Objednat zboží</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>

                <p className="text-[8px] text-white/20 text-center font-bold uppercase tracking-[0.4em] pt-6">
                  BEZPEČNÁ PLATBA • RYCHLÉ DORUČENÍ
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

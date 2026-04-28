'use client';

import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import useMounted from '@/hooks/useMounted';
import Image from 'next/image';

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10005]"
          />

          {/* Bottom Drawer (Jan's Bottom-Up Tech) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '25%' }} // Max 3/4 obrazovky
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 z-[10006] bg-[#050505] border-t border-[#d4ff00]/30 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Handlebar for dragging feel */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 mb-2" />

            {/* Header */}
            <div className="px-8 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#d4ff00]" />
                <h2 className="text-xl font-black uppercase tracking-widest text-white">Tvůj Výběr</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-3 text-white/40 hover:text-[#d4ff00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area (No Scroll Zone for few items) */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-white/20 font-black uppercase tracking-widest">Košík je prázdný</p>
                  <button 
                    onClick={closeCart}
                    className="text-[#d4ff00] text-xs font-bold underline tracking-widest"
                  >
                    POKRAČOVAT V NÁKUPU
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 bg-white/[0.03] p-3 border border-white/5"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 bg-black">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-black uppercase truncate text-white tracking-wide">{item.name}</h3>
                        <p className="text-[#d4ff00] font-black text-sm">{item.price.toLocaleString('cs-CZ')} Kč</p>
                      </div>
                      
                      {/* Quantity Controls (Thumb Friendly) */}
                      <div className="flex items-center gap-1 bg-black p-1 border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1.5 text-white/40 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-[#d4ff00]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-white/40 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-white/20 hover:text-[#E10600] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Section (Thumb Zone Mastery) */}
            <div className="bg-[#0a0a0a] border-t border-white/10 p-8 pb-12 space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-1">Doprava zdarma od 2 500 Kč</p>
                  <p className="text-xs font-black text-[#d4ff00] uppercase tracking-widest">Celkem k úhradě</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-white tracking-tighter">{totalPrice().toLocaleString('cs-CZ')} Kč</p>
                </div>
              </div>

              <a 
                href="/checkout"
                className="block w-full bg-[#d4ff00] text-black text-center py-6 font-black uppercase tracking-[0.3em] text-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(212,255,0,0.2)] active:scale-[0.98]"
              >
                ZAPLATIT
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

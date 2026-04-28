'use client';

import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import { usePathname } from 'next/navigation';
import useMounted from '@/hooks/useMounted';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCartStore();
  const mounted = useMounted();
  const pathname = usePathname();

  // Janův Mandate: E-shop je ČERVENÝ, Trenéři NEON
  const isEshop = pathname?.includes('/supplements') || pathname?.includes('/equipment') || pathname?.includes('/bazaar');
  const accentColor = isEshop ? 'bg-[#ff0000]' : 'bg-[#d4ff00]';
  const textColor = isEshop ? 'text-white' : 'text-black';
  const borderPrimary = isEshop ? 'border-[#ff0000]/20' : 'border-[#d4ff00]/20';

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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10005]"
          />

          {/* Bottom Drawer (Jan's Bottom-Up Tech) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '25%' }} // Max 3/4 obrazovky
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 top-0 z-[10006] bg-[#050505] border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Handlebar for dragging feel */}
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 mb-2" />

            {/* Header */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className={`w-5 h-5 ${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'}`} />
                <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">Tvůj Výběr</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-3 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area (Compact Flow) */}
            <div className="flex-1 overflow-y-auto px-6 py-2 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="text-white/20 font-black uppercase tracking-widest">Košík je prázdný</p>
                  <button 
                    onClick={closeCart}
                    className="text-[#d4ff00] text-xs font-black underline tracking-[0.3em]"
                  >
                    POKRAČOVAT V NÁKUPU
                  </button>
                </div>
              ) : (
                <div className="space-y-2 mt-2">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 bg-white/[0.02] p-2 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="relative w-14 h-14 flex-shrink-0 bg-black">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[10px] font-black uppercase truncate text-white tracking-widest">{item.name}</h3>
                        <p className={`${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'} font-black text-xs mt-1`}>{item.price.toLocaleString('cs-CZ')} Kč</p>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-black p-1 border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-white/40 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`w-6 text-center text-[10px] font-black ${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'}`}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-white/40 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-white/10 hover:text-[#ff0000] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spodní fixní sekce Draweru - Jan's Mandate Snippet */}
            <div className="sticky bottom-0 bg-black p-4 md:p-8 pb-[safe-area-inset-bottom+25px] border-t border-zinc-800 w-full mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400 text-sm uppercase tracking-widest font-black">Celkem</span>
                <span className="text-2xl md:text-3xl font-black text-white">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
              </div>
              
              <Link 
                href="/checkout"
                className={`w-full ${accentColor} ${textColor} font-black py-5 px-6 flex items-center justify-between transition-all active:scale-95 shadow-[0_10px_40px_rgba(0,0,0,0.5)] mb-[10px]`}
              >
                <span className="uppercase text-lg md:text-xl tracking-[0.2em]">ZAPLATIT</span>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCartStore';
import { usePathname } from 'next/navigation';
import useMounted from '@/hooks/useMounted';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  // L-CODE FIX: Přepojeno na správné funkce increaseItem a decreaseItem
  const { isOpen, closeCart, items, increaseItem, decreaseItem, removeItem, totalPrice } = useCartStore();
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
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[82vh] z-[10006] bg-[#050505] border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Handlebar for dragging feel (L-CODE UX) */}
            <div className="w-16 h-1.5 bg-white/20 rounded-full mx-auto mt-4 mb-2 shrink-0" />

            {/* Header */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className={`w-5 h-5 ${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'}`} />
                <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">Košík</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-3 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area (Compact Flow) */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-black uppercase tracking-widest">Košík zeje prázdnotou</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Přidej si něco a ukaž, že to myslíš vážně.</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className={`${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'} text-xs font-black underline tracking-[0.3em]`}
                  >
                    POKRAČOVAT V NÁKUPU
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div 
                      key={`${item.id}-${item.variantCode || 'base'}`} 
                      className="flex items-center gap-4 bg-white/[0.03] p-3 border border-white/5 rounded-xl transition-colors"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-white/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[11px] font-black uppercase truncate text-white tracking-widest">{item.name}</h3>
                        {item.variantName && (
                          <p className="text-[9px] text-white/50 uppercase tracking-widest">{item.variantName}</p>
                        )}
                        <p className={`${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'} font-black text-sm mt-1`}>{item.price.toLocaleString('cs-CZ')} Kč</p>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-black/40 p-1 border border-white/10 rounded-lg">
                        <button 
                          onClick={() => decreaseItem(item.id, item.variantCode)}
                          className="p-1 text-white/40 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`w-6 text-center text-[10px] font-black ${isEshop ? 'text-[#ff0000]' : 'text-[#d4ff00]'}`}>{item.quantity}</span>
                        <button 
                          onClick={() => increaseItem(item.id, item.variantCode)}
                          className="p-1 text-white/40 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id, item.variantCode)}
                        className="p-2 text-white/10 hover:text-[#ff0000] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Footer (Always on eye for Mobile) */}
            {items.length > 0 && (
              <div className="sticky bottom-0 bg-[#050505] p-6 md:p-8 border-t border-white/10 w-full mt-auto pb-[calc(env(safe-area-inset-bottom,20px)+20px)]">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">Celková částka</span>
                    <span className="text-2xl md:text-3xl font-black text-white">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout"
                  className={`w-full ${accentColor} ${textColor} font-black py-6 px-8 flex items-center justify-between transition-all active:scale-[0.98] shadow-[0_20px_50px_rgba(255,0,0,0.2)] rounded-2xl group`}
                >
                  <span className="uppercase text-lg md:text-xl tracking-[0.2em]">K POKLADNĚ</span>
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
// "Zameť stopy" - Mobilní checkout vyřešen na 300 %. smrk

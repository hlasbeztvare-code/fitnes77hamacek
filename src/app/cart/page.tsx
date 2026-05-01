'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import useMounted from '@/hooks/useMounted';
import { resolveProductImage } from '@/lib/resolve-image';
import ProductCard from '@/components/shop/ProductCard';
import LazyVideo from '@/components/utils/LazyVideo';

// GOLIÁŠ v41.0: Real Cart Page (Mezibod před Shoptetem)
export default function CartPage() {
  const { items, addItem, increaseItem, decreaseItem, removeItem, totalPrice, clearCart } = useCartStore();
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const mounted = useMounted();
  
  const [status, setStatus] = useState<'idle' | 'preparing' | 'sending' | 'error'>('idle');
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // L-CODE Standard: Fetch ALL once, filter in render for 300% reactivity
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAllProducts(data);
      })
      .catch(err => console.error("Products fetch error:", err));
  }, []);

  const crossSellProducts = useMemo(() => {
    const seenNames = new Set<string>();
    return allProducts
      .filter(p => {
        const isAlreadyInCart = items.some(item => item.id === p.id || item.slug === p.slug);
        if (isAlreadyInCart) return false;
        
        // Prevence duplicitních typů (např. více Kreatinů - smrk)
        const nameKey = p.name.split(' ')[0].toLowerCase();
        if (seenNames.has(nameKey)) return false;
        seenNames.add(nameKey);
        
        return true;
      })
      .slice(0, 4);
  }, [allProducts, items]);

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
          <Link href="/supplements" className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)]">
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
              <div key={`${item.id}-${item.variantCode || 'base'}`} className="flex items-center gap-3 sm:gap-4 bg-white/[0.03] p-2 sm:p-3 border border-white/5 relative group">
                {/* Malý náhled */}
                <div className="relative w-16 h-16 flex-shrink-0 bg-black overflow-hidden border border-white/5">
                  {(() => {
                    const mediaPath = resolveProductImage(item.image, item.name, item.slug);
                    const isVideo = mediaPath.toLowerCase().match(/\.(mp4|webm)$/i);
                    
                    if (isVideo) {
                      return (
                        <LazyVideo src={mediaPath} autoPlay loop muted playsInline className="w-full h-full object-contain p-1" />
                      );
                    }
                    return <Image src={mediaPath} alt={item.name} fill className="object-contain p-1" />;
                  })()}
                </div>
                
                {/* Info & Cena */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] md:text-sm font-black uppercase truncate tracking-widest leading-tight">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] mt-0.5">{item.variantName}</p>
                  )}
                  <p className="text-[#E10600] font-black text-sm md:text-base mt-1">{(item.price * item.quantity).toLocaleString('cs-CZ')} Kč</p>
                </div>
                
                {/* Kompaktní Volič Množství */}
                <div className="flex items-center gap-1 sm:gap-2 bg-black/40 border border-white/10 p-1">
                  <button onClick={() => decreaseItem(item.id, item.variantCode)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-black text-white">{item.quantity}</span>
                  <button onClick={() => increaseItem(item.id, item.variantCode)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Smazat - Absolutní vpravo nahoře pro úsporu místa */}
                <button 
                  onClick={() => removeItem(item.id, item.variantCode)} 
                  className="absolute top-2 right-2 text-white/10 hover:text-[#E10600] transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* NOVÁ SEKCE: MOHLO BY VÁS ZAJÍMAT (Neon List Layout) */}
          {crossSellProducts.length > 0 && (
            <div className="lg:col-span-2 mt-16 pt-16 border-t border-white/5">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-[#d4ff00]">
                Mohlo by vás <span className="text-white">zajímat</span>
              </h2>
              <div className="space-y-3">
                {crossSellProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-3 hover:bg-white/[0.04] transition-all group">
                    {/* Náhled 48x48 */}
                    <div className="relative w-12 h-12 flex-shrink-0 bg-black border border-white/5 overflow-hidden">
                      <Image 
                        src={resolveProductImage(product.image, product.name, product.slug, { forceStatic: true })} 
                        alt={product.name} 
                        fill 
                        sizes="48px"
                        className="object-contain p-1 group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] md:text-xs font-black uppercase truncate tracking-widest text-white">{product.name}</h4>
                      <p className="text-[#d4ff00] font-black text-sm mt-0.5">{product.price.toLocaleString('cs-CZ')} Kč</p>
                    </div>
                    
                    {/* Tlačítko */}
                    <button 
                      onClick={() => {
                        addItem({
                          id: product.id,
                          shoptetProductId: product.shoptetProductId || undefined,
                          shoptetPriceId: product.shoptetPriceId || undefined,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          image: resolveProductImage(product.image, product.name, product.slug, { forceStatic: true }),
                        });
                      }}
                      className="bg-[#d4ff00] text-black text-[9px] font-black px-5 py-2.5 uppercase tracking-[0.15em] [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)] hover:brightness-110 transition-all whitespace-nowrap"
                    >
                      PŘIDAT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sumář a Checkout */}
          <div className="lg:col-span-1 h-full">
            <div className="bg-white/[0.02] border border-white/10 p-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto scrollbar-hide pb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Shrnutí</h3>
              
              <div className="flex justify-between items-end mb-6 pb-4 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Celkem</span>
                <span className="text-2xl font-black text-white">{totalPrice().toLocaleString('cs-CZ')} Kč</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#E10600] text-white font-black py-4 px-6 flex items-center justify-between transition-all hover:brightness-110 [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)] group"
              >
                <span className="uppercase text-base tracking-[0.2em]">OBJEDNAT A ZAPLATIT</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[9px] text-zinc-600 uppercase tracking-[0.1em] text-center mt-3 px-2 leading-relaxed opacity-60">
                Kliknutím berete na vědomí <Link href="/obchodni-podminky" className="underline hover:text-white transition-colors">VOP</Link> a <Link href="/privacy" className="underline hover:text-white transition-colors">GDPR</Link>.
              </p>

              <Link 
                href="/supplements"
                className="f77-button-master mt-4 bg-transparent border-2 border-white/10 text-zinc-500 hover:text-white hover:border-white/30 transition-all [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)] py-3.5 flex items-center justify-center"
              >
                <span className="uppercase tracking-[0.15em] text-xs">POKRAČOVAT V NÁKUPU</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import useMounted from '@/hooks/useMounted';
import { resolveProductImage } from '@/lib/resolve-image';
import LazyVideo from '@/components/utils/LazyVideo';
import CheckoutForm from '@/components/shop/CheckoutForm';

// GOLIÁŠ v41.0: Real Cart Page - Light Theme
export default function CartPage() {
  const { items, addItem, increaseItem, decreaseItem, removeItem, syncPrices } = useCartStore();
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const mounted = useMounted();
  
  const [status, setStatus] = useState<'idle' | 'preparing' | 'sending' | 'error'>('idle');
  const [checkoutError, setCheckoutError] = useState<string>('');
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    syncPrices();

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
        
        const nameKey = p.name.split(' ')[0].toLowerCase();
        if (seenNames.has(nameKey)) return false;
        seenNames.add(nameKey);
        
        return true;
      })
      .slice(0, 4);
  }, [allProducts, items]);

  if (!mounted || !hasHydrated) return null;

  const handleCheckout = async (formData: any) => {
    setStatus('preparing');

    try {
      setStatus('sending');
      
      const payload = {
        items: items.map(i => ({
          id: i.id,
          quantity: i.quantity,
          variantCode: i.variantCode
        })),
        shippingMethod: formData.shippingMethod,
        shippingId: formData.shippingId,
        customerDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        }
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('Checkout error:', data.error);
        setCheckoutError(data.error || 'Neznámá chyba při komunikaci se serverem.');
        setStatus('error');
      }
    } catch (err: any) {
      console.error('Checkout API Error:', err);
      setCheckoutError(err.message || 'Nepodařilo se připojit pokladnu.');
      setStatus('error');
    }
  };

  if (status === 'error') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-[#E10600] font-black text-6xl mb-6 block">ERR</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Chyba <span className="text-[#E10600]">košíku</span></h1>
          <p className="text-zinc-500 mb-8 font-medium">{checkoutError}</p>
          <button
            onClick={() => { setStatus('idle'); setCheckoutError(''); }}
            className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(5%_0,100%_0,95%_100%,0%_100%)]"
          >
            ZPĚT DO KOŠÍKU
          </button>
        </motion.div>
      </div>
    );
  }

  if (status === 'preparing' || status === 'sending') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-black p-4 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <div className="h-20 w-20 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
              Příprava <span className="text-[#E10600]">objednávky</span>
            </h1>
            <p className="mt-4 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
              {status === 'sending' ? 'Přesměrování na pokladnu...' : 'Ověřování položek...'}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-4 text-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
          <span className="text-zinc-200 font-black text-6xl mb-6 block">!</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Košík je <span className="text-[#E10600]">prázdný</span></h1>
          <p className="text-zinc-500 mb-8 font-medium">Zdá se, že sypání zůstalo v regálu.</p>
          <Link href="/supplements" className="inline-block bg-[#E10600] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)]">
            ZPĚT DO OBCHODU
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col min-w-0">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 text-black">
          Tvůj <span className="text-[#E10600]">Košík</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Výpis produktů */}
          <div className="lg:col-span-7 space-y-4 min-w-0">
            {items.map((item) => (
              <div key={`${item.id}-${item.variantCode || 'base'}`} className="flex items-center gap-3 sm:gap-4 bg-zinc-50 p-2 sm:p-3 border border-zinc-200 relative group overflow-hidden">
                {/* Malý náhled */}
                <div className="relative w-16 h-16 flex-shrink-0 bg-white overflow-hidden border border-zinc-200">
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
                  <h3 className="text-[10px] md:text-sm font-black uppercase truncate tracking-widest leading-tight text-black">{item.name}</h3>
                  {item.variantName && (
                    <p className="text-[8px] text-zinc-500 uppercase tracking-[0.1em] mt-0.5">{item.variantName}</p>
                  )}
                  <p className="text-[#E10600] font-black text-sm md:text-base mt-1">{(item.price * item.quantity).toLocaleString('cs-CZ')} Kč</p>
                </div>
                
                {/* Kompaktní Volič Množství */}
                <div className="flex items-center gap-1 sm:gap-2 bg-white border border-zinc-200 p-1 flex-shrink-0">
                  <button onClick={() => decreaseItem(item.id, item.variantCode)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-zinc-400 hover:text-black transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-black text-black">{item.quantity}</span>
                  <button onClick={() => increaseItem(item.id, item.variantCode)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-zinc-400 hover:text-black transition-colors">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Smazat - Absolutní vpravo nahoře pro úsporu místa */}
                <button 
                  onClick={() => removeItem(item.id, item.variantCode)} 
                  className="absolute top-2 right-2 text-zinc-300 hover:text-[#E10600] transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Formulář a Sumář */}
          <div className="lg:col-span-5 h-full min-w-0">
            <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-80px)] lg:overflow-y-auto scrollbar-hide pb-10">
              <CheckoutForm onSubmit={handleCheckout} isSubmitting={status === 'sending'} />
              
              <Link 
                href="/supplements"
                className="f77-button-master mt-4 bg-transparent border-2 border-zinc-200 text-zinc-500 hover:text-black hover:border-zinc-400 transition-all [clip-path:polygon(6%_0,100%_0,94%_100%,0%_100%)] py-3.5 flex items-center justify-center"
              >
                <span className="uppercase tracking-[0.15em] text-xs font-black">POKRAČOVAT V NÁKUPU</span>
              </Link>
            </div>
          </div>
        </div>

        {/* NOVÁ SEKCE: MOHLO BY VÁS ZAJÍMAT (Zcela vespod, mimo grid layout) */}
        {crossSellProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-zinc-200 min-w-0">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-black">
              Mohlo by vás <span className="text-[#E10600]">zajímat</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {crossSellProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 p-3 hover:bg-zinc-100 transition-all group overflow-hidden">
                  {/* Náhled 48x48 */}
                  <div className="relative w-16 h-16 flex-shrink-0 bg-white border border-zinc-200 overflow-hidden">
                    <Image 
                      src={resolveProductImage(product.image, product.name, product.slug, { forceStatic: true })} 
                      alt={product.name} 
                      fill 
                      sizes="64px"
                      className="object-contain p-1 group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[10px] md:text-xs font-black uppercase truncate tracking-widest text-black">{product.name}</h4>
                    <p className="text-[#E10600] font-black text-sm mt-0.5">{product.price.toLocaleString('cs-CZ')} Kč</p>
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
                    className="bg-[#E10600] text-white text-[9px] font-black px-4 py-2.5 uppercase tracking-[0.15em] [clip-path:polygon(10%_0,100%_0,90%_100%,0%_100%)] hover:brightness-110 transition-all whitespace-nowrap flex-shrink-0"
                  >
                    PŘIDAT
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
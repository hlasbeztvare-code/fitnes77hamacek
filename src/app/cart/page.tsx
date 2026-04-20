'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';

/**
 * Stránka košíku, která slouží jako "Seamless Bridge" do Shoptetu.
 * Vezme lokální produkty a "vstříkne" je do Shoptet košíku.
 */
export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (items.length === 0) {
      window.location.href = '/supplements'; // Pokud je košík prázdný, jdeme zpět
      return;
    }

    // Sestavení URL pro Shoptet addBatch
    // Formát: https://obchod.fit77.cz/action/Cart/addBatch/?products[KOD_PRODUKTU]=KUSY
    const shoptetBaseUrl = 'https://obchod.fit77.cz/action/Cart/addBatch/';
    const params = new URLSearchParams();
    
    items.forEach((item) => {
      // GOLIÁŠ Bridge: Prioritně použijeme variantCode (specifická příchuť), pak shoptetId nebo slug
      const productCode = item.variantCode || item.shoptetId || item.slug;
      params.append(`products[${productCode}]`, item.quantity.toString());
    });

    const finalUrl = `${shoptetBaseUrl}?${params.toString()}`;

    // Malá pauza na efekt a promazání lokálního košíku (aby se uživatel nevracel k plnému)
    const timer = setTimeout(() => {
      clearCart();
      window.location.href = finalUrl;
    }, 800);

    return () => clearTimeout(timer);
  }, [items, clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <div className="h-16 w-16 border-4 border-[#E10600] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl">
            Příprava <span className="text-[#E10600]">objednávky</span>
          </h1>
          <p className="mt-4 text-gray-400 font-medium">
            Právě vás přesměrujeme do bezpečné pokladny Shoptet...
          </p>
        </div>
      </motion.div>
    </div>
  );
}

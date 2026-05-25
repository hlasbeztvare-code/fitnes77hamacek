'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/hooks/useCartStore';

type SuccessTrackerProps = {
  orderId: string;
};

export default function SuccessTracker({ orderId }: SuccessTrackerProps) {
  const { items, totalPrice, clearCart, currency } = useCartStore();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Spustit pouze pokud máme orderId, košík není prázdný a ještě jsme v tomto renderu netrackovali
    if (orderId && items.length > 0 && !hasTracked.current) {
      hasTracked.current = true;

      const purchaseValue = totalPrice();
      const purchaseItems = items.map(item => ({
        id: item.id,
        shoptetProductId: item.shoptetProductId,
        slug: item.slug,
        price: item.price,
        quantity: item.quantity,
      }));

      // Odeslat serverovou událost přes naše API
      fetch('/api/orders/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          value: purchaseValue,
          currency: currency || 'CZK',
          items: purchaseItems,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log('✅ Serverový nákup byl úspěšně zaznamenán přes Meta CAPI.');
          } else {
            console.error('❌ Selhalo zaznamenání Meta CAPI:', data.error);
          }
        })
        .catch((err) => {
          console.error('❌ Chyba při síťovém volání Meta CAPI:', err);
        })
        .finally(() => {
          // Vždy vyčistit košík na Next.js straně, ať zamezíme opakovanému odeslání při refresh
          clearCart();
        });
    }
  }, [orderId, items, totalPrice, clearCart, currency]);

  return null;
}

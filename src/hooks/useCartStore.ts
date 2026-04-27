'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  shoptetId?: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  variantName?: string;
  variantCode?: string;
};

type CartStore = {
  items: CartItem[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, variantCode?: string) => void;
  increaseItem: (id: string, variantCode?: string) => void;
  decreaseItem: (id: string, variantCode?: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  syncPrices: () => Promise<void>;
  syncWithShoptet: () => Promise<void>;
  currency: 'CZK' | 'EUR';
  setCurrency: (currency: 'CZK' | 'EUR') => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      _hasHydrated: false,
      isOpen: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      addItem: (item) => {
        set((state) => {
          const itemKey = `${item.id}-${item.variantCode || 'base'}`;
          const existing = state.items.find((i) => `${i.id}-${i.variantCode || 'base'}` === itemKey);

          let newItems;
          if (existing) {
            newItems = state.items.map((i) =>
              `${i.id}-${i.variantCode || 'base'}` === itemKey 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            );
          } else {
            newItems = [...state.items, { ...item, quantity: 1 }];
          }
          return { items: newItems };
        });
        get().syncWithShoptet();
      },

      removeItem: (id, variantCode) => {
        set((state) => ({
          items: state.items.filter((item) => 
            !(item.id === id && item.variantCode === variantCode)
          ),
        }));
        get().syncWithShoptet();
      },

      increaseItem: (id, variantCode) => {
        set((state) => ({
          items: state.items.map((item) =>
            (item.id === id && item.variantCode === variantCode) 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ),
        }));
        get().syncWithShoptet();
      },

      decreaseItem: (id, variantCode) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              (item.id === id && item.variantCode === variantCode) 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
        get().syncWithShoptet();
      },

      clearCart: () => {
        set({ items: [] });
        get().syncWithShoptet();
      },

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      // GOLIÁŠ Sync v6.0: Background Synchronization
      syncWithShoptet: async () => {
        const items = get().items;
        
        // Debounce sync to avoid hammering (L-CODE Standard)
        if ((globalThis as any)._syncTimeout) {
          clearTimeout((globalThis as any)._syncTimeout);
        }

        (globalThis as any)._syncTimeout = setTimeout(async () => {
          try {
            const res = await fetch('/api/cart/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items }),
            });
            const resData = await res.json();

            if (resData.success && resData.shoptetItems.length > 0) {
              // GOLIÁŠ Bridge: Pixel Sync - Hit Shoptet in background
              // We use products[ID]=QTY format which Shoptet's addCartItem supports
              const params = new URLSearchParams();
              resData.shoptetItems.forEach((item: any) => {
                params.append(`products[${item.priceId}]`, item.amount.toString());
              });

              const syncUrl = `${resData.shoptetBaseUrl}?${params.toString()}`;
              
              // Mode 'no-cors' is critical here because we don't need the response, 
              // we just need the browser to hit the URL with the user's cookies.
              await fetch(syncUrl, { mode: 'no-cors', cache: 'no-store' });
              
              console.log('🛒 Shoptet Sync: Success (Background Pixel)');
            }
          } catch (err) {
            console.error('🛒 Shoptet Sync: Failed', err);
          }
        }, 1500); // 1.5s debounce to be sure
      },

      syncPrices: async () => {
        await get().syncWithShoptet();
      },

      currency: 'CZK',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'fitness77-cart',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

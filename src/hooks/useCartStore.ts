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

      addItem: (item) =>
        set((state) => {
          const itemKey = `${item.id}-${item.variantCode || 'base'}`;
          const existing = state.items.find((i) => `${i.id}-${i.variantCode || 'base'}` === itemKey);

          if (existing) {
            return {
              items: state.items.map((i) =>
                `${i.id}-${i.variantCode || 'base'}` === itemKey 
                  ? { ...i, quantity: i.quantity + 1 } 
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        }),

      removeItem: (id, variantCode) =>
        set((state) => ({
          items: state.items.filter((item) => 
            !(item.id === id && item.variantCode === variantCode)
          ),
        })),

      increaseItem: (id, variantCode) =>
        set((state) => ({
          items: state.items.map((item) =>
            (item.id === id && item.variantCode === variantCode) 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          ),
        })),

      decreaseItem: (id, variantCode) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              (item.id === id && item.variantCode === variantCode) 
                ? { ...item, quantity: item.quantity - 1 } 
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      syncPrices: async () => {
        // Shoptet price sync logic placeholder
        console.log('Syncing prices with Shoptet...');
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

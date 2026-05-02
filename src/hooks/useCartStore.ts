'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const enforcePriceIntegrity = (name: string, currentPrice: number) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('creatine') || lowerName.includes('kreatin')) return 555;
  if (lowerName.includes('black dead') || lowerName.includes('dead pump')) return 990;
  if (lowerName.includes('glutamine')) return 580;
  if (lowerName.includes('opasek')) return 1890;
  if (lowerName.includes('kase') || lowerName.includes('kaše')) return 90;
  return currentPrice;
};

type CartItem = {
  id: string;
  shoptetProductId?: string;
  shoptetPriceId?: string;
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

      addItem: (item) => {
        set((state) => {
          // L-CODE Price Integrity: Vynucení ceny při přidání
          const price = enforcePriceIntegrity(item.name, item.price);
          const itemWithFixedPrice = { ...item, price };

          const itemKey = `${item.id}-${item.variantCode || 'base'}`;
          const existing = state.items.find((i) => `${i.id}-${i.variantCode || 'base'}` === itemKey);

          let newItems;
          if (existing) {
            newItems = state.items.map((i) =>
              `${i.id}-${i.variantCode || 'base'}` === itemKey 
                ? { ...i, quantity: i.quantity + 1, price } 
                : i
            );
          } else {
            newItems = [...state.items, { ...itemWithFixedPrice, quantity: 1 }];
          }
          return { items: newItems };
        });
      },

      removeItem: (id, variantCode) => {
        set((state) => ({
          items: state.items.filter((item) => 
            !(item.id === id && item.variantCode === variantCode)
          ),
        }));
      },

      increaseItem: (id, variantCode) => {
        set((state) => ({
          items: state.items.map((item) =>
            (item.id === id && item.variantCode === variantCode) 
              ? { ...item, quantity: item.quantity + 1, price: enforcePriceIntegrity(item.name, item.price) } 
              : item
          ),
        }));
      },

      decreaseItem: (id, variantCode) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              (item.id === id && item.variantCode === variantCode) 
                ? { ...item, quantity: item.quantity - 1, price: enforcePriceIntegrity(item.name, item.price) } 
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),

      syncPrices: async () => {
        set((state) => ({
          items: state.items.map(item => ({
            ...item,
            price: enforcePriceIntegrity(item.name, item.price)
          }))
        }));
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

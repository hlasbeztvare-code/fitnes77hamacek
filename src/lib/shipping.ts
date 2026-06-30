// src/lib/shipping.ts

export type ShippingMethodId = 'ZASILKOVNA' | 'PPL' | 'OSOBNI';

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  price: number;
  description?: string;
}

export const SHIPPING_METHODS: Record<ShippingMethodId, ShippingMethod> = {
  ZASILKOVNA: {
    id: 'ZASILKOVNA',
    name: 'Zásilkovna - Výdejní místo',
    price: 79,
    description: 'Doručení na vybranou pobočku Zásilkovny.',
  },
  PPL: {
    id: 'PPL',
    name: 'PPL - Doručení na adresu',
    price: 99,
    description: 'Doručení kurýrem přímo k vám domů.',
  },
  OSOBNI: {
    id: 'OSOBNI',
    name: 'Osobní odběr',
    price: 0,
    description: 'Osobní vyzvednutí na centrále (ZDARMA).',
  }
};

export function getShippingPrice(methodId: string): number {
  const method = SHIPPING_METHODS[methodId as ShippingMethodId];
  return method ? method.price : 0;
}

export function getShippingMethod(methodId: string): ShippingMethod | undefined {
  return SHIPPING_METHODS[methodId as ShippingMethodId];
}

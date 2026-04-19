export interface BazaarItem {
  id: string;
  title: string;
  name?: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  condition: string;
  location: string;
  image: string;
}

export const bazaarItems: BazaarItem[] = [
  {
    id: 'bz1',
    title: 'Použitý Concept2 RowErg',
    name: 'Použitý Concept2 RowErg',
    slug: 'pouzity-concept2-rowerg',
    description: 'Použitý veslařský trenažér v dobrém stavu. Legendární spolehlivost a výkon.',
    price: 18990,
    originalPrice: 29990,
    condition: 'STAV A',
    location: 'Mladá Boleslav',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bz2',
    title: 'Leg Press Machine',
    name: 'Leg Press Machine',
    slug: 'leg-press-machine',
    description: 'Použitý leg press se stabilní konstrukcí. Ideální pro těžké tréninky nohou.',
    price: 15990,
    originalPrice: 24990,
    condition: 'STAV B',
    location: 'Mladá Boleslav',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  },
];

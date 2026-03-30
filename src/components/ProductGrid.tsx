"use client";
import React from 'react';
import ProductCard from './ProductCard';

const products = [
  { id: '1', name: 'BCAA AMINO COMPLEX', price: '1 499', image: '/omega3.png' },
  { id: '2', name: 'WHEY ISOLATE 90', price: '1 890', image: '/omega3.png' },
];

export default function ProductGrid() {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

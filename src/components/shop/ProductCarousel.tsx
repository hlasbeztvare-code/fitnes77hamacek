'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { products } from '@/lib/mock/products';

export default function ProductCarousel() {
  // L-CODE HIGHLIGHTS: Black Dead a Dead Pump (indexy 2 a 3 v mocku)
  const highlights = products.filter(p => 
    p.name.toLowerCase().includes('black dead') || 
    p.name.toLowerCase().includes('dead pump')
  );

  return (
    <div className="relative w-full overflow-visible py-20 px-4">
      <div className="flex flex-wrap justify-center gap-20 lg:gap-40 overflow-visible">
        {highlights.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.1, rotate: 0 }}
            initial={{ rotate: -5 }}
            className="relative w-[300px] h-[400px] lg:w-[450px] lg:h-[600px] overflow-visible"
          >
            {/* Tenhle Image bude "přetékat" přes rám díky overflow-visible */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

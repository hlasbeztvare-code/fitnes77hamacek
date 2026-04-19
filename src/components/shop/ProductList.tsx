import { db } from '@/lib/db';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

export const ProductList = async () => {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  if (products.length === 0) {
    return <div className="text-center py-10 text-zinc-500">Zatím žádné produkty pod tlakem...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 transition-all hover:border-[#ccff00]">
          <div className="relative aspect-square mb-4">
            <OptimizedImage
              src={product.image || '/images/placeholder.webp'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-[#ccff00] font-black text-xl">{product.price} Kč</span>
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-[#ccff00] transition-colors">
              DO KOŠÍKU
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

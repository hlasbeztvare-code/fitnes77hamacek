import { db } from '@/lib/db';
import ProductCard from './ProductCard';

export const ProductList = async () => {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  if (products.length === 0) {
    return <div className="text-center py-10 text-zinc-500">Zatím žádné produkty pod tlakem...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-16 lg:gap-24">
      {products.map((product, index) => {
        const isLastAndOdd = index === products.length - 1 && products.length % 2 !== 0;
        return (
          <div key={product.id} className={isLastAndOdd ? "lg:col-span-2 flex justify-center" : ""}>
            <div className={isLastAndOdd ? "w-full lg:max-w-[50%]" : "w-full"}>
              <ProductCard product={product as any} index={index} isDark={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

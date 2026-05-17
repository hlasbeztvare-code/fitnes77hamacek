import { getProducts } from '@/lib/queries/products';
import ProductCard from './ProductCard';

export const ProductList = async () => {
  const allProducts = await getProducts();

  if (allProducts.length === 0) {
    return <div className="text-center py-10 text-zinc-500">Zatím žádné produkty pod tlakem...</div>;
  }

  const orderedSlugs = [
    'black-dead-pre-workout',
    'deadpump-v2-pump-formula',
    'glutamine',
    'creatine-monohydrate',
    'bcaa-amino-complex',
  ];

  const sortedProducts = [...allProducts].sort((a, b) => {
    const indexA = orderedSlugs.indexOf(a.slug);
    const indexB = orderedSlugs.indexOf(b.slug);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const mainProducts = sortedProducts.filter(p => !p.slug.startsWith('ryzova-kase'));
  const kaseProducts = sortedProducts.filter(p => p.slug.startsWith('ryzova-kase'));

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hlavní produkty - 2 sloupce */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-12 sm:gap-x-8 sm:gap-y-20 lg:gap-x-12 lg:gap-y-32">
        {mainProducts.map((product, index) => (
          <div key={product.id} className="w-full">
            <ProductCard
              product={product as any}
              index={index}
              isDark={true}
            />
          </div>
        ))}
      </div>

      {/* Kaše — vždy vycentrovaná pod main gridem */}
      {kaseProducts.length > 0 && (
        <div className="flex justify-center">
          <div className="w-full max-w-[45%]">
            <ProductCard
              product={kaseProducts[0] as any}
              index={mainProducts.length}
              isDark={true}
              isCentered={true}
              isSmall={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

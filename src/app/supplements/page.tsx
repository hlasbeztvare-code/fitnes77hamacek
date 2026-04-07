import ProductCard from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/queries/products';

export default async function SupplementsPage() {
  const products = await getProducts();
  
  // Seřazení produktů podle salesCount pro určení TOP pozic
  const sortedProducts = [...products].sort((a, b) => b.salesCount - a.salesCount);

  return (
    <section className="py-20">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            Top produkty
          </div>

          <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-zinc-950 md:text-6xl">
            Bestseller
            <br />
            kolekce
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            Výkon, regenerace a síla. Produkty s jasnou rolí, výraznou prezentací a důrazem na konverzi.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-0 md:grid-cols-2 xl:grid-cols-4 border-t border-l border-zinc-100">
          {products.map((product) => {
            // Najdeme pozici v seřazeném poli pro určení ranku
            const rank = sortedProducts.findIndex(p => p.id === product.id) + 1;
            
            return (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  compareAtPrice: product.compareAtPrice ?? 0,
                }}
                rank={rank}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

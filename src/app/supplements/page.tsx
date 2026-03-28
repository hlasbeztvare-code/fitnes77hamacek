import { db } from "@/lib/db";
import ProductCard from "@/components/shop/ProductCard";

export default async function SupplementsPage() {
  // Načtení všech produktů z databáze
  const products = await db.product.findMany();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">
          Naše <span className="text-[#E10600]">Suplementy</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Prémiová kvalita pro maximální výkon. Vyber si z naší nabídky a posuň své limity na další úroveň.
        </p>
      </div>
      
      {/* Využíváme naši novou, naboostovanou ProductCard komponentu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

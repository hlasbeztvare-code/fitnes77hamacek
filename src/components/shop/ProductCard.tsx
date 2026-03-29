import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice: number;
  image: string;
  stock: number;
  category: string;
  featured: boolean;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const discount =
    product.compareAtPrice > 0
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <article className="group relative overflow-hidden border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E10600] hover:shadow-2xl [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]">
      <div className="absolute left-0 top-0 h-1 w-full bg-zinc-950 transition group-hover:bg-[#E10600]" />

      <Link href={`/supplements/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          {discount > 0 && (
            <div className="absolute left-4 top-4 z-10 bg-[#E10600] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white shadow-lg [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]">
              -{discount}%
            </div>
          )}

          <div
            className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#E10600]">
          Performance Supplement
        </div>

        <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-zinc-950">
          {product.name}
        </h3>

        <p className="mt-4 min-h-[54px] text-sm leading-6 text-zinc-600">
          {product.shortDescription}
        </p>

        <div className="mt-5 flex items-end gap-3">
          <span className="text-2xl font-black text-[#E10600]">
            {product.price.toLocaleString('cs-CZ')} Kč
          </span>
          {product.compareAtPrice > 0 && (
            <span className="text-sm text-zinc-400 line-through">
              {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
            </span>
          )}
        </div>

        <div className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">
          {product.stock > 0 ? 'Skladem v Praze' : 'Na dotaz'}
        </div>

        <div className="mt-6">
          <AddToCartButton
            product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              image: product.image,
            }}
          />
        </div>
      </div>
    </article>
  );
}

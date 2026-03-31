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
    <article className="group relative flex flex-col overflow-hidden bg-white p-4 transition-all duration-500 hover:z-10">
      {/* Luxusní hloubka a stín při hoveru */}
      <div className="absolute inset-0 z-0 bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:ring-1 group-hover:ring-zinc-100" />
      
      <Link href={`/supplements/${product.slug}`} className="relative z-10 block">
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.02] group-hover:shadow-lg">
          {/* Odlesk (Shine effect) */}
          <div className="absolute inset-0 z-20 translate-x-[-100%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          
          {discount > 0 && (
            <div className="absolute left-3 top-3 z-30 bg-[#E10600] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]">
              -{discount}%
            </div>
          )}

          <div
            className="h-full w-full bg-contain bg-center bg-no-repeat p-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>
      </Link>

      <div className="relative z-10 mt-5 flex flex-1 flex-col px-1">
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
          Performance Supplement
        </div>

        <h3 className="mt-2 text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600]">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[40px] text-[13px] leading-relaxed text-zinc-500">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-zinc-950">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            {product.compareAtPrice > 0 && (
              <span className="text-xs text-zinc-400 line-through">
                {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>

          <div className="mt-4 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
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
      </div>
    </article>
  );
}

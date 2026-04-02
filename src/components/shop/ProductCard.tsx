import Link from 'next/link';
import Image from 'next/image';
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
    <article className="group relative flex flex-col overflow-hidden bg-white p-4 transition-all duration-500 hover:z-10 h-full">
      {/* Luxusní hloubka a stín při hoveru */}
      <div className="absolute inset-0 z-0 bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:ring-1 group-hover:ring-zinc-100" />
      
      <Link href={`/${product.category === 'supplement' ? 'supplements' : product.category === 'equipment' ? 'equipment' : 'bazaar'}/${product.slug}`} className="relative z-10 block">
        <div className="relative aspect-square overflow-hidden bg-zinc-50/50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-lg flex items-center justify-center p-8">
          {/* Odlesk (Shine effect) */}
          <div className="absolute inset-0 z-20 translate-x-[-100%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
          
          {discount > 0 && (
            <div className="absolute left-3 top-3 z-30 bg-[#E10600] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              -{discount}%
            </div>
          )}

          <div className="relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>
      </Link>

      <div className="relative z-10 mt-5 flex flex-1 flex-col px-1">
        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
          {product.category === 'supplement' ? 'Performance Supplement' : product.category === 'equipment' ? 'Performance Gear' : 'Bazar / Second Hand'}
        </div>

        <h3 className="mt-2 text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] not-italic">
          {product.name}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-[40px] text-[13px] leading-relaxed text-zinc-500 not-italic">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-zinc-950 not-italic">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            {product.compareAtPrice > 0 && (
              <span className="text-xs text-zinc-400 line-through not-italic">
                {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>

          <div className="mt-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
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

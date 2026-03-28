import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category?: string;
  };
  basePath?: string;
}

export default function ProductCard({ product, basePath = '/supplements' }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col bg-transparent transition-transform duration-300 hover:-translate-y-2 pb-10 px-2">
      
      <Link href={`${basePath}/${product.slug}`} className="flex flex-col flex-grow">
        
        <div className="relative aspect-square w-full flex items-center justify-center mb-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)]"
          />
        </div>
        
        <div className="flex flex-col text-left px-1">
          {/* Tady je zpátky tvoje firemní červená! */}
          <span className="mb-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E10600]">
            {product.category || 'SUPLEMENT'}
          </span>
          <h3 className="mb-2 text-base font-bold uppercase leading-tight text-zinc-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <span className="text-lg font-black text-zinc-900 dark:text-white mt-auto">
            {product.price.toLocaleString('cs-CZ')} Kč
          </span>
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 px-3">
        <AddToCartButton 
          product={product} 
          className="w-full py-2 text-sm font-bold uppercase shadow-xl transition-colors hover:bg-zinc-800"
        />
      </div>
    </div>
  );
}

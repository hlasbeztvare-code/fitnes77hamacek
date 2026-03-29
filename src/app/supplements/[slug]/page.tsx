import { notFound } from "next/navigation";
import Image from "next/image";
import { getSupplementBySlug } from "@/lib/queries/products";
import AddToCartButton from "@/components/shop/AddToCartButton";
import MobileStickyCTA from "@/components/mobile/MobileStickyCTA";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function SupplementDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const product = await getSupplementBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Produktové Foto - 3D Floating Efekt */}
        <div className="relative aspect-square w-full flex items-center justify-center py-10 group">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-black/15 dark:bg-black/60 blur-2xl rounded-[100%] transition-all duration-700 group-hover:w-3/4 group-hover:bg-black/20 dark:group-hover:bg-black/80 group-hover:blur-3xl z-0"></div>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain z-10 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:-translate-y-6 group-hover:scale-105 transition-all duration-700 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Informace o Produktu */}
        <div className="flex flex-col justify-center">
          <span className="text-zinc-500 font-black uppercase tracking-widest text-sm mb-4">
            {product.category || "Premium Nutrition"}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter text-zinc-900 dark:text-white leading-tight">
            {product.name}
          </h1>
          
          <p className="text-4xl lg:text-5xl font-black text-emerald-500 dark:text-emerald-400 mb-8 tracking-tight drop-shadow-sm">
            {product.price.toLocaleString()} Kč
          </p>
          
          <div className="prose prose-lg dark:prose-invert mb-10 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>{product.description || "Nejvyšší kvalita pro dosažení vašich cílů. Posuňte své limity s Fitness77."}</p>
          </div>

          <div id="main-buy-button" className="w-full sm:max-w-md pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <MobileStickyCTA product={product} triggerId="main-buy-button" />
    </div>
  );
}

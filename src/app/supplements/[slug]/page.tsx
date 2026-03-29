import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/shop/AddToCartButton';
import { getSupplementBySlug } from '@/lib/queries/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SupplementDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getSupplementBySlug(slug);

  if (!product) return notFound();

  return (
    <section className="py-16">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <div
            className="aspect-square w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
            Fitness 77 Supplement
          </span>

          <h1 className="mt-3 text-5xl font-bold uppercase">{product.name}</h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-end gap-4">
            <span className="text-4xl font-bold text-[#E10600]">
              {product.price.toLocaleString('cs-CZ')} Kč
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-zinc-400 line-through">
                {product.compareAtPrice.toLocaleString('cs-CZ')} Kč
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
              }}
            />
            <button className="rounded-md border border-zinc-300 px-6 py-3 font-bold uppercase tracking-wide transition hover:border-[#E10600] hover:text-[#E10600] dark:border-zinc-700">
              Zjistit více
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            <div>✓ Skladem v Praze</div>
            <div>✓ Doprava zdarma nad 2000 Kč</div>
            <div>✓ Rychlé odbavení objednávky</div>
          </div>
        </div>
      </div>
    </section>
  );
}

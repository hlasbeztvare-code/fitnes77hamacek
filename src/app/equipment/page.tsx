import { db } from '@/lib/db';
import ProductCard from '@/components/shop/ProductCard';

export const dynamic = 'force-dynamic';

export default async function EquipmentPage() {
  const items = await db.product.findMany({
    where: { 
      OR: [
        { category: 'equipment' },
        { category: { contains: 'Vybavení', mode: 'insensitive' } },
        { name: { contains: 'Opasek', mode: 'insensitive' } }
      ]
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            Performance Gear
          </div>

          <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-zinc-950 md:text-6xl not-italic">
            Vybavení
            <br />
            pro šampiony
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            Špičkové příslušenství pro tvůj trénink. Odolné materiály, funkční design a nekompromisní kvalita.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {items.map((item, index) => (
            <ProductCard key={item.id} product={item as any} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

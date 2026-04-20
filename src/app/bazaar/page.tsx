import Link from 'next/link';
import { db } from '@/lib/db';

export const revalidate = 60;

export default async function BazaarPage() {
  const items = await db.bazaarListing.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            Bazar strojů
          </div>

          <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-zinc-950 md:text-6xl not-italic">
            Použité stroje
            <br />
            a vybavení
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            Transparentní bazar se zaměřením na funkčnost, stav a důvěryhodnou nabídku. Prověřené stroje za zlomek ceny.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {items.map((item) => (
            <article key={item.id} className="group relative flex flex-col overflow-hidden bg-white p-4 transition-all duration-500 hover:z-10 rounded-none not-italic">
              <div className="absolute inset-0 z-0 bg-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] group-hover:ring-1 group-hover:ring-zinc-100 rounded-none" />
              
              <Link href={`/bazaar/${item.slug}`} className="relative z-10 block">
                <div className="relative aspect-[4/5] overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-lg rounded-none p-6 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="absolute inset-0 z-20 translate-x-[-100%] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]" />
                  
                  {/* Štítek stavu */}
                  <div className="absolute left-0 top-0 z-30 bg-[#FF8C00] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-black rounded-none shadow-sm">
                    {item.condition}
                  </div>

                  <div
                    className="h-full w-full bg-contain bg-center bg-no-repeat p-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
              </Link>

              <div className="relative z-10 mt-3 sm:mt-5 flex flex-1 flex-col px-0.5 sm:px-1">
                <div className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-[#E10600]">
                  Bazar / Second Hand
                </div>

                <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-black uppercase leading-tight text-zinc-950 transition-colors duration-300 group-hover:text-[#E10600] line-clamp-2 min-h-[2.5em]">
                  {item.title}
                </h3>

                <div className="mt-auto pt-3 sm:pt-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-black uppercase tracking-widest text-zinc-400">
                      Připravujeme
                    </span>
                  </div>

                  <div className="mt-4 opacity-50 cursor-not-allowed">
                    <div className="w-full bg-zinc-100 px-6 py-3 font-black uppercase tracking-[0.14em] text-zinc-400 text-center text-[10px] [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]">
                      Připravujeme
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

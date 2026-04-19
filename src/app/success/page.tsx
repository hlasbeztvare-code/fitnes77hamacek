type Props = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <section className="py-16">
      <div className="mx-auto w-[min(800px,calc(100%-32px))] rounded-xl border border-zinc-200 bg-white p-10 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
          Objednávka přijata
        </div>

        <h1 className="mt-4 text-5xl font-bold uppercase">
          Díky za nákup
        </h1>

        <p className="mt-6 text-zinc-600">
          Tvoje objednávka byla úspěšně odeslána.
        </p>

        {orderId && (
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            ID objednávky: {orderId}
          </p>
        )}

        <a
          href="/supplements"
          className="mt-8 inline-block rounded-md bg-[#E10600] px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:brightness-110"
        >
          Zpět do shopu
        </a>
      </div>
    </section>
  );
}

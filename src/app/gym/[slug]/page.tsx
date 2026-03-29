import { notFound } from 'next/navigation';
import { getTrainerBySlug } from '@/lib/queries/trainers';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TrainerDetailPage({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);

  if (!trainer) return notFound();

  return (
    <section className="py-24">
      <div className="mx-auto grid w-[min(1280px,calc(100%-32px))] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="trainer-detail-photo-wrap">
          <div
            className="trainer-detail-photo"
            style={{ backgroundImage: `url(${trainer.image})` }}
          />
          <div className="trainer-detail-overlay" />
          <div className="trainer-detail-vignette" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            {trainer.role}
          </div>

          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
            {trainer.name}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            {trainer.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trainer.specialties.map((item) => (
              <span
                key={item}
                className="border border-zinc-300 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-zinc-900"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

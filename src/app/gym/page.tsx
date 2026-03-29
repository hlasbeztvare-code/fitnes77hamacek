import TrainerCard from '@/components/gym/TrainerCard';
import { getAllTrainers } from '@/lib/queries/trainers';

export default async function GymPage() {
  const trainers = await getAllTrainers();

  return (
    <section className="bg-zinc-950 py-24 md:py-40">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[rgb(222,255,95)] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[rgb(222,255,95)]">
            Gym / Trenéři
          </div>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-white md:text-7xl">
            Lidi, kteří vedou <span className="text-[rgb(222,255,95)]">výsledky</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
            Fitness 77 stojí na reálných lidech, zkušenostech a důrazu na výkon. Ne na póze, ale na výsledku.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}

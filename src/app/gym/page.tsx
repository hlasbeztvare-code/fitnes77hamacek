import TrainerCard from '@/components/gym/TrainerCard';
import { getAllTrainers } from '@/lib/queries/trainers';

export default async function GymPage() {
  const trainers = await getAllTrainers();

  return (
    <section className="py-24">
      <div className="mx-auto w-[min(1280px,calc(100%-32px))]">
        <div className="max-w-3xl">
          <div className="inline-block border-l-4 border-[#E10600] pl-3 text-sm font-black uppercase tracking-[0.22em] text-[#E10600]">
            Gym / Trenéři
          </div>
          <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] text-zinc-950 md:text-6xl">
            Lidi, kteří vedou <span className="text-[#E10600]">výsledky</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
            Fitness 77 stojí na reálných lidech, zkušenostech a důrazu na výkon. Ne na póze, ale na výsledku.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}

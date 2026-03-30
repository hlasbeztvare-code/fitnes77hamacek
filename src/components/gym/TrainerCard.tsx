import Link from 'next/link';

type Trainer = {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
};

type Props = {
  trainer: Trainer;
};

export default function TrainerCard({ trainer }: Props) {
  return (
    <Link
      href={`/gym/${trainer.slug}`}
      className="group block overflow-hidden border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E10600] hover:shadow-2xl [clip-path:polygon(6%_0%,100%_0%,94%_100%,0%_100%)]"
    >
      <div className="trainer-photo-wrap">
        <div
          className="trainer-photo"
          style={{ backgroundImage: `url(${trainer.image})` }}
        />
        <div className="trainer-photo-overlay" />
        <div className="trainer-photo-vignette" />
      </div>

      <div className="p-7">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-[#E10600]">
          {trainer.role}
        </div>

        <h3 className="mt-3 text-3xl font-black uppercase text-zinc-950">
          {trainer.name}
        </h3>

        <p className="mt-4 text-sm leading-7 text-zinc-600">
          {trainer.bio}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {trainer.specialties.map((item) => (
            <span
              key={item}
              className="border border-zinc-300 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-800"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-zinc-950 transition group-hover:text-[#E10600]">
          Zobrazit profil →
        </div>
      </div>
    </Link>
  );
}

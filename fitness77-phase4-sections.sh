#!/bin/bash
set -e

echo "🏗 Applying Fitness 77 sections phase..."

mkdir -p src/lib/mock
mkdir -p src/components/bazaar
mkdir -p src/components/gym
mkdir -p src/components/blog

cat > src/lib/mock/equipment.ts <<'EOF'
export const equipmentItems = [
  {
    id: 'eq1',
    name: 'Power Rack X1',
    slug: 'power-rack-x1',
    description: 'Profesionální silový rack pro těžké tréninky.',
    price: 24990,
    image: 
'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'eq2',
    name: 'Adjustable Bench Pro',
    slug: 'adjustable-bench-pro',
    description: 'Robustní lavice pro komplexní silový trénink.',
    price: 8990,
    image: 
'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'eq3',
    name: 'Olympic Bar Elite',
    slug: 'olympic-bar-elite',
    description: 'Prémiová osa pro silový trénink a powerlifting.',
    price: 6990,
    image: 
'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
];
EOF

cat > src/lib/mock/bazaar.ts <<'EOF'
export const bazaarItems = [
  {
    id: 'bz1',
    title: 'Použitý Concept2 RowErg',
    slug: 'pouzity-concept2-rowerg',
    description: 'Použitý, plně funkční veslařský trenažér v dobrém 
stavu.',
    price: 18990,
    originalPrice: 29990,
    condition: 'A',
    location: 'Praha',
    image: 
'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bz2',
    title: 'Leg Press Machine',
    slug: 'leg-press-machine',
    description: 'Použitý leg press se stabilní konstrukcí a plynulým 
chodem.',
    price: 15990,
    originalPrice: 24990,
    condition: 'B',
    location: 'Praha 7',
    image: 
'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  },
];
EOF

cat > src/lib/mock/trainers.ts <<'EOF'
export const trainers = [
  {
    id: 'tr1',
    name: 'Marek Novák',
    slug: 'marek-novak',
    role: 'Silový trenér',
    bio: 'Specialista na sílu, hypertrofii a tréninkové plánování.',
    specialties: ['Síla', 'Objem', 'Technika'],
    image: 
'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tr2',
    name: 'Eva Svobodová',
    slug: 'eva-svobodova',
    role: 'Fitness & výživa',
    bio: 'Pomáhá klientům propojit trénink, výživu a konzistenci.',
    specialties: ['Výživa', 'Redukce', 'Mobilita'],
    image: 
'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80',
  },
];
EOF

cat > src/lib/mock/blog.ts <<'EOF'
export const blogPosts = [
  {
    id: 'bl1',
    title: 'Jak vybrat správný kreatin',
    slug: 'jak-vybrat-spravny-kreatin',
    excerpt: 'Kreatin není jen jeden. Podívej se, jak vybrat správnou 
variantu.',
    category: 'Suplementy',
    image: 
'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bl2',
    title: 'Kdy dává smysl pre-workout',
    slug: 'kdy-dava-smysl-pre-workout',
    excerpt: 'Pre-workout může pomoct, ale jen pokud víš, kdy a proč ho 
použít.',
    category: 'Performance',
    image: 
'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
  },
];
EOF

cat > src/components/bazaar/ConditionBadge.tsx <<'EOF'
type Props = {
  condition: 'A' | 'B' | 'C';
};

export default function ConditionBadge({ condition }: Props) {
  const styles =
    condition === 'A'
      ? 'bg-green-600 text-white'
      : condition === 'B'
      ? 'bg-yellow-500 text-black'
      : 'bg-red-600 text-white';

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold 
uppercase ${styles}`}>
      Stav {condition}
    </span>
  );
}
EOF

cat > src/components/gym/TrainerCard.tsx <<'EOF'
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
    <article className="overflow-hidden rounded-xl border border-zinc-200 
bg-white transition hover:-translate-y-1 hover:border-[#E10600] 
hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div
        className="aspect-[4/5] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${trainer.image})` }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold uppercase">{trainer.name}</h3>
        <p className="mt-1 text-sm font-semibold uppercase 
text-[#E10600]">{trainer.role}</p>
        <p className="mt-4 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">{trainer.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {trainer.specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-300 px-3 py-1 
text-xs font-semibold uppercase dark:border-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
EOF

cat > src/components/blog/BlogCard.tsx <<'EOF'
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
};

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 
bg-white transition hover:-translate-y-1 hover:border-[#E10600] 
hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div
        className="aspect-video w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="p-6">
        <div className="text-xs font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
          {post.category}
        </div>
        <h3 className="mt-3 text-2xl font-bold 
uppercase">{post.title}</h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">{post.excerpt}</p>
      </div>
    </article>
  );
}
EOF

cat > src/app/equipment/page.tsx <<'EOF'
import { equipmentItems } from '@/lib/mock/equipment';

export default function EquipmentPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Vybavení
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Silové a profesionální vybavení
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Výběr vybavení pro výkonnostní trénink, silový progres a 
kvalitní gym zázemí.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {equipmentItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 
bg-white transition hover:-translate-y-1 hover:border-[#E10600] 
hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold 
uppercase">{item.name}</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">
                  {item.description}
                </p>
                <div className="mt-6 text-2xl font-bold text-[#E10600]">
                  {item.price.toLocaleString('cs-CZ')} Kč
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/bazaar/page.tsx <<'EOF'
import { bazaarItems } from '@/lib/mock/bazaar';
import ConditionBadge from '@/components/bazaar/ConditionBadge';

export default function BazaarPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Bazar strojů
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Použité stroje a vybavení
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Transparentní bazar se zaměřením na funkčnost, stav a 
důvěryhodnou nabídku.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {bazaarItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-zinc-200 
bg-white transition hover:-translate-y-1 hover:border-[#E10600] 
hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div
                className="aspect-video w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold 
uppercase">{item.title}</h2>
                  <ConditionBadge condition={item.condition as 'A' | 'B' | 
'C'} />
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600 
dark:text-zinc-400">
                  {item.description}
                </p>

                <div className="mt-4 text-sm font-semibold uppercase 
text-zinc-500 dark:text-zinc-400">
                  Lokalita: {item.location}
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-2xl font-bold text-[#E10600]">
                    {item.price.toLocaleString('cs-CZ')} Kč
                  </span>
                  <span className="text-sm text-zinc-400 line-through">
                    {item.originalPrice.toLocaleString('cs-CZ')} Kč
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/gym/page.tsx <<'EOF'
import { trainers } from '@/lib/mock/trainers';
import TrainerCard from '@/components/gym/TrainerCard';

export default function GymPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Gym / Trenéři
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Lidi, kteří vedou výsledky
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Osobní vedení, síla, výživa a výkon. Důvěra se staví přes 
reálné profily, ne přes prázdné slogany.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/blog/page.tsx <<'EOF'
import { blogPosts } from '@/lib/mock/blog';
import BlogCard from '@/components/blog/BlogCard';

export default function BlogPage() {
  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] 
text-[#E10600]">
            Blog
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Obsah, který prodává důvěru
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Články, které pomáhají s výběrem, budují expertízu a vedou 
návštěvníka blíž k nákupu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

echo "✅ Sections phase complete."

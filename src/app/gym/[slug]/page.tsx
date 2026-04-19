import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTrainerBySlug, getAllTrainers } from '@/lib/queries/trainers';
import { db } from '@/lib/db';
import { trainerStacks } from '@/lib/trainer-stacks';
import { trainerProfiles } from '@/lib/trainer-profiles';
import TrainerStack from '@/components/gym/TrainerStack';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const trainers = await getAllTrainers();
  return trainers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);
  if (!trainer) return { title: 'Trenér nenalezen' };
  return {
    title: `${trainer.name} | Fitness 77`,
    description: trainer.bio,
  };
}

export default async function TrainerDetailPage({ params }: Props) {
  const { slug } = await params;
  const trainer = await getTrainerBySlug(slug);
  if (!trainer) return notFound();

  // Kontakt
  const phoneMap: Record<string, string> = {
    'ondrej-soustruznik': '+420 773 688 076',
    'jaroslav-hamacek':   '+420 777 105 548',
  };
  const instagramMap: Record<string, string> = {
    'beata-cejnarova': 'https://www.instagram.com/beatacejnarova',
  };
  const emailMap: Record<string, string> = {
    'beata-cejnarova': 'beata.cejnarova@seznam.cz',
  };
  const phone     = phoneMap[trainer.slug];
  const instagram = instagramMap[trainer.slug];
  const email     = emailMap[trainer.slug];

  // Profil obsahu
  const profile = trainerProfiles[trainer.slug];

  // Doporučený stack
  const stack = trainerStacks[trainer.slug];
  const stackProducts = stack
    ? await db.product.findMany({ where: { slug: { in: stack.productSlugs } } })
        .then((products) =>
          stack.productSlugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean)
        )
    : [];

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Back */}
      <div className="absolute top-24 left-6 md:left-16 z-30">
        <Link href="/#trainers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-[#d4ff00] transition-colors">
          ← ZPĚT NA TÝM
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <Image
            src={trainer.image === '/images/trainers/hlavacek.webp' ? '/images/trainers/hamacek.webp' : trainer.image}
            alt={trainer.name}
            fill
            sizes="100vw"
            className="object-cover object-top grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-20 max-w-4xl">
          <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-6 block font-space">
            {trainer.role}
          </span>
          <h1 className="text-[13vw] md:text-[8vw] font-black uppercase leading-[0.85] tracking-tighter font-black">
            {trainer.name.split(' ')[0]}<br />
            <span className="text-[#d4ff00]">{trainer.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          {profile?.philosophy && (
            <p className="mt-6 text-xl text-white/50 font-space italic max-w-xl">
              „{profile.philosophy}"
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {trainer.specialties.map((s) => (
              <span key={s} className="border border-[#d4ff00]/30 text-[#d4ff00] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] font-space">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] rotate-90 origin-center translate-y-6">scroll</span>
          <div className="w-px h-16 bg-white/10" />
        </div>
      </div>

      {/* ── BIO + ZAMĚŘENÍ ── */}
      <div className="px-6 md:px-16 py-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Levý sloupec */}
          <div>
            <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-8 block font-space">
              {trainer.slug === 'beata-cejnarova' ? 'O trenérce' : 'O trenérovi'}
            </span>
            <p className="text-2xl md:text-3xl text-white/70 leading-relaxed font-space font-medium">
              {trainer.bio}
            </p>

            {/* Achievements */}
            {profile?.achievements && (
              <div className="mt-12 space-y-3">
                {profile.achievements.map((a) => (
                  <div key={a} className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#d4ff00] flex-shrink-0" />
                    <span className="text-white/50 font-space text-sm uppercase tracking-widest">{a}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Kontakt */}
            {(phone || instagram || email) && (
              <div className="mt-16 space-y-4">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] font-space">Přímý kontakt</p>
                {phone && (
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4 text-4xl font-black font-black tracking-widest text-white hover:text-[#d4ff00] transition-colors duration-300 group">
                    <span className="w-3 h-3 rounded-full bg-[#d4ff00] group-hover:scale-150 transition-transform duration-300" />
                    {phone}
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-2xl font-black font-black tracking-widest text-white hover:text-[#d4ff00] transition-colors duration-300 group">
                    <span className="w-3 h-3 rounded-full bg-[#d4ff00] group-hover:scale-150 transition-transform duration-300" />
                    @beatacejnarova
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-4 text-base font-bold font-space text-white/50 hover:text-[#d4ff00] transition-colors duration-300 group">
                    <span className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-[#d4ff00] group-hover:scale-150 transition-all duration-300" />
                    {email}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Pravý sloupec – CTA + gym info */}
          <div className="space-y-8">
            <div className="border border-[#d4ff00]/20 p-10 bg-white/[0.02]">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.6em] mb-6 font-space">Rezervace tréninku</p>
              <p className="text-xl text-white/60 font-space font-medium mb-8">
                Chceš trénovat s {trainer.name.split(' ')[0]}? Napiš nebo zavolej a dohodneme se na termínu.
              </p>
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-block w-full text-center bg-[#d4ff00] text-black font-black uppercase tracking-[0.2em] px-8 py-5 font-black text-2xl hover:bg-white transition-colors duration-300">
                  Zavolat trenérovi
                </a>
              ) : instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center bg-[#d4ff00] text-black font-black uppercase tracking-[0.2em] px-8 py-5 font-black text-2xl hover:bg-white transition-colors duration-300">
                  Napsat na Instagram
                </a>
              ) : (
                <a href={`mailto:${email ?? 'fitness77@post.cz'}`} className="inline-block w-full text-center bg-[#d4ff00] text-black font-black uppercase tracking-[0.2em] px-8 py-5 font-black text-2xl hover:bg-white transition-colors duration-300">
                  Kontaktovat e-mailem
                </a>
              )}
            </div>
            <div className="border border-white/5 p-8 space-y-4">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] font-space">Kde nás najdeš</p>
              <p className="text-3xl font-black font-black tracking-widest text-white">FITNESS 77 MLADÁ BOLESLAV</p>
              <p className="text-white/40 font-space text-sm uppercase tracking-wider">Jiráskova 1320, 293 01 Mladá Boleslav</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── OBLASTI ZAMĚŘENÍ ── */}
      {profile?.focus && (
        <div className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
          <div className="border-t border-white/5 pt-24 mb-16">
            <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-4 block font-space">
              Co tréninky zahrnují
            </span>
            <h2 className="text-[8vw] md:text-[4vw] font-black uppercase leading-[0.85] tracking-tighter font-black">
              OBLASTI <span className="text-[#d4ff00]">ZAMĚŘENÍ</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.focus.map((item, i) => (
              <div key={i} className="border border-white/5 p-8 hover:border-[#d4ff00]/30 transition-colors duration-500 group">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-black uppercase font-black tracking-wide group-hover:text-[#d4ff00] transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-white/40 font-space text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PRO KOHO ── */}
      {profile?.forWhom && (
        <div className="px-6 md:px-16 pb-32 max-w-[1400px] mx-auto">
          <div className="border border-[#d4ff00]/10 bg-white/[0.02] p-12 md:p-16">
            <span className="text-[#d4ff00] text-xs font-bold tracking-[0.8em] uppercase mb-6 block font-space">
              Pro koho jsou tréninky vhodné?
            </span>
            <p className="text-2xl md:text-3xl text-white/70 leading-relaxed font-space font-medium">
              {profile.forWhom}
            </p>
            <div className="mt-10 flex gap-4 flex-wrap">
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="bg-[#d4ff00] text-black font-black uppercase tracking-widest px-8 py-4 font-black text-xl hover:bg-white transition-colors">
                  Rezervovat trénink
                </a>
              ) : instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="bg-[#d4ff00] text-black font-black uppercase tracking-widest px-8 py-4 font-black text-xl hover:bg-white transition-colors">
                  Napsat na Instagram
                </a>
              ) : null}
              <a href="/#pricing" className="border border-white/20 text-white font-black uppercase tracking-widest px-8 py-4 font-black text-xl hover:border-[#d4ff00] hover:text-[#d4ff00] transition-all">
                Zobrazit ceník
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── DOPORUČENÝ STACK ── */}
      {stack && stackProducts.length > 0 && (
        <TrainerStack
          products={stackProducts as any}
          headline={stack.headline}
          subline={stack.subline}
        />
      )}

      {/* Footer */}
      <div className="border-t border-white/5 px-6 md:px-16 py-16 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link href="/#trainers" className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-[#d4ff00] transition-colors font-space">
          ← Celý tým
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 font-space">© 2026 FITNESS 77 MB</span>
      </div>

    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

interface TrainerCardProps {
  trainer: {
    id: string;
    name: string;
    role: string;
    image: string;
    slug: string;
    specialization?: string[];
  };
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Reveal>
      <div className="group relative overflow-hidden bg-zinc-900 transition-all duration-500 hover:-translate-y-2 [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)]">
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src={trainer.image}
            alt={trainer.name}
            width={600}
            height={750}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8">
          <div className="mb-2 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[rgb(222,255,95)]">
            {trainer.role}
          </div>
          <h3 className="text-3xl font-black uppercase italic leading-none text-white transition-colors duration-300 group-hover:text-[rgb(222,255,95)]">
            {trainer.name}
          </h3>
          
          <div className="mt-4 flex translate-y-8 flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {trainer.specialization?.map((spec) => (
              <span key={spec} className="border border-[rgb(222,255,95)]/30 bg-black/50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                {spec}
              </span>
            ))}
          </div>

          <Link 
            href={`/gym/${trainer.slug}`}
            className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[rgb(222,255,95)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            Profil Trenéra <span className="text-lg">→</span>
          </Link>
        </div>
        
        <div className="absolute top-0 left-0 h-1 w-0 bg-[rgb(222,255,95)] transition-all duration-500 group-hover:w-full" />
      </div>
    </Reveal>
  );
}

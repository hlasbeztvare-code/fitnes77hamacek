import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

interface TrainerProps {
  trainer: {
    id: string;
    name: string;
    role: string;
    image: string;
    slug: string;
    description?: string;
    stack?: string[];
  };
}

export default function TrainerCard({ trainer }: TrainerProps) {
  return (
    <Reveal>
      <div className="group relative overflow-hidden bg-zinc-900 transition-all duration-500 hover:-translate-y-2 [clip-path:polygon(5%_0%,100%_0%,95%_100%,0%_100%)] border-l border-zinc-800 hover:border-[rgb(222,255,95)]">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
          {/* Fotka trenéra */}
          <div className="relative w-full md:w-1/3 aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
            <Image
              src={trainer.image}
              alt={trainer.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Info a Stack */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="mb-2 inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[rgb(222,255,95)]">
                {trainer.role}
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic leading-none text-white group-hover:text-[rgb(222,255,95)] transition-colors">
                {trainer.name}
              </h3>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest leading-7 text-zinc-500">
                {trainer.description || "Specialista na výkon a naturální progres."}
              </p>
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800 pb-3 mb-4 italic">
                Co sypu & doporučuju (Stack)
              </div>
              <div className="flex flex-wrap gap-2">
                {trainer.stack?.map((item) => (
                  <span key={item} className="border border-zinc-800 bg-black/50 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-[rgb(222,255,95)] transition-colors">
                    {item}
                  </span>
                ))}
              </div>
              <Link 
                href={`/gym/${trainer.slug}`}
                className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-[rgb(222,255,95)] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all"
              >
                Zarezervovat trénink
              </Link>
            </div>
          </div>
        </div>
        
        {/* Acid Line Animation */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-[rgb(222,255,95)] transition-all duration-700 group-hover:w-full" />
      </div>
    </Reveal>
  );
}

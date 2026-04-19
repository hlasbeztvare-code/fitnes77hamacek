import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white px-4 text-center">
      <div className="relative w-64 h-24 mb-12">
        <Image 
          src="/images/brand/logo-fitness77.png" 
          alt="Fitness 77" 
          fill
          className="object-contain brightness-0 invert"
          priority
        />
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4">
        404<span className="text-[#E10600]">.</span>
      </h1>
      <p className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] mb-12 text-white/40">
        STRÁNKA NENALEZENA
      </p>
      
      <Link 
        href="/" 
        className="bg-[#E10600] text-white px-10 py-4 font-black uppercase tracking-[0.2em] transform-gpu hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Zpět na základnu
      </Link>
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] opacity-5 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </div>
  );
}

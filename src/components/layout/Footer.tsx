import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 font-sans pt-16 pb-8 relative z-50 overflow-hidden">
      {/* Jemný horní světelný efekt */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* LOGO A POPIS */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block group w-fit">
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic group-hover:text-[#E10600] transition-colors duration-300 drop-shadow-md">
                FIT<span className="text-[#E10600] group-hover:text-white transition-colors duration-300">77</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 font-medium leading-relaxed max-w-xs">
              Místo, kde vznikají výsledky. Moderní vybavení, tvrdý trénink a prostředí, které tě posune dál.
            </p>
          </div>

          {/* E-SHOP ODKAZY */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-2 relative inline-block w-fit">
              E-SHOP
              <span className="absolute -bottom-1 left-0 w-1/2 h-[2px] bg-[#E10600]"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {['Suplementy', 'Oblečení', 'Vybavení', 'Bazar'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group w-fit">
                    <span className="w-0 h-[1px] bg-[#E10600] group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GYM MB ODKAZY */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-2 relative inline-block w-fit">
              GYM MB
              <span className="absolute -bottom-1 left-0 w-1/2 h-[2px] bg-[#CCFF00]"></span>
            </h3>
            <ul className="flex flex-col gap-3">
              {['O Gymu', 'Ceník', 'Trenéři', 'Kontakt'].map((item) => (
                <li key={item}>
                  <Link href={`/gym/${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group w-fit">
                    <span className="w-0 h-[1px] bg-[#CCFF00] group-hover:w-3 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KONTAKT */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-2 relative inline-block w-fit">
              KONTAKT
              <span className="absolute -bottom-1 left-0 w-1/2 h-[2px] bg-white/50"></span>
            </h3>
            <div className="flex flex-col gap-3 text-sm font-medium text-white/60">
              <p className="flex items-start gap-3 hover:text-white transition-colors cursor-default">
                <svg className="w-5 h-5 shrink-0 text-[#E10600]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>U Stadionu 1234<br/>293 01 Mladá Boleslav</span>
              </p>
              <a href="mailto:info@fitness77.cz" className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 shrink-0 text-[#E10600]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@fitness77.cz
              </a>
              <a href="tel:+420777777777" className="flex items-center gap-3 hover:text-white transition-colors">
                <svg className="w-5 h-5 shrink-0 text-[#E10600]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +420 777 777 777
              </a>
            </div>
          </div>

        </div>

        {/* SPODNÍ COPYRIGHT LIŠTA */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} FITNESS 77. VŠECHNA PRÁVA VYHRAZENA.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/obchodni-podminky" className="text-[10px] md:text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
              Obchodní Podmínky
            </Link>
            <Link href="/ochrana-udaju" className="text-[10px] md:text-xs font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">
              GDPR
            </Link>
          </div>
        </div>
        
        {/* MASIVNÍ ČÍSLO V POZADÍ (Dekorace) */}
        <div className="absolute bottom-[-10%] right-[-2%] text-[20vw] font-black text-white/5 tracking-tighter leading-none pointer-events-none z-[-1]">
          77
        </div>
      </div>
    </footer>
  );
}
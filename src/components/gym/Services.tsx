import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  UserCheck, 
  Dumbbell, 
  Activity, 
  TrendingDown, 
  Zap, 
  Flame, 
  Coffee, 
  FileText, 
  ShoppingBag 
} from 'lucide-react';

const services = [
  {
    title: 'OSOBNÍ TRENÉR',
    desc: 'Individuální přístup a trénink pod dohledem profesionálů.',
    icon: <UserCheck className="w-10 h-10 text-[#d4ff00]" />,
    href: '/#trainers',
    cta: 'Poznat tým →',
  },
  {
    title: 'POSILOVÁNÍ SVALŮ',
    desc: 'Formování postavy a budování síly na strojích Hammer Strength.',
    icon: <Dumbbell className="w-10 h-10" />,
    href: '/equipment',
    cta: 'Naše vybavení →',
  },
  {
    title: 'REHABILITAČNÍ CVIČENÍ',
    desc: 'Po úrazové a pooperační stavy – bezpečný návrat do kondice.',
    icon: <Activity className="w-10 h-10 text-[#d4ff00]" />,
    href: '/gym/ondrej-soustruznik',
    cta: 'Fyzio trenér →',
  },
  {
    title: 'REDUKCE HMOTNOSTI',
    desc: 'Efektivní spalování tuků a úprava životního stylu.',
    icon: <TrendingDown className="w-10 h-10" />,
    href: '/#trainers',
    cta: 'Domluvit trénink →',
  },
  {
    title: 'SILOVÉ CVIČENÍ',
    desc: 'Intenzivní trénink uvnitř i venku pod vedením profíků.',
    icon: <Zap className="w-10 h-10 text-[#d4ff00]" />,
    href: '/#pricing',
    cta: 'Zobrazit ceník →',
  },
  {
    title: 'ZLEPŠENÍ KONDICE',
    desc: 'Získej výdrž a energii pro sport i každodenní život.',
    icon: <Flame className="w-10 h-10" />,
    href: '/gym/beata-cejnarova',
    cta: 'Trenérka kondice →',
  },
  {
    title: 'OBČERSTVENÍ',
    desc: 'Kvalitní káva, proteinové drinky a doplňky u nás na baru.',
    icon: <Coffee className="w-10 h-10 text-[#d4ff00]" />,
    href: '/supplements',
    cta: 'E-shop suplementů →',
  },
  {
    title: 'CVIČEBNÍ PLÁNY',
    desc: 'Sestavení tréninku na míru tvým cílům a možnostem.',
    icon: <FileText className="w-10 h-10" />,
    href: '/#trainers',
    cta: 'Kontaktovat trenéra →',
  },
  {
    title: 'PRODEJ DOPLŇKŮ',
    desc: 'Široký výběr iontových nápojů a suplementů přímo v gymu.',
    icon: <ShoppingBag className="w-10 h-10 text-[#d4ff00]" />,
    href: '/supplements',
    cta: 'Přejít do shopu →',
  },
];

export const Services = () => {
  return (
    <section id="sluzby" className="bg-[#050505] py-20 md:py-40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 text-center">
        <h2 className="text-[16vw] md:text-[12vw] font-bebas font-black leading-none mb-12 md:mb-32 tracking-tighter uppercase">
            HLAVNÍ <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>SLUŽBY</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
          {services.map((s, i) => (
            <Link key={i} href={s.href}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-zinc-900/50 p-5 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 hover:border-[#d4ff00]/50 transition-all text-left group cursor-pointer h-full flex flex-col"
              >
                <div className="mb-3 md:mb-6 [&>svg]:w-6 [&>svg]:h-6 md:[&>svg]:w-10 md:[&>svg]:h-10">{s.icon}</div>
                <h3 className="text-lg md:text-3xl font-bebas font-bold mb-2 md:mb-4 group-hover:text-[#d4ff00] transition-colors leading-tight">{s.title}</h3>
                <p className="text-white/40 font-space uppercase text-[9px] md:text-sm leading-relaxed flex-1 hidden md:block">{s.desc}</p>
                <div className="mt-3 md:mt-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-[#d4ff00] transition-colors duration-300">
                  {s.cta}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
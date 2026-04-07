import { motion } from 'framer-motion';
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
  { title: 'OSOBNÍ TRENÉR', desc: 'Individuální přístup a trénink pod dohledem profesionálů.', icon: <UserCheck className="w- h-10 text-[#d4ff00]" />, img: 'https://fitness77.cz/wp-content/uploads/2023/05/pohled-do-fitka.jpg' },
  { title: 'POSILOVÁNÍ SVALŮ', desc: 'Formování postavy a budování síly na strojích Hammer Strength.', icon: <Dumbbell className="w-10 h-10" />, img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80' },
  { title: 'REHABILITAČNÍ CVIČENÍ', desc: 'Po úrazové a pooperační stavy – bezpečný návrat do kondice.', icon: <Activity className="w-10 h-10 text-[#d4ff00]" />, img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80' },
  { title: 'REDUKCE HMOTNOSTI', desc: 'Efektivní spalování tuků a úprava životního stylu.', icon: <TrendingDown className="w-10 h-10" />, img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80' },
  { title: 'SILOVÉ CVIČENÍ', desc: 'Intenzivní trénink uvnitř i venku pod vedením profíků.', icon: <Zap className="w-10 h-10 text-[#d4ff00]" />, img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80' },
  { title: 'ZLEPŠENÍ KONDICE', desc: 'Získej výdrž a energii pro sport i každodenní život.', icon: <Flame className="w-10 h-10" />, img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80' },
  { title: 'OBČERSTVENÍ', desc: 'Kvalitní káva, proteinové drinky a doplňky u nás na baru.', icon: <Coffee className="w-10 h-10 text-[#d4ff00]" />, img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80' },
  { title: 'CVIČEBNÍ PLÁNY', desc: 'Sestavení tréninku na míru tvým cílům a možnostem.', icon: <FileText className="w-10 h-10" />, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80' },
  { title: 'PRODEJ DOPLŇKŮ', desc: 'Široký výběr iontových nápojů a suplementů přímo v gymu.', icon: <ShoppingBag className="w-10 h-10 text-[#d4ff00]" />, img: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80' }
];

export const Services = () => {
  return (
    <section id="sluzby" className="bg-[#050505] py-40">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <h2 className="text-[12vw] font-bebas font-black leading-none mb-32 tracking-tighter uppercase">
            HLAVNÍ <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>SLUŽBY</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 hover:border-[#d4ff00]/50 transition-all text-left group"
            >
              <div className="mb-6">{s.icon}</div>
              <h3 className="text-3xl font-bebas font-bold mb-4 group-hover:text-[#d4ff00] transition-colors">{s.title}</h3>
              <p className="text-white/40 font-space uppercase text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
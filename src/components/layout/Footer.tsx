import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 pt-16 pb-28 md:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black uppercase tracking-tighter text-white">FITNESS<span className="text-[#E10600]">77</span></span>
            </Link>
            <p className="text-sm leading-relaxed">Prémiové doplňky stravy a hardcore vybavení pro ty, kteří to s progresem myslí vážně. Žádné kompromisy, jen výsledky.</p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-zinc-900 p-2 rounded-lg hover:bg-[#E10600] hover:text-white transition-all"><Instagram size={20} /></a>
              <a href="#" className="bg-zinc-900 p-2 rounded-lg hover:bg-[#E10600] hover:text-white transition-all"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Rychlé odkazy</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/supplements" className="hover:text-[#E10600] hover:translate-x-1 inline-block transition-transform">Suplementy</Link></li>
              <li><Link href="/equipment" className="hover:text-[#E10600] hover:translate-x-1 inline-block transition-transform">Vybavení</Link></li>
              <li><Link href="/gym" className="hover:text-[#E10600] hover:translate-x-1 inline-block transition-transform">Naši Trenéři</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Kontakt</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group"><MapPin size={18} className="text-[#E10600] group-hover:scale-110 transition-transform" /> <span>Praha 1</span></li>
              <li className="flex items-center gap-3 group"><Mail size={18} className="text-[#E10600] group-hover:scale-110 transition-transform" /> <a href="mailto:info@fitness77.cz" className="hover:text-white transition-colors">info@fitness77.cz</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Fitness77. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}

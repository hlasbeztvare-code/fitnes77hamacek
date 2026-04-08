import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-6 font-inter">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 items-start">
          {/* LOGO - Viditelné jen na desktopu nebo přes celou šířku na mobilu? Raději ho dáme jako první malý prvek na desktopu */}
          <div className="hidden md:flex flex-col gap-1.5">
            <Image
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              width={80}
              height={20}
              className="h-5 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-1 text-[10px] leading-tight text-white/20">
              Performance brand.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90">Shop</h4>
            <ul className="mt-3 space-y-1.5 text-[10px] text-white/30">
              <li><Link href="/supplements" className="hover:text-white transition-colors">SUPLE</Link></li>
              <li><Link href="/equipment" className="hover:text-white transition-colors">GEAR</Link></li>
              <li><Link href="/bazar" className="hover:text-white transition-colors">BAZAR</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90">Služby</h4>
            <ul className="mt-3 space-y-1.5 text-[10px] text-white/30">
              <li><Link href="/gym" className="hover:text-white transition-colors">GYM</Link></li>
              <li><span className="opacity-20">COACH</span></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90">Kontakt</h4>
            <ul className="mt-3 space-y-1.5 text-[10px] font-bold uppercase text-white/30">
              <li>MB</li>
              <li><a href="mailto:info@fitness77.cz" className="hover:text-white">MAIL</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/5 pt-4 text-center text-[8px] font-black uppercase tracking-[0.2em] text-white/10">
          © {new Date().getFullYear()} Fit77.
        </div>
      </div>
    </footer>
  );
}

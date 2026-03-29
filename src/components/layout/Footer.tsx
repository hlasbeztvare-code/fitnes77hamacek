export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 font-black uppercase tracking-tighter">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 md:grid-cols-4">
        <div>
          <img
            src="/images/brand/logo-fitness77.png"
            alt="Fitness 77"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-4 text-[10px] leading-relaxed text-zinc-500">
            JIRÁSKOVA 1320, MLADÁ BOLESLAV<br />
            PO–PÁ: 06:00 – 21:00<br />
            SO–NE: 09:00 – 20:00
          </p>
        </div>

        <div>
          <h4 className="font-black uppercase text-zinc-900">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Suplementy</li>
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Vybavení</li>
            <li className="hover:text-[#E10600] transition-colors cursor-pointer text-[#E10600]">Bazar strojů</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase text-zinc-900">Služby</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Gym / Trenéři</li>
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Rezervace</li>
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Poradenství</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase text-zinc-900">Kontakt & Obsah</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li><a href="tel:+420777105548" className="hover:text-[#E10600] transition-colors">+420 777 105 548</a></li>
            <li><a href="mailto:fitness77@post.cz" className="hover:text-[#E10600] transition-colors">fitness77@post.cz</a></li>
            <li className="hover:text-[#E10600] transition-colors cursor-pointer">Blog & Intel</li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto mt-12 w-[min(1200px,calc(100%-32px))] border-t border-zinc-100 pt-8">
        <p className="text-[10px] text-zinc-400">© 2026 FITNESS77 // MB_ORIGINAL_GYM // UNIT_01</p>
      </div>
    </footer>
  );
}

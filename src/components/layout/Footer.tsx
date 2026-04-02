import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/logo-fitness77.png"
              alt="Fitness 77"
              width={120}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-3 text-sm text-zinc-500">
              Prémiový fitness ekosystém: suplementy, vybavení, bazar, trenéři a obsah.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase text-zinc-900">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>Suplementy</li>
            <li>Vybavení</li>
            <li>Bazar strojů</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-zinc-900">Služby</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>Gym / Trenéři</li>
            <li>Rezervace</li>
            <li>Poradenství</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase text-zinc-900 font-black tracking-widest text-xs">Kontakt</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500 font-bold uppercase">
            <li>Jiráskova, Mladá Boleslav</li>
            <li>info@fitness77.cz</li>
            <li>+420 777 777 777</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 w-[min(1200px,calc(100%-32px))] border-t border-zinc-100 pt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
        © {new Date().getFullYear()} Fitness 77 Mladá Boleslav. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}

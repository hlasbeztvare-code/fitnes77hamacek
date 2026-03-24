export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-8 md:grid-cols-4">
        <div>
          <img
            src="/images/brand/logo-fitness77.png"
            alt="Fitness 77"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-3 text-sm text-zinc-500">
            Prémiový fitness ekosystém: suplementy, vybavení, bazar, trenéři a obsah.
          </p>
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
          <h4 className="font-bold uppercase text-zinc-900">Obsah</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-500">
            <li>Blog</li>
            <li>Guides</li>
            <li>Články</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

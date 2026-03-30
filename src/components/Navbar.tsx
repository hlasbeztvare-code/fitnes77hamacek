"use client";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-sm border-b border-zinc-900 z-[1000] h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <div className="font-[1000] italic uppercase text-2xl tracking-tighter text-white">
          fitness77
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 uppercase font-black italic tracking-tighter text-white text-sm">
            <a href="/gym" className="hover:text-red-600 transition-colors">GYM</a>
            <a href="/vybaveni" className="hover:text-red-600 transition-colors">VYBAVENÍ</a>
            <a href="/bazar" className="hover:text-red-600 transition-colors">BAZAR</a>
          </div>
          <button className="bg-red-600 text-white font-black italic uppercase px-6 py-2 skew-x-[-12deg] hover:bg-white hover:text-black transition-all">
            <span className="inline-block skew-x-[12deg]">NAKUPOVAT</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

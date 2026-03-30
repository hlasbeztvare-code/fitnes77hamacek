import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-1 px-4 bg-black border-b border-zinc-900 h-12 sticky top-0 z-[100] w-full">
      <div className="flex items-center cursor-pointer">
        <span className="text-white font-[1000] italic uppercase text-xl tracking-tighter">
          fitness77
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-6 uppercase font-black italic tracking-tighter text-white text-[13px]">
          {['GYM', 'VYBAVENÍ', 'BAZAR'].map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`} className="hover:text-red-600 transition-colors">{item}</a>
          ))}
        </div>
        <button className="bg-red-600 text-white font-black italic uppercase px-4 py-1 skew-x-[-10deg] text-[12px] hover:bg-white hover:text-black transition-all">
          NAKUPOVAT
        </button>
      </div>
      <div className="flex gap-4 items-center relative z-[110]">
        <div className="cursor-pointer text-white hover:text-red-600">🛒</div>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors pointer-events-auto">
           <span className="text-black text-[9px] font-black italic uppercase">USER</span>
        </div>
      </div>
    </nav>
  );
}

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-12 px-6 relative z-50 w-full mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 text-white">
        <div>
          <span className="font-[1000] italic uppercase text-2xl tracking-tighter">fitness77</span>
          <p className="text-zinc-600 text-[10px] mt-2 max-w-xs uppercase font-bold tracking-widest">
            Pure power. No bullshit. (smrk)
          </p>
        </div>
        <div className="flex gap-12 text-[11px] font-black italic uppercase tracking-tighter">
          <div className="flex flex-col gap-2">
            <span className="text-red-600">Support</span>
            <a href="#" className="hover:text-red-600">Shipping</a>
            <a href="#" className="hover:text-red-600">Returns</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-red-600">Contact</span>
            <a href="#" className="hover:text-red-600">Instagram</a>
            <a href="#" className="hover:text-red-600">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

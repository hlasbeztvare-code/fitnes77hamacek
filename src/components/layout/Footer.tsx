"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const triggerHaptic = (intensity = 15) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(intensity);
    }
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 px-6 relative z-10 overflow-hidden font-black uppercase tracking-tighter">
      {/* ČERVENÁ ZÁŘE UNIT 01 (smrk) */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF0000]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* BRAND SEKCÍ - ROVNEJ A VYSOKEJ (smrk) */}
          <div className="flex flex-col gap-6">
            <h3 className="text-6xl font-black uppercase text-white tracking-tighter leading-none">
              FITNESS<span className="text-[#FF0000]">77</span>
            </h3>
            <p className="text-zinc-600 text-[9px] font-black uppercase leading-relaxed max-w-[200px] tracking-widest">
              JIRÁSKOVA 1320, MLADÁ BOLESLAV. NEKOMPROMISNÍ GYM. ŽÁDNÝ KECY, JENOM VÝSLEDKY.
            </p>
          </div>

          {/* MENU SEKCÍ */}
          <div className="flex flex-col gap-8">
            <h4 className="text-[#FF0000] font-black uppercase tracking-[0.4em] text-[10px]">NAVIGACE</h4>
            <ul className="space-y-3 text-2xl font-black uppercase tracking-tighter">
              <li><Link href="/gym" onClick={() => triggerHaptic()} className="text-white hover:text-[#FF0000] transition-all">GYM</Link></li>
              <li><Link href="/shop" onClick={() => triggerHaptic()} className="text-white hover:text-[#FF0000] transition-all">E-SHOP</Link></li>
              <li><Link href="/bazar" onClick={() => triggerHaptic()} className="text-[#FF0000] hover:text-white transition-all tracking-widest">BAZAR</Link></li>
              <li><Link href="/kontakt" onClick={() => triggerHaptic()} className="text-white hover:text-[#FF0000] transition-all">KONTAKT</Link></li>
            </ul>
          </div>

          {/* KONTAKT SEKCÍ */}
          <div className="flex flex-col gap-8">
            <h4 className="text-[#FF0000] font-black uppercase tracking-[0.4em] text-[10px]">KONTAKT</h4>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-zinc-700 text-[8px] font-black uppercase tracking-widest">TELEFON</span>
                <a href="tel:+420777105548" onClick={() => triggerHaptic()} className="text-2xl font-black uppercase text-white hover:text-[#FF0000] transition-all tracking-tighter">+420 777 105 548</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-zinc-700 text-[8px] font-black uppercase tracking-widest">EMAIL</span>
                <a href="mailto:fitness77@post.cz" onClick={() => triggerHaptic()} className="text-xl font-black uppercase text-white hover:text-[#FF0000] transition-all tracking-tighter">FITNESS77@POST.CZ</a>
              </div>
            </div>
          </div>

          {/* LOKALITA SEKCÍ */}
          <div className="flex flex-col gap-8">
            <h4 className="text-[#FF0000] font-black uppercase tracking-[0.4em] text-[10px]">PROVOZ</h4>
            <div className="space-y-4">
              <p className="text-white font-black uppercase text-xl leading-none tracking-tighter">
                JIRÁSKOVA 1320<br />
                MLADÁ BOLESLAV
              </p>
              <div className="pt-2 flex flex-col gap-1">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-tighter">PO - PÁ: 06:00 - 21:00</p>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-tighter">SO - NE: 09:00 - 20:00</p>
              </div>
            </div>
          </div>

        </div>

        {/* SPODNÍ LIŠTA */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-zinc-800 text-[9px] font-black uppercase tracking-[0.5em]">
            © 2026 FITNESS77 // MB_ORIGINAL_GYM
          </p>
          <div className="flex gap-10">
            <a href="https://www.instagram.com/fitness77mb/" target="_blank" className="text-zinc-700 hover:text-[#FF0000] font-black uppercase text-[9px] tracking-[0.3em] transition-all">INSTAGRAM</a>
            <a href="https://www.facebook.com/fitness77mb/" target="_blank" className="text-zinc-700 hover:text-[#FF0000] font-black uppercase text-[9px] tracking-[0.3em] transition-all">FACEBOOK</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

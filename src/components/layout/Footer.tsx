"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-24 pb-12 px-6 relative z-10 overflow-hidden">
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E10600]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">
              FITNESS<span className="text-[#E10600]">77</span>
            </h3>
            <p className="text-zinc-500 text-xs font-bold uppercase italic leading-relaxed max-w-sm">
              NEJLÉPE VYBAVENÉ FITNESS V MLADÉ BOLESLAVI. PROFESIONÁLNÍ STROJE VITA, KARDIO ZÓNA A TRÉNINKY POD DOHLEDEM ODBORNÍKŮ. ŽÁDNÝ KECY, JENOM VÝSLEDKY.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">KONTAKT</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1 tracking-widest">TELEFON</p>
                <a href="tel:+420777105548" className="text-white font-black italic hover:text-[#E10600] transition-colors uppercase">+420 777 105 548</a>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1 tracking-widest">EMAIL</p>
                <a href="mailto:fitness77@post.cz" className="text-white font-black italic hover:text-[#E10600] transition-colors uppercase text-xs">FITNESS77@POST.CZ</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">LOKALITA</h4>
            <div className="space-y-4">
              <p className="text-white font-black italic uppercase leading-tight tracking-tighter">
                JIRÁSKOVA 1320<br />
                MLADÁ BOLESLAV, 293 01
              </p>
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1 tracking-widest">PROVOZNÍ DOBA</p>
                <p className="text-zinc-400 text-[11px] font-bold uppercase italic">PO - PÁ: 06:00 - 21:00</p>
                <p className="text-zinc-400 text-[11px] font-bold uppercase italic">SO - NE: 09:00 - 20:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-right md:text-left">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">SOCIÁLNÍ SÍTĚ</h4>
            <div className="flex gap-4 justify-end md:justify-start">
              <a href="https://www.instagram.com/fitness77mb/" target="_blank" className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#E10600] transition-all">
                <span className="text-xs font-black italic text-white uppercase">IG</span>
              </a>
              <a href="https://www.facebook.com/fitness77mb/" target="_blank" className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#E10600] transition-all">
                <span className="text-xs font-black italic text-white uppercase">FB</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.5em]">
            © 2026 FITNESS77 // MB_ORIGINAL_GYM
          </p>
        </div>
      </div>
    </footer>
  );
}

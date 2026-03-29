"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-24 pb-12 px-6 relative z-10 overflow-hidden">
      {/* DECENTNÍ ČERVENÁ ZÁŘE V POZADÍ (smrk) */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#E10600]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* 1. BRAND & MANIFEST */}
          <div className="flex flex-col gap-6">
            <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">
              FITNESS<span className="text-[#E10600]">77</span>
            </h3>
            <p className="text-zinc-500 text-xs font-bold uppercase italic leading-relaxed max-w-sm">
              NEJKOMPROMISNÍ HARDCORE GYM V MLADÉ BOLESLAVI. 220 M² ČISTÝ DŘINY, 30 STROJŮ VITA A ELITNÍ JEDNOTKA TRENÉRŮ. ŽÁDNÝ KECY, JENOM VÝSLEDKY.
            </p>
          </div>

          {/* 2. KONTAKTNÍ ÚDAJE (smrk) */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">KONTAKT</h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1">TELEFON</p>
                <a href="tel:+420777777777" className="text-white font-black italic hover:text-[#E10600] transition-colors uppercase">+420 777 777 777</a>
              </div>
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1">EMAIL</p>
                <a href="mailto:INFO@FITNESS77.CZ" className="text-white font-black italic hover:text-[#E10600] transition-colors uppercase">INFO@FITNESS77.CZ</a>
              </div>
            </div>
          </div>

          {/* 3. LOKALITA & OTEVÍRAČKA */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">LOKALITA</h4>
            <div className="space-y-4">
              <p className="text-white font-black italic uppercase leading-tight">
                U STADIONU 1234<br />
                MLADÁ BOLESLAV, 293 01
              </p>
              <div>
                <p className="text-[10px] text-zinc-600 font-black uppercase mb-1">OTEVÍRACÍ DOBA</p>
                <p className="text-zinc-400 text-[11px] font-bold uppercase italic">PO - PÁ: 06:00 - 22:00</p>
                <p className="text-zinc-400 text-[11px] font-bold uppercase italic">SO - NE: 08:00 - 20:00</p>
              </div>
            </div>
          </div>

          {/* 4. RYCHLÉ ODKAZY & SOCIÁLY */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[#E10600] font-black uppercase italic tracking-[0.3em] text-sm">SOCIÁLNÍ SÍTĚ</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#E10600] transition-all group">
                <span className="text-xs font-black italic text-white group-hover:scale-110 transition-transform italic">IG</span>
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#E10600] transition-all group">
                <span className="text-xs font-black italic text-white group-hover:scale-110 transition-transform italic">FB</span>
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-[#E10600] transition-all group">
                <span className="text-xs font-black italic text-white group-hover:scale-110 transition-transform italic">YT</span>
              </a>
            </div>
            <div className="mt-2">
               <Link href="/obchodni-podminky" className="text-zinc-600 text-[10px] font-bold uppercase hover:text-white transition-colors tracking-widest">OBCHODNÍ PODMÍNKY</Link>
            </div>
          </div>

        </div>

        {/* BOTTOM LINE */}
        <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.5em]">
            © 2026 FITNESS77 // VYTVOŘENO PRO JEDNOTKU // MB_EST1994
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse"></div>
            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest italic">SYSTEM_ONLINE_STATUS_ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from 'react';
import Reveal from "@/components/ui/Reveal";

export default function AdminPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 selection:bg-[#E10600]">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-3 h-3 bg-[#E10600] animate-pulse" />
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">F77_COMMAND_CENTER</h1>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FORMULÁŘ PRO PRODUKT */}
          <Reveal delay={0.1}>
            <div className="space-y-8 bg-zinc-900/30 p-8 border border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Název produktu</label>
                <input type="text" className="w-full bg-black border border-white/10 p-4 focus:border-[#E10600] outline-none font-bold uppercase italic transition-all" placeholder="ALFA_OMEGA_PROTEIN" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Cena (CZK)</label>
                <input type="number" className="w-full bg-black border border-white/10 p-4 focus:border-[#E10600] outline-none font-bold italic" placeholder="1290" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Kategorie</label>
                <select className="w-full bg-black border border-white/10 p-4 focus:border-[#E10600] outline-none font-bold uppercase italic appearance-none">
                  <option>SUPLEMENTY</option>
                  <option>PERMANENTKY</option>
                  <option>MERCH</option>
                </select>
              </div>

              <button className="w-full py-6 bg-[#E10600] text-white font-black uppercase italic text-xl hover:bg-white hover:text-black transition-all">
                Vstříknout do prodeje
              </button>
            </div>
          </Reveal>

          {/* AI UPLOAD BOX */}
          <Reveal delay={0.2}>
            <div className="relative group">
              <div className="border-2 border-dashed border-white/10 aspect-square flex flex-col items-center justify-center p-10 hover:border-[#E10600]/50 transition-all cursor-pointer bg-zinc-950">
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-full object-contain mix-blend-lighten" />
                ) : (
                  <>
                    <div className="text-6xl mb-4 opacity-20">📸</div>
                    <p className="text-zinc-500 font-black uppercase text-[10px] tracking-widest text-center">
                      Přetáhni fotku z tréninku<br/>
                      <span className="text-[#E10600]">AI automaticky smaže pozadí</span>
                    </p>
                  </>
                )}
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-zinc-700 uppercase">
                <span>Status: Waiting_for_input</span>
                <span>AI_Mode: Background_Removal</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}

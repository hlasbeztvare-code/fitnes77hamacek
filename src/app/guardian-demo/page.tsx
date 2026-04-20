"use client";

import { useHydrationFix } from '@/lib/guardian/GoliasClient';

export default function GuardianDemoPage() {
  const isReady = useHydrationFix();

  // Doomsday Ready: Pokud není klient připraven, nic nevykreslujeme (prevence hydratačních chyb)
  if (!isReady) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-7xl">
          L-CODE <span className="text-zinc-600">Dynamics</span>
        </h1>
        <div className="h-1 w-24 bg-red-600 mx-auto" />
        <p className="text-lg font-medium text-zinc-400 uppercase tracking-widest">
          Guardian Standards System v1.0
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-6 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <h3 className="font-bold text-red-500 mb-2">GOLIÁŠ v3.1</h3>
            <p className="text-sm text-zinc-500">Logika vynucena na klientské i serverové úrovni. Tokeny jsou v bezpečí Vaultu.</p>
          </div>
          <div className="p-6 border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <h3 className="font-bold text-zinc-300 mb-2">Zero-Bloat</h3>
            <p className="text-sm text-zinc-500">Čistý Tailwind. Žádné zbytečné pluginy nebo externí UI kity.</p>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-zinc-900 w-full">
          <p className="text-[10px] text-zinc-700 font-mono italic">
            "Děláme to na 300 %, nebo vůbec." - smrk
          </p>
        </footer>
      </div>
    </div>
  );
}

// clean code comment: Demo page je izolována a připravena k testování.

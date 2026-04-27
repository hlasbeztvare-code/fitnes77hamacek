'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';

function CartBridgeContent() {
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [debug, setDebug] = useState<string[]>([]);
  const hasTriggered = useRef(false);

  const addLog = (msg: string) => {
    console.log(`[GOLIÁŠ DEBUG] ${msg}`);
    setDebug(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const startSync = async () => {
    addLog('Zahajuji synchronizaci...');
    setStatus('sending');
    
    try {
      addLog(`Volám fetch /api/cart/proxy s ${items.length} položkami...`);
      const res = await fetch('/api/cart/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      addLog(`Proxy odpověděla status kódem: ${res.status}`);
      const data = await res.json();
      addLog(`Data z proxy: ${JSON.stringify(data)}`);

      if (data.success) {
        addLog('✅ SYNC ÚSPĚŠNÝ. Čekám 3 sekundy před finálním přesměrováním...');
        setTimeout(() => {
          addLog('🚀 ODPAL NA SHOPTET!');
          window.location.href = 'https://obchod.fit77.cz/objednavka/';
        }, 3000);
      } else {
        addLog(`❌ PROXY VRÁTILA CHYBU: ${data.error}`);
        setStatus('error');
      }
    } catch (err: any) {
      addLog(`❌ CATCH ERROR: ${err.message}`);
      setStatus('error');
    }
  };

  useEffect(() => {
    addLog(`Hydratace: ${hasHydrated}, Položek: ${items.length}`);
    if (hasHydrated && items.length > 0 && !hasTriggered.current) {
      hasTriggered.current = true;
      startSync();
    }
  }, [hasHydrated, items.length]);

  if (!hasHydrated) return <div className="p-10 text-white">Čekám na hydrataci...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono text-xs">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-black text-[#E10600] uppercase tracking-tighter">GOLIÁŠ Debug Console</h1>
        
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-2">
          {debug.map((log, i) => (
            <div key={i} className={log.includes('❌') ? 'text-red-500' : log.includes('✅') ? 'text-green-500' : 'text-zinc-400'}>
              {log}
            </div>
          ))}
          {status === 'sending' && <div className="animate-pulse text-[#E10600]">Pracuji...</div>}
        </div>

        {status === 'error' && (
          <div className="p-6 bg-red-900/20 border border-red-900 rounded-xl text-red-500">
            Synchronizace selhala. Zkontroluj Network tab v DevTools.
            <button onClick={() => { hasTriggered.current = false; startSync(); }} className="block mt-4 bg-red-600 text-white px-4 py-2 rounded">Zkusit znovu</button>
          </div>
        )}

        <div className="pt-10 opacity-30">
          <Link href="/" className="hover:underline">Zpět do obchodu</Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={null}>
      <CartBridgeContent />
    </Suspense>
  );
}
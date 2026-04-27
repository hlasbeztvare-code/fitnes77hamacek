'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useHydrationFix } from '@/lib/guardian/GoliasClient';

/**
 * L-CODE GUARDIAN: SecurityKernel & Cart Bridge
 * 
 * Strategie: 
 * 1. Převezme Base64 payload z URL (?payload=...)
 * 2. Dekóduje na seznam položek (priceId, productId, amount)
 * 3. Provede sekvenční AJAX volání na nativní endpoint Shoptetu
 * 4. Browser automaticky přibalí cookies (protože běžíme na subdoméně)
 * 5. Po dokončení přesměruje na /objednavka/
 */

function CartBridgeContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'initializing' | 'processing' | 'finishing' | 'error' | 'empty'>('initializing');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const hasTriggered = useRef(false);

  useEffect(() => {
    const processCart = async () => {
      if (hasTriggered.current) return;
      
      // GOLIÁŠ DeepScan: Nejdřív zkusíme Next.js router, pak nativní window fallback
      let payloadBase64 = searchParams.get('payload');
      
      if (!payloadBase64 && typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        payloadBase64 = urlParams.get('payload');
      }

      if (!payloadBase64) {
        setStatus('empty');
        return;
      }

      try {
        hasTriggered.current = true;
        setStatus('processing');
        
        // 1. Dekódování payloadu (UTF-8 Safe)
        const jsonString = decodeURIComponent(atob(payloadBase64));
        const items = JSON.parse(jsonString);

        if (!Array.isArray(items) || items.length === 0) {
          setStatus('empty');
          return;
        }

        // 2. AJAX Smyčka (Sekvenční pro stabilitu session)
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          setCurrentStep(`Přidávám: ${item.name || `Produkt ${item.priceId}`}`);
          
          const body = new URLSearchParams({
            priceId: item.priceId.toString(),
            productId: item.productId.toString(),
            amount: (item.amount || 1).toString(),
            language: 'cs',
          });

          // Nativní volání na Shoptet (předpokládá se běh na stejné (sub)doméně nebo povolený CORS)
          // Využíváme simple_ajax_cart pro čistou odpověď
          const response = await fetch('https://obchod.fit77.cz/action/Cart/addCartItem/?simple_ajax_cart=1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          });

          if (!response.ok) {
            console.warn(`[GOLIÁŠ] Item ${item.priceId} failed, status: ${response.status}`);
          }

          setProgress(Math.round(((i + 1) / items.length) * 100));
        }

        // 3. Final Leap
        setStatus('finishing');
        setCurrentStep('Přesměrování na pokladnu...');
        
        setTimeout(() => {
          window.location.href = 'https://obchod.fit77.cz/objednavka/';
        }, 800);

      } catch (err) {
        console.error('[GOLIÁŠ] Critical Bridge Failure:', err);
        setStatus('error');
      }
    };

    processCart();
  }, [searchParams]);

  if (status === 'empty') {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl text-zinc-800 font-black">404</div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Prázdný <span className="text-red-600">payload</span></h1>
        <p className="text-zinc-500 font-medium italic">Nebyly nalezeny žádné produkty k přenosu.</p>
        <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
          ZPĚT DOMŮ
        </button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl text-red-600 font-black">ERR</div>
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Selhání <span className="text-red-600">přenosu</span></h1>
        <p className="text-zinc-500 font-medium italic">Nepodařilo se synchronizovat košík se Shoptetem.</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 border border-red-600 text-red-600 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="relative mb-12">
        {/* Progress Ring / Spinner */}
        <div className="flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-zinc-900"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={440}
              initial={{ strokeDashoffset: 440 }}
              animate={{ strokeDashoffset: 440 - (440 * progress) / 100 }}
              className="text-red-600"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{progress}%</span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Sync Status</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
          {status === 'processing' ? 'Synchronizace' : 'Dokončeno'}
        </h1>
        <div className="h-1 w-12 bg-red-600 mx-auto" />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-zinc-400 font-mono uppercase tracking-widest"
          >
            {currentStep || 'Inicializace GOLIÁŠ protokolu...'}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="mt-16 pt-8 border-t border-zinc-900">
        <div className="flex justify-between items-center opacity-30">
          <span className="text-[8px] font-black tracking-[0.4em] uppercase text-zinc-500">Secure Channel</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const isReady = useHydrationFix();

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
      <Suspense fallback={
        <div className="text-white font-black uppercase tracking-tighter animate-pulse">
          Loading SecurityKernel...
        </div>
      }>
        <CartBridgeContent />
      </Suspense>

      <footer className="fixed bottom-8 w-full text-center">
        <p className="text-[9px] text-zinc-800 font-mono uppercase tracking-[0.5em]">
          L-CODE Dynamics // Guardian Standard // Doomsday Ready
        </p>
      </footer>
    </main>
  );
}

// clean code comment: Bridge logika je plně klientská pro nativní session handling. Bezpečné dekódování payloadu a sekvenční AJAX.
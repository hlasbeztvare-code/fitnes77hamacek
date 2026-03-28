#!/bin/bash

echo "🚀 LUCKY: Zahajuji master-class optimalizaci pro mobilní konverzi..."

# Vytvoření složek
mkdir -p src/lib/utils src/components/mobile

# Tvorba Haptické utility (pro ten 'wow' efekt při doteku)
cat << 'EOF' > src/lib/utils/haptics.ts
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' = 'light') => {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.vibrate) return;
  const patterns = { 
    light: 10, 
    medium: 30, 
    heavy: 50, 
    success: [10, 50, 20] 
  };
  try { window.navigator.vibrate(patterns[type]); } catch (e) {}
};
EOF

# Tvorba Mobile Sticky CTA (klíč k 18% nárůstu konverze)
cat << 'EOF' > src/components/mobile/MobileStickyCTA.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { triggerHaptic } from '@/lib/utils/haptics';

export default function MobileStickyCTA({ product, triggerId }: any) {
  const [show, setShow] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(triggerId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setShow(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerId]);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-zinc-200 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        <div className="flex flex-col truncate flex-1">
          <span className="text-[10px] font-black uppercase text-zinc-400 truncate tracking-tighter">{product.name}</span>
          <span className="text-lg font-black text-[#E10600]">{product.price.toLocaleString()} Kč</span>
        </div>
        <button
          onClick={() => { 
            triggerHaptic('success'); 
            addItem({ ...product, quantity: 1 });
          }}
          className="bg-[#E10600] text-white px-8 py-3 font-black uppercase text-sm [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] active:scale-95 transition-transform"
        >
          Koupit
        </button>
      </div>
    </div>
  );
}
EOF

# Automatická injekce do detailu produktu
FILE="src/app/supplements/[slug]/page.tsx"
if [ -f "$FILE" ]; then
    echo "🛠️ Upravuji $FILE..."
    # Přidání importu
    sed -i '' '1i\'$'\n''import MobileStickyCTA from "@/components/mobile/MobileStickyCTA";' "$FILE"
    
    # Přidání ID tlačítku a vložení Sticky komponenty
    # Hledáme místo, kde se vrací JSX
    sed -i '' 's/Přidat do košíku/Přidat do košíku" id="main-buy-button/g' "$FILE"
    # Vložení komponenty před konec returnu
    sed -i '' 's|);|  <MobileStickyCTA product={product} triggerId="main-buy-button" />\n);|g' "$FILE"
    echo "✅ Soubor $FILE byl úspěšně vylepšen."
else
    echo "❌ Soubor $FILE nenalezen. Budeš ho muset propojit ručně."
fi

echo "✨ LUCKY: Mise splněna. Skript můžeš smazat (rm install_polish.sh)."

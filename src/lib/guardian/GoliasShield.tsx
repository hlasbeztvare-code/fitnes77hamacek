"use client";

import { useHydrationFix } from './GoliasClient';
import { ReactNode } from 'react';

/**
 * GOLIÁŠ Shield | Doomsday Ready Gatekeeper
 * 
 * Tento komponent chrání celou aplikaci před chybami hydratace (#418).
 * Zajišťuje, že klientská logika se spustí až ve chvíli, kdy je DOM stabilizován.
 */
export function GoliasShield({ children }: { children: ReactNode }) {
  const isReady = useHydrationFix();

  // Během prvního renderu na serveru nebo před hydratací na klientovi
  // zachováváme strukturu, ale můžeme potlačit interaktivní části pokud je to nutné.
  if (!isReady) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

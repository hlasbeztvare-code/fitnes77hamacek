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

  // Abychom neblokovali legitimní crawlery (Google/Meta) a SEO,
  // vracíme děti napřímo bez obalování do skrytých elementů. SSR tak proběhne čistě.
  // Goliáš Client Hook se dál stará o stabilizaci a logování.
  return <>{children}</>;
}

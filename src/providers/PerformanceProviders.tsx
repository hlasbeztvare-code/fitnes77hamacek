"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Přesunuto do Client Componentu, aby ssr: false fungovalo správně v App Routeru
const SmoothScrollProvider = dynamic(() => import("@/providers/SmoothScrollProvider"), { ssr: false });
const PageTransition = dynamic(() => import("@/components/layout/PageTransition"), { ssr: false });

export function PerformanceProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageTransition>
        {children}
      </PageTransition>
    </SmoothScrollProvider>
  );
}

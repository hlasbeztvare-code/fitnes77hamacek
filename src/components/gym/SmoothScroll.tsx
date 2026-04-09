'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

const SmoothScroll = () => {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ── Anchor hash scroll po načtení stránky ──────────────────────
    // Pokud URL obsahuje hash (#pricing, #trainers, ...), scrolluj na element
    const hash = window.location.hash;
    if (hash) {
      // Počkáme než se komponenty renderují, pak scrollujeme
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
        }
      }, 300);
      return () => {
        clearTimeout(timer);
        lenis.destroy();
        lenisInstance = null;
      };
    }

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, [pathname]);

  // ── Klik na anchor linky (<a href="#sekce">) ────────────────────
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor || !lenisInstance) return;

      const hash = anchor.getAttribute('href');
      if (!hash) return;

      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        lenisInstance.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
        // Updatuj URL hash bez reloadu
        window.history.pushState(null, '', hash);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
};

export default SmoothScroll;

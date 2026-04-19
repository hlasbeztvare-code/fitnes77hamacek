'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-[9999] flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-1 active:scale-95 md:hidden"
          aria-label="Zpět nahoru"
        >
          <ChevronUp className="h-6 w-6 stroke-[3px]" />
        </button>
      )}
    </>
  );
}

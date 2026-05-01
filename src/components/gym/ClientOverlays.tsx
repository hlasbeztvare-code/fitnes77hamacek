"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const CustomCursor = dynamic(() => import('@/components/gym/CustomCursor'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/gym/SmoothScroll'), { ssr: false });
const FloatingPhotos = dynamic(() => import('@/components/gym/FloatingPhotos'), { ssr: false });

export default function ClientOverlays() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay heavy JS to reduce initial blocking time (L-CODE Standard)
    const timer = setTimeout(() => setShouldRender(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <FloatingPhotos />
    </>
  );
}

"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const CustomCursor = dynamic(() => import('@/components/gym/CustomCursor'), { ssr: false });
const SmoothScroll = dynamic(() => import('@/components/gym/SmoothScroll'), { ssr: false });
const FloatingPhotos = dynamic(() => import('@/components/gym/FloatingPhotos'), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <FloatingPhotos />
    </>
  );
}

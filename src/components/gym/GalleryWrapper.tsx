"use client";

import dynamic from 'next/dynamic';

const HorizontalGallery = dynamic(() => import('@/components/gym/HorizontalGallery'), { ssr: false });

export default function GalleryWrapper() {
  return <HorizontalGallery />;
}

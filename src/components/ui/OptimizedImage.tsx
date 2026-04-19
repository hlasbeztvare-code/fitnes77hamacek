'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export const OptimizedImage = ({ src, alt, ...props }: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${isLoading ? 'animate-pulse' : ''}`}>
      <Image
        {...props}
        src={src}
        alt={alt}
        loading="lazy"
        className={`duration-700 ease-in-out ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
};

"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * L-CODE DYNAMICS | LazyVideo Component
 * Implementuje Intersection Observer pro líné načítání videí.
 * Zajišťuje preload="none" a startuje stahování až při viditelnosti.
 */
export default function LazyVideo({ src, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "100px" // Začneme načítat kousek předem
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      preload="none"
      {...props}
    >
      {shouldLoad && <source src={src} type="video/webm" />}
      {shouldLoad && <source src={src.replace('.webm', '.mp4')} type="video/mp4" />}
    </video>
  );
}

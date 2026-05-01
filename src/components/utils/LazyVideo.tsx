"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

/**
 * L-CODE DYNAMICS | LazyVideo Component (THE FINAL PURGE)
 * Implementuje striktní "Data-src Pattern".
 * Video tag nemá SRC hned při renderu. Načítá se až při viditelnosti.
 */
export default function LazyVideo({ src, poster, ...props }: LazyVideoProps) {
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
        threshold: 0.01,
        rootMargin: "50px" 
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
      poster={poster}
      {...props}
    >
      {shouldLoad && <source src={src} type="video/webm" />}
    </video>
  );
}

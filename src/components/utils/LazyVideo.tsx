"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

/**
 * L-CODE DYNAMICS | LazyVideo Component (THE FINAL PURGE - ULTRA RELIABLE)
 * Používá přímé SRC pro video tag po aktivaci, což je spolehlivější pro autoPlay a onCanPlay.
 */
const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({ src, poster, ...props }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Expozice nativního elementu pro vnější Ref (Hero, WowHero)
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

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
        rootMargin: "100px" // Trochu větší margin pro jistotu
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
      src={shouldLoad ? src : undefined}
      {...props}
    />
  );
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;

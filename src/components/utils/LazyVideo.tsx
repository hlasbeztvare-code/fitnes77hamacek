"use client";

import { forwardRef } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  poster?: string;
}

/**
 * L-CODE DYNAMICS | Zero-JS Video Component
 * Jednoduchý wrapper, který spoléhá na nativní preload="none" prohlížeče.
 * Žádný JavaScript, žádné blokování hlavního vlákna.
 */
const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({ src, poster, ...props }, ref) => {
  return (
    <video
      ref={ref}
      preload="none"
      poster={poster}
      src={src}
      {...props}
    />
  );
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;

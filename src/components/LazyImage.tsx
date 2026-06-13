/**
 * LazyImage — Performance-optimized image with:
 * - IntersectionObserver lazy loading (200px rootMargin pre-load)
 * - Blur-up shimmer placeholder (zero CLS via aspect-ratio container)
 * - Smooth opacity fade-in on load
 * - GPU-only transitions (opacity only, no layout triggers)
 * - decoding="async" to prevent main thread blocking
 */
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio for the container, e.g. "4/3" or "1/1". Prevents CLS. */
  aspectRatio?: string;
  /** If true, loads immediately (for above-the-fold images) */
  eager?: boolean;
  onClick?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = "",
  aspectRatio,
  eager = false,
  onClick,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(eager);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" } // pre-load 300px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  const containerStyle = aspectRatio
    ? { aspectRatio, position: "relative" as const, overflow: "hidden" as const }
    : { position: "relative" as const, overflow: "hidden" as const };

  return (
    <div ref={ref} style={containerStyle} onClick={onClick}>
      {/* Shimmer skeleton — always visible until image loads */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-muted via-secondary to-muted"
        style={{
          backgroundSize: "200% 100%",
          animation: isLoaded ? "none" : "shimmer 1.5s infinite linear",
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        }}
      />

      {/* Actual image — only renders src when in viewport */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          className={className}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
            willChange: isLoaded ? "auto" : "opacity",
          }}
        />
      )}
    </div>
  );
}

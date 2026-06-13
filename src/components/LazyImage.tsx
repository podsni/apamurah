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
  const [isError, setIsError] = useState(false);
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
    <div ref={ref} style={containerStyle} onClick={onClick} className="group">
      {/* Shimmer skeleton — always visible until image loads or errors */}
      {!isLoaded && !isError && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-muted via-secondary to-muted"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite linear",
            zIndex: 1,
          }}
        />
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/50 text-muted-foreground">
          <svg
            className="h-8 w-8 opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-2 text-[10px] font-medium uppercase tracking-wider opacity-40">
            Image failed to load
          </span>
        </div>
      )}

      {/* Actual image — only renders src when in viewport */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          className={className}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: isLoaded ? "auto" : "opacity",
          }}
        />
      )}
    </div>
  );
}

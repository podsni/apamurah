/**
 * LazyImage — performance-optimized image primitive.
 *
 * Goals:
 * - Avoid CLS with aspect-ratio or parent-fill mode.
 * - Load only when near viewport unless marked eager/priority.
 * - Expose fetchPriority + sizes so hero/first-card images win bandwidth.
 * - Show a skeleton that matches the final image box, not a spinner.
 */
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  /** Aspect ratio for the container, e.g. "4/3" or "16/9". Prevents CLS. */
  aspectRatio?: string;
  /** If true, loads immediately. Use only for LCP / first visible image. */
  eager?: boolean;
  /** Stronger hint than eager: marks image as high-priority for the browser. */
  priority?: boolean;
  sizes?: string;
  onClick?: () => void;
}

export function LazyImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  aspectRatio,
  eager = false,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  onClick,
}: LazyImageProps) {
  const shouldLoadImmediately = eager || priority;
  const [isInView, setIsInView] = useState(shouldLoadImmediately);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoadImmediately) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadImmediately]);

  const containerStyle = aspectRatio
    ? { aspectRatio, position: "relative" as const, overflow: "hidden" as const }
    : { position: "relative" as const, overflow: "hidden" as const };

  return (
    <div
      ref={ref}
      style={containerStyle}
      onClick={onClick}
      className={`relative overflow-hidden bg-muted ${wrapperClassName}`}
    >
      {!isLoaded && !isError && (
        <div className="absolute inset-0 z-[1] overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,hsl(var(--secondary))_38%,transparent_72%)] animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5" />
        </div>
      )}

      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/70 px-4 text-center text-muted-foreground">
          <svg className="h-8 w-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] opacity-60">
            Foto belum bisa dimuat
          </span>
        </div>
      )}

      {isInView && (
        <img
          src={src}
          alt={alt}
          decoding="async"
          loading={shouldLoadImmediately ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
          className={className}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: isLoaded ? "auto" : "opacity",
          }}
        />
      )}
    </div>
  );
}

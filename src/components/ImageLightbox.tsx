import { useEffect, useRef, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  altBase?: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.5;

export function ImageLightbox({
  images,
  initialIndex = 0,
  altBase = "Villa",
  onClose,
}: ImageLightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pointer / touch tracking
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchTime = useRef<number>(0);

  // Preload adjacent images for instant prev/next navigation
  useEffect(() => {
    const preload = (i: number) => {
      if (i < 0 || i >= images.length) return;
      const img = new Image();
      img.src = images[i];
    };
    preload(idx - 1);
    preload(idx + 1);
  }, [idx, images]);

  // Reset pan+zoom when image changes
  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsLoaded(false);
  }, [idx]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, scale]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const navigate = useCallback(
    (dir: -1 | 1) => {
      setIdx((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  const zoomIn = useCallback(() =>
    setScale((s) => Math.min(s + ZOOM_STEP, MAX_SCALE)), []);
  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - ZOOM_STEP, MIN_SCALE);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Mouse wheel zoom
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((s) => {
      const next = Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE);
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 });
      return next;
    });
  };

  // Double click to zoom
  const handleDoubleClick = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    } else {
      const targetScale = 2.5;
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left - rect.width / 2;
      const clickY = e.clientY - rect.top - rect.height / 2;
      setScale(targetScale);
      setOffset({
        x: -clickX * (targetScale - 1),
        y: -clickY * (targetScale - 1),
      });
    }
  }, [scale]);

  // Pointer events (mouse + touch drag)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // handled by touch events
    if (scale <= 1) return;
    e.preventDefault();
    containerRef.current?.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
  };
  const onPointerUp = () => {
    setIsDragging(false);
    dragStart.current = null;
  };

  // Touch events for swipe (navigate) and pinch (zoom)
  const touchStartRef = useRef<React.TouchEvent | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      pinchStart.current = { dist: Math.hypot(dx, dy), scale };
    } else {
      const now = Date.now();
      if (now - lastTouchTime.current < 300) {
        e.preventDefault();
        // Double tap!
        if (scale > 1) {
          setScale(1);
          setOffset({ x: 0, y: 0 });
        } else {
          const targetScale = 2.5;
          const rect = e.currentTarget.getBoundingClientRect();
          const touch = e.touches[0];
          const touchX = touch.clientX - rect.left - rect.width / 2;
          const touchY = touch.clientY - rect.top - rect.height / 2;
          setScale(targetScale);
          setOffset({
            x: -touchX * (targetScale - 1),
            y: -touchY * (targetScale - 1),
          });
        }
        lastTouchTime.current = 0;
        return;
      }
      lastTouchTime.current = now;

      touchStartRef.current = e;
      dragStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        ox: offset.x,
        oy: offset.y,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchStart.current) {
      const dx = e.touches[1].clientX - e.touches[0].clientX;
      const dy = e.touches[1].clientY - e.touches[0].clientY;
      const dist = Math.hypot(dx, dy);
      const newScale = Math.min(
        Math.max((pinchStart.current.scale * dist) / pinchStart.current.dist, MIN_SCALE),
        MAX_SCALE
      );
      setScale(newScale);
      if (newScale === MIN_SCALE) setOffset({ x: 0, y: 0 });
    } else if (e.touches.length === 1 && dragStart.current) {
      if (scale > 1) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setOffset({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy });
      }
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (pinchStart.current) {
      pinchStart.current = null;
      return;
    }
    if (scale > 1) {
      dragStart.current = null;
      return;
    }
    // Swipe to navigate
    if (!touchStartRef.current) return;
    const startX = touchStartRef.current.touches[0].clientX;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
    touchStartRef.current = null;
    dragStart.current = null;
  };

  const backdrop = "fixed inset-0 z-50 flex items-center justify-center";

  return (
    <div className={backdrop} role="dialog" aria-modal="true" aria-label="Image viewer">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={scale === 1 ? onClose : undefined}
      />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/60 to-transparent">
        <span className="text-white/80 text-sm font-medium tabular-nums">
          {idx + 1} / {images.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-white/60 text-xs tabular-nums w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 disabled:opacity-30 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          {scale > 1 && (
            <button
              onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }}
              className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 transition-colors"
              aria-label="Reset zoom"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image container */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden select-none"
        style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          </div>
        )}
        <img
          key={idx}
          src={images[idx]}
          alt={`${altBase} ${idx + 1}`}
          onLoad={() => setIsLoaded(true)}
          onDoubleClick={handleDoubleClick}
          className="max-h-[calc(100dvh-120px)] max-w-[calc(100vw-80px)] rounded-lg object-contain shadow-2xl transition-opacity duration-300"
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.32,0.72,0,1)",
            opacity: isLoaded ? 1 : 0,
            willChange: "transform",
          }}
          draggable={false}
        />
      </div>

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-4 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`shrink-0 h-12 w-16 overflow-hidden rounded transition-all duration-200 sm:h-14 sm:w-20 ${
                i === idx
                  ? "ring-2 ring-white ring-offset-1 ring-offset-transparent opacity-100 scale-105"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Swipe hint (mobile only, shows briefly) */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center opacity-0 sm:hidden">
        <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/70">
          ← geser →
        </span>
      </div>
    </div>
  );
}

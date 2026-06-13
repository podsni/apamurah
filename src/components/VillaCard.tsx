import { Link } from "@tanstack/react-router";
import {
  Star,
  BedDouble,
  Bath,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Villa } from "@/data/villas";
import { formatIDR } from "@/data/villas";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useFavorites } from "@/hooks/use-favorites";
import { LazyImage } from "@/components/LazyImage";

export function VillaCard({ villa, priority = false }: { villa: Villa; priority?: boolean }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(villa.slug);
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardInView, setCardInView] = useState(priority);
  const cardRef = useRef<HTMLElement>(null);

  const total = villa.images.length;

  useEffect(() => {
    if (priority) return;
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "360px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  const prevImg = useCallback(
    (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setImgIdx((i) => (i - 1 + total) % total);
    },
    [total],
  );
  const nextImg = useCallback(
    (e?: React.SyntheticEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      setImgIdx((i) => (i + 1) % total);
    },
    [total],
  );

  // Auto-rotate gallery every 6s (paused on hover). Respect reduced-motion users.
  useEffect(() => {
    if (total <= 1 || isHovered || !cardInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setImgIdx((i) => (i + 1) % total), 6000);
    return () => window.clearInterval(id);
  }, [total, isHovered, cardInView]);

  // Touch swipe support
  const startX = useRef<number | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startX.current == null) return;
      const dx = (e.changedTouches[0]?.clientX ?? startX.current) - startX.current;
      if (Math.abs(dx) > 40) {
        if (dx < 0) nextImg(e);
        else prevImg(e);
      }
      startX.current = null;
    },
    [nextImg, prevImg],
  );

  // Performance: render only the visible image. Preload the next image during idle time
  // so AB Villa's first card no longer downloads image_33 just because it is "previous".
  useEffect(() => {
    if (total <= 1 || typeof window === "undefined" || !cardInView || !isHovered) return;
    const next = villa.images[(imgIdx + 1) % total];
    const load = () => {
      const img = new Image();
      img.decoding = "async";
      img.src = next;
    };
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(load, { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(load, 700);
    return () => window.clearTimeout(id);
  }, [imgIdx, total, villa.images, cardInView, isHovered]);

  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Shell (Double Bezel) */}
      <div className="relative p-1.5 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10 overflow-hidden">
        {/* Inner Core */}
        <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-card shadow-[0_4px_20px_-4px_rgba(20,50,90,0.1)]">
          {/* Image carousel container */}
          <div
            className="relative overflow-hidden bg-muted cursor-pointer"
            style={{ aspectRatio: "4/3" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Optimized active image only */}
            <Link
              key={`${villa.slug}-${imgIdx}`}
              to="/villas/$slug"
              params={{ slug: villa.slug }}
              className="absolute inset-0 z-[1] block outline-none"
            >
              <LazyImage
                src={villa.images[imgIdx] ?? villa.cover}
                alt={`${villa.name} — foto ${imgIdx + 1}`}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.045]"
                wrapperClassName="h-full w-full"
                aspectRatio="4/3"
                eager={priority && imgIdx === 0}
                priority={priority && imgIdx === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-70" />
            </Link>

            {/* Top Badges */}
            <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between">
              <span className="rounded-full bg-white/90 dark:bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground shadow-sm backdrop-blur-md border border-white/20">
                {villa.tag}
              </span>

              <div className="flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md border border-white/10">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {villa.rating}
              </div>
            </div>

            {/* Favorite toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle(villa.slug);
              }}
              className="absolute right-3 bottom-3 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-90"
              aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
            >
              <Heart
                className={`h-4.5 w-4.5 transition-all duration-300 ${
                  fav ? "fill-red-500 stroke-red-500 scale-110" : "stroke-white"
                }`}
              />
            </button>

            {/* Carousel Controls */}
            {total > 1 && (
              <>
                <button
                  className="absolute inset-y-0 left-0 z-10 w-1/4 cursor-w-resize"
                  onClick={prevImg}
                  aria-label="Foto sebelumnya"
                />
                <button
                  className="absolute inset-y-0 right-0 z-10 w-1/4 cursor-e-resize"
                  onClick={nextImg}
                  aria-label="Foto berikutnya"
                />

                {/* Visual indicator of controls on hover */}
                <button
                  onClick={prevImg}
                  aria-label="Foto sebelumnya"
                  className="absolute left-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImg}
                  aria-label="Foto berikutnya"
                  className="absolute right-3 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Micro indicators */}
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
                  {villa.images.slice(0, Math.min(total, 6)).map((_, i) => (
                    <div
                      key={i}
                      aria-hidden="true"
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === imgIdx ? "w-4 bg-white" : "w-1 bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Card Body */}
          <div className="flex flex-col p-5 sm:p-6 bg-card">
            <div className="flex justify-between items-start gap-3">
              <Link
                to="/villas/$slug"
                params={{ slug: villa.slug }}
                className="group/title block min-w-0"
              >
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors duration-300 group-hover/title:text-primary truncate">
                  {villa.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium uppercase tracking-wider">{villa.area}</span>
                </div>
              </Link>
            </div>

            {/* Specs with better visual rhythm */}
            <div className="mt-5 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4 text-primary/60" />
                <span>{villa.bedrooms} KT</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-primary/60" />
                <span>{villa.bathrooms} KM</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary/60" />
                <span>{villa.guests} Tamu</span>
              </div>
            </div>

            {/* Price section with "machined" look */}
            <div className="mt-6 flex items-center justify-between gap-4 pt-5 border-t border-border/60">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-none mb-1.5">
                  Mulai dari
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-foreground tabular-nums leading-none tracking-tight">
                    {formatIDR(villa.price)}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground">/ malam</span>
                </div>
              </div>

              {/* Island Button Architecture */}
              <WhatsAppButton
                size="sm"
                label="Pesan"
                message={`Halo Apamurahbanget, saya mau pesan ${villa.name}. Mohon info ketersediaan & harga.`}
                className="rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-95 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

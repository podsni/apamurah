import { Link } from "@tanstack/react-router";
import { Star, BedDouble, Bath, Users, Heart, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useCallback } from "react";
import type { Villa } from "@/data/villas";
import { formatIDR } from "@/data/villas";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useFavorites } from "@/hooks/use-favorites";
import { LazyImage } from "@/components/LazyImage";

export function VillaCard({ villa }: { villa: Villa }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(villa.slug);
  const [imgIdx, setImgIdx] = useState(0);

  const prevImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIdx((i) => (i - 1 + villa.images.length) % villa.images.length);
    },
    [villa.images.length]
  );
  const nextImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIdx((i) => (i + 1) % villa.images.length);
    },
    [villa.images.length]
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[0_2px_8px_rgb(20_50_90/0.06),0_8px_24px_-8px_rgb(20_50_90/0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgb(20_50_90/0.10),0_16px_40px_-12px_rgb(20_50_90/0.16)]">
      {/* Image carousel */}
      <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: "4/3" }}>
        <Link
          to="/villas/$slug"
          params={{ slug: villa.slug }}
          className="block h-full"
        >
          <LazyImage
            src={villa.images[imgIdx] ?? villa.cover}
            alt={`${villa.name} — foto ${imgIdx + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            aspectRatio="4/3"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </Link>

        {/* Tag badge */}
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground shadow-sm">
          {villa.tag}
        </span>

        {/* Rating badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {villa.rating}
          <span className="text-white/60">({villa.reviews})</span>
        </div>

        {/* Favourite button */}
        <button
          onClick={() => toggle(villa.slug)}
          aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
          className="absolute right-3 bottom-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-200 hover:bg-black/60 active:scale-90"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${fav ? "fill-red-400 stroke-red-400" : "stroke-white"}`}
          />
        </button>

        {/* Prev / Next arrows — show on hover or always on mobile */}
        {villa.images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/60 active:scale-90 sm:flex"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/60 active:scale-90 sm:flex"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {villa.images.slice(0, Math.min(villa.images.length, 8)).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setImgIdx(i); }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Foto ${i + 1}`}
                />
              ))}
              {villa.images.length > 8 && (
                <span className="text-white/60 text-[10px] leading-none self-end ml-0.5">+{villa.images.length - 8}</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Name & location */}
        <Link to="/villas/$slug" params={{ slug: villa.slug }} className="block group/link">
          <h3 className="text-[15px] font-semibold leading-snug text-foreground transition-colors duration-200 group-hover/link:text-primary">
            {villa.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{villa.area}</p>
        </Link>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5 shrink-0" /> {villa.bedrooms} KT
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 shrink-0" /> {villa.bathrooms} KM
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0" /> s/d {villa.guests} tamu
          </span>
        </div>

        {/* Amenity tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {villa.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
            >
              {a}
            </span>
          ))}
          {villa.amenities.length > 3 && (
            <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{villa.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border/50 pt-4">
          <div className="min-w-0">
            {/* Weekday price */}
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-foreground tabular-nums leading-none">
                {formatIDR(villa.price)}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground leading-none">
              /malam weekday
            </p>
            {/* Weekend price */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-xs font-semibold text-primary tabular-nums">
                {formatIDR(villa.priceWeekend)}
              </span>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                weekend
              </span>
            </div>
          </div>
          <WhatsAppButton
            size="sm"
            label="Pesan WA"
            message={`Halo Apamurahbanget, saya mau pesan ${villa.name}. Mohon info ketersediaan & harga.`}
          />
        </div>

        {/* View detail link */}
        <Link
          to="/villas/$slug"
          params={{ slug: villa.slug }}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border/60 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Lihat detail & semua foto
        </Link>
      </div>
    </article>
  );
}

import { Link } from "@tanstack/react-router";
import { Star, BedDouble, Bath, Users, Heart } from "lucide-react";
import type { Villa } from "@/data/villas";
import { formatIDR } from "@/data/villas";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useFavorites } from "@/hooks/use-favorites";

export function VillaCard({ villa }: { villa: Villa }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(villa.slug);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]">
      <Link
        to="/villas/$slug"
        params={{ slug: villa.slug }}
        className="relative block overflow-hidden"
      >
        <img
          src={villa.cover}
          alt={villa.name}
          width={1024}
          height={768}
          loading="lazy"
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">
          {villa.tag}
        </span>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
          <Star className="h-3 w-3 fill-current text-primary" />
          {villa.rating}
          <span className="text-muted-foreground">({villa.reviews})</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <Link to="/villas/$slug" params={{ slug: villa.slug }} className="block min-w-0">
            <h3 className="text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
              {villa.name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{villa.area}, Batu</p>
          </Link>
          <button
            onClick={() => toggle(villa.slug)}
            aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
            className="mt-0.5 shrink-0 grid h-8 w-8 place-items-center rounded-full transition-all duration-200 hover:bg-red-50 active:scale-90"
          >
            <Heart
              className={
                "h-5 w-5 transition-all duration-200 " +
                (fav ? "fill-red-500 stroke-red-500" : "stroke-muted-foreground")
              }
            />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <BedDouble className="h-3.5 w-3.5" /> {villa.bedrooms} KT
          </span>
          <span className="inline-flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" /> {villa.bathrooms} KM
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {villa.guests} Tamu
          </span>
        </div>
        <div className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
          {villa.amenities.slice(0, 3).map((c) => (
            <span
              key={c}
              className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/50 pt-4">
          <div>
            <div className="text-lg font-semibold text-foreground tabular-nums">
              {formatIDR(villa.price)}
            </div>
            <div className="text-xs text-muted-foreground">/malam</div>
          </div>
          <WhatsAppButton
            size="sm"
            label="Pesan WA"
            message={`Halo Apamurahbanget, saya mau pesan ${villa.name} (${villa.area}, Batu). Mohon info ketersediaan & harga.`}
          />
        </div>
      </div>
    </article>
  );
}

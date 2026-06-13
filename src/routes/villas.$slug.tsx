import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Users,
  Star,
  MapPin,
  Check,
  ShieldCheck,
  Clock,
  Phone,
  Palmtree,
  LayoutGrid,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { getVilla, VILLAS, formatIDR } from "@/data/villas";
import type { Villa } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImageLightbox } from "@/components/ImageLightbox";
import { LazyImage } from "@/components/LazyImage";
import { WA_DISPLAY, WA_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/villas/$slug")({
  loader: ({ params }): { villa: Villa } => {
    const villa = getVilla(params.slug);
    if (!villa) throw notFound();
    return { villa };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.villa;
    if (!v) return {};
    return {
      meta: [
        { title: `${v.name} — Sewa Villa di ${v.area}` },
        {
          name: "description",
          content: `${v.name} di ${v.area}. ${v.bedrooms} kamar tidur, kapasitas ${v.guests} tamu. Mulai ${formatIDR(v.price)}/malam weekday. Pesan via WhatsApp.`,
        },
        { property: "og:title", content: `${v.name} — Apamurahbanget` },
        { property: "og:description", content: v.description },
        { property: "og:image", content: v.cover },
        { name: "twitter:image", content: v.cover },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-foreground">Villa tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Villa yang kamu cari mungkin sudah tidak tersedia.
        </p>
        <Link
          to="/villas"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Lihat Daftar Villa
        </Link>
      </div>
    </div>
  ),
  component: VillaDetail,
});

function VillaDetail() {
  const { villa } = Route.useLoaderData() as { villa: Villa };
  const similar = VILLAS.filter((v) => v.slug !== villa.slug).slice(0, 3);
  const waMessage = `Halo Apamurahbanget, saya tertarik booking ${villa.name} di ${villa.area}. Mohon info ketersediaan & cara pembayaran.`;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIdx(i);
    setLightboxOpen(true);
  };

  // Airbnb-style: show first 5 in grid, rest behind "show all" button
  const GRID_COUNT = 5;

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      {lightboxOpen && (
        <ImageLightbox
          images={villa.images}
          initialIndex={lightboxIdx}
          altBase={villa.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Palmtree className="h-4 w-4" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Apa<span className="text-primary">murahbanget</span>
            </span>
          </Link>
          <Link
            to="/villas"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Semua Villa
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-7">

        {/* ── AIRBNB-STYLE 5-GRID GALLERY ── */}
        <section aria-label="Galeri foto">

          {/* Desktop: 5-grid mosaic | Mobile: 1 hero + 2x2 strip */}
          <div className="relative">

            {/* Mobile gallery — hero + row of 4 */}
            <div className="grid grid-cols-2 grid-rows-[220px_110px] gap-1.5 overflow-hidden rounded-xl sm:hidden">
              {/* Main big image */}
              <button
                className="col-span-2 row-span-1 overflow-hidden rounded-none"
                onClick={() => openLightbox(0)}
                aria-label="Buka galeri foto"
              >
                <LazyImage
                  eager
                  src={villa.images[0]}
                  alt={villa.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  aspectRatio="16/9"
                />
              </button>
              {/* 4 small thumbnails */}
              {villa.images.slice(1, 5).map((src, i) => {
                const realIdx = i + 1;
                const isLast = i === 3 && villa.images.length > 5;
                return (
                  <button
                    key={realIdx}
                    onClick={() => openLightbox(realIdx)}
                    className="relative overflow-hidden"
                    aria-label={`Foto ${realIdx + 1}`}
                  >
                    <LazyImage
                      src={src}
                      alt={`${villa.name} ${realIdx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      aspectRatio="1/1"
                    />
                    {isLast && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white">
                        <div className="text-center">
                          <p className="text-xl font-bold">+{villa.images.length - 5}</p>
                          <p className="text-[11px] opacity-80">foto</p>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop: Airbnb 5-grid mosaic */}
            <div className="hidden sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:gap-2 sm:overflow-hidden sm:rounded-2xl"
                 style={{ height: "460px" }}>
              {/* Big main image — spans 2 cols 2 rows */}
              <button
                className="col-span-2 row-span-2 overflow-hidden"
                onClick={() => openLightbox(0)}
                aria-label="Buka galeri foto"
              >
                <LazyImage
                  eager
                  src={villa.images[0]}
                  alt={villa.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  aspectRatio="1/1"
                />
              </button>
              {/* 4 side images */}
              {villa.images.slice(1, 5).map((src, i) => {
                const realIdx = i + 1;
                const isLast = i === 3 && villa.images.length > GRID_COUNT;
                return (
                  <button
                    key={realIdx}
                    onClick={() => openLightbox(realIdx)}
                    className="relative overflow-hidden"
                    aria-label={`Foto ${realIdx + 1}`}
                  >
                    <LazyImage
                      src={src}
                      alt={`${villa.name} ${realIdx + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      aspectRatio="4/3"
                    />
                    {isLast && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white">
                        <div className="text-center">
                          <p className="text-2xl font-bold">+{villa.images.length - GRID_COUNT}</p>
                          <p className="text-sm opacity-80">foto lagi</p>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* "Show all photos" floating button — desktop */}
            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-3 right-3 hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/30 bg-white/90 px-3 py-2 text-xs font-semibold text-foreground shadow-md backdrop-blur-sm hover:bg-white transition-colors"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Lihat semua {villa.images.length} foto
            </button>

            {/* Mobile "show all" button */}
            <button
              onClick={() => openLightbox(0)}
              className="mt-2 flex sm:hidden w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Lihat semua {villa.images.length} foto
            </button>
          </div>


        </section>

        {/* ── MAIN CONTENT ── */}
        <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">

          {/* Left */}
          <section>
            {/* Title */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    {villa.tag}
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-0.5 text-xs font-medium">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{villa.rating}</span>
                    <span className="text-muted-foreground">({villa.reviews})</span>
                  </div>
                </div>
                <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl" style={{ textWrap: "balance" }}>
                  {villa.name}
                </h1>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> {villa.area}
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-4">
              <Spec icon={BedDouble} label={`${villa.bedrooms} Kamar Tidur`} />
              <Spec icon={Bath} label={`${villa.bathrooms} Kamar Mandi`} />
              <Spec icon={Users} label={`s/d ${villa.guests} Tamu`} />
            </div>

            {/* Mobile booking block */}
            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4 lg:hidden">
              <PricingBlock villa={villa} />
              <div className="mt-4 flex flex-col gap-2">
                <WhatsAppButton size="lg" label="Pesan via WhatsApp" message={waMessage} className="w-full" />
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Phone className="h-4 w-4" /> {WA_DISPLAY}
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="mt-7 border-t border-border pt-7">
              <h2 className="text-lg font-semibold text-foreground">Tentang Villa</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-prose" style={{ textWrap: "pretty" }}>
                {villa.description}
              </p>
            </div>

            {/* Facilities */}
            <div className="mt-7 border-t border-border pt-7">
              <h2 className="text-lg font-semibold text-foreground">Fasilitas</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {villa.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>



            {/* House rules */}
            <div className="mt-7 border-t border-border pt-7">
              <h2 className="text-lg font-semibold text-foreground">Aturan Menginap</h2>
              <ul className="mt-4 space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Check-in mulai pukul 14.00, check-out maksimal 12.00
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  DP 50% untuk konfirmasi booking, pelunasan saat check-in
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Tamu sesuai kapasitas, biaya tambahan untuk extra bed
                </li>
              </ul>
            </div>
          </section>

          {/* Right — sticky booking (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-2xl border border-border bg-card p-5 shadow-[0_4px_24px_-8px_rgb(20_50_90/0.12)]">
              <PricingBlock villa={villa} />
              <div className="mt-5 flex flex-col gap-2">
                <WhatsAppButton size="lg" label="Pesan via WhatsApp" message={waMessage} className="w-full" />
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <Phone className="h-4 w-4" /> {WA_DISPLAY}
                </a>
              </div>

              <div className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  Villa diverifikasi tim Apamurahbanget
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  Respons WhatsApp cepat
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar villas */}
        {similar.length > 0 && (
          <section className="mt-14 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Villa lainnya
              </h2>
              <Link to="/villas" className="text-sm font-medium text-primary hover:underline">
                Lihat semua →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
              {similar.map((v) => (
                <VillaCard key={v.slug} villa={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Spec({ icon: Icon, label }: { icon: typeof BedDouble; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-xs font-medium text-foreground leading-snug">{label}</span>
    </div>
  );
}

function PricingBlock({ villa }: { villa: Villa }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Harga sewa per malam
      </p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-3 border border-border">
          <div>
            <p className="text-[11px] text-muted-foreground mb-0.5">Weekday</p>
            <p className="text-lg font-bold text-foreground tabular-nums leading-none">
              {formatIDR(villa.price)}
            </p>
          </div>
          <span className="rounded-lg bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground">
            Sen – Jum
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-primary/5 px-3.5 py-3 border border-primary/20">
          <div>
            <p className="text-[11px] text-primary/70 mb-0.5">Weekend</p>
            <p className="text-lg font-bold text-primary tabular-nums leading-none">
              {formatIDR(villa.priceWeekend)}
            </p>
          </div>
          <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            Sab – Min
          </span>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        * Harga dapat berubah sesuai musim & ketersediaan
      </p>
    </div>
  );
}

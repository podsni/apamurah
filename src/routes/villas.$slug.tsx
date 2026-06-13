import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
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

  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      {lightboxOpen && (
        <ImageLightbox
          images={villa.images}
          initialIndex={lightboxIdx}
          altBase={villa.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Floating Navigation Hub */}
      <div className="fixed top-6 inset-x-0 z-40 px-4 pointer-events-none">
        <header className="mx-auto max-w-7xl pointer-events-auto">
          <div className="flex h-14 items-center justify-between px-3 rounded-full border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-2xl shadow-lg">
            <Link to="/" className="flex items-center gap-2 pl-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Palmtree className="h-4 w-4" />
              </div>
              <span className="hidden sm:inline text-sm font-bold tracking-tight">
                Apa<span className="text-primary">murahbanget</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 pr-1">
              <Link
                to="/villas"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-bold transition-all hover:bg-secondary"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Kembali</span>
              </Link>
              <WhatsAppButton size="sm" label="Pesan WA" message={waMessage} className="rounded-full" />
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6">
        
        {/* Header Title Section */}
        <section className="mb-8 animate-fade-up">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20">
              {villa.tag}
            </span>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold border border-border">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{villa.rating}</span>
              <span className="text-muted-foreground font-medium">({villa.reviews} ulasan)</span>
            </div>
          </div>
          <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl max-w-3xl">
            {villa.name}
          </h1>
          <div className="mt-4 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-widest">{villa.area}, Batu</span>
          </div>
        </section>

        {/* ── CINEMATIC GALLERY ── */}
        <section aria-label="Galeri foto" className="mb-12 animate-fade-in delay-200">
          <div className="group relative p-1.5 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10 overflow-hidden">
            <div className="relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] shadow-2xl">
              
              {/* Desktop: 5-grid mosaic */}
              <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[560px]">
                <button
                  className="col-span-2 row-span-2 overflow-hidden relative group/hero"
                  onClick={() => openLightbox(0)}
                >
                  <LazyImage
                    eager
                    src={villa.images[0]}
                    alt={villa.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover/hero:scale-[1.05]"
                    aspectRatio="1/1"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover/hero:bg-transparent transition-colors duration-500" />
                </button>
                {villa.images.slice(1, 5).map((src, i) => {
                  const isLast = i === 3 && villa.images.length > 5;
                  return (
                    <button
                      key={src}
                      onClick={() => openLightbox(i + 1)}
                      className="relative overflow-hidden group/thumb"
                    >
                      <LazyImage
                        src={src}
                        alt={`${villa.name} ${i + 2}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover/thumb:scale-[1.08]"
                        aspectRatio="4/3"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-transparent transition-colors duration-500" />
                      {isLast && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white backdrop-blur-[2px]">
                          <p className="text-3xl font-black">+{villa.images.length - 5}</p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Foto Lagi</p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Mobile: Scrollable Slider or Stack */}
              <div className="md:hidden flex flex-col gap-2">
                 <button
                  className="w-full h-64 overflow-hidden relative"
                  onClick={() => openLightbox(0)}
                >
                  <LazyImage
                    eager
                    src={villa.images[0]}
                    alt={villa.name}
                    className="h-full w-full object-cover"
                    aspectRatio="16/9"
                  />
                </button>
                <div className="grid grid-cols-2 gap-2 px-0">
                  {villa.images.slice(1, 3).map((src, i) => (
                    <button
                      key={src}
                      onClick={() => openLightbox(i + 1)}
                      className="relative h-32 overflow-hidden"
                    >
                      <LazyImage
                        src={src}
                        alt={`${villa.name} ${i + 2}`}
                        className="h-full w-full object-cover"
                        aspectRatio="4/3"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* "Show all photos" floating button */}
              <button
                onClick={() => openLightbox(0)}
                className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-5 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md hover:bg-black/80 transition-all active:scale-95"
              >
                <LayoutGrid className="h-4 w-4" />
                Lihat {villa.images.length} Foto
              </button>
            </div>
          </div>
        </section>

        {/* ── CONTENT GRID ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">

          {/* Left Column: Details */}
          <section className="animate-fade-up delay-300">
            {/* Specs Hub */}
            <div className="grid grid-cols-3 gap-3 p-1.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10 mb-10">
              <Spec icon={BedDouble} label={`${villa.bedrooms} Kamar`} sub="Tidur" />
              <Spec icon={Bath} label={`${villa.bathrooms} Kamar`} sub="Mandi" />
              <Spec icon={Users} label={`Hingga ${villa.guests}`} sub="Tamu" />
            </div>

            <div className="space-y-12">
              <div className="prose prose-sm sm:prose-base dark:prose-invert">
                <h2 className="font-serif text-3xl tracking-tight mb-4">Tentang Villa</h2>
                <p className="text-muted-foreground leading-relaxed text-lg" style={{ textWrap: "pretty" }}>
                  {villa.description}
                </p>
              </div>

              <div className="pt-10 border-t border-border/60">
                <h2 className="font-serif text-3xl tracking-tight mb-6">Fasilitas Utama</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {villa.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm group hover:border-primary/30 transition-colors"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-bold text-foreground">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-border/60">
                <h2 className="font-serif text-3xl tracking-tight mb-6">Aturan & Ketentuan</h2>
                <div className="grid gap-4">
                  {[
                    { icon: Clock, label: "Check-in 14.00, Check-out 12.00" },
                    { icon: ShieldCheck, label: "DP 50% untuk konfirmasi booking" },
                    { icon: Users, label: "Tamu sesuai kapasitas yang tertera" },
                  ].map((rule) => (
                    <div key={rule.label} className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/40">
                      <rule.icon className="h-6 w-6 text-primary" />
                      <span className="text-sm font-bold text-foreground">{rule.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Sticky Booking Card */}
          <aside className="relative">
            <div className="sticky top-28 p-1.5 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10 animate-fade-up delay-500">
              <div className="bg-card rounded-[calc(2.5rem-0.375rem)] p-6 sm:p-8 shadow-2xl border border-border/60">
                <PricingBlock villa={villa} />
                
                <div className="mt-8 space-y-3">
                  <WhatsAppButton size="lg" label="Pesan Lewat WhatsApp" message={waMessage} className="w-full h-14 text-base font-black rounded-full shadow-xl shadow-primary/20" />
                  <a
                    href={`tel:+${WA_NUMBER}`}
                    className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-border bg-background px-4 text-sm font-bold text-foreground hover:bg-secondary transition-all active:scale-95"
                  >
                    <Phone className="h-5 w-5 text-primary" /> {WA_DISPLAY}
                  </a>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Bisa pesan sekarang (Instant Booking)
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Pembayaran aman & terverifikasi
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar villas */}
        {similar.length > 0 && (
          <section className="mt-24 pt-20 border-t border-border/60">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="font-serif text-4xl tracking-tight text-foreground">
                  Rekomendasi Lainnya
                </h2>
                <p className="mt-2 text-muted-foreground font-medium">Pilihan serupa yang mungkin kamu suka</p>
              </div>
              <Link to="/villas" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
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

function Spec({ icon: Icon, label, sub }: { icon: any; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 rounded-[2rem] bg-card border border-border/60 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/5 text-primary mb-3">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-black text-foreground leading-none">{label}</span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{sub}</span>
    </div>
  );
}

function PricingBlock({ villa }: { villa: Villa }) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
          Harga Per Malam
        </span>
        <div className="mt-3 flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <div>
            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">Weekday</p>
            <p className="text-2xl font-black text-foreground tabular-nums leading-none">
              {formatIDR(villa.price)}
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-widest">
            Senin-Kamis
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/5 border border-accent/10">
        <div>
          <p className="text-[10px] font-bold text-accent/60 uppercase tracking-widest mb-1">Weekend</p>
          <p className="text-2xl font-black text-foreground tabular-nums leading-none">
            {formatIDR(villa.priceWeekend)}
          </p>
        </div>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold text-accent uppercase tracking-widest">
          Jumat-Minggu
        </span>
      </div>
    </div>
  );
}

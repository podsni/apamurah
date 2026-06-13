import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import type { z as zType } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import {
  Search,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Palmtree,
  MessageCircle,
  ArrowUpDown,
} from "lucide-react";
import { AREAS, CATEGORIES, AMENITIES, PRICE_MIN, PRICE_MAX, filterVillas } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";
import { VillaFilters, type FilterValues } from "@/components/VillaFilters";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const sortSchema = z.enum(["recommended", "price-asc", "price-desc", "rating"]);

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  area: fallback(z.array(z.enum(AREAS)), []).default([]),
  category: fallback(z.array(z.enum(CATEGORIES)), []).default([]),
  amenity: fallback(z.array(z.enum(AMENITIES)), []).default([]),
  minPrice: fallback(z.number().int(), PRICE_MIN).default(PRICE_MIN),
  maxPrice: fallback(z.number().int(), PRICE_MAX).default(PRICE_MAX),
  guests: fallback(z.number().int().min(1).max(20), 1).default(1),
  sort: fallback(sortSchema, "recommended").default("recommended"),
});

type SearchValues = zType.infer<typeof searchSchema>;

export const Route = createFileRoute("/villas/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Daftar Villa di Batu — Apamurahbanget" },
      {
        name: "description",
        content:
          "Cari villa di Batu sesuai area, harga, dan fasilitas. Pesan langsung lewat WhatsApp.",
      },
      { property: "og:title", content: "Daftar Villa di Batu — Apamurahbanget" },
      {
        property: "og:description",
        content: "Jelajahi semua villa di Batu dengan filter dan pencarian cepat.",
      },
    ],
  }),
  component: VillasList,
});

function VillasList() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/villas" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [qInput, setQInput] = useState(search.q);

  const values: FilterValues = {
    areas: search.area,
    categories: search.category,
    amenities: search.amenity,
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    guests: search.guests,
    sort: search.sort,
  };

  const results = useMemo(
    () =>
      filterVillas({
        q: search.q,
        areas: search.area,
        categories: search.category,
        amenities: search.amenity,
        minPrice: search.minPrice,
        maxPrice: search.maxPrice,
        guests: search.guests,
        sort: search.sort,
      }),
    [search],
  );

  const activeCount =
    search.area.length +
    search.category.length +
    search.amenity.length +
    (search.minPrice !== PRICE_MIN ? 1 : 0) +
    (search.maxPrice !== PRICE_MAX ? 1 : 0) +
    (search.guests !== 1 ? 1 : 0);

  const handleFilterChange = (next: Partial<FilterValues>) => {
    navigate({
      search: (prev: SearchValues) => ({
        ...prev,
        ...(next.areas !== undefined && { area: next.areas as never }),
        ...(next.categories !== undefined && { category: next.categories as never }),
        ...(next.amenities !== undefined && { amenity: next.amenities as never }),
        ...(next.minPrice !== undefined && { minPrice: next.minPrice }),
        ...(next.maxPrice !== undefined && { maxPrice: next.maxPrice }),
        ...(next.guests !== undefined && { guests: next.guests }),
        ...(next.sort !== undefined && { sort: next.sort }),
      }),
      replace: true,
    });
  };

  const handleReset = () => {
    navigate({
      search: {
        q: "",
        area: [],
        category: [],
        amenity: [],
        minPrice: PRICE_MIN,
        maxPrice: PRICE_MAX,
        guests: 1,
        sort: "recommended",
      },
      replace: true,
    });
    setQInput("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
              <Palmtree className="h-5 w-5" />
            </div>
            <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline sm:text-[17px]">
              Apa<span className="text-primary">murahbanget</span>
            </span>
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: (prev: SearchValues) => ({ ...prev, q: qInput }), replace: true });
            }}
            className="flex h-11 flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 shadow-[var(--shadow-soft)] sm:max-w-md"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              type="search"
              placeholder="Cari villa, area…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {qInput && (
              <button
                type="button"
                onClick={() => {
                  setQInput("");
                  navigate({ search: (prev: SearchValues) => ({ ...prev, q: "" }), replace: true });
                }}
                className="grid h-6 w-6 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                aria-label="Bersihkan"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 sm:pb-10 sm:pt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke beranda
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Villa di Batu
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {results.length} villa ditemukan{search.q && ` untuk "${search.q}"`}
            </p>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative">
              <select
                value={search.sort}
                onChange={(e) =>
                  navigate({
                    search: (prev: SearchValues) => ({
                      ...prev,
                      sort: e.target.value as SearchValues["sort"],
                    }),
                    replace: true,
                  })
                }
                className="appearance-none rounded-xl border border-border bg-card pl-4 pr-9 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-[var(--shadow-soft)]"
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-asc">Harga Termurah</option>
                <option value="price-desc">Harga Termahal</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 lg:hidden">
            <span className="text-xs text-muted-foreground">Filter aktif:</span>
            {search.area.map((a: string) => (
              <button
                key={a}
                onClick={() =>
                  handleFilterChange({ areas: search.area.filter((x: string) => x !== a) })
                }
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
              >
                {a} <X className="h-3 w-3" />
              </button>
            ))}
            {search.category.map((c: string) => (
              <button
                key={c}
                onClick={() =>
                  handleFilterChange({ categories: search.category.filter((x: string) => x !== c) })
                }
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
              >
                {c} <X className="h-3 w-3" />
              </button>
            ))}
            {search.amenity.map((a: string) => (
              <button
                key={a}
                onClick={() =>
                  handleFilterChange({ amenities: search.amenity.filter((x: string) => x !== a) })
                }
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
              >
                {a} <X className="h-3 w-3" />
              </button>
            ))}
            <button
              onClick={handleReset}
              className="text-[11px] font-medium text-primary hover:underline"
            >
              Bersihkan
            </button>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-card p-5 shadow-[var(--shadow-soft)]">
              <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
            </div>
          </aside>

          <section>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <h2 className="text-lg font-semibold text-foreground">
                  Tidak ada villa yang cocok
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coba ubah filter, atau chat tim kami untuk rekomendasi.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={handleReset}
                    className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    Reset Filter
                  </button>
                  <WhatsAppButton
                    message="Halo, saya butuh bantuan cari villa di Batu sesuai preferensi saya."
                    label="Konsultasi WA"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {results.map((v) => (
                  <VillaCard key={v.slug} villa={v} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="relative mt-auto flex max-h-[88vh] w-full flex-col rounded-t-2xl bg-background shadow-xl">
            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">Filter Villa</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Tutup"
                className="grid h-9 w-9 place-items-center rounded-md text-foreground hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
            </div>
            <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Lihat {results.length} Villa
              </button>
            </div>
          </div>
        </div>
      )}

      {sortOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSortOpen(false)} />
          <div className="relative mt-auto w-full rounded-t-2xl bg-background pb-[max(1rem,env(safe-area-inset-bottom))] shadow-xl">
            <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted" />
            <div className="px-4 py-3 text-sm font-semibold text-foreground">Urutkan</div>
            <div className="flex flex-col">
              {[
                { v: "recommended", l: "Rekomendasi" },
                { v: "price-asc", l: "Harga Termurah" },
                { v: "price-desc", l: "Harga Termahal" },
                { v: "rating", l: "Rating Tertinggi" },
              ].map((opt) => {
                const active = search.sort === opt.v;
                return (
                  <button
                    key={opt.v}
                    onClick={() => {
                      navigate({
                        search: (prev: SearchValues) => ({
                          ...prev,
                          sort: opt.v as SearchValues["sort"],
                        }),
                        replace: true,
                      });
                      setSortOpen(false);
                    }}
                    className={
                      "flex items-center justify-between px-4 py-3.5 text-left text-sm " +
                      (active ? "font-semibold text-primary" : "text-foreground")
                    }
                  >
                    {opt.l}
                    {active && <span className="text-primary">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom bar — sits above the global MobileBottomNav */}
      <div className="fixed inset-x-0 bottom-14 z-30 lg:hidden">
        <div className="border-t border-border/50 bg-background/95 px-3 py-2 backdrop-blur-md shadow-[0_-2px_12px_rgb(0,0,0,0.06)]">
          <div className="mx-auto flex max-w-md items-center gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="relative inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeCount > 0 && (
                <span className="ml-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSortOpen(true)}
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowUpDown className="h-4 w-4" />
              Urutkan
            </button>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/6281336664592?text=Halo%20Apamurahbanget%2C%20saya%20mau%20tanya%20villa%20di%20Batu."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 lg:inline-flex"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat WhatsApp</span>
      </a>
    </main>
  );
}

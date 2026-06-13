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
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20">
      
      {/* Floating Header Hub */}
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

            {/* Search Hub */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ search: (prev: SearchValues) => ({ ...prev, q: qInput }), replace: true });
              }}
              className="flex-1 max-w-md mx-4 hidden sm:block"
            >
              <div className="relative group">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  value={qInput}
                  onChange={(e) => setQInput(e.target.value)}
                  placeholder="Cari villa atau area..."
                  className="w-full h-10 pl-10 pr-4 rounded-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/20 focus:bg-background transition-all outline-none text-sm font-medium"
                />
              </div>
            </form>

            <div className="flex items-center gap-2 pr-1">
               <button
                onClick={() => setSortOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-bold transition-all hover:bg-secondary lg:hidden"
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-bold transition-all hover:bg-secondary lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {activeCount > 0 && (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <WhatsAppButton size="sm" label="Konsultasi" message="Halo, saya butuh bantuan cari villa." className="rounded-full hidden md:inline-flex" />
            </div>
          </div>
        </header>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        
        {/* Page Header */}
        <section className="mb-10 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to="/" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
                <span className="text-[10px] text-muted-foreground/40">/</span>
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Semua Villa</span>
              </div>
              <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Villa di Batu
              </h1>
              <p className="mt-2 text-muted-foreground font-medium">
                Ditemukan {results.length} villa pilihan yang siap kamu booking.
              </p>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10">
                <select
                  value={search.sort}
                  onChange={(e) =>
                    handleFilterChange({ sort: e.target.value as any })
                  }
                  className="appearance-none bg-transparent h-10 pl-5 pr-10 text-xs font-bold uppercase tracking-widest text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Rekomendasi</option>
                  <option value="price-asc">Harga Termurah</option>
                  <option value="price-desc">Harga Termahal</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
                <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          
          {/* Sidebar Filter */}
          <aside className="hidden lg:block animate-fade-in delay-200">
            <div className="sticky top-28 p-1.5 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/[0.03] dark:border-white/10">
              <div className="bg-card rounded-[calc(2.5rem-0.375rem)] p-6 border border-border/60">
                <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <section className="animate-fade-up delay-300">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 rounded-[2.5rem] border border-dashed border-border bg-secondary/10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/5 text-primary/40 mb-6">
                  <SearchIcon className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Tidak Ada Hasil</h2>
                <p className="mt-2 text-muted-foreground max-w-xs">
                  Coba ubah filter atau kata kunci pencarianmu untuk melihat pilihan lainnya.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-8 px-6 py-2.5 rounded-full bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {results.map((v, i) => (
                  <div 
                    key={v.slug} 
                    className="animate-fade-up" 
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <VillaCard villa={v} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Bottom Filter Bar */}
      <div className="fixed bottom-20 inset-x-0 z-40 px-4 flex justify-center lg:hidden pointer-events-none">
         <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto animate-fade-up">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 h-11 px-6 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest transition-transform active:scale-95"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
              {activeCount > 0 && (
                <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSortOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white border border-white/10 transition-transform active:scale-95"
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
         </div>
      </div>

      {/* Mobile Modals */}

      {filtersOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            className="relative mt-auto flex max-h-[90vh] w-full flex-col rounded-t-[2.5rem] bg-background shadow-2xl overflow-hidden"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted" />
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <h2 className="text-xl font-black tracking-tight text-foreground">Filter Villa</h2>
              <button
                onClick={() => setFiltersOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pb-24">
              <VillaFilters values={values} onChange={handleFilterChange} onReset={handleReset} />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background via-background to-transparent pt-10">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full h-14 rounded-full bg-primary text-base font-black text-white shadow-xl shadow-primary/20 active:scale-95 transition-all"
              >
                Lihat {results.length} Villa
              </button>
            </div>
          </div>
        </div>
      )}

      {sortOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSortOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            className="relative mt-auto w-full rounded-t-[2.5rem] bg-background p-6 shadow-2xl"
          >
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-muted" />
            <h2 className="mb-6 text-xl font-black tracking-tight text-foreground px-2">Urutkan</h2>
            <div className="flex flex-col gap-2">
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
                      handleFilterChange({ sort: opt.v as any });
                      setSortOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-secondary/50 text-foreground hover:bg-secondary"
                    }`}
                  >
                    {opt.l}
                    {active && <span className="text-white">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 pb-[env(safe-area-inset-bottom)]" />
          </div>
        </div>
      )}


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

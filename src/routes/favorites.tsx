import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ArrowLeft } from "lucide-react";
import { VILLAS } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [{ title: "Favorit Saya — Apamurahbanget" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useFavorites();
  const villas = VILLAS.filter((v) => favorites.includes(v.slug));

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pb-10 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke beranda
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <Heart className="h-6 w-6 fill-red-500 stroke-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Favorit Saya
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {villas.length} villa tersimpan
        </p>

        {villas.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <Heart className="mx-auto h-10 w-10 stroke-muted-foreground" />
            <h2 className="mt-4 text-base font-semibold text-foreground">
              Belum ada villa favorit
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap ikon ❤ di kartu villa untuk menyimpannya di sini.
            </p>
            <Link
              to="/villas"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Jelajahi Villa
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {villas.map((v) => (
              <VillaCard key={v.slug} villa={v} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

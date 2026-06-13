import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-villa-batu.jpg";
import villa2 from "@/assets/villa-2.jpg";
import villa3 from "@/assets/villa-3.jpg";
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  ShieldCheck,
  Sparkles,
  Palmtree,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Mountain,
  MessageCircle,
  Instagram,
  Music2,
  Phone,
  Search,
} from "lucide-react";
import { WA_NUMBER, WA_DISPLAY, IG_URL, TIKTOK_URL, waLink } from "@/lib/whatsapp";
import { getFeaturedVillas, PRICE_MIN, PRICE_MAX } from "@/data/villas";
import type { Area } from "@/data/villas";
import { VillaCard } from "@/components/VillaCard";

const DEFAULT_SEARCH = {
  q: "",
  area: [] as Area[],
  category: [],
  amenity: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  guests: 1,
  sort: "recommended" as const,
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Apamurahbanget — Sewa Villa Terbaik di Batu Malang" },
      {
        name: "description",
        content:
          "Temukan villa terbaik di Batu untuk liburan Anda. Properti terseleksi, harga jujur, pesan cepat lewat WhatsApp.",
      },
    ],
  }),
});

const stats = [
  { value: "120+", label: "Villa Pilihan" },
  { value: "98%", label: "Tamu Puas" },
  { value: "5.000+", label: "Tamu Menginap" },
  { value: "24/7", label: "Respons Cepat" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <Palmtree className="h-5 w-5" />
      </div>
      <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-foreground">
        Apa<span className="text-primary">murahbanget</span>
      </span>
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const waHref = waLink("Halo Apamurahbanget, saya mau tanya ketersediaan villa di Batu.");

  return (
    <div className="fixed inset-x-0 top-3 z-50 px-4 pointer-events-none sm:top-6">
      <header className="mx-auto max-w-7xl pointer-events-auto">
        {/* Floating Island Nav */}
        <div className="mx-auto flex h-[3.25rem] items-center justify-between rounded-full border border-black/5 bg-white/86 px-2.5 shadow-[0_10px_36px_-18px_rgb(20_50_90/0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/80 sm:h-14">
          <div className="pl-2 sm:pl-4">
            <Logo />
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {[
              { label: "Semua Villa", to: "/villas", search: DEFAULT_SEARCH },
              { label: "Tentang", href: "#about" },
              { label: "Kontak", href: "#contact" },
            ].map((item) => (
              <div key={item.label} className="relative group">
                {item.to ? (
                  <Link
                    to={item.to}
                    search={item.search}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 pr-1.5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:shadow-primary/30 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground transition-all lg:hidden sm:h-11 sm:w-11"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Expansion */}
        {open && (
          <div className="fixed inset-0 top-0 -mx-4 min-h-screen z-[-1] bg-white/95 dark:bg-black/95 backdrop-blur-3xl animate-fade-in lg:hidden">
            <nav className="flex flex-col items-center justify-center h-full gap-8 p-6">
              {[
                { label: "Semua Villa", to: "/villas", search: DEFAULT_SEARCH },
                { label: "Tentang", href: "#about" },
                { label: "Kontak", href: "#contact" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      search={item.search}
                      onClick={() => setOpen(false)}
                      className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
              <div className="mt-8 flex flex-col items-center gap-4 animate-fade-up delay-500">
                <a
                  href={waHref}
                  className="inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground"
                >
                  <MessageCircle className="h-6 w-6" /> Hubungi WA
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

function Hero() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-[min(780px,88dvh)] items-center justify-center overflow-hidden px-4 pb-12 pt-24 sm:min-h-[90dvh] sm:pb-16 sm:pt-28">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Cinematic Villa Batu"
          className="h-full w-full object-cover scale-105 animate-fade-in"
          style={{ animationDuration: "2s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md animate-fade-in sm:px-4 sm:tracking-[0.2em]">
          <Sparkles className="h-3.5 w-3.5" /> 120+ Villa Pilihan di Batu
        </div>

        <h1 className="mx-auto mt-6 max-w-[11ch] font-serif text-[clamp(2.9rem,15vw,4.35rem)] leading-[0.95] tracking-[-0.045em] text-white animate-fade-up sm:mt-8 sm:max-w-none sm:text-[5rem] md:text-[6.5rem]">
          Temukan Villa <br />
          <span className="italic text-white/90">Impianmu</span> di Batu.
        </h1>

        <p
          className="mx-auto mt-5 max-w-[22rem] text-[0.98rem] font-medium leading-7 text-white/88 animate-fade-up delay-200 sm:mt-8 sm:max-w-2xl sm:text-xl md:text-2xl"
          style={{ textWrap: "balance" }}
        >
          Properti terseleksi dengan harga transparan. Pesan langsung lewat WhatsApp dalam hitungan
          menit.
        </p>

        {/* Floating Search Hub */}
        <div className="mx-auto mt-8 max-w-2xl animate-fade-up delay-400 sm:mt-12 sm:px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/villas", search: { ...DEFAULT_SEARCH, q } });
            }}
            className="group relative rounded-[1.65rem] border border-white/20 bg-white/12 p-1.5 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-white/30 sm:rounded-[2.5rem] sm:p-2 sm:hover:scale-[1.01]"
          >
            <div className="flex h-14 items-center gap-2 pl-4 pr-1.5 sm:h-16 sm:gap-3 sm:pl-6 sm:pr-2">
              <Search className="h-5 w-5 shrink-0 text-white/65 sm:h-6 sm:w-6" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari villa atau area favoritmu..."
                className="min-w-0 flex-1 bg-transparent text-[0.95rem] font-medium text-white placeholder:text-white/48 focus:outline-none sm:text-lg"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-black transition-all duration-300 hover:bg-primary hover:text-white sm:h-12 sm:px-8 sm:text-sm"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 animate-bounce opacity-40 sm:block">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="rounded-3xl bg-[var(--surface)] p-8 sm:p-10">
        <div className="mb-6 flex items-center gap-2.5 text-sm text-muted-foreground">
          <ShieldCheck className="h-4.5 w-4.5 text-accent" />
          <span>Dipercaya ribuan tamu setiap bulannya</span>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Villas() {
  const featured = getFeaturedVillas(3);
  return (
    <section id="villas" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 scroll-mt-20">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-10">
        <div>
          <h2 className="font-serif text-[2rem] leading-none tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Villa Rekomendasi Kami
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Properti terseleksi dari host tepercaya di Batu.
          </p>
        </div>
        <Link
          to="/villas"
          search={DEFAULT_SEARCH}
          className="hidden items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
        {featured.map((v, index) => (
          <VillaCard key={v.slug} villa={v} priority={index === 0} />
        ))}
      </div>
      <div className="mt-8 flex justify-center sm:hidden">
        <Link
          to="/villas"
          search={DEFAULT_SEARCH}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Lihat Semua Villa <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Experience() {
  const points = [
    "Villa pilihan di Batu, sudah kami seleksi langsung",
    "Harga jujur — tanpa biaya tersembunyi",
    "Pesan cepat lewat WhatsApp, balasan menit-menitan",
    "Tim bantuan siap 24/7 selama liburanmu",
  ];
  return (
    <section id="about" className="border-t border-border/50 bg-[var(--surface)] scroll-mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Mountain className="h-3.5 w-3.5" /> Mengapa Apamurahbanget
          </span>
          <h2 className="mt-5 font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
            Liburan tenang di Batu,
            <br className="hidden sm:block" /> villa yang bisa diandalkan.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Dari memilih villa sampai check-in, semuanya kami bantu biar liburanmu jadi pengalaman
            yang tak terlupakan.
          </p>
          <ul className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink("Halo, saya mau konsultasi villa di Batu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </a>
            <a
              href="#villas"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary"
            >
              Lihat Villa
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={villa2}
                alt="Interior villa nyaman di Batu"
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
              />
            </div>
            <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
              <div className="font-serif text-3xl text-foreground">4,9</div>
              <div className="mt-1 flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Rata-rata dari ribuan ulasan tamu.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-8 sm:pt-10">
            <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">Diverifikasi 100%</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap villa kami seleksi langsung sebelum tayang.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={villa3}
                alt="Villa dengan pemandangan gunung di Batu"
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-56"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const waHref = waLink("Halo Apamurahbanget, saya ingin pesan villa di Batu.");
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary/8 via-[var(--surface)] to-accent/8 p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-medium text-primary">
                <MessageCircle className="h-3.5 w-3.5" /> Booking Langsung
              </span>
              <h2 className="mt-5 font-serif text-2xl tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Pesan villa lewat WhatsApp — mudah dan cepat.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tim kami bantu cek ketersediaan, kirim foto detail, dan proses booking dari awal
                sampai check-in.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-sky)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat di WhatsApp
                </a>
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-secondary"
                >
                  <Phone className="h-4 w-4" />
                  {WA_DISPLAY}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs text-muted-foreground">Ikuti kami:</span>
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Instagram className="h-4 w-4" /> @apamurahbanget_
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Music2 className="h-4 w-4" /> @apamurahbanget_
                </a>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                {
                  icon: BedDouble,
                  label: "Berbagai tipe villa",
                  desc: "Mulai 2 KT sampai 5+ KT untuk rombongan.",
                },
                {
                  icon: Bath,
                  label: "Fasilitas lengkap",
                  desc: "Kolam pribadi, BBQ, karaoke, dan view gunung.",
                },
                {
                  icon: Users,
                  label: "Cocok keluarga & grup",
                  desc: "Pilihan villa untuk 4 hingga 20 tamu.",
                },
              ].map((f) => (
                <li
                  key={f.label}
                  className="flex items-start gap-3.5 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-200 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{f.label}</div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sewa villa di Batu jadi mudah — properti terseleksi, pesan lewat WhatsApp.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={waLink("Halo Apamurahbanget!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-lg bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Jelajahi</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="#villas"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Villa di Batu
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Hubungi Kami</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:+${WA_NUMBER}`} className="transition-colors hover:text-primary">
                  {WA_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a
                  href={waLink("Halo Apamurahbanget!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  WhatsApp 24/7
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kota Batu, Jawa Timur</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border/50 pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row">
          <span>&copy; 2026 Apamurahbanget. Semua hak dilindungi.</span>
          <span>Dibuat dengan teliti untuk liburanmu di Batu.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Halo Apamurahbanget, saya mau tanya villa di Batu.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Apamurahbanget"
      className="fixed bottom-20 right-4 z-50 hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/25 sm:bottom-6 sm:right-6 lg:inline-flex"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Stats />
      <Villas />
      <Experience />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

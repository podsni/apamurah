import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-villa.jpg";
import villa1 from "@/assets/villa-1.jpg";
import villa2 from "@/assets/villa-2.jpg";
import villa3 from "@/assets/villa-3.jpg";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  ShieldCheck,
  Sparkles,
  Palmtree,
  Heart,
  ArrowRight,
  Star,
  Check,
  Menu,
  X,
  Waves,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const locations = [
  { name: "Bali", from: "Rp 1,2 jt", count: "1.420 villa" },
  { name: "Bandung", from: "Rp 850 rb", count: "640 villa" },
  { name: "Yogyakarta", from: "Rp 700 rb", count: "520 villa" },
  { name: "Lombok", from: "Rp 1,1 jt", count: "380 villa" },
  { name: "Puncak", from: "Rp 950 rb", count: "720 villa" },
];

const villas = [
  {
    img: villa1,
    tag: "Populer",
    name: "Villa Asana Tropis",
    address: "Canggu, Bali",
    rating: 4.9,
    reviews: 184,
    specs: ["3 KT", "3 KM", "6 Tamu", "Private Pool"],
    chips: ["Kolam Pribadi", "Taman", "BBQ", "Wi-Fi"],
    price: "Rp 2.450.000",
  },
  {
    img: villa2,
    tag: "Baru",
    name: "Cliffside Ocean Villa",
    address: "Uluwatu, Bali",
    rating: 4.8,
    reviews: 96,
    specs: ["4 KT", "4 KM", "8 Tamu", "Infinity Pool"],
    chips: ["Ocean View", "Chef", "Sunset Deck"],
    price: "Rp 4.900.000",
  },
  {
    img: villa3,
    tag: "Hemat",
    name: "Pinewood Hill Villa",
    address: "Lembang, Bandung",
    rating: 4.7,
    reviews: 132,
    specs: ["3 KT", "2 KM", "6 Tamu", "Mountain View"],
    chips: ["Pemandangan Gunung", "Perapian", "Wi-Fi"],
    price: "Rp 1.350.000",
  },
];

const stats = [
  { value: "3.200+", label: "Villa Terverifikasi" },
  { value: "98%", label: "Tamu Puas" },
  { value: "12 rb+", label: "Review Positif" },
  { value: "24/7", label: "Layanan Bantuan" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 sm:gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
        <Palmtree className="h-5 w-5" />
      </div>
      <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight text-foreground">
        Apa<span className="text-primary">murahbanget</span>
      </span>
    </Link>
  );
}

function Nav() {
  const items = ["Cari Villa", "Destinasi", "Panduan", "Tentang Kami"];
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((i) => (
            <a
              key={i}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary md:inline-flex">
            Masuk
          </button>
          <button className="hidden md:inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90">
            Daftar
          </button>
          <button
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col">
              {items.map((i) => (
                <a
                  key={i}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm text-foreground last:border-b-0"
                >
                  {i}
                </a>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground">
                Masuk
              </button>
              <button className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                Daftar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SearchBar() {
  const fieldClass =
    "flex flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-secondary/60 md:border-r md:border-border md:last:border-r-0 border-b border-border last:border-b-0 md:border-b-0";
  const labelClass = "text-[11px] font-medium uppercase tracking-wide text-muted-foreground flex items-center gap-1";
  const valueClass = "text-sm font-medium text-foreground";
  return (
    <div className="rounded-2xl border border-border bg-card p-2 shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-1 overflow-hidden rounded-xl bg-card md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        <button className={fieldClass}>
          <span className={labelClass}>
            <MapPin className="h-3 w-3" /> Lokasi
          </span>
          <span className={valueClass}>Bali, Indonesia</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <CalendarDays className="h-3 w-3" /> Check-in
          </span>
          <span className={valueClass}>12 Jun 2026</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <CalendarDays className="h-3 w-3" /> Check-out
          </span>
          <span className={valueClass}>16 Jun 2026</span>
        </button>
        <button className={fieldClass}>
          <span className={labelClass}>
            <Users className="h-3 w-3" /> Tamu
          </span>
          <span className={valueClass}>4 Tamu</span>
        </button>
        <div className="p-2 md:col-span-1">
          <button className="inline-flex h-full w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90">
            <Search className="h-4 w-4" />
            Cari Villa
          </button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pb-10 sm:pt-10">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <img
            src={heroImg}
            alt="Villa tropis mewah dengan kolam infinity menghadap laut saat matahari terbenam"
            width={1920}
            height={1080}
            className="h-[480px] w-full object-cover sm:h-[560px] md:h-[620px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/40 sm:to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-5 sm:px-8 md:px-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> 3.200+ villa terverifikasi
              </span>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-6xl">
                Sewa Villa Impianmu
                <br />
                Tanpa Ribet.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base md:text-lg">
                Liburan jadi lebih tenang dengan villa pilihan di destinasi
                terbaik Indonesia—harga jujur, booking sebentar saja.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-0 sm:-mt-16 sm:px-4 md:-mt-20">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Destinasi Populer
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mulai dari pantai, gunung, sampai pedesaan—pilih suasanamu.
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
        {locations.map((l) => (
          <a
            key={l.name}
            href="#"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] sm:p-5"
          >
            <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:right-4 sm:top-4">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="pt-12">
              <h3 className="text-base font-semibold text-foreground">{l.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{l.count}</p>
              <p className="mt-3 text-sm font-medium text-primary sm:mt-4">Mulai {l.from}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-accent" />
          Dipercaya oleh ribuan tamu setiap bulannya
        </div>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="md:border-l md:border-border md:pl-5 md:first:border-l-0 md:first:pl-0">
              <div className="text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Villas() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Rekomendasi untukmu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Villa pilihan dari host terverifikasi.
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Lihat Semua <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
        {villas.map((a) => (
          <article
            key={a.name}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={a.img}
                alt={a.name}
                width={1024}
                height={768}
                loading="lazy"
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-56"
              />
              <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                {a.tag}
              </span>
              <button
                aria-label="Simpan"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground backdrop-blur transition-colors hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{a.address}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  <Star className="h-3 w-3 fill-current text-accent" />
                  {a.rating} <span className="text-muted-foreground">({a.reviews})</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {a.specs.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <div className="text-lg font-semibold text-foreground tabular-nums">
                    {a.price}
                  </div>
                  <div className="text-xs text-muted-foreground">/malam</div>
                </div>
                <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary">
                  Lihat Detail <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const points = [
    "Ribuan villa pilihan di destinasi terbaik Indonesia",
    "Harga jujur—tanpa biaya tersembunyi",
    "Booking instan dalam hitungan menit",
    "Tim bantuan siap 24/7 selama liburan",
  ];
  return (
    <section className="border-t border-border bg-[var(--surface)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Waves className="h-3.5 w-3.5 text-primary" /> Mengapa Apamurahbanget
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Liburan tenang,
            <br className="hidden sm:block" /> villa yang bisa diandalkan.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
            Dari pencarian sampai check-in, semuanya kami rancang biar
            liburanmu di Bali, Bandung, atau Lombok terasa benar-benar
            liburan.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
              Cari Villa <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Pelajari Lebih
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={villa2} alt="" loading="lazy" className="h-40 w-full object-cover sm:h-56" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">4,9</div>
              <div className="mt-1 flex items-center gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Rata-rata dari 12.000+ ulasan tamu terverifikasi.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-8 sm:pt-10">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">Diverifikasi 100%</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap villa dan host melewati proses verifikasi ketat.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img src={villa3} alt="" loading="lazy" className="h-40 w-full object-cover sm:h-56" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    {
      title: "Apamurahbanget",
      links: ["Tentang Kami", "Karier", "Pers", "Kontak"],
    },
    {
      title: "Layanan",
      links: ["Cari Villa", "Destinasi", "Untuk Host", "Panduan"],
    },
    {
      title: "Bantuan",
      links: ["Pusat Bantuan", "Kebijakan Privasi", "Syarat & Ketentuan", "FAQ"],
    },
  ];
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Sewa villa jadi mudah—di mana pun liburanmu.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row">
          <span>© 2026 Apamurahbanget. Semua hak dilindungi.</span>
          <span>Dibuat dengan teliti di Jakarta.</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero />
      <Locations />
      <Stats />
      <Villas />
      <Experience />
      <Footer />
    </main>
  );
}

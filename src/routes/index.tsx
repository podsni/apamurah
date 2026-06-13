import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
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
        <div className="glass-edge mx-auto flex h-[3.25rem] items-center justify-between rounded-full border border-black/5 bg-white/86 px-2.5 backdrop-blur-2xl dark:border-white/10 dark:bg-black/80 sm:h-14">
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
    <section className="relative flex min-h-[min(780px,88dvh)] items-center justify-center overflow-hidden px-4 pb-12 pt-24 sm:min-h-[90dvh] sm:pb-16 sm:pt-28 lg:justify-start lg:px-8">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Cinematic Villa Batu"
          className="h-full w-full object-cover animate-hero-image"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/24 to-background lg:bg-[linear-gradient(90deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.45)_42%,rgba(0,0,0,0.14)_72%,rgba(0,0,0,0.42)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center lg:text-left">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md animate-fade-in sm:px-4 sm:tracking-[0.2em]">
          <Sparkles className="h-3.5 w-3.5" /> 120+ Villa Pilihan di Batu
        </div>

        <h1 className="mx-auto mt-6 max-w-[11ch] font-serif text-[clamp(2.9rem,15vw,4.35rem)] leading-[0.95] tracking-[-0.035em] text-white animate-fade-up sm:mt-8 sm:max-w-none sm:text-[5rem] md:text-[6rem] lg:mx-0 lg:max-w-[9.6ch]">
          Temukan Villa <br />
          <span className="italic text-white/90">Impianmu</span> di Batu.
        </h1>

        <p
          className="mx-auto mt-5 max-w-[22rem] text-[0.98rem] font-medium leading-7 text-white/88 animate-fade-up delay-200 sm:mt-8 sm:max-w-2xl sm:text-xl md:text-2xl lg:mx-0 lg:max-w-xl"
          style={{ textWrap: "balance" }}
        >
          Properti terseleksi dengan harga transparan. Pesan langsung lewat WhatsApp dalam hitungan
          menit.
        </p>

        {/* Floating Search Hub */}
        <div className="mx-auto mt-8 max-w-2xl animate-fade-up delay-400 sm:mt-12 sm:px-4 lg:mx-0 lg:px-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/villas", search: { ...DEFAULT_SEARCH, q } });
            }}
            className="glass-edge group relative rounded-[1.65rem] border border-white/20 bg-white/12 p-1.5 backdrop-blur-2xl transition-all duration-500 ease-[var(--ease-out-quart)] hover:border-white/30 sm:rounded-[2.5rem] sm:p-2 sm:hover:scale-[1.01]"
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
                className="pressable h-11 shrink-0 rounded-full bg-white px-5 text-xs font-black uppercase tracking-[0.14em] text-black hover:bg-primary hover:text-white sm:h-12 sm:px-8 sm:text-sm"
              >
                Cari
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="animate-float-gentle glass-edge absolute bottom-24 right-8 z-10 hidden w-[18rem] overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/12 p-3 text-white backdrop-blur-2xl lg:block">
        <div className="overflow-hidden rounded-[1.15rem]">
          <img
            src={villa2}
            alt="Preview interior villa Batu"
            className="h-32 w-full object-cover"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black">Siap dibantu pilihkan</p>
            <p className="mt-0.5 text-xs text-white/70">Balasan cepat via WhatsApp</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-primary">
            24/7
          </span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-[0_24px_80px_-48px_rgb(20_50_90/0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 sm:rounded-[2.5rem] sm:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" /> Dipercaya ribuan tamu
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
            Villa Batu • WhatsApp booking • Harga transparan
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s, index) => (
            <div
              key={s.label}
              className="smooth-card animate-rise-soft rounded-2xl border border-border/60 bg-card/82 p-4 shadow-[var(--shadow-soft)] sm:p-5"
              style={{ "--i": index } as CSSProperties}
            >
              <div className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[13px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingFlow() {
  const steps = [
    {
      label: "Pilih villa",
      desc: "Cari berdasarkan kapasitas, budget, dan fasilitas yang paling penting.",
    },
    {
      label: "Chat admin",
      desc: "Klik Pesan, kami cek tanggal kosong dan kirim detail terbaru.",
    },
    {
      label: "Booking aman",
      desc: "Konfirmasi harga, DP, lalu tinggal datang dan menikmati Batu.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="grid gap-4 md:grid-cols-[0.9fr_1.4fr] md:items-stretch">
        <div className="rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-[0_28px_80px_-44px_rgb(20_80_160/0.7)] sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em]">
            <Sparkles className="h-3.5 w-3.5" /> Booking tanpa ribet
          </span>
          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Dari cari villa sampai check-in, alurnya jelas.
          </h2>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/78">
            Fokusnya bukan sekadar tampil cantik: pengunjung harus cepat paham, cepat percaya, dan
            cepat klik WhatsApp.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="smooth-card animate-rise-soft rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-[var(--shadow-soft)]"
              style={{ "--i": index + 1 } as CSSProperties}
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-sm font-black text-primary">
                {index + 1}
              </div>
              <h3 className="mt-5 text-base font-black tracking-tight text-foreground">
                {step.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.desc}</p>
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
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/12 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground/80">
            <Star className="h-3.5 w-3.5 fill-current" /> Rekomendasi terkurasi
          </span>
          <h2 className="font-serif text-[2rem] leading-none tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Villa Rekomendasi Kami
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pilihan yang paling aman untuk keluarga, rombongan kecil, dan liburan dadakan.
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
          <div key={v.slug} className="animate-rise-soft" style={{ "--i": index } as CSSProperties}>
            <VillaCard villa={v} priority={index === 0} />
          </div>
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
      <BookingFlow />
      <Villas />
      <Experience />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

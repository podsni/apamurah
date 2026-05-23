import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-villa-batu.jpg";
import villa1 from "@/assets/villa-1.jpg";
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
  Heart,
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
} from "lucide-react";

const WA_NUMBER = "6281336664592";
const WA_DISPLAY = "+62 813-3666-4592";
const IG_URL = "https://www.instagram.com/apamurahbanget_/";
const TIKTOK_URL = "https://www.tiktok.com/@apamurahbanget_";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const Route = createFileRoute("/")({
  component: Index,
});

const areas = [
  { name: "Songgoriti", from: "Rp 850 rb", count: "32 villa" },
  { name: "Batu Kota", from: "Rp 1,1 jt", count: "48 villa" },
  { name: "Bumiaji", from: "Rp 950 rb", count: "26 villa" },
  { name: "Pujon", from: "Rp 1,3 jt", count: "18 villa" },
  { name: "Coban Rondo", from: "Rp 1,4 jt", count: "14 villa" },
];

const villas = [
  {
    img: villa1,
    tag: "Populer",
    name: "Villa Asana Pinus",
    address: "Songgoriti, Batu",
    rating: 4.9,
    reviews: 184,
    specs: ["3 KT", "3 KM", "6 Tamu", "Private Pool"],
    chips: ["Kolam Pribadi", "Karaoke", "BBQ", "Wi-Fi"],
    price: "Rp 1.850.000",
  },
  {
    img: villa2,
    tag: "Baru",
    name: "Villa Bukit Pandang",
    address: "Bumiaji, Batu",
    rating: 4.8,
    reviews: 96,
    specs: ["4 KT", "4 KM", "8 Tamu", "Infinity Pool"],
    chips: ["Mountain View", "Pemanas Air", "Sunset Deck"],
    price: "Rp 2.450.000",
  },
  {
    img: villa3,
    tag: "Hemat",
    name: "Villa Pinewood Coban",
    address: "Pujon, Batu",
    rating: 4.7,
    reviews: 132,
    specs: ["2 KT", "2 KM", "4 Tamu", "Mountain View"],
    chips: ["Perapian", "Taman", "Wi-Fi"],
    price: "Rp 950.000",
  },
];

const stats = [
  { value: "120+", label: "Villa di Batu" },
  { value: "98%", label: "Tamu Puas" },
  { value: "5 rb+", label: "Tamu Menginap" },
  { value: "24/7", label: "Respons WhatsApp" },
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
  const items = [
    { label: "Villa", href: "#villas" },
    { label: "Area", href: "#areas" },
    { label: "Tentang", href: "#about" },
    { label: "Kontak", href: "#contact" },
  ];
  const [open, setOpen] = useState(false);
  const waHref = waLink(
    "Halo Apamurahbanget, saya mau tanya ketersediaan villa di Batu.",
  );
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((i) => (
            <a
              key={i.label}
              href={i.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
          </a>
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
                  key={i.label}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border/60 py-3 text-sm text-foreground last:border-b-0"
                >
                  {i.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground"
                >
                  <Music2 className="h-4 w-4" /> TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroCTA() {
  const waHref = waLink(
    "Halo Apamurahbanget, saya tertarik sewa villa di Batu. Mohon info ketersediaan & harga.",
  );
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Pesan langsung, balasan cepat
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground sm:text-base">
            Tim kami siap bantu cari villa terbaik di Batu untukmu.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            Chat WhatsApp
          </a>
          <a
            href="#villas"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Lihat Villa
          </a>
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
            alt="Villa mewah di Batu Malang dengan kolam infinity menghadap perbukitan saat matahari terbenam"
            width={1920}
            height={1080}
            className="h-[480px] w-full object-cover sm:h-[560px] md:h-[620px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/40 sm:to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-5 sm:px-8 md:px-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> 120+ villa pilihan di Batu
              </span>
              <h1 className="mt-4 text-[2rem] font-semibold leading-[1.05] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-6xl">
                Villa Terbaik di Batu
                <br />
                untuk Liburanmu.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/85 sm:mt-5 sm:text-base md:text-lg">
                Temukan villa terbaik di Batu untuk liburan Anda. Setiap
                properti telah kami seleksi untuk memastikan kenyamanan dan
                pengalaman menginap yang tak terlupakan bersama Apamurahbanget.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-20 max-w-5xl px-0 sm:-mt-16 sm:px-4 md:-mt-20">
          <HeroCTA />
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section id="areas" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Area Populer di Batu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dari pusat kota sampai pegunungan—pilih suasana liburanmu.
          </p>
        </div>
        <a
          href={waLink("Halo, saya mau tanya semua area villa di Batu.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Tanya Area <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
        {areas.map((l) => (
          <a
            key={l.name}
            href={waLink(`Halo, saya tertarik villa di area ${l.name}, Batu.`)}
            target="_blank"
            rel="noopener noreferrer"
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
    <section id="villas" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 scroll-mt-20">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Rekomendasi Villa di Batu
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Properti terseleksi dari host tepercaya.
          </p>
        </div>
        <a
          href={waLink("Halo, saya mau lihat semua villa di Batu.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Tanya Semua <ArrowRight className="h-4 w-4" />
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
                <a
                  href={waLink(
                    `Halo Apamurahbanget, saya mau pesan ${a.name} (${a.address}). Mohon info ketersediaan & harga.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Pesan WA
                </a>
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
    "Villa pilihan di Batu, sudah kami seleksi langsung",
    "Harga jujur—tanpa biaya tersembunyi",
    "Pesan cepat lewat WhatsApp, balasan menit-menitan",
    "Tim bantuan siap 24/7 selama liburanmu",
  ];
  return (
    <section id="about" className="border-t border-border bg-[var(--surface)] scroll-mt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Mountain className="h-3.5 w-3.5 text-primary" /> Mengapa Apamurahbanget
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Liburan tenang di Batu,
            <br className="hidden sm:block" /> villa yang bisa diandalkan.
          </h2>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
            Dari memilih villa sampai check-in, semuanya kami bantu biar
            liburanmu di Batu jadi pengalaman menginap yang tak terlupakan.
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
            <a
              href={waLink("Halo, saya mau konsultasi villa di Batu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" /> Chat WhatsApp
            </a>
            <a
              href="#villas"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Lihat Villa
            </a>
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
                Rata-rata dari ribuan ulasan tamu di Batu.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-8 sm:pt-10">
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <ShieldCheck className="h-6 w-6 text-accent" />
              <h3 className="mt-3 text-sm font-semibold text-foreground">Diverifikasi 100%</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap villa di Batu kami seleksi langsung sebelum tayang.
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

function Contact() {
  const waHref = waLink(
    "Halo Apamurahbanget, saya ingin pesan villa di Batu.",
  );
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <MessageCircle className="h-3.5 w-3.5 text-primary" /> Booking Langsung
              </span>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Pesan villa di Batu lewat WhatsApp.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
                Tim kami akan bantu cek ketersediaan, kirim foto detail, dan
                bantuin proses booking dari awal sampai check-in.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat di WhatsApp
                </a>
                <a
                  href={`tel:+${WA_NUMBER}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary"
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
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  <Instagram className="h-4 w-4" /> @apamurahbanget_
                </a>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  <Music2 className="h-4 w-4" /> @apamurahbanget_
                </a>
              </div>
            </div>
            <ul className="grid gap-3">
              {[
                { icon: BedDouble, label: "Berbagai tipe villa", desc: "Mulai 2 KT sampai 5+ KT untuk rombongan." },
                { icon: Bath, label: "Fasilitas lengkap", desc: "Kolam pribadi, BBQ, karaoke, dan view gunung." },
                { icon: Users, label: "Cocok keluarga & grup", desc: "Pilihan villa untuk 4–20 tamu." },
              ].map((f) => (
                <li
                  key={f.label}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur"
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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Sewa villa di Batu jadi mudah—properti terseleksi, pesan lewat
              WhatsApp.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-foreground hover:bg-secondary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-foreground hover:bg-secondary"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href={waLink("Halo Apamurahbanget!")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Apamurahbanget"
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-foreground hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Jelajahi</h4>
            <ul className="mt-4 space-y-2.5">
              <li><a href="#villas" className="text-sm text-muted-foreground hover:text-foreground">Villa di Batu</a></li>
              <li><a href="#areas" className="text-sm text-muted-foreground hover:text-foreground">Area Populer</a></li>
              <li><a href="#about" className="text-sm text-muted-foreground hover:text-foreground">Tentang Kami</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-foreground">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Hubungi Kami</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:+${WA_NUMBER}`} className="hover:text-foreground">{WA_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href={waLink("Halo Apamurahbanget!")} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp 24/7</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kota Batu, Jawa Timur</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row">
          <span>© 2026 Apamurahbanget. Semua hak dilindungi.</span>
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
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
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
      <Locations />
      <Stats />
      <Villas />
      <Experience />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

# Apamurahbanget — Sewa Villa di Batu Malang

Website resmi **Apamurahbanget** untuk menampilkan dan memesan villa pilihan
di kawasan Batu, Malang. Pengunjung dapat menelusuri katalog villa,
memfilter berdasarkan area, harga, kapasitas, dan fasilitas, lalu memesan
langsung lewat WhatsApp tanpa proses pendaftaran.

- 🌐 Preview: https://id-preview--de2bde36-466b-407e-be80-1895f8040679.lovable.app
- 📱 Instagram: [@apamurahbanget_](https://www.instagram.com/apamurahbanget_/)
- 🎵 TikTok: [@apamurahbanget_](https://www.tiktok.com/@apamurahbanget_)
- 💬 WhatsApp: [+62 813-3666-4592](https://wa.me/6281336664592)

---

## ✨ Fitur Utama

### Landing Page (`/`)
- Hero section dengan foto villa Batu dan call-to-action WhatsApp.
- Search bar yang langsung redirect ke `/villas?q=…`.
- Section "Area Populer" (Songgoriti, Bumiaji, Pujon, dll.) — klik area
  membuka daftar villa terfilter.
- Rekomendasi villa pilihan + section pengalaman, kontak, dan footer
  dengan tautan media sosial.

### Halaman Villa (`/villas`)
- **Pencarian** real-time (nama, area, fasilitas) via URL search params.
- **Filter** multi-kriteria: area, kategori, rentang harga, jumlah tamu,
  amenities — tersinkronisasi penuh ke URL sehingga bisa di-share/bookmark.
- **Sorting**: rekomendasi, harga termurah/termahal, rating tertinggi.
- **Mobile UX**:
  - Bottom sheet untuk Filter & Urutkan.
  - Bar aksi tetap di bawah dengan tombol Filter, Urutkan, dan WhatsApp.
  - Chip filter aktif yang bisa dihapus cepat.
- Empty state ramah dengan tombol reset dan konsultasi WA.

### Detail Villa (`/villas/$slug`)
- Galeri foto, deskripsi, spesifikasi (KT/KM/tamu), daftar fasilitas,
  aturan menginap.
- Sidebar sticky dengan harga, tombol WhatsApp pre-filled, dan tombol
  telepon langsung.
- Rekomendasi villa serupa.
- 404 handling kalau slug tidak ditemukan.

### Navigasi Global
- **Mobile bottom nav** (Beranda, Cari, Favorit, Booking) di seluruh
  halaman, mengikuti pola aplikasi native.
- **Floating WhatsApp** di desktop.
- Header sticky dengan logo, search, dan link sosial.

### WhatsApp Booking
- Helper `waLink(message)` di `src/lib/whatsapp.ts` membuat link
  `wa.me/<nomor>?text=…` dengan pesan terisi otomatis (nama villa, area).
- Tidak perlu backend / sistem booking — semua transaksi dilanjutkan
  manual di WhatsApp.

---

## 🛠 Tech Stack

| Layer        | Tools                                                    |
|--------------|----------------------------------------------------------|
| Framework    | [TanStack Start](https://tanstack.com/start) v1 (React 19, SSR) |
| Bundler      | Vite 7                                                   |
| Routing      | TanStack Router (file-based, type-safe)                  |
| State (URL)  | `@tanstack/zod-adapter` + Zod schema                     |
| Data fetch   | TanStack Query                                           |
| Styling      | Tailwind CSS v4 (via `@import` in `src/styles.css`)      |
| Komponen UI  | shadcn/ui (Radix primitives)                             |
| Ikon         | lucide-react                                             |
| Package mgr  | Bun                                                      |
| Deploy       | Lovable Cloud (Cloudflare Workers runtime)               |

---

## 📁 Struktur Project

```text
src/
├── assets/                  # Foto hero & villa (di-bundle Vite)
├── components/
│   ├── MobileBottomNav.tsx  # Bottom nav 4-tab untuk mobile
│   ├── VillaCard.tsx        # Kartu villa di listing
│   ├── VillaFilters.tsx     # Panel filter (area, harga, dll.)
│   ├── WhatsAppButton.tsx   # Tombol CTA WhatsApp reusable
│   └── ui/                  # shadcn primitives
├── data/
│   └── villas.ts            # Sumber data villa + helper filter/format
├── hooks/
│   └── use-mobile.tsx       # Breakpoint helper
├── lib/
│   ├── utils.ts             # cn() classname helper
│   └── whatsapp.ts          # Konstanta WA + waLink()
├── routes/
│   ├── __root.tsx           # Shell, meta tag, provider, MobileBottomNav
│   ├── index.tsx            # Landing page
│   ├── villas.index.tsx     # /villas — listing + filter
│   └── villas.$slug.tsx     # /villas/:slug — detail
├── router.tsx               # createRouter + context
├── routeTree.gen.ts         # AUTO-GENERATED, jangan diedit
├── server.ts                # SSR entry (Worker)
├── start.ts                 # Start config
└── styles.css               # Tailwind + design tokens (oklch)
```

---

## 🚀 Menjalankan Secara Lokal

Prasyarat: [Bun](https://bun.sh) ≥ 1.1.

```bash
bun install        # install dependency
bun run dev        # dev server (HMR) di http://localhost:5173
bun run build      # build produksi
bun run start      # jalankan hasil build
```

> Project ini sebenarnya dikelola lewat [Lovable](https://lovable.dev) —
> setiap edit di chat AI akan otomatis ter-commit ke repo.

---

## 📝 Menambah / Mengubah Villa

Semua data villa berada di **`src/data/villas.ts`**. Tambahkan entry baru
ke array `villas` dengan field berikut:

```ts
{
  slug: "villa-asana-pinus",        // unik, dipakai di URL
  name: "Villa Asana Pinus",
  area: "Songgoriti",               // harus salah satu dari AREAS
  category: "Family",               // harus salah satu dari CATEGORIES
  price: 1500000,                   // IDR per malam
  bedrooms: 3,
  bathrooms: 2,
  guests: 8,
  amenities: ["Kolam Renang", "WiFi", "Dapur"], // dari AMENITIES
  images: [coverImg, img2, img3],   // import dari src/assets
  rating: 4.8,
  reviews: 124,
  description: "…",
  tag: "Populer",
}
```

Untuk menambah area, kategori, atau fasilitas baru, perbarui konstanta
`AREAS`, `CATEGORIES`, atau `AMENITIES` di file yang sama — schema Zod
di `villas.index.tsx` akan otomatis menerima nilai baru.

---

## 📞 Mengubah Kontak WhatsApp / Sosial

Edit `src/lib/whatsapp.ts`:

```ts
export const WA_NUMBER = "6281336664592";
export const IG_URL    = "https://www.instagram.com/apamurahbanget_/";
export const TIKTOK_URL = "https://www.tiktok.com/@apamurahbanget_";
```

Nomor WA wajib dalam format internasional tanpa `+` (contoh: `62…`).

---

## 🎨 Desain & Theming

- Token warna didefinisikan di `src/styles.css` menggunakan `oklch`
  (primary, secondary, accent, background, foreground, dll.).
- Komponen **wajib** memakai class semantik (`bg-primary`,
  `text-foreground`, dst.), bukan hex/utility warna langsung.
- Shadow & gradient kustom: `--shadow-soft`, `--shadow-card`.

---

## 🌐 SEO

- Tiap route memiliki `head()` sendiri dengan `title`, `description`,
  `og:title`, `og:description`.
- Meta default di `__root.tsx` untuk fallback.
- Gambar hero menggunakan `loading="lazy"` di card listing dan eager di
  hero halaman utama.

---

## 🚢 Deployment

Project di-deploy melalui Lovable:

1. Klik **Publish** di pojok kanan atas editor Lovable.
2. Perubahan frontend butuh klik **Update** di dialog publish agar live.
3. URL stabil: `project--<id>.lovable.app` (production) dan
   `project--<id>-dev.lovable.app` (preview).
4. Custom domain dapat ditambahkan via **Project Settings → Domains**
   setelah publish pertama.

---

## 📜 Lisensi

Proprietary — © Apamurahbanget. Konten foto, brand, dan data villa
adalah milik Apamurahbanget dan tidak untuk digunakan ulang tanpa izin.

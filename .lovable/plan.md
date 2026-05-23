# Rencana: Halaman Daftar Villa + Pencarian

Tujuan: rapikan tampilan, buat halaman daftar villa yang bisa difilter per area/kategori, pencarian (search), dan halaman detail villa. Semua tombol pesan tetap langsung ke WhatsApp.

## Struktur halaman baru

```
/                    → Landing (sudah ada, dirapikan)
/villas              → Daftar semua villa + search + filter
/villas/$slug        → Detail satu villa
```

- Klik kartu area di landing → buka `/villas?area=Songgoriti`
- Klik kartu villa di landing → buka `/villas/villa-asana-pinus`
- Tombol "Lihat Semua Villa" di landing → buka `/villas`

## Data villa

Saya kumpulkan data villa dalam satu file `src/data/villas.ts` (sumber tunggal). Tiap villa punya:

- `slug`, `name`, `area` (Songgoriti / Batu Kota / Bumiaji / Pujon / Coban Rondo)
- `category` (Family, Group, Romantic, Budget, Premium)
- `price`, `bedrooms`, `bathrooms`, `guests`
- `amenities` (Kolam, BBQ, Karaoke, Wi-Fi, View Gunung, dll.)
- `images` (1 cover + beberapa foto)
- `rating`, `reviews`, `description`, `tag`

Mulai dengan ~9 villa biar daftarnya terasa berisi (dari 3 gambar yang sudah ada—dipakai berulang sebagai cover sementara).

## Halaman /villas (Daftar + Search)

Layout: sidebar filter kiri (collapse di mobile jadi tombol "Filter") + grid kartu villa kanan.

Fitur:
- Search bar atas: cari berdasarkan nama villa / area / amenity
- Filter Area (checkbox, multi-pilih)
- Filter Kategori (chip, multi-pilih)
- Filter Harga (slider min–max)
- Filter Jumlah Tamu (stepper)
- Filter Amenity (checkbox: Kolam Pribadi, BBQ, Karaoke, dll.)
- Urutkan: Termurah / Termahal / Rating Tertinggi / Terbaru
- Tampilkan jumlah hasil + tombol "Reset Filter"
- Empty state kalau hasil kosong + tombol chat WA

Semua filter & search disimpan di URL search params (pakai `@tanstack/zod-adapter`) supaya bisa dibagikan/di-bookmark. Contoh URL:
`/villas?q=kolam&area=Songgoriti,Bumiaji&minPrice=800000&maxPrice=2000000&sort=price-asc`

## Halaman /villas/$slug (Detail Villa)

- Galeri foto (grid 1 besar + 4 kecil di desktop, swipe carousel di mobile)
- Judul, alamat, rating, tag
- Spesifikasi (KT, KM, tamu, luas)
- Deskripsi lengkap
- Daftar amenity (icon + label, grid)
- Section "Aturan villa" (check-in/out, kebijakan tamu)
- Sidebar sticky di desktop: harga/malam + tombol besar **Pesan via WhatsApp** (pesan otomatis terisi nama villa) + tombol Telepon
- Section "Villa serupa di area sama" (3 kartu)
- 404 / notFoundComponent kalau slug tidak ada

## Rapikan landing page

- Logo navigasi link ke `/`, tombol nav ("Villa", "Area") sekarang langsung ke `/villas` & `/villas?area=…`
- Search bar mini di hero (input + tombol Cari) → submit ke `/villas?q=…`
- Kartu area & kartu villa jadi `<Link>` ke route baru (bukan WhatsApp lagi—WA tetap ada di tombol "Pesan WA" di kartu)
- Section "Rekomendasi" cuma tampilkan 3 villa unggulan, footer punya tombol "Lihat Semua Villa →"
- Konsistenkan spacing & ukuran heading antar section

## Komponen yang dibuat ulang / baru

- `src/data/villas.ts` — data + helper `getVilla(slug)`, `filterVillas(opts)`
- `src/components/VillaCard.tsx` — kartu reusable (dipakai di landing, list, similar)
- `src/components/VillaFilters.tsx` — panel filter (desktop sidebar, mobile sheet/drawer)
- `src/components/SearchInput.tsx` — input search dengan debounce
- `src/components/WhatsAppButton.tsx` — tombol WA reusable (pesan auto-terisi)
- `src/routes/villas.index.tsx` — halaman daftar
- `src/routes/villas.$slug.tsx` — halaman detail
- SEO `head()` per route (title & description berbeda)

## Detail teknis

- URL search params divalidasi dengan `zodValidator` + `fallback()` dari `@tanstack/zod-adapter` (biar tipe aman).
- Mobile: panel filter pakai `Sheet` dari shadcn yang sudah tersedia, dibuka via tombol "Filter (3)" yang nunjukin jumlah filter aktif.
- Carousel detail pakai `Carousel` shadcn yang sudah tersedia.
- Semua tombol Pesan WA pakai helper `waLink(message)` (sudah ada di index, dipindah ke `src/lib/whatsapp.ts`).
- Tetap responsif: grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, sidebar collapse < lg.

## Hal yang TIDAK dikerjakan (kecuali diminta)

- Sistem booking real (kalender, pembayaran) — tetap via WhatsApp.
- Login/akun user, wishlist tersimpan.
- Generate foto baru tiap villa (pakai 3 foto yang ada dulu; bisa minta tambah nanti).

Konfirmasi kalau setuju, atau kasih tahu kalau ada filter / field yang mau ditambah/dikurangi sebelum saya implementasi.

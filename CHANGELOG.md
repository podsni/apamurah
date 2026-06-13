# Changelog

Semua perubahan penting pada project **Apamurahbanget** akan dicatat di file ini.

---

## [1.4.0] - 2026-06-13

### Removed
- **Section "Jelajahi Area di Batu" (`Locations`):** Komponen beserta data array `areas` (Songgoriti, Batu Kota, Bumiaji, Pujon, Coban Rondo) dihapus sepenuhnya dari halaman beranda untuk menyederhanakan struktur halaman dan mengurangi scroll depth.
- **Quick-link Area di Hero Search Bar:** Tombol pintasan filter area (Songgoriti, Batu Kota, Bumiaji) yang muncul di bawah form pencarian dihapus agar hero tetap bersih dan fokus.
- **Link "Area" di Navigasi:** Item menu "Area" (anchor `#areas`) dihapus dari navbar desktop maupun menu mobile overlay.
- **Link "Area Populer" di Footer:** Tautan menuju section areas di footer juga dihapus agar konsisten.

---

## [1.3.0] - 2026-06-13

### Added
- **LazyImage — Error State:** Menampilkan placeholder "Foto belum bisa dimuat" dengan ikon bergaya saat gambar gagal di-fetch (`onError` handler).
- **LazyImage — Priority & Sizes Props:** Mendukung prop `priority` (fetch priority `"high"`) dan `sizes` (responsive image hints) untuk mengoptimalkan LCP (Largest Contentful Paint) pada gambar pertama yang terlihat.
- **VillaCard — Intersection Observer per Kartu:** Setiap `VillaCard` kini memiliki observer sendiri dengan `rootMargin: 360px` sehingga gambar pra-di-load sebelum masuk viewport tanpa bergantung pada LazyImage global.
- **VillaCard — Hover State & Image Carousel Otomatis:** Kartu villa menampilkan navigasi panah dan indikator halaman saat di-hover; tanda lokasi (`MapPin`) muncul di bawah nama villa.
- **MobileBottomNav — Desain Floating Pill:** Nav bar bawah kini berbentuk pill mengambang (`rounded-[1.45rem]`) dengan border tipis, shadow dinamis, dan backdrop blur. Indikator tab aktif berubah menjadi garis tipis di atas ikon + efek glow blur pada ikon.
- **ScrollToTop Component:** Komponen baru yang mengembalikan posisi scroll ke atas saat navigasi halaman berubah.

### Changed
- **VillaCard — Redesain Kartu Total:** Layout kartu diubah menjadi lebih premium dengan rasio aspek gambar 4:3, badge lokasi, animasi hover lift (`translateY(-4px)`), dan tampilan rating + harga yang lebih terstruktur.
- **VillaFilters — Pembaruan Drawer Filter Mobile:** Tombol filter dan sort di mobile diperbarui agar konsisten dengan desain baru; drawer menutup dengan transisi halus.
- **LazyImage — Transisi Fade Lebih Halus:** Durasi dan kurva animasi fade-in gambar disesuaikan ke `420ms cubic-bezier(0.22, 1, 0.36, 1)` untuk kesan premium.
- **`vite.config.ts` — Optimasi Build:** Menambahkan konfigurasi chunk splitting dan optimasi bundle untuk memperkecil ukuran output produksi.
- **`styles.css` — Token Desain & Utilitas Baru:** Menambahkan variabel warna, animasi `animate-fade-in`, dan class utilitas pendukung komponen baru.

### Fixed
- **MobileBottomNav — Safe Area Inset:** Padding bottom kini menggunakan `pb-[max(env(safe-area-inset-bottom),0.5rem)]` via Tailwind class menggantikan inline style, menghindari potensi konflik CSS.

---

## [1.2.0] - 2026-06-13

### Added
- **Pola Desain High-End:** Menerapkan prinsip desain premium dari skill `high-end-visual-design` ke seluruh halaman utama, katalog villa, dan halaman detail villa.
- **Komponen `ScrollToTop`:** Menambahkan komponen baru yang secara otomatis menggulir halaman ke posisi atas pada setiap perubahan navigasi rute.
- **Komponen `WhatsAppButton` — Peningkatan Aksesibilitas:** Atribut `aria-label` ditambahkan untuk mendukung pembaca layar.
- **Hook `use-favorites` — Hydrasi SSR-Safe:** Memperbaiki race condition saat data favorit dari `localStorage` diinisialisasi sebelum komponen di-mount di browser.

### Changed
- **Halaman Beranda (`index.tsx`) — Hero & Grid Katalog:** Hero section didesain ulang dengan tipografi skala besar, gradien latar yang lebih dramatis, dan grid villa menggunakan layout yang lebih lega dan responsif.
- **Halaman Katalog (`villas.index.tsx`) — Performa & UX:** Mendukung prop `priority` pada 4 kartu pertama yang terlihat untuk mempercepat LCP; filter dan sort tetap dalam satu baris tanpa tumpang tindih di semua breakpoint.
- **Halaman Detail (`villas.$slug.tsx`) — Galeri & Sidebar:** Layout galeri utama diperbarui; sidebar booking menjadi lebih kompak dengan hierarki informasi yang lebih jelas.
- **Rendering Gambar — Optimasi Menyeluruh:** Menambahkan `fetchPriority="high"` pada gambar hero dan `decoding="async"` secara konsisten di seluruh komponen gambar.

---

## [1.1.0] - 2026-06-13

### Added
- **Script Kompresi Gambar (`scripts/compress.cjs`):** Script utilitas berbasis library `sharp` untuk mengompresi dan meresize seluruh gambar di `public/images/` secara rekursif ke resolusi maksimal 1200px dan kualitas WebP 80%.
- **Gestur Zoom & Drag di Lightbox:**
  - Double-click (desktop) pada gambar untuk memperbesar (2.5x) berpusat di koordinat kursor, dan double-click lagi untuk mengembalikannya ke semula.
  - Double-tap (mobile) pada gambar untuk mempermudah zoom responsive.
  - Dukungan penuh pergeseran gambar (*dragging/panning*) saat posisi sedang di-zoom baik lewat mouse maupun sentuhan.
  - Menambahkan tombol "Reset zoom" dinamis yang muncul hanya ketika gambar diperbesar.
- **Aksi Klik Latar Belakang untuk Tutup:** Menambahkan deteksi klik pada area hitam/kosong di luar gambar untuk menutup lightbox secara instan ketika `scale === 1`.

### Changed
- **Pembaruan Aset Gambar & Katalog Real:** Seluruh katalog data villa dummy telah diganti menjadi data asli (AB Villa, Sea Villa 1, Sea Villa 2, dan Se Villa) lengkap dengan 100 berkas gambar WebP asli beresolusi tinggi di `/public/images/`.
- **Kompresi Aset Gambar Massal (-83.8%):** Mengompresi seluruh 100 aset gambar dari ukuran semula **47.8 MB menjadi 7.8 MB** (menghemat **40.0 MB** bandwidth). Mengeliminasi lag rendering/decoding gambar dan mempercepat waktu muat halaman secara drastis.
- **Pembersihan UI Halaman Detail (`villas.$slug.tsx`):**
  - Menghapus tombol dan fungsionalitas penampil strip gambar panjang ("Tampilkan semua foto dalam strip") agar tampilan lebih ringkas.
  - Menghapus semua tombol dan link tautan menuju "Google Drive" di halaman detail dan sidebar booking.
- **Optimasi Performa Thumbnail Lightbox:** Menambahkan `loading="lazy"` dan `decoding="async"` pada strip gambar thumbnail di bagian bawah lightbox agar tidak memblokir UI thread saat dibuka pertama kali.

### Fixed
- **Tombol Tutup Lightbox Terblokir (z-index bug):** Memperbaiki tumpukan *stacking context* di mana kontainer gambar `z-10` menutupi tombol tutup dan *top bar* yang juga berada di `z-10`. *Top Bar* kini dinaikkan ke `z-30` sehingga tombol tutup dan menu navigasi selalu berada di lapisan teratas dan responsif.
- **Gambar Pecah/Hilang di Vercel (Routing Bug):** Memperbaiki file `vercel.json` dengan menambahkan rute `/images/(.*)` agar dilayani sebagai aset statis. Sebelumnya, seluruh request gambar dialihkan ke server API SSR (`/api/index`) yang mengakibatkan gambar gagal dimuat di Vercel.

---

## [1.0.0] - 2026-06-12
- Rilis inisial website Apamurahbanget sewa villa Batu Malang.
- Halaman beranda, katalog filter/pencarian villa, dan integrasi pemesanan WhatsApp.

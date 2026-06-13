# Changelog

Semua perubahan penting pada project **Apamurahbanget** akan dicatat di file ini.

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

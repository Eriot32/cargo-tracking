# PAITON Cargo Tracking

Aplikasi pencarian data cargo berbasis Next.js. Data awal berasal dari dokumen internal, lalu dapat dipindahkan ke Supabase agar mudah diperbarui tanpa mengubah kode aplikasi.

## Struktur proyek

```
src/                    Aplikasi web
src/components/         Komponen tampilan
src/lib/                Tipe data dan koneksi Supabase
public/tracking-images/ Gambar bukti tracking yang ditampilkan situs
scripts/                Utilitas impor data
supabase/migrations/    Skema database Supabase
data/source/            Dokumen Excel/Word asli (lokal, tidak masuk Git)
```

## Jalankan di komputer

1. Salin `.env.local.example` menjadi `.env.local`.
2. Jalankan `npm install` sekali, lalu `npm run dev`.
3. Buka `http://localhost:3000`.

Tanpa konfigurasi Supabase, aplikasi memakai data cadangan lokal agar tetap dapat didemonstrasikan.

## Memperbarui data dari Excel

Simpan Excel baru di `data/source/`, lalu jalankan:

```bash
npm run import:tracking -- "data/source/nama-file.xlsx"
```

Importer mencocokkan data berdasarkan kombinasi MAWB dan HAWB. Baris duplikat tidak ditambahkan; kolom, rute, berat, dan jadwal yang sebelumnya kosong akan dilengkapi tanpa mengganti nilai yang sudah ada.

## Menghubungkan Supabase

1. Buat proyek di [Supabase](https://supabase.com/dashboard), pilih region terdekat (Singapore).
2. Di **SQL Editor**, jalankan isi `supabase/migrations/001_create_cargo_tracking.sql`.
3. Di **Project Settings → API**, salin **Project URL** dan **anon public key** ke `.env.local`.
4. Untuk impor pertama, tambahkan sementara `SUPABASE_SERVICE_ROLE_KEY` hanya ke `.env.local` (jangan pernah ke Vercel atau GitHub), lalu jalankan `npm run seed`.
5. Hapus `SUPABASE_SERVICE_ROLE_KEY` dari `.env.local` setelah impor selesai bila tidak diperlukan lagi.

## Deploy ke Vercel

1. Buat repository GitHub **private** untuk proyek ini. Data tracking akan tampil di situs publik, tetapi dokumen sumber dan riwayat pengembangan tetap tidak terbuka.
2. Import repository tersebut di [Vercel](https://vercel.com/new).
3. Masukkan dua environment variable pada Vercel: `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Klik **Deploy**. Setelah itu setiap push ke branch utama akan otomatis memperbarui situs.

## Keamanan data

- `.env.local`, dokumen Word, dan folder `data/source` tidak dikirim ke GitHub.
- Jangan memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke kode, GitHub, atau Vercel.
- Tabel database hanya membuka akses baca untuk pengunjung; perubahan data dilakukan melalui dashboard Supabase.

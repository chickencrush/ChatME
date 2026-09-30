# 💬 TeamChat - Aplikasi Chat Tim Kerja

Aplikasi chat tim kerja modern mirip Slack/Microsoft Teams yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## ✨ Fitur

- 📢 Channel publik & private
- 👥 Daftar anggota tim dengan status (Online/Away/Busy/Offline)
- 💬 Real-time chat dengan grouping pesan per tanggal
- 😊 Reactions emoji pada pesan
- 📱 Responsive design (mobile & desktop)
- 🔍 Pencarian & notifikasi unread count
- ⚡ Quick emoji picker

---

## 🛠️ Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** versi 18 atau lebih baru → [Download Node.js](https://nodejs.org/)
- **npm** (sudah termasuk saat install Node.js)

Cek versi Node.js dengan perintah:
```bash
node --version
npm --version
```

---

## 📦 Cara Install

### 1. Download / Clone Project

**Opsi A: Download ZIP**
- Klik tombol **Code** → **Download ZIP** di GitHub
- Extract file ZIP ke folder yang diinginkan

**Opsi B: Clone dari Git**
```bash
git clone https://github.com/username/teamchat.git
cd teamchat
```

### 2. Install Dependencies

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
npm install
```

Tunggu sampai semua package terinstall (biasanya 1-3 menit tergantung koneksi internet).

### 3. Jalankan Aplikasi (Development Mode)

```bash
npm run dev
```

Anda akan melihat output seperti:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Buka di Browser

Buka browser dan akses:
```
http://localhost:5173
```

---

## 🏗️ Build untuk Production

Untuk membuat versi production yang siap deploy:

```bash
npm run build
```

Hasil build akan ada di folder `dist/`. Anda bisa upload isi folder ini ke hosting.

### Preview hasil build (opsional):
```bash
npm run preview
```

---

## 🚀 Cara Deploy

### Deploy ke Vercel (Gratis)
1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik **New Project** → Import dari GitHub
4. Klik **Deploy**

### Deploy ke Netlify (Gratis)
1. Jalankan `npm run build`
2. Drag & drop folder `dist/` ke [netlify.com/drop](https://app.netlify.com/drop)

### Deploy ke GitHub Pages
1. Install package: `npm install -D gh-pages`
2. Tambahkan di `package.json`:
   ```json
   "homepage": "https://username.github.io/teamchat",
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Jalankan: `npm run build && npm run deploy`

---

## 📁 Struktur Project

```
teamchat/
├── public/              # File statis (favicon, dll)
├── src/
│   ├── components/      # Komponen React
│   │   ├── Sidebar.tsx      # Sidebar channel list
│   │   ├── ChatArea.tsx     # Area chat & input pesan
│   │   └── MemberList.tsx   # Daftar anggota tim
│   ├── App.tsx          # Komponen utama
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   ├── types.ts         # TypeScript types
│   └── data.ts          # Data dummy (users, channels)
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Konfigurasi Vite
├── tailwind.config.js   # Konfigurasi Tailwind
└── tsconfig.json        # Konfigurasi TypeScript
```

---

## 🎮 Cara Menggunakan Aplikasi

1. **Pilih Channel** - Klik nama channel di sidebar kiri (misal: #umum, #frontend)
2. **Baca Pesan** - Scroll untuk melihat pesan-pesan sebelumnya
3. **Kirim Pesan** - Ketik di input bawah, tekan Enter atau klik tombol "Kirim"
4. **Lihat Anggota** - Lihat panel kanan untuk daftar anggota dan status mereka
5. **Mobile** - Gunakan tombol hamburger (☰) untuk buka sidebar, tombol 👥 untuk lihat anggota

---

## 🔧 Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `npm: command not found` | Install Node.js dari nodejs.org |
| `Port 5173 already in use` | Jalankan `npm run dev -- --port 3000` |
| `Module not found` | Jalankan ulang `npm install` |
| `Build error` | Pastikan Node.js versi 18+ |
| Halaman blank | Buka Console browser (F12) untuk lihat error |

---

## 📝 Lisensi

MIT License - Bebas digunakan untuk keperluan apapun.

---

Dibuat dengan ❤️ menggunakan React + TypeScript + Tailwind CSS

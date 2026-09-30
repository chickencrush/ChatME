# 💬 TeamChat - Web App Chat Tim Kerja

Aplikasi chat tim kerja modern sebagai **Web App** yang bisa diakses langsung dari browser. Mirip Slack/Microsoft Teams dengan fitur-fitur canggih.

## ✨ Fitur Web App

### 💬 Chat & Komunikasi
- 📢 **6 Channel** (umum, frontend, backend, design, data-analytics, random)
- 💬 **Real-time chat** dengan grouping pesan per tanggal
- 😊 **Emoji picker** lengkap dengan 5 kategori
- 👍 **Reactions** pada pesan
- ⌨️ **Typing indicator** - lihat siapa yang sedang mengetik
- 🤖 **Auto-reply simulation** - anggota tim otomatis merespon

### 🎨 UI/UX
- 🌙 **Dark Mode** - toggle antara light & dark theme
- 📱 **Fully Responsive** - optimal di desktop, tablet, dan mobile
- ⚡ **Splash Screen** - loading animation saat pertama buka
- 🎭 **Smooth Animations** - transisi halus di setiap interaksi
- 🎯 **Modern Design** - UI clean dan profesional

### 🔍 Pencarian & Navigasi
- 🔍 **Search Modal** - cari pesan, channel, atau anggota
- ⌨️ **Keyboard Shortcuts** - `Ctrl+K` untuk search, `Enter` untuk kirim
- 🔔 **Unread Badges** - notifikasi pesan belum dibaca
- 📌 **Quick Actions** - tombol aksi di hover pesan

### 👥 Manajemen Tim
- 👥 **Member List** - lihat semua anggota dan status mereka
- 🟢 **Status Online** - Online, Away, Busy, Offline
- 🏷️ **Role Tags** - lihat role setiap anggota

### 💾 Data & Penyimpanan
- 💾 **LocalStorage** - pesan tersimpan otomatis di browser
- 🔄 **Reset Data** - kembalikan ke data default
- 📱 **PWA-Ready** - bisa di-install sebagai app di mobile

---

## 🚀 Cara Menggunakan (Web App)

### Akses Langsung
Buka aplikasi di browser - tidak perlu install apapun!

### Install sebagai App (PWA)
**Di Mobile (Android/iOS):**
1. Buka di Chrome/Safari
2. Tap menu (⋮ atau Share)
3. Pilih "Add to Home Screen" / "Tambah ke Layar Utama"
4. App icon akan muncul di home screen

**Di Desktop (Chrome/Edge):**
1. Buka di browser
2. Klik icon install di address bar
3. Atau: Menu → "Install TeamChat"

---

## 🎮 Cara Menggunakan Aplikasi

| Aksi | Cara |
|------|------|
| **Pilih channel** | Klik nama channel di sidebar kiri |
| **Kirim pesan** | Ketik di kotak bawah → tekan `Enter` |
| **Baris baru** | Tekan `Shift + Enter` |
| **Cari pesan** | Klik search bar atau tekan `Ctrl+K` |
| **Lihat anggota** | Panel kanan (atau tombol 👥 di mobile) |
| **Dark mode** | Klik 🌙/☀️ di sidebar |
| **Emoji** | Klik icon emoji di input |
| **Reset data** | Klik tombol 🔄 di kiri bawah |
| **Buka sidebar** | Klik ☰ di mobile |

---

## 🛠️ Untuk Developer

### Tech Stack
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS (dark mode support)
- ⚡ Vite (build tool)
- 💾 LocalStorage API

### Install & Run
```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

### Struktur Project
```
src/
├── components/
│   ├── Sidebar.tsx        # Sidebar navigasi & channel list
│   ├── ChatArea.tsx       # Area chat & input pesan
│   ├── MemberList.tsx     # Daftar anggota tim
│   ├── SplashScreen.tsx   # Loading animation
│   └── SearchModal.tsx    # Modal pencarian
├── hooks/
│   └── useLocalStorage.ts # Custom hooks (localStorage & dark mode)
├── App.tsx                # Komponen utama
├── types.ts               # TypeScript interfaces
├── data.ts                # Data dummy & auto-replies
├── index.css              # Global styles & animations
└── main.tsx               # Entry point
```

---

## 🌐 Deploy Web App

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Upload folder `dist/` ke Netlify

### GitHub Pages
```bash
npm install -D gh-pages
# Tambahkan "homepage" di package.json
npm run build
npx gh-pages -d dist
```

---

## 📱 Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Edge 90+ | ✅ Full support |
| Mobile Safari | ✅ Full support |
| Chrome Android | ✅ Full support |

---

## 🔑 Keyboard Shortcuts

| Shortcut | Aksi |
|----------|------|
| `Ctrl/⌘ + K` | Buka pencarian |
| `Enter` | Kirim pesan |
| `Shift + Enter` | Baris baru |
| `Escape` | Tutup modal/search |

---

Dibuat dengan ❤️ menggunakan React + TypeScript + Tailwind CSS

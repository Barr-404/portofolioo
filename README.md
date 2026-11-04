# Portfolio — Muh Akbar Haeruddin

Website portofolio pribadi berbasis **Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion**.
Daftar proyek ditarik otomatis dari GitHub (`Barr-404`) dan bisa dikurasi manual lewat file config.

## Fitur

- Hero dengan animasi typing multi-peran, foto profil dari GitHub, badge "Open to work"
- Integrasi GitHub API (cache 1 jam) — repo kosong, fork, dan repo profil disembunyikan otomatis
- Kurasi manual: judul, deskripsi dua bahasa, tech stack, screenshot, dan status *featured* per repo
- Section: About (counter animasi), Skills (ikon brand), Projects, Experience (timeline), Contact (Web3Forms)
- Bilingual **EN / ID** dengan toggle, tersimpan di `localStorage`
- Dark / Light mode (`next-themes`), progress bar scroll, active-section highlight
- Animasi *reveal on scroll*, hover lift, stagger — menghormati `prefers-reduced-motion`

## Menjalankan

```bash
npm install
cp .env.local.example .env.local   # lalu isi nilainya
npm run dev                         # http://localhost:3000
npm run build && npm start          # production
```

## Yang perlu Anda isi

| File | Isi |
| --- | --- |
| [src/data/profile.ts](src/data/profile.ts) | Nama, email, telepon/WhatsApp, LinkedIn, lokasi, tagline, paragraf About, link CV |
| [src/data/experience.ts](src/data/experience.ts) | Pendidikan, pekerjaan/magang, organisasi (ganti placeholder `TODO`) |
| [src/data/projects.ts](src/data/projects.ts) | Override per repo: `featured`, `title`, `description`, `tech`, `image`, `liveUrl`; daftar `hiddenRepos` |
| [src/data/skills.ts](src/data/skills.ts) | Kategori & daftar skill beserta ikon (dari `react-icons`) |
| `public/cv.pdf` | File CV untuk tombol "Download CV" (kosongkan `cvUrl` di profile.ts jika belum ada) |
| `public/projects/*.png` | Screenshot proyek unggulan (rasio 16:10), lalu set `image` di projects.ts |
| `.env.local` | `NEXT_PUBLIC_WEB3FORMS_KEY` (form kontak), `GITHUB_TOKEN` (opsional), `NEXT_PUBLIC_SITE_URL` |

### Contact form (Web3Forms)

1. Daftar gratis di <https://web3forms.com> dengan email tujuan Anda.
2. Salin *Access Key* ke `.env.local` → `NEXT_PUBLIC_WEB3FORMS_KEY=...`
3. Tanpa key, form menampilkan pesan agar pengunjung mengirim email langsung.

### Menambah project unggulan

Di `src/data/projects.ts`, tambahkan/ubah entri:

```ts
{
  repo: "NAMA-REPO",
  featured: true,
  title: "Judul yang enak dibaca",
  description: { en: "...", id: "..." },
  tech: ["Next.js", "PostgreSQL"],
  image: "/projects/nama-repo.png",
  liveUrl: "https://demo.vercel.app", // atau null untuk menyembunyikan tombol Live
}
```

Repo yang tidak ada di daftar tetap tampil dengan data asli GitHub (nama di-*humanize* otomatis).
Agar deskripsi otomatis terbaca, isi kolom *Description* pada repo di GitHub.

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import di <https://vercel.com/new>, framework terdeteksi otomatis.
3. Tambahkan Environment Variables: `NEXT_PUBLIC_WEB3FORMS_KEY`, `NEXT_PUBLIC_SITE_URL` (URL vercel Anda), opsional `GITHUB_TOKEN`.
4. Deploy. Data GitHub di-*revalidate* tiap 1 jam.

## Struktur

```
src/
  app/            layout, page, globals.css
  components/
    layout/       Navbar, Footer, ThemeToggle, LangToggle
    sections/     Hero, About, Skills, Projects, Experience, Contact
    ui/           Reveal, TypingText, SectionHeading, ProjectCard, FeaturedProjectCard
    providers/    Theme + Lang providers
  context/        LangContext
  data/           profile, projects, skills, experience  ← edit di sini
  dictionaries/   en, id  (teks UI)
  lib/            github (fetch + filter + merge), project (types), time
```

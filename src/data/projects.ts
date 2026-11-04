import type { Lang } from "./profile";

export type LocalizedText = Record<Lang, string>;

export interface ProjectOverride {
  /** Nama repo GitHub (case-sensitive) */
  repo: string;
  featured?: boolean;
  /** Repo private: selalu ditampilkan (tidak tergantung GitHub API) dan tanpa tombol Source Code */
  private?: boolean;
  title?: string;
  description?: LocalizedText;
  tech?: string[];
  /** Path gambar di folder public, mis. "/projects/penilaian.png" */
  image?: string;
  /** Isi URL untuk menimpa homepage GitHub, atau `null` untuk menyembunyikan tombol Live */
  liveUrl?: string | null;
}

/**
 * Repo yang tidak ingin ditampilkan sama sekali.
 * Repo kosong (size 0), fork, dan repo profil otomatis disembunyikan di lib/github.ts.
 */
export const hiddenRepos: string[] = ["Barr-404", "MuhAkbar04"];

/**
 * Kurasi manual: menimpa data dari GitHub agar judul/deskripsi lebih profesional.
 * URUTAN di array ini = URUTAN TAMPIL di web (`featured: true` selalu paling atas).
 * Repo yang tidak ada di sini tampil setelahnya, diurutkan dari push terbaru.
 */
export const projectOverrides: ProjectOverride[] = [
  {
    repo: "kasir-invoice",
    featured: true,
    private: true,
    title: "Cashier & Invoice System",
    description: {
      en: "Point-of-sale web application for recording sales transactions, managing products and stock, and generating printable invoices with daily sales reports.",
      id: "Aplikasi kasir berbasis web untuk mencatat transaksi penjualan, mengelola produk dan stok, serta membuat invoice siap cetak dengan laporan penjualan harian.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    // TODO: isi URL demo jika sudah di-deploy, mis. "https://kasir-invoice.vercel.app"
    liveUrl: null,
  },
  {
    repo: "PENILAIAN-SEKOLAH-DASAR",
    featured: true,
    title: "Elementary School Grading System",
    description: {
      en: "A web application for managing student grades at the elementary school level — teachers input scores per subject, the system computes averages and report cards, and administrators monitor class performance from a dashboard.",
      id: "Aplikasi web untuk mengelola penilaian siswa sekolah dasar — guru menginput nilai per mata pelajaran, sistem menghitung rata-rata dan rapor, dan admin memantau performa kelas melalui dashboard.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    // TODO: tambahkan screenshot ke public/projects/penilaian-sekolah-dasar.png lalu isi `image`
    // TODO: deploy ulang ke Vercel lalu ganti `null` dengan URL live-nya
    liveUrl: null,
  },
  {
    repo: "mesjid",
    featured: true,
    title: "Mosque Zakat & Finance Management System",
    description: {
      en: "Administration system for Masjid Muhammadiyah to manage zakat fitrah, zakat mal, monthly donors, qurban savings, daily cash flow, expenses with approval, and mustahiq distribution — with dashboards, charts, and PDF reports.",
      id: "Sistem administrasi Masjid Muhammadiyah untuk mengelola zakat fitrah, zakat mal, donatur bulanan, tabungan qurban, kas harian, pengeluaran dengan approval, dan distribusi mustahiq — dilengkapi dashboard, grafik, dan laporan PDF.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "NextAuth", "Vercel"],
    liveUrl: "https://mesjid-ruby.vercel.app",
  },
  {
    repo: "AKB-LAB-MUH-AKBAR-HAERUDDIN",
    title: "Web Lab Practicum Projects",
    description: {
      en: "Collection of web development lab assignments covering React components, routing, state management, and API integration.",
      id: "Kumpulan tugas praktikum pengembangan web mencakup komponen React, routing, state management, dan integrasi API.",
    },
    tech: ["TypeScript", "React"],
  },
  {
    repo: "LAB-BACK-END",
    title: "Backend Lab — REST API",
    description: {
      en: "REST API built with Node.js and TypeScript, covering routing, controllers, validation, and database access patterns.",
      id: "REST API dengan Node.js dan TypeScript, mencakup routing, controller, validasi, dan pola akses database.",
    },
    tech: ["Node.js", "TypeScript", "Express"],
  },
  {
    repo: "BACK-END",
    title: "Backend Fundamentals",
    description: {
      en: "Backend exercises exploring server setup, middleware, and CRUD endpoints with TypeScript.",
      id: "Latihan backend yang mengeksplorasi setup server, middleware, dan endpoint CRUD dengan TypeScript.",
    },
    tech: ["Node.js", "TypeScript"],
  },
  {
    repo: "Web-Back-end",
    title: "Web Backend Service",
    description: {
      en: "Server-side application handling HTTP requests, data persistence, and authentication flow.",
      id: "Aplikasi sisi server yang menangani HTTP request, penyimpanan data, dan alur autentikasi.",
    },
    tech: ["Node.js", "TypeScript"],
  },
  {
    repo: "final-web-muh-akbar-haeruddin",
    title: "Final Web Project",
    description: {
      en: "Final project for the web programming course — a responsive multi-page website built with vanilla JavaScript.",
      id: "Proyek akhir mata kuliah pemrograman web — website multi-halaman responsif dengan JavaScript murni.",
    },
    tech: ["JavaScript", "HTML", "CSS"],
  },
  {
    repo: "105841104622-ATK-labweb",
    title: "Office Supplies (ATK) Web Lab",
    description: {
      en: "Static website for an office-supplies catalog, built as a web lab assignment with semantic HTML and CSS.",
      id: "Website statis katalog alat tulis kantor, dibuat sebagai tugas praktikum web dengan HTML semantik dan CSS.",
    },
    tech: ["HTML", "CSS"],
  },
];

import type { Lang } from "./profile";

export interface TimelineItem {
  type: "education" | "work" | "organization";
  title: Record<Lang, string>;
  organization: string;
  location?: string;
  /** Contoh: "2022 – Present" / "2022 – Sekarang" */
  period: Record<Lang, string>;
  description: Record<Lang, string[]>;
}

// TODO: Ganti placeholder di bawah dengan riwayat Anda yang sebenarnya.
export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: { en: "Bachelor of Informatics", id: "S1 Informatika" },
    organization: "Universitas Muhammadiyah Makassar", // TODO
    location: "Makassar, Indonesia",
    period: { en: "2022 – Present", id: "2022 – Sekarang" },
    description: {
      en: [
        "Focus on web development, databases, and data analysis.",
        "Completed lab courses in frontend, backend, and web programming.",
      ],
      id: [
        "Fokus pada pengembangan web, basis data, dan analisis data.",
        "Menyelesaikan praktikum frontend, backend, dan pemrograman web.",
      ],
    },
  },
  {
    type: "work",
    title: { en: "Freelance Web Developer", id: "Freelance Web Developer" },
    organization: "Self-employed", // TODO
    period: { en: "2024 – Present", id: "2024 – Sekarang" },
    description: {
      en: [
        "Built and deployed an elementary school grading system used by teachers to manage student scores.",
        "Delivered responsive web applications with Next.js, TypeScript, and Tailwind CSS.",
      ],
      id: [
        "Membangun dan merilis sistem penilaian sekolah dasar yang digunakan guru untuk mengelola nilai siswa.",
        "Mengerjakan aplikasi web responsif dengan Next.js, TypeScript, dan Tailwind CSS.",
      ],
    },
  },
  {
    type: "organization",
    title: { en: "Member", id: "Anggota" },
    organization: "Student Organization / Community", // TODO
    period: { en: "2023 – 2024", id: "2023 – 2024" },
    description: {
      en: ["Handled documentation and administrative coordination for events."],
      id: ["Menangani dokumentasi dan koordinasi administrasi kegiatan."],
    },
  },
];

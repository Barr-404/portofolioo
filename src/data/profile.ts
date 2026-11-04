// TODO: Isi data pribadi Anda di sini. Semua field dipakai di Hero, About, Contact, Footer.
export const profile = {
  name: "Muh Akbar Haeruddin",
  shortName: "Akbar",
  githubUsername: "Barr-404",
  // Foto profil di folder public/ (rasio potret/1:1, min. 400px)
  photo: "/projects/foto_latar_biru_500kb.jpg",
  // Peran yang ditampilkan bergantian di animasi typing pada Hero
  roles: {
    en: [
      "Fullstack Developer",
      "Data Analyst",
      "Data Science Enthusiast",
      "IT Support Specialist",
      "Administrative Professional",
    ],
    id: [
      "Fullstack Developer",
      "Data Analyst",
      "Penggiat Data Science",
      "IT Support",
      "Tenaga Administrasi",
    ],
  },
  tagline: {
    en: "Building reliable web applications and turning data into clear decisions.",
    id: "Membangun aplikasi web yang andal dan mengubah data menjadi keputusan yang jelas.",
  },
  about: {
    en: [
      "I am an Informatics graduate with hands-on experience building fullstack web applications using TypeScript, React, Next.js, and Node.js, as well as analyzing data with Python, SQL, and spreadsheets.",
      "I enjoy working at the intersection of technology and operations — whether that means shipping a web app, cleaning and visualizing a dataset, troubleshooting IT issues, or keeping administrative processes organized and efficient.",
      "I am currently open to roles in Fullstack Development, Data Analysis, IT Support, and Administration.",
    ],
    id: [
      "Saya lulusan Informatika dengan pengalaman membangun aplikasi web fullstack menggunakan TypeScript, React, Next.js, dan Node.js, serta menganalisis data dengan Python, SQL, dan spreadsheet.",
      "Saya senang bekerja di persimpangan teknologi dan operasional — baik merilis aplikasi web, membersihkan dan memvisualisasikan data, menangani kendala IT, maupun menjaga proses administrasi tetap rapi dan efisien.",
      "Saat ini saya terbuka untuk posisi Fullstack Developer, Data Analyst, IT Support, dan Administrasi.",
    ],
  },
  location: "Makassar, Indonesia", // TODO
  email: "muhammadakbarhrd404@gmail.com",
  phone: "+62 882-0210-71774", // dipakai untuk link WhatsApp
  links: {
    github: "https://github.com/Barr-404",
    linkedin: "https://www.linkedin.com/in/muh-akbar-haeruddin-6b1a11347/",
    instagram: "", // opsional
  },
  // Letakkan file CV di public/cv.pdf, atau kosongkan untuk menyembunyikan tombol
  cvUrl: "/cv.pdf",
  availableForWork: true,
} as const;

export type Lang = "en" | "id";

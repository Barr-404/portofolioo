import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/providers/Providers";
import { profile } from "@/data/profile";
import { getCurrentYear } from "@/lib/time";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Portfolio`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline.en,
  keywords: ["Fullstack Developer", "Data Analyst", "IT Support", "Portfolio", profile.name],
  authors: [{ name: profile.name, url: profile.links.github }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — Portfolio`,
    description: profile.tagline.en,
    siteName: profile.name,
    images: [{ url: profile.photo, width: 768, height: 1024 }],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — Portfolio`,
    description: profile.tagline.en,
  },
  // Situs punya toggle EN/ID sendiri; auto-translate browser merusak hydration React
  other: { google: "notranslate" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const year = await getCurrentYear();

  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer year={year} />
        </Providers>
      </body>
    </html>
  );
}

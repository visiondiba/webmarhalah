import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ScrollSmoother from "@/components/ScrollSmoother";
import Countdown from "@/components/Countdown";

export const metadata: Metadata = {
  title: "Impervious Generation 6101 | Golden Age Catalyst",
description:
  "Impervious Generation — Generasi tonggak 100 Tahun Kedua Gontor yang tangguh, teguh, kokoh, dan dinamis dalam membangun peradaban dunia.",
keywords: [
  // Core
  "Impervious Generation",
  "KMI 6101",
  "6101 Official Website",
  "Gontor",
  "Pondok Modern Darussalam Gontor",
  "PMDG",
  "Gontor Islamic Boarding School",
  "Modern Islamic Boarding School Indonesia",
  "Kulliyatul Mu'allimin Al-Islamiyah",
  "KMI Gontor",
  "Islamic Education System",
  "Pesantren Modern",
  "Pendidikan Islam Modern",
  "Islamic Boarding School",
  "Nilai-Nilai Gontor",
  "Trimurti Gontor",
  "Panca Jiwa Gontor",
  "Character Building",
  "Leadership Education",
  "Santri Leadership",
  "Disiplin Santri",
  "Mental Toughness",
  "Islamic Character Building",
  "Generasi Gontor",
  "Santri Gontor",
  "Alumni Gontor",
  "Generasi Tangguh",
  "Generasi Berkarakter",
  "Future Muslim Leaders",
  "Islamic Civilization Builders",
  "100 Tahun Gontor",
  "Gontor Centenary",
  "Second Century Gontor",
  "Tonggak Abad Kedua Gontor",
  "Peradaban Dunia Islam",
  "Marhalah",
  "Angkatan 6101",
  "Batch 6101",
  "Class of 6101",
],
  authors: [{ name: "Siswa Akhir KMI 6101" }],
  metadataBase: new URL("https://imperviousgeneration.my.id"),
  openGraph: {
    title: "Impervious Generation 6101 | Unshaken, Unbroken",
    description:
      "Impervious Generation — Generasi tonggak 100 Tahun Kedua Gontor yang tangguh, teguh, kokoh, dan dinamis dalam membangun peradaban dunia.",
    url: "https://imperviousgeneration.my.id",
    siteName: "Impervious Generation",
    images: [
      {
        url: "/assets/images/lambang.webp", // buat/sediakan file ini
        width: 1200,
        height: 630,
        alt: "Impervious Generation 6101 | Unshaken, Unbroken",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impervious Generation 6101 | Unshaken, Unbroken",
    description:
      "Impervious Generation — Generasi tonggak 100 Tahun Kedua Gontor yang tangguh, teguh, kokoh, dan dinamis dalam membangun peradaban dunia.",
    images: ["/assets/images/lambang.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

import LoadingScreen from "@/components/LoadingScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth"
      )}
    >
      <body className="font-sans antialiased">
          <LoadingScreen />
          {children}
          <Footer />
      </body>
    </html>
  );
}
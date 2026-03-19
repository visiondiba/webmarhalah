import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ScrollSmoother from "@/components/ScrollSmoother";
import Countdown from "@/components/Countdown";

export const metadata: Metadata = {
  title: "Impervious Generation",
  description:
    "Generasi tonggak 100 Tahun Kedua Gontor — tangguh, teguh, kokoh, dan dinamis dalam mewujudkan pusat peradaban dunia.",
  keywords: [
    "Gontor",
    "Pondok Modern Darussalam Gontor",
    "Impervious Generation",
    "KMI 6101",
    "Marhalah",
  ],
  authors: [{ name: "Siswa Akhir KMI 6101" }],
  metadataBase: new URL("https://imperviousgeneration.my.id"),
  openGraph: {
    title: "Impervious Generation | Gontor",
    description:
      "Generasi tonggak 100 Tahun Kedua Gontor — tangguh, teguh, kokoh, dan dinamis.",
    url: "https://imperviousgeneration.my.id",
    siteName: "Impervious Generation",
    images: [
      {
        url: "/assets/images/lambang.webp", // buat/sediakan file ini
        width: 1200,
        height: 630,
        alt: "Impervious Generation",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impervious Generation | Gontor",
    description:
      "Generasi tonggak 100 Tahun Kedua Gontor — tangguh, teguh, kokoh, dan dinamis.",
    images: ["/assets/images/lambang.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

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
            {children}
            <Footer />

      </body>
    </html>
  );
}
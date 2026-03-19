import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ScrollSmoother from "@/components/ScrollSmoother";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumin Gen",
  description: "Copyright 2025",
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
        geistSans.variable,
        geistMono.variable,
        "scroll-smooth"
      )}
    >
      <body className="font-sans antialiased">
        <ScrollSmoother />
        <Navbar/>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
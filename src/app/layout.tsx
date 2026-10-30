import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWIEwagen — Precision. Power. Legend. | Personenkraftwagen",
  description:
    "Germany's finest automotive collective. We place precision instruments into the hands of people who demand more from the road. Explore our fleet of performance sedans, supercars, luxury tourers, and electric pioneers.",
  keywords: [
    "AWIEwagen",
    "Autohaus",
    "Personenkraftwagen",
    "Supercars",
    "Luxury Cars Frankfurt",
    "Audi Phantom",
    "BMW Tempest GTR",
    "Porsche Corvus EV",
    "Lamborghini Obsidian",
  ],
  authors: [{ name: "AWIEwagen Autohaus" }],
  openGraph: {
    title: "AWIEwagen — Precision. Power. Legend.",
    description: "Explore our fleet of sub-3-second sedans, supercars, and bespoke grand tourers.",
    url: "https://awiewagen.de",
    siteName: "AWIEwagen",
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

import { CurrencyProvider } from "@/context/CurrencyContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${rajdhani.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0A0A0F] text-[#F0F0F0] selection:bg-[#E8001D] selection:text-white antialiased">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}

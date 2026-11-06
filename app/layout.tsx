import type { Metadata, Viewport } from "next";
import { Cormorant, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

// Turkish letters (ş, ğ, ı, İ) are in the latin-ext subset.
const cormorant = Cormorant({
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  variable: "--font-cormorant",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.legalName,
    locale: "tr_TR",
    type: "website",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // lang="tr" also makes CSS uppercase produce "İ" rather than "I".
    <html lang="tr" className={`${cormorant.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#icerik"
          className="fixed left-4 top-4 z-50 -translate-y-24 bg-ink px-4 py-2 text-paper transition-transform focus:translate-y-0"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

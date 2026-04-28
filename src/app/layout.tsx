import GlobalPreloader from '@/components/GlobalPreloader';
import Image from 'next/image';
import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/utils/ScrollToTop";
import CartSidebar from "@/components/shop/CartSidebar";
import FloatingCartButton from "@/components/shop/FloatingCartButton";
import dynamic from 'next/dynamic';

import { PerformanceProviders } from '@/providers/PerformanceProviders';
import { GoliasShield } from "@/lib/guardian/GoliasShield";
import { Golias } from "@/lib/guardian/Golias";

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "FITNESS77 | #1 Performance & Suplementy Mladá Boleslav",
    template: "%s | FITNESS77",
  },
  description: "Špičkové suplementy, vybavení a performance gym v Mladé Boleslavi. FITNESS77 – tvoje cesta k maximálním výsledkům bez kompromisů.",
  metadataBase: new URL("https://fitness77.cz"),
  alternates: { canonical: "/" },
  keywords: ["fitness77", "fitness 77", "suplementy", "Mladá Boleslav", "gym MB", "protein", "bazar fitness", "performance"],
  authors: [{ name: "Jan Lančarič" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-white-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-white-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/apple-touch-icon-white.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "FITNESS77 | Performance & Suplementy Mladá Boleslav",
    description: "Tvůj parťák pro top formu. Suplementy, vybavení a komunita v MB.",
    url: "https://fitness77.cz",
    siteName: "FITNESS77",
    locale: "cs_CZ",
    type: "website",
    images: [
      { 
        url: "/images/brand/og_image.png", 
        width: 1200, 
        height: 630, 
        alt: "FITNESS77 Mladá Boleslav - Premium Gym & Supplements" 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FITNESS77 | Suplementy & Gym Mladá Boleslav",
    description: "Špičkové suplementy, vybavení a performance gym v MB.",
    images: ["/images/brand/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Fitness 77 Mladá Boleslav",
  description: "Špičkové fitness centrum v Mladé Boleslavi s osobními trenéry, suplementy a vybavením.",
  url: "https://fitness77.cz",
  telephone: "+420777105548",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jiráskova 1320",
    addressLocality: "Mladá Boleslav",
    postalCode: "293 01",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.4122,
    longitude: 14.9049,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "06:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday","Sunday"], opens: "08:00", closes: "20:00" },
  ],
  sameAs: [
    "https://www.facebook.com/fitness1977",
    "https://www.instagram.com/fitness77mb",
  ],
  priceRange: "$$",
  image: "https://fitness77.cz/images/brand/og_image.png",
};

import { SecurityKernel } from '@/components/security/SecurityKernel';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${bebas.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SecurityKernel>
          <GoliasShield>
            <PerformanceProviders>
              <ScrollToTop />
              <Navbar />
              <CartSidebar />
              <FloatingCartButton />
              <main><GlobalPreloader>{children}</GlobalPreloader></main>
              <div id="main-global-footer">
                <Footer />
              </div>
            </PerformanceProviders>
          </GoliasShield>
        </SecurityKernel>
      </body>
    </html>
  );
}
// "Zameť stopy" - Architektura GUARDIAN je připravena k nasazení. smrk

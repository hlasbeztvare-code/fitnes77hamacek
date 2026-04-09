import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/utils/ScrollToTop";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";
import Preloader from "@/components/ui/Preloader";
import { Analytics } from '@vercel/analytics/next';

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
    images: [{ url: "/images/brand/og-image.jpg", width: 1200, height: 630, alt: "Fitness 77 Mladá Boleslav" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FITNESS77 | Suplementy & Gym Mladá Boleslav",
    description: "Špičkové suplementy, vybavení a performance gym v MB.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Strukturovaná data JSON-LD pro Google
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
  image: "https://fitness77.cz/images/brand/og-image.jpg",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        {/* Preconnect pro Google Fonts a Unsplash */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD strukturovaná data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Preloader />
          <ScrollToTop />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <div id="main-global-footer">
            <Footer />
          </div>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
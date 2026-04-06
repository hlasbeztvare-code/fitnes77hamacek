import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/utils/ScrollToTop";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import PageTransition from "@/components/layout/PageTransition";

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
  alternates: {
    canonical: "/",
  },
  keywords: ["fitness77", "fitness 77", "suplementy", "Mladá Boleslav", "gym MB", "protein", "bazar fitness", "performance"],
  authors: [{ name: "Jan Lančarič" }],
  icons: {
    icon: [
      { url: "/assets/favicon-white-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-white-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/assets/apple-touch-icon-white.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "FITNESS77 | Performance & Suplementy Mladá Boleslav",
    description: "Tvůj parťák pro top formu. Suplementy, vybavení a komunita v MB.",
    url: "https://fitness77.cz",
    siteName: "FITNESS77",
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className="antialiased">
        <SmoothScrollProvider>
          <ScrollToTop />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <div id="main-global-footer">
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
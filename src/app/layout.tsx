import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/utils/ScrollToTop";

export const viewport: Viewport = {
  themeColor: "#FF8C00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "FITNESS77 | #1 Performance & Suplementy Mladá Boleslav",
    template: "%s | FITNESS77",
  },
  description: "Špičkové suplementy, vybavení a performance gym v Mladé Boleslavi. FITNESS77 – tvoje cesta k maximálním výsledkům bez kompromisů.",
  metadataBase: new URL("https://fitness77.cz"), // Tady si jen pohlídej, jestli doména je fit77 nebo fitness77, ale v textu dáváme FITNESS77!
  alternates: {
    canonical: "/",
  },
  keywords: ["fitness77", "fitness 77", "suplementy", "Mladá Boleslav", "gym MB", "protein", "bazar fitness", "performance"],
  authors: [{ name: "Jan Lančarič" }],
  icons: {
    icon: "/favicon.ico",
  },
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
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        <div id="main-global-footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
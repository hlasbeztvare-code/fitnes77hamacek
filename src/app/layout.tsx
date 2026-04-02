import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/utils/ScrollToTop";

export const metadata: Metadata = {
  title: "Fitness 77",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <ScrollToTop />
        <Navbar />
        <main>{children}</main>
        {/* (smrk) Tady mu dáme ID, abysme ho v gymu mohli odstřelit */}
        <div id="main-global-footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
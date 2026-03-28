import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/providers/ThemeProvider";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fitness77 | Mobilní Master Class",
  description: "Prémiové doplňky stravy a vybavení pro šampiony.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased font-sans`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col pb-20 md:pb-0">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

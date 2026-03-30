import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness 77 | Profesionální vybavení a gym",
  description: "Nejlepší suplementy, vybavení a bazar strojů pro tvůj trénink.",
  icons: {
    icon: "/favicon.ico", // Tady musí být tvoje logo v rohu (smrk)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}

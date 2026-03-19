import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SEIUN | 星と命式が導く、自分軸の羅針盤",
    template: "%s | SEIUN",
  },
  description:
    "西洋占星術・四柱推命・数秘術・算命学。占術を自己理解のツールとして使い、自分の人生とキャリアを設計する。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${noto.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ReadingProgress />
        <Navigation />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

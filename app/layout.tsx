import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberFlow — The conversion machine behind your brand",
  description:
    "We build pages that rank, funnels that close, and systems that work while you sleep. 2 SaaS live · 14 pages shipped · 0 projects abandoned.",
  openGraph: {
    title: "CyberFlow — The conversion machine behind your brand",
    description:
      "We build pages that rank, funnels that close, and systems that work while you sleep.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberFlow — The conversion machine behind your brand",
    description:
      "Pages that rank, funnels that close, and systems that work while you sleep.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}

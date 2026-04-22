import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
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
  title: "CyberFlow — Digital Infrastructure That Converts",
  description: "CyberFlow builds the digital systems that turn visitors into paying customers — websites, funnels, AI chat, CRM integrations, and scalable infrastructure.",
  openGraph: {
    title: "CyberFlow — Digital Infrastructure That Converts",
    description: "Websites, funnels, AI chat, and scalable digital infrastructure for growing businesses.",
    type: "website",
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
        </LanguageProvider>
      </body>
    </html>
  );
}

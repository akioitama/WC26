import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WC26 — The Beautiful Game, Rendered",
  description:
    "An advanced, football-themed FIFA World Cup 26 simulator with team histories, iconic moments, scroll cinematics and a Berlin '06 tribute.",
  metadataBase: new URL("https://wc26.local"),
  icons: {
    icon: "/brand/wc26-logo.png",
    shortcut: "/brand/wc26-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="stadium"
      translate="no"
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} font-sans tracking-tight`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

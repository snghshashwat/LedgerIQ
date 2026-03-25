import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "LedgerIQ | Financial Intelligence Dashboard",
  description:
    "AI-powered financial insights dashboard with interactive visualizations, dark mode, and advanced filtering for real-time financial analysis.",
  keywords: [
    "financial dashboard",
    "analytics",
    "business intelligence",
    "financial reporting",
  ],
  authors: [{ name: "LedgerIQ Team" }],
  openGraph: {
    title: "LedgerIQ - Financial Intelligence Dashboard",
    description:
      "AI-powered financial insights with interactive charts and real-time analysis",
    url: "https://ledgeriq.com",
    siteName: "LedgerIQ",
    images: [
      {
        url: "https://ledgeriq.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LedgerIQ Financial Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LedgerIQ - Financial Intelligence",
    description: "AI-powered financial analytics dashboard",
    creator: "@ledgeriq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

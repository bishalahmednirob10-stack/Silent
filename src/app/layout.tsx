import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/cart-provider";
import { brand } from "@/lib/brand";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.displayName} | Custom Stickers & Phone Cases`,
    template: `%s | ${brand.displayName}`,
  },
  description:
    "Bangladesh-made custom stickers and phone cases for anime, gaming, football, F1 and creator artwork.",
  keywords: [
    "custom stickers Bangladesh",
    "phone cases Bangladesh",
    "anime stickers BD",
    "StickerFizz BD",
  ],
  openGraph: {
    title: `${brand.displayName} | Custom Stickers & Phone Cases`,
    description:
      "Premium waterproof stickers and custom phone cases with COD and SSLCommerz checkout.",
    type: "website",
    images: [brand.logo],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.displayName} | Custom Stickers & Phone Cases`,
    description:
      "Bangladesh-made custom prints for anime, gaming, football, F1 and creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fffaf6] text-[#161412]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

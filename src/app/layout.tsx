import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Archivo (OFL, see fonts/Archivo-OFL.txt) instanced to the range the design
// uses — wght 800–900, wdth 100–125 — and subset to Basic Latin plus a few
// symbols: 24 KB instead of the 90 KB Google build. Chinese text uses the
// system CJK stack (globals.css) to keep pages light.
const archivo = localFont({
  src: "./fonts/archivo-display.woff2",
  variable: "--font-archivo",
  weight: "800 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Agent Skills 中文目錄`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "zh_TW",
    url: "/",
    title: `${SITE_NAME} — Agent Skills 中文目錄`,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${archivo.variable} ${dmMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

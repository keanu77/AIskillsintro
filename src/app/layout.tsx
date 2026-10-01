import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./fonts/archivo-display.css";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// The display face (Archivo subset) is inlined in fonts/archivo-display.css
// so headings render in it on first paint; see scripts/build-font-css.mjs.
// Chinese text uses the system CJK stack (globals.css) to keep pages light.
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
        className={`${dmMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

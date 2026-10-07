import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://izi-riders.ru"),
  title: "IZI RIDERS MCC — Moscow Motorcycle Club",
  description: "Мотоциклы, дорога, друзья и собственный стиль. KEEP IT IZI.",
  openGraph: {
    title: "IZI RIDERS MCC — Moscow Motorcycle Club",
    description: "Мотоциклы, дорога, друзья и собственный стиль. KEEP IT IZI.",
    siteName: "IZI RIDERS MCC",
    type: "website",
    locale: "ru_RU",
    images: [{
      url: "/izi-share-logo-20261007.png",
      width: 1200,
      height: 630,
      type: "image/png",
      alt: "Логотип IZI RIDERS MCC",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IZI RIDERS MCC — Moscow Motorcycle Club",
    description: "Мотоциклы, дорога, друзья и собственный стиль. KEEP IT IZI.",
    images: ["/izi-share-logo-20261007.png"],
  },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { title: "IZI RIDERS" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}

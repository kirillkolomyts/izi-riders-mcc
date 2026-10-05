import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IZI RIDERS MCC — Moscow Motorcycle Club",
  description: "Мотоциклы, дорога, друзья и собственный стиль. KEEP IT IZI.",
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

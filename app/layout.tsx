import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IZI RIDERS MCC — Moscow Motorcycle Club",
  description: "Мотоциклы, дорога, друзья и собственный стиль. KEEP IT IZI.",
  icons: { icon: "/izi-logo.svg", shortcut: "/izi-logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}

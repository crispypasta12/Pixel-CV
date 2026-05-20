import { Silkscreen } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raqueed's Engineering Lab",
  description:
    "A comfy pixel game portfolio prototype for Syed Raqueed Bin Alvee, embedded firmware engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={silkscreen.variable}>
      <body>{children}</body>
    </html>
  );
}

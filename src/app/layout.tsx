import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

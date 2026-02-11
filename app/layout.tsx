import type { Metadata } from "next";
import { Inter, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["Monaco", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "SonarQube Cloud",
  description: "Code Review Platform",
  icons: {
    icon: [
      { url: '/favico.png' },
      { url: '/favico.png', sizes: '32x32', type: 'image/png' },
      { url: '/favico.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favico.png',
    apple: '/favico.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ubuntuMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

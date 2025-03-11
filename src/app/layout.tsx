import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iqbal Roudatul Irfan | Portfolio",
  description: "Fullstack Developer Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Providers>
          <Navbar />
          <main className="relative z-1 min-h-screen w-full overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

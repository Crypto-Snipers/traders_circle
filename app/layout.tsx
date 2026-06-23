import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingSocials from "./components/FloatingSocials";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traders' Circle",
  description: "India's Largest Crypto Trading Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <FloatingSocials />
        <a
          href="https://forms.gle/fr12ZrgohwAXLDz39"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-4 md:right-6 z-50 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-5 py-3 rounded-full shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap"
        >
          Register Now
        </a>
      </body>
    </html>
  );
}

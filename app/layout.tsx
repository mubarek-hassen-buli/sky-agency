import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SKY Foreign Employment Agency | Trusted Global Recruitment Partner",
  description: "SKY Foreign Employment Agency connects skilled candidates with top employers worldwide. Explore placement opportunities in Europe, Middle East, Japan, and Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f3f8fc] text-[#1e2e3d]">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomHeader from "@/components/layout/Header";
import CustomFooter from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Tailor - Your Personalized Job Search Platform",
  description: "Find the perfect career opportunity with Job Tailor's personalized job search platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col mr-20 ml-20 `}
      >
        <CustomHeader />
        <main className="flex-1 flex bg-white overflow-hidden justify-center">
          {children}
        </main>
        <CustomFooter />
      </body>
    </html>
  );
}

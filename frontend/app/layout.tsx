import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeScript } from "./components/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodePlatform - Modern Learning & Development Platform",
  description: "A cutting-edge platform for students and lecturers to collaborate, learn, and grow together in the digital age.",
  keywords: ["education", "learning", "platform", "students", "lecturers", "collaboration"],
  authors: [{ name: "CodePlatform Team" }],
  openGraph: {
    title: "CodePlatform - Modern Learning & Development Platform",
    description: "A cutting-edge platform for students and lecturers to collaborate, learn, and grow together in the digital age.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePlatform - Modern Learning & Development Platform",
    description: "A cutting-edge platform for students and lecturers to collaborate, learn, and grow together in the digital age.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <ThemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

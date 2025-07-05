import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image';


/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
*/
/*const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/



export const metadata: Metadata = {
  title: "Code-SL",
  description: "Code website",
  icons: "code.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body suppressHydrationWarning={true}>
  {children}
</body>

    </html>
  );
}

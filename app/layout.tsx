import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-Inter'});
const inbmplexSerif=IBM_Plex_Serif({
  subsets:['latin'],
  weight:['400','700'],
  variable:'--font-ibm-plex-serif'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Horizon",
  description: "Horizon is a modern banking platform for",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${inter.variable} ${inbmplexSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

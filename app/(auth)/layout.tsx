import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,IBM_Plex_Serif } from "next/font/google";

import { cn } from "@/lib/utils";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main>
   
    {children}
   </main>
  );
}
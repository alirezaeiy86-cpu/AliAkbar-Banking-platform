import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,IBM_Plex_Serif } from "next/font/google";

import { cn } from "@/lib/utils";

import { toast } from "sonner"
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="flex min-h-screen w-full justify-between font-inter">
   
    {children}
    <div className="auth-asset">
        <div>
            <Image
            src="/icons/auth-image.svg"
            alt="auth imag"
            width={500}
            height={500}/>
        </div>
    </div>
    
   </main>
  );
}
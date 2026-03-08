import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter,IBM_Plex_Serif } from "next/font/google";

import { cn } from "@/lib/utils";
import  Sidebar  from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const loggedIn={firstName:'Ali Akbar',lastName:'AKS'};
  return (
   <main className="flex h-screen w-full font-inter">
    <Sidebar user={loggedIn}/>
    <div className="flex size-full flex-col ">
        <div className="root-layout">
            <Image
            src="/icons/logo.svg" width={30}
            height={30}
            alt="logo"/>
            <div>
                <MobileNav user={loggedIn} />

            </div>

        </div>
        {children}

    </div>
    
   </main>
  );
}

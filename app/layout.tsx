import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Toaster} from "react-hot-toast";
import {TooltipProvider} from "@/components/ui/tooltip"

export const metadata: Metadata = {
    title: "宠物领养管理系统 by Jazee",
    description: "宠物领养管理系统 by Jazee",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh">
        <body>
        
        <Toaster/>
        <TooltipProvider>
            {children}
        </TooltipProvider>

        </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientToaster } from "@/components/ui/client-toaster";
import { GlobalScripts } from "@/components/scripts/GlobalScripts";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "WordPress Headless CMS",
  description: "A modern headless WordPress implementation with Next.js and PostgreSQL caching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <GlobalScripts />
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}

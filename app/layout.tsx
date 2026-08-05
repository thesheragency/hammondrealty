import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClientToaster } from "@/components/ui/client-toaster";
import { GlobalHeadScripts, GlobalBodyScripts } from "@/components/scripts/GlobalScripts";
import { SiteMenusProvider } from "@/components/site/SiteMenusProvider";
import { fetchSiteMenus } from "@/lib/wp-menus";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  ...(process.env.FRONTEND_URL
    ? { metadataBase: new URL(process.env.FRONTEND_URL.replace(/^(https?:\/\/)www\./, '$1').replace(/\/$/, '')) }
    : {}),
  icons: { icon: "/favicon.png" },
  title: "Blake Hammond Real Estate",
  description:
    "Blake Hammond Real Estate — modern, high-touch service for buyers, sellers, and homeowners in the greater Sacramento region.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menus = await fetchSiteMenus();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}>
        <Suspense fallback={null}>
          <GlobalHeadScripts />
        </Suspense>
        <SiteMenusProvider menus={menus}>{children}</SiteMenusProvider>
        <Suspense fallback={null}>
          <GlobalBodyScripts />
        </Suspense>
        <ClientToaster />
      </body>
    </html>
  );
}

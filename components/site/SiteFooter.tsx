"use client";

import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import Link from "next/link";
import { useSiteMenus } from "@/components/site/SiteMenusProvider";

const logoUrl = "/images/logo_1779376344245.png";
const mastersClubUrl = "/images/Mask_group_1780678370076.png";
const buyingHouseUrl = "/images/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
const sellingHouseUrl = "/images/fancy_home_1782404943463.jpg";
const prepLivingroomUrl = "/images/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";

const fallbackQuickLinks = [
  { label: "Home", href: "/" },
  { label: "Buying", href: "/buyer" },
  { label: "Selling", href: "/seller" },
  { label: "About", href: "/about" },
];

const fallbackServices = [
  { label: "Home Prep Program", href: "/home-prep-program" },
  { label: "Home Value Analysis", href: "/home-value-analysis" },
  { label: "Book A Consultation", href: "/book-consultation" },
  { label: "Contact Blake", href: "/connect" },
];

export default function SiteFooter() {
  const menus = useSiteMenus();
  const quickLinks = menus.footerNav ?? fallbackQuickLinks;
  const services = menus.footerServices ?? fallbackServices;
  return (
    <footer className="relative overflow-hidden bg-muted text-foreground">
      <div className="grid grid-cols-3 h-32 md:h-40">
        {[buyingHouseUrl, sellingHouseUrl, prepLivingroomUrl].map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={src}
              alt=""
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 md:px-8 pt-20 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <Link href="/" className="mb-6">
              <Image
                src={logoUrl}
                alt="Blake Hammond Real Estate"
                width={160}
                height={24}
                className="h-8 md:h-6 w-auto"
              />
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed max-w-sm text-center md:text-left">
              A trusted real estate partner delivering modern, high-touch service for
              buyers, sellers, and homeowners preparing for their next move.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Quick Links</p>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Services</p>
            <ul className="space-y-3 text-sm">
              {services.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Contact</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <a href="tel:9166256118" className="hover:text-primary transition-colors">
                  (916) 625-6118
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <a href="mailto:blakehammondre@gmail.com" className="hover:text-primary transition-colors">
                  blakehammondre@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                  <MapPin className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=925+Highland+Pointe+Dr+Suite+%23140%2C+Roseville%2C+CA+95678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  925 Highland Pointe Dr Suite #140, Roseville, CA 95678
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex lg:justify-end">
            <Image
              src={mastersClubUrl}
              alt="Masters Club — Placer County Association of Realtors"
              width={96}
              height={96}
              className="h-24 w-24"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Blake Hammond Real Estate. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-foreground/50 hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

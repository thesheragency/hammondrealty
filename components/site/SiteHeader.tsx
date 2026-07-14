"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
const logoUrl = "/images/logo_1779376344245.png";

const navLinks = [
  { label: "Buying", href: "/buyer" },
  { label: "Selling", href: "/seller" },
  { label: "Home Prep Program", href: "/home-prep-program" },
  { label: "About", href: "/about" },
  { label: "Home Value Analysis", href: "/home-value-analysis" },
];

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

export default function SiteHeader({ variant = "transparent" }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = usePathname();

  const isActive = (href: string) => location === href;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = variant === "solid" || isScrolled;

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid ? "bg-muted/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link href="/" className="justify-self-start">
            <img src={logoUrl} alt="Blake Hammond Real Estate" className="h-4 md:h-5 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-5 justify-self-end">
            <a
              href="tel:916-625-6118"
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              916-625-6118
            </a>
            <Link
              href="/connect"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-[129px] h-[45px]"
            >
              Contact Blake
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2 justify-self-end">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all px-4 h-[38px]"
            >
              Contact Blake
            </Link>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 border-t border-border flex flex-col px-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-base font-medium py-2 border-b border-border/50 ${
                  isActive(link.href) ? "text-primary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/connect"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 mt-4 w-full h-[45px] rounded-none font-medium text-sm"
            >
              Contact Blake
            </Link>
          </div>
        )}
      </header>

      {/* Sticky mobile call bar */}
      <a
        href="tel:916-625-6118"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-14 font-medium text-base shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
      >
        <Phone className="w-5 h-5" strokeWidth={2} />
        Call 916-625-6118
      </a>
    </>
  );
}

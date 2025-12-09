'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, RefreshCw } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSync = async () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/wordpress/sync', { method: 'POST' });
        const data = await response.json();
        
        if (response.ok) {
          toast({
            title: 'Sync Complete',
            description: `Synced ${data.results?.posts?.count || 0} posts, ${data.results?.pages?.count || 0} pages, ${data.results?.redirects?.count || 0} redirects`,
          });
        } else {
          toast({
            title: 'Sync Failed',
            description: data.error || 'An error occurred during sync',
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Sync Failed',
          description: error instanceof Error ? error.message : 'An error occurred during sync',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-testid="header"
    >
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2" data-testid="link-home">
          <span className="font-semibold text-lg tracking-tight">WP Headless</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover-elevate px-2 py-1 rounded-md ${
                pathname === link.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={isPending}
            data-testid="button-sync"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
            {isPending ? 'Syncing...' : 'Sync'}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background" data-testid="nav-mobile">
          <nav className="container max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-2 px-3 rounded-md hover-elevate ${
                  pathname === link.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

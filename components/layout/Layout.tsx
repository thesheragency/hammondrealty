import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PreviewBanner } from '@/components/preview/PreviewBanner';

interface LayoutProps {
  children: React.ReactNode;
  isPreview?: boolean;
}

export function Layout({ children, isPreview = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isPreview && <PreviewBanner />}
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

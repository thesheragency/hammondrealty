import { Header } from './Header';
import { Footer } from './Footer';
import { PreviewBanner } from '@/components/preview/PreviewBanner';

interface LayoutProps {
  children: React.ReactNode;
  isPreview?: boolean;
}

export function Layout({ children, isPreview = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {isPreview && <PreviewBanner />}
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

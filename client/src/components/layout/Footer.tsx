import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="border-t bg-card" data-testid="footer">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Powered by WordPress + React
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-home"
            >
              Home
            </Link>
            <Link 
              href="/projects" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-projects"
            >
              Projects
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

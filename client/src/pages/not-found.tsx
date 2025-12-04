import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <Helmet>
        <title>404 - Page Not Found | WordPress Headless CMS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div 
        className="min-h-[70vh] flex items-center justify-center"
        data-testid="page-404"
      >
        <div className="container max-w-lg mx-auto px-4 text-center">
          <div 
            className="text-[150px] md:text-[200px] font-bold leading-none text-muted-foreground/20 select-none"
            data-testid="text-404"
          >
            404
          </div>
          
          <h1 
            className="text-3xl md:text-4xl font-bold -mt-8 mb-4"
            data-testid="text-404-title"
          >
            Page Not Found
          </h1>
          
          <p 
            className="text-muted-foreground mb-8 max-w-md mx-auto"
            data-testid="text-404-description"
          >
            The page you're looking for doesn't exist or has been moved. 
            Check the URL or navigate back to the homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="gap-2" data-testid="button-go-home">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-2"
              onClick={() => window.history.back()}
              data-testid="button-go-back"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

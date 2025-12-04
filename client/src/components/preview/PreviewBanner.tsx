import { Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export function PreviewBanner() {
  const [, setLocation] = useLocation();

  const handleExit = () => {
    // Remove preview params and redirect to regular content
    const url = new URL(window.location.href);
    url.searchParams.delete('preview');
    url.searchParams.delete('token');
    setLocation(url.pathname);
    window.location.reload();
  };

  return (
    <div 
      className="bg-amber-500 text-amber-950 py-2 px-4"
      data-testid="preview-banner"
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Eye className="h-4 w-4" />
          <span>Preview Mode - You are viewing unpublished content</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-950 hover:bg-amber-600 hover:text-amber-950"
          onClick={handleExit}
          data-testid="button-exit-preview"
        >
          <X className="h-4 w-4 mr-1" />
          Exit Preview
        </Button>
      </div>
    </div>
  );
}

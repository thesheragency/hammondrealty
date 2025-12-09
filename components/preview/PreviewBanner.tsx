'use client';

import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function PreviewBanner() {
  const router = useRouter();

  const exitPreview = () => {
    router.push('/api/exit-preview');
  };

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2"
      data-testid="preview-banner"
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">Preview Mode</span>
          <span className="text-sm opacity-80">You are viewing unpublished content</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={exitPreview}
          className="text-amber-950 hover:bg-amber-400"
          data-testid="button-exit-preview"
        >
          <XCircle className="h-4 w-4 mr-1" />
          Exit
        </Button>
      </div>
    </div>
  );
}

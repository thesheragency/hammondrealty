'use client';

import { useState, useEffect } from 'react';
import { Toaster } from './toaster';

export function ClientToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Toaster />;
}

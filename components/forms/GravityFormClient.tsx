'use client';

import { useState, useEffect, Suspense, lazy } from 'react';

const GravityFormLazy = lazy(
  () => import('@/components/forms/GravityForm').then(mod => ({ default: mod.GravityForm }))
);

interface GravityFormClientProps {
  formId: number;
  className?: string;
  onSuccess?: (confirmation: { message?: string; url?: string }) => void;
  onError?: (errors: Array<{ id: string; message: string }>) => void;
}

export function GravityFormClient(props: GravityFormClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <GravityFormLazy {...props} />
    </Suspense>
  );
}

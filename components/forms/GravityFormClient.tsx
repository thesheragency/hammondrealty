'use client';

import dynamic from 'next/dynamic';

const GravityFormLazy = dynamic(
  () => import('@/components/forms/GravityForm').then(mod => mod.GravityForm),
  { ssr: false }
);

interface GravityFormClientProps {
  formId: number;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function GravityFormClient(props: GravityFormClientProps) {
  return <GravityFormLazy {...props} />;
}

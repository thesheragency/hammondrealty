import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchHomeAcf } from '@/lib/wp-acf';
import HomePage from '@/components/pages/HomePage';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessJsonLd } from '@/lib/structured-data';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Blake Hammond Real Estate | Greater Sacramento Homes',
    description:
      'Buy or sell with confidence. Blake Hammond delivers modern marketing, sharp negotiation, and a full-service Home Prep Program across the greater Sacramento region.',
    canonicalPath: '/',
  });
}

export default async function Page() {
  const acf = await fetchHomeAcf();
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <HomePage acf={acf} />
    </>
  );
}

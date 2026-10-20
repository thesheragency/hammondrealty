import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import BookConsultationPage from '@/components/pages/BookConsultationPage';
import { fetchBookConsultationAcf } from '@/lib/wp-acf';
import { gravityFormId } from '@/lib/gf/embed';
import { getNativeGravityForm, bookingFormDefinition } from '@/lib/gf/server-form';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Book a Consultation | Blake Hammond Real Estate',
    description: "Schedule a free, no-pressure consultation with Blake Hammond to talk through your real estate goals.",
    canonicalPath: '/book-consultation',
  });
}

export default async function Page() {
  const acf = await fetchBookConsultationAcf();
  const gravityForm = bookingFormDefinition(await getNativeGravityForm(gravityFormId(acf?.gformEmbed, 9)));
  return <BookConsultationPage acf={acf} gravityForm={gravityForm} />;
}

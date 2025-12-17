import { Layout } from '@/components/layout/Layout';
import { LandingPageRenderer } from '@/modules/landing-builder';
import type { LandingPageData } from '@/modules/landing-builder/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing Page Builder Demo',
  description: 'Preview of all available landing page blocks',
};

const demoData: LandingPageData = {
  title: 'Landing Page Builder Demo',
  slug: 'landing-demo',
  sections: [
    {
      fieldGroupName: 'LandingSectionsHeroSection',
      headline: 'Build Beautiful Landing Pages',
      subheadline: 'Create high-converting landing pages using modular blocks that sync from WordPress. No coding required.',
      ctaText: 'Get Started',
      ctaUrl: '#features',
      backgroundColor: 'brand',
      textAlign: 'center',
    },
    {
      fieldGroupName: 'LandingSectionsFeatureGrid',
      sectionTitle: 'Powerful Features',
      sectionDescription: 'Everything you need to create stunning landing pages that convert visitors into customers.',
      columns: '3',
      backgroundColor: 'default',
      features: [
        {
          icon: 'zap',
          title: 'Lightning Fast',
          description: 'Built on Next.js with server-side rendering for optimal performance and SEO.',
        },
        {
          icon: 'shield',
          title: 'Secure by Default',
          description: 'Iframe sandboxing, domain allowlists, and built-in protection against common vulnerabilities.',
        },
        {
          icon: 'palette',
          title: 'Fully Customizable',
          description: 'Uses your design system variables for consistent branding across all blocks.',
        },
        {
          icon: 'code',
          title: 'Developer Friendly',
          description: 'Clean TypeScript codebase with modular architecture for easy extension.',
        },
        {
          icon: 'globe',
          title: 'SEO Optimized',
          description: 'Full Yoast SEO integration with Open Graph and Twitter Card support.',
        },
        {
          icon: 'toggle-right',
          title: 'Feature Flagged',
          description: 'Enable or disable the entire landing builder with a single environment variable.',
        },
      ],
    },
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Ready to Transform Your Marketing?',
      description: 'Start building landing pages that actually convert. Join thousands of marketers who trust our platform.',
      primaryCtaText: 'Start Free Trial',
      primaryCtaUrl: '#signup',
      secondaryCtaText: 'View Documentation',
      secondaryCtaUrl: '#docs',
      backgroundColor: 'accent',
    },
    {
      fieldGroupName: 'LandingSectionsRichText',
      content: `
        <h2>How It Works</h2>
        <p>The landing page builder integrates seamlessly with WordPress and ACF (Advanced Custom Fields) to give your marketing team complete control over landing page content.</p>
        <ol>
          <li><strong>Create a Page</strong> - In WordPress, create a new page and select the "Landing Page" template.</li>
          <li><strong>Add Sections</strong> - Use the ACF Flexible Content field to add Hero, Feature Grid, CTA, and other blocks.</li>
          <li><strong>Publish</strong> - When you publish, the Next.js frontend automatically renders your landing page with all sections.</li>
        </ol>
        <p>Each block type is fully styled using your design system, ensuring brand consistency across all landing pages.</p>
      `,
      maxWidth: 'medium',
      backgroundColor: 'muted',
    },
    {
      fieldGroupName: 'LandingSectionsTestimonials',
      sectionTitle: 'What Our Customers Say',
      layout: 'grid',
      backgroundColor: 'default',
      testimonials: [
        {
          quote: 'This landing page builder has transformed how we create marketing campaigns. We can now launch new pages in hours instead of weeks.',
          authorName: 'Sarah Chen',
          authorTitle: 'Marketing Director, TechCorp',
        },
        {
          quote: 'The integration with WordPress makes it easy for our content team to manage everything without developer involvement.',
          authorName: 'Michael Torres',
          authorTitle: 'Head of Growth, StartupXYZ',
        },
        {
          quote: 'Finally, a headless solution that actually works. The performance improvements alone were worth the switch.',
          authorName: 'Emily Watson',
          authorTitle: 'CTO, Digital Agency',
        },
      ],
    },
    {
      fieldGroupName: 'LandingSectionsFormSection',
      sectionTitle: 'Get in Touch',
      sectionDescription: 'Have questions? Fill out the form below and our team will get back to you within 24 hours.',
      formMode: 'gravity',
      gravityFormId: 1,
      backgroundColor: 'card',
    },
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Start Building Today',
      description: 'Create your first landing page in minutes with our intuitive block-based builder.',
      primaryCtaText: 'Get Started Free',
      primaryCtaUrl: '#',
      backgroundColor: 'brand',
    },
  ],
};

export default function LandingDemoPage() {
  return (
    <Layout>
      <div className="bg-yellow-100 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2 text-center text-sm">
        <span className="font-medium">Demo Mode:</span> This page shows sample content. Connect WordPress to use real data.
      </div>
      <LandingPageRenderer data={demoData} isPreview={false} />
    </Layout>
  );
}

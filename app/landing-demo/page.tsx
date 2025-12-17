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
      headline: 'Transform Your Ideas Into Reality',
      subheadline: 'Build stunning, high-converting landing pages in minutes. No code required. Just pure creative freedom powered by WordPress.',
      ctaText: 'Start Building Free',
      ctaUrl: '#features',
      backgroundColor: 'brand',
      textAlign: 'center',
    },
    {
      fieldGroupName: 'LandingSectionsFeatureGrid',
      sectionTitle: 'Everything You Need to Succeed',
      sectionDescription: 'Our platform gives you the tools to create beautiful landing pages that actually convert visitors into customers.',
      columns: '3',
      backgroundColor: 'default',
      features: [
        {
          icon: 'zap',
          title: 'Blazing Fast Performance',
          description: 'Built on Next.js with server-side rendering. Your pages load instantly, keeping visitors engaged.',
        },
        {
          icon: 'shield-check',
          title: 'Enterprise Security',
          description: 'Bank-grade encryption, iframe sandboxing, and domain allowlists protect your data and users.',
        },
        {
          icon: 'palette',
          title: 'Fully Customizable',
          description: 'Every element adapts to your brand. Colors, fonts, and spacing all sync from your design system.',
        },
        {
          icon: 'code-2',
          title: 'Developer Friendly',
          description: 'Clean TypeScript codebase with modular architecture. Extend blocks or create your own.',
        },
        {
          icon: 'search',
          title: 'SEO Optimized',
          description: 'Full Yoast integration with Open Graph, Twitter Cards, and structured data out of the box.',
        },
        {
          icon: 'toggle-right',
          title: 'Feature Flagged',
          description: 'Enable or disable the entire builder with one environment variable. Zero risk rollouts.',
        },
      ],
    },
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Ready to 10x Your Conversion Rate?',
      description: 'Join over 10,000 marketers who trust our platform to create landing pages that actually work.',
      primaryCtaText: 'Start Your Free Trial',
      primaryCtaUrl: '#signup',
      secondaryCtaText: 'See Documentation',
      secondaryCtaUrl: '#docs',
      backgroundColor: 'accent',
    },
    {
      fieldGroupName: 'LandingSectionsRichText',
      content: `
        <h2>The Modern Way to Build Landing Pages</h2>
        <p>Traditional landing page builders are slow, bloated, and lock you into their ecosystem. We took a different approach.</p>
        <p>By combining the power of WordPress as a headless CMS with Next.js on the frontend, you get the best of both worlds: <strong>familiar content editing</strong> for your marketing team and <strong>blazing fast performance</strong> for your visitors.</p>
        <h3>How It Works</h3>
        <ol>
          <li><strong>Create a page in WordPress</strong> — Select the Landing Page template and start adding sections.</li>
          <li><strong>Add your content</strong> — Use the flexible content blocks to build your perfect page layout.</li>
          <li><strong>Publish instantly</strong> — Changes go live immediately with zero downtime.</li>
        </ol>
        <blockquote>
          "This is exactly what we needed. Our marketing team can now launch campaigns without waiting on developers. It's been a game-changer."
        </blockquote>
      `,
      maxWidth: 'medium',
      backgroundColor: 'muted',
    },
    {
      fieldGroupName: 'LandingSectionsTestimonials',
      sectionTitle: 'Loved by Teams Everywhere',
      layout: 'grid',
      backgroundColor: 'default',
      testimonials: [
        {
          quote: 'We went from taking 2 weeks to launch a campaign to just 2 hours. The ROI has been incredible.',
          authorName: 'Sarah Chen',
          authorTitle: 'VP of Marketing, TechCorp',
        },
        {
          quote: 'Finally, a headless solution that our content team actually enjoys using. The WordPress integration is seamless.',
          authorName: 'Michael Torres',
          authorTitle: 'Head of Growth, StartupXYZ',
        },
        {
          quote: 'Page load times dropped by 80%. Our conversion rate went up 3x within the first month.',
          authorName: 'Emily Watson',
          authorTitle: 'CTO, Digital Agency Co',
        },
      ],
    },
    {
      fieldGroupName: 'LandingSectionsFormSection',
      sectionTitle: 'Get Started Today',
      sectionDescription: 'Enter your email to receive access to our platform and start building beautiful landing pages.',
      formMode: 'gravity',
      gravityFormId: 1,
      backgroundColor: 'card',
    },
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Your Next Landing Page Is Waiting',
      description: 'Stop wasting time with slow, outdated tools. Build something beautiful today.',
      primaryCtaText: 'Get Started Free',
      primaryCtaUrl: '#',
      backgroundColor: 'brand',
    },
  ],
};

export default function LandingDemoPage() {
  return (
    <Layout>
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3 text-center text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="font-medium text-amber-800 dark:text-amber-200">Demo Mode</span>
          <span className="text-amber-700 dark:text-amber-300">— This page shows sample content. Connect WordPress to use real data.</span>
        </span>
      </div>
      <LandingPageRenderer data={demoData} isPreview={false} />
    </Layout>
  );
}

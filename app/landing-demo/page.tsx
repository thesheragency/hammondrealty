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
    // Hero Block
    {
      fieldGroupName: 'LandingSectionsHeroSection',
      headline: 'Build Beautiful Landing Pages With Ease',
      subheadline: 'A flexible, modular system for creating high-converting landing pages without writing code.',
      showRating: true,
      ratingText: 'Trusted by teams worldwide',
      bulletPoints: [
        'Modular block-based design',
        'Fully responsive layouts',
        'Easy content management',
      ],
      ctaText: 'Get Started',
      ctaUrl: '#contact',
      secondaryCtaText: 'Learn More',
      secondaryCtaUrl: '#features',
      heroImage: {
        sourceUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=800&fit=crop',
        altText: 'Team working on laptops',
      },
    },

    // Logo Reel Block
    {
      fieldGroupName: 'LandingSectionsLogoReel',
      logos: [],
    },

    // Accordion Block (Split Layout)
    {
      fieldGroupName: 'LandingSectionsAccordion',
      sectionTitle: 'Everything You Need to Know',
      sectionDescription: 'Common questions answered clearly and concisely.',
      ctaText: 'Contact Us',
      ctaUrl: '#contact',
      layout: 'split',
      items: [
        {
          question: 'How does the block system work?',
          answer: 'Each section is a self-contained block that can be arranged in any order. Simply choose the blocks you need and populate them with your content.',
        },
        {
          question: 'Can I customize the design?',
          answer: 'Yes, all blocks follow a consistent design system with customizable colors, typography, and spacing through CSS variables.',
        },
        {
          question: 'Is it mobile-friendly?',
          answer: 'Absolutely. Every block is built with responsive design principles, ensuring your landing page looks great on all devices.',
        },
        {
          question: 'How do I add new blocks?',
          answer: 'New blocks can be added through the WordPress admin interface using ACF Flexible Content fields. No coding required.',
        },
      ],
    },

    // Services Grid Block
    {
      fieldGroupName: 'LandingSectionsServicesGrid',
      sectionTitle: 'Explore Our Features',
      sectionDescription: 'Discover what makes our landing page builder unique and powerful.',
      showCustomQuote: true,
      customQuoteText: 'Need Something Custom?',
      customQuoteUrl: '#contact',
      services: [
        { title: 'Hero Sections', linkUrl: '#', image: { sourceUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop', altText: 'Hero sections' } },
        { title: 'Feature Grids', linkUrl: '#', image: { sourceUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop', altText: 'Feature grids' } },
        { title: 'Testimonials', linkUrl: '#', image: { sourceUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=800&fit=crop', altText: 'Testimonials' } },
        { title: 'Contact Forms', linkUrl: '#', image: { sourceUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop', altText: 'Contact forms' } },
        { title: 'Photo Galleries', linkUrl: '#', image: { sourceUrl: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=600&h=800&fit=crop', altText: 'Photo galleries' } },
      ],
    },

    // Video Section Block
    {
      fieldGroupName: 'LandingSectionsVideoSection',
      headline: 'See It In Action',
      bulletPoints: [
        'Watch a quick overview of all available blocks',
        'Learn how content flows from WordPress to the frontend',
        'See responsive design across different screen sizes',
        'Discover customization options',
      ],
      ctaText: 'Start Building',
      ctaUrl: '#contact',
      secondaryCtaText: 'View Documentation',
      secondaryCtaUrl: '#docs',
      videoThumbnail: {
        sourceUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
        altText: 'Video overview',
      },
    },

    // Values Block (3 Column)
    {
      fieldGroupName: 'LandingSectionsValues',
      sectionTitle: 'Built With Purpose',
      sectionDescription: 'Core principles that guide every aspect of our landing page builder.',
      values: [
        {
          icon: 'zap',
          title: 'Performance First',
          description: 'Optimized for speed with minimal JavaScript and efficient rendering.',
        },
        {
          icon: 'shield',
          title: 'Secure by Default',
          description: 'Built with security best practices and regular updates.',
        },
        {
          icon: 'heart',
          title: 'User Friendly',
          description: 'Intuitive interfaces for both developers and content editors.',
        },
      ],
    },

    // Content Split Block
    {
      fieldGroupName: 'LandingSectionsContentSplit',
      headline: 'Designed for Modern Teams',
      description: 'Our landing page builder bridges the gap between design and development. Marketing teams can update content independently while developers maintain control over the codebase. The result is faster iteration cycles and better collaboration.',
      ctaText: 'Learn More',
      ctaUrl: '#about',
      imagePosition: 'left',
      image: {
        sourceUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
        altText: 'Team collaboration',
      },
    },

    // Testimonials Block
    {
      fieldGroupName: 'LandingSectionsTestimonials',
      sectionTitle: 'What People Are Saying',
      sectionDescription: 'Feedback from teams using our landing page builder.',
      testimonials: [
        {
          quote: 'The modular approach makes it so easy to experiment with different layouts. We can test new ideas in minutes instead of days.',
          authorName: 'Alex Morgan',
        },
        {
          quote: 'Finally, a system that gives our marketing team independence without sacrificing code quality.',
          authorName: 'Jordan Lee',
        },
        {
          quote: 'The design consistency across all blocks is impressive. Everything just works together seamlessly.',
          authorName: 'Sam Rivera',
        },
      ],
    },

    // Photo Gallery Block
    {
      fieldGroupName: 'LandingSectionsPhotoGallery',
      sectionTitle: 'Featured Work',
      sectionDescription: 'Examples of landing pages built with our system.',
      ctaText: 'View All',
      ctaUrl: '#gallery',
      photos: [
        { sourceUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', altText: 'Dashboard design' },
        { sourceUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', altText: 'Analytics interface' },
        { sourceUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', altText: 'Code editor' },
        { sourceUrl: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400', altText: 'Design mockup' },
        { sourceUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', altText: 'Mobile app' },
      ],
    },

    // FAQ Accordion Block (Centered)
    {
      fieldGroupName: 'LandingSectionsAccordion',
      sectionTitle: 'Frequently Asked Questions',
      layout: 'centered',
      ctaText: 'Still Have Questions?',
      ctaUrl: '#contact',
      items: [
        {
          question: 'What technologies does this use?',
          answer: 'Built with Next.js, React, Tailwind CSS, and WordPress with ACF for content management.',
        },
        {
          question: 'Can I use my own design system?',
          answer: 'Yes, the CSS is built with custom properties making it easy to adapt to your brand guidelines.',
        },
        {
          question: 'Is there a learning curve?',
          answer: 'The block system is intuitive for anyone familiar with WordPress. Most teams are productive within a few hours.',
        },
        {
          question: 'How do updates work?',
          answer: 'Core blocks can be updated independently of your content, ensuring you always have the latest features.',
        },
      ],
    },

    // Contact Form Block
    {
      fieldGroupName: 'LandingSectionsContactForm',
      headline: 'Get In Touch',
      bulletPoints: [
        'Quick response time',
        'No commitment required',
        'Personalized guidance',
        'Technical support included',
      ],
      description: 'Fill out the form and we will get back to you within 24 hours.',
      formMode: 'gravity',
      gravityFormId: 1,
    },

    // CTA Banner Block
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Ready to Get Started?',
      description: 'Join teams who are building better landing pages with our modular system.',
      primaryCtaText: 'Start Building',
      primaryCtaUrl: '#contact',
      secondaryCtaText: 'View Documentation',
      secondaryCtaUrl: '#docs',
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

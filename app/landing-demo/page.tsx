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
      headline: 'Professional Painting Services For Your Home',
      subheadline: 'Transform your space with our expert painters. Quality work, guaranteed satisfaction.',
      showRating: true,
      ratingText: 'Based on 300+ Reviews on',
      bulletPoints: [
        '15+ Years of Experience',
        'Licensed & Insured Professionals',
        'Free Estimates Within 24 Hours',
      ],
      ctaText: 'Get Your Free Estimate',
      ctaUrl: '#contact',
      secondaryCtaText: '(123) 456-7890',
      secondaryCtaUrl: 'tel:+1234567890',
    },

    // Logo Reel Block
    {
      fieldGroupName: 'LandingSectionsLogoReel',
      logos: [],
    },

    // Accordion Block (Split Layout)
    {
      fieldGroupName: 'LandingSectionsAccordion',
      sectionTitle: 'Common Questions About Our Services',
      sectionDescription: 'We know you have questions. Here are answers to the most common ones.',
      ctaText: 'Get Started Today',
      ctaUrl: '#contact',
      layout: 'split',
      items: [
        {
          question: 'How long does a typical project take?',
          answer: 'Most residential projects are completed within 2-5 days depending on the size and scope. We provide a detailed timeline during your free estimate.',
        },
        {
          question: 'Do you provide free estimates?',
          answer: 'Yes! We offer completely free, no-obligation estimates. One of our experts will visit your property and provide a detailed quote within 24 hours.',
        },
        {
          question: 'What paint brands do you use?',
          answer: 'We use premium paints from Sherwin-Williams and Benjamin Moore. These provide superior coverage, durability, and color retention.',
        },
        {
          question: 'Are you licensed and insured?',
          answer: 'Absolutely. We are fully licensed, bonded, and insured. Your property and our workers are protected throughout the entire project.',
        },
      ],
    },

    // Services Grid Block
    {
      fieldGroupName: 'LandingSectionsServicesGrid',
      sectionTitle: 'Our Professional Services',
      sectionDescription: 'From interior to exterior, we handle all your painting needs with precision and care.',
      showCustomQuote: true,
      customQuoteText: "Don't See What You're Looking for?",
      customQuoteUrl: '#contact',
      services: [
        { title: 'Interior Painting', linkUrl: '#interior', image: { sourceUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=800&fit=crop', altText: 'Interior painting' } },
        { title: 'Exterior Painting', linkUrl: '#exterior', image: { sourceUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop', altText: 'Exterior painting' } },
        { title: 'Cabinet Refinishing', linkUrl: '#cabinets', image: { sourceUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop', altText: 'Cabinet refinishing' } },
        { title: 'Deck Staining', linkUrl: '#deck', image: { sourceUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop', altText: 'Deck staining' } },
        { title: 'Commercial', linkUrl: '#commercial', image: { sourceUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop', altText: 'Commercial painting' } },
      ],
    },

    // Video Section Block
    {
      fieldGroupName: 'LandingSectionsVideoSection',
      headline: 'See Our Work In Action',
      bulletPoints: [
        'Watch our team transform a living room in just 2 days',
        'Learn about our meticulous prep process',
        'See the difference quality paint makes',
        'Hear from satisfied customers',
      ],
      ctaText: 'Schedule Your Consultation',
      ctaUrl: '#contact',
      secondaryCtaText: 'Call Now',
      secondaryCtaUrl: 'tel:+1234567890',
      videoThumbnail: {
        sourceUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
        altText: 'Video thumbnail - painting process',
      },
    },

    // Values Block (3 Column)
    {
      fieldGroupName: 'LandingSectionsValues',
      sectionTitle: 'Why Choose Us?',
      sectionDescription: 'We are committed to delivering exceptional results on every project.',
      values: [
        {
          icon: 'shield-check',
          title: 'Quality Guaranteed',
          description: 'We stand behind our work with a 5-year warranty on all painting projects.',
        },
        {
          icon: 'clock',
          title: 'On-Time Delivery',
          description: 'We respect your schedule and always complete projects on the agreed timeline.',
        },
        {
          icon: 'badge-dollar-sign',
          title: 'Transparent Pricing',
          description: 'No hidden fees or surprise charges. What we quote is what you pay.',
        },
      ],
    },

    // Content Split Block
    {
      fieldGroupName: 'LandingSectionsContentSplit',
      headline: 'A Family Business Built on Trust',
      description: 'For over 15 years, we have been serving our local community with pride. What started as a small family operation has grown into one of the most trusted painting companies in the region. Our values remain the same: honest work, fair prices, and treating every home like our own.',
      ctaText: 'Learn Our Story',
      ctaUrl: '#about',
      imagePosition: 'left',
      image: {
        sourceUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
        altText: 'Team working together',
      },
    },

    // Testimonials Block
    {
      fieldGroupName: 'LandingSectionsTestimonials',
      sectionTitle: 'What Our Customers Say',
      sectionDescription: 'Real reviews from real customers who trusted us with their homes.',
      testimonials: [
        {
          quote: 'The team was professional, tidy, and the results exceeded our expectations. Our living room looks brand new!',
          authorName: 'Sarah Mitchell',
        },
        {
          quote: 'Best painting experience ever. They were on time, on budget, and the quality is outstanding.',
          authorName: 'Robert Chen',
        },
        {
          quote: 'We hired them for our entire exterior and they did an amazing job. Highly recommend!',
          authorName: 'Jessica Torres',
        },
        {
          quote: 'Professional from start to finish. The color consultation was incredibly helpful.',
          authorName: 'David Williams',
        },
      ],
    },

    // Photo Gallery Block
    {
      fieldGroupName: 'LandingSectionsPhotoGallery',
      sectionTitle: 'Our Recent Projects',
      sectionDescription: 'Browse through some of our favorite transformations.',
      ctaText: 'Get a Quote',
      ctaUrl: '#contact',
      photos: [
        { sourceUrl: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800', altText: 'Living room renovation' },
        { sourceUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', altText: 'Kitchen cabinets' },
        { sourceUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400', altText: 'Modern kitchen' },
        { sourceUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', altText: 'Bedroom paint' },
        { sourceUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', altText: 'Exterior painting' },
      ],
    },

    // FAQ Accordion Block (Centered)
    {
      fieldGroupName: 'LandingSectionsAccordion',
      sectionTitle: 'Frequently Asked Questions',
      layout: 'centered',
      ctaText: 'Still Have Questions? Contact Us',
      ctaUrl: '#contact',
      items: [
        {
          question: 'What areas do you serve?',
          answer: 'We serve the greater metropolitan area including all surrounding suburbs within a 50-mile radius of downtown.',
        },
        {
          question: 'Do I need to be home during the project?',
          answer: 'Not necessarily. Many clients provide a key or access code. We are fully insured and our team is thoroughly vetted.',
        },
        {
          question: 'How do I prepare for the painters?',
          answer: 'We handle most prep work, but we ask that you move small items and valuables away from the walls. We will move larger furniture.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, checks, and bank transfers. We offer financing options for larger projects.',
        },
      ],
    },

    // Contact Form Block
    {
      fieldGroupName: 'LandingSectionsContactForm',
      headline: 'Book Your Free Consultation',
      bulletPoints: [
        'Free on-site estimate',
        'Color consultation included',
        'Detailed written proposal',
        'No obligation to proceed',
      ],
      description: 'Fill out the form and one of our experts will contact you within 24 hours.',
      formMode: 'gravity',
      gravityFormId: 1,
    },

    // CTA Banner Block
    {
      fieldGroupName: 'LandingSectionsCtaBanner',
      headline: 'Ready to Transform Your Space?',
      description: 'Get your free estimate today and see why hundreds of homeowners trust us with their homes.',
      primaryCtaText: 'Get Free Estimate',
      primaryCtaUrl: '#contact',
      secondaryCtaText: 'Call (123) 456-7890',
      secondaryCtaUrl: 'tel:+1234567890',
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

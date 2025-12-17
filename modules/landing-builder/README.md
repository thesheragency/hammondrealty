# Landing Page Builder Module

This module provides a flexible landing page builder system using ACF Flexible Content blocks.

## Overview

When a WordPress page uses the "Landing Page" template, Next.js will render it using this module instead of the standard page template. This allows editors to build custom landing pages using predefined, on-brand sections.

## Feature Flag

The landing builder is controlled by a feature flag. To disable it:

```env
FEATURE_LANDING_BUILDER=false
```

To customize the template name:

```env
LANDING_TEMPLATE_NAME=template-landing-page
```

## Directory Structure

```
modules/landing-builder/
├── README.md              # This file
├── types.ts               # TypeScript type definitions
├── index.ts               # Public exports
├── LandingPageRenderer.tsx # Main renderer component
├── server/
│   └── query.ts           # GraphQL queries for landing pages
└── blocks/
    ├── HeroBlock.tsx      # Hero section
    ├── FeatureGridBlock.tsx
    ├── CtaBannerBlock.tsx
    ├── FormSectionBlock.tsx
    ├── RichTextBlock.tsx
    └── TestimonialsBlock.tsx
```

## Available Blocks

### Hero Section
- Headline, subheadline, CTA button
- Background image or color
- Text alignment options

### Feature Grid
- 2-4 column layout
- Icon, title, description per feature
- Section title and description

### CTA Banner
- Full-width call-to-action
- Primary and secondary buttons
- Brand/accent color backgrounds

### Form Section
- **Gravity Forms mode**: Embeds a Gravity Form by ID
- **Iframe mode**: Embeds external forms (HubSpot, Salesforce, etc.)

### Rich Text
- WYSIWYG content from WordPress
- Configurable max-width

### Testimonials
- Grid or carousel layout
- Quote, author name, title, photo

## WordPress Setup

### 1. Create Page Template

Create `template-landing-page.php` in your theme:

```php
<?php
/**
 * Template Name: Landing Page
 * Description: Flexible landing page builder template
 */

// This file is never rendered server-side in headless mode
// but the Template Name header is required for WordPress to register it
get_header();
the_content();
get_footer();
```

### 2. Create ACF Field Group

Create a Flexible Content field group with these settings:

- **Field Group Title**: Landing Page Sections
- **Field Name**: `landing_sections`
- **Field Type**: Flexible Content
- **Location Rule**: Post Template is equal to Landing Page

#### Layouts (blocks):

Each layout should have a machine name matching the types in `types.ts`:
- `hero_section`
- `feature_grid`
- `cta_banner`
- `form_section`
- `rich_text`
- `testimonials`

### 3. Configure WPGraphQL for ACF

Ensure each ACF field has "Show in GraphQL" enabled with appropriate GraphQL Field Names matching the TypeScript types.

### 4. Test

1. Create a new Page in WordPress
2. Select "Landing Page" template
3. Add sections using the ACF flexible content interface
4. Preview or publish
5. View on the Next.js frontend

## Adding New Blocks

1. Add the type definition to `types.ts`
2. Update `BLOCK_TYPE_MAP` in `types.ts`
3. Create the React component in `blocks/`
4. Add the component to `LandingPageRenderer.tsx`
5. Update the GraphQL query in `server/query.ts`
6. Create the matching ACF layout in WordPress

## Styling

All blocks use Tailwind CSS and consume the style guide variables defined in `app/globals.css`. This ensures landing pages stay on-brand even when the global styles are updated.

## Known Limitations

### Preview Mode
Landing page preview currently works with Basic Auth protected staging sites but may have limitations with full WordPress session-based preview for draft content. For full preview support on staging sites with dual authentication (nginx + WordPress), the landing builder would need deeper integration with the WordPress auth flow in `lib/wordpress.ts`.

**Workaround:** Publish landing pages to test them, or temporarily disable staging auth for preview testing.

### Caching
Landing page content is fetched directly from WordPress on each request rather than using the PostgreSQL cache. This ensures content is always fresh but means:
- Landing pages don't benefit from the same caching as regular pages
- Revalidation via `/api/revalidate` doesn't affect landing pages (they're always live)

For high-traffic landing pages, consider implementing ISR with `revalidate` in the route or adding landing pages to the storage cache.

## Iframe Allowlist

The Form Section block restricts iframe embeds to trusted domains for security. The current allowlist includes:
- HubSpot (hubspot.com, hsforms.com, hs-sites.com)
- Salesforce (salesforce.com, pardot.com)
- Marketo
- Typeform
- Jotform
- Wufoo
- Formstack
- Google Forms
- Calendly
- Acuity Scheduling
- Airtable

To add additional domains, update `ALLOWED_IFRAME_DOMAINS` in `blocks/FormSectionBlock.tsx`.

Blocks should use semantic color classes like:
- `bg-background`, `bg-card`, `bg-muted`
- `text-foreground`, `text-muted-foreground`
- `bg-primary`, `text-primary-foreground`

Avoid hardcoded colors to maintain theme consistency.

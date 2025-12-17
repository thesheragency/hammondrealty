/**
 * Form Section Block
 * 
 * Flexible form section that supports either Gravity Forms or iframe embeds.
 */

'use client';

import { Suspense } from 'react';
import type { FormSectionBlock as FormSectionBlockType } from '../types';

interface Props {
  block: FormSectionBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
  card: 'bg-card',
} as const;

// Lazy load Gravity Form component to avoid client bundle bloat
// This assumes the existing GF module exports a usable component
function GravityFormEmbed({ formId }: { formId: number }) {
  // TODO: Import and use the existing Gravity Forms module
  // For now, render a placeholder that can be replaced with actual GF integration
  return (
    <div 
      className="p-8 border border-dashed border-border rounded-lg text-center"
      data-testid="gravity-form-placeholder"
    >
      <p className="text-muted-foreground">
        Gravity Form #{formId} will render here
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Connect to the existing Gravity Forms module for full functionality
      </p>
    </div>
  );
}

// Allowlist of trusted iframe domains for form embeds
const ALLOWED_IFRAME_DOMAINS = [
  'hubspot.com',
  'hs-sites.com',
  'hsforms.com',
  'salesforce.com',
  'pardot.com',
  'marketo.com',
  'typeform.com',
  'jotform.com',
  'wufoo.com',
  'formstack.com',
  'cognito.me',
  'google.com',
  'docs.google.com',
  'forms.gle',
  'calendly.com',
  'acuityscheduling.com',
  'airtable.com',
];

function isAllowedDomain(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return ALLOWED_IFRAME_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

function IframeEmbed({ url, height }: { url: string; height: number }) {
  // Validate URL for security
  const isValidUrl = url.startsWith('https://');
  const isAllowed = isAllowedDomain(url);
  
  if (!isValidUrl) {
    return (
      <div 
        className="p-8 border border-destructive/20 bg-destructive/5 rounded-lg text-center"
        data-testid="iframe-error"
      >
        <p className="text-destructive">
          Invalid iframe URL. Only HTTPS URLs are allowed.
        </p>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div 
        className="p-8 border border-destructive/20 bg-destructive/5 rounded-lg text-center"
        data-testid="iframe-error"
      >
        <p className="text-destructive">
          Iframe domain not allowed. Contact your administrator to add this domain to the allowlist.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Allowed domains include: HubSpot, Salesforce, Typeform, Calendly, and more.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden" data-testid="iframe-container">
      <iframe
        src={url}
        height={height}
        className="w-full border-0"
        title="Embedded form"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="strict-origin-when-cross-origin"
        data-testid="form-iframe"
      />
    </div>
  );
}

export function FormSectionBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'default';
  const formMode = block.formMode || 'gravity';
  const iframeHeight = block.iframeHeight || 600;

  return (
    <section
      className={`py-16 md:py-24 ${bgColorClasses[bgColor]}`}
      data-testid="block-form-section"
    >
      <div className="container mx-auto px-4">
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            {block.sectionTitle && (
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="form-section-title"
              >
                {block.sectionTitle}
              </h2>
            )}
            {block.sectionDescription && (
              <p
                className="text-lg text-muted-foreground"
                data-testid="form-section-description"
              >
                {block.sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <Suspense fallback={
            <div className="animate-pulse bg-muted rounded-lg h-64" />
          }>
            {formMode === 'gravity' && block.gravityFormId ? (
              <GravityFormEmbed formId={block.gravityFormId} />
            ) : formMode === 'iframe' && block.iframeUrl ? (
              <IframeEmbed url={block.iframeUrl} height={iframeHeight} />
            ) : (
              <div 
                className="p-8 border border-dashed border-border rounded-lg text-center"
                data-testid="form-placeholder"
              >
                <p className="text-muted-foreground">
                  Configure a Gravity Form ID or iframe URL in WordPress
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
}

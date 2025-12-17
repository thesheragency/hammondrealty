/**
 * Contact Form Block
 * 
 * Split layout with content on left and form embed on right.
 * Uses design system typography and supports Gravity Forms or iframe.
 */

'use client';

import { Suspense } from 'react';
import type { ContactFormBlock as ContactFormBlockType } from '../types';
import { Check } from 'lucide-react';

interface Props {
  block: ContactFormBlockType;
}

// Lazy load Gravity Form component
function GravityFormEmbed({ formId }: { formId: number }) {
  return (
    <div 
      className="p-10 border border-dashed border-border rounded-xl text-center bg-background min-h-[400px] flex items-center justify-center"
      data-testid="gravity-form-placeholder"
    >
      <p className="text-muted-foreground">
        Gravity Form #{formId} will render here
      </p>
    </div>
  );
}

// Allowlist of trusted iframe domains
const ALLOWED_IFRAME_DOMAINS = [
  'hubspot.com', 'hs-sites.com', 'hsforms.com',
  'salesforce.com', 'pardot.com', 'marketo.com',
  'typeform.com', 'jotform.com', 'wufoo.com', 'formstack.com',
  'google.com', 'docs.google.com', 'forms.gle',
  'calendly.com', 'acuityscheduling.com', 'airtable.com',
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
  const isValidUrl = url.startsWith('https://');
  const isAllowed = isAllowedDomain(url);
  
  if (!isValidUrl || !isAllowed) {
    return (
      <div className="p-10 border border-destructive/20 bg-destructive/5 rounded-xl text-center">
        <p className="text-destructive text-body">
          {!isValidUrl ? 'Invalid URL. Only HTTPS allowed.' : 'Domain not allowed.'}
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      height={height}
      className="w-full border-0 rounded-xl"
      title="Contact form"
      loading="lazy"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      data-testid="contact-form-iframe"
    />
  );
}

export function ContactFormBlock({ block }: Props) {
  const bulletPoints = block.bulletPoints || [];
  const formMode = block.formMode || 'gravity';
  const iframeHeight = block.iframeHeight || 560;

  return (
    <section className="bg-background py-24 lg:py-36" data-testid="block-contact-form">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Content (max 480px) */}
          <div className="max-w-[480px]">
            {block.headline && (
              <h2 className="text-h2 mb-8" data-testid="contact-form-headline">
                {block.headline}
              </h2>
            )}

            {bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-10">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-6 w-6 flex-shrink-0 mt-0.5 text-brand" />
                    <span className="text-body text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {block.description && (
              <p className="text-body text-muted-foreground">
                {block.description}
              </p>
            )}
          </div>

          {/* Right side - Form */}
          <div className="bg-muted rounded-2xl p-10">
            <Suspense fallback={<div className="animate-pulse bg-muted-foreground/10 rounded-xl h-64" />}>
              {formMode === 'gravity' && block.gravityFormId ? (
                <GravityFormEmbed formId={block.gravityFormId} />
              ) : formMode === 'iframe' && block.iframeUrl ? (
                <IframeEmbed url={block.iframeUrl} height={iframeHeight} />
              ) : (
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-h3 text-center text-muted-foreground">
                    Form Or Embed
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

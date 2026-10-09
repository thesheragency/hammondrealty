import { fetchAcfGlobalScripts } from '@/lib/wordpress';
import Script from 'next/script';

export async function GlobalHeadScripts() {
  let headScripts: string | null = null;

  try {
    const scripts = await fetchAcfGlobalScripts();
    headScripts = scripts.headScripts;
  } catch (error) {
    console.error('Error fetching global head scripts:', error);
  }

  if (!headScripts) return null;

  // Keep CMS ownership and all unrelated markup. Defer only the CMS-provided
  // GTM bootstrap so the parser can paint the page before executing it.
  const tagManagerScripts: { attributes: string; code: string }[] = [];
  const remainingScripts = headScripts.replace(
    /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,
    (tag, attributes: string, code: string) => {
      if (!/googletagmanager\.com\/gtm\.js/i.test(attributes + code)) return tag;
      tagManagerScripts.push({ attributes, code });
      return '';
    },
  );

  return (
    <>
      <div
      id="global-head-scripts"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: remainingScripts }}
      />
      {tagManagerScripts.map(({ attributes, code }, index) => {
        const attribute = (name: string) =>
          attributes.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
        const src = attribute('src');
        return (
          <Script
            key={index}
            id={attribute('id') || `cms-tag-manager-${index}`}
            nonce={attribute('nonce')}
            strategy="afterInteractive"
            {...(src ? { src } : { dangerouslySetInnerHTML: { __html: code } })}
          />
        );
      })}
    </>
  );
}

export async function GlobalBodyScripts() {
  let bodyScripts: string | null = null;

  try {
    const scripts = await fetchAcfGlobalScripts();
    bodyScripts = scripts.bodyScripts;
  } catch (error) {
    console.error('Error fetching global body scripts:', error);
  }

  if (!bodyScripts) return null;

  return (
    <div
      id="global-body-scripts"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: bodyScripts }}
    />
  );
}

export async function GlobalScripts() {
  return (
    <>
      <GlobalHeadScripts />
      <GlobalBodyScripts />
    </>
  );
}

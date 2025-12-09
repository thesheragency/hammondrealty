import Script from 'next/script';
import { storage } from '@/lib/storage';

export async function GlobalScripts() {
  let headScripts: string | null = null;
  let bodyScripts: string | null = null;
  
  try {
    const settings = await storage.getAllGlobalSettings();
    for (const setting of settings) {
      if (setting.key === 'global_head_scripts') {
        headScripts = setting.value;
      } else if (setting.key === 'global_body_scripts') {
        bodyScripts = setting.value;
      }
    }
  } catch (error) {
    console.error('Error fetching global scripts:', error);
  }

  return (
    <>
      {headScripts && (
        <Script
          id="global-head-scripts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: headScripts }}
        />
      )}
      {bodyScripts && (
        <Script
          id="global-body-scripts"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: bodyScripts }}
        />
      )}
    </>
  );
}

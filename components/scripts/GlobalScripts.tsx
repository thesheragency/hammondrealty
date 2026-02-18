import { storage } from '@/lib/storage';

export async function GlobalHeadScripts() {
  let headScripts: string | null = null;

  try {
    const settings = await storage.getAllGlobalSettings();
    for (const setting of settings) {
      if (setting.key === 'global_head_scripts') {
        headScripts = setting.value;
      }
    }
  } catch (error) {
    console.error('Error fetching global head scripts:', error);
  }

  if (!headScripts) return null;

  return (
    <div
      id="global-head-scripts"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: headScripts }}
    />
  );
}

export async function GlobalBodyScripts() {
  let bodyScripts: string | null = null;

  try {
    const settings = await storage.getAllGlobalSettings();
    for (const setting of settings) {
      if (setting.key === 'global_body_scripts') {
        bodyScripts = setting.value;
      }
    }
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

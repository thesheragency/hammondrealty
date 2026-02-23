import { fetchAcfGlobalScripts } from '@/lib/wordpress';

export async function GlobalHeadScripts() {
  let headScripts: string | null = null;

  try {
    const scripts = await fetchAcfGlobalScripts();
    headScripts = scripts.headScripts;
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

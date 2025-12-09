import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface GlobalSettings {
  global_head_scripts?: string | null;
  global_body_scripts?: string | null;
}

const GLOBAL_HEAD_SCRIPTS_ATTR = 'data-global-head-script';
const GLOBAL_BODY_SCRIPTS_ATTR = 'data-global-body-script';
const GLOBAL_HEAD_STYLES_ATTR = 'data-global-head-style';

function hasInjectedElements(): boolean {
  return (
    document.querySelectorAll(`[${GLOBAL_HEAD_SCRIPTS_ATTR}]`).length > 0 ||
    document.querySelectorAll(`[${GLOBAL_BODY_SCRIPTS_ATTR}]`).length > 0 ||
    document.querySelectorAll(`[${GLOBAL_HEAD_STYLES_ATTR}]`).length > 0
  );
}

function cleanupInjectedElements(): void {
  document.querySelectorAll(`[${GLOBAL_HEAD_SCRIPTS_ATTR}]`).forEach(el => el.remove());
  document.querySelectorAll(`[${GLOBAL_BODY_SCRIPTS_ATTR}]`).forEach(el => el.remove());
  document.querySelectorAll(`[${GLOBAL_HEAD_STYLES_ATTR}]`).forEach(el => el.remove());
}

export function GlobalScripts() {
  const { data: settings } = useQuery<GlobalSettings>({
    queryKey: ['/api/global-settings'],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const lastSettingsRef = useRef<string | null>(null);

  useEffect(() => {
    if (!settings) return;

    const settingsKey = JSON.stringify(settings);
    
    if (hasInjectedElements() && lastSettingsRef.current === settingsKey) {
      return;
    }

    cleanupInjectedElements();

    if (settings.global_head_scripts) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(settings.global_head_scripts, 'text/html');
      const tempContainer = doc.body;
      
      tempContainer.querySelectorAll('script').forEach((script) => {
        const newScript = document.createElement('script');
        newScript.setAttribute(GLOBAL_HEAD_SCRIPTS_ATTR, 'true');
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        document.head.appendChild(newScript);
      });

      tempContainer.querySelectorAll('style').forEach((style) => {
        const newStyle = document.createElement('style');
        newStyle.setAttribute(GLOBAL_HEAD_STYLES_ATTR, 'true');
        newStyle.textContent = style.textContent;
        document.head.appendChild(newStyle);
      });

      tempContainer.querySelectorAll('link').forEach((link) => {
        const newLink = document.createElement('link');
        newLink.setAttribute(GLOBAL_HEAD_STYLES_ATTR, 'true');
        Array.from(link.attributes).forEach((attr) => {
          newLink.setAttribute(attr.name, attr.value);
        });
        document.head.appendChild(newLink);
      });

      tempContainer.querySelectorAll('meta').forEach((meta) => {
        const newMeta = document.createElement('meta');
        newMeta.setAttribute(GLOBAL_HEAD_STYLES_ATTR, 'true');
        Array.from(meta.attributes).forEach((attr) => {
          newMeta.setAttribute(attr.name, attr.value);
        });
        document.head.appendChild(newMeta);
      });

      // Handle any remaining content (plain text or other elements) by wrapping in a hidden noscript
      // This allows verification that the content was processed, even if it's not a valid head element
      const remainingContent = tempContainer.innerHTML
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<link[^>]*>/gi, '')
        .replace(/<meta[^>]*>/gi, '')
        .trim();
      
      if (remainingContent) {
        const noscript = document.createElement('noscript');
        noscript.setAttribute(GLOBAL_HEAD_SCRIPTS_ATTR, 'true');
        noscript.textContent = remainingContent;
        document.head.appendChild(noscript);
      }
    }

    if (settings.global_body_scripts) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(settings.global_body_scripts, 'text/html');
      const tempContainer = doc.body;
      
      tempContainer.querySelectorAll('script').forEach((script) => {
        const newScript = document.createElement('script');
        newScript.setAttribute(GLOBAL_BODY_SCRIPTS_ATTR, 'true');
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

      // Clone non-script elements safely
      const container = document.createElement('div');
      container.setAttribute(GLOBAL_BODY_SCRIPTS_ATTR, 'true');
      let hasNonScriptContent = false;
      
      Array.from(tempContainer.childNodes).forEach((node) => {
        if (node.nodeName.toLowerCase() !== 'script') {
          container.appendChild(node.cloneNode(true));
          hasNonScriptContent = true;
        }
      });
      
      if (hasNonScriptContent) {
        document.body.appendChild(container);
      }
    }

    lastSettingsRef.current = settingsKey;

    return cleanupInjectedElements;
  }, [settings]);

  return null;
}

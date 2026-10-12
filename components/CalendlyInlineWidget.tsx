"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface CalendlyInlineWidgetProps {
  url: string;
  name: string;
  email?: string;
  title: string;
}

interface CalendlyApi {
  initInlineWidget(options: {
    url: string;
    parentElement: HTMLElement;
    prefill: { name: string; email?: string };
    resize: boolean;
  }): void;
}

export default function CalendlyInlineWidget({ url, name, email, title }: CalendlyInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const optionsRef = useRef({ url, prefill: { name, ...(email ? { email } : {}) } });
  const titleRef = useRef(title);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const calendly = (window as Window & { Calendly?: CalendlyApi }).Calendly;
    if (!scriptReady || !container || !calendly || initializedRef.current) return;

    // Calendly's inline API has no destroy method. Scope its synchronous
    // resize-listener registration to this mount so it is removed on cleanup.
    const controller = new AbortController();
    const initialize = () => {
      if (controller.signal.aborted || initializedRef.current) return;
      const originalAddEventListener = window.addEventListener;
      window.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
        const scopedOptions = type === "message"
          ? { ...(typeof options === "boolean" ? { capture: options } : options), signal: controller.signal }
          : options;
        originalAddEventListener.call(window, type, listener, scopedOptions);
      }) as Window["addEventListener"];

      try {
        calendly.initInlineWidget({
          ...optionsRef.current,
          parentElement: container,
          resize: true,
        });
        initializedRef.current = true;
        const iframe = container.querySelector("iframe");
        if (iframe && titleRef.current) iframe.title = titleRef.current;
      } catch (error) {
        controller.abort();
        container.replaceChildren();
        throw error;
      } finally {
        window.addEventListener = originalAddEventListener;
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initialize, { once: true, signal: controller.signal });
    } else {
      initialize();
    }

    return () => {
      controller.abort();
      container.replaceChildren();
      initializedRef.current = false;
    };
  }, [scriptReady]);

  return (
    <>
      <div
        ref={containerRef}
        data-testid="embed-calendly"
        className="block w-full [&_iframe]:block"
        style={{ minWidth: 320, minHeight: 700, height: 700 }}
      />
      <Script
        id="calendly-inline-widget-script"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
    </>
  );
}

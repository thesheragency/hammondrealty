"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/** Only Home Prep changes scheduling; other routes retain their current setup. */
export default function EquallyWidget() {
  const pathname = usePathname();
  const strategy = pathname === "/home-prep-program" ? "lazyOnload" : "afterInteractive";
  return (
    <>
      <Script
        id="equally-widget"
        strategy={strategy}
        dangerouslySetInnerHTML={{
          __html: `!window.EQUALLY_AI_API_KEY&&(window.EQUALLY_AI_API_KEY="slGVp8SplRks0wxkiCSnZpByGx1qLXiM",intervalId=setInterval(function(){window.EquallyAi&&(clearInterval(intervalId),window.EquallyAi=new EquallyAi)},500));`,
        }}
      />
      <Script id="equally-widget-src" src="https://widget.prod.equally.ai/equally-widget.min.js" strategy={strategy} />
    </>
  );
}

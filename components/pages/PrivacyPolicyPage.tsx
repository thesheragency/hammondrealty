"use client";

import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function PrivacyPolicy({ content }: { content?: string | null }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="w-full pt-28 pb-20 md:pt-36 md:pb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                Privacy Policy
              </p>
              <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6">
                Your Privacy Matters.
              </h1>
              <p className="text-foreground/60 text-sm mb-12">Effective Date: April 10, 2025</p>

              {content ? (
                <div
                  className="wp-legal-content text-foreground/80 leading-relaxed space-y-6 [&_h2]:font-sans [&_h2]:text-h2 [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-4 [&_h2]:mt-10 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary [&_strong]:text-foreground"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
              <div className="space-y-10 text-foreground/80 leading-relaxed">
                <p>
                  Hammond Realty values your privacy. This Privacy Policy explains how we
                  collect, use, and protect your information.
                </p>

                <section>
                  <h2 className="text-h2 font-bold text-foreground mb-4">
                    Information We Collect
                  </h2>
                  <p className="mb-4">
                    We may collect personal information such as your name, phone number,
                    email address, and property preferences when you:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Fill out a contact form on our website</li>
                    <li>Request a home valuation</li>
                    <li>Subscribe to receive updates or messages from us</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-h2 font-bold text-foreground mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">We use the information you provide to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Communicate with you about real estate services</li>
                    <li>Send you updates, follow-ups, and other relevant messages</li>
                    <li>Improve our services and personalize your experience</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-h2 font-bold text-foreground mb-4">
                    SMS Consent
                  </h2>
                  <p className="mb-4">
                    By submitting your phone number, you consent to receive SMS messages
                    from Hammond Realty. Message and data rates may apply. Message frequency
                    may vary. You can reply STOP at any time to opt out, or HELP for more
                    information.
                  </p>
                  <p>
                    No mobile information will be shared with third parties/affiliates for
                    marketing/promotional purposes. All the above categories exclude text
                    messaging originator opt-in data and consent; this information will not
                    be shared with any third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-h2 font-bold text-foreground mb-4">
                    Data Protection
                  </h2>
                  <p>
                    Your data is securely stored and only accessed by authorized personnel.
                    We will never sell, rent, or share your information with outside parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-h2 font-bold text-foreground mb-4">
                    Contact Us
                  </h2>
                  <p className="mb-4">
                    If you have questions about this Privacy Policy, contact us at:
                  </p>
                  <p className="font-semibold text-foreground">Hammond Realty</p>
                  <p>
                    <a href="tel:9166256118" className="hover:text-primary transition-colors">
                      (916) 625-6118
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:blakehammondre@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      blakehammondre@gmail.com
                    </a>
                  </p>
                </section>
              </div>
              )}
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}

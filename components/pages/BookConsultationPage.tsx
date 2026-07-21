"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { tc } from "@/lib/title-case";

const CALENDLY_URL =
  "https://calendly.com/blakehammondre/real-estate-consult-with-blake";

const defaultExpectations = [
  {
    title: "A Real Conversation",
    desc: "A quick chat to understand specific family goals and timelines with no pressure and no script.",
  },
  {
    title: "Honest Market Context",
    desc: "Clear property data on where active market buyers are right now and what that means for your equity.",
  },
  {
    title: "A Clear Next Step",
    desc: "Walk away from the conversation with a simple roadmap, whether a move is planned in 30 days or 12 months.",
  },
];

export default function BookConsultation({ acf }: { acf?: Record<string, any> | null }) {
  const expectations = (acf?.expectations?.length ? acf.expectations : defaultExpectations) as { title: string; desc: string }[];

  const [step, setStep] = useState<"form" | "calendar">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const calendlyUrl = `${CALENDLY_URL}?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setStep("calendar");
  };

  // Initialize the Calendly widget once both the div is mounted and the script is ready
  useEffect(() => {
    if (step !== "calendar") return;
    if (!calendlyRef.current) return;

    const tryInit = () => {
      const win = window as any;
      if (win.Calendly) {
        // Clear any previous widget in the container
        if (calendlyRef.current) {
          calendlyRef.current.innerHTML = "";
        }
        win.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: calendlyRef.current,
          prefill: {
            name: form.name,
            email: form.email,
          },
        });
      }
    };

    // If script is already loaded, init immediately; otherwise wait for onReady
    if ((window as any).Calendly) {
      tryInit();
    } else {
      // Poll briefly in case the script finishes loading just after this effect runs
      const interval = setInterval(() => {
        if ((window as any).Calendly) {
          clearInterval(interval);
          tryInit();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step, scriptReady, calendlyUrl]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      {/* Always load the Calendly script so it is ready when the calendar step mounts */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <main className="flex-1">
        <motion.section
          className="bg-background py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">

              {/* Left: copy — stays constant */}
              <div className="lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  {acf?.eyebrow || "Thanks for reaching out"}
                </p>
                <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6">
                  {acf?.heading ? tc(acf.heading) : (<>Book A 15 Minute<br />Call With Blake</>)}
                </h1>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md mb-8">
                  {acf?.body || "Make your move simple and stress-free. Whether you are buying or selling, this conversation is designed to help you feel confident every step of the way with straightforward, honest communication."}
                </p>

                <ul className="space-y-4 mb-8">
                  {expectations.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="font-sans font-semibold text-base leading-snug">{item.title}</p>
                        <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md">
                  {acf?.body2 || "Pick a time that works for you. Consultations happen by phone or Zoom, depending completely on your preference, and they always start right on time."}
                </p>
              </div>

              {/* Right: form → calendar */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {step === "form" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-muted p-8 md:p-10"
                    >
                      <h3 className="font-sans text-xl font-bold mb-1">A Little About You</h3>
                      <p className="text-sm text-foreground/60 mb-8">
                        Fill this out and we will open the calendar so you can pick a time.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="bc-name" className="text-sm font-medium">Name</Label>
                          <Input
                            id="bc-name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                            data-testid="input-bc-name"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-email" className="text-sm font-medium">Email</Label>
                          <Input
                            id="bc-email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                            data-testid="input-bc-email"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-phone" className="text-sm font-medium">
                            Phone <span className="text-foreground/40 font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="bc-phone"
                            type="tel"
                            placeholder="(916) 555-0100"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                            data-testid="input-bc-phone"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-notes" className="text-sm font-medium">
                            Anything you would like me to know
                          </Label>
                          <textarea
                            id="bc-notes"
                            rows={4}
                            placeholder="Share any details about your situation, goals, or questions..."
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            className="w-full rounded-none bg-white border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2.5 text-sm resize-none"
                            data-testid="textarea-bc-notes"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="bc-privacy"
                              checked={privacyAccepted}
                              onCheckedChange={(v) => {
                                setPrivacyAccepted(!!v);
                                if (v) setPrivacyError(false);
                              }}
                              className={`mt-0.5 ${privacyError ? 'border-destructive' : ''}`}
                              data-testid="checkbox-bc-privacy"
                            />
                            <Label htmlFor="bc-privacy" className="text-xs text-muted-foreground leading-relaxed font-normal cursor-pointer">
                              I accept the{' '}
                              <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground transition-colors">
                                Privacy Policy
                              </a>.
                            </Label>
                          </div>
                          {privacyError && (
                            <p className="text-xs text-destructive pl-7">Please accept the Privacy Policy to continue.</p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5"
                          data-testid="button-bc-submit"
                        >
                          Continue to Booking
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full"
                    >
                      <div
                        ref={calendlyRef}
                        className="w-full"
                        style={{ minWidth: 320, height: 700 }}
                        data-testid="embed-calendly"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}

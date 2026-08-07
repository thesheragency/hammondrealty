"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
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
    title: "See What's Worth Doing",
    desc: "We'll identify the repairs, updates, cleaning, landscaping, or staging that could make the biggest difference—and what you can skip.",
  },
  {
    title: "Learn How the Home Prep Program Works",
    desc: "See how we can coordinate and front the cost of preparing your home for sale, with nothing due until closing.",
  },
  {
    title: "Get a Clear Game Plan",
    desc: "Whether you're planning to move soon or sometime down the road, you'll leave knowing what I'd recommend and what your next steps could look like.",
  },
];

export default function BookConsultation({ acf }: { acf?: Record<string, any> | null }) {
  const expectations = defaultExpectations;

  const [step, setStep] = useState<"form" | "success" | "calendar">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email.trim())) newErrors.email = "Please enter a valid email address.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("submission_failed");
      setStep("success");
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  // Scroll the right panel into view after transitioning
  useEffect(() => {
    if ((step === "calendar" || step === "success") && rightPanelRef.current) {
      setTimeout(() => {
        rightPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [step]);

  const params = new URLSearchParams({
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    name: form.name,
    email: form.email,
  });
  const calendlyIframeSrc = `${CALENDLY_URL}?${params.toString()}`;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="bg-background py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">

              {/* Left: copy — order-2 on mobile so form appears first */}
              <div className="order-2 lg:order-1 lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  {acf?.eyebrow || "Thanks for reaching out"}
                </p>
                <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6">
                  Book a 15-Minute Call With Blake
                </h1>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md mb-8">
                  Thinking about selling, but not sure what your home needs before it hits the market? We'll talk through your property, your goals, and what—if anything—would be worth doing before you sell.
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
                  No pressure and no obligation. Pick a time that works for you and we'll spend about 15 minutes talking through your home and what you're trying to accomplish.
                </p>
              </div>

              {/* Right: form → calendar — order-1 on mobile so it appears first */}
              <div ref={rightPanelRef} className="order-1 lg:order-2 w-full">
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

                      <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="bc-name" className="text-sm font-medium">
                            Name<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.name ? "border-destructive" : ""}`}
                            data-testid="input-bc-name"
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-email" className="text-sm font-medium">
                            Email<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.email ? "border-destructive" : ""}`}
                            data-testid="input-bc-email"
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-phone" className="text-sm font-medium">
                            Phone<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-phone"
                            type="tel"
                            required
                            placeholder="(916) 555-0100"
                            value={form.phone}
                            onChange={(e) => { const digits = e.target.value.replace(/\D/g, ""); setForm({ ...form, phone: digits }); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.phone ? "border-destructive" : ""}`}
                            data-testid="input-bc-phone"
                          />
                          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-address" className="text-sm font-medium">
                            Property Address
                          </Label>
                          <Input
                            id="bc-address"
                            placeholder="123 Main St, Sacramento, CA"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                            data-testid="input-bc-address"
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

                        {submitError && (
                          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3">
                            {submitError}
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-primary text-primary-foreground rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                          data-testid="button-bc-submit"
                        >
                          {submitting ? "Sending…" : "Continue to Booking"}
                        </Button>
                      </form>
                    </motion.div>
                  ) : step === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-muted p-8 md:p-10"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                          <Check className="w-5 h-5" strokeWidth={3} />
                        </span>
                        <h3 className="font-sans text-xl font-bold leading-snug">
                          Message Sent!
                        </h3>
                      </div>
                      <p className="text-foreground/70 leading-relaxed text-base mb-8">
                        Thank you! Your message has been sent to Blake Hammond Real Estate. Blake will be in touch shortly.
                      </p>
                      <p className="text-foreground/70 leading-relaxed text-base mb-8">
                        Ready to pick a time right now? You can book a 15-minute call below.
                      </p>
                      <Button
                        onClick={() => setStep("calendar")}
                        className="w-full bg-primary text-primary-foreground rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5"
                      >
                        Book a Time on the Calendar
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full"
                    >
                      <iframe
                        src={calendlyIframeSrc}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        title="Schedule a consultation with Blake Hammond"
                        data-testid="embed-calendly"
                        style={{ border: "none", minWidth: 320 }}
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

"use client";

import { useState, useRef, type SyntheticEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { tc } from "@/lib/title-case";
import { normalizeUsPhone } from "@/lib/us-phone";

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
  const expectations: { title: string; desc: string }[] =
    acf?.expectations?.length ? acf.expectations : defaultExpectations;

  const [step, setStep] = useState<"form" | "calendar">("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const conversionReplayRef = useRef(false);
  const text = (key: string) => typeof acf?.[key] === "string" ? acf[key].trim() : "";

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Replay only a confirmed success to the existing GTM form-submit listener.
    // Failed validation/network requests must not count as conversions.
    if (conversionReplayRef.current) return;
    e.stopPropagation();
    const formElement = formRef.current;
    if (submitting || !formElement) return;
    const newErrors: { name?: string; email?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = text("formNameRequiredError");
    if (!form.email.trim()) newErrors.email = text("formEmailRequiredError");
    else if (!EMAIL_RE.test(form.email.trim())) newErrors.email = text("formEmailInvalidError");
    const normalizedPhone = normalizeUsPhone(form.phone);
    if (!form.phone.trim()) newErrors.phone = text("formPhoneRequiredError");
    else if (!normalizedPhone) newErrors.phone = text("formPhoneInvalidError");
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
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(), phone: normalizedPhone,
          formId: "book-consultation", privacyAccepted,
        }),
      });
      if (!res.ok) throw new Error("submission_failed");
      conversionReplayRef.current = true;
      try {
        formElement.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      } finally {
        conversionReplayRef.current = false;
      }
      setStep("calendar");
    } catch {
      setSubmitError(text("formSubmitError"));
    } finally {
      setSubmitting(false);
    }
  };

  const params = new URLSearchParams({
    embed_type: "Inline",
    hide_gdpr_banner: "1",
    hide_event_type_details: "1",
    name: form.name,
    email: form.email,
  });
  const phonePrefill = normalizeUsPhone(form.phone);
  // This Calendly event uses a phone-call location, so its supported phone
  // prefill parameter is "location", not a custom-question answer.
  if (phonePrefill) params.set("location", phonePrefill);
  if (text("calendarTimezone")) params.set("timezone", text("calendarTimezone"));
  const calendarUrl = text("calendarUrl");
  const calendlyIframeSrc = calendarUrl
    ? `${calendarUrl}${calendarUrl.includes("?") ? "&" : "?"}${params.toString()}`
    : "";

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
                  {tc(acf?.heading) || "Book a 15-Minute Call With Blake"}
                </h1>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md mb-8">
                  {acf?.body || "Thinking about selling, but not sure what your home needs before it hits the market? We'll talk through your property, your goals, and what—if anything—would be worth doing before you sell."}
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
                  {acf?.body2 || "No pressure and no obligation. Pick a time that works for you and we'll spend about 15 minutes talking through your home and what you're trying to accomplish."}
                </p>
              </div>

              {/* Right: form → calendar — order-1 on mobile so it appears first */}
              <div ref={rightPanelRef} className="order-1 lg:order-2 w-full scroll-mt-24">
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
                      {text("formHeading") && (
                        <h3 className="font-sans text-xl font-bold mb-1">{text("formHeading")}</h3>
                      )}
                      {text("formIntro") && (
                        <p className="text-sm text-foreground/60 mb-8">{text("formIntro")}</p>
                      )}

                      <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        onKeyDown={(event) => {
                          // Avoid a premature native submit (and GTM conversion)
                          // when Enter is pressed in an input. Keyboard activation
                          // of the button still uses its normal click handler.
                          if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
                            void handleSubmit(event);
                          }
                        }}
                        noValidate
                        className="space-y-5"
                      >
                        <div className="space-y-1.5">
                          <Label htmlFor="bc-name" className="text-sm font-medium">
                            {text("formNameLabel")}<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-name"
                            required
                            placeholder={text("formNamePlaceholder")}
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((prev) => ({ ...prev, name: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.name ? "border-destructive" : ""}`}
                            data-testid="input-bc-name"
                          />
                          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-email" className="text-sm font-medium">
                            {text("formEmailLabel")}<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-email"
                            type="email"
                            required
                            placeholder={text("formEmailPlaceholder")}
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.email ? "border-destructive" : ""}`}
                            data-testid="input-bc-email"
                          />
                          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="bc-phone" className="text-sm font-medium">
                            {text("formPhoneLabel")}<span className="text-destructive ml-0.5">*</span>
                          </Label>
                          <Input
                            id="bc-phone"
                            type="tel"
                            required
                            placeholder={text("formPhonePlaceholder")}
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                            className={`rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11 ${errors.phone ? "border-destructive" : ""}`}
                            data-testid="input-bc-phone"
                          />
                          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
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
                              {text("formPrivacyPrefix")}{' '}
                              {text("formPrivacyLink") && text("formPrivacyLinkLabel") && (
                                <a href={text("formPrivacyLink")} className="underline underline-offset-2 hover:text-foreground transition-colors">
                                  {text("formPrivacyLinkLabel")}
                                </a>
                              )}.
                            </Label>
                          </div>
                          {privacyError && (
                            <p className="text-xs text-destructive pl-7">{text("formPrivacyError")}</p>
                          )}
                        </div>

                        {submitError && (
                          <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-3">
                            {submitError}
                          </p>
                        )}

                        {text("scheduleText") && <Button
                          type="button"
                          onClick={handleSubmit}
                          disabled={submitting}
                          className="w-full bg-primary text-primary-foreground rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                          data-testid="button-bc-submit"
                        >
                          {submitting ? text("formSubmittingLabel") : text("scheduleText")}
                        </Button>}
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      onAnimationComplete={() => {
                        if (window.matchMedia("(max-width: 1023px)").matches) {
                          rightPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="w-full bg-muted"
                      data-testid="calendar-card"
                    >
                      {(text("calendarHeading") || text("calendarText")) && (
                        <div className="p-8 md:p-10">
                          {text("calendarHeading") && (
                            <h3 className="font-sans text-xl font-bold mb-1 text-balance">{text("calendarHeading")}</h3>
                          )}
                          {text("calendarText") && (
                            <p className="text-sm text-foreground/60">{text("calendarText")}</p>
                          )}
                        </div>
                      )}
                      {calendlyIframeSrc && <iframe
                        src={calendlyIframeSrc}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        title={text("calendarIframeTitle")}
                        data-testid="embed-calendly"
                        className="block w-full"
                        style={{ border: "none", minWidth: 320 }}
                      />}
                      {text("calendarTimezoneNote") && (
                        <p className="px-8 pb-8 pt-5 md:px-10 md:pb-10 text-sm text-foreground/60">
                          {text("calendarTimezoneNote")}
                        </p>
                      )}
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

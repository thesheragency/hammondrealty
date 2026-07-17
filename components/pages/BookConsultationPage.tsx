"use client";

import { useEffect, useState, type FormEvent } from "react";
import { tc } from "@/lib/title-case";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/blakehammondre/real-estate-consult-with-blake";

function CalendlyEmbed({ url, name, email }: { url: string; name: string; email: string }) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      embed_domain: window.location.hostname,
      embed_type: "Inline",
    });
    if (name) params.set("name", name);
    if (email) params.set("email", email);
    setEmbedSrc(`${url}?${params.toString()}`);
  }, [url, name, email]);

  if (!embedSrc) {
    return <div className="w-full bg-muted" style={{ minWidth: 320, height: 700 }} />;
  }

  return (
    <iframe
      src={embedSrc}
      title="Schedule a call with Blake"
      className="w-full border-0"
      style={{ minWidth: 320, height: 700 }}
      data-testid="embed-calendly"
    />
  );
}

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
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Book Consultation – Blake Hammond RE",
          Name: form.name,
          Email: form.email,
          Address: form.address,
          Notes: form.notes,
        }),
      });
    } catch {
      // show success regardless
    }
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">

              {/* Left: copy — stays constant */}
              <div className="lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  {acf?.eyebrow || "Thanks for reaching out"}
                </p>
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
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
                        <p className="font-sans font-semibold text-base leading-snug">
                          {item.title}
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md">
                  {acf?.body2 || "Pick a time that works for you. Consultations happen by phone or Zoom, depending completely on your preference, and they always start right on time."}
                </p>
                {acf?.scheduleText && (
                  <a
                    href={acf?.scheduleLink || "#"}
                    className="mt-8 inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 px-8 h-[45px]"
                  >
                    {acf.scheduleText}
                  </a>
                )}
              </div>

              {/* Right: form → then calendar */}
              <div>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-muted p-8 md:p-10"
                    >
                      <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2">
                        Step 1 of 2
                      </p>
                      <h2 className="font-sans text-2xl md:text-3xl font-bold mb-1">
                        A Little About You
                      </h2>
                      <p className="text-sm text-foreground/60 mb-8">
                        Fill this out and we will get you straight to the calendar.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Name
                          </Label>
                          <Input
                            id="name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Address{" "}
                            <span className="text-foreground/40 font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="address"
                            placeholder="Property or home address"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="notes" className="text-sm font-medium">
                            Anything you would like me to know
                          </Label>
                          <textarea
                            id="notes"
                            rows={4}
                            placeholder="Share any details about your situation, goals, or questions..."
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            className="w-full rounded-none bg-white border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2.5 text-sm resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                          Continue to Booking
                          <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar"
                      id="calendar"
                      className="scroll-mt-32"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="bg-primary/10 border-l-4 border-primary px-5 py-4 mb-6">
                        <p className="text-sm font-medium text-foreground">
                          Thanks, {form.name.split(" ")[0] || "there"}! Now pick a time that works for you.
                        </p>
                      </div>

                      <CalendlyEmbed
                        url={acf?.calendlyUrl || DEFAULT_CALENDLY_URL}
                        name={form.name}
                        email={form.email}
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

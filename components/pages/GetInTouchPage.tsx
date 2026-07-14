"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const heroBedroomUrl = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";

export default function GetInTouch() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Get In Touch – Blake Hammond RE",
          Name: form.name,
          Email: form.email,
          Phone: form.phone,
          Message: form.message,
        }),
      });
    } catch {
      // show success regardless so UX is not blocked
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        {/* Hero with embedded form */}
        <section className="relative bg-foreground text-white overflow-hidden">
          <img
            src={heroBedroomUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40 select-none"
          />
          <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
                  Get in Touch
                </p>
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-white">
                  Let's Talk About<br />Your Next Move.
                </h1>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                  Whether you are buying, selling, or just exploring the market, every
                  message receives a personal reply. No call centers, no scripts, and
                  no generic answers.
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mt-5 italic">
                  P.S. In case you are wondering, yes, the hat says "Make Realtors
                  Great Again." And no, it is not political. It is a mindset. This
                  industry is full of mediocrity, and Blake is here to raise the bar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                <div className="bg-background text-foreground p-8 md:p-10 shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-primary text-primary-foreground">
                        <Mail className="w-7 h-7" strokeWidth={1.75} />
                      </div>
                      <h2 className="font-sans text-2xl md:text-3xl font-bold mb-3">
                        Message received.
                      </h2>
                      <p className="text-foreground/70 leading-relaxed">
                        Thanks for reaching out. A personal response will be sent to
                        your inbox within one business day.
                      </p>
                    </div>
                  ) : (
                  <>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    Send a Message
                  </p>
                  <h2 className="font-sans text-2xl md:text-3xl font-bold leading-tight mb-6">
                    Tell Us About Your Move.
                  </h2>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <Label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</Label>
                          <Input
                            id="name"
                            required
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              placeholder="Email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              placeholder="Phone Number"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                              className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message" className="block text-sm font-medium mb-1.5">How can I help you?</Label>
                          <Textarea
                            id="message"
                            required
                            rows={4}
                            placeholder="How can I help you?"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="rounded-none px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary resize-none"
                          />
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                          <Checkbox
                            id="agree"
                            required
                            checked={form.agree}
                            onCheckedChange={(checked) => setForm({ ...form, agree: checked === true })}
                            className="mt-0.5 rounded-none border-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor="agree" className="text-xs text-foreground/60 leading-relaxed font-normal cursor-pointer">
                            I accept the{" "}
                            <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
                        >
                          Submit
                        </Button>
                  </form>
                  </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl min-[1600px]:max-w-[1100px] mx-auto">
              <div className="bg-background p-8 md:p-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary/10 text-primary">
                  <Mail className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                  Email Anytime
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  A direct response will be sent as soon as possible, usually the
                  same day.
                </p>
                <a
                  href="mailto:blakehammondre@gmail.com"
                  className="font-sans font-semibold text-primary hover:underline break-all"
                >
                  blakehammondre@gmail.com
                </a>
              </div>
              <div className="bg-background p-8 md:p-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary/10 text-primary">
                  <Phone className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                  Call Or Text
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  If the line is busy, leave a voicemail or shoot over a text
                  message for a reply within 24 hours.
                </p>
                <a
                  href="tel:9166256118"
                  className="font-sans font-semibold text-primary hover:underline"
                >
                  (916) 625-6118
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

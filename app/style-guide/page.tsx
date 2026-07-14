"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Check, X, AlertCircle, Info, ChevronLeft, ChevronRight, Upload, Loader2 } from "lucide-react";
import Link from "next/link";

function ColorSwatch({ name, variable, className }: { name: string; variable: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2" data-testid={`swatch-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className={`w-16 h-16 rounded-full border ${className}`} />
      <span className="text-small font-medium">{name}</span>
      <code className="text-xs text-muted-foreground">{variable}</code>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="text-h3 mb-8 pb-4 border-b">{title}</h2>
      {children}
    </section>
  );
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function StyleGuide() {
  const [phone, setPhone] = useState("");
  const [mcPhone, setMcPhone] = useState("");
  const [mpPhone, setMpPhone] = useState("");

  const handlePhoneChange = useCallback((setter: (v: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(formatPhoneNumber(e.target.value));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h4" data-testid="page-title">Style Guide</h1>
              <p className="text-subheading text-muted-foreground mt-1">
                Visual reference for all design tokens
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" data-testid="link-back-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <Section title="Colors">
          <div className="space-y-8">
            <div>
              <h3 className="text-h6 mb-4">Brand Colors</h3>
              <div className="flex flex-wrap gap-8">
                <ColorSwatch name="Brand" variable="--color-brand" className="bg-brand" />
                <ColorSwatch name="Brand Foreground" variable="--color-brand-foreground" className="bg-brand-foreground border-2" />
                <ColorSwatch name="Accent" variable="--color-accent" className="bg-brand-accent" />
                <ColorSwatch name="Accent Foreground" variable="--color-accent-foreground" className="bg-brand-accent-foreground border-2" />
              </div>
            </div>
            
            <div>
              <h3 className="text-h6 mb-4">UI Colors</h3>
              <div className="flex flex-wrap gap-8">
                <ColorSwatch name="Background" variable="--background" className="bg-background border-2" />
                <ColorSwatch name="Foreground" variable="--foreground" className="bg-foreground" />
                <ColorSwatch name="Card" variable="--card" className="bg-card border-2" />
                <ColorSwatch name="Muted" variable="--muted" className="bg-muted" />
                <ColorSwatch name="Primary" variable="--primary" className="bg-primary" />
                <ColorSwatch name="Secondary" variable="--secondary" className="bg-secondary" />
                <ColorSwatch name="Destructive" variable="--destructive" className="bg-destructive" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-8">
            <div>
              <h3 className="text-h6 mb-4 text-muted-foreground">Brand Fonts</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">Sans — Inter (--font-sans, default)</span>
                  <p className="font-sans text-2xl" data-testid="font-sample-sans">The quick brown fox jumps over the lazy dog</p>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">Serif — Playfair Display (--font-serif, accent use)</span>
                  <p className="font-serif text-2xl italic" data-testid="font-sample-serif">The quick brown fox jumps over the lazy dog</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-h6 mb-6 text-muted-foreground">Headings</h3>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H1 - text-h1</span>
                  <h1 className="text-h1" data-testid="typography-h1">The quick brown fox</h1>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H2 - text-h2</span>
                  <h2 className="text-h2" data-testid="typography-h2">The quick brown fox</h2>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H3 - text-h3</span>
                  <h3 className="text-h3" data-testid="typography-h3">The quick brown fox</h3>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H4 - text-h4</span>
                  <h4 className="text-h4" data-testid="typography-h4">The quick brown fox</h4>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H5 - text-h5</span>
                  <h5 className="text-h5" data-testid="typography-h5">The quick brown fox</h5>
                </div>
                <div className="border-b pb-4">
                  <span className="text-small text-muted-foreground block mb-2">H6 - text-h6</span>
                  <h6 className="text-h6" data-testid="typography-h6">The quick brown fox</h6>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-h6 mb-6 text-muted-foreground">Body Text</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-small text-muted-foreground block mb-2">Body Large - text-body-lg</span>
                  <p className="text-body-lg" data-testid="typography-body-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div>
                  <span className="text-small text-muted-foreground block mb-2">Body - text-body</span>
                  <p className="text-body" data-testid="typography-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                </div>
                <div>
                  <span className="text-small text-muted-foreground block mb-2">Subheading - text-subheading</span>
                  <p className="text-subheading text-muted-foreground" data-testid="typography-subheading">
                    This is subheading text, perfect for introductions or supporting content.
                  </p>
                </div>
                <div>
                  <span className="text-small text-muted-foreground block mb-2">Small - text-small</span>
                  <p className="text-small" data-testid="typography-small">
                    Small text for captions, metadata, or fine print. Use sparingly for secondary information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Buttons">
          <div className="space-y-8">
            <div>
              <h3 className="text-h6 mb-4">Variants</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="default" data-testid="button-default">Default</Button>
                <Button variant="secondary" data-testid="button-secondary">Secondary</Button>
                <Button variant="outline" data-testid="button-outline">Outline</Button>
                <Button variant="ghost" data-testid="button-ghost">Ghost</Button>
                <Button variant="destructive" data-testid="button-destructive">Destructive</Button>
              </div>
            </div>

            <div>
              <h3 className="text-h6 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" data-testid="button-size-sm">Small</Button>
                <Button size="default" data-testid="button-size-default">Default</Button>
                <Button size="lg" data-testid="button-size-lg">Large</Button>
                <Button size="icon" data-testid="button-size-icon"><Check className="h-4 w-4" /></Button>
              </div>
            </div>

            <div>
              <h3 className="text-h6 mb-4">With Icons</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button className="group" data-testid="button-with-arrow">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" className="group" data-testid="button-outline-with-arrow">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-h6 mb-4">On Dark Background</h3>
              <div className="bg-foreground p-6 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/30" data-testid="button-dark-outline">
                    Outline on Dark
                  </Button>
                  <Button className="bg-brand-accent text-brand-accent-foreground hover:bg-[color-mix(in_srgb,hsl(var(--color-accent)),black_15%)]" data-testid="button-dark-accent">
                    Accent Button
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-testid="card-standard">
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>A basic card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Card content goes here. This is the default card style used throughout the application.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate cursor-pointer" data-testid="card-hoverable">
              <CardHeader>
                <CardTitle>Hoverable Card</CardTitle>
                <CardDescription>Hover to see elevation effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Use hover-elevate class to add subtle hover interactions to cards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand/30" data-testid="card-accent-border">
              <CardHeader>
                <CardTitle>Accent Border</CardTitle>
                <CardDescription>Card with brand accent border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body">
                  Apply border-brand class for emphasized cards.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Image Card with Hover Reveal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <Card className="group overflow-hidden relative h-64" data-testid="card-image-reveal">
                <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-accent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/10" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h4 className="text-h5">Card Title</h4>
                  <p className="text-small opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                    Description revealed on hover. Add more context or a call to action here.
                  </p>
                  <Button size="sm" className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </Section>

        <Section title="Badges">
          <div className="flex flex-wrap items-center gap-4">
            <Badge data-testid="badge-default">Default</Badge>
            <Badge variant="secondary" data-testid="badge-secondary">Secondary</Badge>
            <Badge variant="outline" data-testid="badge-outline">Outline</Badge>
            <Badge variant="destructive" data-testid="badge-destructive">Destructive</Badge>
          </div>
        </Section>

        <Section title="Links">
          <div className="space-y-6">
            <div>
              <h3 className="text-h6 mb-4">Inline Links</h3>
              <p className="text-body">
                This is a paragraph with an{" "}
                <a href="#" className="text-brand hover:underline" data-testid="link-inline">
                  inline link
                </a>{" "}
                styled with the brand color.
              </p>
            </div>

            <div>
              <h3 className="text-h6 mb-4">Navigation Links</h3>
              <div className="flex gap-6">
                <a href="#" className="text-foreground hover:text-brand transition-colors" data-testid="link-nav-1">
                  Navigation Link
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground hover:underline transition-colors" data-testid="link-nav-2">
                  Muted Link
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-h6 mb-4">Footer Links (on dark)</h3>
              <div className="bg-foreground p-6 rounded-lg">
                <div className="flex flex-col gap-3">
                  <span className="text-white font-semibold">Section Title</span>
                  <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors" data-testid="link-footer-1">
                    Footer Link One
                  </a>
                  <a href="#" className="text-white/70 hover:text-white hover:underline transition-colors" data-testid="link-footer-2">
                    Footer Link Two
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Forms (AxeWP/Gravity Forms)">
          <p className="text-body text-muted-foreground mb-4">
            Form elements match the AxeWP Gravity Forms schema. All fields use <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">gf-*</code> CSS classes for consistent styling.
          </p>
          <div className="mb-8 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Supported AxeWP Field Types</h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <Badge variant="outline">TEXT</Badge>
              <Badge variant="outline">TEXTAREA</Badge>
              <Badge variant="outline">EMAIL</Badge>
              <Badge variant="outline">NUMBER</Badge>
              <Badge variant="outline">PHONE</Badge>
              <Badge variant="outline">WEBSITE</Badge>
              <Badge variant="outline">SELECT</Badge>
              <Badge variant="outline">RADIO</Badge>
              <Badge variant="outline">CHECKBOX</Badge>
              <Badge variant="outline">MULTISELECT</Badge>
              <Badge variant="outline">DATE</Badge>
              <Badge variant="outline">TIME</Badge>
              <Badge variant="outline">FILEUPLOAD</Badge>
              <Badge variant="outline">HTML</Badge>
              <Badge variant="outline">SECTION</Badge>
              <Badge variant="outline">HIDDEN</Badge>
              <Badge variant="outline">PAGE</Badge>
              <Badge variant="outline">POST_TITLE</Badge>
              <Badge variant="outline">POST_EXCERPT</Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-h6 mb-4">Text Inputs</h3>
                <div className="space-y-4">
                  <div className="gf-field">
                    <Label htmlFor="demo-text" className="gf-label">Text Input</Label>
                    <Input id="demo-text" placeholder="Enter text here..." className="gf-input" data-testid="input-demo-text" />
                  </div>
                  <div className="gf-field">
                    <Label htmlFor="demo-email" className="gf-label">
                      Email Input <span className="text-destructive">*</span>
                    </Label>
                    <Input id="demo-email" type="email" placeholder="email@example.com" className="gf-input" data-testid="input-demo-email" />
                    <p className="text-sm text-muted-foreground mt-1">Helper text appears below the input</p>
                  </div>
                  <div className="gf-field">
                    <Label htmlFor="demo-disabled" className="gf-label">Disabled Input</Label>
                    <Input id="demo-disabled" disabled placeholder="Cannot edit" className="gf-input" data-testid="input-demo-disabled" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Textarea</h3>
                <div className="gf-field">
                  <Label htmlFor="demo-textarea" className="gf-label">Message</Label>
                  <Textarea id="demo-textarea" placeholder="Type your message..." className="gf-textarea" data-testid="input-demo-textarea" />
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Select Dropdown</h3>
                <div className="gf-field">
                  <Label className="gf-label">Choose an option</Label>
                  <Select>
                    <SelectTrigger className="gf-select" data-testid="select-demo">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option One</SelectItem>
                      <SelectItem value="option2">Option Two</SelectItem>
                      <SelectItem value="option3">Option Three</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-h6 mb-4">Radio Buttons</h3>
                <div className="gf-field">
                  <Label className="gf-label">Select one option</Label>
                  <RadioGroup defaultValue="radio1" className="gf-radio-group">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="radio1" id="demo-radio1" data-testid="radio-demo-1" />
                      <Label htmlFor="demo-radio1" className="font-normal cursor-pointer">Radio Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="radio2" id="demo-radio2" data-testid="radio-demo-2" />
                      <Label htmlFor="demo-radio2" className="font-normal cursor-pointer">Radio Option Two</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="radio3" id="demo-radio3" data-testid="radio-demo-3" />
                      <Label htmlFor="demo-radio3" className="font-normal cursor-pointer">Radio Option Three</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Checkboxes</h3>
                <div className="gf-field">
                  <Label className="gf-label">Select multiple options</Label>
                  <div className="gf-checkbox-group">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="demo-check1" data-testid="checkbox-demo-1" />
                      <Label htmlFor="demo-check1" className="font-normal cursor-pointer">Checkbox Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="demo-check2" defaultChecked data-testid="checkbox-demo-2" />
                      <Label htmlFor="demo-check2" className="font-normal cursor-pointer">Checkbox Option Two (checked)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="demo-check3" data-testid="checkbox-demo-3" />
                      <Label htmlFor="demo-check3" className="font-normal cursor-pointer">Checkbox Option Three</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Date Input (Calendar Picker)</h3>
                <div className="gf-field">
                  <Label htmlFor="demo-date" className="gf-label">Select a date</Label>
                  <p className="text-sm text-muted-foreground mb-2">Click anywhere on the field to open the calendar picker</p>
                  <button
                    type="button"
                    className="gf-input flex items-center gap-2 w-full text-left border rounded-md px-3 py-2 bg-background hover:bg-accent/30 transition-colors"
                    data-testid="input-demo-date-picker"
                  >
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 -rotate-45" />
                    <span className="text-muted-foreground">Select a date</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Time Input</h3>
                <div className="gf-field">
                  <Label className="gf-label">Select a time</Label>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex items-center gap-1">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="HH"
                        className="gf-input w-14 text-center"
                        maxLength={2}
                        data-testid="input-demo-time-hour"
                      />
                      <span className="text-lg font-medium">:</span>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="MM"
                        className="gf-input w-14 text-center"
                        maxLength={2}
                        data-testid="input-demo-time-minute"
                      />
                      <Select defaultValue="AM">
                        <SelectTrigger className="w-20" data-testid="select-demo-time-ampm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Number Input</h3>
                <div className="gf-field">
                  <Label htmlFor="demo-number" className="gf-label">Quantity</Label>
                  <Input id="demo-number" type="number" placeholder="0" min={0} max={100} className="gf-input" data-testid="input-demo-number" />
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Phone Input</h3>
                <div className="gf-field gf-field-phone">
                  <Label htmlFor="demo-phone" className="gf-label">Phone Number</Label>
                  <Input id="demo-phone" type="tel" placeholder="(555) 123-4567" className="gf-input" data-testid="input-demo-phone" value={phone} onChange={handlePhoneChange(setPhone)} />
                </div>
              </div>

              <div>
                <h3 className="text-h6 mb-4">Website Input</h3>
                <div className="gf-field gf-field-website">
                  <Label htmlFor="demo-website" className="gf-label">Website URL</Label>
                  <Input id="demo-website" type="url" placeholder="https://example.com" className="gf-input" data-testid="input-demo-website" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Section Field (SECTION type)</h3>
            <div className="gf-field gf-field-section border-b pb-4">
              <h3 className="text-lg font-semibold">Section Title</h3>
              <p className="text-muted-foreground">Section description text that provides context for the fields below.</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">HTML Field (HTML type)</h3>
            <div className="gf-field gf-field-html p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-blue-800 dark:text-blue-200">
                This is an HTML field. It displays custom HTML content and is read-only.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Form in Card (Gravity Forms style)</h3>
            <Card className="gf-form max-w-md" data-testid="card-form-demo">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Fill out the form below and we will get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="gf-field">
                    <Label htmlFor="card-name" className="gf-label">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input id="card-name" placeholder="Your name" className="gf-input" data-testid="input-card-name" />
                  </div>
                  <div className="gf-field">
                    <Label htmlFor="card-email" className="gf-label">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input id="card-email" type="email" placeholder="you@example.com" className="gf-input" data-testid="input-card-email" />
                  </div>
                  <div className="gf-field">
                    <Label htmlFor="card-message" className="gf-label">Message</Label>
                    <Textarea id="card-message" placeholder="How can we help?" className="gf-textarea" data-testid="input-card-message" />
                  </div>
                  <Button className="w-full" data-testid="button-card-submit">Submit</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Multi-Column Layout (12-column grid)</h3>
            <p className="text-body text-muted-foreground mb-4">
              Gravity Forms 2.5+ uses a 12-column grid system. Fields use <code className="text-sm bg-muted px-1 py-0.5 rounded">layoutGridColumnSpan</code> to set their width.
              Columns stack vertically on mobile (below 640px).
            </p>
            <Card className="gf-form" data-testid="card-multicolumn-demo">
              <CardHeader>
                <CardTitle>Multi-Column Form</CardTitle>
                <CardDescription>Demonstrating various column span configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="gf-fields-grid">
                  <div className="gf-field-column" style={{ gridColumn: 'span 6 / span 6' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-first" className="gf-label">First Name <span className="text-destructive">*</span></Label>
                      <Input id="mc-first" placeholder="First" className="gf-input" data-testid="input-mc-first" />
                      <span className="text-xs text-muted-foreground">span 6</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 6 / span 6' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-last" className="gf-label">Last Name <span className="text-destructive">*</span></Label>
                      <Input id="mc-last" placeholder="Last" className="gf-input" data-testid="input-mc-last" />
                      <span className="text-xs text-muted-foreground">span 6</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 12 / span 12' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-email" className="gf-label">Email <span className="text-destructive">*</span></Label>
                      <Input id="mc-email" type="email" placeholder="you@example.com" className="gf-input" data-testid="input-mc-email" />
                      <span className="text-xs text-muted-foreground">span 12 (full width)</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 4 / span 4' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-city" className="gf-label">City</Label>
                      <Input id="mc-city" placeholder="City" className="gf-input" data-testid="input-mc-city" />
                      <span className="text-xs text-muted-foreground">span 4</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 4 / span 4' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-state" className="gf-label">State</Label>
                      <Input id="mc-state" placeholder="State" className="gf-input" data-testid="input-mc-state" />
                      <span className="text-xs text-muted-foreground">span 4</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 4 / span 4' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-zip" className="gf-label">ZIP</Label>
                      <Input id="mc-zip" placeholder="ZIP" className="gf-input" data-testid="input-mc-zip" />
                      <span className="text-xs text-muted-foreground">span 4</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 8 / span 8' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-phone" className="gf-label">Phone</Label>
                      <Input id="mc-phone" type="tel" placeholder="(555) 123-4567" className="gf-input" data-testid="input-mc-phone" value={mcPhone} onChange={handlePhoneChange(setMcPhone)} />
                      <span className="text-xs text-muted-foreground">span 8</span>
                    </div>
                  </div>
                  <div className="gf-field-column" style={{ gridColumn: 'span 4 / span 4' }}>
                    <div className="gf-field">
                      <Label htmlFor="mc-ext" className="gf-label">Ext</Label>
                      <Input id="mc-ext" placeholder="Ext" className="gf-input" data-testid="input-mc-ext" />
                      <span className="text-xs text-muted-foreground">span 4</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full" data-testid="button-mc-submit">Submit</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Multi-Page Form Navigation</h3>
            <Card className="max-w-lg" data-testid="card-multipage-demo">
              <CardHeader>
                <CardTitle>Step 2 of 3</CardTitle>
                <CardDescription>Contact Information</CardDescription>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-2 flex-1 rounded-full bg-primary" />
                  <div className="h-2 flex-1 rounded-full bg-primary" />
                  <div className="h-2 flex-1 rounded-full bg-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="gf-field">
                    <Label htmlFor="multipage-email" className="gf-label">Email</Label>
                    <Input id="multipage-email" type="email" placeholder="you@example.com" className="gf-input" data-testid="input-multipage-email" />
                  </div>
                  <div className="gf-field">
                    <Label htmlFor="multipage-phone" className="gf-label">Phone</Label>
                    <Input id="multipage-phone" type="tel" placeholder="(555) 123-4567" className="gf-input" data-testid="input-multipage-phone" value={mpPhone} onChange={handlePhoneChange(setMpPhone)} />
                  </div>
                </div>
                <div className="flex justify-between gap-4 mt-6">
                  <Button variant="outline" data-testid="button-prev-page">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button data-testid="button-next-page">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Submit Button States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button data-testid="button-submit-default">Submit</Button>
              <Button disabled data-testid="button-submit-disabled">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </Button>
              <Button disabled data-testid="button-submit-disabled-plain">Submit (Disabled)</Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">File Upload</h3>
            <div className="max-w-md space-y-4">
              <div className="gf-field">
                <Label htmlFor="demo-file" className="gf-label">Upload Document</Label>
                <label
                  htmlFor="demo-file"
                  className="flex items-center gap-3 p-3 border rounded-md bg-background cursor-pointer hover:bg-accent/30 transition-colors"
                >
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                    Choose File
                  </span>
                  <span className="text-muted-foreground text-sm">No file chosen</span>
                  <input
                    id="demo-file"
                    type="file"
                    className="sr-only"
                    data-testid="input-file-upload"
                  />
                </label>
                <p className="text-sm text-muted-foreground mt-1">Accepted formats: PDF, DOC, DOCX (max 10MB)</p>
              </div>

              <div className="gf-field">
                <Label className="gf-label">Drag and Drop Upload</Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-accent/20 transition-colors cursor-pointer"
                  data-testid="dropzone-file-upload"
                >
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-body text-muted-foreground">Drag files here or click to browse</p>
                  <p className="text-small text-muted-foreground mt-1">PDF, DOC up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-h6 mb-4">Field Validation States</h3>
            <p className="text-body text-muted-foreground mb-4">
              Fields validate on blur (when you leave the field) and on form submission. Validation uses Gravity Forms schema rules for each field type.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="gf-field">
                  <Label htmlFor="val-email" className="gf-label">
                    Email (Invalid) <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="val-email" 
                    type="email" 
                    value="not-an-email" 
                    className="gf-input border-destructive" 
                    readOnly
                    aria-invalid="true"
                    data-testid="input-validation-email-invalid" 
                  />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Please enter a valid email address
                  </p>
                </div>
                <div className="gf-field">
                  <Label htmlFor="val-phone" className="gf-label">
                    Phone (Invalid) <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="val-phone" 
                    type="tel" 
                    value="abc123" 
                    className="gf-input border-destructive" 
                    readOnly
                    aria-invalid="true"
                    data-testid="input-validation-phone-invalid" 
                  />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Phone number can only contain digits, spaces, dashes, parentheses, and +
                  </p>
                </div>
                <div className="gf-field">
                  <Label htmlFor="val-number" className="gf-label">
                    Number (Out of Range)
                  </Label>
                  <Input 
                    id="val-number" 
                    type="number" 
                    value="150" 
                    className="gf-input border-destructive" 
                    readOnly
                    aria-invalid="true"
                    data-testid="input-validation-number-invalid" 
                  />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Value must be no more than 100
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="gf-field">
                  <Label htmlFor="val-required" className="gf-label">
                    Required Field (Empty) <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="val-required" 
                    placeholder="This field is required" 
                    className="gf-input border-destructive" 
                    aria-invalid="true"
                    data-testid="input-validation-required" 
                  />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    This field is required
                  </p>
                </div>
                <div className="gf-field">
                  <Label htmlFor="val-url" className="gf-label">
                    Website URL (Invalid)
                  </Label>
                  <Input 
                    id="val-url" 
                    type="url" 
                    value="not a url" 
                    className="gf-input border-destructive" 
                    readOnly
                    aria-invalid="true"
                    data-testid="input-validation-url-invalid" 
                  />
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Please enter a valid URL (e.g., https://example.com)
                  </p>
                </div>
                <div className="gf-field">
                  <Label htmlFor="val-file" className="gf-label">
                    File Upload (Invalid Type)
                  </Label>
                  <div className="flex items-center gap-3 p-3 border border-destructive rounded-md bg-background">
                    <span className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-muted text-muted-foreground text-sm font-medium">
                      Choose File
                    </span>
                    <span className="text-sm truncate">document.exe</span>
                  </div>
                  <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    File type not allowed. Allowed types: pdf, doc, docx
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-semibold mb-2">Supported Validation Rules</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">Required fields</Badge>
                <Badge variant="outline">Email format</Badge>
                <Badge variant="outline">Phone format (US/International)</Badge>
                <Badge variant="outline">URL format</Badge>
                <Badge variant="outline">Number range (min/max)</Badge>
                <Badge variant="outline">File type restrictions</Badge>
                <Badge variant="outline">File size limits</Badge>
                <Badge variant="outline">Date validation</Badge>
                <Badge variant="outline">Time validation</Badge>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h4 className="text-h6 mb-2">CSS Variables</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
              <code>--form-field-spacing</code>
              <code>--form-label-weight</code>
              <code>--form-label-size</code>
              <code>--form-input-bg</code>
              <code>--form-input-border</code>
              <code>--form-input-focus-ring</code>
              <code>--form-placeholder</code>
              <code>--form-radio-checked</code>
              <code>--form-checkbox-checked</code>
            </div>
          </div>
        </Section>

        <Section title="Spacing Reference">
          <div className="space-y-4">
            <p className="text-body text-muted-foreground mb-6">
              Use Tailwind spacing units consistently. Below are the recommended spacing values.
            </p>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                <div key={size} className="flex flex-col items-center">
                  <div
                    className="bg-brand"
                    style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
                  />
                  <span className="text-small mt-2">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Alerts & Notifications">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800" data-testid="alert-info">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">Information</p>
                <span className="text-body text-blue-700 dark:text-blue-300">This is an informational message.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800" data-testid="alert-success">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">Success</p>
                <span className="text-body text-green-700 dark:text-green-300">Operation completed successfully.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800" data-testid="alert-warning">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Warning</p>
                <span className="text-body text-yellow-700 dark:text-yellow-300">Please review before proceeding.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800" data-testid="alert-error">
              <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Error</p>
                <span className="text-body text-red-800 dark:text-red-200">Something went wrong. Please try again.</span>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

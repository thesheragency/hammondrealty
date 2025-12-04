# Design System Guidelines

This file defines the design system for this project. The Replit agent automatically references this file when making frontend changes to ensure consistency.

> **Live Preview:** Visit `/style-guide` to see all design tokens rendered visually.

---

## Quick Start: How to Customize

1. **Colors:** Edit CSS variables in `client/src/index.css` under the "DESIGN TOKENS" section
2. **Typography:** Edit the typography variables in the same section
3. **Fonts:** Replace `--font-heading` and `--font-body` values
4. **Preview:** Open `/style-guide` to see your changes live

---

## Color Palette

Define your brand colors in `client/src/index.css`. The boilerplate uses semantic naming:

| Token | Purpose | Example Value |
|-------|---------|---------------|
| `--color-brand` | Primary brand color (CTAs, links) | `217 91% 35%` (blue) |
| `--color-brand-foreground` | Text on brand backgrounds | `0 0% 98%` (white) |
| `--color-accent` | Secondary accent (highlights) | `24 95% 53%` (orange) |
| `--color-accent-foreground` | Text on accent backgrounds | `0 0% 98%` (white) |
| `--background` | Page background | `0 0% 100%` (white) |
| `--foreground` | Default text color | `0 0% 9%` (near-black) |
| `--muted` | Subtle backgrounds | `0 0% 92%` (light gray) |
| `--muted-foreground` | Secondary/muted text | `0 0% 35%` (gray) |

### How to Set Custom Colors

```css
/* Example: Navy + Orange brand */
:root {
  --color-brand: 220 60% 15%;        /* Deep navy */
  --color-accent: 24 95% 53%;        /* Vibrant orange */
  --background: 40 20% 97%;          /* Warm off-white */
}
```

---

## Typography Scale

### Font Families

| Token | Default | Purpose |
|-------|---------|---------|
| `--font-heading` | Inter, system-ui, sans-serif | H1-H6 headings |
| `--font-body` | Inter, system-ui, sans-serif | Body text, buttons, UI |
| `--font-mono` | 'Fira Code', Menlo, monospace | Code blocks |

### Headings (H1-H6)

| Element | CSS Class | Desktop | Mobile | Weight | Line Height | Tracking |
|---------|-----------|---------|--------|--------|-------------|----------|
| H1 | `.text-h1` | 78px | 54px | 500 | 1.0 | -0.02em |
| H2 | `.text-h2` | 64px | 44px | 500 | 1.08 | -0.02em |
| H3 | `.text-h3` | 40px | 34px | 500 | 1.08 | -0.01em |
| H4 | `.text-h4` | 32px | 28px | 500 | 1.08 | -0.01em |
| H5 | `.text-h5` | 24px | 24px | 500 | 1.2 | -0.01em |
| H6 | `.text-h6` | 20px | 20px | 500 | 1.2 | -0.01em |

### Body Text

| Type | CSS Class | Size | Weight | Line Height | Tracking |
|------|-----------|------|--------|-------------|----------|
| Body | `.text-body` | 16px | 400 | 1.5 | 0.01em |
| Body Large | `.text-body-lg` | 18px | 400 | 1.5 | 0.01em |
| Small | `.text-small` | 14px | 400 | 1.5 | 0.01em |
| Subheading | `.text-subheading` | 18px | 350 | 1.5 | 0.01em |
| Button Text | `.text-button` | 16px | 400 | 1.5 | 0.03em |

### Usage Example

```tsx
<h1 className="text-h1">Main Heading</h1>
<h2 className="text-h2">Section Title</h2>
<p className="text-body">Regular paragraph text.</p>
<p className="text-subheading text-muted-foreground">Subtitle or intro text.</p>
```

---

## Button Styles

Use the shadcn `<Button>` component. Available variants:

### Variants

| Variant | Use Case | Appearance |
|---------|----------|------------|
| `default` | Primary CTAs | Brand color background |
| `secondary` | Secondary actions | Muted background |
| `outline` | Tertiary actions | Transparent with border |
| `ghost` | Subtle actions | Transparent, hover reveals |
| `destructive` | Dangerous actions | Red background |

### Sizes

| Size | Use Case |
|------|----------|
| `sm` | Compact UI, toolbars |
| `default` | Standard buttons |
| `lg` | Hero CTAs, prominent actions |
| `icon` | Icon-only buttons |

### Button with Arrow Pattern

```tsx
<Button className="group">
  Get Started
  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</Button>
```

---

## Card Styles

Use the shadcn `<Card>` component.

### Standard Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Image Card with Hover Reveal

```tsx
<Card className="group overflow-hidden relative">
  <img src="..." className="transition-transform group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
  <div className="absolute bottom-0 p-4">
    <h3 className="text-white text-h5">Title</h3>
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <p className="text-white/80 text-small mt-2">Description</p>
      <Button size="sm" className="mt-3">Learn More</Button>
    </div>
  </div>
</Card>
```

---

## Link Styles

### Body Links
- Color: Use `text-brand` or `text-primary`
- Hover: Underline appears (`hover:underline`)

### Navigation Links
- Color: `text-foreground`
- Hover: `text-brand` or underline

### Footer Links
- Color: `text-foreground` or `text-muted-foreground`
- Hover: Underline appears
- Section headers: Bold, uppercase or larger weight

---

## Spacing Scale

Use Tailwind's spacing with these recommended values:

| Name | Tailwind | Pixels | Use Case |
|------|----------|--------|----------|
| xs | 1 | 4px | Icon gaps, tight spacing |
| sm | 2 | 8px | Button padding, small gaps |
| md | 4 | 16px | Card padding, component gaps |
| lg | 6 | 24px | Section spacing |
| xl | 8 | 32px | Large gaps |
| 2xl | 12 | 48px | Hero sections |
| 3xl | 16 | 64px | Page sections |

---

## Border Radius

| Token | Tailwind | Pixels | Use Case |
|-------|----------|--------|----------|
| sm | `rounded-sm` | 3px | Small badges |
| md | `rounded-md` | 6px | Buttons, inputs |
| lg | `rounded-lg` | 9px | Cards, modals |
| full | `rounded-full` | 9999px | Pills, avatars |

---

## Layout Patterns

### Container
```tsx
<div className="container mx-auto px-4 max-w-7xl">
```

### Content Width
- Full content: `max-w-7xl`
- Article/prose: `max-w-4xl`
- Narrow focus: `max-w-2xl`

### Grid Patterns
```tsx
{/* 3-column cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* 2-column with sidebar */}
<div className="grid lg:grid-cols-3 gap-8">
  <main className="lg:col-span-2">...</main>
  <aside>...</aside>
</div>
```

---

## Dark Mode

All color tokens have automatic dark mode variants defined in `.dark {}` in index.css.

The theme applies automatically based on:
1. User's system preference, OR
2. `.dark` class on `<html>` element

---

## Responsive Breakpoints

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (none) | 0px |
| Tablet | `md:` | 768px |
| Desktop | `lg:` | 1024px |
| Wide | `xl:` | 1280px |

---

## Customization Checklist

When setting up a new site from this boilerplate:

- [ ] Update `--color-brand` with primary brand color
- [ ] Update `--color-accent` with secondary accent
- [ ] Set `--font-heading` if using custom heading font
- [ ] Set `--font-body` if using custom body font
- [ ] Adjust heading sizes if brand requires different scale
- [ ] Update `--background` for tinted backgrounds
- [ ] Test dark mode colors and contrast
- [ ] Visit `/style-guide` to verify all tokens visually

---

## File Locations

| What | Where |
|------|-------|
| CSS Variables & Typography | `client/src/index.css` (DESIGN TOKENS section) |
| Tailwind Config | `tailwind.config.ts` |
| Button Component | `client/src/components/ui/button.tsx` |
| Card Component | `client/src/components/ui/card.tsx` |
| Style Guide Page | `client/src/pages/style-guide.tsx` |
| This Document | `design_guidelines.md` |

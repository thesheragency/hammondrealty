# Headless WordPress Boilerplate Design Guidelines

## Design Approach

**Selected Approach:** Clean Developer-Focused Foundation
This boilerplate requires a neutral, well-structured design that developers can easily customize. Drawing inspiration from developer tools like Vercel, Next.js documentation, and GitHub's interface aesthetic - clean, systematic, and unopinionated.

**Core Principle:** Provide a professional foundation with clear hierarchy and structure while maintaining maximum customizability.

---

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - clean, modern, excellent readability
- Monospace: 'Fira Code' for code snippets/technical content

**Hierarchy:**
- Hero/H1: text-5xl (48px) font-bold, tracking-tight
- H2: text-3xl (30px) font-semibold
- H3: text-xl (20px) font-semibold
- Body: text-base (16px) font-normal, leading-relaxed
- Small/Meta: text-sm (14px)
- Code/Technical: text-sm font-mono

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-24
- Card gaps: gap-6, gap-8
- Container max-width: max-w-7xl

**Grid System:**
- Project cards: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Single column content: max-w-4xl mx-auto
- Two-column detail view: grid lg:grid-cols-3 (sidebar + content)

---

## Component Library

### Navigation
- Fixed header with container max-w-7xl
- Logo/site title on left
- Horizontal nav links on right
- Mobile: Hamburger menu with slide-in drawer
- Height: h-16

### Project Card
- Structured card with defined sections
- Featured image placeholder (16:9 aspect ratio)
- Title (text-xl font-semibold)
- Excerpt/description (text-sm, line-clamp-3)
- Meta info: date, category (text-xs)
- Subtle border, rounded-lg
- Hover state: subtle elevation change

### Project Detail Layout
- Hero section with featured image (if available)
- Breadcrumb navigation
- Content area: max-w-4xl for readability
- Sidebar (if needed): Category, tags, related projects
- SEO metadata rendered in <head>

### 404 Page
- Centered layout (min-h-screen flex items-center justify-center)
- Large "404" display (text-9xl font-bold)
- Clear error message (text-xl)
- "Return Home" CTA button
- Minimal, focused design

### Sync Status Component
- Display last sync timestamp
- Sync button with loading state
- Success/error message display
- Position: Admin header or settings area

---

## Forms & Inputs

**Preview Token Input:**
- Label above input
- Input: h-12, px-4, rounded-lg, border
- Button: h-12, px-6, rounded-lg, font-medium
- Inline form layout on desktop, stacked on mobile

---

## SEO Meta Components

**Meta Tag Rendering:**
- Server-side rendered in <head>
- Include: title, meta description, canonical URL
- OpenGraph: og:title, og:description, og:image, og:type
- Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
- Display preview in development mode (optional debug component)

---

## Content Presentation

**WordPress Content Display:**
- Rich text content: prose prose-lg (Tailwind Typography)
- Images: Full-width within content, rounded corners
- Code blocks: Syntax highlighting with subtle background
- Block quotes: Left border accent, italic text
- Lists: Proper spacing and indentation

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px-1024px (2-column grids)
- Desktop: > 1024px (3-column grids, full layout)

**Mobile Optimizations:**
- Hamburger navigation
- Stacked cards
- Reduced padding (p-4 instead of p-8)
- Full-width images

---

## Images

**Hero Image:** 
Large featured image for project detail pages (16:9 ratio, full-width container). For project listing pages, no hero image needed.

**Project Cards:**
16:9 aspect ratio thumbnails/featured images pulled from ACF fields, placeholder gray rectangle if no image available.

**Content Images:**
Inline WordPress content images displayed at natural size within prose container, responsive scaling.

---

## Animations

**Minimal Motion:**
- Card hover: subtle scale (hover:scale-[1.02]) and shadow
- Page transitions: Simple fade-in on mount
- Loading states: Spinning icon for sync operations
- No elaborate scroll animations or parallax

---

## Developer Experience Features

**Preview Mode Indicator:**
- Fixed banner at top when in preview mode
- Shows preview status and exit button
- Background: Warning tone, small text

**Error States:**
- Clear error messages for API failures
- Retry mechanisms for failed syncs
- Graceful degradation when WordPress unavailable

---

This foundation provides a clean, professional starting point that developers can easily customize while maintaining excellent UX and proper WordPress integration patterns.
# Frontend Improvement TODO
## Vision Coaching Institute — Full Audit & Roadmap

> Generated: 2026-03-05 | Auditor: Frontend Architect Review
> Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP · Framer Motion · Three.js (R3F)

---

## Audit Summary

### What's Working Well ✅
- Solid design token system in `globals.css` (CSS variables for spacing, typography, colour)
- Consistent layout container (`.layout-container`, `.section-pad`, `.section-inner`, `.item-gap`)
- Good button system (`.btn-primary`, `.btn-secondary`, `.btn-whatsapp`, `.btn-nav`)
- Accessibility skip-link, `aria-label` on sections, keyboard-aware lightbox
- Mobile sticky booking bar with safe-area insets
- Smooth scroll-reveal, GSAP entrance animations, Framer Motion carousels
- i18n support (en/hi) via LanguageContext
- Sitemap + JSON-LD schema + Open Graph meta

### Critical Problems Found 🔴
- `globals.css`: `user-select: none` on `*` — breaks text selection site-wide
- `layout.tsx`: icon references to deleted files (`/apple-touch-icon.png`, `/favicon-32.png` old naming, `/icon-192.png`, `/icon-512.png`)
- `Features.tsx`: `DESCS` array is hardcoded English inside a component, bypassing i18n
- `FeeCard.tsx` & `Contact.tsx`: Form submits silently on invalid input — no visible error feedback
- `Results.tsx`: Topper data is fabricated (placeholder names/percentages)
- Google Fonts `@import` in CSS is render-blocking — hurts LCP
- No `robots.txt` in `/public`
- Stray file: `src/lib/three/OrbitRing.txt`
- Copyright year hardcoded as `2025` in footer i18n

---

## HIGH PRIORITY — Critical Fixes

### H-1 · Remove global `user-select: none`
- **File:** `src/app/globals.css` — line: `*, *::before, *::after { ... user-select: none; }`
- **Problem:** Users cannot select, copy, or highlight any text anywhere on the site. Catastrophic UX and accessibility failure. Screen readers are also affected.
- **Impact:** HIGH — Violates WCAG 2.1 §1.3, destroys trust, hurts SEO (Google penalises non-selectable text).
- **Fix:** Remove `user-select: none` from the `*` reset entirely. Add a `.no-select` utility class and apply only where genuinely needed (e.g., carousel drag handles, icon-only buttons).

```css
/* REMOVE from globals.css */
/* user-select: none; -webkit-user-select: none; */

/* ADD utility class */
.no-select { user-select: none; -webkit-user-select: none; }
```

---

### H-2 · Fix broken icon references in layout.tsx
- **File:** `src/app/layout.tsx`
- **Problem:** Icons reference `/apple-touch-icon.png`, `/favicon-32.png` (old name), `/icon-192.png`, `/icon-512.png` — all deleted in the last commit. Browsers get 404s on every page load.
- **Impact:** HIGH — Broken favicons in browser tabs, bad for PWA/bookmarking, 404s in logs.
- **Fix:** Update `metadata.icons` to match actual files in `/public`:

```ts
icons: {
  icon: [
    { url: "/favicon.ico",    sizes: "any" },
    { url: "/favicon_32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon_48.png", sizes: "48x48", type: "image/png" },
    { url: "/favicon_16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: { url: "/favicon_180.png", sizes: "180x180", type: "image/png" },
  shortcut: "/favicon.ico",
},
```

---

### H-3 · Fix render-blocking Google Fonts
- **File:** `src/app/globals.css` — first line: `@import url('https://fonts.googleapis.com/...')`
- **Problem:** CSS `@import` from Google Fonts is synchronous and render-blocking. The browser must download the font stylesheet before painting anything. This directly increases LCP (Largest Contentful Paint) by 300–800ms on slow connections (common in Tulsipur).
- **Impact:** HIGH — Core Web Vitals failure, poor mobile performance, Vercel Analytics will show bad LCP scores.
- **Fix:** Move to `next/font` in `layout.tsx` for self-hosted, zero-render-block fonts:

```tsx
// src/app/layout.tsx
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

// Apply to <html>:
<html className={`${playfair.variable} ${inter.variable} ${notoDevanagari.variable} scroll-smooth`}>
```

Then remove the `@import url(...)` line from `globals.css`.

---

### H-4 · Add form validation feedback (Contact + FeeCard)
- **Files:** `src/components/sections/Contact.tsx`, `src/components/sections/FeeCard.tsx`
- **Problem:** Both forms silently fail when name/phone are empty — `if (!name.trim() || !phone.trim()) return;` with no user feedback. Users think the button is broken.
- **Impact:** HIGH — Conversion killer. A confused user leaves.
- **Fix:** Add error state per field + phone regex validation:

```tsx
const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

const validate = () => {
  const e: typeof errors = {};
  if (!name.trim()) e.name = "Please enter the student's name.";
  const phoneClean = phone.replace(/\D/g, "");
  if (!phoneClean) e.phone = "Please enter a mobile number.";
  else if (!/^[6-9]\d{9}$/.test(phoneClean)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  setErrors(e);
  return Object.keys(e).length === 0;
};

const submit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  // ... rest of submit
};
```

Show `errors.name` and `errors.phone` as small red text below each input.

---

### H-5 · Replace fake topper data with real data or anonymise
- **File:** `src/lib/i18n/en.json` → `results.toppers`
- **Problem:** Names like "Aarav Gupta 98.6%" are fictional placeholders. A parent who Googles these names will find no match and lose trust immediately.
- **Impact:** HIGH — Destroys credibility. This is a trust-critical section for a coaching institute.
- **Fix (Option A):** Replace with real students (get written permission).
- **Fix (Option B):** Use anonymised entries: `"name": "A. Gupta"`, `"percentage": "98%"`, no year.
- **Fix (Option C):** Remove names, show only aggregate stats + board-wise pass percentages.

---

### H-6 · Add `robots.txt`
- **Location:** `/public/robots.txt`
- **Problem:** No robots.txt exists. Search crawlers have no guidance on what to index.
- **Impact:** MEDIUM-HIGH — Suboptimal crawl budget, Google may index things it shouldn't (e.g., `/opengraph-image`).
- **Fix:** Create `/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://vision-coaching-institute.vercel.app/sitemap.xml
```

---

## MEDIUM PRIORITY — Design System & UX Improvements

### M-1 · Fix i18n bypass in Features.tsx
- **File:** `src/components/sections/Features.tsx`
- **Problem:** `const DESCS = [...]` hardcodes English descriptions inside the component, ignoring the language system. When users switch to Hindi, the card descriptions stay in English.
- **Fix:** Move `DESCS` into `en.json` and `hi.json` under `features.items[].desc`, then read from `t.features.items[i].desc` in the component. Remove the hardcoded array.

---

### M-2 · Fix copyright year in footer
- **File:** `src/lib/i18n/en.json` + `hi.json` → `footer.copyright`
- **Problem:** `"© 2025 Vision Coaching Institute..."` — it is 2026.
- **Fix (permanent):** Don't put the year in the i18n JSON at all. Instead compute it dynamically in the Footer component:

```tsx
<span>© {new Date().getFullYear()} Vision Coaching Institute, Tulsipur. All rights reserved.</span>
```

---

### M-3 · Three.js Hero scene on low-end mobile
- **File:** `src/components/ui/HeroSceneLoader.tsx`, `src/lib/three/HeroScene.tsx`
- **Problem:** The WebGL 3D canvas loads on all devices including low-end Android phones running on 2G/3G (common in Tulsipur/Balrampur district). This causes severe jank, battery drain, and potential crashes.
- **Impact:** MEDIUM — Hurts Core Web Vitals (TBT / FID) on the most common visitor device type.
- **Fix:** Skip the 3D scene on mobile/low-end devices:

```tsx
// HeroSceneLoader.tsx
import { useEffect, useState } from "react";

export default function HeroSceneLoader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Only load on non-touch, non-low-memory devices
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const isLowEnd = (navigator as any).deviceMemory < 4;
    if (!isMobile && !isLowEnd) setShow(true);
  }, []);
  if (!show) return <HeroFallbackImage />;
  return <Suspense fallback={null}><HeroScene /></Suspense>;
}
```

Replace the scene on mobile with a static image of the institute or a simple CSS animation.

---

### M-4 · Gallery section — add proper Next.js Image optimization
- **File:** `src/components/sections/Gallery.tsx`
- **Problem:** Photos use `<Image fill>` which is good, but there is no `placeholder="blur"` or `blurDataURL` — images pop in without any visual placeholder. Also, the `sizes` attribute on mobile cards (`100vw`) causes the browser to download full-resolution images even for small thumbnails.
- **Fix:**
  1. Add correct `sizes` per breakpoint: `"(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"`
  2. Add `placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."` (generate with `next-blur` or a tiny 8px version)
  3. Add `loading="lazy"` on all non-featured gallery images

---

### M-5 · Audit and fix Hindi i18n completeness
- **File:** `src/lib/i18n/hi.json`
- **Problem:** Not reviewed — likely incomplete or copied from English with missing translations, especially for newer keys added post-launch (`enquiryForm`, `feeCard`, `faq`).
- **Fix:** Do a key-diff between `en.json` and `hi.json`. Every key in `en.json` must have a corresponding translated value in `hi.json`. Missing keys will render English text even in Hindi mode.

```bash
# Quick diff check:
node -e "
  const en = Object.keys(require('./src/lib/i18n/en.json'));
  const hi = Object.keys(require('./src/lib/i18n/hi.json'));
  const missing = en.filter(k => !hi.includes(k));
  console.log('Missing in hi.json:', missing);
"
```

---

### M-6 · Faculty photos — confirm files exist or add fallback
- **File:** `src/lib/i18n/en.json` → `faculty.members[].photo`
- **Problem:** Paths like `/images/faculty/satish-sir-chemistry.jpeg` are referenced but no `/public/images/faculty/` directory was found. These will 404 in production.
- **Fix:**
  1. Create `/public/images/faculty/` and add actual faculty photos.
  2. OR add a graceful fallback in `Faculty.tsx` — if the image 404s, show an avatar with initials instead. Use `onError` on `<img>` or `unoptimized` with error boundary.

---

### M-7 · Sticky FeeCard lead form `md:top-28` conflicts with navbar
- **File:** `src/components/sections/FeeCard.tsx`
- **Problem:** The lead form uses `md:sticky md:top-28` (112px). But the navbar height is `--navbar-h: 7.5rem` (120px) on desktop. The sticky form will sit 8px too low and clip under the navbar when the section is near the top of the viewport.
- **Fix:** Use the CSS variable: `style={{ top: "var(--navbar-h)" }}` instead of the hardcoded Tailwind class `md:top-28`.

---

### M-8 · Carousel accessibility — missing ARIA roles
- **Files:** `Gallery.tsx`, `Testimonials.tsx`, `Results.tsx`
- **Problem:** The carousel containers have no `role="region"`, `aria-label`, `aria-live`, or `aria-roledescription="carousel"`. Screen readers cannot navigate or understand the carousel.
- **Fix:** Add ARIA to carousel wrappers:

```tsx
<div role="region" aria-label="Student gallery" aria-roledescription="carousel">
  <div aria-live="polite" aria-atomic="true">
    {/* current slide */}
  </div>
</div>
```

Also add `aria-label="Slide X of Y"` to each slide element.

---

### M-9 · `<motion.nav>` ref type mismatch
- **File:** `src/components/layout/Navbar.tsx`
- **Problem:** `ref={navRef as React.RefObject<HTMLElement> & React.RefObject<HTMLDivElement>}` — this double-cast is a TypeScript smell that hides a genuine type incompatibility. `motion.nav` expects `HTMLElement` but `navRef` is typed as `HTMLElement`.
- **Fix:** Type `navRef` correctly:

```tsx
const navRef = useRef<HTMLElement>(null);
// Then pass directly:
ref={navRef}
```

---

### M-10 · Inline style duplication — WhatsApp SVG path repeated 4×
- **Files:** `Contact.tsx`, `FeeCard.tsx`, `MobileBookingBar.tsx`, `WhatsAppFloat.tsx`
- **Problem:** The identical WhatsApp SVG path is copy-pasted 4 times across 4 files. Any icon update requires 4 edits.
- **Fix:** Create a shared icon component:

```tsx
// src/components/ui/icons/WhatsAppIcon.tsx
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-5 h-5 fill-white"} viewBox="0 0 24 24" aria-hidden>
      <path d="M17.472 14.382c..." />
    </svg>
  );
}
```

---

## LOW PRIORITY — Refactoring & Code Hygiene

### L-1 · Remove stray file `OrbitRing.txt`
- **File:** `src/lib/three/OrbitRing.txt`
- **Problem:** A leftover developer note/draft sitting in the source tree. Not imported anywhere.
- **Fix:** `git rm src/lib/three/OrbitRing.txt`

---

### L-2 · Remove `rename-gallery.ps1` if accidentally committed
- **File:** Root directory
- **Problem:** The helper script `rename-gallery.ps1` was deleted locally but double-check it wasn't committed.
- **Fix:** Run `git log --name-only | grep rename-gallery` — if found in history, add to `.gitignore` pattern: `*.ps1`

---

### L-3 · Eliminate `any` type casts in components
- **Files:** `Navbar.tsx`, `FeeCard.tsx`, `Contact.tsx`, `Results.tsx`
- **Problem:** Multiple `(t as any).feeCard`, `(t as any).enquiryForm` etc. These defeat TypeScript entirely and will cause silent runtime bugs if i18n keys change.
- **Fix:** Create a typed interface for the translation object:

```ts
// src/lib/i18n/types.ts
export interface Translations {
  nav: { ... };
  hero: { ... };
  feeCard: {
    title: string;
    subtitle: string;
    tiers: Array<{
      label: string;
      classes: string;
      price: string;
      color: "blue" | "gold" | "teal";
      popular?: boolean;
      features: string[];
    }>;
    // ...
  };
  // ... all sections
}
```

Then use `const t = useLanguage().t as Translations` once in `LanguageContext`.

---

### L-4 · `STATS_META` duplication between `About.tsx` and `Results.tsx`
- **Problem:** Both `About.tsx` and `Results.tsx` define separate `STATS_META` arrays with identical values (`{ target: 500, suffix: "+", duration: 2.0 }`). They're also both reading from `t.about.stats` in Results.
- **Fix:** Extract to a shared constant in `src/lib/statsConfig.ts` and import in both components.

---

### L-5 · Missing `key` on duplicated ticker items
- **File:** `src/components/layout/Navbar.tsx`
- **Problem:** `[...t.nav.ticker, ...t.nav.ticker].map((msg, i) => <span key={i}>...)` — using array index as key on a doubled list will cause React reconciliation issues when the language changes.
- **Fix:** Use a compound key: `key={${i}-${msg.slice(0,10)}}`

---

### L-6 · `scroll-padding-top` values hardcoded redundantly
- **File:** `src/app/globals.css`
- **Problem:** `scroll-padding-top` values (96px, 104px, 120px) are hardcoded in three separate `@media` blocks, but the `--navbar-h` CSS variable already tracks the same values. They'll get out of sync if the navbar height changes.
- **Fix:** Use the variable directly — modern browsers support this natively:

```css
html { scroll-padding-top: var(--navbar-h); }
```

---

### L-7 · `features.items[].desc` bypasses i18n (see M-1 for details)
- **Impact:** Hindi users see English feature descriptions.

---

### L-8 · Add `.env.example` file
- **Problem:** No `.env.example` exists. If a collaborator clones the repo, they have no idea which environment variables (if any) are needed.
- **Fix:** Create `.env.example` with placeholders for any env vars used, e.g.:

```
# Site URL used for Open Graph meta
NEXT_PUBLIC_SITE_URL=https://vision-coaching-institute.vercel.app
```

Move the hardcoded `SITE_URL` in `layout.tsx` to `process.env.NEXT_PUBLIC_SITE_URL`.

---

### L-9 · Unused `CtaBanner` and `FaqSection` missing ARIA landmarks
- **Files:** `src/components/sections/CtaBanner.tsx`, `src/components/sections/FaqSection.tsx`
- **Problem:** These sections in `page.tsx` are not wrapped in `<section>` tags with `aria-label` (unlike the others which have proper section+aria-label wrapping).
- **Fix:** In `page.tsx`:

```tsx
<section id="cta" aria-label="Call to Action"><CtaBanner /></section>
<section id="faq" aria-label="Frequently Asked Questions"><FaqSection /></section>
```

---

### L-10 · `CustomCursor` — no `prefers-reduced-motion` respect
- **File:** `src/components/ui/CustomCursor.tsx`
- **Problem:** The custom cursor likely uses `requestAnimationFrame` or a continuous animation. Users with `prefers-reduced-motion: reduce` (vestibular disorders, epilepsy risk) will still see the animated cursor.
- **Fix:**

```tsx
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) return null; // Skip custom cursor entirely
```

---

## Quick Wins Checklist

These can be done in under 10 minutes each:

- [ ] H-1: Remove `user-select: none` from `*` in globals.css
- [ ] H-2: Fix 4 broken icon paths in layout.tsx
- [ ] H-6: Add `/public/robots.txt`
- [ ] M-2: Make copyright year dynamic
- [ ] L-1: Delete `src/lib/three/OrbitRing.txt`
- [ ] L-5: Fix ticker `key` prop
- [ ] L-6: Use `var(--navbar-h)` for scroll-padding-top

---

## Priority Order Summary

| # | Task | Priority | Effort |
|---|------|----------|--------|
| H-1 | Remove global user-select:none | 🔴 Critical | 2 min |
| H-2 | Fix broken favicon icons | 🔴 Critical | 5 min |
| H-3 | Migrate to next/font | 🔴 Critical | 30 min |
| H-4 | Form validation with error UI | 🔴 Critical | 45 min |
| H-5 | Replace fake topper data | 🔴 Critical | 20 min |
| H-6 | Add robots.txt | 🔴 Critical | 2 min |
| M-1 | Fix Features i18n bypass | 🟡 High | 15 min |
| M-2 | Dynamic copyright year | 🟡 High | 3 min |
| M-3 | Skip 3D scene on mobile | 🟡 High | 1 hr |
| M-4 | Gallery image optimization | 🟡 High | 30 min |
| M-5 | Hindi i18n audit | 🟡 High | 1 hr |
| M-6 | Faculty photo fallback | 🟡 High | 20 min |
| M-7 | Fix sticky form top offset | 🟡 Medium | 5 min |
| M-8 | Carousel ARIA roles | 🟡 Medium | 30 min |
| M-9 | Navbar ref type fix | 🟡 Medium | 5 min |
| M-10 | Extract WhatsApp icon component | 🟡 Medium | 15 min |
| L-1 | Delete OrbitRing.txt | 🟢 Low | 1 min |
| L-2 | Gitignore .ps1 scripts | 🟢 Low | 2 min |
| L-3 | Type i18n translations | 🟢 Low | 2 hrs |
| L-4 | Deduplicate STATS_META | 🟢 Low | 10 min |
| L-5 | Fix ticker key prop | 🟢 Low | 2 min |
| L-6 | CSS var for scroll-padding | 🟢 Low | 2 min |
| L-8 | Add .env.example | 🟢 Low | 5 min |
| L-9 | ARIA for CtaBanner/FAQ | 🟢 Low | 5 min |
| L-10 | Respect prefers-reduced-motion | 🟢 Low | 10 min |

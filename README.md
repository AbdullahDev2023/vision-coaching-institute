# 🎓 Vision Coaching Institute — Tulsipur
### Full-Stack Website — AI Handoff README

> **READ THIS FIRST if you are an AI model continuing this project.**
> This file is the single source of truth. It tells you exactly what is built,
> what every file does, what comes next, and how to continue without breaking anything.

---

## 📌 Project Overview

| Item | Detail |
|------|--------|
| **Brand** | Vision Coaching Institute, Tulsipur |
| **Type** | Single-Page App (Next.js, all sections on one page) |
| **Color Scheme** | Deep Blue (`#0A1F5C`) + Gold (`#D4A017`) |
| **Languages** | English + Hindi — full bilingual toggle (EN ↔ हिं) |
| **Hero Style** | Split layout: GSAP-animated text left / Three.js 3D scene right |
| **Project Path** | `C:\Users\lapto\GitHub\vision-coaching-institute` |
| **Run Dev** | `cd` into project path → `npm run dev` → open `http://localhost:3000` |
| **Build Check** | `npm run build` — must pass with 0 errors before committing any phase |
| **Hosting (future)** | Vercel + Cloudflare CDN |

---

## 🧰 Tech Stack (Installed & Configured)

| Layer | Package | Notes |
|-------|---------|-------|
| Framework | `next` 16.1.6 (App Router) | `next.config.js` (not .ts — avoids TS bug) |
| Styling | `tailwindcss` | Custom palette in `tailwind.config.ts` |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` | SSR-disabled via dynamic import |
| Animation | `gsap` + `@gsap/react` | ScrollTrigger registered globally |
| Animation | `framer-motion` | Used for Variants, AnimatePresence, motion values |
| Language | React Context API | No external i18n library — custom `useLanguage()` hook |
| Shell | PowerShell / cmd | Windows machine — use `cmd` for npm commands |

---

## 📁 Actual File Structure (as built)

```
vision-coaching-institute/
│
├── public/
│   ├── logo.png                    ← DROP LOGO HERE (PNG transparent)
│   ├── videos/
│   │   ├── README.md               ← naming guide
│   │   ├── hero-bg.mp4             ← optional looping hero bg
│   │   ├── demo-class-1.mp4        ← demo class video
│   │   ├── demo-class-2.mp4
│   │   ├── results-2024.mp4
│   │   └── testimonial-1.mp4
│   └── images/
│       ├── gallery/                ← classroom / event photos (JPG/WebP)
│       ├── faculty/                ← teacher photos (when available)
│       ├── toppers/                ← student result photos
│       └── testimonials/           ← student / parent photos
│
├── src/
│   ├── app/
│   │   ├── globals.css             ← Tailwind + CSS vars + font imports + utilities
│   │   ├── layout.tsx              ← Root layout: fonts, metadata, LanguageProvider
│   │   └── page.tsx                ← Assembles all sections in order
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← Sticky, GSAP entrance, active-section tracking,
│   │   │   │                         animated hamburger, Framer Motion mobile menu
│   │   │   └── Footer.tsx          ← 3-col, Framer Motion stagger, social SVG icons,
│   │   │                             gold top accent line, animated hover arrows
│   │   ├── sections/
│   │   │   ├── Hero.tsx            ← GSAP 8-step stagger text reveal + Three.js canvas
│   │   │   ├── About.tsx           ← Slide-in left/right, useCountUp stat counters,
│   │   │   │                         gold checkmark bullets, vision card
│   │   │   ├── Features.tsx        ← 3D tilt cards (Framer Motion mouse tracking),
│   │   │   │                         coloured icon rings, CTA strip
│   │   │   ├── Courses.tsx         ← 4-board grid (all visible), click-to-expand,
│   │   │   │                         subject comparison table, GSAP scroll reveal
│   │   │   ├── Faculty.tsx         ← Placeholder initials avatars, gold shadow hover
│   │   │   ├── Results.tsx         ← Topper cards, board colour badges
│   │   │   ├── Testimonials.tsx    ← Auto-scroll carousel, Framer Motion slide, dots
│   │   │   ├── Gallery.tsx         ← Filter tabs, Framer Motion layout grid,
│   │   │   │                         video play overlay, placeholder emoji items
│   │   │   └── Contact.tsx         ← Click-to-call phones, Google Maps embed,
│   │   │                             WhatsApp link, hours
│   │   └── ui/
│   │       ├── HeroSceneLoader.tsx ← Dynamic import wrapper (SSR=false) for Three.js
│   │       ├── LanguageToggle.tsx  ← Framer Motion sliding gold pill (EN ↔ हिं)
│   │       ├── LoadingScreen.tsx   ← GSAP timeline: ring spin → text → progress bar
│   │       ├── SectionHeading.tsx  ← Reusable heading: gold divider lines + title + sub
│   │       └── WhatsAppFloat.tsx   ← Pulse ring, tooltip on hover, spring entrance
│   │
│   └── lib/
│       ├── i18n/
│       │   ├── en.json             ← ALL English strings (nav, hero, about, courses,
│       │   │                         faculty, results, gallery, testimonials, contact,
│       │   │                         footer) — fully populated
│       │   └── hi.json             ← ALL Hindi translations — fully populated
│       ├── LanguageContext.tsx     ← createContext + useLanguage hook + LanguageProvider
│       ├── useScrollReveal.ts      ← GSAP ScrollTrigger hook: y/x slide + stagger
│       ├── useCountUp.ts           ← GSAP counter hook: 0 → target on scroll
│       └── three/
│           └── HeroScene.tsx       ← Three.js: StarField (2000 pts) + CentralGem
│                                     (dodecahedron wireframe) + 4 OrbitingShapes +
│                                     OrbitRings + mouse parallax SceneGroup
│
├── next.config.js                  ← Plain JS (not .ts) — avoids Next.js 16 TS bug
├── tailwind.config.ts              ← Colors: primary, gold, bg-dark, bg-card etc.
├── package.json
└── README.md                       ← This file
```

---

## 🎨 Design System

### Color Tokens (defined in `tailwind.config.ts` + CSS vars in `globals.css`)

| Token | Hex | Where Used |
|-------|-----|-----------|
| `primary.DEFAULT` | `#0A1F5C` | Navbar bg, headings, dark cards |
| `primary.light` | `#1A3A8F` | Gradients, hover states |
| `primary.dark` | `#050D1F` | Deepest backgrounds |
| `gold.DEFAULT` | `#D4A017` | Accents, borders, CTAs, stars |
| `gold.light` | `#F0C842` | Shimmer highlights |
| `bg.dark` | `#050D1F` | Dark section backgrounds |
| `bg.card` | `#0D1B4B` | Card surfaces |
| `bg.light` | `#F8F9FF` | Light section backgrounds |

### Typography
| Font | Variable | Used For |
|------|----------|---------|
| Playfair Display | `--font-playfair` | Headings (`font-heading` class) |
| Inter | `--font-inter` | Body text (`font-body` class) |
| Noto Sans Devanagari | `--font-noto-devanagari` | Hindi text (`font-hindi` class) |

### Utility Classes (defined in `globals.css`)
| Class | Effect |
|-------|--------|
| `.text-gold-shimmer` | Animated gold gradient shimmer text |
| `.section-pad` | `5rem 1.5rem` padding (6rem 4rem on lg) |
| `.card-glow` | Smooth hover: lift + gold border + shadow |
| `.gsap-reveal` | Marker class — `useScrollReveal` animates these children |
| `.font-heading` | Playfair Display |
| `.font-hindi` | Noto Sans Devanagari |

---

## 🌐 Bilingual System

| Item | Detail |
|------|--------|
| Context file | `src/lib/LanguageContext.tsx` |
| Hook | `useLanguage()` → returns `{ lang, t, toggleLang }` |
| English data | `src/lib/i18n/en.json` — **fully populated** |
| Hindi data | `src/lib/i18n/hi.json` — **fully populated** |
| Toggle UI | `LanguageToggle.tsx` — Framer Motion sliding gold pill |
| Persistence | `localStorage` key `"vci-lang"` — remembers choice |
| Default | English on first load |
| Font switch | `LanguageProvider` wraps content in `font-hindi` or `font-body` class |

**How to use in any component:**
```tsx
const { t, lang } = useLanguage();
// t.nav.home, t.hero.cta, t.contact.phones, etc.
```

---

## 📞 Contact Info (hardcoded in `en.json` + `hi.json`)

```
phones:   +91 72104 33685 | +91 7235937827 | +91 99568 41282
whatsapp: +917210433685
address:  Purani Bazar, Tulsipur, Uttar Pradesh
map:      Google Maps embed query — "Purani Bazar, Tulsipur, Uttar Pradesh"
hours:    Mon–Sat: 7:00 AM – 8:00 PM
```

---

## 🗺️ Page Assembly (`src/app/page.tsx`)

Sections render in this exact order — each wrapped in a `<section id="...">`:

```
home → about → features → courses → faculty → results → gallery → testimonials → contact
```

Plus `<LoadingScreen />`, `<Navbar />`, `<Footer />`, `<WhatsAppFloat />` outside main.

---

## ✅ PHASE 0 — COMPLETE
**Next.js project scaffolded + all deps installed + folder structure + i18n + LanguageContext**

### What was done
- `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src-dir
- Installed: `three @types/three gsap @gsap/react framer-motion @react-three/fiber @react-three/drei react-intersection-observer`
- Tailwind configured with custom color tokens
- Google Fonts imported in `globals.css` (Playfair Display, Inter, Noto Sans Devanagari)
- `en.json` + `hi.json` fully populated with ALL section strings
- `LanguageContext.tsx` with `useLanguage()` hook + localStorage persistence
- All `public/` subfolders created with README guides
- `next.config.ts` replaced with `next.config.js` (fixes Next.js 16 TS transpile bug)
- Build: ✅ 0 errors

---

## ✅ PHASE 1 — COMPLETE
**Sticky Navbar + Footer + Language Toggle + WhatsApp Float + Loading Screen — all with animations**

### What was done

#### `Navbar.tsx`
- GSAP entrance animation (slides down from top after loading screen)
- Stagger animation on nav links
- Active section tracking via `window.scrollY` — highlights current section link
- Gold animated underline on active/hover link
- Framer Motion animated hamburger (3 bars morph to X)
- Framer Motion mobile menu (slide-down, staggered links)
- Call Now CTA button (gold gradient)
- `LanguageToggle` embedded in navbar

#### `LanguageToggle.tsx`
- Framer Motion spring sliding gold pill between EN and हिं labels

#### `LoadingScreen.tsx`
- GSAP timeline: ring rotates in → institute name fades → progress bar fills → screen fades out
- Duration: ~2 seconds, then unmounts from DOM

#### `WhatsAppFloat.tsx`
- Framer Motion spring entrance (appears after 2.5s)
- Animated pulse ring around button
- Tooltip appears on hover with Framer Motion AnimatePresence
- Links to WhatsApp with pre-filled message

#### `Footer.tsx`
- 3-column: Brand+social | Quick Links | Contact
- Framer Motion stagger reveal on scroll (whileInView)
- Gold top accent gradient line
- Animated link hover arrows (width:0 → w-3 on hover)
- Social media SVG icons (Facebook, Instagram, YouTube)
- Green pulsing "All systems operational" dot

#### `SectionHeading.tsx` (new reusable UI)
- Gold decorative dot + lines
- title + optional subtitle
- `light` prop: white text (dark bg) or dark text (light bg)
- Includes `.gsap-reveal` class for scroll animation

#### `useScrollReveal.ts`
- GSAP ScrollTrigger hook
- Animates `.gsap-reveal` children of container ref
- Options: `y`, `x`, `duration`, `stagger`, `delay`, `ease`, `start`

- Build: ✅ 0 errors

---

## ✅ PHASE 2 — COMPLETE
**Hero Section: GSAP text stagger + Three.js 3D interactive scene**

### What was done

#### `src/lib/three/HeroScene.tsx`
Full Three.js scene rendered via `@react-three/fiber` Canvas:

| Element | Detail |
|---------|--------|
| **StarField** | 2000 particles in sphere distribution, slow Y-rotation |
| **CentralGem** | Dodecahedron wireframe (gold `#D4A017`), inner solid core (blue), outer icosahedron wireframe (faint gold), outer glow sphere — all rotating at different speeds |
| **OrbitingShapes** | 4 shapes on elliptical orbits: Tetrahedron (gold=Maths), Octahedron (blue=Physics), Icosahedron (teal=Chemistry), Tetrahedron (red=Biology) — each self-rotates |
| **OrbitRings** | 4 elliptical rings using `THREE.Line` via `<primitive>` (NOT `<line>` — that conflicts with SVG JSX) |
| **Mouse Parallax** | `SceneGroup` tracks `mousemove`, smoothly rotates entire group toward cursor |
| **Lighting** | Ambient + 3 point lights (gold, blue, white) |
| **Camera** | `position [0,0,5.5]`, `fov 55` |
| **GL** | `alpha: true`, `antialias: true`, `dpr [1,2]` |

> ⚠️ **IMPORTANT**: Never use `<line>` JSX in @react-three/fiber — it maps to SVG. Use `<primitive object={new THREE.Line(...)} />` instead.

#### `src/components/ui/HeroSceneLoader.tsx`
- `dynamic(() => import("@/lib/three/HeroScene"), { ssr: false })` — prevents SSR crash
- Shows spinner while Three.js loads

#### `src/components/sections/Hero.tsx`
- GSAP timeline (delay 2.1s, after loading screen) staggers 8 elements:
  `tagline → board badges → h1 → subheading → subject pills → CTA buttons → phones → canvas`
- Right side: canvas container fades + scales in
- Subject colour labels float over canvas bottom
- Background: radial gradient + subtle grid overlay + gold glow blob

- Build: ✅ 0 errors

---

## ✅ PHASE 3 — COMPLETE
**About + Features + Courses — animated, premium, interactive**

### What was done

#### `src/lib/useScrollReveal.ts` (upgraded)
Added options: `x` (slide from left/right), `ease`, `start` — so sections can slide in horizontally.

#### `src/lib/useCountUp.ts` (new)
GSAP ScrollTrigger hook that counts a number from 0 → target when section enters viewport.
Usage: `const ref = useCountUp(500, "+", triggerRef, 2.0)` — attach ref to a `<span>`.

#### `src/components/sections/About.tsx`
- Left panel slides in from left (`x: -50`), right panel from right (`x: +50`)
- **Animated stat counters**: 500+, 95%, 10+ — count up live on scroll
- Feature bullet list with gold gradient checkmark icons
- "Enroll Now →" CTA gold button
- Vision card (dark blue with tagline)
- Decorative background orbs (blue + gold radials)
- Light background section (`#F8F9FF → #EEF2FF` gradient)

#### `src/components/sections/Features.tsx`
- **3D tilt cards**: Framer Motion `useMotionValue` + `useTransform` + `useSpring`
- Each card tracks mouse position → `rotateX` + `rotateY` + dynamic radial follow-glow
- Coloured icon rings per card: Gold (Maths), Blue (Physics), Teal (Chemistry), Red (Biology)
- Bottom gold bar animates width on hover
- Dot-grid background overlay
- CTA strip at bottom: "Book Free Demo →" WhatsApp link
- GSAP ScrollTrigger stagger entrance

#### `src/components/sections/Courses.tsx`
- **All 4 boards shown simultaneously** as cards (not tabs)
- Click any card → AnimatePresence expands to show highlights + Enquire Now CTA
- Each board colour-coded: Blue (CBSE), Teal (ICSE), Gold (ISC), Red (UP Board)
- Subject pills use emoji icons from `SUBJECT_ICONS` map (works EN + HI)
- **Comparison table** below cards: all 4 boards × subjects side by side
- Hint text: "Click any board card to see details"

- Build: ✅ 0 errors

---

## 🔜 PHASE 4 — NEXT (Faculty + Results + Testimonials)
**Goal**: Social proof sections — polished, animated, premium

### Context for AI continuing this phase
- Phases 0–3 are DONE. Do NOT re-do or touch those files unless fixing a bug.
- Always run `npm run build` after completing the phase to verify 0 errors.
- Use `useScrollReveal` hook (supports `x`, `y`, `stagger`, `delay`, `ease`, `start`).
- Use `SectionHeading` component for all section titles.
- Use `useLanguage()` for all text — never hardcode strings (use `t.faculty.*`, `t.results.*`, `t.testimonials.*`).
- All data (faculty names, toppers, testimonials) lives in `en.json` + `hi.json` — already populated.
- Use Framer Motion for card interactions. Use GSAP for scroll reveals.
- Do NOT use `<line>` JSX in Three.js context — use `<primitive>`.
- Dark sections: `bg-bg-dark` (`#050D1F`). Light sections: `bg-bg-light` (`#F8F9FF`).
- Alternate light/dark between sections for visual rhythm.

### Tasks to complete in Phase 4

#### `Faculty.tsx` — upgrade from placeholder
- [ ] Keep initials-based avatar circles (no real photos yet)
- [ ] Add subject-coloured avatar ring (match subject to colour: Maths=gold, Physics=blue, Chemistry=teal, Biology=red)
- [ ] Framer Motion card tilt (same pattern as Features TiltCard) or hover lift
- [ ] On hover: card lifts, gold border glow, avatar ring glows
- [ ] "Photos coming soon" subtle watermark or badge
- [ ] Section background: LIGHT (`bg-bg-light`) — alternates from dark Courses
- [ ] GSAP stagger scroll reveal

#### `Results.tsx` — upgrade from placeholder
- [ ] Topper cards: initials avatar + percentage (large, gold shimmer) + name + board badge + class + year
- [ ] Year filter tabs: 2022 | 2023 | 2024 — filter cards with AnimatePresence
- [ ] Board colour badges: CBSE=blue, ISC=purple, ICSE=emerald, UP Board=orange
- [ ] Animated percentage counter (useCountUp) for overall pass rate stat
- [ ] Section background: DARK (`bg-bg-dark`)

#### `Testimonials.tsx` — upgrade from placeholder
- [ ] Already has basic auto-scroll carousel — upgrade to:
- [ ] Infinite scroll (loop seamlessly) with drag support (`drag="x"` in Framer Motion)
- [ ] Show 3 cards at once on desktop, 1 on mobile
- [ ] Each card: gold stars, quote text, student name, class, avatar initials
- [ ] Navigation: prev/next arrows + dot indicators
- [ ] Section background: matches surrounding — use `bg-primary` (`#0A1F5C`)

### Deliverable for Phase 4
All 3 sections fully animated and visually polished. `npm run build` passes 0 errors.

---

## 🔜 PHASE 5 — Gallery + Contact (after Phase 4)

### Context
- Gallery currently has placeholder emoji cards with filter tabs (All/Photos/Videos)
- Contact has phone links + Google Maps embed (working)
- Both need visual polish and lightbox for Gallery

### Tasks
#### `Gallery.tsx`
- [ ] Replace emoji placeholders with real `<Image>` components when files are in `public/images/gallery/`
- [ ] Full lightbox modal: click photo → fullscreen overlay with close button (Framer Motion)
- [ ] Video cards: click → embedded `<video>` player or lightbox
- [ ] Masonry-style layout (CSS columns or manual grid)
- [ ] AnimatePresence for filter switching (already partially done)

#### `Contact.tsx`
- [ ] Keep existing layout (phones + map)
- [ ] Add animated entrance (slide in left/right)
- [ ] Add "copy to clipboard" on phone number click (optional)
- [ ] Verify Google Maps embed loads correctly

### Deliverable for Phase 5
Gallery with lightbox, Contact polished. Build passes.

---

## 🔜 PHASE 6 — Bilingual Verification (after Phase 5)
- [ ] Test every section in Hindi mode (toggle EN → हिं)
- [ ] Verify all `t.*` keys resolve — no undefined values
- [ ] Check Hindi font rendering (Noto Sans Devanagari)
- [ ] Fix any layout breaks caused by longer Hindi text
- [ ] Verify localStorage toggle persistence on refresh

---

## 🔜 PHASE 7 — Polish, Performance & SEO (after Phase 6)

### Tasks
- [ ] Custom cursor: gold dot + faint trail on desktop (CSS or GSAP)
- [ ] Smooth scroll: Lenis or `scroll-behavior: smooth` (already set)
- [ ] `next/image` for all real photos with `width`, `height`, `priority` on hero
- [ ] SEO metadata in `layout.tsx` — title, description, OG tags
- [ ] Favicon: generate from logo (`/public/favicon.ico` already exists as placeholder)
- [ ] Lighthouse audit: target 90+ Performance, 100 Accessibility
- [ ] GSAP ScrollTrigger cleanup: verify all `ctx.revert()` calls in useEffect cleanups
- [ ] Mobile test: hamburger menu, hero layout (canvas hidden on mobile), font sizes

---

## 🔜 PHASE 8 — Deployment (after Phase 7)
- [ ] `git add . && git commit -m "Phase 7 complete"`
- [ ] `git push origin main`
- [ ] Connect GitHub repo to Vercel dashboard
- [ ] Deploy — Vercel auto-detects Next.js
- [ ] Set env vars if any (none currently)
- [ ] Attach custom domain if purchased
- [ ] Cloudflare for CDN + SSL in front of Vercel

---

## ⚡ Quick Reference for AI Models

### Starting a new phase
1. Read this README fully first
2. Read the existing files for the sections you'll modify
3. Never rewrite sections from earlier phases unless fixing a bug
4. Always use `useLanguage()` for text, `useScrollReveal` for scroll animation, `SectionHeading` for headings
5. Run `npm run build` — fix ALL TypeScript errors before considering the phase done

### Common pitfalls (already hit — don't repeat)
| Pitfall | Fix |
|---------|-----|
| `<line>` JSX in @react-three/fiber | Use `<primitive object={new THREE.Line(...)} />` |
| Duplicate `style=` prop on same element | Merge into one `style={{ a, b }}` object |
| `next.config.ts` fails to load | Use `next.config.js` (plain JS) — Next.js 16 TS transpile bug |
| Framer Motion `ease: "easeOut"` type error in Variants | Use bezier array `[0.25, 0.1, 0.25, 1]` or import `type Variants` |
| `create-next-app` fails if `public/` or `README.md` exist | Back them up, delete, scaffold, restore |

### Important patterns
```tsx
// Scroll reveal — add .gsap-reveal class to children
const ref = useRef<HTMLDivElement>(null);
useScrollReveal(ref as React.RefObject<HTMLElement>, { stagger: 0.13 });

// Count-up stat
const numRef = useCountUp(500, "+", triggerRef, 2.0);
<span ref={numRef}>0+</span>

// Language hook
const { t } = useLanguage();
<p>{t.about.body}</p>
```

---

## 📋 Dev Commands

```bash
cd C:\Users\lapto\GitHub\vision-coaching-institute
npm run dev        # development server → http://localhost:3000
npm run build      # production build — MUST pass 0 errors after each phase
npm run lint       # linting (ESLint disabled — no .eslintrc)
```

---

*README last updated: After Phase 3 complete. Next phase: Phase 4 (Faculty + Results + Testimonials).*

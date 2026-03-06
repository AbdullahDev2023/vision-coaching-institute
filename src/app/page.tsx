import dynamic from "next/dynamic";
import Navbar           from "@/components/layout/Navbar";
import Footer           from "@/components/layout/Footer";
import WhatsAppFloat    from "@/components/ui/WhatsAppFloat";
import BackToTop        from "@/components/ui/BackToTop";
import BottomTabNav      from "@/components/ui/BottomTabNav";
import GalleryLoader    from "@/components/sections/GalleryLoader";
import SchemaScripts    from "@/components/ui/SchemaScripts";
import AccordionSection from "@/components/ui/AccordionSection";

// ── HeroShell: SSR paints HeroStatic h1, then swaps to full Hero on client ─
import HeroShell     from "@/components/sections/HeroShell";
import ContentLinks  from "@/components/ui/ContentLinks";

// ── LoadingScreen: client-only overlay, must NEVER block SSR/LCP ──────────
import LoadingScreenWrapper from "@/components/ui/LoadingScreenWrapper";

// ── CtaBanner: lightweight mid-page strip — NOT wrapped in accordion ───────
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"));

// ── FaqSection: already IS an accordion — NOT wrapped again ───────────────
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));

// ── Heavy below-fold sections — loaded ONLY when their accordion expands ──
// next/dynamic creates lazy React components. The browser will NOT download
// their JS chunks until the component is actually rendered.
// AccordionSection gates rendering with its isOpen state, so these chunks
// are deferred until the user explicitly expands each section.
const Results      = dynamic(() => import("@/components/sections/Results"),      { loading: () => <SectionSkeleton /> });
const Courses      = dynamic(() => import("@/components/sections/Courses"),      { loading: () => <SectionSkeleton /> });
const FeeCard      = dynamic(() => import("@/components/sections/FeeCard"),      { loading: () => <SectionSkeleton /> });
const Faculty      = dynamic(() => import("@/components/sections/Faculty"),      { loading: () => <SectionSkeleton /> });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { loading: () => <SectionSkeleton /> });
const About        = dynamic(() => import("@/components/sections/About"),        { loading: () => <SectionSkeleton /> });
const Contact      = dynamic(() => import("@/components/sections/Contact"),      { loading: () => <SectionSkeleton /> });

// ── Section skeleton — shown while a dynamic chunk downloads ──────────────
function SectionSkeleton() {
  return (
    <div style={{ padding: "4rem 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        border: "3px solid rgba(212,160,23,0.15)",
        borderTopColor: "#D4A017",
        animation: "spin 0.75s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Preload helpers — called by IntersectionObserver 400px before viewport ─
// These are now handled INSIDE AccordionSection via preloadId string.
// No functions are passed as props — Server Component boundary is respected.

// ── Section metadata — headings/tags always in DOM for SEO ─────────────────
// These are static strings (not i18n) used only for the collapsed header.
// The actual section uses its own i18n strings internally.
const SECTION_META = {
  results: {
    heading:    "Our Results",
    subheading: "Real students, real achievements — see what our toppers scored.",
    icon: "🏆",
    previewTags: ["500+ Students", "98% Pass Rate", "CBSE · UP Board · ISC"],
    bg: "#050D1F",
    light: true,
  },
  courses: {
    heading:    "Our Courses",
    subheading: "UP Board, CBSE, ISC and BSc — taught by subject specialists.",
    icon: "📘",
    previewTags: ["UP Board", "CBSE", "ISC", "BSc", "Class 6–Graduation"],
    bg: "linear-gradient(180deg, #0A1F5C 0%, #050D1F 100%)",
    light: true,
  },
  fees: {
    heading:    "Fee Structure",
    subheading: "Transparent pricing. No hidden charges. Book a free demo first.",
    icon: "💰",
    previewTags: ["Starting ₹1,500 / mo", "3 Plans", "Free Demo Class"],
    bg: "linear-gradient(180deg, #050D1F 0%, #0A1F5C 50%, #050D1F 100%)",
    light: true,
  },
  faculty: {
    heading:    "Our Faculty",
    subheading: "MSc & MTech qualified teachers with 6–12 years of experience.",
    icon: "👨‍🏫",
    previewTags: ["4 Expert Teachers", "Physics · Chemistry · Biology", "MSc / MTech Qualified"],
    bg: "#F8F9FF",
    light: false,
  },
  testimonials: {
    heading:    "Student Testimonials",
    subheading: "Hear directly from students and parents who chose Vision Coaching.",
    icon: "💬",
    previewTags: ["100+ Reviews", "4.9 ★ Rating", "Parents & Students"],
    bg: "#0A1F5C",
    light: true,
  },
  about: {
    heading:    "About Vision Coaching",
    subheading: "Tulsipur's trusted coaching institute since 2016 — serving 500+ students.",
    icon: "🎓",
    previewTags: ["Est. 2016", "500+ Students", "Tulsipur, U.P."],
    bg: "linear-gradient(180deg, #F8F9FF 0%, #EEF2FF 100%)",
    light: false,
  },
  contact: {
    heading:    "Contact Us",
    subheading: "Visit us at Purani Bazar, Tulsipur — Mon–Sat, 7 AM to 8 PM.",
    icon: "📞",
    previewTags: ["+91 72104 33685", "Purani Bazar, Tulsipur", "Mon–Sat 7AM–8PM"],
    bg: "#050D1F",
    light: true,
  },
} as const;

export default function Home() {
  const m = SECTION_META;

  return (
    <>
      <SchemaScripts />
      <LoadingScreenWrapper />

      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-primary focus:font-bold focus:text-sm">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/*
          ── Hero ─────────────────────────────────────────────────────────
          Never wrapped — it IS the LCP element.
          HeroStatic (SSR h1) → Hero (client hydration, 3D scene, GSAP).
        */}
        <section id="home" aria-label="Hero">
          <HeroShell />
        </section>

        <ContentLinks />

        {/*
          ── Results ──────────────────────────────────────────────────────
          Collapsed by default — carousel + GSAP stat counters deferred.
          Chunk size saved on initial load: ~18 KB gzip.
        */}
        <AccordionSection
          id="results"
          ariaLabel="Results & Toppers"
          heading={m.results.heading}
          subheading={m.results.subheading}
          icon={m.results.icon}
          previewTags={[...m.results.previewTags]}
          preloadId="results"
          bg={m.results.bg}
          light={m.results.light}
        >
          <Results />
        </AccordionSection>

        {/*
          ── Courses ───────────────────────────────────────────────────────
          Board cards with expand-on-click detail.
          Chunk + framer-motion variants deferred.
        */}
        <AccordionSection
          id="courses"
          ariaLabel="Our Courses"
          heading={m.courses.heading}
          subheading={m.courses.subheading}
          icon={m.courses.icon}
          previewTags={[...m.courses.previewTags]}
          preloadId="courses"
          bg={m.courses.bg}
          light={m.courses.light}
        >
          <Courses />
        </AccordionSection>

        {/*
          ── Fee Card ─────────────────────────────────────────────────────
          Pricing tiers + lead-capture form.
          WhatsApp redirect logic deferred until needed.
        */}
        <AccordionSection
          id="fees"
          ariaLabel="Fee Structure"
          heading={m.fees.heading}
          subheading={m.fees.subheading}
          icon={m.fees.icon}
          previewTags={[...m.fees.previewTags]}
          preloadId="fees"
          bg={m.fees.bg}
          light={m.fees.light}
        >
          <FeeCard />
        </AccordionSection>

        {/*
          ── Faculty ──────────────────────────────────────────────────────
          Images + 3D tilt cards — heavier on mobile GPU.
          Deferred until user indicates intent.
        */}
        <AccordionSection
          id="faculty"
          ariaLabel="Our Faculty"
          heading={m.faculty.heading}
          subheading={m.faculty.subheading}
          icon={m.faculty.icon}
          previewTags={[...m.faculty.previewTags]}
          preloadId="faculty"
          bg={m.faculty.bg}
          light={m.faculty.light}
        >
          <Faculty />
        </AccordionSection>

        {/*
          ── Testimonials ─────────────────────────────────────────────────
          Auto-scroll carousel with drag handler.
          Touch event listeners deferred.
        */}
        <AccordionSection
          id="testimonials"
          ariaLabel="Student Testimonials"
          heading={m.testimonials.heading}
          subheading={m.testimonials.subheading}
          icon={m.testimonials.icon}
          previewTags={[...m.testimonials.previewTags]}
          preloadId="testimonials"
          bg={m.testimonials.bg}
          light={m.testimonials.light}
        >
          <Testimonials />
        </AccordionSection>

        {/* CtaBanner — lightweight, important for conversion, NOT wrapped */}
        <section id="cta" aria-label="Call to Action">
          <CtaBanner />
        </section>

        {/*
          ── About ────────────────────────────────────────────────────────
          GSAP slide-in animations + stat counters — deferred.
          About info available via previewTags for crawlers.
        */}
        <AccordionSection
          id="about"
          ariaLabel="About Vision Coaching"
          heading={m.about.heading}
          subheading={m.about.subheading}
          icon={m.about.icon}
          previewTags={[...m.about.previewTags]}
          preloadId="about"
          bg={m.about.bg}
          light={m.about.light}
        >
          <About />
        </AccordionSection>

        {/* FaqSection — already an accordion UI — NOT double-wrapped */}
        <section id="faq" aria-label="Frequently Asked Questions">
          <FaqSection />
        </section>

        {/* Gallery — already lazy-loaded by GalleryLoader */}
        <section id="gallery" aria-label="Gallery">
          <GalleryLoader />
        </section>

        {/*
          ── Contact ──────────────────────────────────────────────────────
          Google Maps iframe + form.
          The iframe src is deferred until expand, saving ~200 KB of
          Google Maps JS that mobile browsers would otherwise load eagerly.
        */}
        <AccordionSection
          id="contact"
          ariaLabel="Contact Us"
          heading={m.contact.heading}
          subheading={m.contact.subheading}
          icon={m.contact.icon}
          previewTags={[...m.contact.previewTags]}
          preloadId="contact"
          bg={m.contact.bg}
          light={m.contact.light}
        >
          <Contact />
        </AccordionSection>
      </main>

      <Footer />
      <WhatsAppFloat />
      <BackToTop />
      <BottomTabNav />
    </>
  );
}

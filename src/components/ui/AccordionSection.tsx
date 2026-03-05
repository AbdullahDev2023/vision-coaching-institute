"use client";
/**
 * AccordionSection — Performance-first expandable section wrapper
 *
 * Architecture:
 * ─ <h2>, subtitle, and previewTags are ALWAYS in the SSR payload.
 *   Google indexes them without executing JS. Full SEO preserved.
 *
 * ─ Heavy section content is mounted ONLY on first expand.
 *   The next/dynamic chunk is never requested until that moment.
 *
 * ─ Once opened, hasLoadedRef stays true so content remains mounted
 *   (height/opacity animate to 0) — re-opening is instant, zero re-fetch.
 *
 * ─ IntersectionObserver (rootMargin 400px) fires a background import()
 *   before the section is visible, so the chunk is cached by tap time.
 *   The preload map lives HERE (Client Component) — NOT in page.tsx
 *   (Server Component), which cannot pass functions as props.
 *
 * Core Web Vitals impact:
 *   LCP  ✅  Hero unblocked; below-fold JS fully deferred
 *   TBT  ✅  Heavy parse/exec pushed behind user intent
 *   INP  ✅  Less JS competing on main thread at load
 */

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";

/* ─── Preload map — lives here (Client Component) so page.tsx (Server
       Component) only needs to pass a plain string, not a function.     ── */
const PRELOAD_MAP: Record<string, () => void> = {
  results:      () => { import("@/components/sections/Results");      },
  courses:      () => { import("@/components/sections/Courses");      },
  fees:         () => { import("@/components/sections/FeeCard");      },
  faculty:      () => { import("@/components/sections/Faculty");      },
  testimonials: () => { import("@/components/sections/Testimonials"); },
  about:        () => { import("@/components/sections/About");        },
  contact:      () => { import("@/components/sections/Contact");      },
};

/* ─── Types ─────────────────────────────────────────────── */
export interface AccordionSectionProps {
  /** Used as the DOM `id` and aria linkage */
  id: string;
  /** aria-label for the <section> element */
  ariaLabel: string;
  /** The section <h2> — always rendered, never hidden */
  heading: string;
  /** Short subtitle — always rendered, never hidden */
  subheading: string;
  /** Emoji or short icon beside the heading */
  icon?: string;
  /**
   * Short key-fact tags always visible in collapsed state.
   * Indexed by search crawlers and help users decide to expand.
   */
  previewTags?: string[];
  /** The heavy content — only mounted on first expand */
  children: React.ReactNode;
  /** Pre-open on mount (e.g. for priority sections). Default: false */
  defaultOpen?: boolean;
  /**
   * Key into PRELOAD_MAP above. When the IntersectionObserver fires
   * (400 px before viewport), the matching import() runs in the background.
   * Plain string — safe to pass from a Server Component.
   */
  preloadId?: string;
  /** CSS background for the collapsed header strip */
  bg?: string;
  /** true = white text (dark bg), false = dark text (light bg) */
  light?: boolean;
}

/* ─── Component ─────────────────────────────────────────── */
const AccordionSection = memo(function AccordionSection({
  id,
  ariaLabel,
  heading,
  subheading,
  icon,
  previewTags = [],
  children,
  defaultOpen = false,
  preloadId,
  bg,
  light = true,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  /**
   * Once flipped true, never goes back to false.
   * Ensures content stays mounted (and GSAP/animations don't re-fire)
   * every time the section is collapsed and re-expanded.
   */
  const hasLoadedRef = useRef(defaultOpen);
  const containerRef = useRef<HTMLElement>(null);

  /* Content is mounted if it has ever been opened */
  const shouldRenderContent = hasLoadedRef.current || isOpen;

  /* ── Toggle handler — stable reference for memo ── */
  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev;
      if (next) hasLoadedRef.current = true;
      return next;
    });
  }, []);

  /* ── Preload observer — fires 400px before section enters viewport ── */
  useEffect(() => {
    const preload = preloadId ? PRELOAD_MAP[preloadId] : undefined;
    if (!preload) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          preload();
          observer.disconnect(); // fire once only
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [preloadId]);

  /* ── Derived style tokens ── */
  const headingCls = light ? "text-white" : "text-primary";
  const subCls     = light ? "text-white/60" : "text-primary/55";
  const divBg      = light ? "rgba(255,255,255,0.08)" : "rgba(10,31,92,0.10)";
  const toggleMode = light ? "acc-toggle--light" : "acc-toggle--dark";
  const contentId  = `${id}-content`;

  /* ── Default bg from design system if not provided ── */
  const sectionBg = bg ?? (light ? "var(--bg-dark)" : "#F8F9FF");

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      ref={containerRef}
      className="acc-section"
      style={{ background: sectionBg }}
    >
      {/* ════════════════════════════════════════════════════
          ALWAYS-VISIBLE HEADER
          Fully server-rendered, always in the DOM.
          Google indexes every word here.
          ════════════════════════════════════════════════════ */}
      <div className="layout-container">
        <div className="acc-header">

          {/* ── SEO block ── */}
          <div className="acc-seo-block">

            {/* Gold ornament — matches SectionHeading style */}
            <div className="acc-ornament" aria-hidden="true">
              <span className="acc-ornament-line" />
              <span className="acc-ornament-dot" />
              <span className="acc-ornament-line" />
            </div>

            {/* h2 — always in DOM, never visibility:hidden */}
            <h2 className={`acc-title font-heading ${headingCls}`}>
              {icon && (
                <span className="acc-title-icon" aria-hidden="true">
                  {icon}
                </span>
              )}
              {heading}
            </h2>

            {/* Subtitle — always in DOM */}
            <p className={`acc-subtitle ${subCls}`}>{subheading}</p>

            {/* Preview tags — always visible, help users decide to expand */}
            {previewTags.length > 0 && (
              <ul className="acc-tags" aria-label={`${heading} highlights`}>
                {previewTags.map(tag => (
                  <li key={tag} className={`acc-tag ${light ? "acc-tag--light" : "acc-tag--dark"}`}>
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Expand / Collapse button ── */}
          <button
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className={`acc-toggle ${isOpen ? "acc-toggle--open" : ""} ${toggleMode}`}
          >
            <span className="acc-toggle-label">
              {isOpen ? "Collapse" : "Expand"}
            </span>
            <motion.span
              className="acc-toggle-chevron"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              aria-hidden="true"
            >
              ▾
            </motion.span>
          </button>
        </div>

        {/* ── Separator ── */}
        <div className="acc-divider" style={{ background: divBg }} aria-hidden="true" />
      </div>

      {/* ════════════════════════════════════════════════════
          LAZY CONTENT
          ─ Mounted on first expand, stays mounted after.
          ─ next/dynamic chunk loads exactly here.
          ─ Height & opacity animated by framer-motion.
          ════════════════════════════════════════════════════ */}
      <motion.div
        id={contentId}
        role="region"
        aria-label={`${ariaLabel} details`}
        initial={false}
        animate={{
          height:  isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height:  { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: isOpen ? 0.32 : 0.18, ease: "easeInOut" },
        }}
        style={{ overflow: "hidden" }}
      >
        {/*
          Render gate:
          - Before first expand: null (no JS chunk loaded, no React tree)
          - After first expand: always rendered (chunk cached, instant re-open)
        */}
        {shouldRenderContent && children}
      </motion.div>
    </section>
  );
});

export default AccordionSection;

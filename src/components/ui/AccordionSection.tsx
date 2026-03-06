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
 *
 * ─ framer-motion removed: height animation uses CSS grid 0fr→1fr trick.
 *   This eliminates the framer-motion runtime from this component entirely.
 */

import { useState, useEffect, useRef, useCallback, memo } from "react";

/* ─── Preload map ─────────────────────────────────────────────────────── */
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
  id: string;
  ariaLabel: string;
  heading: string;
  subheading: string;
  icon?: string;
  previewTags?: string[];
  children: React.ReactNode;
  defaultOpen?: boolean;
  preloadId?: string;
  bg?: string;
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
  const hasLoadedRef = useRef(defaultOpen);
  const containerRef = useRef<HTMLElement>(null);

  const shouldRenderContent = hasLoadedRef.current || isOpen;

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
      ([entry]) => { if (entry.isIntersecting) { preload(); observer.disconnect(); } },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [preloadId]);

  const headingCls = light ? "text-white" : "text-primary";
  const subCls     = light ? "text-white/60" : "text-primary/55";
  const divBg      = light ? "rgba(255,255,255,0.08)" : "rgba(10,31,92,0.10)";
  const toggleMode = light ? "acc-toggle--light" : "acc-toggle--dark";
  const contentId  = `${id}-content`;
  const sectionBg  = bg ?? (light ? "var(--bg-dark)" : "#F8F9FF");

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      ref={containerRef}
      className="acc-section"
      style={{ background: sectionBg }}
    >
      <div className="layout-container">
        <div className="acc-header">
          <div className="acc-seo-block">
            <div className="acc-ornament" aria-hidden="true">
              <span className="acc-ornament-line" />
              <span className="acc-ornament-dot" />
              <span className="acc-ornament-line" />
            </div>
            <h2 className={`acc-title font-heading ${headingCls}`}>
              {icon && <span className="acc-title-icon" aria-hidden="true">{icon}</span>}
              {heading}
            </h2>
            <p className={`acc-subtitle ${subCls}`}>{subheading}</p>
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

          <button
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className={`acc-toggle ${isOpen ? "acc-toggle--open" : ""} ${toggleMode}`}
          >
            <span className="acc-toggle-label">{isOpen ? "Collapse" : "Expand"}</span>
            {/* CSS rotation replaces framer-motion Motion.span */}
            <span
              className="acc-toggle-chevron"
              aria-hidden="true"
              style={{
                display: "inline-flex",
                transition: "transform 0.28s cubic-bezier(0.25,0.1,0.25,1)",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >▾</span>
          </button>
        </div>
        <div className="acc-divider" style={{ background: divBg }} aria-hidden="true" />
      </div>

      {/*
        CSS grid 0fr → 1fr replaces framer-motion height animation.
        The inner div must have min-height: 0 to collapse correctly.
        Opacity is transitioned separately for a smooth fade.
      */}
      <div
        id={contentId}
        role="region"
        aria-label={`${ariaLabel} details`}
        className={`acc-content-grid ${isOpen ? "acc-content-grid--open" : ""}`}
      >
        <div className="acc-content-inner">
          {shouldRenderContent && children}
        </div>
      </div>
    </section>
  );
});

export default AccordionSection;

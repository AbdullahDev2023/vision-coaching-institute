"use client";
/**
 * ScrollProgressBar
 * Thin gold line fixed to the very top of the viewport.
 * Width = scrollY / (scrollHeight - innerHeight) * 100%
 * Renders nothing until the user starts scrolling (avoids CLS on load).
 */
import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct       = maxScroll > 0 ? Math.min((scrolled / maxScroll) * 100, 100) : 0;
      // Direct DOM write — avoids React re-render on every scroll tick
      bar.style.width = `${pct}%`;
      bar.style.opacity = scrolled > 40 ? "1" : "0";
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    /* Wrapper: full-width track (transparent) */
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[300] h-[3px] pointer-events-none"
      style={{ background: "rgba(212,160,23,0.10)" }}
    >
      {/* Fill bar */}
      <div
        ref={barRef}
        className="h-full w-0 opacity-0 transition-opacity duration-300"
        style={{
          background:    "linear-gradient(90deg, #D4A017, #F0C842, #D4A017)",
          backgroundSize: "200% 100%",
          animation:     "shimmer 2.5s linear infinite",
          boxShadow:     "0 0 6px rgba(212,160,23,0.55)",
          willChange:    "width",
        }}
      />
    </div>
  );
}

/**
 * HeroStatic.tsx  — Server Component (no "use client")
 *
 * Renders the LCP-critical h1, eyebrow, sub-headline and primary CTA
 * directly into the initial HTML payload — zero JS required for paint.
 *
 * The full interactive Hero (language toggle, GSAP, subject pills, stats)
 * hydrates over this via Hero.tsx once JS loads.
 *
 * IMPORTANT: Keep this file free of any hooks, context, or client imports.
 */

import Image from "next/image";

const WHATSAPP = "917210433685";

export default function HeroStatic() {
  return (
    <div
      className="relative flex items-center overflow-hidden w-full"
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #1A3A8F 0%, #0A1F5C 40%, #050D1F 80%)",
        paddingTop: "clamp(5.5rem, 18vw, 9rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 5rem)",
        minHeight: "100dvh",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold ambient glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 65%)" }}
      />
      <div
        className="absolute left-0 top-1/3 w-[70%] aspect-square rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(26,58,143,0.35) 0%, transparent 70%)" }}
      />

      {/* ── Content column ── */}
      <div
        className="relative z-10 layout-container w-full"
        style={{ display: "flex", flexDirection: "column", gap: "var(--igap-sm)" }}
      >
        {/* Logo + institute name */}
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-full overflow-hidden border-2 flex-shrink-0"
            style={{
              borderColor: "rgba(212,160,23,0.40)",
              boxShadow: "0 8px 24px rgba(212,160,23,0.18)",
              background: "rgba(10,31,92,0.6)",
            }}
          >
            <Image
              src="/logo.webp"
              alt="Vision Coaching Institute Tulsipur logo"
              width={64}
              height={64}
              priority
              fetchPriority="high"
              sizes="64px"
              className="w-full h-full object-cover scale-[1.15]"
            />
          </div>
          <div className="leading-tight">
            <div className="text-white font-heading font-bold text-base sm:text-lg tracking-wide">
              Vision Coaching
            </div>
            <div
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "#D4A017" }}
            >
              Institute · Tulsipur
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p
          className="font-bold text-[11px] uppercase"
          style={{ color: "#D4A017", letterSpacing: "0.22em" }}
        >
          Top Coaching in Tulsipur
        </p>

        {/* Board badges */}
        <div className="flex flex-wrap gap-2.5">
          {["CBSE", "ICSE", "ISC", "UP Board", "BSc"].map((b) => (
            <span
              key={b}
              className="badge"
              style={{
                background: "rgba(212,160,23,0.08)",
                borderColor: "rgba(212,160,23,0.40)",
                color: "#F0C842",
              }}
            >
              {b}
            </span>
          ))}
        </div>

        {/* ── LCP element — h1 ── */}
        <h1
          className="font-heading font-bold text-white leading-tight mt-1"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          <span className="block text-fluid-xl sm:text-4xl lg:text-5xl xl:text-6xl">
            Classes 6–12 &amp; BSc
          </span>
          <span
            className="inline-flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 text-gold-shimmer"
          >
            <svg
              className="w-5 h-5 flex-shrink-0 opacity-80"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Tulsipur, Uttar Pradesh
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
          Maths · Physics · Chemistry · Biology — Expert faculty, small batches, daily doubt sessions.
        </p>

        {/* Primary CTA — visible immediately, no JS needed */}
        <div className="flex flex-col gap-2 mt-1">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary self-start"
            style={{ fontSize: "1rem" }}
          >
            📞 Book FREE Demo Class
          </a>
          <p className="text-white/40 text-xs">No fees. No commitment. Walk in Saturday.</p>
        </div>

        {/* Phone — clickable, no JS */}
        <a
          href="tel:+917210433685"
          className="inline-flex items-center gap-2 text-sm font-medium self-start"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            📞
          </span>
          +91 72104 33685
        </a>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(transparent, #050D1F)" }}
      />

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
        aria-hidden="true"
        style={{ opacity: 0.45 }}
      >
        <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <span className="text-xl leading-none animate-bounce" style={{ color: "#D4A017" }}>↓</span>
      </div>
    </div>
  );
}

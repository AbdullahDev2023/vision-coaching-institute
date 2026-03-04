"use client";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { gsap } from "gsap";
import HeroSceneLoader from "@/components/ui/HeroSceneLoader";

/* Subject colour map — consistent with the 3D scene */
const SUBJECT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Maths:     { bg: "rgba(212,160,23,0.15)",  border: "rgba(212,160,23,0.45)", text: "#F0C842" },
  Physics:   { bg: "rgba(68,136,255,0.15)",  border: "rgba(68,136,255,0.45)", text: "#7aadff" },
  Chemistry: { bg: "rgba(20,184,166,0.15)",  border: "rgba(20,184,166,0.45)", text: "#4dd9c8" },
  Biology:   { bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.45)",  text: "#f87171" },
};

export default function Hero() {
  const { t } = useLanguage();

  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badgesRef  = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const pillsRef   = useRef<HTMLDivElement>(null);
  const ctasRef    = useRef<HTMLDivElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.1 });
    tl.fromTo(taglineRef.current,
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .fromTo(badgesRef.current?.children ?? [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07, ease: "back.out(1.5)" }, "-=0.2")
      .fromTo(headingRef.current,
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.1")
      .fromTo(subRef.current,
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
      .fromTo(pillsRef.current?.children ?? [],
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }, "-=0.1")
      .fromTo(ctasRef.current?.children ?? [],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "back.out(1.3)" }, "-=0.1")
      .fromTo(phoneRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.1")
      .fromTo(canvasRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, "<0.3");
    return () => { tl.kill(); };
  }, []);

  /* Primary phone — first in list */
  const primaryPhone = t.contact.phones[0];

  return (
    <div
      className="relative min-h-[600px] md:min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 30% 50%, #1A3A8F 0%, #0A1F5C 40%, #050D1F 80%)" }}>

      {/* Grid — very subtle, reduced opacity so content leads */}
      <div className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* Gold ambient glow — right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 65%)" }} />

      {/* Left blue depth glow */}
      <div className="absolute -left-32 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,143,0.35) 0%, transparent 70%)" }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 layout-container
                      grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 sm:gap-10 lg:gap-16 items-center
                      py-12 sm:py-16 lg:py-28">

        {/* ── LEFT column ── */}
        <div className="flex flex-col gap-5">

          {/* Tagline */}
          <p ref={taglineRef} style={{ opacity: 0 }}
            className="text-gold font-bold text-[11px] uppercase tracking-[0.22em]">
            {t.hero.tagline}
          </p>

          {/* Board badges */}
          <div ref={badgesRef} className="flex flex-wrap gap-2.5">
            {t.hero.boards.map((b) => (
              <span key={b}
                className="badge"
                style={{ background: "rgba(212,160,23,0.08)", borderColor: "rgba(212,160,23,0.40)", color: "#F0C842" }}>
                {b}
              </span>
            ))}
          </div>

          {/* Heading — institute name + location; extra top margin for visual breathing */}
          <h1 ref={headingRef} style={{ opacity: 0 }}
            className="font-heading font-bold text-white leading-tight mt-3">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">{t.hero.institute}</span>
            <span className="inline-flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl mt-3 text-gold-shimmer">
              <svg className="w-6 h-6 flex-shrink-0 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t.hero.location}
            </span>
          </h1>

          {/* Sub-heading */}
          <p ref={subRef} style={{ opacity: 0 }}
            className="text-white/70 text-lg leading-relaxed font-normal">
            {t.hero.classes}
          </p>

          {/* Subject pills — colour-coded badges */}
          <div ref={pillsRef} className="flex flex-wrap gap-2.5">
            {t.hero.subjects.map((s) => {
              const c = SUBJECT_COLORS[s] ?? { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.18)", text: "rgba(255,255,255,0.75)" };
              return (
                <span key={s}
                  className="badge"
                  style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                  {s}
                </span>
              );
            })}
          </div>

          {/* ── CTAs — extra top margin to visually anchor the action block ── */}
          <div ref={ctasRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3">
            <a href={`https://wa.me/${t.contact.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary">
              🎓 {t.hero.demoBtn}
            </a>
            <a href="#contact" className="btn-secondary">
              {t.hero.cta} →
            </a>
          </div>

          {/* ── Primary phone ── */}
          <div ref={phoneRef} style={{ opacity: 0 }} className="flex items-center gap-3">
            <a href={`tel:${primaryPhone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-white/65 hover:text-gold text-sm font-medium transition-colors group">
              <span className="w-8 h-8 rounded-full border border-white/15 group-hover:border-gold/50 group-hover:bg-gold/10 flex items-center justify-center text-xs transition-all">
                📞
              </span>
              {primaryPhone}
            </a>
            <span className="text-white/25 text-xs">· More numbers in Contact ↓</span>
          </div>
        </div>

        {/* ── RIGHT column: Three.js canvas ── */}
        <div ref={canvasRef}
          className="hidden lg:flex items-center justify-center relative w-full h-[540px] rounded-3xl overflow-hidden"
          style={{
            opacity: 0,
            background: "radial-gradient(ellipse at center, rgba(26,58,143,0.20) 0%, transparent 70%)",
          }}>
          {/* Subtle gold border */}
          <div className="absolute inset-0 rounded-3xl border border-gold/10 pointer-events-none z-10" />
          {/* Inner glow ring */}
          <div className="absolute inset-4 rounded-2xl pointer-events-none z-10"
            style={{ boxShadow: "inset 0 0 60px rgba(212,160,23,0.04)" }} />
          <div className="absolute inset-0">
            <HeroSceneLoader />
          </div>
        </div>

        {/* Mobile canvas — shown below text on small screens */}
        <div className="lg:hidden relative w-full h-[260px] sm:h-[340px] rounded-2xl overflow-hidden mt-2"
          style={{ background: "radial-gradient(ellipse at center, rgba(26,58,143,0.25) 0%, transparent 70%)" }}>
          <div className="absolute inset-0 rounded-2xl border border-gold/10 pointer-events-none z-10" />
          <div className="absolute inset-0">
            <HeroSceneLoader />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(transparent, #050D1F)" }} />
    </div>
  );
}

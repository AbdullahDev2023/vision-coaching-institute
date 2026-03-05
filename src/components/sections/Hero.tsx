"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { gsap } from "gsap";
import HeroSceneLoader from "@/components/ui/HeroSceneLoader";

const SUBJECT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Maths:         { bg: "rgba(212,160,23,0.15)",  border: "rgba(212,160,23,0.45)", text: "#F0C842" },
  Physics:       { bg: "rgba(68,136,255,0.15)",  border: "rgba(68,136,255,0.45)", text: "#7aadff" },
  Chemistry:     { bg: "rgba(20,184,166,0.15)",  border: "rgba(20,184,166,0.45)", text: "#4dd9c8" },
  Biology:       { bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.45)",  text: "#f87171" },
  गणित:          { bg: "rgba(212,160,23,0.15)",  border: "rgba(212,160,23,0.45)", text: "#F0C842" },
  भौतिकी:        { bg: "rgba(68,136,255,0.15)",  border: "rgba(68,136,255,0.45)", text: "#7aadff" },
  "रसायन विज्ञान":{ bg: "rgba(20,184,166,0.15)", border: "rgba(20,184,166,0.45)", text: "#4dd9c8" },
  "जीव विज्ञान": { bg: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.45)",  text: "#f87171" },
};

export default function Hero() {
  const { t } = useLanguage();
  const colRef = useRef<HTMLDivElement>(null);

  /* Single fast fade-in — no delay, no stagger cascade */
  useEffect(() => {
    gsap.fromTo(
      colRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  const primaryPhone = t.contact.phones[0];

  return (
    <div
      className="relative flex items-center overflow-hidden w-full"
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #1A3A8F 0%, #0A1F5C 40%, #050D1F 80%)",
        paddingTop: "clamp(5.5rem, 18vw, 9rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 5rem)",
        minHeight: "100dvh",
      }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* Gold ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 65%)" }} />
      <div className="absolute left-0 top-1/3 w-[70%] aspect-square rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,143,0.35) 0%, transparent 70%)" }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 layout-container grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-8 sm:gap-10 lg:gap-16 items-center">

        {/* ── LEFT column — all content fades in together ── */}
        <div ref={colRef} className="flex flex-col w-full max-w-[600px]" style={{ opacity: 0, gap: "var(--igap-sm)" }}>

          {/* ── Logo + name ── */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold/40 shadow-lg shadow-gold/20 flex-shrink-0"
              style={{ background: "rgba(10,31,92,0.6)" }}>
              <Image src="/logo.png" alt="Vision Coaching Institute Tulsipur" width={128} height={128}
                className="w-full h-full object-cover scale-[1.15]" priority sizes="128px" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-heading font-bold text-base sm:text-lg tracking-wide">Vision Coaching</div>
              <div className="text-gold text-[10px] font-semibold tracking-widest uppercase">Institute · Tulsipur</div>
            </div>
          </div>

          {/* ── Eyebrow tagline ── */}
          <p className="text-gold font-bold text-[11px] uppercase tracking-[0.22em]">
            {t.hero.tagline}
          </p>

          {/* ── Board badges ── */}
          <div className="flex flex-wrap gap-2.5">
            {t.hero.boards.map((b) => (
              <span key={b} className="badge"
                style={{ background: "rgba(212,160,23,0.08)", borderColor: "rgba(212,160,23,0.40)", color: "#F0C842" }}>
                {b}
              </span>
            ))}
          </div>

          {/* ── PRIMARY HEADLINE — answers WHO + WHERE in 2 words ── */}
          <h1 style={{ textWrap: "balance" }}
            className="font-heading font-bold text-white leading-tight mt-1">
            {/* Line 1: "Classes 6–12 & BSc" */}
            <span className="block text-fluid-xl sm:text-4xl lg:text-5xl xl:text-6xl">
              {t.hero.institute}
            </span>
            {/* Line 2: location with pin */}
            <span className="inline-flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 text-gold-shimmer">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {t.hero.location}
            </span>
          </h1>

          {/* ── Sub-headline — subjects & proof ── */}
          <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            {t.hero.classes}
          </p>

          {/* ── Stats strip — social proof, scannable in 1 second ── */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {(t.hero.stats as string[]).map((stat) => {
              const [value, ...rest] = stat.split(" ");
              const label = rest.join(" ");
              return (
                <div key={stat}
                  className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-gold font-heading font-bold text-base sm:text-lg leading-none">{value}</span>
                  <span className="text-white/55 text-xs font-medium">{label}</span>
                </div>
              );
            })}
          </div>

          {/* ── Subject pills ── */}
          <div className="flex flex-wrap gap-2.5">
            {t.hero.subjects.map((s) => {
              const c = SUBJECT_COLORS[s] ?? { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.18)", text: "rgba(255,255,255,0.75)" };
              return (
                <span key={s} className="badge" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                  {s}
                </span>
              );
            })}
          </div>

          {/* ── SINGLE PRIMARY CTA ── */}
          <div className="flex flex-col gap-2 mt-1">
            <a
              href={`https://wa.me/${t.contact.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary text-center sm:self-start"
              style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
              {t.hero.cta}
            </a>
            <p className="text-white/40 text-xs pl-1">{t.hero.ctaSub}</p>
          </div>

          {/* ── Secondary: phone link ── */}
          <a href={`tel:${primaryPhone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 text-white/55 hover:text-gold text-sm font-medium transition-colors group self-start">
            <span className="w-7 h-7 rounded-full border border-white/15 group-hover:border-gold/50 group-hover:bg-gold/10 flex items-center justify-center text-xs transition-all">
              📞
            </span>
            {primaryPhone}
          </a>
        </div>

        {/* ── RIGHT column: 3D scene ── */}
        <div className="relative w-full rounded-3xl overflow-hidden"
          style={{
            height: "clamp(180px, 40vw, 520px)",
            background: "radial-gradient(ellipse at center, rgba(26,58,143,0.20) 0%, transparent 70%)",
          }}>
          <div className="absolute inset-0 rounded-3xl border border-gold/10 pointer-events-none z-10" />
          <HeroSceneLoader />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(transparent, #050D1F)" }} />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10"
        style={{ opacity: 0.45 }}>
        <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <span className="text-gold text-xl leading-none animate-bounce">↓</span>
      </div>
    </div>
  );
}

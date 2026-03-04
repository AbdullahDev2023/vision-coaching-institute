"use client";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCountUp } from "@/lib/useCountUp";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Stat config: parse "500+" → { target:500, suffix:"+" } */
const STATS_META = [
  { target: 500, suffix: "+", duration: 2.0 },
  { target: 95,  suffix: "%", duration: 1.8 },
  { target: 10,  suffix: "+", duration: 1.5 },
];

function StatCard({
  label, target, suffix, duration, triggerRef,
}: {
  label: string; target: number; suffix: string; duration: number;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const numRef = useCountUp(target, suffix, triggerRef as React.RefObject<HTMLElement | null>, duration);
  return (
    <div className="relative group text-center p-3 sm:p-5 lg:p-7 rounded-2xl overflow-hidden cursor-default"
      style={{ background: "linear-gradient(135deg, #0A1F5C 0%, #1A3A8F 100%)" }}>
      {/* Hover gold radial glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,160,23,0.18) 0%, transparent 70%)" }} />
      {/* Top gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-gold rounded-full" />
      <div className="relative z-10 pt-1">
        <span ref={numRef}
          className="block text-xl sm:text-3xl lg:text-5xl font-heading font-bold text-gold-shimmer mb-1 sm:mb-2">
          {target}{suffix}
        </span>
        <span className="text-white/60 text-[9px] sm:text-[11px] uppercase tracking-wider leading-snug block">{label}</span>
      </div>
    </div>
  );
}

export default function About() {
  const { t }      = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useScrollReveal(leftRef  as React.RefObject<HTMLElement>, { x: -50, y: 0, duration: 0.8, start: "top bottom" });
  useScrollReveal(rightRef as React.RefObject<HTMLElement>, { x:  50, y: 0, duration: 0.8, delay: 0.15, start: "top bottom" });

  return (
    <div ref={sectionRef} className="relative section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8F9FF 0%, #EEF2FF 100%)" }}>

      {/* Decorative blurred orbs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(10,31,92,0.07) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)" }} />

      <div className="relative z-10 layout-container">
        <SectionHeading title={t.about.title} subtitle={t.about.subtitle} light={false} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — body text + bullet points */}
          <div ref={leftRef} style={{ opacity: 0 }} className="space-y-8">
            <p className="text-primary/70 text-base sm:text-lg leading-relaxed font-normal">{t.about.body}</p>

            {/* Feature bullet list */}
            <ul className="space-y-4">
              {t.about.features.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#D4A017,#F0C842)" }}>
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-primary/70 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <a href="#contact" className="btn-primary">
                {t.about.enrollCta} →
              </a>
            </div>
          </div>

          {/* RIGHT — animated stat counters */}
          <div ref={rightRef} style={{ opacity: 0 }} className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-5">
              {t.about.stats.map((s, i) => (
                <StatCard
                  key={s.label}
                  label={s.label}
                  target={STATS_META[i].target}
                  suffix={STATS_META[i].suffix}
                  duration={STATS_META[i].duration}
                  triggerRef={rightRef as React.RefObject<HTMLDivElement | null>}
                />
              ))}
            </div>

            {/* Vision card */}
            <div className="rounded-2xl p-7 sm:p-8 border border-primary/10 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0A1F5C 0%, #1A3A8F 100%)" }}>
              <div className="absolute right-5 top-5 text-5xl opacity-20">🎓</div>
              <div className="text-gold font-heading text-xl font-bold mb-4">{t.about.visionTitle}</div>
              <p className="text-white/60 text-sm leading-relaxed font-normal">
                {t.about.visionBody}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

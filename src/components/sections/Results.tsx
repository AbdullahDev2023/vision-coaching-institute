"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCarousel } from "@/lib/useCarousel";
import { CarouselNav } from "@/components/sections/Testimonials";
import { useCountUp } from "@/lib/useCountUp";
import SectionHeading from "@/components/ui/SectionHeading";
import { STATS_META } from "@/lib/statsConfig";

const BADGE: Record<string, string> = {
  CBSE:       "bg-blue-500/15 text-blue-300 border-blue-400/30",
  ISC:        "bg-purple-500/15 text-purple-300 border-purple-400/30",
  ICSE:       "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "UP Board": "bg-orange-500/15 text-orange-300 border-orange-400/30",
};


function StatCounter({ target, suffix, duration, label, triggerRef }: {
  target: number; suffix: string; duration: number; label: string;
  triggerRef: React.RefObject<HTMLElement>;
}) {
  const numRef = useCountUp(target, suffix, triggerRef, duration);
  return (
    <div className="relative text-center p-4 sm:p-6 rounded-2xl overflow-hidden group"
      style={{ background: "linear-gradient(135deg,#0D1B4B,#1A3A8F20)", border: "1px solid rgba(212,160,23,0.12)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-gold/60 rounded-full" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 50%,rgba(212,160,23,0.08) 0%,transparent 70%)" }} />
      <span ref={numRef} className="block text-2xl sm:text-3xl font-heading font-bold text-gold-shimmer mb-2">
        {target}{suffix}
      </span>
      <span className="text-white/45 text-[10px] sm:text-xs uppercase tracking-wide leading-snug">{label}</span>
    </div>
  );
}

/* Ã¢â€â‚¬Ã¢â€â‚¬ Single topper card Ã¢â€â‚¬Ã¢â€â‚¬ */
function TopperCard({ tp, featured = false }: {
  tp: { name: string; board: string; percentage: string; year: string; class: string };
  featured?: boolean;
}) {
  return (
    <div className={`relative bg-bg-card border rounded-2xl p-8 text-center overflow-hidden group transition-all duration-300 ${
      featured ? "border-gold/30 scale-[1.03] shadow-[0_12px_40px_rgba(212,160,23,0.18)]" : "border-gold/10 opacity-60 scale-95"
    }`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%,rgba(212,160,23,0.10) 0%,transparent 60%)" }} />
      {featured && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gold/60 rounded-full" />}
      <div className="w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center text-gold font-bold text-xl mx-auto"
        style={{ background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)", marginBottom: "var(--igap-sm)" }}>
        {tp.name[0]}
      </div>
      <div className="text-gold font-heading text-4xl font-bold text-gold-shimmer">{tp.percentage}</div>
      <h3 className="text-white font-semibold leading-snug" style={{ marginTop: "var(--igap-sm)" }}>{tp.name}</h3>
      <p className="text-white/45 text-sm font-normal" style={{ marginTop: "calc(var(--igap-sm) / 2)" }}>{tp.class} Ã‚Â· {tp.year}</p>
      <span className={`badge ${BADGE[tp.board] ?? "bg-white/10 text-white border-white/20"}`}
        style={{ marginTop: "var(--igap-sm)" }}>
        {tp.board}
      </span>
    </div>
  );
}

export default function Results() {
  const { t } = useLanguage();
  const [activeYear, setActiveYear] = useState("All");
  const revealRef = useRef<HTMLDivElement>(null);
  useScrollReveal(revealRef as React.RefObject<HTMLElement>, { stagger: 0.10 });

  const years = ["All", ...Array.from(new Set(t.results.toppers.map(tp => tp.year))).sort((a, b) => +b - +a)];
  const toppers = activeYear === "All" ? t.results.toppers : t.results.toppers.filter(tp => tp.year === activeYear);
  const n = toppers.length;

  const { index, dir, next, prev, goTo, onDragEnd, reset, sectionRef } = useCarousel(n, 4000);

  const handleYear = (yr: string) => { setActiveYear(yr); reset(); };

  const statsLabels = [t.results.passRateLabel, t.about.stats[0].label, t.about.stats[2].label];

  const prevCard = toppers[(index - 1 + n) % n];
  const currCard = toppers[index];
  const nextCard = toppers[(index + 1) % n];

  return (
    <div className="section-pad bg-bg-dark" style={{ background: "#050D1F" }}
      ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div className="layout-container section-inner" ref={revealRef}>
        <SectionHeading title={t.results.title} subtitle={t.results.subtitle} />

        {/* Stats row */}
        <div className="grid grid-cols-3 gsap-reveal" style={{ gap: "var(--igap-sm)" }}>
          {STATS_META.map((s, i) => (
            <StatCounter key={i} target={s.target} suffix={s.suffix} duration={s.duration}
              label={statsLabels[i]} triggerRef={revealRef as React.RefObject<HTMLElement>} />
          ))}
        </div>

        {/* Year filter tabs */}
        <div className="flex flex-wrap justify-center gsap-reveal" style={{ gap: "var(--igap-sm)" }}>
          {years.map(yr => (
            <button key={yr} onClick={() => handleYear(yr)}
              className={`min-w-[72px] px-5 py-2.5 rounded-full text-sm font-semibold leading-none border transition-all duration-200 ${
                activeYear === yr
                  ? "bg-gold text-primary border-gold shadow-lg shadow-gold/30"
                  : "bg-transparent text-white/55 border-white/15 hover:border-gold/50 hover:text-white/85"
              }`}>
              {yr}
            </button>
          ))}
        </div>
        {/* Tablet+: 2 or 3-card carousel */}
        <div className="hidden md:block gsap-reveal">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`${activeYear}-${index}`} custom={dir}
              initial={{ opacity: 0, x: dir * 50 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -50 }} transition={{ duration: 0.38, ease: "easeOut" }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-center">
              <TopperCard tp={prevCard} />
              <TopperCard tp={currCard} featured />
              <TopperCard tp={nextCard} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: single swipeable card */}
        <div className="md:hidden gsap-reveal">
          <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
            onDragEnd={onDragEnd} className="cursor-grab active:cursor-grabbing overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={`${activeYear}-${index}`} custom={dir}
                initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.38, ease: "easeOut" }}>
                <TopperCard tp={currCard} featured />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <CarouselNav total={n} index={index} onPrev={prev} onNext={next} onGoTo={goTo} />

        <p className="text-center text-white/25 text-xs">
          {index + 1} / {n} Ã‚Â· Ã¢â€ Â Ã¢â€ â€™ keys or swipe to navigate
        </p>
      </div>
    </div>
  );
}

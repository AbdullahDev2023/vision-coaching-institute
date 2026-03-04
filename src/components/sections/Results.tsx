"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCountUp } from "@/lib/useCountUp";
import SectionHeading from "@/components/ui/SectionHeading";

const BADGE: Record<string, string> = {
  CBSE:      "bg-blue-500/15 text-blue-300 border-blue-400/30",
  ISC:       "bg-purple-500/15 text-purple-300 border-purple-400/30",
  ICSE:      "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "UP Board":"bg-orange-500/15 text-orange-300 border-orange-400/30",
};

export default function Results() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.10 });

  // Derive available years from data (sorted desc) + "All"
  const years = ["All", ...Array.from(new Set(t.results.toppers.map(tp => tp.year))).sort((a, b) => +b - +a)];
  const [activeYear, setActiveYear] = useState("All");

  const filtered = activeYear === "All"
    ? t.results.toppers
    : t.results.toppers.filter(tp => tp.year === activeYear);

  // Pass-rate stat counter
  const passRateRef = useCountUp(95, "%", sectionRef as React.RefObject<HTMLElement>, 2.2);

  return (
    <div className="section-pad bg-bg-dark" style={{ background: "#050D1F" }} ref={sectionRef}>
      <div className="layout-container">
        <SectionHeading title={t.results.title} subtitle={t.results.subtitle} />

        {/* Pass-rate stat */}
        <div className="flex justify-center mb-10 gsap-reveal">
          <div className="inline-flex items-baseline gap-3 bg-bg-card border border-gold/20 rounded-2xl px-10 py-7"
            style={{ boxShadow: "0 4px 30px rgba(212,160,23,0.10)" }}>
            <span ref={passRateRef} className="text-5xl font-heading font-bold text-gold-shimmer">95%</span>
            <span className="text-white/55 text-base">{t.results.passRateLabel}</span>
          </div>
        </div>

        {/* Year filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 gsap-reveal">
          {years.map(yr => (
            <button key={yr} onClick={() => setActiveYear(yr)}
              className={`min-w-[80px] px-7 py-3 rounded-full text-sm font-semibold leading-none border transition-all duration-200 ${
                activeYear === yr
                  ? "bg-gold text-primary border-gold shadow-lg shadow-gold/30"
                  : "bg-transparent text-white/55 border-white/15 hover:border-gold/50 hover:text-white/85"
              }`}>
              {yr}
            </button>
          ))}
        </div>

        {/* Topper cards */}
        <AnimatePresence mode="wait">
          <motion.div key={activeYear}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tp) => (
              <motion.div key={tp.name + tp.year}
                whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(212,160,23,0.18)" }}
                transition={{ duration: 0.2 }}
                className="relative bg-bg-card border border-gold/10 rounded-2xl p-5 sm:p-6 lg:p-7 text-center overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,160,23,0.10) 0%, transparent 60%)" }} />
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full border-2 border-gold/40 flex items-center justify-center text-gold font-bold text-xl mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)" }}>
                  {tp.name[0]}
                </div>
                <div className="text-gold font-heading text-4xl font-bold text-gold-shimmer">{tp.percentage}</div>
                <h3 className="text-white font-semibold mt-3 leading-snug">{tp.name}</h3>
                <p className="text-white/45 text-sm mt-2 font-normal">{tp.class} · {tp.year}</p>
                <span className={`badge mt-4 ${BADGE[tp.board] ?? "bg-white/10 text-white border-white/20"}`}>
                  {tp.board}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

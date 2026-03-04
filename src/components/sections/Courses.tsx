"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

const BOARD_META = [
  { color: "#4488ff", icon: "📘", bg: "rgba(68,136,255,0.08)", border: "rgba(68,136,255,0.25)" },
  { color: "#44ddaa", icon: "📗", bg: "rgba(68,221,170,0.08)", border: "rgba(68,221,170,0.25)" },
  { color: "#D4A017", icon: "📙", bg: "rgba(212,160,23,0.08)",  border: "rgba(212,160,23,0.25)"  },
  { color: "#ff6688", icon: "📕", bg: "rgba(255,102,136,0.08)", border: "rgba(255,102,136,0.25)" },
];

const SUBJECT_ICONS: Record<string, string> = {
  Mathematics: "🔢", Maths: "🔢", Ganit: "🔢", गणित: "🔢",
  Physics: "⚛️", Bhautiki: "⚛️", भौतिकी: "⚛️",
  Chemistry: "🧪", "Rasayan Vigyan": "🧪", रसायन: "🧪", "रसायन विज्ञान": "🧪",
  Biology: "🧬", "Jeev Vigyan": "🧬", "जीव विज्ञान": "🧬",
};

export default function Courses() {
  const { t }        = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const sectionRef   = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.13 });
  const boards       = t.courses.boards;

  return (
    <div className="relative section-pad overflow-hidden" ref={sectionRef}
      style={{ background: "linear-gradient(180deg, #0A1F5C 0%, #050D1F 100%)" }}>

      {/* Radial glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,160,23,0.07) 0%, transparent 70%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 layout-container">
        <SectionHeading title={t.courses.title} subtitle={t.courses.subtitle} />

        {/* ── 4-board card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {boards.map((board, i) => {
            const meta    = BOARD_META[i];
            const isActive = active === i;
            return (
              <motion.div key={board.name}
                className="gsap-reveal relative rounded-2xl p-5 sm:p-6 cursor-pointer overflow-hidden border transition-all duration-300 min-h-[200px]"
                style={{
                  background: isActive ? meta.bg : "rgba(13,27,75,0.7)",
                  borderColor: isActive ? meta.border : "rgba(255,255,255,0.07)",
                }}
                onClick={() => setActive(isActive ? null : i)}
                whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(0,0,0,0.4)` }}
                animate={{ borderColor: isActive ? meta.border : "rgba(255,255,255,0.07)" }}>

                {/* Glow blob */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                  style={{ background: meta.color, opacity: isActive ? 0.18 : 0.06 }} />

                {/* Board icon + name */}
                <div className="relative z-10 flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
                    {meta.icon}
                  </div>
                  <div>
                    <div className="text-white font-heading font-bold text-lg leading-tight">{board.name}</div>
                    <div className="text-white/45 text-xs mt-1.5 font-normal">{board.classes}</div>
                  </div>
                </div>

                {/* Subject pills */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {board.subjects.map((s) => (
                    <span key={s}
                      className="badge"
                      style={{ background: `${meta.color}18`, color: meta.color, borderColor: `${meta.color}30` }}>
                      <span>{SUBJECT_ICONS[s] ?? "📖"}</span>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 mt-4 pt-4 border-t overflow-hidden"
                      style={{ borderColor: `${meta.color}30` }}>
                      <div className="text-[11px] text-white/40 uppercase tracking-widest mb-3 font-bold">{t.courses.highlightsLabel}</div>
                      {t.courses.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2.5 text-white/65 text-xs mb-2.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                          {h}
                        </div>
                      ))}
                      <a href="#contact"
                        className="btn-sm mt-4"
                        style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`, color: "#050D1F" }}>
                        {t.courses.enquireCta} →
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── All-subjects comparison strip ── */}
        <div className="gsap-reveal mt-4">
          <p className="text-center text-white/35 text-sm mb-5 flex items-center justify-center gap-2">
            <span>↓</span>
            <span>Compare all boards side by side</span>
            <span>↓</span>
          </p>
          <div className="rounded-2xl border border-white/15 overflow-x-auto"
            style={{ background: "rgba(13,27,75,0.6)", backdropFilter: "blur(10px)" }}>
            <div className="min-w-[480px]">
            <div className="grid grid-cols-4 border-b border-white/15">
              {boards.map((b, i) => (
                <div key={b.name} className="px-4 py-4 sm:px-5 text-center border-r border-white/15 last:border-r-0">
                  <span className="text-sm font-bold" style={{ color: BOARD_META[i].color }}>{b.name}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4">
              {boards.map((b, i) => (
                <div key={b.name} className="px-4 py-4 sm:px-5 border-r border-white/15 last:border-r-0 space-y-3">
                  {b.subjects.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-white/70 text-sm">
                      <span>{SUBJECT_ICONS[s] ?? "📖"}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* ── Hint ── */}
        <p className="text-center text-white/25 text-xs mt-5">
          {t.courses.hint} ·
          <a href="#contact" className="text-gold/60 hover:text-gold ml-1 transition-colors">{t.courses.enrollLink} →</a>
        </p>
      </div>
    </div>
  );
}

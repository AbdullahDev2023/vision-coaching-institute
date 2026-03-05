"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ShareButton from "@/components/ui/ShareButton";
import { shareCourse } from "@/lib/shareUtils";
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
    <div className="relative section-pad overflow-clip" ref={sectionRef}
      style={{ background: "linear-gradient(180deg, #0A1F5C 0%, #050D1F 100%)" }}>

      {/* Radial glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,160,23,0.07) 0%, transparent 70%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 layout-container section-inner">
        <SectionHeading title={t.courses.title} subtitle={t.courses.subtitle} />

        {/* ── 4-board card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "var(--igap-sm)" }}>
          {boards.map((board, i) => {
            const meta    = BOARD_META[i];
            const isActive = active === i;
            return (
              <motion.div key={board.name}
                className="gsap-reveal relative rounded-2xl p-5 sm:p-6 cursor-pointer overflow-hidden border transition-all duration-300"
                style={{
                  background: isActive ? meta.bg : "rgba(13,27,75,0.7)",
                  borderColor: isActive ? meta.border : "rgba(255,255,255,0.07)",
                }}
                onClick={() => setActive(isActive ? null : i)}
                whileHover={{ y: -4, boxShadow: `0 20px 50px rgba(0,0,0,0.4)` }}
                animate={{ borderColor: isActive ? meta.border : "rgba(255,255,255,0.07)" }}>

                {/* "Most Popular" badge — CBSE only */}
                {board.name === "CBSE" && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 badge-xs whitespace-nowrap z-20"
                    style={{ background: "linear-gradient(135deg,#D4A017,#F0C842)", color: "#0A1F5C", fontWeight: 800, borderColor: "transparent", borderRadius: "0 0 8px 8px" }}>
                    ★ Most Popular
                  </span>
                )}

                {/* Glow blob */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
                  style={{ background: meta.color, opacity: isActive ? 0.18 : 0.06 }} />

                {/* Board icon + name */}
                <div className="relative z-10 flex items-center gap-4" style={{ marginBottom: "var(--igap-sm)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
                    {meta.icon}
                  </div>
                  <div>
                    <div className="text-white font-heading font-bold text-lg leading-tight">{board.name}</div>
                    <div className="text-white/45 text-xs mt-2 font-normal">{board.classes}</div>
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
                      <div className="px-4 py-3 rounded-xl mb-3" style={{ background: `${meta.color}0d` }}>
                        <div className="text-xs text-white/40 uppercase tracking-widest mb-3 font-bold">{t.courses.highlightsLabel}</div>
                        {t.courses.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2.5 text-white/65 text-sm mb-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                            {h}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-3 px-1">
                        <a href="#contact"
                          className="btn-sm"
                          style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`, color: "#050D1F" }}>
                          {t.courses.enquireCta} →
                        </a>
                        <ShareButton
                          href={shareCourse(board.name, board.classes, board.subjects)}
                          label="Share"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Batch Timings ── */}
        <div className="gsap-reveal rounded-2xl border border-white/10 overflow-hidden"
          style={{ background: "rgba(13,27,75,0.6)", backdropFilter: "blur(10px)" }}>
          <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2">
            <span className="text-lg">🕐</span>
            <span className="text-gold font-bold text-sm uppercase tracking-wider">{t.courses.timingsTitle}</span>
          </div>
          <div className="divide-y divide-white/8">
            {[
              { group: "6th – 8th",   batch: "Morning", time: "7:00 AM – 9:00 AM",   icon: "🌅" },
              { group: "9th – 10th",  batch: "Morning", time: "9:30 AM – 11:30 AM",  icon: "☀️" },
              { group: "11th – 12th", batch: "Evening", time: "5:00 PM – 7:00 PM",   icon: "🌆" },
            ].map((row) => (
              <div key={row.group}
                className="grid items-center px-5 sm:px-6 py-4 gap-x-2"
                style={{ gridTemplateColumns: "auto 1fr auto" }}>
                <span className="text-white/80 text-sm font-semibold whitespace-nowrap">{row.group}</span>
                <span className="text-white/40 text-xs text-center">{row.icon} {row.batch}</span>
                <span className="text-gold/80 text-sm font-medium text-right whitespace-nowrap">{row.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hint ── */}
        <p className="text-center text-white/25 text-sm">
          {t.courses.hint} ·
          <a href="#contact" className="text-gold/60 hover:text-gold ml-1 transition-colors">{t.courses.enrollLink} →</a>
        </p>
      </div>
    </div>
  );
}

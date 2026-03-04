"use client";
import { useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

/* ── Consistent icon colour palette — gold only, unified style ── */
const CARD_ACCENT = "#D4A017";

/* ── 3D tilt card ── */
function TiltCard({ icon, title, desc, index }: {
  icon: string; title: string; desc: string; index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 30 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  /* Each card gets a slightly different ring tint while staying on-brand */
  const RING_COLORS = ["#D4A017", "#F0C842", "#C8930F", "#E5B020"];
  const color = RING_COLORS[index % RING_COLORS.length];

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width  - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const reset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className="gsap-reveal"
      style={{ perspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={reset}>
      <motion.div
        className="relative rounded-2xl p-7 sm:p-8 lg:p-10 text-center h-full cursor-default overflow-hidden group"
        whileHover={{
          y: -6,
          borderColor: "rgba(212,160,23,0.50)",
          boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,160,23,0.25)`,
        }}
        transition={{ duration: 0.22 }}
        style={{
          rotateX, rotateY, transformStyle: "preserve-3d",
          background: "linear-gradient(160deg, #0D1B4B 0%, #091540 100%)",
          border: "1px solid rgba(212,160,23,0.10)",
        }}>

        {/* Follow-glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(212,160,23,0.12) 0%, transparent 65%)` }} />

        {/* Icon ring — consistent gold style */}
        <div className="relative w-[76px] h-[76px] mx-auto mb-7">
          <div className="absolute inset-0 rounded-full blur-xl opacity-30"
            style={{ background: color }} />
          <div className="relative w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, rgba(212,160,23,0.15) 0%, rgba(212,160,23,0.05) 100%)`,
              border: `1.5px solid rgba(212,160,23,0.40)`,
              boxShadow: `0 0 20px rgba(212,160,23,0.15)`,
            }}>
            <span className="text-3xl select-none">{icon}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-white text-lg mb-4 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed pb-2">
          {desc}
        </p>

        {/* Bottom accent line animates on hover */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${CARD_ACCENT}, transparent)` }}
          initial={{ width: 0 }}
          whileHover={{ width: "70%" }}
          transition={{ duration: 0.35 }} />
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  const { t }      = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.14 });

  /* Updated, outcome-focused descriptions */
  const DESCS = [
    "Personal attention with limited students per batch for focused learning.",
    "Dedicated daily doubt sessions with expert teachers after every class.",
    "Regular weekly tests with detailed performance tracking and feedback.",
    "Try a free demo class before enrolling — no commitment required.",
  ];

  return (
    <div className="relative section-pad bg-bg-dark overflow-hidden" ref={sectionRef}>

      {/* Subtle dot grid — kept very faint so it never bleeds through card text */}
      <div className="absolute inset-0 opacity-[0.014]"
        style={{ backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Gold top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,160,23,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 layout-container" style={{ maxWidth: "64rem" }}>

        {/* Heading with stronger subtitle */}
        <div className="mb-14">
          <SectionHeading title={t.features.title} subtitle={t.features.subtitle} />
        </div>

        {/* Cards — reduced container width for premium feel, more gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {t.features.items.map((item, i) => (
            <TiltCard key={item.title} icon={item.icon} title={item.title} desc={DESCS[i]} index={i} />
          ))}
        </div>

        {/* CTA strip — clear vertical separation from cards */}
        <motion.div
          className="mt-12 sm:mt-16 lg:mt-20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 gsap-reveal"
          style={{
            background: "linear-gradient(135deg, #0A1F5C 0%, #1A3A8F 100%)",
            border: "1px solid rgba(212,160,23,0.25)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
          }}>
          <div className="text-center sm:text-left">
            <div className="text-white font-heading text-xl sm:text-2xl font-bold mb-3 leading-snug text-center sm:text-left">
              {t.features.ctaTitle}
            </div>
            <div className="text-white/60 text-base leading-relaxed">{t.features.ctaBody}</div>
          </div>
          <a
            href={`https://wa.me/917210433685`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 btn-primary">
            🎓 {t.features.ctaBtn} →
          </a>
        </motion.div>
      </div>
    </div>
  );
}

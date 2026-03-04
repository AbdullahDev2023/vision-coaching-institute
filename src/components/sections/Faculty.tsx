"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Member = { name: string; subject: string; qualification: string; exp: string; photo?: string };

const C = {
  math:      { ring: "#D4A017", glow: "rgba(212,160,23,0.28)", accent: "rgba(212,160,23,0.10)" },
  physics:   { ring: "#3B82F6", glow: "rgba(59,130,246,0.28)",  accent: "rgba(59,130,246,0.10)"  },
  chemistry: { ring: "#14B8A6", glow: "rgba(20,184,166,0.28)",  accent: "rgba(20,184,166,0.10)"  },
  biology:   { ring: "#EF4444", glow: "rgba(239,68,68,0.28)",   accent: "rgba(239,68,68,0.10)"   },
};

function subjectColor(subject: string) {
  const s = subject.toLowerCase();
  if (s.includes("math") || s.includes("गणित"))  return C.math;
  if (s.includes("phys") || s.includes("भौतिक")) return C.physics;
  if (s.includes("chem") || s.includes("रसायन")) return C.chemistry;
  return C.biology;
}

function initials(name: string) {
  return name.split(" ").filter(w => /^[A-Za-z\u0900-\u097F]/.test(w)).slice(0, 2).map(n => n[0]).join("");
}

function TiltCard({ m, photoSoon }: { m: Member; photoSoon: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX   = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY   = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const c = subjectColor(m.subject);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onReset = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div className="gsap-reveal" style={{ perspective: 800 }}
      onMouseMove={onMove} onMouseLeave={onReset}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", background: "#ffffff" }}
        className="relative bg-white border border-primary/8 rounded-2xl p-6 sm:p-7 lg:p-8 text-center overflow-hidden cursor-default group h-full"
        whileHover={{ borderColor: `${c.ring}55`, boxShadow: `0 16px 50px ${c.glow}` }}
        transition={{ duration: 0.2 }}>

        {/* Subject-coloured top strip */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${c.ring}, transparent)` }} />

        {/* Dynamic follow-glow */}
        <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{ background: `radial-gradient(circle at ${glowX} ${glowY}, ${c.glow} 0%, transparent 65%)` }} />

        {/* Avatar — real photo or initials fallback */}
        <div className="flex flex-col items-center mb-9">
          <div className="relative">
            {m.photo ? (
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: `0 0 0 3px ${c.ring}, 0 0 24px ${c.glow}` }}>
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl"
                style={{ background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)", color: c.ring,
                  boxShadow: `0 0 0 3px ${c.ring}, 0 0 24px ${c.glow}` }}>
                {initials(m.name)}
              </div>
            )}
            {/* "Photo soon" badge — only shown when no photo */}
            {!m.photo && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 badge-xs whitespace-nowrap"
                style={{ background: "rgba(10,31,92,0.95)", border: "1px solid rgba(212,160,23,0.35)", color: "rgba(212,160,23,0.75)" }}>
                📷 {photoSoon}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-primary text-base leading-snug mt-3">{m.name}</h3>
        <p className="font-semibold text-sm mt-2 leading-snug" style={{ color: c.ring }}>{m.subject}</p>
        <p className="text-primary/50 text-xs mt-2 leading-snug font-normal">{m.qualification}</p>
        <span className="badge mt-5"
          style={{ background: c.accent, color: c.ring, borderColor: `${c.ring}55` }}>
          {m.exp}
        </span>

        {/* Animated bottom bar */}
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${c.ring}, transparent)` }}
          initial={{ width: 0 }} whileHover={{ width: "80%" }} transition={{ duration: 0.3 }} />
      </motion.div>
    </motion.div>
  );
}

export default function Faculty() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.13 });

  return (
    <div className="section-pad bg-bg-light" style={{ background: "#F8F9FF" }} ref={sectionRef}>
      <div className="layout-container">
        <SectionHeading title={t.faculty.title} subtitle={t.faculty.subtitle} light={false} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.faculty.members.map((m) => (
            <TiltCard key={m.name} m={m} photoSoon={t.faculty.photoSoon} />
          ))}
        </div>
      </div>
    </div>
  );
}

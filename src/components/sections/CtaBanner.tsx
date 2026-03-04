"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A1F5C 0%, #050D1F 50%, #0A1F5C 100%)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.4 }}>

      {/* Gold shimmer top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4A017, #F0C842, #D4A017, transparent)" }} />

      {/* Background orbs */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)" }} />
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,58,143,0.40) 0%, transparent 70%)" }} />

      <div className="relative z-10 layout-container py-20 sm:py-28 flex flex-col items-center text-center"
        style={{ gap: "var(--igap-sm)" }}>

        {/* Urgency pill */}
        <motion.div className="flex items-center gap-3 flex-wrap justify-center"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }} viewport={{ once: true }}>
          <span className="eyebrow text-gold/70">🎓 2026–27 Admissions Open</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#fca5a5" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
            Only 8 seats left
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-heading font-bold text-2xl text-white leading-tight"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }} viewport={{ once: true }}>
          Limited seats available — <span className="text-gold-shimmer">book yours today</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-white/55 text-sm leading-relaxed max-w-xs font-normal"
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }} viewport={{ once: true }}>
          Small batches fill fast. Secure your child&apos;s seat with a free demo class.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="cta-stack w-full max-w-xs mx-auto"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.40, duration: 0.4 }} viewport={{ once: true }}>
          <a
            href={`https://wa.me/${t.contact.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20free%20demo%20class`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary">
            🎓 Book Free Demo Class
          </a>
          <a href="#contact" className="btn-secondary">
            Call Us →
          </a>
        </motion.div>
      </div>

      {/* Gold shimmer bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4A017, #F0C842, #D4A017, transparent)" }} />
    </motion.div>
  );
}

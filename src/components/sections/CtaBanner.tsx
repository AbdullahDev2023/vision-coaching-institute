"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import ShareButton from "@/components/ui/ShareButton";

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A1F5C 0%, #050D1F 50%, #0A1F5C 100%)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.4 }}>

      {/* Static gold top border — no shimmer animation */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4A017, transparent)" }} />

      <div className="relative z-10 layout-container py-16 sm:py-24 flex flex-col items-center text-center"
        style={{ gap: "var(--igap-sm)" }}>

        {/* Urgency pill */}
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#fca5a5" }}>
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
          2026–27 Admissions — Only 8 seats left
        </span>

        {/* Headline — plain gold, no shimmer */}
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight max-w-lg">
          Limited seats available —{" "}
          <span className="text-gold">book yours today</span>
        </h2>

        <p className="text-white/50 text-sm leading-relaxed max-w-xs font-normal">
          Small batches fill fast. Secure your child&apos;s seat with a free demo class.
        </p>

        {/* CTAs row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <a
            href={`https://wa.me/${t.contact.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20free%20demo%20class`}
            target="_blank" rel="noopener noreferrer"
            className="btn-primary">
            🎓 Book Free Demo Class
          </a>
          <ShareButton variant="banner" />
        </div>

        {/* Share nudge */}
        <p className="text-white/30 text-[11px] mt-1">
          Apne dost / neighbour ko bhi batao — unke bache bhi benefit kar sakte hain 🙌
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #D4A017, transparent)" }} />
    </motion.div>
  );
}

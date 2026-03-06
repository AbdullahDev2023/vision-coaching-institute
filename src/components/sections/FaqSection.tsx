"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type FaqItem = { q: string; a: string };

function FaqRow({ item, index, isOpen, onToggle }: {
  item: FaqItem; index: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      className="gsap-reveal border-b border-white/10 last:border-b-0 overflow-hidden"
      initial={false}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-8 sm:py-9 text-left group">
        <div className="flex items-center gap-4">
          {/* Number */}
          <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
            style={{
              background: isOpen ? "rgba(212,160,23,0.15)" : "rgba(255,255,255,0.04)",
              borderColor: isOpen ? "rgba(212,160,23,0.50)" : "rgba(255,255,255,0.12)",
              color: isOpen ? "#F0C842" : "rgba(255,255,255,0.40)",
            }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
            isOpen ? "text-white" : "text-white/70 group-hover:text-white/90"
          }`}>
            {item.q}
          </span>
        </div>
        {/* Chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gold/60 text-lg leading-none"
          style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.18)" }}>
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <p className="pl-12 text-white/70 text-sm leading-loose font-normal pr-8"
              style={{ paddingBottom: "var(--igap-sm)" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.07 });

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqData = (t as any).faq as { title: string; subtitle: string; items: FaqItem[] };

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <div
      className="relative section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050D1F 0%, #0A1F5C 100%)" }}
      ref={sectionRef}>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(212,160,23,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 layout-container section-inner">
        <SectionHeading title={faqData.title} subtitle={faqData.subtitle} />

        {/* Two-column layout on lg */}
        <div className="lg:grid lg:grid-cols-[1fr_1.3fr] lg:items-start" style={{ gap: "var(--igap)" }}>

          {/* Left — sticky CTA card */}
          <motion.div
            className="hidden lg:block sticky top-28 gsap-reveal"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
            <div className="rounded-2xl p-8 border border-gold/15"
              style={{ background: "linear-gradient(135deg, rgba(13,27,75,0.9), rgba(10,31,92,0.6))", backdropFilter: "blur(12px)" }}>
              <div className="text-4xl" style={{ marginBottom: "var(--igap-sm)" }}>💬</div>
              <h3 className="font-heading font-bold text-white text-xl leading-snug" style={{ marginBottom: "var(--igap-sm)" }}>
                Still have questions?
              </h3>
              <p className="text-white/65 text-sm leading-relaxed font-normal" style={{ marginBottom: "var(--igap)" }}>
                Our team is available Mon–Sat, 7 AM to 8 PM. Drop a WhatsApp or call us directly.
              </p>
              <a
                href="https://wa.me/917210433685?text=Hi%2C%20I%20have%20a%20question%20about%20admissions"
                target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp" style={{ marginBottom: "var(--igap-sm)" }}>
                <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Ask on WhatsApp
              </a>
              <a href="tel:+917210433685"
                className="flex items-center justify-center gap-2 text-white/50 hover:text-gold text-sm transition-colors mt-3">
                📞 +91 72104 33685
              </a>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <div className="rounded-2xl border border-white/8 overflow-hidden gsap-reveal"
            style={{ background: "rgba(13,27,75,0.55)", backdropFilter: "blur(10px)" }}>
            <div className="px-6 sm:px-8 divide-y-0">
              {faqData.items.map((item, i) => (
                <FaqRow key={i} item={item} index={i} isOpen={openIndex === i} onToggle={() => toggle(i)} />
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <motion.div
            className="lg:hidden mt-8 text-center gsap-reveal"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }} viewport={{ once: true }}>
            <p className="text-white/65 text-sm mb-4 font-normal">Still have questions?</p>
            <a
              href="https://wa.me/917210433685?text=Hi%2C%20I%20have%20a%20question%20about%20admissions"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex">
              💬 Ask on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

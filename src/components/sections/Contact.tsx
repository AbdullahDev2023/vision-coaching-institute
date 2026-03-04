"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

function CopyPhone({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(phone.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* fallback: just follow href */ }
  };

  return (
    <a href={`tel:${phone.replace(/\s/g, "")}`}
      onClick={handleCopy}
      className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors group">
      <span className="w-10 h-10 rounded-full border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 flex items-center justify-center text-sm transition-all flex-shrink-0">
        📞
      </span>
      <span className="text-base sm:text-lg font-medium flex-1">{phone}</span>
      <span className={`transition-all duration-200 flex-shrink-0 ${
        copied
          ? "text-green-400 opacity-100"
          : "text-white/30 opacity-0 group-hover:opacity-100"
      }`}>
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </span>
    </a>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.15 });

  return (
    <div className="section-pad bg-bg-dark" ref={sectionRef}>
      <div className="layout-container">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">

          {/* ── Left panel: Info ── */}
          <motion.div className="space-y-8"
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.2 }}>

            {/* Phones */}
            <div>
              <h3 className="text-gold font-bold uppercase text-[11px] tracking-widest mb-4">{t.contact.callLabel}</h3>
              <div className="space-y-3">
                {t.contact.phones.map((p) => <CopyPhone key={p} phone={p} />)}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">📍</span>
              <div>
                <div className="text-gold font-bold uppercase text-[11px] tracking-widest mb-2">{t.contact.locationLabel}</div>
                <p className="text-white/60 text-sm leading-relaxed font-normal">{t.contact.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm flex-shrink-0">🕐</span>
              <div>
                <div className="text-gold font-bold uppercase text-[11px] tracking-widest mb-2">{t.contact.hoursLabel}</div>
                <p className="text-white/60 text-sm leading-relaxed font-normal">{t.contact.hours}</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${t.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}>
              <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {t.contact.whatsappBtn}
            </motion.a>
          </motion.div>

          {/* ── Right panel: Map ── */}
          <motion.div
            className="rounded-2xl overflow-hidden border border-white/8 h-[280px] sm:h-[380px] lg:h-auto lg:min-h-[420px]"
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, amount: 0.2 }}>
            <iframe
              src="https://maps.google.com/maps?q=Purani+Bazar,+Tulsipur,+Uttar+Pradesh&output=embed"
              width="100%" height="100%"
              style={{ border: 0, display: "block", minHeight: "280px" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vision Coaching Institute Location"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

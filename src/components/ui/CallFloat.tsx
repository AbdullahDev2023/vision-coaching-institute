"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CallFloat() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  /* Primary phone — first in the i18n contact list */
  const primaryPhone = t.contact.phones[0];
  const phoneHref = `tel:${primaryPhone.replace(/\s/g, "")}`;

  return (
    /**
     * POSITIONING RATIONALE
     * ─────────────────────
     * • position: fixed   → escapes every parent overflow-hidden / transform context
     * • bottom-24 (96px)  → clears the WhatsApp button (bottom-5 + 56px h + 4px gap)
     * • right-4  (16px)   → safe-area on 360px screens (no clipping)
     * • sm:right-5 (20px) → matches WhatsApp button on tablet/desktop
     * • z-[55]            → one layer above WhatsApp (z-50) so tooltips never collide
     *
     * SIZE
     * ─────────────────────
     * • w-12 h-12 (48px) mobile  — thumb-friendly, doesn't block content
     * • md:w-14 md:h-14 (56px)   — matches WhatsApp button on larger screens
     */
    <motion.div
      className="float-right fixed bottom-24 z-[55] flex items-center justify-end gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3.0, type: "spring", stiffness: 260, damping: 20 }}
    >

      {/* ── Tooltip (slides left of the button) ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.18 }}
            className="relative bg-white text-primary text-xs font-semibold px-3 py-2 rounded-xl max-w-[160px] break-words"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            📞 {primaryPhone}
            {/* Caret pointing right toward the button */}
            <span
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderLeft: "6px solid white",
                borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Call button ── */}
      <a
        href={phoneHref}
        aria-label={`Call us at ${primaryPhone}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="
          relative flex items-center justify-center flex-shrink-0
          w-12 h-12 md:w-14 md:h-14
          rounded-full
          hover:scale-110 transition-transform duration-200
        "
        style={{
          background: "linear-gradient(135deg, #0A1F5C, #1A3A8F)",
          boxShadow: "0 4px 20px rgba(10,31,92,0.55)",
        }}
      >
        {/* Gold pulse ring */}
        <span
          className="absolute inset-0 rounded-full opacity-25 animate-ping"
          style={{ background: "linear-gradient(135deg, #D4A017, #F0C842)" }}
        />

        {/* Hover gold outline ring */}
        <span
          className="absolute inset-0 rounded-full transition-all duration-200"
          style={{
            outline: hovered ? "2px solid rgba(212,160,23,0.65)" : "2px solid transparent",
            outlineOffset: "3px",
          }}
        />

        {/* Phone icon — solid, accessible */}
        <svg
          className="relative z-10 w-5 h-5 md:w-6 md:h-6 fill-white"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36
            1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1
            C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57
            3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>
    </motion.div>
  );
}

"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { haptic, HapticPattern } from "@/lib/haptics";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return isMobile;
}

export default function WhatsAppFloat() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  // On mobile BottomTabNav already has the WhatsApp CTA — no duplicate needed
  if (isMobile) return null;

  const wa = `https://wa.me/${t.contact.whatsapp}?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Vision%20Coaching%20Institute%20Tulsipur.`;

  return (
    <motion.div
      className="fixed z-50 flex items-center gap-3"
      style={{ bottom: "1.5rem", right: "1.5rem" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Tooltip label — desktop hover only */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white text-primary text-xs font-semibold px-3 py-2 rounded-xl shadow-xl max-w-[160px] break-words relative"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            💬 Chat on WhatsApp
            <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-white border-y-[5px] border-y-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => haptic(HapticPattern.confirm)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200"
        style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"
          style={{ animationIterationCount: 3 }}
        />
        <WhatsAppIcon className="w-7 h-7 fill-white relative z-10" />
      </a>
    </motion.div>
  );
}

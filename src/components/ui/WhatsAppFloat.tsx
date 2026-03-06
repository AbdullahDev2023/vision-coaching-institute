"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
import { haptic, HapticPattern } from "@/lib/haptics";

/** Bottom offset (px) above BottomTabNav on mobile, or above page edge on desktop */
function useBottomOffset() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export default function WhatsAppFloat() {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const isMobile = useBottomOffset();

  /* Hide when MobileBookingBar is visible */
  const [mobileBarVisible, setMobileBarVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearBottom = scrolled + winH >= docH - 300;
      setMobileBarVisible(scrolled > winH * 0.8 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${t.contact.whatsapp}?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Vision%20Coaching%20Institute%20Tulsipur.`;

  /**
   * Positioning:
   *  Mobile  (<lg): sit above the BottomTabNav (56px) + safe-area + 1rem gap
   *  Desktop (≥lg): 1.5rem from bottom-right corner
   */
  const bottomStyle = isMobile
    ? "calc(56px + env(safe-area-inset-bottom, 0px) + 1rem)"
    : "1.5rem";

  return (
    <AnimatePresence>
      {!mobileBarVisible && (
        <motion.div
          className="fixed z-50 flex items-center gap-3"
          style={{
            bottom: bottomStyle,
            right: isMobile ? "1rem" : "1.5rem",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}>

          {/* Tooltip label — desktop hover only */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hidden lg:block bg-white text-primary text-xs font-semibold px-3 py-2 rounded-xl shadow-xl max-w-[160px] break-words relative"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
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
            style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}>
            <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"
              style={{ animationIterationCount: 3 }} />
            <WhatsAppIcon className="w-7 h-7 fill-white relative z-10" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

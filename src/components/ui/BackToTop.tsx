"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useIsMobile() {
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

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /**
   * Sits directly above the WhatsApp button (w-14 h-14 = 56px):
   *   Mobile  (<lg): above BottomTabNav (56px) + safe-area + 1rem + WA(56px) + 0.625rem gap
   *   Desktop (≥lg): above WA (1.5rem + 56px + 0.625rem gap)
   */
  const bottomStyle = isMobile
    ? "calc(56px + env(safe-area-inset-bottom, 0px) + 1rem + 56px + 0.625rem)"
    : "calc(1.5rem + 56px + 0.625rem)";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="fixed z-[54] flex items-center justify-center"
          style={{
            bottom: bottomStyle,
            right: isMobile ? "1rem" : "1.5rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(10,31,92,0.92)",
            border: "1px solid rgba(212,160,23,0.45)",
            color: "#D4A017",
            fontSize: "1.15rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
            lineHeight: 1,
          }}>
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

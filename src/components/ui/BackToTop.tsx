"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [waHidden, setWaHidden] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      setVisible(scrolled > 300);
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearBottom = scrolled + winH >= docH - 300;
      setWaHidden(scrolled > winH * 0.8 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On mobile, BottomTabNav "Home" tab scrolls to top — no duplicate needed
  if (isMobile) return null;

  // Desktop: stack above WhatsApp FAB, or drop to its slot when WA hides
  const bottom = waHidden
    ? "1.5rem"
    : "calc(1.5rem + 56px + 0.625rem)";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="fixed z-[54] flex items-center justify-center"
          style={{
            bottom,
            right: "1.5rem",
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
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

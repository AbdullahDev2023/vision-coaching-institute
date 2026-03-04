"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-44 z-[54] flex items-center justify-center"
          style={{
            right: "max(1rem, calc((100% - 430px) / 2 + 1rem))",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(10,31,92,0.92)",
            border: "1px solid rgba(212,160,23,0.35)",
            color: "#D4A017",
            fontSize: "1.1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
          }}>
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

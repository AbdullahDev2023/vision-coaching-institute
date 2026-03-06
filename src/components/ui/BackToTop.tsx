"use client";
// BackToTop — framer-motion replaced with CSS transition for Speed Index.
// Dynamically imported in page.tsx so it never ships on first paint.
import { useEffect, useState } from "react";

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

  if (isMobile) return null;

  const bottom = waHidden ? "1.5rem" : "calc(1.5rem + 56px + 0.625rem)";

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
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
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.22s ease, transform 0.22s ease, bottom 0.22s ease",
      }}
    >↑</button>
  );
}

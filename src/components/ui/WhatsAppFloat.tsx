"use client";
// WhatsAppFloat — framer-motion replaced with CSS transitions.
// Dynamically imported in page.tsx so it never ships on first paint.
import { useLanguage } from "@/lib/LanguageContext";
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
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  // Delay mount so it never appears during initial paint (helps Speed Index)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (isMobile || !visible) return null;

  const wa = `https://wa.me/${t.contact.whatsapp}?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Vision%20Coaching%20Institute%20Tulsipur.`;

  return (
    <div
      className="fixed z-50 flex items-center gap-3"
      style={{
        bottom: "1.5rem", right: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0)",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Tooltip — CSS opacity transition */}
      <div
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(10px)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          pointerEvents: hovered ? "auto" : "none",
          background: "#ffffff",
          color: "#0A1F5C",
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "0.5rem 0.75rem",
          borderRadius: "0.75rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          maxWidth: 160,
          position: "relative",
        }}
      >
        💬 Chat on WhatsApp
        <span style={{
          position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)",
          width: 0, height: 0,
          borderLeft: "6px solid #ffffff",
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
        }} />
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => haptic(HapticPattern.confirm)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366]"
        style={{
          boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
          transition: "transform 0.2s ease",
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"
          style={{ animationIterationCount: "3" } as React.CSSProperties}
        />
        <WhatsAppIcon className="w-7 h-7 fill-white relative z-10" />
      </a>
    </div>
  );
}

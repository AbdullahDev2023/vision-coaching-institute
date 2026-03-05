"use client";
/**
 * BottomTabNav — persistent 5-tab mobile navigation bar.
 *
 * Replaces the hamburger-driven mobile menu with a native-app-style
 * bottom tab bar. Always visible on mobile (hidden lg:hidden).
 *
 * Tabs:  🏠 Home  |  📘 Courses  |  🎓 Demo (gold CTA)  |  📞 Call  |  💬 WA
 *
 * - Active tab tracked by IntersectionObserver (same sections as Navbar)
 * - Haptic feedback on every tap (Android vibration motor)
 * - Safe-area-inset-bottom respected for iPhone home bar
 * - Smooth scroll to section on tap
 * - WhatsApp + Call open native apps directly
 */
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { haptic, HapticPattern } from "@/lib/haptics";

const SECTIONS = ["home", "courses", "fees", "faculty", "results", "testimonials", "about", "faq", "gallery", "contact"] as const;

type Tab = {
  id:       string;
  label:    string;
  icon:     string;
  type:     "scroll" | "call" | "whatsapp" | "cta";
  href?:    string;
};

export default function BottomTabNav() {
  const { t } = useLanguage();
  const [active, setActive] = useState("home");
  const wa = `https://wa.me/${t.contact.whatsapp.replace(/\D/g,"")}?text=Hi%2C%20I%20want%20to%20book%20a%20FREE%20demo%20class%20at%20Vision%20Coaching%20Institute.`;

  const TABS: Tab[] = [
    { id: "home",    label: "Home",    icon: "🏠",  type: "scroll" },
    { id: "courses", label: "Courses", icon: "📘",  type: "scroll" },
    { id: "wa-cta",  label: "Free Demo", icon: "🎓", type: "cta",  href: wa },
    { id: "tel",     label: "Call",    icon: "📞",  type: "call",  href: `tel:${t.contact.phones[0].replace(/\s/g,"")}` },
    { id: "contact", label: "Contact", icon: "📍",  type: "scroll" },
  ];

  /* ── Track active section via IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    haptic(HapticPattern.tap);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      aria-label="Quick navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[65]"
      style={{
        background:    "rgba(5,13,31,0.97)",
        backdropFilter: "blur(16px)",
        borderTop:     "1px solid rgba(255,255,255,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow:     "0 -8px 32px rgba(0,0,0,0.45)",
      }}
    >
      <div className="flex items-end justify-around" style={{ height: "56px" }}>
        {TABS.map(tab => {
          const isActive = (tab.type === "scroll") && active === tab.id ||
                           (tab.type === "scroll") && tab.id === "contact" && active === "contact";
          const isCta    = tab.type === "cta";

          /* ── CTA centre button ── */
          if (isCta) return (
            <a
              key={tab.id}
              href={tab.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tab.label}
              onClick={() => haptic(HapticPattern.confirm)}
              className="flex flex-col items-center justify-center -translate-y-3 flex-shrink-0"
              style={{ width: 64 }}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="flex flex-col items-center justify-center w-14 h-14 rounded-full text-primary font-bold"
                style={{
                  background: "linear-gradient(135deg,#D4A017,#F0C842)",
                  boxShadow:  "0 4px 18px rgba(212,160,23,0.55), 0 0 0 3px rgba(212,160,23,0.18)",
                }}
              >
                <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>{tab.icon}</span>
              </motion.div>
              <span className="text-[9px] font-bold text-gold mt-0.5 leading-none tracking-wide">
                {tab.label}
              </span>
            </a>
          );

          /* ── Call button ── */
          if (tab.type === "call") return (
            <a
              key={tab.id}
              href={tab.href}
              aria-label={tab.label}
              onClick={() => haptic(HapticPattern.call)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            >
              <motion.div whileTap={{ scale: 0.85 }}
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: "rgba(10,31,92,0.7)", border: "1px solid rgba(68,136,255,0.35)" }}>
                <span style={{ fontSize: "1rem" }}>{tab.icon}</span>
              </motion.div>
              <span className="text-[10px] font-medium leading-none"
                style={{ color: "rgba(255,255,255,0.45)" }}>
                {tab.label}
              </span>
            </a>
          );

          /* ── Regular scroll tab ── */
          return (
            <button
              key={tab.id}
              type="button"
              aria-label={`Go to ${tab.label}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => scrollTo(tab.id)}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative"
            >
              {/* Active indicator dot */}
              {isActive && (
                <motion.span
                  layoutId="tab-dot"
                  className="absolute top-1.5 w-1 h-1 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.80 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-150"
                style={{
                  background: isActive ? "rgba(212,160,23,0.13)" : "transparent",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{tab.icon}</span>
              </motion.div>
              <span
                className="text-[10px] font-medium leading-none transition-colors duration-150"
                style={{ color: isActive ? "#F0C842" : "rgba(255,255,255,0.40)" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

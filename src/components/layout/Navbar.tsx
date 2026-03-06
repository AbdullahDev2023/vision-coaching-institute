"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LanguageToggle from "@/components/ui/LanguageToggle";
// GSAP removed — navbar entrance now uses CSS animation (saves ~50 KB gzip)

const NAV_LINKS = ["courses", "results", "faculty", "contact"] as const;

const NAV_ICONS: Record<string, string> = {
  courses: "📘",
  results: "🏆",
  faculty: "👨‍🏫",
  contact: "📍",
};

export default function Navbar() {
  const { t: _t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = _t as any;
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", ...NAV_LINKS];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`navbar-fixed navbar-entrance fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050D1F]/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5"
          : "bg-transparent"
      }`}>

      <div className="layout-container">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 sm:h-16 lg:h-20 gap-3 lg:gap-4">

          {/* ── Logo ── */}
          <a href="#home" onClick={(e) => handleNavClick(e, "home")}
            className="navbar-logo flex items-center gap-2.5 group flex-shrink-0 whitespace-nowrap">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0 shadow-md shadow-gold/20 group-hover:scale-105 transition-transform border border-gold/25">
              <Image src="/logo.webp" alt="Vision Coaching Institute" width={96} height={96}
                className="w-full h-full object-cover scale-[1.15]" priority sizes="96px" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-heading font-bold text-[0.8rem] sm:text-base tracking-wide group-hover:text-gold transition-colors duration-200">
                Vision Coaching
              </div>
              <div className="text-gold/70 text-[8px] sm:text-[9px] font-semibold tracking-[0.18em] uppercase">
                Institute · Tulsipur
              </div>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="navbar-links flex items-center"
              style={{
                gap: "0.125rem", padding: "0.25rem", borderRadius: "9999px",
                background: scrolled ? "rgba(255,255,255,0.04)" : "transparent",
                border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}>
              {NAV_LINKS.map((key) => {
                const isActive = activeSection === key;
                return (
                  <a key={key} href={`#${key}`} onClick={(e) => handleNavClick(e, key)}
                    className="relative capitalize transition-colors duration-200 select-none"
                    style={{
                      padding: "0.4375rem 0.875rem", borderRadius: "9999px",
                      fontSize: "0.8125rem", fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.01em", lineHeight: 1, whiteSpace: "nowrap",
                      color: isActive ? "#0A1F5C" : "rgba(255,255,255,0.72)",
                      background: isActive ? "linear-gradient(135deg, #D4A017, #F0C842)" : "transparent",
                      boxShadow: isActive ? "0 2px 10px rgba(212,160,23,0.35)" : "none",
                      transition: "color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "#D4A017"; (e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,0.10)"; }}}
                    onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}}>
                    {t.nav[key as keyof typeof t.nav]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LanguageToggle />
            {/* Desktop vlogs link */}
            <a href="/blog"
              className="hidden lg:inline-flex items-center gap-1.5 text-white/70 hover:text-gold transition-colors duration-200 text-[0.8125rem] font-medium whitespace-nowrap"
              style={{ letterSpacing: "0.01em" }}>
              <span className="text-base leading-none">📝</span> Vlogs
            </a>

            {/* Mobile hamburger — refined */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
              style={{ background: menuOpen ? "rgba(212,160,23,0.12)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex flex-col gap-[4.5px]">
                <span className="block h-[1.5px] rounded-full origin-center"
                  style={{
                    width: 18,
                    background: menuOpen ? "#D4A017" : "rgba(255,255,255,0.85)",
                    transform: menuOpen ? "rotate(45deg) translateY(5.5px)" : "none",
                    transition: "transform 0.2s ease, background 0.2s ease",
                  }} />
                <span className="block h-[1.5px] rounded-full"
                  style={{
                    width: 12,
                    background: "rgba(255,255,255,0.85)",
                    opacity: menuOpen ? 0 : 1,
                    transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }} />
                <span className="block h-[1.5px] rounded-full origin-center"
                  style={{
                    width: 18,
                    background: menuOpen ? "#D4A017" : "rgba(255,255,255,0.85)",
                    transform: menuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none",
                    transition: "transform 0.2s ease, background 0.2s ease",
                  }} />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu — elegant slide-down panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(5,13,31,0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(212,160,23,0.12)",
            }}>

            {/* Nav links */}
            <div className="px-4 pt-3 pb-2">
              {NAV_LINKS.map((key, i) => {
                const isActive = activeSection === key;
                return (
                  <motion.a
                    key={key}
                    href={`#${key}`}
                    onClick={(e) => handleNavClick(e, key)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.18 }}
                    className="flex items-center justify-between py-3 transition-colors duration-150"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: isActive ? "#F0C842" : "rgba(255,255,255,0.65)",
                    }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: "1rem", lineHeight: 1, opacity: isActive ? 1 : 0.6 }}>
                        {NAV_ICONS[key]}
                      </span>
                      <span style={{ fontSize: "0.9rem", fontWeight: isActive ? 600 : 400, letterSpacing: "0.01em" }}>
                        {t.nav[key as keyof typeof t.nav]}
                      </span>
                    </div>
                    {isActive && (
                      <span style={{ fontSize: "0.65rem", color: "#D4A017", letterSpacing: "0.12em", fontWeight: 600 }}>
                        ●
                      </span>
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Footer row — Vlogs + WhatsApp */}
            <div className="px-4 pb-4 pt-2 flex items-center gap-2">
              <a href="/blog"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[0.8rem] font-medium transition-colors"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}>
                <span style={{ fontSize: "0.9rem" }}>📝</span> Vlogs
              </a>
              <a href="https://wa.me/917210433685" target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[0.8rem] font-semibold transition-colors"
                style={{
                  color: "#25D366",
                  border: "1px solid rgba(37,211,102,0.25)",
                  background: "rgba(37,211,102,0.06)",
                }}>
                <span style={{ fontSize: "0.9rem" }}>💬</span> WhatsApp
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

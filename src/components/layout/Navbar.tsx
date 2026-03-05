"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import LanguageToggle from "@/components/ui/LanguageToggle";

const NAV_LINKS = ["about", "features", "courses", "faculty", "results", "gallery", "testimonials", "contact"] as const;

export default function Navbar() {
  const { t: _t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = _t as any;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef  = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.9 });
    tl.fromTo(navRef.current,
      { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    tl.fromTo(logoRef.current,
      { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: "power2.out" }, "-=0.2");
    }
  }, []);

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
    <motion.nav
      ref={navRef}
      aria-label="Main navigation"
      style={{ opacity: 0 }}
      className={`navbar-fixed fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050D1F]/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-white/5"
          : "bg-transparent"
      }`}>

      {/* ── Announcement ticker ── */}
      <div className="overflow-hidden"
        style={{
          background: "rgba(212,160,23,0.07)",
          borderBottom: "1px solid rgba(212,160,23,0.12)",
          height: "40px",
        }}>
        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .ticker-track { animation: ticker-scroll 22s linear infinite; white-space: nowrap; display: inline-block; }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-track flex items-center gap-12 h-10 px-4">
          {[...t.nav.ticker, ...t.nav.ticker].map((msg, i) => (
            <span key={`ticker-${i}-${msg.slice(0, 12)}`} className="inline-flex items-center gap-2 text-xs font-semibold"
              style={{ color: "rgba(212,160,23,0.90)", letterSpacing: "0.06em" }}>
              {msg}
              {i < [...t.nav.ticker, ...t.nav.ticker].length - 1 && (
                <span style={{ color: "rgba(212,160,23,0.30)", marginLeft: "1rem" }}>◆</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="layout-container">
        {/*
          3-column grid: logo | CENTER nav | right controls
          The middle column is 1fr so it takes all remaining space and
          the nav links inside it are centred — completely independent
          of how wide the logo or buttons are.
        */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 sm:h-16 lg:h-20 gap-3 lg:gap-4">

          {/* ── Col 1: Logo ── */}
          <a ref={logoRef} href="#home" onClick={(e) => handleNavClick(e, "home")}
            className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 whitespace-nowrap">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg shadow-gold/20 group-hover:scale-105 transition-transform border border-gold/20">
              <Image src="/logo.png" alt="Vision Coaching Institute" width={96} height={96} className="w-full h-full object-cover scale-[1.15]" priority sizes="96px" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-heading font-bold text-sm sm:text-lg tracking-wide group-hover:text-gold transition-colors duration-200">
                Vision Coaching
              </div>
              <div className="text-gold text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase hidden sm:block">
                Tulsipur
              </div>
            </div>
          </a>

          {/* ── Col 2: Desktop nav — absolutely centred in its 1fr column ── */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              ref={linksRef}
              className="flex items-center"
              style={{
                gap: "0.125rem",          /* 2px between items — pill padding carries the visual gap */
                padding: "0.25rem",       /* 4px container inset so pills don't clip at edges */
                borderRadius: "9999px",
                background: scrolled ? "rgba(255,255,255,0.04)" : "transparent",
                border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                transition: "background 0.4s ease, border-color 0.4s ease",
              }}>
              {NAV_LINKS.map((key) => {
                const isActive = activeSection === key;
                return (
                  <a
                    key={key}
                    href={`#${key}`}
                    onClick={(e) => handleNavClick(e, key)}
                    className="relative capitalize transition-colors duration-200 select-none"
                    style={{
                      padding: "0.4375rem 0.875rem",  /* 7px 14px — comfortable pill target */
                      borderRadius: "9999px",
                      fontSize: "0.8125rem",           /* 13px — readable without crowding */
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.01em",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                      color: isActive ? "#0A1F5C" : "rgba(255,255,255,0.72)",
                      background: isActive
                        ? "linear-gradient(135deg, #D4A017, #F0C842)"
                        : "transparent",
                      boxShadow: isActive
                        ? "0 2px 10px rgba(212,160,23,0.35)"
                        : "none",
                      transition: "color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, font-weight 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "#D4A017";
                        (e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,0.10)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}>
                    {t.nav[key as keyof typeof t.nav]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Col 3: Right controls ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LanguageToggle />
            <a href="tel:+917210433685" className="hidden md:inline-flex btn-nav">
              📞 {t.nav.callNow}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-white/10 transition-colors">
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 9 : 0 }}
                className="block w-5 h-0.5 bg-white rounded-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                className="block w-5 h-0.5 bg-white rounded-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -9 : 0 }}
                className="block w-5 h-0.5 bg-white rounded-full origin-center" />
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/10"
            style={{ background: "rgba(5,13,31,0.98)", backdropFilter: "blur(20px)" }}>
            <div className="px-5 sm:px-6 py-5 space-y-1">
              {NAV_LINKS.map((key, i) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  onClick={(e) => handleNavClick(e, key)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm capitalize transition-colors"
                  style={{
                    fontWeight: activeSection === key ? 700 : 500,
                    color: activeSection === key ? "#D4A017" : "rgba(255,255,255,0.70)",
                    background: activeSection === key ? "rgba(212,160,23,0.10)" : "transparent",
                    border: activeSection === key ? "1px solid rgba(212,160,23,0.22)" : "1px solid transparent",
                  }}>
                  {activeSection === key && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  )}
                  {t.nav[key as keyof typeof t.nav]}
                </motion.a>
              ))}
              <div className="pt-4 pb-1 grid grid-cols-2 gap-3">
                <a href="tel:+917210433685" className="btn-nav justify-center">
                  📞 Call Now
                </a>
                <a href="https://wa.me/917210433685" target="_blank" rel="noopener noreferrer"
                  className="btn-nav-outline justify-center">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

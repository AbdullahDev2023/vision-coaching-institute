"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/cbse-coaching-tulsipur",   label: "CBSE Coaching",    icon: "📘" },
  { href: "/up-board-coaching-tulsipur", label: "UP Board",        icon: "📗" },
  { href: "/class-10-science-coaching", label: "Class 10 Science", icon: "🔬" },
  { href: "/class-12-pcb-coaching",    label: "Class 12 PCB",     icon: "⚗️"  },
  { href: "/results",                  label: "Results",           icon: "🏆" },
  { href: "/blog",                     label: "Vlogs",             icon: "📝" },
];

export default function ContentLinks() {
  return (
    <section
      aria-label="Quick links"
      className="relative z-10 w-full"
      style={{
        background: "rgba(5,13,31,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="layout-container"
        style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
      >
        <div
          className="flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <style>{`.content-links-strip::-webkit-scrollbar{display:none}`}</style>
          <span
            className="content-links-strip text-[10px] font-semibold uppercase tracking-widest flex-shrink-0 mr-1"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            Explore
          </span>

          {LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.22 }}
              className="flex-shrink-0"
            >
              <Link
                href={link.href}
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.75rem] font-medium transition-all duration-200"
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(212,160,23,0.18)",
                  background: "rgba(212,160,23,0.05)",
                  color: "rgba(255,255,255,0.60)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,160,23,0.55)";
                  (e.currentTarget as HTMLElement).style.color = "#F0C842";
                  (e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,160,23,0.18)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(212,160,23,0.05)";
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>{link.icon}</span>
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

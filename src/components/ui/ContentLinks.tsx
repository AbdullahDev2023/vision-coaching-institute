"use client";
import Link from "next/link";

// framer-motion removed — trivial stagger replaced with CSS animation-delay
const LINKS = [
  { href: "/cbse-coaching-tulsipur",    label: "CBSE Coaching",    icon: "📘" },
  { href: "/up-board-coaching-tulsipur",label: "UP Board",         icon: "📗" },
  { href: "/class-10-science-coaching", label: "Class 10 Science", icon: "🔬" },
  { href: "/class-12-pcb-coaching",     label: "Class 12 PCB",     icon: "⚗️"  },
  { href: "/results",                   label: "Results",          icon: "🏆" },
  { href: "/blog",                      label: "Vlogs",            icon: "📝" },
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
            <div
              key={link.href}
              className="flex-shrink-0 content-link-item"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Link
                href={link.href}
                className="content-link-pill inline-flex items-center gap-1.5 whitespace-nowrap text-[0.75rem] font-medium transition-all duration-200"
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(212,160,23,0.18)",
                  background: "rgba(212,160,23,0.05)",
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>{link.icon}</span>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Vision Coaching Institute",
  description: "The page you are looking for doesn't exist. Return to Vision Coaching Institute, Tulsipur.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const links = [
    { href: "/",                        label: "🏠 Home" },
    { href: "/cbse-coaching-tulsipur",  label: "📘 CBSE Coaching" },
    { href: "/up-board-coaching-tulsipur", label: "📗 UP Board Coaching" },
    { href: "/results",                 label: "🏆 Our Results" },
    { href: "/blog",                    label: "📝 Blog" },
    { href: "/#contact",                label: "📞 Contact Us" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#050D1F 0%,#0A1F5C 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1rem",
      fontFamily: "var(--font-inter,system-ui,sans-serif)",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 520 }}>
        {/* 404 heading */}
        <p style={{ fontSize: "6rem", fontWeight: 900, lineHeight: 1,
          background: "linear-gradient(135deg,#D4A017,#F0C842)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem" }}>
          404
        </p>

        <h1 style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: 700,
          fontFamily: "var(--font-playfair,serif)", marginBottom: "0.75rem" }}>
          Page Not Found
        </h1>

        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem",
          lineHeight: 1.65, marginBottom: "2rem" }}>
          The page you were looking for doesn&apos;t exist or may have moved.
          Return to Vision Coaching Institute, Tulsipur and find what you need below.
        </p>

        {/* Quick links */}
        <nav aria-label="Helpful links">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem",
            justifyContent: "center", marginBottom: "2rem" }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "inline-block",
                  padding: "0.45rem 1rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(212,160,23,0.35)",
                  background: "rgba(212,160,23,0.06)",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  transition: "border-color 0.15s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Back home CTA */}
        <Link href="/" style={{
          display: "inline-block",
          padding: "0.75rem 2rem",
          borderRadius: "9999px",
          background: "linear-gradient(135deg,#D4A017,#F0C842)",
          color: "#0A1F5C",
          fontWeight: 800,
          fontSize: "0.9rem",
          textDecoration: "none",
          letterSpacing: "0.04em",
        }}>
          Go Back Home
        </Link>

        <p style={{ marginTop: "2rem", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
          Vision Coaching Institute · Purani Bazar, Tulsipur, UP · +91 72104 33685
        </p>
      </div>
    </main>
  );
}

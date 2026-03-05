"use client";
import Link from "next/link";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";

/* ── Types ─────────────────────────────────────────────────── */
export type ContentMeta = {
  badge?:       string;   // e.g. "CBSE Coaching"
  readTime?:    string;   // e.g. "5 min read"
  lastUpdated?: string;   // e.g. "March 2026"
  isArticle?:   boolean;
};

export interface ContentPageShellProps {
  crumbs:      Crumb[];
  title:       string;
  subtitle:    string;
  meta?:       ContentMeta;
  children:    React.ReactNode;
  ctaTitle?:   string;
  ctaBody?:    string;
}

/* ── CTA strip (server-renderable, links only) ──────────────── */
function BottomCTA({ title, body }: { title: string; body: string }) {
  return (
    <section style={{
      background:  "linear-gradient(135deg,#0A1F5C 0%,#050D1F 100%)",
      borderTop:   "1px solid rgba(212,160,23,0.15)",
      padding:     "4rem 1.5rem",
      textAlign:   "center",
    }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <p style={{ color: "#D4A017", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Ready to Join?
        </p>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem,4vw,2.25rem)", fontWeight: 800, fontFamily: "var(--font-playfair,serif)", lineHeight: 1.2, marginBottom: "1rem" }}>
          {title}
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
          {body}
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/917210433685?text=Hi%2C+I+want+to+book+a+free+demo+class"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 1.75rem", borderRadius: "9999px",
              background: "#25D366", color: "#fff", fontWeight: 700,
              fontSize: "0.9rem", textDecoration: "none",
              boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
            }}>
            <svg style={{ width: "1.1rem", height: "1.1rem", fill: "#fff", flexShrink: 0 }} viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Book Free Demo on WhatsApp
          </a>
          <a href="tel:+917210433685"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.875rem 1.75rem", borderRadius: "9999px",
              background: "transparent", color: "#D4A017", fontWeight: 700,
              fontSize: "0.9rem", textDecoration: "none",
              border: "2px solid rgba(212,160,23,0.5)",
            }}>
            📞 +91 72104 33685
          </a>
        </div>
        <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>
          Purani Bazar, Tulsipur · Mon–Sat 7 AM – 8 PM
        </p>
      </div>
    </section>
  );
}

/* ── Main Shell ─────────────────────────────────────────────── */
export default function ContentPageShell({
  crumbs, title, subtitle, meta, children,
  ctaTitle  = "Start Your Journey at Vision Coaching, Tulsipur",
  ctaBody   = "Join 500+ students who've built their academic futures with expert faculty, small batches and daily doubt-solving sessions. First class is free — no commitment.",
}: ContentPageShellProps) {
  return (
    <>
      {/* ── Page Hero ── */}
      <section style={{
        background: "linear-gradient(160deg,#050D1F 0%,#0A1F5C 60%,#050D1F 100%)",
        padding:    "4rem 1.5rem 3rem",
        position:   "relative",
        overflow:   "hidden",
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Gold radial glow */}
        <div style={{ position: "absolute", bottom: "-60px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(212,160,23,0.08) 0%,transparent 65%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: "860px", margin: "0 auto" }}>
          <Breadcrumb crumbs={crumbs} />

          {meta?.badge && (
            <span style={{
              display: "inline-block", marginBottom: "1rem",
              padding: "0.3rem 0.875rem", borderRadius: "9999px",
              background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)",
              color: "#F0C842", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              {meta.badge}
            </span>
          )}

          <h1 style={{
            color: "#fff", fontFamily: "var(--font-playfair,serif)", fontWeight: 800,
            fontSize: "clamp(1.75rem,5vw,3rem)", lineHeight: 1.15, marginBottom: "1rem",
          }}>
            {title}
          </h1>

          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.95rem,2.5vw,1.125rem)", lineHeight: 1.7, maxWidth: "680px", marginBottom: "1.5rem" }}>
            {subtitle}
          </p>

          {/* Meta bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(212,160,23,0.4)", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Vision Coaching" style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Vision Coaching Institute, Tulsipur</span>
            </div>
            {meta?.readTime && (
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>📖 {meta.readTime}</span>
            )}
            {meta?.lastUpdated && (
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem" }}>🗓 Updated: {meta.lastUpdated}</span>
            )}
          </div>
        </div>
      </section>

      {/* ── Prose Content ── */}
      <div style={{ background: "#F8F9FF" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
          {children}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA title={ctaTitle} body={ctaBody} />
    </>
  );
}

/* ── Prose building blocks (exported for page use) ─────────── */

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontWeight: 700, fontSize: "clamp(1.25rem,3vw,1.75rem)", color: "#0A1F5C", lineHeight: 1.25, marginTop: "2.75rem", marginBottom: "0.875rem" }}>
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0A1F5C", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#374151", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1.1rem" }}>
      {children}
    </p>
  );
}

export function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ marginBottom: "1.25rem", paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", color: "#374151", fontSize: "0.97rem", lineHeight: 1.65 }}>
          <span style={{ flexShrink: 0, marginTop: "0.2rem", width: "18px", height: "18px", borderRadius: "50%", background: "rgba(212,160,23,0.15)", border: "1px solid rgba(212,160,23,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="#D4A017" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function StatGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "1rem", margin: "2rem 0" }}>
      {stats.map(s => (
        <div key={s.label} style={{
          textAlign: "center", padding: "1.25rem 1rem", borderRadius: "1rem",
          background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)",
          boxShadow: "0 4px 20px rgba(10,31,92,0.2)",
        }}>
          <div style={{ color: "#F0C842", fontWeight: 800, fontSize: "1.75rem", fontFamily: "var(--font-playfair,serif)", lineHeight: 1 }}>{s.value}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: "0.375rem", fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function InfoBox({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={{
      display: "flex", gap: "1rem", padding: "1.25rem 1.5rem",
      borderRadius: "1rem", background: "rgba(10,31,92,0.04)",
      border: "1px solid rgba(10,31,92,0.12)", marginBottom: "1rem",
    }}>
      <span style={{ fontSize: "1.5rem", flexShrink: 0, lineHeight: 1.3 }}>{icon}</span>
      <div>
        <strong style={{ display: "block", color: "#0A1F5C", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{title}</strong>
        <span style={{ color: "#4B5563", fontSize: "0.9rem", lineHeight: 1.65 }}>{body}</span>
      </div>
    </div>
  );
}

export function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{ color: "#0A1F5C", fontWeight: 600, textDecoration: "underline", textDecorationColor: "rgba(212,160,23,0.5)", textUnderlineOffset: "3px" }}>
      {children}
    </Link>
  );
}

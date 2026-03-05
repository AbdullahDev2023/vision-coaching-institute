import { ImageResponse } from "next/og";
import { LOGO_B64 } from "@/lib/logo-b64";
import { GALLERY_HERO_B64 } from "@/lib/gallery-hero-b64";

export const alt         = "Vision Coaching Institute Tulsipur — Expert Coaching for CBSE, ICSE, ISC & UP Board";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRIMARY = "#0A1F5C";
const DARK    = "#050D1F";
const GOLD    = "#D4A017";
const GOLD_LT = "#F0C842";
const WHITE   = "#ffffff";

const BOARDS = [
  { label: "CBSE",     color: "#4488ff" },
  { label: "ICSE",     color: "#44ddaa" },
  { label: "ISC",      color: GOLD      },
  { label: "UP Board", color: "#ff6688" },
];

const STATS = [
  { value: "500+", label: "Students",       gold: true  },
  { value: "95%",  label: "Pass Rate",      gold: false },
  { value: "10+",  label: "Yrs Experience", gold: false },
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", background: DARK, position: "relative" }}>

        {/* ── RIGHT: gallery photo (absolute, 490px wide) ── */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "490px", height: "630px", display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GALLERY_HERO_B64} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* left-to-right fade */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(5,13,31,1) 0%,rgba(5,13,31,0.5) 40%,rgba(5,13,31,0.05) 100%)", display: "flex" }} />
          {/* bottom vignette */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 50%,rgba(5,13,31,0.75) 100%)", display: "flex" }} />

          {/* Logo badge — bottom right */}
          <div style={{ position: "absolute", bottom: "24px", right: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "88px", height: "88px", borderRadius: "50%", border: `3px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", background: PRIMARY, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_B64} alt="" width={88} height={88} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "5px 14px", borderRadius: "9999px", background: "rgba(5,13,31,0.88)", border: `1px solid rgba(212,160,23,0.55)`, display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.12em" }}>
              VISION COACHING
            </div>
          </div>

          {/* Top-right label */}
          <div style={{ position: "absolute", top: "20px", right: "20px", padding: "4px 12px", borderRadius: "9999px", background: "rgba(5,13,31,0.72)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.60)", letterSpacing: "0.14em" }}>
            Our Classroom
          </div>
        </div>

        {/* ── LEFT: info panel (730px wide) ── */}
        <div style={{ width: "730px", height: "630px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "52px 60px 48px 56px", position: "relative", zIndex: 2 }}>

          {/* Gold ambient glow */}
          <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "340px", height: "340px", borderRadius: "50%", background: "rgba(212,160,23,0.08)", display: "flex" }} />

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <div style={{ width: "28px", height: "2px", background: GOLD, borderRadius: "2px" }} />
            <div style={{ fontSize: "11px", fontWeight: 700, color: GOLD, letterSpacing: "0.22em" }}>
              EST. IN TULSIPUR · UTTAR PRADESH
            </div>
          </div>

          {/* Heading */}
          <div style={{ fontSize: "46px", fontWeight: 900, color: WHITE, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "6px" }}>
            Vision Coaching
          </div>
          <div style={{ fontSize: "46px", fontWeight: 900, color: GOLD_LT, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "22px" }}>
            Institute
          </div>

          {/* Tagline */}
          <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.58)", lineHeight: 1.5, fontWeight: 400, marginBottom: "24px" }}>
            Expert coaching · Classes 6th–12th · Maths, Physics, Chemistry & Biology
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{ padding: "5px 16px", borderRadius: "9999px", background: `${b.color}1A`, border: `1.5px solid ${b.color}55`, color: b.color, fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center" }}>
                {b.label}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            {STATS.map(s => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 22px", borderRadius: "14px", background: s.gold ? "rgba(212,160,23,0.12)" : "rgba(255,255,255,0.04)", border: s.gold ? "1.5px solid rgba(212,160,23,0.35)" : "1px solid rgba(255,255,255,0.08)", minWidth: "108px", gap: "4px" }}>
                <div style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1, color: s.gold ? GOLD_LT : WHITE }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["Small Batches", "Daily Doubt Sessions", "Weekly Tests", "Free Demo"].map(f => (
              <div key={f} style={{ padding: "6px 14px", borderRadius: "9999px", background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.25)", color: GOLD_LT, fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: GOLD, display: "flex" }} />
                {f}
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.40)", fontSize: "13px", fontWeight: 500 }}>
              Purani Bazar, Tulsipur, UP
            </div>
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.40)", fontSize: "13px", fontWeight: 500 }}>
              +91 72104 33685
            </div>
            <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.40)", fontSize: "13px", fontWeight: 500 }}>
              Mon–Sat 7AM–8PM
            </div>
          </div>
        </div>

        {/* Gold top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)`, display: "flex" }} />
        {/* Gold bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)`, display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}

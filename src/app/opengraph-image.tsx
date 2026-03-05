import { ImageResponse } from "next/og";
import { LOGO_B64 } from "@/lib/logo-b64";
import { GALLERY_HERO_B64 } from "@/lib/gallery-hero-b64";

export const runtime     = "edge";
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
  { value: "500+", label: "Students"       },
  { value: "95%",  label: "Pass Rate"      },
  { value: "10+",  label: "Yrs Experience" },
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "1200px", height: "630px",
        display: "flex", flexDirection: "row",
        background: DARK,
        fontFamily: "serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ══════════════════════════════════════════
            RIGHT — full-bleed gallery photo (40%)
            Rendered first so left panel sits above it
        ══════════════════════════════════════════ */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "490px", height: "630px",
          overflow: "hidden",
          display: "flex",
        }}>
          {/* Photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GALLERY_HERO_B64}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark gradient fade — left edge blends into the card */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, rgba(5,13,31,1) 0%, rgba(5,13,31,0.55) 35%, rgba(5,13,31,0.08) 100%)",
          }} />
          {/* Subtle bottom dark vignette for logo badge readability */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 55%, rgba(5,13,31,0.70) 100%)",
          }} />

          {/* ── Logo watermark badge — bottom-right of photo ── */}
          <div style={{
            position: "absolute", bottom: "24px", right: "24px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          }}>
            {/* Outer glow ring */}
            <div style={{
              width: "88px", height: "88px", borderRadius: "50%",
              border: `3px solid ${GOLD}`,
              boxShadow: `0 0 28px rgba(212,160,23,0.65), 0 0 60px rgba(212,160,23,0.25)`,
              overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: `linear-gradient(135deg, ${PRIMARY}ee, #1A3A8Fcc)`,
              backdropFilter: "blur(8px)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_B64}
                alt="Vision Coaching Institute"
                width={88} height={88}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Name pill under badge */}
            <div style={{
              padding: "5px 14px", borderRadius: "9999px",
              background: "rgba(5,13,31,0.82)",
              border: `1px solid rgba(212,160,23,0.50)`,
              backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center",
              fontSize: "11px", fontWeight: 700,
              color: GOLD, letterSpacing: "0.12em",
              textTransform: "uppercase", whiteSpace: "nowrap",
            }}>
              Vision Coaching
            </div>
          </div>

          {/* ── "Gallery" eyebrow label — top-right of photo ── */}
          <div style={{
            position: "absolute", top: "20px", right: "20px",
            padding: "4px 12px", borderRadius: "9999px",
            background: "rgba(5,13,31,0.65)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: "10px", fontWeight: 700,
            color: "rgba(255,255,255,0.55)", letterSpacing: "0.16em",
            textTransform: "uppercase",
            display: "flex", alignItems: "center",
          }}>
            📸 Our Classroom
          </div>
        </div>

        {/* ══════════════════════════════════════════
            LEFT — dark branded info panel (60%)
        ══════════════════════════════════════════ */}
        <div style={{
          width: "730px", height: "630px",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "52px 60px 48px 56px",
          position: "relative", zIndex: 2,
          gap: 0,
        }}>

          {/* Subtle grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }} />
          {/* Gold ambient glow top-left */}
          <div style={{
            position: "absolute", top: "-60px", left: "-60px",
            width: "340px", height: "340px", borderRadius: "50%",
            background: `radial-gradient(circle, rgba(212,160,23,0.10) 0%, transparent 70%)`,
          }} />

          {/* Eyebrow */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "18px", position: "relative",
          }}>
            <div style={{ width: "28px", height: "2px", background: GOLD, borderRadius: "2px" }} />
            <div style={{
              fontSize: "11px", fontWeight: 700, color: GOLD,
              letterSpacing: "0.22em", textTransform: "uppercase",
            }}>
              Est. in Tulsipur · Uttar Pradesh
            </div>
          </div>

          {/* Main heading */}
          <div style={{
            fontSize: "44px", fontWeight: 900,
            color: WHITE, lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: "10px", position: "relative",
          }}>
            Vision Coaching
          </div>
          <div style={{
            fontSize: "44px", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-0.02em",
            marginBottom: "22px", position: "relative",
            background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LT} 60%, ${GOLD} 100%)`,
            backgroundClip: "text",
            color: "transparent",
          }}>
            Institute
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: "16px", color: "rgba(255,255,255,0.60)",
            lineHeight: 1.5, fontWeight: 400,
            marginBottom: "26px", position: "relative",
          }}>
            Expert coaching · Classes 6th–12th · Maths, Physics,{"\n"}Chemistry & Biology
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "26px", flexWrap: "wrap", position: "relative" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{
                padding: "5px 16px", borderRadius: "9999px",
                background: `${b.color}18`, border: `1.5px solid ${b.color}55`,
                color: b.color, fontSize: "13px", fontWeight: 700,
                display: "flex", alignItems: "center",
              }}>
                {b.label}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "14px", marginBottom: "28px", position: "relative" }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "12px 24px", borderRadius: "14px",
                background: i === 0
                  ? `linear-gradient(135deg, rgba(212,160,23,0.14), rgba(212,160,23,0.05))`
                  : `rgba(255,255,255,0.04)`,
                border: i === 0
                  ? `1.5px solid rgba(212,160,23,0.35)`
                  : `1px solid rgba(255,255,255,0.08)`,
                minWidth: "110px", gap: "4px",
              }}>
                <div style={{
                  fontSize: "28px", fontWeight: 800, lineHeight: 1,
                  color: i === 0 ? GOLD_LT : WHITE,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: "11px", color: "rgba(255,255,255,0.45)",
                  textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "26px", position: "relative" }}>
            {["✓ Small Batches", "✓ Daily Doubt Sessions", "✓ Weekly Tests", "✓ Free Demo Class"].map(f => (
              <div key={f} style={{
                padding: "6px 14px", borderRadius: "9999px",
                background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.22)",
                color: GOLD_LT, fontSize: "13px", fontWeight: 600,
                display: "flex", alignItems: "center",
              }}>
                {f}
              </div>
            ))}
          </div>

          {/* Bottom contact strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: "18px",
            paddingTop: "18px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.38)", fontSize: "13px", fontWeight: 500,
            position: "relative",
          }}>
            <span>📍 Purani Bazar, Tulsipur, UP</span>
            <span style={{ color: "rgba(255,255,255,0.14)" }}>•</span>
            <span>📞 +91 72104 33685</span>
            <span style={{ color: "rgba(255,255,255,0.14)" }}>•</span>
            <span>🕐 Mon–Sat 7AM–8PM</span>
          </div>
        </div>

        {/* ── Gold top border ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)`,
        }} />
        {/* ── Gold bottom border ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)`,
        }} />
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { LOGO_B64 } from "@/lib/logo-b64";

export const runtime     = "edge";
export const alt         = "Vision Coaching Institute Tulsipur — Expert Coaching for CBSE, ICSE, ISC & UP Board";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

/* ─── colour tokens ─────────────────────────────────────────────── */
const PRIMARY  = "#0A1F5C";
const DARK     = "#050D1F";
const CARD_BG  = "#0D1B4B";
const GOLD     = "#D4A017";
const GOLD_LT  = "#F0C842";
const WHITE    = "#ffffff";

/* ─── Board badges ──────────────────────────────────────────────── */
const BOARDS = [
  { label: "CBSE",     color: "#4488ff" },
  { label: "ICSE",     color: "#44ddaa" },
  { label: "ISC",      color: GOLD },
  { label: "UP Board", color: "#ff6688" },
];

/* ─── Stats ─────────────────────────────────────────────────────── */
const STATS = [
  { value: "500+", label: "Students" },
  { value: "95%",  label: "Pass Rate" },
  { value: "10+",  label: "Yrs Experience" },
];

/* ─── Features ──────────────────────────────────────────────────── */
const FEATURES = ["Small Batches", "Daily Doubt Sessions", "Weekly Tests", "Free Demo Class"];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px",
          display: "flex", flexDirection: "row",
          background: `linear-gradient(135deg, ${DARK} 0%, ${PRIMARY} 55%, ${DARK} 100%)`,
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background grid texture ── */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />

        {/* ── Gold ambient top-right glow ── */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "420px", height: "420px", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 70%)`,
        }} />

        {/* ── Blue depth glow bottom-left ── */}
        <div style={{
          position: "absolute", bottom: "-100px", left: "-60px",
          width: "380px", height: "380px", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(26,58,143,0.50) 0%, transparent 70%)`,
        }} />

        {/* ══════════════════════════════════════════
            LEFT COLUMN  (64%)
        ══════════════════════════════════════════ */}
        <div style={{
          width: "760px", height: "630px",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "56px 52px 48px 60px",
          position: "relative", zIndex: 2,
          gap: 0,
        }}>

          {/* Logo + name row */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "28px" }}>
            <div style={{
              width: "80px", height: "80px", borderRadius: "50%",
              background: `linear-gradient(135deg, ${PRIMARY}, #1A3A8F)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 36px rgba(212,160,23,0.50)`,
              border: `3px solid rgba(212,160,23,0.65)`,
              overflow: "hidden", flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_B64} alt="" width={66} height={66} style={{ objectFit: "contain" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.20em",
                            textTransform: "uppercase", color: GOLD }}>
                Est. in Tulsipur · Uttar Pradesh
              </div>
              <div style={{ fontSize: "34px", fontWeight: 800, color: WHITE, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                Vision Coaching Institute
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: "19px", color: "rgba(255,255,255,0.68)", marginBottom: "24px",
                        lineHeight: 1.45, fontWeight: 400 }}>
            Expert coaching for Classes 6th–12th in Maths, Physics,{"\n"}Chemistry & Biology — CBSE · ICSE · ISC · UP Board
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{
                display: "flex", alignItems: "center",
                padding: "6px 18px", borderRadius: "9999px",
                background: `${b.color}1A`, border: `1.5px solid ${b.color}55`,
                color: b.color, fontSize: "15px", fontWeight: 700,
              }}>
                {b.label}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "32px" }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "14px 28px", borderRadius: "14px",
                background: `linear-gradient(135deg, ${PRIMARY}, #1A3A8F22)`,
                border: `1px solid rgba(212,160,23,0.20)`,
                minWidth: "120px",
                gap: "4px",
              }}>
                <div style={{ fontSize: "30px", fontWeight: 800, color: GOLD_LT, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)", textTransform: "uppercase",
                              letterSpacing: "0.08em", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {FEATURES.map(f => (
              <div key={f} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 16px", borderRadius: "9999px",
                background: "rgba(212,160,23,0.10)", border: "1px solid rgba(212,160,23,0.28)",
                color: GOLD_LT, fontSize: "14px", fontWeight: 600,
              }}>
                ✓ {f}
              </div>
            ))}
          </div>

          {/* Bottom contact strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: "20px",
            marginTop: "28px", paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.40)", fontSize: "14px", fontWeight: 500,
          }}>
            <span>📍 Purani Bazar, Tulsipur, UP</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>•</span>
            <span>📞 +91 72104 33685</span>
            <span style={{ color: "rgba(255,255,255,0.18)" }}>•</span>
            <span>🕐 Mon–Sat 7AM–8PM</span>
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{
          width: "1px", alignSelf: "stretch",
          background: "linear-gradient(180deg, transparent, rgba(212,160,23,0.30) 25%, rgba(212,160,23,0.30) 75%, transparent)",
          flexShrink: 0, zIndex: 2,
        }} />

        {/* ══════════════════════════════════════════
            RIGHT COLUMN  (36%) — Faculty + Gallery
        ══════════════════════════════════════════ */}
        <div style={{
          flex: 1, height: "630px",
          display: "flex", flexDirection: "column",
          padding: "40px 36px 40px 36px",
          gap: "16px", position: "relative", zIndex: 2,
        }}>

          {/* Section label */}
          <div style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD, marginBottom: "4px",
          }}>
            Our Faculty
          </div>

          {/* Faculty cards */}
          {[
            { name: "Satish Sir",  subject: "Chemistry", exp: "10+ Yrs", emoji: "🧪" },
            { name: "Farhan Sir",  subject: "Biology",   exp: "9+ Yrs",  emoji: "🧬" },
            { name: "Yusuf Sir",   subject: "Physics",   exp: "7+ Yrs",  emoji: "⚛️" },
            { name: "Shivam Sir",  subject: "Physics",   exp: "8+ Yrs",  emoji: "⚛️" },
          ].map(f => (
            <div key={f.name} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 14px", borderRadius: "12px",
              background: `${CARD_BG}`,
              border: "1px solid rgba(212,160,23,0.14)",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${PRIMARY}, #1A3A8F)`,
                border: `2px solid rgba(212,160,23,0.40)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
              }}>
                {f.emoji}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: WHITE }}>{f.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{f.subject} · {f.exp}</div>
              </div>
            </div>
          ))}

          {/* Gallery label */}
          <div style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD, marginTop: "6px",
          }}>
            Gallery
          </div>

          {/* Gallery thumbnails (2 side-by-side) */}
          <div style={{ display: "flex", gap: "10px", flex: 1 }}>
            {["/images/gallery/photo-01.jpg", "/images/gallery/photo-04.jpg"].map((src, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: "10px", overflow: "hidden",
                border: "1px solid rgba(212,160,23,0.20)",
                background: `${CARD_BG}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://vision-coaching-institute.vercel.app${src}`}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          {/* Free demo CTA badge */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "12px 20px", borderRadius: "12px",
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LT})`,
            color: PRIMARY, fontSize: "14px", fontWeight: 800,
            letterSpacing: "0.02em",
          }}>
            🎓 Free Demo Every Saturday
          </div>
        </div>

        {/* ── Gold border frame ── */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                      background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
                      background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
                      background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "3px",
                      background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)` }} />
      </div>
    ),
    { ...size }
  );
}

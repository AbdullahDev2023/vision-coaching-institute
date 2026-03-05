import { ImageResponse } from "next/og";
import { LOGO_OG_B64 } from "@/lib/logo-og-b64";

export const alt         = "Vision Coaching Institute Tulsipur — Expert Coaching CBSE · ICSE · ISC · UP Board";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime     = "edge";
const SITE_URL = "https://www.visioncoachinginstitute.online";
const PRIMARY  = "#0A1F5C";
const DARK     = "#050D1F";
const GOLD     = "#D4A017";
const GOLD_LT  = "#F0C842";
const WHITE    = "#ffffff";
const GREEN    = "#25D366";

const STATS  = [
  { v: "500+", l: "Students" },
  { v: "95%",  l: "Pass Rate" },
  { v: "6–12", l: "Classes" },
  { v: "Free", l: "Demo" },
];
const BOARDS = [
  { label: "CBSE",     color: "#4488ff" },
  { label: "ICSE",     color: "#44ddaa" },
  { label: "ISC",      color: GOLD      },
  { label: "UP Board", color: "#ff6688" },
  { label: "BSc",      color: "#aa88ff" },
];

export default async function OGImage() {
  const logoSrc = LOGO_OG_B64; // 200×200 pre-resized, ~19 KB — no runtime fetch needed

  return new ImageResponse(
    (
      <div style={{
        width: "1200px", height: "630px", display: "flex",
        background: `radial-gradient(ellipse at 30% 50%, #1A3A8F 0%, ${PRIMARY} 35%, ${DARK} 75%)`,
        position: "relative", fontFamily: "system-ui, sans-serif", overflow: "hidden",
      }}>

        {/* Gold top/bottom borders */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", display: "flex",
          background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", display: "flex",
          background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />

        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Gold ambient glow */}
        <div style={{
          position: "absolute", right: "-100px", top: "50%", width: "600px", height: "600px",
          borderRadius: "50%", display: "flex",
          background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 65%)",
          transform: "translateY(-50%)",
        }} />

        {/* RIGHT decorative panel */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: "420px", height: "630px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "28px",
        }}>
          {/* Logo ring */}
          <div style={{
            width: "260px", height: "260px", borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center",
            border: `2px solid rgba(212,160,23,0.25)`,
            background: "rgba(10,31,92,0.4)",
          }}>
            <div style={{
              width: "210px", height: "210px", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", overflow: "hidden",
              background: `linear-gradient(135deg, ${PRIMARY}, #1A3A8F)`,
              border: `3px solid ${GOLD}`,
              boxShadow: `0 0 60px rgba(212,160,23,0.35)`,
            }}>
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ fontSize: "56px", display: "flex" }}>🎓</div>
              )}
            </div>
          </div>

          {/* Institute name under logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: WHITE, letterSpacing: "0.08em", display: "flex" }}>
              VISION COACHING
            </div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: GOLD, letterSpacing: "0.14em", display: "flex" }}>
              TULSIPUR · UP
            </div>
          </div>

          {/* FREE DEMO badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "9999px",
            background: "rgba(37,211,102,0.15)", border: `2px solid rgba(37,211,102,0.45)`,
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: GREEN, display: "flex" }} />
            <div style={{ fontSize: "12px", fontWeight: 800, color: GREEN, letterSpacing: "0.08em", display: "flex" }}>
              FREE DEMO AVAILABLE
            </div>
          </div>

          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", display: "flex" }}>
            visioncoachinginstitute.online
          </div>
        </div>

        {/* LEFT content panel */}
        <div style={{
          width: "800px", height: "630px", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "52px 56px", gap: "0px",
        }}>
          {/* Main headline */}
          <div style={{ fontSize: "46px", fontWeight: 900, color: WHITE, lineHeight: 1.1, display: "flex", marginBottom: "6px" }}>
            Expert Coaching for
          </div>
          <div style={{ fontSize: "46px", fontWeight: 900, lineHeight: 1.1, display: "flex", marginBottom: "22px",
            background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LT})`,
            backgroundClip: "text", color: "transparent",
          }}>
            Classes 6–12 & BSc
          </div>

          {/* Divider */}
          <div style={{ width: "60px", height: "3px", background: GOLD, borderRadius: "2px", display: "flex", marginBottom: "20px" }} />

          {/* Tagline */}
          <div style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", fontWeight: 500, display: "flex", marginBottom: "24px", lineHeight: 1.5 }}>
            Maths · Physics · Chemistry · Biology — Small batches, daily doubt sessions, free demo class.
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>
            {STATS.map(s => (
              <div key={s.l} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "12px 22px", borderRadius: "12px", gap: "4px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
              }}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: GOLD_LT, display: "flex" }}>{s.v}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", fontWeight: 600, display: "flex" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "8px" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{
                display: "flex", padding: "6px 16px", borderRadius: "9999px",
                background: `${b.color}1A`, border: `1.5px solid ${b.color}55`,
              }}>
                <div style={{ color: b.color, fontSize: "13px", fontWeight: 700, display: "flex" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}


export const alt         = "Vision Coaching Institute Tulsipur — Expert Coaching CBSE · ICSE · ISC · UP Board";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

// Runtime: edge for fastest cold-start (no Node.js runtime overhead)
export const runtime = "edge";

const PRIMARY = "#0A1F5C";
const DARK    = "#050D1F";
const GOLD    = "#D4A017";
const GOLD_LT = "#F0C842";
const WHITE   = "#ffffff";
const GREEN   = "#25D366";

const STATS = [
  { v: "500+", l: "Students" },
  { v: "95%",  l: "Pass Rate" },
  { v: "6–12", l: "Classes" },
  { v: "Free", l: "Demo" },
];

const BOARDS = [
  { label: "CBSE",     color: "#4488ff" },
  { label: "ICSE",     color: "#44ddaa" },
  { label: "ISC",      color: GOLD      },
  { label: "UP Board", color: "#ff6688" },
  { label: "BSc",      color: "#aa88ff" },
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px", height: "630px", display: "flex",
          background: `radial-gradient(ellipse at 30% 50%, #1A3A8F 0%, ${PRIMARY} 35%, ${DARK} 75%)`,
          position: "relative", fontFamily: "system-ui, sans-serif", overflow: "hidden",
        }}>

        {/* Gold top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", display: "flex",
          background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />

        {/* Gold bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", display: "flex",
          background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LT}, ${GOLD}, transparent)` }} />

        {/* Background grid pattern */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Gold ambient glow */}
        <div style={{
          position: "absolute", right: "-100px", top: "50%", width: "600px", height: "600px",
          borderRadius: "50%", display: "flex",
          background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 65%)",
          transform: "translateY(-50%)",
        }} />

        {/* RIGHT decorative panel */}
        <div style={{
          position: "absolute", right: 0, top: 0, width: "420px", height: "630px",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "32px",
        }}>
          {/* Large decorative circle */}
          <div style={{
            width: "260px", height: "260px", borderRadius: "50%", display: "flex",
            alignItems: "center", justifyContent: "center",
            border: `2px solid rgba(212,160,23,0.25)`,
            background: "rgba(10,31,92,0.5)",
          }}>
            <div style={{
              width: "200px", height: "200px", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px",
              background: `linear-gradient(135deg, ${PRIMARY}, #1A3A8F)`,
              border: `3px solid ${GOLD}`,
              boxShadow: `0 0 60px rgba(212,160,23,0.3)`,
            }}>
              <div style={{ fontSize: "52px", display: "flex" }}>🎓</div>
              <div style={{ fontSize: "13px", fontWeight: 800, color: GOLD, letterSpacing: "0.1em", display: "flex" }}>VISION</div>
            </div>
          </div>

          {/* FREE DEMO badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "10px 24px", borderRadius: "9999px",
            background: "rgba(37,211,102,0.15)", border: `2px solid rgba(37,211,102,0.45)`,
          }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: GREEN, display: "flex" }} />
            <div style={{ fontSize: "13px", fontWeight: 800, color: GREEN, letterSpacing: "0.08em", display: "flex" }}>
              FREE DEMO AVAILABLE
            </div>
          </div>

          {/* URL */}
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontWeight: 500, display: "flex" }}>
            visioncoachinginstitute.online
          </div>
        </div>

        {/* LEFT content panel */}
        <div style={{
          width: "800px", height: "630px", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "52px 56px", gap: "0px",
        }}>
          {/* Institute name */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: "28px",
              background: PRIMARY, border: `2px solid ${GOLD}`,
            }}>🎓</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <div style={{ fontSize: "15px", fontWeight: 800, color: WHITE, letterSpacing: "0.05em", display: "flex" }}>
                VISION COACHING INSTITUTE
              </div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: GOLD, letterSpacing: "0.14em", display: "flex" }}>
                TULSIPUR · UTTAR PRADESH
              </div>
            </div>
          </div>

          {/* Main headline */}
          <div style={{ fontSize: "46px", fontWeight: 900, color: WHITE, lineHeight: 1.1, display: "flex", marginBottom: "6px" }}>
            Expert Coaching for
          </div>
          <div style={{ fontSize: "46px", fontWeight: 900, lineHeight: 1.1, display: "flex", marginBottom: "22px",
            background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LT})`,
            backgroundClip: "text", color: "transparent",
          }}>
            Classes 6–12 & BSc
          </div>

          {/* Gold divider */}
          <div style={{ width: "60px", height: "3px", background: GOLD, borderRadius: "2px", display: "flex", marginBottom: "20px" }} />

          {/* Tagline */}
          <div style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", fontWeight: 500, display: "flex", marginBottom: "24px", lineHeight: 1.5 }}>
            Maths · Physics · Chemistry · Biology — Small batches, daily doubt sessions, free demo class.
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "22px" }}>
            {STATS.map(s => (
              <div key={s.l} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "12px 22px", borderRadius: "12px", gap: "4px",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
              }}>
                <div style={{ fontSize: "26px", fontWeight: 800, color: GOLD_LT, display: "flex" }}>{s.v}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", fontWeight: 600, display: "flex" }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "8px" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{
                display: "flex", padding: "6px 16px", borderRadius: "9999px",
                background: `${b.color}1A`, border: `1.5px solid ${b.color}55`,
              }}>
                <div style={{ color: b.color, fontSize: "13px", fontWeight: 700, display: "flex" }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

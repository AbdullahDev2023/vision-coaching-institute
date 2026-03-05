import { ImageResponse } from "next/og";
import { LOGO_B64 } from "@/lib/logo-b64";
import { GALLERY_HERO_B64 } from "@/lib/gallery-hero-b64";

export const alt         = "Vision Coaching Institute Tulsipur — Kya aapke bache ke marks improve nahi ho rahe?";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRIMARY  = "#0A1F5C";
const DARK     = "#050D1F";
const GOLD     = "#D4A017";
const GOLD_LT  = "#F0C842";
const WHITE    = "#ffffff";
const GREEN    = "#25D366";

const STATS = [
  { v: "95%",  l: "Pass Rate",  gold: true  },
  { v: "500+", l: "Students",   gold: false },
  { v: "6–12", l: "Classes",    gold: false },
  { v: "Free", l: "Demo Class", gold: true  },
];

const BOARDS = [
  { label: "CBSE",     color: "#4488ff" },
  { label: "ICSE",     color: "#44ddaa" },
  { label: "ISC",      color: GOLD      },
  { label: "UP Board", color: "#ff6688" },
];

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", background: DARK, position: "relative", fontFamily: "system-ui, sans-serif" }}>

        {/* ── RIGHT PHOTO PANEL ── */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "480px", height: "630px", display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={GALLERY_HERO_B64} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg,rgba(5,13,31,1) 0%,rgba(5,13,31,0.55) 40%,rgba(5,13,31,0.05) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(180deg,transparent 45%,rgba(5,13,31,0.8) 100%)" }} />

          {/* FREE DEMO badge */}
          <div style={{ position: "absolute", top: "22px", right: "22px", display: "flex", alignItems: "center", gap: "7px", padding: "7px 16px", borderRadius: "9999px", background: "rgba(37,211,102,0.18)", border: `1.5px solid rgba(37,211,102,0.50)` }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: GREEN, display: "flex" }} />
            <div style={{ fontSize: "12px", fontWeight: 800, color: GREEN, letterSpacing: "0.1em" }}>FREE DEMO AVAILABLE</div>
          </div>

          {/* Logo badge */}
          <div style={{ position: "absolute", bottom: "22px", right: "22px", display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2.5px solid ${GOLD}`, background: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_B64} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", padding: "4px 12px", borderRadius: "9999px", background: "rgba(5,13,31,0.88)", border: `1px solid rgba(212,160,23,0.50)` }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: GOLD, letterSpacing: "0.14em" }}>VISION COACHING</div>
            </div>
          </div>
        </div>

        {/* ── LEFT CONTENT PANEL ── */}
        <div style={{ width: "740px", height: "630px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 60px 44px 54px", position: "relative", zIndex: 2 }}>

          {/* Gold glow blob */}
          <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "rgba(212,160,23,0.07)", display: "flex" }} />

          {/* Hook line 1 */}
          <div style={{ display: "flex", fontSize: "42px", fontWeight: 900, color: WHITE, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "6px" }}>
            Aapke bache ke marks
          </div>

          {/* Hook line 2 — gold */}
          <div style={{ display: "flex", fontSize: "42px", fontWeight: 900, color: GOLD_LT, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "18px" }}>
            improve nahi ho rahe? 📉
          </div>

          {/* Divider */}
          <div style={{ display: "flex", width: "56px", height: "3px", background: GOLD, borderRadius: "2px", marginBottom: "18px" }} />

          {/* Proof statement */}
          <div style={{ display: "flex", fontSize: "17px", fontWeight: 600, color: "rgba(255,255,255,0.82)", lineHeight: 1.55, marginBottom: "22px", flexWrap: "wrap" }}>
            Tulsipur mein&nbsp;
            <span style={{ color: GOLD_LT, fontWeight: 800 }}>500+ students</span>
            &nbsp;ke results badal gaye — sirf sahi coaching se.
          </div>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap" }}>
            {STATS.map(s => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 20px", borderRadius: "12px", gap: "3px", background: s.gold ? "rgba(212,160,23,0.13)" : "rgba(255,255,255,0.05)", border: s.gold ? `1.5px solid rgba(212,160,23,0.40)` : "1px solid rgba(255,255,255,0.09)", minWidth: "90px" }}>
                <div style={{ display: "flex", fontSize: "24px", fontWeight: 800, lineHeight: 1, color: s.gold ? GOLD_LT : WHITE }}>{s.v}</div>
                <div style={{ display: "flex", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", fontWeight: 600 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Board badges */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "22px", flexWrap: "wrap" }}>
            {BOARDS.map(b => (
              <div key={b.label} style={{ display: "flex", padding: "5px 14px", borderRadius: "9999px", background: `${b.color}1A`, border: `1.5px solid ${b.color}55` }}>
                <div style={{ color: b.color, fontSize: "12px", fontWeight: 700 }}>{b.label}</div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "9999px", background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LT} 100%)` }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: PRIMARY }}>👉  Website Visit Karo</div>
            </div>
            <div style={{ display: "flex", fontSize: "13px", color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>
              visioncoachinginstitute.online
            </div>
          </div>
        </div>

        {/* Gold top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", display: "flex", background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)` }} />
        {/* Gold bottom border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", display: "flex", background: `linear-gradient(90deg, transparent 0%, ${GOLD} 20%, ${GOLD_LT} 50%, ${GOLD} 80%, transparent 100%)` }} />
      </div>
    ),
    { ...size }
  );
}

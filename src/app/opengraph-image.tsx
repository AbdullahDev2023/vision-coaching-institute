import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt    = "Vision Coaching Institute Tulsipur — Expert Coaching for CBSE, ICSE, ISC & UP Board";
export const size   = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050D1F 0%, #0A1F5C 50%, #050D1F 100%)",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background glow orbs ── */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(26,58,143,0.5) 0%, transparent 70%)",
          }}
        />

        {/* ── Top gold accent bar ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #D4A017, #F0C842, #D4A017, transparent)",
          }}
        />

        {/* ── Bottom gold accent bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #D4A017, #F0C842, #D4A017, transparent)",
          }}
        />

        {/* ── Left gold side bar ── */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            background: "linear-gradient(180deg, transparent, #D4A017, transparent)",
          }}
        />

        {/* ── Right gold side bar ── */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            background: "linear-gradient(180deg, transparent, #D4A017, transparent)",
          }}
        />

        {/* ── Logo circle ── */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4A017, #F0C842)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
            boxShadow: "0 0 40px rgba(212,160,23,0.45)",
            border: "3px solid rgba(255,255,255,0.15)",
          }}
        >
          <span style={{ fontSize: "48px", fontWeight: 900, color: "#0A1F5C" }}>V</span>
        </div>

        {/* ── Institute name ── */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Vision Coaching Institute
        </div>

        {/* ── Location tag ── */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#D4A017",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "36px",
          }}
        >
          Tulsipur · Uttar Pradesh
        </div>

        {/* ── Gold divider ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "36px",
          }}
        >
          <div style={{ width: "80px", height: "1.5px", background: "rgba(212,160,23,0.50)" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#D4A017" }} />
          <div style={{ width: "80px", height: "1.5px", background: "rgba(212,160,23,0.50)" }} />
        </div>

        {/* ── Description ── */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.72)",
            textAlign: "center",
            maxWidth: "780px",
            lineHeight: 1.55,
            fontWeight: 400,
            marginBottom: "44px",
          }}
        >
          Expert Coaching for Classes 6th–12th · CBSE · ICSE · ISC · UP Board
          {"\n"}Maths · Physics · Chemistry · Biology
        </div>

        {/* ── Feature pills ── */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            "👥 Small Batches",
            "🙋 Daily Doubt Solving",
            "📝 Weekly Tests",
            "🎓 Free Demo Class",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 22px",
                borderRadius: "9999px",
                background: "rgba(212,160,23,0.12)",
                border: "1.5px solid rgba(212,160,23,0.35)",
                color: "#F0C842",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* ── Bottom phone strip ── */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(255,255,255,0.38)",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          📞 +91 72104 33685 · Purani Bazar, Tulsipur, Uttar Pradesh
        </div>
      </div>
    ),
    { ...size }
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────────────── */
type SiteConfig = {
  social: { facebook: string; instagram: string; youtube: string };
  seo:    { aggregateRating: { ratingValue: string; reviewCount: string } };
};

type Msg = { type: "success" | "error"; text: string };

/* ─── Shared input style ─────────────────────────────────── */
const inputCls =
  "w-full rounded-xl px-4 py-3 text-sm text-white/85 bg-white/5 " +
  "border border-white/12 outline-none transition-all duration-200 " +
  "focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20 " +
  "placeholder-white/25 font-normal";

/* ─── Password Gate ──────────────────────────────────────── */
function PasswordGate({ onAuth }: { onAuth: (pw: string, cfg: SiteConfig) => void }) {
  const [pw,  setPw]  = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) return;
    setLoading(true); setErr("");
    try {
      const res  = await fetch(`/api/admin/config?pw=${encodeURIComponent(pw)}`);
      const data = await res.json();
      if (data.success) { onAuth(pw, data.config as SiteConfig); }
      else              { setErr(data.error ?? "Invalid password."); }
    } catch { setErr("Connection error. Is the dev server running?"); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050D1F", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.4)", marginBottom: "0.75rem" }}>
            <Image src="/logo.png" alt="VCI" width={72} height={72} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
          </div>
          <h1 style={{ color: "#D4A017", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.06em", textAlign: "center" }}>ADMIN PANEL</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Vision Coaching Institute · Tulsipur</p>
        </div>

        {/* Card */}
        <form onSubmit={submit} style={{ background: "rgba(13,27,75,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(12px)" }}>
          <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            Admin Password
          </label>
          <input
            type="password" value={pw}
            onChange={e => { setPw(e.target.value); setErr(""); }}
            placeholder="Enter password…"
            className={inputCls}
            autoFocus
          />
          {err && (
            <p style={{ marginTop: "0.5rem", color: "#fca5a5", fontSize: "0.8rem" }}>{err}</p>
          )}
          <button
            type="submit" disabled={loading || !pw.trim()}
            style={{
              width: "100%", marginTop: "1.25rem", padding: "0.875rem",
              background: loading ? "rgba(212,160,23,0.5)" : "linear-gradient(135deg,#D4A017,#F0C842)",
              color: "#0A1F5C", fontWeight: 800, fontSize: "0.9rem",
              borderRadius: "0.75rem", border: "none", cursor: loading ? "wait" : "pointer",
              letterSpacing: "0.04em", transition: "opacity 0.2s",
            }}>
            {loading ? "Verifying…" : "🔓 Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", marginTop: "1rem" }}>
          Default password: <code style={{ color: "rgba(212,160,23,0.5)" }}>vci@admin2026</code><br />
          Override via <code style={{ color: "rgba(212,160,23,0.5)" }}>ADMIN_PASSWORD</code> env var.
        </p>
      </div>
    </div>
  );
}

/* ─── Section Card wrapper ───────────────────────────────── */
function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(13,27,75,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "1.75rem", marginBottom: "1.25rem" }}>
      <h2 style={{ color: "#D4A017", fontWeight: 800, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{icon}</span>{title}
      </h2>
      {children}
    </div>
  );
}

/* ─── Field ─────────────────────────────────────────────── */
function Field({ label, hint, value, onChange, placeholder, type = "url" }: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.4rem" }}>
        {label}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputCls}
        style={{ width: "100%", boxSizing: "border-box" }}
      />
      {hint && <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "0.3rem" }}>{hint}</p>}
    </div>
  );
}

/* ─── Dashboard ──────────────────────────────────────────── */
function Dashboard({ password, initialConfig, onLogout }: {
  password: string; initialConfig: SiteConfig; onLogout: () => void;
}) {
  const [cfg,  setCfg]  = useState<SiteConfig>(initialConfig);
  const [msg,  setMsg]  = useState<Msg | null>(null);
  const [busy, setBusy] = useState(false);

  const setSocial = (key: keyof SiteConfig["social"], val: string) =>
    setCfg(c => ({ ...c, social: { ...c.social, [key]: val } }));
  const setRating = (key: keyof SiteConfig["seo"]["aggregateRating"], val: string) =>
    setCfg(c => ({ ...c, seo: { aggregateRating: { ...c.seo.aggregateRating, [key]: val } } }));

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      const res  = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, ...cfg }),
      });
      const data = await res.json();
      if (data.success) {
        setCfg(data.config);
        setMsg({ type: "success", text: "✅ Saved to site-config.json! Commit + redeploy to go live." });
      } else {
        setMsg({ type: "error", text: data.error ?? "Save failed." });
      }
    } catch { setMsg({ type: "error", text: "Connection error." }); }
    setBusy(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050D1F", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.4)", flexShrink: 0 }}>
              <Image src="/logo.png" alt="VCI" width={44} height={44} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
            </div>
            <div>
              <h1 style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.2 }}>Vision Coaching Institute</h1>
              <p style={{ color: "#D4A017", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Admin Panel</p>
            </div>
          </div>
          <button onClick={onLogout}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", borderRadius: "0.625rem", padding: "0.5rem 1rem", fontSize: "0.78rem", cursor: "pointer", transition: "all 0.2s" }}>
            Logout
          </button>
        </div>

        {/* Info banner */}
        <div style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: "0.875rem", padding: "0.875rem 1.25rem", marginBottom: "1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
          <strong style={{ color: "#D4A017" }}>How it works:</strong> Changes save to <code style={{ color: "#F0C842" }}>src/lib/site-config.json</code>.
          The SEO schema and footer social icons update after you <strong style={{ color: "rgba(255,255,255,0.7)" }}>commit &amp; redeploy</strong> to Vercel.
        </div>

        {/* ── Social Media ── */}
        <Card title="Social Media Links" icon="🌐">
          <Field label="Facebook Page URL" hint="e.g. https://www.facebook.com/VisionCoachingTulsipur"
            value={cfg.social.facebook} onChange={v => setSocial("facebook", v)}
            placeholder="https://www.facebook.com/yourpage" />
          <Field label="Instagram Profile URL" hint="e.g. https://www.instagram.com/vciTulsipur"
            value={cfg.social.instagram} onChange={v => setSocial("instagram", v)}
            placeholder="https://www.instagram.com/yourprofile" />
          <Field label="YouTube Channel URL" hint="e.g. https://www.youtube.com/@VisionCoachingTulsipur"
            value={cfg.social.youtube} onChange={v => setSocial("youtube", v)}
            placeholder="https://www.youtube.com/@yourchannel" />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.5rem" }}>
            ℹ️ Social URLs are added to the JSON-LD <code>sameAs</code> field (helps Google verify your entity) and shown as icons in the website footer.
          </p>
        </Card>

        {/* ── SEO / Ratings ── */}
        <Card title="Google Rating (JSON-LD)" icon="⭐">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Rating Value" hint="e.g. 4.9 (out of 5)"
              value={cfg.seo.aggregateRating.ratingValue}
              onChange={v => setRating("ratingValue", v)}
              placeholder="4.9" type="text" />
            <Field label="Review Count" hint="Total number of Google reviews"
              value={cfg.seo.aggregateRating.reviewCount}
              onChange={v => setRating("reviewCount", v)}
              placeholder="47" type="text" />
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.5rem" }}>
            ℹ️ These display as ⭐ gold stars directly in Google search results. Update whenever your review count changes.
          </p>
        </Card>

        {/* ── Save ── */}
        {msg && (
          <div style={{
            padding: "0.875rem 1.25rem", borderRadius: "0.875rem", marginBottom: "1rem", fontSize: "0.83rem",
            background: msg.type === "success" ? "rgba(34,197,94,0.1)"  : "rgba(239,68,68,0.1)",
            border:     msg.type === "success" ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
            color:      msg.type === "success" ? "#86efac" : "#fca5a5",
          }}>
            {msg.text}
          </div>
        )}

        <button onClick={save} disabled={busy}
          style={{
            width: "100%", padding: "1rem", borderRadius: "0.875rem", border: "none",
            background: busy ? "rgba(212,160,23,0.4)" : "linear-gradient(135deg,#D4A017,#F0C842)",
            color: "#0A1F5C", fontWeight: 800, fontSize: "0.95rem",
            cursor: busy ? "wait" : "pointer", letterSpacing: "0.04em",
            transition: "opacity 0.2s",
          }}>
          {busy ? "Saving…" : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function AdminPage() {
  const [authed,   setAuthed]   = useState(false);
  const [password, setPassword] = useState("");
  const [config,   setConfig]   = useState<SiteConfig | null>(null);

  if (!authed || !config) {
    return (
      <PasswordGate
        onAuth={(pw, cfg) => { setPassword(pw); setConfig(cfg); setAuthed(true); }}
      />
    );
  }
  return (
    <Dashboard
      password={password}
      initialConfig={config}
      onLogout={() => { setAuthed(false); setPassword(""); setConfig(null); }}
    />
  );
}

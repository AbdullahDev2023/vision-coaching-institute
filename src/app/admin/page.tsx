"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  fetchAllGallery, fetchFaculty, uploadFile,
  saveGalleryDoc, updateGalleryDoc, deleteGalleryItem,
  saveFacultyDoc, updateFacultyDoc, deleteFacultyMember,
} from "@/lib/supabaseDb";
import type { GalleryItem, FacultyMember } from "@/lib/supabaseDb";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
type SiteConfig = {
  social: { facebook: string; instagram: string; youtube: string };
  seo:    { aggregateRating: { ratingValue: string; reviewCount: string } };
};
type Tab  = "gallery" | "faculty" | "settings";
type Msg  = { type: "success" | "error"; text: string };

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE STYLES — injected once at root
═══════════════════════════════════════════════════════════ */
const ADMIN_CSS = `
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Layout ── */
  .adm-page   { min-height: 100vh; background: #050D1F; font-family: Inter, system-ui, sans-serif; }
  .adm-content { max-width: 920px; margin: 0 auto; padding: 1.25rem 0.875rem; }
  @media (min-width: 640px) { .adm-content { padding: 1.75rem 1.5rem; } }
  @media (min-width: 1024px){ .adm-content { padding: 2rem 1.5rem; } }

  /* ── Top bar ── */
  .adm-topbar {
    background: rgba(13,27,75,0.97);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: sticky; top: 0; z-index: 50;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .adm-topbar-inner {
    max-width: 920px; margin: 0 auto;
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0 0.875rem; height: 56px;
  }
  @media (min-width: 640px) {
    .adm-topbar-inner { padding: 0 1.5rem; height: 62px; gap: 1rem; }
  }

  /* ── Brand (logo + text) ── */
  .adm-brand { display: flex; align-items: center; gap: 0.6rem; min-width: 0; flex: 1; }
  .adm-brand-logo {
    width: 34px; height: 34px; border-radius: 50%;
    overflow: hidden; border: 1.5px solid rgba(212,160,23,0.4);
    flex-shrink: 0;
  }
  @media (min-width: 640px) { .adm-brand-logo { width: 38px; height: 38px; } }
  .adm-brand-title { color: #fff; font-weight: 800; font-size: 0.88rem; line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .adm-brand-sub   { color: #D4A017; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; }
  .adm-brand-text  { display: none; }
  @media (min-width: 480px) { .adm-brand-text { display: block; min-width: 0; } }

  /* ── Tab pills ── */
  .adm-tabs {
    display: flex; gap: 0.2rem; flex-shrink: 0;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    scrollbar-width: none; max-width: calc(100vw - 160px);
  }
  .adm-tabs::-webkit-scrollbar { display: none; }
  @media (min-width: 640px) { .adm-tabs { gap: 0.3rem; max-width: none; } }

  .adm-tab {
    display: flex; align-items: center; gap: 0.3rem;
    border-radius: 0.5rem; padding: 0.45rem 0.7rem;
    font-size: 0.78rem; cursor: pointer;
    transition: background 0.15s, color 0.15s;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.5);
    white-space: nowrap; flex-shrink: 0;
    font-weight: 500;
  }
  .adm-tab.active {
    background: linear-gradient(135deg,#D4A017,#F0C842);
    color: #0A1F5C; border-color: transparent; font-weight: 800;
  }
  .adm-tab-label { display: none; }
  @media (min-width: 380px) { .adm-tab-label { display: inline; } }

  /* ── Logout ── */
  .adm-logout {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.55); font-size: 0.75rem;
    border-radius: 0.5rem; padding: 0.42rem 0.65rem;
    cursor: pointer; flex-shrink: 0; white-space: nowrap;
  }
  .adm-logout-text { display: none; }
  @media (min-width: 500px) { .adm-logout-text { display: inline; } }
  @media (min-width: 640px) { .adm-logout { font-size: 0.78rem; padding: 0.45rem 0.85rem; } }

  /* ── Cards ── */
  .adm-card {
    background: rgba(13,27,75,0.7);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 1rem; padding: 1rem;
    margin-bottom: 1rem;
  }
  @media (min-width: 640px) { .adm-card { padding: 1.25rem; } }

  /* ── Responsive 2-col grid ── */
  .adm-grid2 { display: grid; grid-template-columns: 1fr; gap: 0.625rem; }
  @media (min-width: 480px) { .adm-grid2 { grid-template-columns: 1fr 1fr; } }

  /* ── Gallery grid ── */
  .adm-gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
  }
  @media (min-width: 480px) { .adm-gallery-grid { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); } }
  @media (min-width: 768px) { .adm-gallery-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); } }

  /* ── Upload row ── */
  .adm-upload-row { display: flex; gap: 0.625rem; align-items: center; flex-wrap: wrap; }
  .adm-upload-row input { flex: 1; min-width: 160px; }

  /* ── Faculty card ── */
  .adm-faculty-row {
    display: flex; gap: 0.875rem; align-items: flex-start;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 0.75rem; padding: 0.875rem;
  }
  .adm-faculty-actions { display: flex; gap: 0.35rem; flex-wrap: wrap; }

  /* ── Password gate ── */
  .adm-gate {
    min-height: 100vh; background: #050D1F;
    display: flex; align-items: center; justify-content: center;
    padding: 1.25rem;
  }
  .adm-gate-box { width: 100%; max-width: 400px; }
  .adm-gate-form {
    background: rgba(13,27,75,0.8);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 1.25rem; padding: 1.5rem;
    backdrop-filter: blur(12px);
  }
  @media (min-width: 480px) { .adm-gate-form { padding: 2rem; } }

  /* ── Toast ── */
  .adm-toast {
    position: fixed; bottom: 1.25rem; left: 0.875rem; right: 0.875rem;
    z-index: 999; border-radius: 0.875rem;
    padding: 0.875rem 1.1rem;
    font-size: 0.83rem; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    display: flex; align-items: center; gap: 0.65rem;
  }
  @media (min-width: 520px) {
    .adm-toast { left: auto; right: 1.5rem; max-width: 360px; bottom: 1.5rem; }
  }

  /* ── Form inputs ── */
  .adm-input {
    width: 100%; box-sizing: border-box;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 0.625rem; padding: 0.58rem 0.8rem;
    color: rgba(255,255,255,0.85); font-size: 0.84rem; outline: none;
    transition: border-color 0.15s;
  }
  .adm-input:focus { border-color: rgba(212,160,23,0.5); }
  .adm-input::placeholder { color: rgba(255,255,255,0.25); }

  /* ── Buttons ── */
  .adm-btn-gold {
    background: linear-gradient(135deg,#D4A017,#F0C842);
    color: #0A1F5C; font-weight: 800; font-size: 0.84rem;
    border: none; border-radius: 0.625rem;
    padding: 0.58rem 1.1rem; cursor: pointer;
    letter-spacing: 0.03em; white-space: nowrap;
    transition: opacity 0.15s;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
    min-height: 40px;
  }
  .adm-btn-gold:disabled { opacity: 0.5; cursor: not-allowed; }
  .adm-btn-gold.full { width: 100%; padding: 0.75rem; font-size: 0.9rem; }

  .adm-btn-ghost {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.55); font-size: 0.78rem;
    border-radius: 0.5rem; padding: 0.42rem 0.75rem;
    cursor: pointer; min-height: 36px;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .adm-btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }

  .adm-btn-red {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.3);
    color: #f87171; font-size: 0.78rem;
    border-radius: 0.5rem; padding: 0.42rem 0.7rem;
    cursor: pointer; min-height: 36px;
    display: inline-flex; align-items: center; justify-content: center;
  }

  /* ── Label ── */
  .adm-label {
    display: block; color: rgba(255,255,255,0.4);
    font-size: 0.7rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 0.3rem;
  }

  /* ── Section title ── */
  .adm-section-title { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .adm-section-title-text { color: #D4A017; font-weight: 800; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.1em; }
  .adm-section-title-count {
    background: rgba(212,160,23,0.15); color: #D4A017;
    font-size: 0.68rem; font-weight: 700; border-radius: 999px;
    padding: 0.15rem 0.55rem; border: 1px solid rgba(212,160,23,0.3);
  }

  /* ── Lightbox ── */
  .adm-lb-backdrop {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(2,5,18,0.96);
    display: flex; align-items: center; justify-content: center;
    animation: lbIn 0.18s ease;
  }
  @keyframes lbIn { from { opacity: 0; } to { opacity: 1; } }
  .adm-lb-inner {
    position: relative; width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 4rem 0.5rem 1rem;
  }
  .adm-lb-media {
    max-width: min(92vw, 1100px); max-height: 75vh;
    width: 100%; display: flex; align-items: center; justify-content: center;
  }
  .adm-lb-media img  { max-width: 100%; max-height: 75vh; border-radius: 0.75rem; object-fit: contain; display: block; box-shadow: 0 24px 80px rgba(0,0,0,0.7); }
  .adm-lb-media video { max-width: 100%; max-height: 75vh; border-radius: 0.75rem; display: block; outline: none; box-shadow: 0 24px 80px rgba(0,0,0,0.7); width: 100%; }
  .adm-lb-caption {
    margin-top: 0.75rem; color: rgba(255,255,255,0.6); font-size: 0.83rem;
    text-align: center; padding: 0 0.5rem; max-width: min(92vw, 700px);
    display: flex; align-items: center; justify-content: center; gap: 0.6rem; flex-wrap: wrap;
  }
  .adm-lb-badge {
    background: rgba(212,160,23,0.15); color: #D4A017;
    border: 1px solid rgba(212,160,23,0.3);
    font-size: 0.65rem; font-weight: 700; border-radius: 999px;
    padding: 0.15rem 0.55rem; text-transform: uppercase; flex-shrink: 0;
  }
  .adm-lb-close {
    position: fixed; top: 0.875rem; right: 0.875rem; z-index: 210;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
    color: #fff; font-size: 1.25rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .adm-lb-close:hover { background: rgba(255,255,255,0.22); }
  .adm-lb-counter {
    position: fixed; top: 1rem; left: 50%; transform: translateX(-50%); z-index: 210;
    background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.55);
    font-size: 0.75rem; border-radius: 999px; padding: 0.25rem 0.85rem; white-space: nowrap;
  }
  .adm-lb-arrow {
    position: fixed; top: 50%; transform: translateY(-50%); z-index: 210;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    color: #fff; font-size: 1.2rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .adm-lb-arrow:hover:not(:disabled) { background: rgba(212,160,23,0.25); border-color: rgba(212,160,23,0.5); }
  .adm-lb-arrow:disabled { opacity: 0.2; cursor: default; }
  .adm-lb-arrow.prev { left: 0.5rem; }
  .adm-lb-arrow.next { right: 0.5rem; }
  @media (min-width: 640px) {
    .adm-lb-arrow.prev { left: 1.25rem; }
    .adm-lb-arrow.next { right: 1.25rem; }
    .adm-lb-close { top: 1.25rem; right: 1.25rem; }
  }
  .adm-lb-strip {
    display: flex; gap: 0.4rem; margin-top: 0.875rem;
    overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
    max-width: min(92vw, 700px); padding: 0.25rem;
  }
  .adm-lb-strip::-webkit-scrollbar { display: none; }
  .adm-lb-thumb-btn {
    width: 54px; height: 38px; border-radius: 0.35rem; flex-shrink: 0;
    cursor: pointer; opacity: 0.45; border: 2px solid transparent;
    transition: opacity 0.15s, border-color 0.15s;
    background: #080f2a; overflow: hidden; padding: 0;
    display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
    position: relative;
  }
  .adm-lb-thumb-btn.active { opacity: 1; border-color: #D4A017; }
  .adm-lb-thumb-btn:hover  { opacity: 0.8; }

  /* hover overlay on gallery cards */
  .adm-gc-thumb { position: relative; cursor: pointer; }
  .adm-gc-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center;
    transition: background 0.18s; pointer-events: none;
  }
  .adm-gc-icon {
    opacity: 0; transform: scale(0.7); font-size: 1.8rem;
    transition: opacity 0.18s, transform 0.18s;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
  }
  .adm-gc-thumb:hover .adm-gc-overlay { background: rgba(0,0,0,0.48); }
  .adm-gc-thumb:hover .adm-gc-icon { opacity: 1; transform: scale(1); }

  /* ── Drag zone ── */
  .adm-dropzone {
    border: 2px dashed rgba(212,160,23,0.3);
    border-radius: 0.875rem; padding: 1.5rem 1rem;
    text-align: center; cursor: pointer;
    background: rgba(255,255,255,0.02);
    transition: all 0.2s; margin-bottom: 0.875rem;
    min-height: 88px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 0.35rem;
  }
  .adm-dropzone.over { border-color: #D4A017; background: rgba(212,160,23,0.06); }
`;

/* ═══════════════════════════════════════════════════════════
   SHARED INLINE STYLE OBJECTS (kept for convenience)
═══════════════════════════════════════════════════════════ */
const INPUT: React.CSSProperties = {
  width: "100%", boxSizing: "border-box",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.625rem", padding: "0.55rem 0.75rem",
  color: "rgba(255,255,255,0.85)", fontSize: "0.82rem", outline: "none",
};

/* ═══════════════════════════════════════════════════════════
   SPINNER / TOAST
═══════════════════════════════════════════════════════════ */
function Spinner({ size = 18 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid rgba(255,255,255,0.15)`,
      borderTopColor: "#D4A017", animation: "spin 0.7s linear infinite",
      display: "inline-block", flexShrink: 0,
    }} />
  );
}

function Toast({ msg, onClose }: { msg: Msg; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  const ok = msg.type === "success";
  return (
    <div className="adm-toast" style={{
      background: ok ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
      border: `1px solid ${ok ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
      color: ok ? "#86efac" : "#fca5a5",
    }}>
      <span>{ok ? "✅" : "❌"}</span>
      <span style={{ flex: 1 }}>{msg.text}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: "0 0.25rem" }}>×</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════════════ */
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 999, height: 4, overflow: "hidden", marginTop: "0.5rem" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#D4A017,#F0C842)", transition: "width 0.2s" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HEADING
═══════════════════════════════════════════════════════════ */
function SectionTitle({ icon, title, count }: { icon: string; title: string; count?: number }) {
  return (
    <div className="adm-section-title">
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <span className="adm-section-title-text">{title}</span>
      {count !== undefined && <span className="adm-section-title-count">{count}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════ */
function Lightbox({ items, index, onClose, onNav }: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const item = items[index];
  const videoRef = useRef<HTMLVideoElement>(null);

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft"  && index > 0)               onNav(index - 1);
      if (e.key === "ArrowRight" && index < items.length - 1) onNav(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, items.length, onClose, onNav]);

  // pause previous video when navigating
  useEffect(() => {
    videoRef.current?.load();
  }, [index]);

  // scroll active thumb into view
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stripRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  return (
    <div className="adm-lb-backdrop" onClick={onClose}>
      {/* counter */}
      <div className="adm-lb-counter">{index + 1} / {items.length}</div>

      {/* close */}
      <button className="adm-lb-close" onClick={onClose} aria-label="Close">✕</button>

      {/* prev */}
      <button className="adm-lb-arrow prev" disabled={index === 0}
        onClick={e => { e.stopPropagation(); onNav(index - 1); }} aria-label="Previous">‹</button>

      {/* next */}
      <button className="adm-lb-arrow next" disabled={index === items.length - 1}
        onClick={e => { e.stopPropagation(); onNav(index + 1); }} aria-label="Next">›</button>

      {/* media */}
      <div className="adm-lb-inner" onClick={e => e.stopPropagation()}>
        <div className="adm-lb-media">
          {item.type === "video" ? (
            <video ref={videoRef} src={item.url} controls autoPlay playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.url} alt={item.label} />
          )}
        </div>

        {/* caption */}
        <div className="adm-lb-caption">
          <span className={`adm-lb-badge`}>{item.type}</span>
          <span>{item.label}</span>
        </div>

        {/* thumbnail strip */}
        <div className="adm-lb-strip" ref={stripRef}>
          {items.map((it, i) => (
            <button
              key={it.id}
              className={`adm-lb-thumb-btn${i === index ? " active" : ""}`}
              onClick={() => onNav(i)}
              aria-label={it.label}
            >
              {it.type === "video" ? (
                <span>🎬</span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.url} alt={it.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GALLERY TAB
═══════════════════════════════════════════════════════════ */
function GalleryTab({ onToast }: { onToast: (m: Msg) => void }) {
  const [items,     setItems]     = useState<GalleryItem[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [file,      setFile]      = useState<File | null>(null);
  const [label,     setLabel]     = useState("");
  const [uploading, setUploading] = useState(false);
  const [upPct,     setUpPct]     = useState(0);
  const [drag,      setDrag]      = useState(false);
  const [lbIndex,   setLbIndex]   = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await fetchAllGallery()); }
    catch { onToast({ type: "error", text: "Failed to load gallery." }); }
    setLoading(false);
  }, [onToast]);

  useEffect(() => { load(); }, [load]);

  const upload = async () => {
    if (!file) return;
    setUploading(true); setUpPct(0);
    try {
      const ext  = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const type = file.type.startsWith("video") ? "video" : "photo";
      const name = `${type}-${Date.now()}.${ext}`;
      const url  = await uploadFile(name, file, setUpPct);
      await saveGalleryDoc({
        type, label: label.trim() || file.name,
        url, storagePath: name, order: items.length + 1,
      });
      onToast({ type: "success", text: "Uploaded successfully!" });
      setFile(null); setLabel(""); setUpPct(0);
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } catch (e) {
      onToast({ type: "error", text: String(e) });
    }
    setUploading(false);
  };

  const del = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.label}"?`)) return;
    try { await deleteGalleryItem(item); onToast({ type: "success", text: "Deleted." }); await load(); }
    catch (e) { onToast({ type: "error", text: String(e) }); }
  };

  const editLabel = async (item: GalleryItem, newLabel: string) => {
    try { await updateGalleryDoc(item.id, { label: newLabel }); }
    catch (e) { onToast({ type: "error", text: String(e) }); }
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const next = idx + dir;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    [copy[idx], copy[next]] = [copy[next], copy[idx]];
    setItems(copy);
    try {
      await updateGalleryDoc(copy[idx].id,  { order: idx + 1 });
      await updateGalleryDoc(copy[next].id, { order: next + 1 });
    } catch (e) { onToast({ type: "error", text: String(e) }); await load(); }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  return (
    <div>
      {/* ── Upload zone ── */}
      <div className="adm-card">
        <SectionTitle icon="⬆️" title="Upload New Item" />
        <div
          className={`adm-dropzone${drag ? " over" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <div style={{ fontSize: "1.8rem" }}>📁</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            {file
              ? <span style={{ color: "#D4A017", fontWeight: 700 }}>{file.name}</span>
              : "Drag & drop or click — photos or videos"}
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
            onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div className="adm-upload-row">
          <input value={label} onChange={e => setLabel(e.target.value)}
            placeholder="Label (optional — defaults to filename)"
            className="adm-input" />
          <button onClick={upload} disabled={uploading || !file} className="adm-btn-gold" style={{ opacity: uploading || !file ? 0.5 : 1 }}>
            {uploading ? <Spinner size={14} /> : "Upload"}
          </button>
        </div>
        {uploading && <ProgressBar pct={upPct} />}
      </div>

      {/* ── Items grid ── */}
      <div className="adm-card">
        <SectionTitle icon="🖼️" title="All Items" count={items.length} />
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}><Spinner size={28} /></div>
        ) : items.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textAlign: "center", padding: "1.5rem 0" }}>No items yet.</p>
        ) : (
          <div className="adm-gallery-grid">
            {items.map((item, idx) => (
              <GalleryCard key={item.id} item={item} idx={idx} total={items.length}
                onView={() => setLbIndex(idx)}
                onDelete={() => del(item)}
                onLabelBlur={lbl => editLabel(item, lbl)}
                onMoveUp={idx > 0 ? () => move(idx, -1) : undefined}
                onMoveDown={idx < items.length - 1 ? () => move(idx, 1) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lbIndex !== null && (
        <Lightbox
          items={items}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNav={setLbIndex}
        />
      )}
    </div>
  );
}

function GalleryCard({ item, idx, onView, onDelete, onLabelBlur, onMoveUp, onMoveDown }: {
  item: GalleryItem; idx: number; total: number;
  onView: () => void;
  onDelete: () => void;
  onLabelBlur: (lbl: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [lbl, setLbl] = useState(item.label);
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", overflow: "hidden" }}>
      {/* Thumbnail — clickable */}
      <div className="adm-gc-thumb" style={{ aspectRatio: "16/10", background: "#080f2a" }} onClick={onView} role="button" aria-label={`View ${item.label}`} tabIndex={0} onKeyDown={e => e.key === "Enter" && onView()}>
        {item.type === "video" ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "2rem" }}>🎬</span>
          </div>
        ) : (
          <Image src={item.url} alt={item.label} fill style={{ objectFit: "cover" }} sizes="(max-width:480px) 150px, (max-width:768px) 180px, 220px" />
        )}
        {/* hover overlay */}
        <div className="adm-gc-overlay">
          <span className="adm-gc-icon">{item.type === "video" ? "▶️" : "🔍"}</span>
        </div>
        <span style={{
          position: "absolute", top: 6, left: 6,
          background: item.type === "video" ? "rgba(239,68,68,0.85)" : "rgba(10,31,92,0.85)",
          color: "#fff", fontSize: "0.6rem", fontWeight: 700,
          borderRadius: 999, padding: "0.15rem 0.5rem", textTransform: "uppercase",
        }}>{item.type}</span>
        <span style={{
          position: "absolute", top: 6, right: 6,
          background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.4)",
          fontSize: "0.6rem", borderRadius: 999, padding: "0.15rem 0.45rem",
        }}>#{idx + 1}</span>
      </div>

      {/* Controls */}
      <div style={{ padding: "0.625rem" }}>
        <input value={lbl} onChange={e => setLbl(e.target.value)}
          onBlur={() => onLabelBlur(lbl)}
          className="adm-input" style={{ fontSize: "0.73rem", marginBottom: "0.5rem" }} />
        <div style={{ display: "flex", gap: "0.35rem", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={onMoveUp}   disabled={!onMoveUp}   className="adm-btn-ghost" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>↑</button>
            <button onClick={onMoveDown} disabled={!onMoveDown} className="adm-btn-ghost" style={{ padding: "0.3rem 0.6rem", fontSize: "0.75rem" }}>↓</button>
          </div>
          <button onClick={onDelete} className="adm-btn-red" style={{ padding: "0.3rem 0.6rem" }}>🗑</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FACULTY TAB
═══════════════════════════════════════════════════════════ */
function FacultyTab({ onToast }: { onToast: (m: Msg) => void }) {
  const [members,   setMembers]   = useState<FacultyMember[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [upPct,     setUpPct]     = useState(0);
  const [form, setForm] = useState({ name: "", subject: "", qualification: "", exp: "" });
  const [photo,     setPhoto]     = useState<File | null>(null);
  const [drag,      setDrag]      = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setMembers(await fetchFaculty()); }
    catch { onToast({ type: "error", text: "Failed to load faculty." }); }
    setLoading(false);
  }, [onToast]);

  useEffect(() => { load(); }, [load]);

  const setF = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const add = async () => {
    if (!form.name.trim() || !photo) return;
    setUploading(true); setUpPct(0);
    try {
      const ext  = photo.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${form.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.${ext}`;
      const url  = await uploadFile(`faculty/${path}`, photo, setUpPct);
      await saveFacultyDoc({
        name: form.name.trim(), subject: form.subject.trim(),
        qualification: form.qualification.trim(), exp: form.exp.trim(),
        photoUrl: url, storagePath: `faculty/${path}`, order: members.length + 1,
      });
      onToast({ type: "success", text: `${form.name} added!` });
      setForm({ name: "", subject: "", qualification: "", exp: "" });
      setPhoto(null); setUpPct(0);
      if (fileRef.current) fileRef.current.value = "";
      await load();
    } catch (e) { onToast({ type: "error", text: String(e) }); }
    setUploading(false);
  };

  const del = async (m: FacultyMember) => {
    if (!confirm(`Delete ${m.name}?`)) return;
    try { await deleteFacultyMember(m); onToast({ type: "success", text: "Deleted." }); await load(); }
    catch (e) { onToast({ type: "error", text: String(e) }); }
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const next = idx + dir;
    if (next < 0 || next >= members.length) return;
    const copy = [...members];
    [copy[idx], copy[next]] = [copy[next], copy[idx]];
    setMembers(copy);
    try {
      await updateFacultyDoc(copy[idx].id,  { order: idx + 1 });
      await updateFacultyDoc(copy[next].id, { order: next + 1 });
    } catch (e) { onToast({ type: "error", text: String(e) }); await load(); }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) setPhoto(f);
  };

  return (
    <div>
      {/* ── Add form ── */}
      <div className="adm-card">
        <SectionTitle icon="➕" title="Add Faculty Member" />
        <div className="adm-grid2" style={{ marginBottom: "0.75rem" }}>
          {([
            { key: "name",          label: "Name *",       ph: "Shivam Sir" },
            { key: "subject",       label: "Subject",      ph: "Physics" },
            { key: "qualification", label: "Qualification",ph: "M.Sc. Physics" },
            { key: "exp",           label: "Experience",   ph: "8+ Years" },
          ] as const).map(({ key, label, ph }) => (
            <div key={key}>
              <label className="adm-label">{label}</label>
              <input value={form[key]} onChange={e => setF(key, e.target.value)}
                placeholder={ph} className="adm-input" />
            </div>
          ))}
        </div>

        {/* Photo drop zone */}
        <div
          className={`adm-dropzone${drag ? " over" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          {photo
            ? <span style={{ color: "#D4A017", fontSize: "0.8rem", fontWeight: 700 }}>📷 {photo.name}</span>
            : <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>📷 Click or drag photo</span>}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => setPhoto(e.target.files?.[0] ?? null)} />
        </div>
        {uploading && <ProgressBar pct={upPct} />}

        <button onClick={add} disabled={uploading || !form.name.trim() || !photo}
          className="adm-btn-gold full">
          {uploading ? <><Spinner size={14} /> Uploading…</> : "➕ Add Member"}
        </button>
      </div>

      {/* ── Members list ── */}
      <div className="adm-card">
        <SectionTitle icon="👨‍🏫" title="Current Faculty" count={members.length} />
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}><Spinner size={28} /></div>
        ) : members.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textAlign: "center", padding: "1.5rem 0" }}>No faculty members yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {members.map((m, idx) => (
              <FacultyCard key={m.id} member={m} idx={idx} total={members.length}
                onDelete={() => del(m)}
                onSave={async patch => { try { await updateFacultyDoc(m.id, patch); onToast({ type: "success", text: "Saved." }); } catch (e) { onToast({ type: "error", text: String(e) }); } }}
                onMoveUp={idx > 0 ? () => move(idx, -1) : undefined}
                onMoveDown={idx < members.length - 1 ? () => move(idx, 1) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FacultyCard({ member, idx, onDelete, onSave, onMoveUp, onMoveDown }: {
  member: FacultyMember; idx: number; total: number;
  onDelete: () => void;
  onSave: (patch: Partial<FacultyMember>) => Promise<void>;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [f, setF] = useState({ name: member.name, subject: member.subject, qualification: member.qualification, exp: member.exp });
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);

  const save = async () => {
    setSaving(true);
    await onSave({ name: f.name, subject: f.subject, qualification: f.qualification, exp: f.exp });
    setSaving(false); setEditing(false);
  };

  return (
    <div className="adm-faculty-row">
      {/* Photo */}
      <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.3)", flexShrink: 0, background: "#080f2a" }}>
        {member.photoUrl
          ? <Image src={member.photoUrl} alt={member.name} width={56} height={56} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: "1.4rem", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>👤</span>}
      </div>

      {/* Fields */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <div className="adm-grid2" style={{ marginBottom: "0.5rem" }}>
            {(["name","subject","qualification","exp"] as const).map(k => (
              <input key={k} value={f[k]} onChange={e => setF(p => ({ ...p, [k]: e.target.value }))}
                placeholder={k} className="adm-input" style={{ fontSize: "0.75rem" }} />
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: "0.4rem" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{member.name}</div>
            <div style={{ color: "#D4A017", fontSize: "0.75rem" }}>{member.subject}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>{member.qualification} · {member.exp}</div>
          </div>
        )}
        <div className="adm-faculty-actions">
          {editing ? (
            <>
              <button onClick={save} disabled={saving} className="adm-btn-gold" style={{ padding: "0.3rem 0.8rem" }}>
                {saving ? <Spinner size={12} /> : "Save"}
              </button>
              <button onClick={() => { setEditing(false); setF({ name: member.name, subject: member.subject, qualification: member.qualification, exp: member.exp }); }}
                className="adm-btn-ghost" style={{ padding: "0.3rem 0.7rem" }}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="adm-btn-ghost" style={{ padding: "0.3rem 0.7rem" }}>✏️ Edit</button>
          )}
          <button onClick={onMoveUp}   disabled={!onMoveUp}   className="adm-btn-ghost" style={{ padding: "0.3rem 0.55rem" }}>↑</button>
          <button onClick={onMoveDown} disabled={!onMoveDown} className="adm-btn-ghost" style={{ padding: "0.3rem 0.55rem" }}>↓</button>
          <button onClick={onDelete} className="adm-btn-red"  style={{ padding: "0.3rem 0.6rem" }}>🗑</button>
        </div>
      </div>

      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", flexShrink: 0, alignSelf: "flex-start" }}>#{idx + 1}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SETTINGS TAB
═══════════════════════════════════════════════════════════ */
function SettingsTab({ password, onToast }: { password: string; onToast: (m: Msg) => void }) {
  const [cfg,  setCfg]  = useState<SiteConfig | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/config?pw=${encodeURIComponent(password)}`)
      .then(r => r.json())
      .then(d => { if (d.success) setCfg(d.config); });
  }, [password]);

  const setSocial = (k: keyof SiteConfig["social"], v: string) =>
    setCfg(c => c ? ({ ...c, social: { ...c.social, [k]: v } }) : c);
  const setRating = (k: keyof SiteConfig["seo"]["aggregateRating"], v: string) =>
    setCfg(c => c ? ({ ...c, seo: { aggregateRating: { ...c.seo.aggregateRating, [k]: v } } }) : c);

  const save = async () => {
    if (!cfg) return;
    setBusy(true);
    try {
      const res  = await fetch("/api/admin/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, ...cfg }) });
      const data = await res.json();
      if (data.success) { setCfg(data.config); onToast({ type: "success", text: "Saved! Commit + redeploy to go live." }); }
      else onToast({ type: "error", text: data.error ?? "Save failed." });
    } catch { onToast({ type: "error", text: "Connection error." }); }
    setBusy(false);
  };

  if (!cfg) return <div style={{ textAlign: "center", padding: "3rem" }}><Spinner size={28} /></div>;

  const FLD = ({ label, hint, val, onChange, ph }: { label: string; hint?: string; val: string; onChange: (v: string) => void; ph: string }) => (
    <div style={{ marginBottom: "0.875rem" }}>
      <label className="adm-label">{label}</label>
      <input value={val} onChange={e => onChange(e.target.value)} placeholder={ph} className="adm-input" />
      {hint && <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "0.25rem" }}>{hint}</p>}
    </div>
  );

  return (
    <div>
      <div className="adm-card">
        <SectionTitle icon="🌐" title="Social Media Links" />
        <FLD label="Facebook" hint="Shown in footer + JSON-LD sameAs" val={cfg.social.facebook} onChange={v => setSocial("facebook", v)} ph="https://www.facebook.com/yourpage" />
        <FLD label="Instagram" val={cfg.social.instagram} onChange={v => setSocial("instagram", v)} ph="https://www.instagram.com/yourprofile" />
        <FLD label="YouTube" val={cfg.social.youtube} onChange={v => setSocial("youtube", v)} ph="https://www.youtube.com/@yourchannel" />
      </div>

      <div className="adm-card">
        <SectionTitle icon="⭐" title="Google Rating (JSON-LD)" />
        <div className="adm-grid2" style={{ marginBottom: "0.5rem" }}>
          <FLD label="Rating Value" hint="e.g. 4.9 out of 5" val={cfg.seo.aggregateRating.ratingValue} onChange={v => setRating("ratingValue", v)} ph="4.9" />
          <FLD label="Review Count" hint="Total Google reviews" val={cfg.seo.aggregateRating.reviewCount} onChange={v => setRating("reviewCount", v)} ph="47" />
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>ℹ️ Shows as gold stars in Google search results. Update when reviews change.</p>
      </div>

      <button onClick={save} disabled={busy} className="adm-btn-gold full">
        {busy ? <><Spinner size={14} /> Saving…</> : "💾 Save Settings"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PASSWORD GATE
═══════════════════════════════════════════════════════════ */
function PasswordGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw,      setPw]      = useState("");
  const [err,     setErr]     = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) return;
    setLoading(true); setErr("");
    try {
      const res  = await fetch(`/api/admin/config?pw=${encodeURIComponent(pw)}`);
      const data = await res.json();
      if (data.success) onAuth(pw);
      else setErr(data.error ?? "Invalid password.");
    } catch { setErr("Connection error."); }
    setLoading(false);
  };

  return (
    <div className="adm-gate">
      <style>{ADMIN_CSS}</style>
      <div className="adm-gate-box">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.4)", marginBottom: "0.75rem" }}>
            <Image src="/logo.webp" alt="VCI" width={72} height={72} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
          </div>
          <h1 style={{ color: "#D4A017", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.06em" }}>ADMIN PANEL</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Vision Coaching Institute · Tulsipur</p>
        </div>
        <form onSubmit={submit} className="adm-gate-form">
          <label className="adm-label">Password</label>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
            placeholder="Enter password…" className="adm-input" autoFocus />
          {err && <p style={{ marginTop: "0.5rem", color: "#fca5a5", fontSize: "0.8rem" }}>{err}</p>}
          <button type="submit" disabled={loading || !pw.trim()}
            className="adm-btn-gold full" style={{ marginTop: "1.25rem" }}>
            {loading ? <><Spinner size={14} /> Verifying…</> : "🔓 Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", marginTop: "1rem" }}>
          Default: <code style={{ color: "rgba(212,160,23,0.45)" }}>vci@admin2026</code>
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD SHELL
═══════════════════════════════════════════════════════════ */
function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [tab,   setTab]   = useState<Tab>("gallery");
  const [toast, setToast] = useState<Msg | null>(null);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "gallery",  label: "Gallery",  icon: "🖼️" },
    { id: "faculty",  label: "Faculty",  icon: "👨‍🏫" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="adm-page">
      <style>{ADMIN_CSS}</style>

      {/* ── Top bar ── */}
      <header className="adm-topbar">
        <div className="adm-topbar-inner">
          {/* Brand */}
          <div className="adm-brand">
            <div className="adm-brand-logo">
              <Image src="/logo.webp" alt="VCI" width={38} height={38} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
            </div>
            <div className="adm-brand-text">
              <div className="adm-brand-title">Vision Coaching</div>
              <div className="adm-brand-sub">Admin Panel</div>
            </div>
          </div>

          {/* Tabs */}
          <nav className="adm-tabs" aria-label="Admin sections">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`adm-tab${tab === t.id ? " active" : ""}`}
                aria-current={tab === t.id ? "page" : undefined}
              >
                <span aria-hidden="true">{t.icon}</span>
                <span className="adm-tab-label">{t.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <button onClick={onLogout} className="adm-logout" aria-label="Logout">
            <span aria-hidden="true">⏻</span>
            <span className="adm-logout-text"> Logout</span>
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="adm-content">
        {tab === "gallery"  && <GalleryTab  onToast={setToast} />}
        {tab === "faculty"  && <FacultyTab  onToast={setToast} />}
        {tab === "settings" && <SettingsTab password={password} onToast={setToast} />}
      </main>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE ENTRY
═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed,   setAuthed]   = useState(false);

  if (!authed) return <PasswordGate onAuth={pw => { setPassword(pw); setAuthed(true); }} />;
  return <Dashboard password={password} onLogout={() => { setAuthed(false); setPassword(""); }} />;
}

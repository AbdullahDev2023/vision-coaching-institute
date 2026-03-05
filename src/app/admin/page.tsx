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
   SHARED STYLES
═══════════════════════════════════════════════════════════ */
const INPUT = {
  width: "100%", boxSizing: "border-box" as const,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.625rem", padding: "0.55rem 0.75rem",
  color: "rgba(255,255,255,0.85)", fontSize: "0.82rem", outline: "none",
} as React.CSSProperties;

const BTN_GOLD = {
  background: "linear-gradient(135deg,#D4A017,#F0C842)",
  color: "#0A1F5C", fontWeight: 800, fontSize: "0.82rem",
  border: "none", borderRadius: "0.625rem",
  padding: "0.55rem 1.1rem", cursor: "pointer",
  letterSpacing: "0.03em", whiteSpace: "nowrap" as const,
} as React.CSSProperties;

const BTN_GHOST = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.55)", fontSize: "0.78rem",
  borderRadius: "0.5rem", padding: "0.4rem 0.7rem",
  cursor: "pointer",
} as React.CSSProperties;

const BTN_RED = {
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.3)",
  color: "#f87171", fontSize: "0.75rem",
  borderRadius: "0.5rem", padding: "0.4rem 0.65rem",
  cursor: "pointer",
} as React.CSSProperties;

const CARD = {
  background: "rgba(13,27,75,0.7)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "1rem", padding: "1.25rem",
  marginBottom: "1rem",
} as React.CSSProperties;

/* ═══════════════════════════════════════════════════════════
   SPINNER / TOAST
═══════════════════════════════════════════════════════════ */
function Spinner({ size = 18 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid rgba(255,255,255,0.15)`,
      borderTopColor: "#D4A017", animation: "spin 0.7s linear infinite",
      display: "inline-block",
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
    <div style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 999,
      background: ok ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
      border: `1px solid ${ok ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
      color: ok ? "#86efac" : "#fca5a5",
      borderRadius: "0.875rem", padding: "0.875rem 1.25rem",
      fontSize: "0.83rem", maxWidth: "340px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", gap: "0.75rem",
    }}>
      <span>{ok ? "✅" : "❌"}</span>
      <span style={{ flex: 1 }}>{msg.text}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>×</button>
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
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      <span style={{ color: "#D4A017", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</span>
      {count !== undefined && (
        <span style={{ background: "rgba(212,160,23,0.15)", color: "#D4A017", fontSize: "0.7rem", fontWeight: 700, borderRadius: 999, padding: "0.15rem 0.55rem", border: "1px solid rgba(212,160,23,0.3)" }}>{count}</span>
      )}
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
      <div style={CARD}>
        <SectionTitle icon="⬆️" title="Upload New Item" />
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${drag ? "#D4A017" : "rgba(212,160,23,0.3)"}`,
            borderRadius: "0.875rem", padding: "1.5rem 1rem",
            textAlign: "center", cursor: "pointer",
            background: drag ? "rgba(212,160,23,0.06)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s", marginBottom: "0.875rem",
          }}>
          <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>📁</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            {file ? <span style={{ color: "#D4A017", fontWeight: 700 }}>{file.name}</span> : "Drag & drop or click — photos or videos"}
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
            onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </div>

        <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", flexWrap: "wrap" }}>
          <input value={label} onChange={e => setLabel(e.target.value)}
            placeholder="Label (optional — defaults to filename)"
            style={{ ...INPUT, flex: 1, minWidth: 180 }} />
          <button onClick={upload} disabled={uploading || !file} style={{ ...BTN_GOLD, opacity: uploading || !file ? 0.5 : 1 }}>
            {uploading ? <Spinner size={14} /> : "Upload"}
          </button>
        </div>
        {uploading && <ProgressBar pct={upPct} />}
      </div>

      {/* ── Items grid ── */}
      <div style={CARD}>
        <SectionTitle icon="🖼️" title="All Items" count={items.length} />
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}><Spinner size={28} /></div>
        ) : items.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem", textAlign: "center", padding: "1.5rem 0" }}>No items yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.875rem" }}>
            {items.map((item, idx) => (
              <GalleryCard key={item.id} item={item} idx={idx} total={items.length}
                onDelete={() => del(item)}
                onLabelBlur={lbl => editLabel(item, lbl)}
                onMoveUp={idx > 0 ? () => move(idx, -1) : undefined}
                onMoveDown={idx < items.length - 1 ? () => move(idx, 1) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryCard({ item, idx, total, onDelete, onLabelBlur, onMoveUp, onMoveDown }: {
  item: GalleryItem; idx: number; total: number;
  onDelete: () => void;
  onLabelBlur: (lbl: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const [lbl, setLbl] = useState(item.label);
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", overflow: "hidden" }}>
      {/* Thumbnail */}
      <div style={{ position: "relative", aspectRatio: "16/10", background: "#080f2a" }}>
        {item.type === "video" ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "2rem" }}>🎬</span>
          </div>
        ) : (
          <Image src={item.url} alt={item.label} fill style={{ objectFit: "cover" }} sizes="220px" />
        )}
        <span style={{
          position: "absolute", top: 6, left: 6,
          background: item.type === "video" ? "rgba(239,68,68,0.85)" : "rgba(10,31,92,0.85)",
          color: "#fff", fontSize: "0.62rem", fontWeight: 700,
          borderRadius: 999, padding: "0.15rem 0.5rem", textTransform: "uppercase",
        }}>{item.type}</span>
        <span style={{
          position: "absolute", top: 6, right: 6,
          background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.4)",
          fontSize: "0.62rem", borderRadius: 999, padding: "0.15rem 0.45rem",
        }}>#{idx + 1}</span>
      </div>

      {/* Controls */}
      <div style={{ padding: "0.625rem" }}>
        <input value={lbl} onChange={e => setLbl(e.target.value)}
          onBlur={() => onLabelBlur(lbl)}
          style={{ ...INPUT, fontSize: "0.75rem", marginBottom: "0.5rem" }} />
        <div style={{ display: "flex", gap: "0.375rem", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <button onClick={onMoveUp}   disabled={!onMoveUp}   style={{ ...BTN_GHOST, padding: "0.3rem 0.6rem", opacity: onMoveUp   ? 1 : 0.3, fontSize: "0.75rem" }}>↑</button>
            <button onClick={onMoveDown} disabled={!onMoveDown} style={{ ...BTN_GHOST, padding: "0.3rem 0.6rem", opacity: onMoveDown ? 1 : 0.3, fontSize: "0.75rem" }}>↓</button>
          </div>
          <button onClick={onDelete} style={{ ...BTN_RED, padding: "0.3rem 0.6rem" }}>🗑</button>
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
      <div style={CARD}>
        <SectionTitle icon="➕" title="Add Faculty Member" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.3rem" }}>Name *</label>
            <input value={form.name} onChange={e => setF("name", e.target.value)} placeholder="Shivam Sir" style={INPUT} />
          </div>
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.3rem" }}>Subject</label>
            <input value={form.subject} onChange={e => setF("subject", e.target.value)} placeholder="Physics" style={INPUT} />
          </div>
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.3rem" }}>Qualification</label>
            <input value={form.qualification} onChange={e => setF("qualification", e.target.value)} placeholder="M.Sc. Physics" style={INPUT} />
          </div>
          <div>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.3rem" }}>Experience</label>
            <input value={form.exp} onChange={e => setF("exp", e.target.value)} placeholder="8+ Years" style={INPUT} />
          </div>
        </div>

        {/* Photo drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${drag ? "#D4A017" : "rgba(212,160,23,0.3)"}`,
            borderRadius: "0.75rem", padding: "1rem",
            textAlign: "center", cursor: "pointer",
            background: drag ? "rgba(212,160,23,0.06)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s", marginBottom: "0.75rem",
          }}>
          {photo ? (
            <span style={{ color: "#D4A017", fontSize: "0.8rem", fontWeight: 700 }}>📷 {photo.name}</span>
          ) : (
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>📷 Click or drag photo</span>
          )}
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => setPhoto(e.target.files?.[0] ?? null)} />
        </div>
        {uploading && <ProgressBar pct={upPct} />}

        <button onClick={add} disabled={uploading || !form.name.trim() || !photo}
          style={{ ...BTN_GOLD, width: "100%", padding: "0.7rem", opacity: uploading || !form.name.trim() || !photo ? 0.5 : 1 }}>
          {uploading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><Spinner size={14} /> Uploading…</span> : "➕ Add Member"}
        </button>
      </div>

      {/* ── Members list ── */}
      <div style={CARD}>
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
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", padding: "0.875rem" }}>
      {/* Photo */}
      <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.3)", flexShrink: 0, background: "#080f2a" }}>
        {member.photoUrl ? (
          <Image src={member.photoUrl} alt={member.name} width={64} height={64} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : <span style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>👤</span>}
      </div>

      {/* Fields */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {editing ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", marginBottom: "0.5rem" }}>
            {(["name","subject","qualification","exp"] as const).map(k => (
              <input key={k} value={f[k]} onChange={e => setF(p => ({ ...p, [k]: e.target.value }))}
                placeholder={k} style={{ ...INPUT, fontSize: "0.75rem" }} />
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: "0.4rem" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{member.name}</div>
            <div style={{ color: "#D4A017", fontSize: "0.75rem" }}>{member.subject}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>{member.qualification} · {member.exp}</div>
          </div>
        )}
        <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {editing ? (
            <>
              <button onClick={save} disabled={saving} style={{ ...BTN_GOLD, padding: "0.3rem 0.8rem" }}>{saving ? <Spinner size={12} /> : "Save"}</button>
              <button onClick={() => { setEditing(false); setF({ name: member.name, subject: member.subject, qualification: member.qualification, exp: member.exp }); }} style={{ ...BTN_GHOST, padding: "0.3rem 0.7rem" }}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} style={{ ...BTN_GHOST, padding: "0.3rem 0.7rem" }}>✏️ Edit</button>
          )}
          <button onClick={onMoveUp}   disabled={!onMoveUp}   style={{ ...BTN_GHOST, padding: "0.3rem 0.55rem", opacity: onMoveUp   ? 1 : 0.3 }}>↑</button>
          <button onClick={onMoveDown} disabled={!onMoveDown} style={{ ...BTN_GHOST, padding: "0.3rem 0.55rem", opacity: onMoveDown ? 1 : 0.3 }}>↓</button>
          <button onClick={onDelete} style={{ ...BTN_RED, padding: "0.3rem 0.6rem" }}>🗑</button>
        </div>
      </div>

      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", flexShrink: 0 }}>#{idx + 1}</span>
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
      <label style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.35rem" }}>{label}</label>
      <input value={val} onChange={e => onChange(e.target.value)} placeholder={ph} style={INPUT} />
      {hint && <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "0.25rem" }}>{hint}</p>}
    </div>
  );

  return (
    <div>
      <div style={CARD}>
        <SectionTitle icon="🌐" title="Social Media Links" />
        <FLD label="Facebook" hint="Shown in footer + JSON-LD sameAs" val={cfg.social.facebook} onChange={v => setSocial("facebook", v)} ph="https://www.facebook.com/yourpage" />
        <FLD label="Instagram" val={cfg.social.instagram} onChange={v => setSocial("instagram", v)} ph="https://www.instagram.com/yourprofile" />
        <FLD label="YouTube" val={cfg.social.youtube} onChange={v => setSocial("youtube", v)} ph="https://www.youtube.com/@yourchannel" />
      </div>

      <div style={CARD}>
        <SectionTitle icon="⭐" title="Google Rating (JSON-LD)" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <FLD label="Rating Value" hint="e.g. 4.9 out of 5" val={cfg.seo.aggregateRating.ratingValue} onChange={v => setRating("ratingValue", v)} ph="4.9" />
          <FLD label="Review Count" hint="Total Google reviews" val={cfg.seo.aggregateRating.reviewCount} onChange={v => setRating("reviewCount", v)} ph="47" />
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", marginTop: "0.25rem" }}>ℹ️ Shows as gold stars in Google search results. Update when reviews change.</p>
      </div>

      <button onClick={save} disabled={busy} style={{ ...BTN_GOLD, width: "100%", padding: "0.875rem", fontSize: "0.9rem", opacity: busy ? 0.6 : 1 }}>
        {busy ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><Spinner size={14} /> Saving…</span> : "💾 Save Settings"}
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
    <div style={{ minHeight: "100vh", background: "#050D1F", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(212,160,23,0.4)", marginBottom: "0.75rem" }}>
            <Image src="/logo.webp" alt="VCI" width={72} height={72} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
          </div>
          <h1 style={{ color: "#D4A017", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.06em" }}>ADMIN PANEL</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Vision Coaching Institute · Tulsipur</p>
        </div>
        <form onSubmit={submit} style={{ background: "rgba(13,27,75,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(12px)" }}>
          <label style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Password</label>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(""); }}
            placeholder="Enter password…" style={{ ...INPUT, marginBottom: err ? "0" : "0" }} autoFocus />
          {err && <p style={{ marginTop: "0.5rem", color: "#fca5a5", fontSize: "0.8rem" }}>{err}</p>}
          <button type="submit" disabled={loading || !pw.trim()}
            style={{ ...BTN_GOLD, width: "100%", padding: "0.875rem", fontSize: "0.9rem", marginTop: "1.25rem", opacity: loading || !pw.trim() ? 0.5 : 1 }}>
            {loading ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><Spinner size={14} /> Verifying…</span> : "🔓 Login"}
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
  const [tab,  setTab]  = useState<Tab>("gallery");
  const [toast, setToast] = useState<Msg | null>(null);

  const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: "gallery",  label: "Gallery",  icon: "🖼️" },
    { id: "faculty",  label: "Faculty",  icon: "👨‍🏫" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#050D1F" }}>
      {/* Global spin keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* ── Top bar ── */}
      <div style={{ background: "rgba(13,27,75,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: "1rem", height: 60 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "1.5px solid rgba(212,160,23,0.4)", flexShrink: 0 }}>
            <Image src="/logo.webp" alt="VCI" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem", lineHeight: 1.2 }}>Vision Coaching Institute</div>
            <div style={{ color: "#D4A017", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin Panel</div>
          </div>
          {/* Tab bar */}
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "linear-gradient(135deg,#D4A017,#F0C842)" : "rgba(255,255,255,0.05)",
                color: tab === t.id ? "#0A1F5C" : "rgba(255,255,255,0.5)",
                border: tab === t.id ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.5rem", padding: "0.4rem 0.875rem",
                fontSize: "0.78rem", fontWeight: tab === t.id ? 800 : 500,
                cursor: "pointer", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: "0.35rem",
              }}>
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
          <button onClick={onLogout} style={{ ...BTN_GHOST, flexShrink: 0 }}>Logout</button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.75rem 1.25rem" }}>
        {tab === "gallery"  && <GalleryTab  onToast={setToast} />}
        {tab === "faculty"  && <FacultyTab  onToast={setToast} />}
        {tab === "settings" && <SettingsTab password={password} onToast={setToast} />}
      </div>

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

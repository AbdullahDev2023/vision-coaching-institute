"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchGallery, fetchFaculty, uploadFile,
  saveGalleryDoc, saveFacultyDoc, deleteGalleryItem, deleteFacultyMember,
  updateFacultyDoc,
} from "@/lib/firestoreDb";
import type { GalleryItem, FacultyMember } from "@/lib/firestoreDb";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? "vision2026";

/* ── tiny helpers ── */
function Spinner() {
  return <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />;
}
function Badge({ children, color = "#D4A017" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: `${color}22`, border: `1px solid ${color}55`, color, borderRadius: 9999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════════
   GALLERY UPLOAD TAB
══════════════════════════════════════════════════════════════════════ */
function GalleryTab() {
  const [items,    setItems]    = useState<GalleryItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [uploading,setUploading]= useState(false);
  const [progress, setProgress] = useState(0);
  const [label,    setLabel]    = useState("");
  const [type,     setType]     = useState<"photo"|"video">("photo");
  const [file,     setFile]     = useState<File|null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error,    setError]    = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await fetchGallery()); } catch { setError("Failed to load gallery."); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleFile = (f: File) => {
    setFile(f);
    setType(f.type.startsWith("video") ? "video" : "photo");
    if (!label) setLabel(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const upload = async () => {
    if (!file || !label.trim()) { setError("Please pick a file and enter a label."); return; }
    setError(""); setUploading(true); setProgress(0);
    try {
      const ext  = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const url  = await uploadFile(path, file, setProgress);
      const order = items.length;
      await saveGalleryDoc({ type, label: label.trim(), url, storagePath: path, order });
      setFile(null); setLabel(""); setProgress(0);
      await load();
    } catch (e) { setError(String(e)); }
    setUploading(false);
  };

  const remove = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.label}"?`)) return;
    await deleteGalleryItem(item);
    setItems(p => p.filter(x => x.id !== item.id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Upload zone */}
      <div style={{ background: "#0D1B4B", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ color: "#F0C842", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>Upload New Media</div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#D4A017" : "rgba(255,255,255,0.15)"}`,
            borderRadius: 12, padding: "32px 24px", textAlign: "center", cursor: "pointer",
            background: dragOver ? "rgba(212,160,23,0.06)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s",
          }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{file ? "✅" : "📁"}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            {file ? file.name : "Drag & drop photo / video — or click to browse"}
          </div>
          {file && <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 4 }}>{(file.size / 1024 / 1024).toFixed(1)} MB</div>}
          <input ref={inputRef} type="file" accept="image/*,video/*" style={{ display: "none" }}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </div>

        {/* Label + type */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
          <input
            value={label} onChange={e => setLabel(e.target.value)}
            placeholder="Caption / label (e.g. Chemistry class 2025)"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: 14, outline: "none" }}
          />
          <select value={type} onChange={e => setType(e.target.value as "photo"|"video")}
            style={{ background: "#0A1F5C", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: 13, cursor: "pointer" }}>
            <option value="photo">📷 Photo</option>
            <option value="video">🎥 Video</option>
          </select>
        </div>

        {/* Progress */}
        {uploading && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#D4A017,#F0C842)", borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        )}

        {error && <div style={{ color: "#f87171", fontSize: 13 }}>{error}</div>}

        <button onClick={upload} disabled={uploading || !file}
          style={{ background: uploading || !file ? "rgba(212,160,23,0.3)" : "linear-gradient(135deg,#D4A017,#F0C842)", color: "#0A1F5C", fontWeight: 800, borderRadius: 10, padding: "12px 24px", border: "none", cursor: uploading || !file ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {uploading ? <><Spinner /> Uploading… {progress}%</> : "⬆️  Upload to Firebase"}
        </button>
      </div>

      {/* Existing items */}
      <div style={{ background: "#0D1B4B", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 16, padding: 24 }}>
        <div style={{ color: "#F0C842", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Live Gallery ({items.length} items)
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 32 }}><Spinner /></div>
        ) : items.length === 0 ? (
          <div style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", padding: 32 }}>No items yet — upload your first media above.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ aspectRatio: "16/9", background: "#050D1F", position: "relative", overflow: "hidden" }}>
                  {item.type === "photo"
                    ? <img src={item.url} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                  }
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{item.label}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Badge color={item.type === "video" ? "#ef4444" : "#4488ff"}>{item.type.toUpperCase()}</Badge>
                    <button onClick={() => remove(item)} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171", borderRadius: 6, padding: "3px 8px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FACULTY UPLOAD TAB
══════════════════════════════════════════════════════════════════════ */
const BLANK = { name: "", subject: "", qualification: "", exp: "" };

function FacultyTab() {
  const [members,  setMembers]  = useState<FacultyMember[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [uploading,setUploading]= useState(false);
  const [progress, setProgress] = useState(0);
  const [form,     setForm]     = useState(BLANK);
  const [file,     setFile]     = useState<File|null>(null);
  const [preview,  setPreview]  = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [error,    setError]    = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setMembers(await fetchFaculty()); } catch { setError("Failed to load faculty."); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const upload = async () => {
    if (!file || !form.name.trim() || !form.subject.trim()) {
      setError("Name, subject, and photo are required."); return;
    }
    setError(""); setUploading(true); setProgress(0);
    try {
      const ext  = file.name.split(".").pop();
      const path = `faculty/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const photoUrl = await uploadFile(path, file, setProgress);
      await saveFacultyDoc({ ...form, photoUrl, storagePath: path, order: members.length });
      setForm(BLANK); setFile(null); setPreview(""); setProgress(0);
      await load();
    } catch (e) { setError(String(e)); }
    setUploading(false);
  };

  const remove = async (m: FacultyMember) => {
    if (!confirm(`Delete ${m.name}?`)) return;
    await deleteFacultyMember(m);
    setMembers(p => p.filter(x => x.id !== m.id));
  };

  const field = (key: keyof typeof BLANK, placeholder: string) => (
    <input
      value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
      placeholder={placeholder}
      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 14px", color: "white", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" as const }}
    />
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Upload form */}
      <div style={{ background: "#0D1B4B", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ color: "#F0C842", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase" }}>Add / Update Faculty Member</div>

        {/* Photo drop zone */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              width: 100, height: 100, borderRadius: "50%", border: `2px dashed ${dragOver ? "#D4A017" : "rgba(255,255,255,0.2)"}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.03)",
            }}>
            {preview
              ? <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>📷<br />Photo</div>
            }
            <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            {field("name", "Full name (e.g. Satish Sir)")}
            {field("subject", "Subject (e.g. Chemistry)")}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {field("qualification", "Qualification (e.g. M.Sc. Chemistry, B.Ed)")}
          {field("exp", "Experience (e.g. 8+ Years)")}
        </div>

        {uploading && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#D4A017,#F0C842)", borderRadius: 99, transition: "width 0.3s" }} />
          </div>
        )}

        {error && <div style={{ color: "#f87171", fontSize: 13 }}>{error}</div>}

        <button onClick={upload} disabled={uploading || !file || !form.name.trim()}
          style={{ background: uploading || !file ? "rgba(212,160,23,0.3)" : "linear-gradient(135deg,#D4A017,#F0C842)", color: "#0A1F5C", fontWeight: 800, borderRadius: 10, padding: "12px 24px", border: "none", cursor: uploading ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {uploading ? <><Spinner /> Uploading… {progress}%</> : "⬆️  Save Faculty Member"}
        </button>
      </div>

      {/* Existing members */}
      <div style={{ background: "#0D1B4B", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 16, padding: 24 }}>
        <div style={{ color: "#F0C842", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          Current Faculty ({members.length})
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 32 }}><Spinner /></div>
        ) : members.length === 0 ? (
          <div style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", padding: 32 }}>No faculty members added yet.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {members.map(m => (
              <div key={m.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                {m.photoUrl
                  ? <img src={m.photoUrl} alt={m.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(212,160,23,0.4)" }} />
                  : <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#0A1F5C", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A017", fontWeight: 700, fontSize: 20 }}>{m.name[0]}</div>
                }
                <div style={{ color: "white", fontWeight: 700, fontSize: 13 }}>{m.name}</div>
                <Badge>{m.subject}</Badge>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{m.qualification}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{m.exp}</div>
                <button onClick={() => remove(m)} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#f87171", borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   ADMIN PAGE
══════════════════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [pin,       setPin]       = useState("");
  const [authed,    setAuthed]    = useState(false);
  const [pinError,  setPinError]  = useState(false);
  const [tab,       setTab]       = useState<"gallery"|"faculty">("gallery");

  const tryLogin = () => {
    if (pin === ADMIN_PIN) { setAuthed(true); setPinError(false); }
    else { setPinError(true); setPin(""); }
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#050D1F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,sans-serif" }}>
      <div style={{ background: "#0D1B4B", border: "1px solid rgba(212,160,23,0.25)", borderRadius: 20, padding: 40, width: 360, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        <div style={{ fontSize: 40 }}>🔐</div>
        <div style={{ color: "#F0C842", fontWeight: 900, fontSize: 20 }}>Admin Access</div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textAlign: "center" }}>Vision Coaching Institute — Media Manager</div>
        <input
          type="password" value={pin} onChange={e => setPin(e.target.value)}
          onKeyDown={e => e.key === "Enter" && tryLogin()}
          placeholder="Enter admin PIN"
          style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: `1px solid ${pinError ? "#ef4444" : "rgba(255,255,255,0.15)"}`, borderRadius: 12, padding: "14px 18px", color: "white", fontSize: 18, outline: "none", textAlign: "center", letterSpacing: "0.3em" }}
        />
        {pinError && <div style={{ color: "#f87171", fontSize: 13 }}>Incorrect PIN. Try again.</div>}
        <button onClick={tryLogin} style={{ background: "linear-gradient(135deg,#D4A017,#F0C842)", color: "#0A1F5C", fontWeight: 800, borderRadius: 12, padding: "14px 40px", border: "none", cursor: "pointer", fontSize: 15, width: "100%" }}>
          Enter
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#050D1F", fontFamily: "system-ui,sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#F0C842", fontWeight: 900, fontSize: 22 }}>🎓 Vision Coaching — Media Admin</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 4 }}>Upload gallery photos/videos and faculty images to Firebase</div>
          </div>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>← Back to site</a>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, width: "fit-content" }}>
          {(["gallery", "faculty"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "10px 24px", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, transition: "all 0.2s",
                background: tab === t ? "linear-gradient(135deg,#D4A017,#F0C842)" : "transparent",
                color:      tab === t ? "#0A1F5C" : "rgba(255,255,255,0.5)",
              }}>
              {t === "gallery" ? "🖼️  Gallery" : "👩‍🏫  Faculty"}
            </button>
          ))}
        </div>

        {tab === "gallery" ? <GalleryTab /> : <FacultyTab />}
      </div>
    </div>
  );
}

"use client";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";

type GalleryItem = { type: "photo" | "video"; label: string; gradient: string; icon: string };

const ITEMS: GalleryItem[] = [
  { type: "photo", label: "Classroom Session",  gradient: "linear-gradient(135deg,#0A1F5C,#1A3A8F)", icon: "🏫" },
  { type: "photo", label: "Prize Ceremony",     gradient: "linear-gradient(135deg,#7C3AED,#0A1F5C)", icon: "🏆" },
  { type: "photo", label: "Batch 2024",         gradient: "linear-gradient(135deg,#0A1F5C,#14B8A6)", icon: "📚" },
  { type: "video", label: "Demo Class",         gradient: "linear-gradient(135deg,#1A3A8F,#D4A017)", icon: "▶" },
  { type: "photo", label: "Science Lab",        gradient: "linear-gradient(135deg,#14B8A6,#0A1F5C)", icon: "🔬" },
  { type: "video", label: "Results 2024",       gradient: "linear-gradient(135deg,#D4A017,#0A1F5C)", icon: "▶" },
  { type: "photo", label: "Study Group",        gradient: "linear-gradient(135deg,#1A3A8F,#3B82F6)", icon: "👥" },
  { type: "photo", label: "Annual Event",       gradient: "linear-gradient(135deg,#7C3AED,#1A3A8F)", icon: "🎉" },
  { type: "photo", label: "Faculty Meet",       gradient: "linear-gradient(135deg,#0A1F5C,#D4A017)", icon: "👩‍🏫" },
];

/* ─── Lightbox ─────────────────────────────────────────────────────── */
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>

        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          className="relative z-10 max-w-2xl w-full rounded-2xl overflow-hidden border border-gold/20"
          style={{ background: "#050D1F" }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          exit={{ scale: 0.85,    opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={e => e.stopPropagation()}>

          {/* Content */}
          <div className="aspect-video flex items-center justify-center"
            style={{ background: item.gradient }}>
            {item.type === "video" ? (
              <div className="flex flex-col items-center gap-4 text-center px-8">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl backdrop-blur-sm">▶</div>
                <p className="text-white/70 text-sm">
                  Add video to{" "}
                  <code className="bg-black/30 px-1.5 py-0.5 rounded text-gold text-xs">
                    public/videos/{item.label.toLowerCase().replace(/ /g, "-")}.mp4
                  </code>
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 px-8">
                <div className="text-7xl">{item.icon}</div>
                <p className="text-white/70 text-sm">
                  Add photo to{" "}
                  <code className="bg-black/30 px-1.5 py-0.5 rounded text-gold text-xs">
                    public/images/gallery/
                  </code>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/8">
            <span className="text-white font-medium text-sm">{item.label}</span>
            <span className={`badge-xs ${
              item.type === "video" ? "bg-red-500 text-white" : "bg-primary text-gold border-gold/30"}`}>
              {item.type.toUpperCase()}
            </span>
          </div>
        </motion.div>

        {/* Close button */}
        <button onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-lg transition-all">
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Gallery section ──────────────────────────────────────────────── */
export default function Gallery() {
  const { t } = useLanguage();
  const [filter,    setFilter]    = useState(0);
  const [lightbox,  setLightbox]  = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.07 });

  const filtered = ITEMS.filter(item => {
    if (filter === 0) return true;
    return filter === 1 ? item.type === "photo" : item.type === "video";
  });

  return (
    <div className="section-pad bg-bg-light" style={{ background: "#F8F9FF" }} ref={sectionRef}>
      <div className="layout-container">
        <SectionHeading title={t.gallery.title} subtitle={t.gallery.subtitle} light={false} />

        {/* Filter tabs */}
        <div className="flex justify-center gap-4 mb-10 gsap-reveal">
          {t.gallery.filters.map((f, i) => (
            <button key={f} onClick={() => setFilter(i)}
              className={`px-8 py-3 rounded-full text-sm font-semibold leading-none transition-all duration-200 ${
                filter === i
                  ? "bg-gold text-primary shadow-lg shadow-gold/30"
                  : "border border-primary/25 text-primary/60 hover:border-primary/60 hover:text-primary bg-transparent"
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid via CSS columns */}
        <AnimatePresence mode="wait">
          <motion.div key={filter}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 lg:gap-4">
            {filtered.map((item, i) => (
              <motion.div key={item.label + i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className={`break-inside-avoid mb-2 sm:mb-3 lg:mb-4 relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200 ${i % 3 === 0 ? "h-44 sm:h-52 lg:h-56" : "h-36 sm:h-40 lg:h-44"}`}
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                onClick={() => setLightbox(item)}>

                {/* Gradient background */}
                <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: item.gradient }} />
                {/* Overlay vignette */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 pb-1"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.75))" }}>
                  <div className="px-4 py-3 pb-4">
                    <span className="text-white/90 text-xs font-semibold tracking-wide leading-none">{item.label}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-2xl">
                  {item.type === "video"
                    ? <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-primary text-2xl shadow-lg shadow-gold/40">▶</div>
                    : <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-xl">🔍</div>
                  }
                </div>

                {/* Type badge */}
                <span className={`absolute top-3 right-3 badge-xs z-10 ${
                  item.type === "video" ? "bg-red-500 text-white" : "bg-primary/80 text-gold border-gold/30"}`}
                  style={{ margin: "2px" }}>
                  {item.type === "video" ? "VIDEO" : "PHOTO"}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Helper note — dev only */}
        {process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_DEV_HINTS === "true" && (
          <p className="text-center text-primary/30 text-xs mt-8 gsap-reveal">
            📁 Drop real files in{" "}
            <code className="bg-primary/8 px-1.5 py-0.5 rounded">public/images/gallery/</code>
          </p>
        )}
      </div>

      {/* Lightbox portal */}
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

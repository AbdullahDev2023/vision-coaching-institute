"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCarousel } from "@/lib/useCarousel";
import { CarouselNav } from "@/components/sections/Testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGallery } from "@/lib/firestoreDb";
import type { GalleryItem as FSItem } from "@/lib/firestoreDb";

// Lazy-load LazyVideo — not needed until gallery scrolls into view
const LazyVideo = dynamic(() => import("@/components/ui/LazyVideo"), { ssr: false });

type MediaType = "photo" | "video";
type GalleryItem = { type: MediaType; label: string; src: string };

const STATIC_ITEMS: GalleryItem[] = [
  { type: "photo", label: "Vision Coaching Institute classroom – Tulsipur 1",  src: "/images/gallery/photo-01.jpg" },
  { type: "photo", label: "Vision Coaching Institute classroom – Tulsipur 2",  src: "/images/gallery/photo-02.jpg" },
  { type: "photo", label: "CBSE coaching class – Vision Coaching Tulsipur 3",  src: "/images/gallery/photo-03.jpg" },
  { type: "photo", label: "CBSE coaching class – Vision Coaching Tulsipur 4",  src: "/images/gallery/photo-04.jpg" },
  { type: "photo", label: "Physics class – Vision Coaching Tulsipur 5",        src: "/images/gallery/photo-05.jpg" },
  { type: "photo", label: "Physics class – Vision Coaching Tulsipur 6",        src: "/images/gallery/photo-06.jpg" },
  { type: "photo", label: "Chemistry class – Vision Coaching Tulsipur 7",      src: "/images/gallery/photo-07.jpg" },
  { type: "photo", label: "Chemistry class – Vision Coaching Tulsipur 8",      src: "/images/gallery/photo-08.jpg" },
  { type: "photo", label: "Biology class – Vision Coaching Tulsipur 9",        src: "/images/gallery/photo-09.jpg" },
  { type: "photo", label: "Maths batch – Vision Coaching Tulsipur 10",         src: "/images/gallery/photo-10.jpg" },
  { type: "photo", label: "UP Board coaching – Vision Coaching Tulsipur 11",   src: "/images/gallery/photo-11.jpg" },
  { type: "photo", label: "UP Board coaching – Vision Coaching Tulsipur 12",   src: "/images/gallery/photo-12.jpg" },
  { type: "photo", label: "ICSE ISC batch – Vision Coaching Tulsipur 13",      src: "/images/gallery/photo-13.jpg" },
  { type: "photo", label: "Best coaching Tulsipur – Vision 14",                src: "/images/gallery/photo-14.jpg" },
  { type: "photo", label: "Class 10 board prep – Vision Coaching 15",          src: "/images/gallery/photo-15.jpg" },
  { type: "photo", label: "Class 12 board prep – Vision Coaching 16",          src: "/images/gallery/photo-16.jpg" },
  { type: "photo", label: "Science batch – Vision Coaching Tulsipur 17",       src: "/images/gallery/photo-17.jpg" },
  { type: "photo", label: "Science batch – Vision Coaching Tulsipur 18",       src: "/images/gallery/photo-18.jpg" },
  { type: "photo", label: "Vision Coaching – Purani Bazar Tulsipur 19",        src: "/images/gallery/photo-19.jpg" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 1",    src: "/images/gallery/video-01.mp4" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 2",    src: "/images/gallery/video-02.mp4" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 3",    src: "/images/gallery/video-03.mp4" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 4",    src: "/images/gallery/video-04.mp4" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 5",    src: "/images/gallery/video-05.mp4" },
  { type: "video", label: "Classroom session – Vision Coaching Tulsipur 6",    src: "/images/gallery/video-06.mp4" },
];

/* ── Lightbox ────────────────────────────────────────────────────── */
function Lightbox({ item, onClose, onPrev, onNext }: {
  item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-gold/20 bg-[#050D1F]"
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={e => e.stopPropagation()}>

        <div className="aspect-video relative bg-black flex items-center justify-center">
          {item.type === "photo" ? (
            <Image
              src={item.src} alt={item.label} fill
              className="object-contain"
              sizes="(max-width:768px) 100vw, 768px"
              unoptimized={item.src.startsWith("https")}
            />
          ) : (
            /* Video loads ONLY when lightbox opens; preload="none" */
            <LazyVideo src={item.src} label={item.label} playing />
          )}

          <button onClick={onPrev} aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-black/80 transition-all">‹</button>
          <button onClick={onNext} aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-black/80 transition-all">›</button>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-white/8">
          <span className="text-white font-medium text-sm">{item.label}</span>
          <span className={`badge-xs ${item.type === "video" ? "bg-red-500 text-white" : "bg-primary text-gold border-gold/30"}`}>
            {item.type.toUpperCase()}
          </span>
        </div>
      </motion.div>

      <button onClick={onClose} aria-label="Close"
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-lg transition-all">×</button>
    </motion.div>
  );
}

/* ── Gallery card ────────────────────────────────────────────────── */
function GalleryCard({ item, featured = false, onClick }: {
  item: GalleryItem; featured?: boolean; onClick: () => void;
}) {
  const isVideo = item.type === "video";

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group w-full transition-all duration-300 aspect-video ${featured ? "" : "opacity-60 scale-95"}`}
      style={{ border: "1px solid rgba(255,255,255,0.10)" }}
    >
      {isVideo ? (
        /* LazyVideo: shows WebP thumbnail + play button; no preload until lightbox */
        <LazyVideo
          src={item.src}
          label={item.label}
          featured={featured}
          onPlayRequest={onClick}
          className="absolute inset-0"
        />
      ) : (
        <>
          <Image
            src={item.src} alt={item.label} fill
            unoptimized={item.src.startsWith("https")}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-200" />
          {featured && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
            </div>
          )}
        </>
      )}

      {/* Label bar */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ background: "linear-gradient(transparent,rgba(0,0,0,0.80))" }}>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-white/90 text-sm font-semibold leading-none">{item.label}</span>
          <span className={`badge-xs ${isVideo ? "bg-red-500 text-white" : "bg-primary/80 text-gold border-gold/30"}`}>
            {isVideo ? "VIDEO" : "PHOTO"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Gallery Section ─────────────────────────────────────────────── */
export default function Gallery() {
  const { t } = useLanguage();
  const [filter,   setFilter]   = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [allItems, setAllItems] = useState<GalleryItem[]>(STATIC_ITEMS);
  const [fsLoaded, setFsLoaded] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);
  useScrollReveal(revealRef as React.RefObject<HTMLElement>, { stagger: 0.07 });

  const loadFirebase = useCallback(async () => {
    try {
      const fsItems: FSItem[] = await fetchGallery();
      if (fsItems.length > 0)
        setAllItems(fsItems.map(i => ({ type: i.type, label: i.label, src: i.url })));
    } catch { /* fall back to static */ }
    setFsLoaded(true);
  }, []);

  useEffect(() => { loadFirebase(); }, [loadFirebase]);

  const items = allItems.filter(item =>
    filter === 0 ? true : filter === 1 ? item.type === "photo" : item.type === "video"
  );
  const n = items.length || 1;

  const { index, dir, next, prev, goTo, onDragEnd, reset, sectionRef } =
    useCarousel(n, lightbox ? 0 : 4000);

  const handleFilter = (i: number) => { setFilter(i); reset(); };

  const prevItem = items[(index - 1 + n) % n];
  const currItem = items[index] ?? items[0];
  const nextItem = items[(index + 1) % n];

  return (
    <div className="section-pad" style={{ background: "#F8F9FF" }}
      ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div className="layout-container section-inner" ref={revealRef}>
        <SectionHeading title={t.gallery.title} subtitle={t.gallery.subtitle} light={false} />

        {/* Filter tabs */}
        <div className="flex justify-center gsap-reveal flex-wrap" style={{ gap: "var(--igap-sm)" }}>
          {t.gallery.filters.map((f: string, i: number) => (
            <button key={f} onClick={() => handleFilter(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold leading-none transition-all duration-200 ${
                filter === i
                  ? "bg-gold text-primary shadow-lg shadow-gold/30"
                  : "border border-primary/25 text-primary/60 hover:border-primary/60 hover:text-primary bg-transparent"
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Skeleton while Firebase loads */}
        {!fsLoaded && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 gsap-reveal">
            {[0, 1, 2].map(i => (
              <div key={i} className="aspect-video rounded-2xl animate-pulse"
                style={{ background: "rgba(10,31,92,0.1)" }} />
            ))}
          </div>
        )}

        {/* Carousel — tablet+ */}
        {fsLoaded && (
          <div className="hidden md:block gsap-reveal">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={`${filter}-${index}`} custom={dir}
                initial={{ opacity: 0, x: dir * 50 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }} transition={{ duration: 0.38, ease: "easeOut" }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                <GalleryCard item={prevItem} onClick={prev} />
                <GalleryCard item={currItem} featured onClick={() => setLightbox(true)} />
                <GalleryCard item={nextItem} onClick={next} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Carousel — mobile */}
        {fsLoaded && (
          <div className="md:hidden gsap-reveal">
            <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12}
              onDragEnd={onDragEnd} className="cursor-grab active:cursor-grabbing overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div key={`${filter}-${index}`} custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.38, ease: "easeOut" }}>
                  <GalleryCard item={currItem} featured onClick={() => setLightbox(true)} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {fsLoaded && (
          <CarouselNav total={n} index={index} onPrev={prev} onNext={next} onGoTo={goTo} light />
        )}
        {fsLoaded && (
          <p className="text-center text-primary/30 text-xs">
            {index + 1} / {n} · Tap centre card to open · ← → keys or swipe to navigate
          </p>
        )}
      </div>

      <AnimatePresence>
        {lightbox && currItem && (
          <Lightbox
            item={currItem}
            onClose={() => setLightbox(false)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

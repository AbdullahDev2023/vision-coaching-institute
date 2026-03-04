"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type Review = { name: string; text: string; rating: number; class: string };

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="relative rounded-2xl h-full flex flex-col"
      style={{
        padding: "1.5rem 1.25rem",
        background: "linear-gradient(160deg, #0D1B4B 0%, #091540 100%)",
        border: "1px solid rgba(212,160,23,0.15)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}>
      {/* Top gold accent */}
      <div className="absolute top-0 left-8 w-12 h-[2px] rounded-full bg-gold/50" />

      {/* Stars — proper breathing room from card top */}
      <div className="flex gap-1.5 mb-5 mt-4">
        {Array.from({ length: r.rating }).map((_, i) => (
          <svg key={i} className="w-[18px] h-[18px] fill-gold flex-shrink-0" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote — slightly larger, looser line-height for readability */}
      <p className="text-white/78 leading-loose flex-1 italic"
        style={{ fontSize: "0.9rem" }}>
        &#8220;{r.text}&#8221;
      </p>

      {/* Author — separated by a subtle divider */}
      <div className="mt-7 pt-5 flex items-center gap-3.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-11 h-11 rounded-full border border-gold/35 flex items-center justify-center text-gold font-bold text-base flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)" }}>
          {r.name[0]}
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-tight">{r.name}</div>
          <div className="text-gold/65 text-xs mt-1">{r.class}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const reviews = t.testimonials.reviews as Review[];
  const n = reviews.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.12 });

  const next = useCallback(() => { setDir(1);  setIndex(i => (i + 1) % n); }, [n]);
  const prev = useCallback(() => { setDir(-1); setIndex(i => (i - 1 + n) % n); }, [n]);
  const goTo = (i: number) => { setDir(i > index ? 1 : -1); setIndex(i); };

  // Auto-scroll
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  // Drag-to-swipe
  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  // 3 visible indices (wrap) for desktop
  const visible = [0, 1, 2].map(o => reviews[(index + o) % n]);

  return (
    <div className="section-pad bg-primary" ref={sectionRef}>
      <div className="layout-container">
        <SectionHeading title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

        <div className="relative gsap-reveal mx-5 sm:mx-8 lg:mx-12">
          {/* Prev arrow */}
          <button onClick={prev} aria-label="Previous"
            className="absolute -left-5 sm:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold/25 bg-bg-card text-gold text-xl flex items-center justify-center hover:border-gold/60 hover:bg-bg-card/80 transition-all duration-200">
            ‹
          </button>

          {/* Drag wrapper */}
          <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1}
            onDragEnd={onDragEnd} className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={index} custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 px-6 sm:px-10 lg:px-12">
                {visible.map((r, o) => (
                  <div key={o} className={o > 0 ? "hidden lg:block" : ""}>
                    <ReviewCard r={r} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Next arrow */}
          <button onClick={next} aria-label="Next"
            className="absolute -right-5 sm:-right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold/25 bg-bg-card text-gold text-xl flex items-center justify-center hover:border-gold/60 hover:bg-bg-card/80 transition-all duration-200">
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2.5 mt-9">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

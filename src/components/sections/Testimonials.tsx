"use client";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useCarousel } from "@/lib/useCarousel";
import SectionHeading from "@/components/ui/SectionHeading";

type Review = { name: string; text: string; rating: number; class: string };

function ReviewCard({ r, featured = false }: { r: Review; featured?: boolean }) {
  return (
    <div className={`relative rounded-2xl h-full flex flex-col transition-all duration-300 ${featured ? "scale-[1.02]" : ""}`}
      style={{
        padding: "var(--igap) var(--igap-sm)",
        background: featured ? "linear-gradient(160deg,#1A3A8F 0%,#0D1B4B 100%)" : "linear-gradient(160deg,#0D1B4B 0%,#091540 100%)",
        border: featured ? "1px solid rgba(212,160,23,0.35)" : "1px solid rgba(212,160,23,0.13)",
        boxShadow: featured ? "0 8px 40px rgba(212,160,23,0.12)" : "0 4px 24px rgba(0,0,0,0.25)",
      }}>
      <div className="absolute top-0 left-8 w-12 h-[2px] rounded-full bg-gold/50" />
      <div className="flex gap-1.5" style={{ margin: "var(--igap-sm) 0" }}>
        {Array.from({ length: r.rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-gold flex-shrink-0" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-white/75 leading-loose flex-1 italic text-sm">&#8220;{r.text}&#8221;</p>
      <div className="flex items-center gap-4" style={{ marginTop: "var(--igap)", paddingTop: "var(--igap-sm)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-10 h-10 rounded-full border border-gold/35 flex items-center justify-center text-gold font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#0A1F5C,#1A3A8F)" }}>
          {r.name[0]}
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-tight">{r.name}</div>
          <div className="text-gold/65 text-xs mt-0.5">{r.class}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared nav bar: arrows + dots ── */
export function CarouselNav({
  total, index, onPrev, onNext, onGoTo, light = false,
}: {
  total: number; index: number;
  onPrev: () => void; onNext: () => void; onGoTo: (i: number) => void;
  light?: boolean;
}) {
  const btnBase = `w-10 h-10 rounded-full border flex items-center justify-center text-xl transition-all duration-200 select-none`;
  const btnStyle = light
    ? "border-primary/25 bg-white text-primary hover:border-primary/60 hover:bg-primary/5"
    : "border-gold/25 bg-bg-card text-gold hover:border-gold/60";
  const dotActive = light ? "bg-primary" : "bg-gold";
  const dotIdle   = light ? "bg-primary/20 hover:bg-primary/40" : "bg-white/20 hover:bg-white/40";

  return (
    <div className="flex items-center justify-center gap-4">
      <button onClick={onPrev} aria-label="Previous" className={`${btnBase} ${btnStyle}`}>‹</button>
      <div className="flex gap-2 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onGoTo(i)} aria-label={`Item ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 origin-left ${i === index ? dotActive : dotIdle}`}
            style={{ transform: i === index ? "scaleX(4)" : "scaleX(1)" }} />
        ))}
      </div>
      <button onClick={onNext} aria-label="Next" className={`${btnBase} ${btnStyle}`}>›</button>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();
  const reviews = t.testimonials.reviews as Review[];
  const n = reviews.length;
  const { index, dir, next, prev, goTo, onDragEnd, sectionRef } = useCarousel(n, 5500);
  const revealRef = useRef<HTMLDivElement>(null);
  useScrollReveal(revealRef as React.RefObject<HTMLElement>, { stagger: 0.12 });

  const desktopCards = [
    reviews[(index - 1 + n) % n],
    reviews[index],
    reviews[(index + 1) % n],
  ];

  return (
    <div className="section-pad bg-primary" ref={sectionRef as React.RefObject<HTMLDivElement>}>
      <div className="layout-container section-inner" ref={revealRef}>
        <SectionHeading title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

        {/* Tablet+: 2 or 3-card */}
        <div className="hidden md:block gsap-reveal">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={index} custom={dir}
              initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
              {desktopCards.map((r, o) => <ReviewCard key={o} r={r} featured={o === 1} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: single swipeable card */}
        <div className="md:hidden gsap-reveal">
          <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1}
            onDragEnd={onDragEnd} className="cursor-grab active:cursor-grabbing select-none overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={index} custom={dir}
                initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <ReviewCard r={reviews[index]} featured />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <CarouselNav total={n} index={index} onPrev={prev} onNext={next} onGoTo={goTo} />

        <p className="text-center text-white/65 text-xs font-normal">
          ⭐ Rated 5.0 by {n}+ students &amp; parents from Tulsipur
        </p>
      </div>
    </div>
  );
}

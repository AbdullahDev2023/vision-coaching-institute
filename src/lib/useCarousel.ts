"use client";
import { useState, useCallback, useEffect, useRef } from "react";

export function useCarousel(total: number, autoInterval = 5000) {
  const [index, setIndex] = useState(0);
  const [dir,   setDir]   = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setDir(1);
    setIndex(i => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex(i => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  const onDragEnd = useCallback((_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -40) next();
    else if (info.offset.x > 40) prev();
  }, [next, prev]);

  const reset = useCallback(() => { setDir(1); setIndex(0); }, []);

  // Auto-advance
  useEffect(() => {
    if (autoInterval <= 0) return;
    const id = setInterval(next, autoInterval);
    return () => clearInterval(id);
  }, [next, autoInterval]);

  // Arrow-key nav — only fires when this section is in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let inView = false;
    const observer = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.3 }
    );
    observer.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => { observer.disconnect(); window.removeEventListener("keydown", onKey); };
  }, [next, prev]);

  return { index, dir, next, prev, goTo, onDragEnd, reset, sectionRef };
}

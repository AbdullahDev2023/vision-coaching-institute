"use client";
import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  opts: ScrollRevealOptions = {}
) {
  const {
    y = 40, x = 0, duration = 0.7,
    stagger = 0.12, delay = 0,
    ease = "power2.out",
    start = "top 92%",
  } = opts;

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const children = gsap.utils.toArray<HTMLElement>(".gsap-reveal", ref.current!);
      const targets  = children.length > 0 ? children : [ref.current!];
      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1, y: 0, x: 0, duration, stagger, delay, ease,
          scrollTrigger: { trigger: ref.current, start, toggleActions: "play none none none" },
        }
      );
    }, ref);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

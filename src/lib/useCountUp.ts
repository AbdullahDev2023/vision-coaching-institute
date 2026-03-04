"use client";
import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(
  target: number,
  suffix: string = "",
  triggerRef: RefObject<HTMLElement | null>,
  duration: number = 2
): RefObject<HTMLSpanElement | null> {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current || !triggerRef.current) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (numRef.current)
            numRef.current.textContent = Math.round(obj.val) + suffix;
        },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return numRef;
}

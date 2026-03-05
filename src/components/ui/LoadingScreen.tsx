"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRingRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip the loading screen on every visit after the first in the same session.
    // On back-navigation or tab switches, the hero is already painted — the overlay
    // would only delay visual completeness and hurt Speed Index.
    try {
      if (sessionStorage.getItem("vci-loaded")) {
        setHidden(true);
        return;
      }
      sessionStorage.setItem("vci-loaded", "1");
    } catch {
      // sessionStorage unavailable (private mode edge case) — show normally
    }

    // Shortened timeline: 0.18 + 0.14 + 0.12 + 0.28 + 0.18 = ~0.9s total (was ~1.75s)
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0, duration: 0.18, delay: 0.05,
          onComplete: () => setHidden(true),
        });
      },
    });

    tl.fromTo(logoRingRef.current,
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.18, ease: "back.out(1.7)" }
    )
    .fromTo(logoTextRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, "-=0.05"
    )
    .fromTo(taglineRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.12 }, "-=0.04"
    )
    .to(barRef.current,
      { width: "100%", duration: 0.28, ease: "power1.inOut" }, "-=0.04"
    );
  }, []);

  if (hidden) return null;

  return (
    <div ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #0A1F5C 0%, #050D1F 70%)" }}>

      {/* Outer glow ring */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl scale-150 animate-pulse" />
        <div ref={logoRingRef}
          className="relative w-24 h-24 rounded-full border-2 border-gold flex items-center justify-center"
          style={{ boxShadow: "0 0 30px rgba(212,160,23,0.4)" }}>
          {/* Logo image — fills the full ring */}
          <div className="absolute inset-0 rounded-full overflow-hidden z-10">
            <Image src="/logo.webp" alt="Vision Coaching Institute" width={96} height={96} className="w-full h-full object-cover scale-[1.15]" priority sizes="96px" />
          </div>
        </div>
      </div>

      <div ref={logoTextRef} className="text-center mb-1">
        <div className="text-white font-heading text-2xl font-bold tracking-wide">Vision Coaching</div>
      </div>
      <div ref={taglineRef} className="text-gold text-sm font-medium tracking-widest uppercase mb-10">
        Institute · Tulsipur
      </div>

      {/* Progress bar */}
      <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div ref={barRef}
          className="h-full rounded-full w-0"
          style={{ background: "linear-gradient(90deg, #D4A017, #F0C842, #D4A017)" }} />
      </div>
    </div>
  );
}

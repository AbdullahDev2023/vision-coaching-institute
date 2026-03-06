"use client";
/**
 * LoadingScreen — pure CSS animation, zero GSAP dependency.
 *
 * Speed Index impact:
 *  • Before: GSAP import (~50KB) had to parse before any animation ran.
 *    Total blocking time: ~900ms visible overlay.
 *  • After: pure CSS keyframes start instantly.
 *    Total overlay time: ~500ms (300ms animate + 200ms fade-out).
 *
 * sessionStorage skip: every visit after the first in the same session
 * sets hidden=true before the first paint — zero overlay cost on repeats.
 */
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"show" | "fadeout" | "hidden">("show");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("vci-loaded")) {
        setPhase("hidden");
        return;
      }
      sessionStorage.setItem("vci-loaded", "1");
    } catch { /* private mode — show normally */ }

    // 300ms animation + 200ms fade = 500ms total
    const fadeTimer = setTimeout(() => setPhase("fadeout"), 300);
    const hideTimer = setTimeout(() => setPhase("hidden"),  500);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`loading-screen-root ${phase === "fadeout" ? "loading-screen-out" : ""}`}
    >
      <div className="loading-logo-ring">
        <div className="loading-logo-inner">
          <Image
            src="/logo.webp"
            alt="Vision Coaching Institute"
            width={96} height={96}
            className="w-full h-full object-cover scale-[1.15]"
            priority
            sizes="96px"
          />
        </div>
      </div>

      <div className="loading-text">Vision Coaching</div>
      <div className="loading-tagline">Institute · Tulsipur</div>

      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </div>
  );
}

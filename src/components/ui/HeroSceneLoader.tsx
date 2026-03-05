"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/lib/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  ),
});

/** Static gradient shown on mobile instead of the Three.js canvas */
function HeroScenePlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div style={{
        width: "clamp(120px,22vw,200px)",
        height: "clamp(120px,22vw,200px)",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 38%, rgba(212,160,23,0.22) 0%, rgba(26,58,143,0.55) 60%, transparent 100%)",
        border: "1.5px solid rgba(212,160,23,0.22)",
        boxShadow: "0 0 60px rgba(212,160,23,0.10)",
      }} />
    </div>
  );
}

export default function HeroSceneLoader() {
  const [show, setShow]     = useState(false);
  const [is3D, setIs3D]     = useState(false);

  useEffect(() => {
    // Skip Three.js canvas on:
    //   • viewports narrower than lg breakpoint (< 1024px) — layout hides the right col anyway
    //   • low-end hardware (2 or fewer CPU cores reported)
    //   • devices that have flagged "reducedData" or slow connections
    const wide     = window.innerWidth >= 1024;
    const fast     = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
    const conn     = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData ?? false;
    const slow     = conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g";

    const load3D = wide && fast >= 3 && !saveData && !slow;
    setIs3D(load3D);
    setShow(true);
  }, []);

  if (!show) return null;

  if (!is3D) return <HeroScenePlaceholder />;

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none" }}>
      <HeroScene />
    </div>
  );
}

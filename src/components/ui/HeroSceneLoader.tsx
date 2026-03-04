"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/lib/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  ),
});

export default function HeroSceneLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only mount canvas on desktop — do it on next tick so SSR/hydration is safe
    if (window.innerWidth >= 768) setShow(true);
  }, []);

  if (!show) return null;
  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <HeroScene />
    </div>
  );
}

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

export default function HeroSceneLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Mount on next tick — ensures SSR/hydration is safe on ALL screen sizes
    setShow(true);
  }, []);

  if (!show) return null;
  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none" }}>
      <HeroScene />
    </div>
  );
}

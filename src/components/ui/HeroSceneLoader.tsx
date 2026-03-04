"use client";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/lib/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  ),
});

export default HeroScene;

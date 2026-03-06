"use client";
/**
 * HeroShell.tsx
 *
 * Renders HeroStatic on the server (SSR) for instant LCP paint,
 * then swaps in the full interactive Hero once the client JS loads.
 *
 * The swap uses `suppressHydrationWarning` so React doesn't warn
 * about the intentional server/client mismatch.
 */
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroStatic from "@/components/sections/HeroStatic";

// Full Hero loads only on the client — never blocks SSR.
// loading: () => <HeroStatic /> keeps the SSR-painted hero VISIBLE while the
// Hero JS chunk downloads, eliminating the blank frame between swap and hydration.
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => <HeroStatic />,
});

export default function HeroShell() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    // suppressHydrationWarning: server renders HeroStatic, client swaps to Hero
    <div suppressHydrationWarning>
      {hydrated ? <Hero /> : <HeroStatic />}
    </div>
  );
}

"use client";
import dynamic from "next/dynamic";

// ssr:false wrappers — required because page.tsx is a Server Component
const WhatsAppFloat = dynamic(() => import("@/components/ui/WhatsAppFloat"), { ssr: false });
const BackToTop     = dynamic(() => import("@/components/ui/BackToTop"),     { ssr: false });
const BottomTabNav  = dynamic(() => import("@/components/ui/BottomTabNav"),  { ssr: false });

export default function FloatingUIWrapper() {
  return (
    <>
      <WhatsAppFloat />
      <BackToTop />
      <BottomTabNav />
    </>
  );
}

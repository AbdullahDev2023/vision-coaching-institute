"use client";
import dynamic from "next/dynamic";

// ssr:false must live in a Client Component — cannot be used in Server Components
const LoadingScreen = dynamic(
  () => import("@/components/ui/LoadingScreen"),
  { ssr: false }
);

export default function LoadingScreenWrapper() {
  return <LoadingScreen />;
}

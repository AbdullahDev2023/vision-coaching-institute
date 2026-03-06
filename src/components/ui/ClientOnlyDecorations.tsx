"use client";
/**
 * ClientOnlyDecorations
 * Wrapper Client Component that lazily loads purely decorative UI elements
 * with ssr:false. This is required because next/dynamic with ssr:false is
 * only allowed inside Client Components, not Server Components like layout.tsx.
 */
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const ScrollProgressBar = dynamic(
  () => import("@/components/ui/ScrollProgressBar"),
  { ssr: false }
);

export default function ClientOnlyDecorations() {
  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />
    </>
  );
}

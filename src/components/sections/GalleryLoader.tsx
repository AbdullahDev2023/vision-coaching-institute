"use client";
import dynamic from "next/dynamic";

// Dynamic import lives in a Client Component — this is the correct pattern
// for ssr:false with next/dynamic when the parent is a Server Component.
const Gallery = dynamic(() => import("@/components/sections/Gallery"), {
  ssr: false,
  loading: () => (
    <div className="section-pad" style={{ background: "#F8F9FF" }}>
      <div className="layout-container">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5" style={{ gap: "20px" }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="aspect-video rounded-2xl animate-pulse"
              style={{ background: "rgba(10,31,92,0.08)" }} />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function GalleryLoader() {
  return <Gallery />;
}

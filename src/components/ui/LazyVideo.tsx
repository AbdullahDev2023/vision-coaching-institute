"use client";
/**
 * LazyVideo — zero-payload thumbnail-first video component.
 *
 * Lifecycle:
 *  1. Render CSS placeholder (no network requests)
 *  2. IntersectionObserver fires → load hidden <video preload="metadata">
 *  3. On `loadeddata` → capture frame via canvas → toBlob("image/webp")
 *  4. Show WebP poster image; detach the metadata-loader video
 *  5. User clicks ▶ → mount real <video preload="none" autoPlay>
 */
import { useEffect, useRef, useState, useCallback } from "react";

interface LazyVideoProps {
  src: string;
  label: string;
  /** Called when the user hits play — parent can open lightbox instead */
  onPlayRequest?: () => void;
  /** If true, renders the actual playing video (for use inside an open lightbox) */
  playing?: boolean;
  className?: string;
  featured?: boolean;
}

export default function LazyVideo({
  src,
  label,
  onPlayRequest,
  playing = false,
  className = "",
  featured = false,
}: LazyVideoProps) {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const [poster, setPoster]   = useState<string>("");
  const [thumbDone, setThumbDone] = useState(false);

  /* ── Lazy WebP thumbnail generation ────────────────────────────── */
  const generateThumb = useCallback(() => {
    const video = document.createElement("video");
    video.preload  = "metadata";
    video.muted    = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    video.addEventListener("loadeddata", () => {
      // seek to 0.5 s (or first frame if shorter)
      video.currentTime = Math.min(0.5, video.duration || 0);
    }, { once: true });

    video.addEventListener("seeked", () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width  = 640;
        canvas.height = 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, 640, 360);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setPoster(URL.createObjectURL(blob));
                setThumbDone(true);
              }
            },
            "image/webp",
            0.80,
          );
        }
      } catch {
        // cross-origin or codec failure — fall back to CSS placeholder
        setThumbDone(true);
      }
      // Free the metadata-loader video
      video.src = "";
      video.load();
    }, { once: true });

    video.src = src;
    video.load();
  }, [src]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          generateThumb();
        }
      },
      { rootMargin: "200px" }, // start loading thumb slightly before viewport
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [generateThumb]);

  /* ── Cleanup object URL ─────────────────────────────────────────── */
  useEffect(() => {
    return () => {
      if (poster.startsWith("blob:")) URL.revokeObjectURL(poster);
    };
  }, [poster]);

  /* ── Playing state — real video, preload="none" ─────────────────── */
  if (playing) {
    return (
      <video
        src={src}
        controls
        autoPlay
        preload="none"
        playsInline
        className={`w-full h-full object-contain ${className}`}
        aria-label={label}
      />
    );
  }

  /* ── Thumbnail / placeholder state ─────────────────────────────── */
  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full ${className}`}
      style={{ background: "#050D1F" }}
    >
      {/* WebP poster once generated */}
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Placeholder shimmer while thumb loads */}
      {!thumbDone && (
        <div className="absolute inset-0 animate-pulse" style={{ background: "linear-gradient(135deg,#0A1F5C,#050D1F)" }} />
      )}

      {/* Play button — only shown on featured card or always */}
      {(featured || !poster) && (
        <button
          onClick={onPlayRequest}
          aria-label={`Play video: ${label}`}
          className="absolute inset-0 flex items-center justify-center group/play"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover/play:scale-110"
            style={{
              background:  "rgba(212,160,23,0.92)",
              boxShadow:   "0 0 28px rgba(212,160,23,0.5)",
            }}
          >
            {/* Triangle */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-[#0A1F5C] ml-0.5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}

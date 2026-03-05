"use client";

import { useState } from "react";
import { getStatusShareData, shareStatusFallback } from "@/lib/shareUtils";

type Variant = "hero" | "banner";

interface ShareButtonProps {
  variant?: Variant;
  className?: string;
}

const LABELS = {
  idle:    "Share on WhatsApp 📲",
  shared:  "Shared! ✅",
  copied:  "Link Copied! ✅",
};

export default function ShareButton({ variant = "banner", className = "" }: ShareButtonProps) {
  const [state, setState] = useState<"idle" | "shared" | "copied">("idle");

  async function handleShare() {
    const data = getStatusShareData();

    // Web Share API — opens native share sheet on Android/iOS
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        setState("shared");
        setTimeout(() => setState("idle"), 3000);
        return;
      } catch {
        // user cancelled — do nothing
        return;
      }
    }

    // Desktop fallback: open WhatsApp web with curiosity-hook message
    const fallbackUrl = shareStatusFallback();
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    setState("shared");
    setTimeout(() => setState("idle"), 3000);
  }

  const label = LABELS[state];

  /* ── HERO variant — slim, ghost-style, sits below main CTA ── */
  if (variant === "hero") {
    return (
      <button
        onClick={handleShare}
        aria-label="Share Vision Coaching Institute on WhatsApp"
        className={`inline-flex items-center gap-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-200 active:scale-95 flex-shrink-0 min-w-max ${className}`}
        style={{
          padding: "0.625rem 1.375rem",
          background:  state !== "idle" ? "rgba(37,211,102,0.18)" : "rgba(37,211,102,0.10)",
          border:      `1.5px solid ${state !== "idle" ? "rgba(37,211,102,0.55)" : "rgba(37,211,102,0.32)"}`,
          color:       "#25D366",
          cursor:      "pointer",
        }}
      >
        <WhatsAppIcon />
        <span>{label}</span>
      </button>
    );
  }

  /* ── BANNER variant — prominent, full-width-on-mobile, sits beside/below CTA ── */
  return (
    <button
      onClick={handleShare}
      aria-label="Share Vision Coaching Institute on WhatsApp"
      className={`inline-flex items-center justify-center gap-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-95 hover:brightness-110 ${className}`}
      style={{
        padding: "0.875rem 1.875rem",
        background: state !== "idle"
          ? "rgba(37,211,102,0.22)"
          : "rgba(37,211,102,0.14)",
        border:  `1.5px solid ${state !== "idle" ? "rgba(37,211,102,0.6)" : "rgba(37,211,102,0.35)"}`,
        color:   "#25D366",
        cursor:  "pointer",
        boxShadow: state !== "idle" ? "0 0 18px rgba(37,211,102,0.18)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <WhatsAppIcon size={18} />
      <span>{label}</span>
      {state === "idle" && (
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: "rgba(37,211,102,0.18)", color: "#4ade80" }}
        >
          Status
        </span>
      )}
    </button>
  );
}

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="currentColor"
      aria-hidden="true" className="flex-shrink-0"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

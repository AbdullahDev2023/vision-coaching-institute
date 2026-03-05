"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, light = true, centered = true }: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : ""} gsap-reveal`}>
      {/* Gold ornament */}
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        style={{ marginBottom: "var(--igap-sm)" }}>
        <div className="h-px w-10 sm:w-16 bg-gold/50" />
        <div className="w-2 h-2 rounded-full bg-gold" />
        <div className="h-px w-10 sm:w-16 bg-gold/50" />
      </div>

      {/* Title */}
      <h2 className={`font-heading font-bold leading-tight tracking-tight text-fluid-xl sm:text-4xl lg:text-5xl xl:text-6xl ${
        light ? "text-white" : "text-primary"}`}
        style={{ textWrap: "balance", marginBottom: subtitle ? "var(--igap-sm)" : undefined }}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-sm sm:text-base lg:text-lg leading-relaxed font-normal break-words max-w-xs sm:max-w-2xl ${centered ? "mx-auto" : ""} ${
          light ? "text-white/65" : "text-primary/60"}`}
          style={{ textWrap: "pretty" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

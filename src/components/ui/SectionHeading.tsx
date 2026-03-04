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
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight ${
        light ? "text-white" : "text-primary"}`}
        style={{ marginBottom: subtitle ? "var(--igap-sm)" : undefined }}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed font-normal break-words max-w-lg sm:max-w-2xl ${centered ? "mx-auto" : ""} ${
          light ? "text-white/65" : "text-primary/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

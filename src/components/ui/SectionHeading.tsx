"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, light = true, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : ""} gsap-reveal`}>
      {/* Gold ornament */}
      <div className={`flex items-center gap-3 mb-6 ${centered ? "justify-center" : ""}`}>
        <div className="h-px w-12 bg-gold/50" />
        <div className="w-2 h-2 rounded-full bg-gold" />
        <div className="h-px w-12 bg-gold/50" />
      </div>

      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight ${
        light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed font-normal max-w-2xl ${centered ? "mx-auto" : ""} ${
          light ? "text-white/65" : "text-primary/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const isHindi = lang === "hi";

  return (
    <button
      onClick={toggleLang}
      title="Toggle Language / भाषा बदलें"
      aria-label={isHindi ? "Switch to English" : "हिंदी में बदलें"}
      className="relative flex items-center rounded-full overflow-hidden flex-shrink-0"
      style={{
        padding: "3px",
        minWidth: "102px",
        background: "rgba(255,255,255,0.10)",
        border: "1.5px solid rgba(255,255,255,0.22)",
      }}>

      {/* Sliding gold active pill */}
      <motion.div
        className="absolute top-[3px] bottom-[3px] rounded-full"
        style={{
          width: "calc(50% - 3px)",
          background: "linear-gradient(135deg, #D4A017, #F0C842)",
          boxShadow: "0 2px 10px rgba(212,160,23,0.45)",
          zIndex: 0,
        }}
        initial={false}
        animate={{ left: isHindi ? "calc(50% + 3px)" : "3px" }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />

      {/* EN label */}
      <span
        className="relative z-10 flex-1 text-center font-bold transition-colors duration-200 select-none"
        style={{
          fontSize: "0.75rem",       /* 12px */
          lineHeight: 1,
          padding: "7px 10px",       /* 7px top/bottom — 10px left/right */
          color: !isHindi ? "#0A1F5C" : "rgba(255,255,255,0.55)",
        }}>
        EN
      </span>

      {/* हिं label */}
      <span
        className="relative z-10 flex-1 text-center font-bold transition-colors duration-200 select-none"
        style={{
          fontSize: "0.75rem",
          lineHeight: 1,
          padding: "7px 10px",
          color: isHindi ? "#0A1F5C" : "rgba(255,255,255,0.55)",
        }}>
        हिं
      </span>
    </button>
  );
}

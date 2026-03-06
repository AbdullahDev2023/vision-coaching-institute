"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/lib/i18n/en.json";

type Lang = "en" | "hi";
type Translations = typeof en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  // Translations state — starts as English, lazily replaced with Hindi when needed.
  // hi.json is NOT in the initial JS bundle; it's fetched only on demand.
  const [t, setT] = useState<Translations>(en);

  useEffect(() => {
    const saved = localStorage.getItem("vci-lang") as Lang;
    if (saved === "hi") {
      // User previously chose Hindi — load chunk asynchronously
      import("@/lib/i18n/hi.json").then((m) => {
        setT(m.default as unknown as Translations);
        setLang("hi");
      });
    }
  }, []);

  const toggleLang = async () => {
    const next: Lang = lang === "en" ? "hi" : "en";
    if (next === "hi") {
      const hiModule = await import("@/lib/i18n/hi.json");
      setT(hiModule.default as unknown as Translations);
    } else {
      setT(en);
    }
    setLang(next);
    localStorage.setItem("vci-lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {/* suppressHydrationWarning: className may change post-hydration when
          localStorage restores "hi" — intentional, not a bug */}
      <div suppressHydrationWarning className={lang === "hi" ? "font-hindi" : "font-body"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/lib/i18n/en.json";
import hi from "@/lib/i18n/hi.json";

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

  useEffect(() => {
    const saved = localStorage.getItem("vci-lang") as Lang;
    if (saved === "hi" || saved === "en") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "hi" : "en";
    setLang(next);
    localStorage.setItem("vci-lang", next);
  };

  const t: Translations = lang === "hi" ? (hi as unknown as Translations) : en;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      <div className={lang === "hi" ? "font-hindi" : "font-body"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

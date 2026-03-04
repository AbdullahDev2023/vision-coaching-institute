"use client";
import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";

/** Keeps <html lang="..."> in sync with the active language */
export default function HtmlLangSync() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);
  return null;
}

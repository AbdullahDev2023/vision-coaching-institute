"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * MobileBookingBar
 * ─────────────────
 * Sticky bottom bar visible only on screens < 1024px (lg).
 * Appears once the user scrolls past the hero section.
 * Contains a full-width WhatsApp CTA for maximum conversion.
 * Hides when the user is at the very bottom of the page (near footer).
 */
export default function MobileBookingBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show after scrolling 80% of viewport height
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      // Show after 80vh scroll, hide within 300px of bottom
      const nearBottom = scrolled + winH >= docH - 300;
      setVisible(scrolled > winH * 0.8 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${t.contact.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20FREE%20demo%20class%20at%20Vision%20Coaching%20Institute%20Tulsipur.`;

  return (
    <>
      {/* Invisible sentinel */}
      <div ref={sentinelRef} className="sr-only" aria-hidden />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pt-3 pb-safe"
            style={{
              background: "linear-gradient(180deg, rgba(5,13,31,0) 0%, rgba(5,13,31,0.95) 18%)",
              paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center text-base"
              style={{ borderRadius: "1rem", padding: "1rem 1.5rem" }}
            >
              {/* WhatsApp icon */}
              <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              🎓 Book FREE Demo Class
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

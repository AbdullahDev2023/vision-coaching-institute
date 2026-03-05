"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";

export default function MobileBookingBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      const nearBottom = scrolled + winH >= docH - 300;
      setVisible(scrolled > winH * 0.8 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = `https://wa.me/${t.contact.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20a%20FREE%20demo%20class%20at%20Vision%20Coaching%20Institute%20Tulsipur.`;

  return (
    <>
      <div ref={sentinelRef} className="sr-only" aria-hidden />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pt-3"
            style={{
              background: "linear-gradient(180deg, rgba(5,13,31,0) 0%, rgba(5,13,31,0.95) 18%)",
              paddingBottom: `calc(0.75rem + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book free demo class on WhatsApp"
              className="btn-whatsapp w-full justify-center text-base"
              style={{ borderRadius: "1rem", padding: "1rem 1.5rem" }}
            >
              <WhatsAppIcon />
              🎓 Book FREE Demo Class
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

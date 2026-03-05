"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, type Variants } from "framer-motion";
import siteConfig from "@/lib/site-config.json";

const SOCIAL_META = [
  {
    name: "Facebook",
    href: siteConfig.social.facebook,
    icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    name: "Instagram",
    href: siteConfig.social.instagram,
    icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    name: "YouTube",
    href: siteConfig.social.youtube,
    icon: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

/* Only render icons that have a real URL configured */
const SOCIAL_LINKS = SOCIAL_META.filter(s => s.href && s.href.startsWith("http"));

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tf = t as any;
  const navLinks = ["about", "features", "courses", "faculty", "results", "gallery", "testimonials", "contact"];

  return (
    <footer className="relative bg-[#030B17] border-t border-white/8 overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #D4A017 30%, #F0C842 50%, #D4A017 70%, transparent)" }} />

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/20 blur-[80px] pointer-events-none" />

      <div className="relative layout-container" style={{ paddingTop: "var(--igap)", paddingBottom: "var(--igap-sm)" }}>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-12" style={{ gap: "var(--igap)", marginBottom: "var(--igap)" }}>

          {/* Brand */}
          <motion.div variants={fadeUp} className="md:col-span-4">
            <div className="flex items-center gap-3" style={{ marginBottom: "var(--igap-sm)" }}>
              <div className="w-13 h-13 rounded-full overflow-hidden flex-shrink-0 border border-gold/25 shadow-lg shadow-gold/15">
                <Image src="/logo.png" alt="Vision Coaching Institute" width={104} height={104} className="w-full h-full object-cover scale-[1.15]" sizes="104px" />
              </div>
              <div>
                <div className="text-white font-heading font-bold text-lg leading-tight">Vision Coaching</div>
                <div className="text-gold text-xs font-medium tracking-widest uppercase">Institute · Tulsipur</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed font-normal" style={{ marginBottom: "var(--igap-sm)" }}>{tf.footer.tagline}</p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.href}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-primary hover:bg-gold hover:border-gold transition-all duration-200">
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <h4 className="text-gold font-bold text-[11px] uppercase tracking-widest" style={{ marginBottom: "var(--igap-sm)" }}>{tf.footer.quickLinks}</h4>
            <ul className="item-gap">
              {navLinks.map((k) => (
                <li key={k}>
                  <a href={`#${k}`}
                    className="flex items-center gap-2 text-white/55 hover:text-gold text-sm transition-colors group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-gold transition-all duration-200 overflow-hidden inline-block" />
                    <span className="capitalize">{tf.nav[k]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} className="md:col-span-5">
            <h4 className="text-gold font-bold text-[11px] uppercase tracking-widest" style={{ marginBottom: "var(--igap-sm)" }}>{tf.footer.contactUs}</h4>
            <div className="item-gap">
              {tf.contact.phones.map((p: string) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/55 hover:text-gold text-sm transition-colors group">
                  <span className="w-7 h-7 rounded-full border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 flex items-center justify-center text-xs transition-all flex-shrink-0">📞</span>
                  {p}
                </a>
              ))}
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">📍</span>
                <span className="leading-relaxed">{tf.contact.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-xs flex-shrink-0">🕐</span>
                <span>{tf.contact.hours}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Vision Coaching Institute, Tulsipur. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/25 text-xs">{tf.footer.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

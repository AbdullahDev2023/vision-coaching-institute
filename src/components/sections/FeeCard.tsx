"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/icons/WhatsAppIcon";
/* ── Tier colour tokens ── */
const TIER_META: Record<string, { ring: string; glow: string; bg: string; badge: string }> = {
  blue: {
    ring:  "#4488ff",
    glow:  "rgba(68,136,255,0.22)",
    bg:    "rgba(68,136,255,0.07)",
    badge: "rgba(68,136,255,0.15)",
  },
  gold: {
    ring:  "#D4A017",
    glow:  "rgba(212,160,23,0.28)",
    bg:    "rgba(212,160,23,0.08)",
    badge: "rgba(212,160,23,0.18)",
  },
  teal: {
    ring:  "#14B8A6",
    glow:  "rgba(20,184,166,0.22)",
    bg:    "rgba(20,184,166,0.07)",
    badge: "rgba(20,184,166,0.15)",
  },
  purple: {
    ring:  "#a78bfa",
    glow:  "rgba(167,139,250,0.25)",
    bg:    "rgba(167,139,250,0.07)",
    badge: "rgba(167,139,250,0.15)",
  },
};

type Tier = {
  label: string;
  classes: string;
  price: string;
  color: string;
  popular?: boolean;
  features: string[];
};

/* ── Single pricing card ── */
function TierCard({
  tier, selected, onSelect,
}: {
  tier: Tier; selected: boolean; onSelect: () => void;
}) {
  const m = TIER_META[tier.color] ?? TIER_META.blue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useLanguage();
  const fc = (t as any).feeCard;

  return (
    <motion.div
      onClick={onSelect}
      className="relative rounded-2xl p-7 sm:p-8 cursor-pointer overflow-hidden border transition-all duration-300 h-full"
      style={{
        background:   selected ? m.bg   : "rgba(13,27,75,0.7)",
        borderColor:  selected ? m.ring : "rgba(255,255,255,0.07)",
        boxShadow:    selected ? `0 0 0 2px ${m.ring}, 0 20px 60px ${m.glow}` : "none",
      }}
      whileHover={{ y: -4, borderColor: m.ring }}
      transition={{ duration: 0.2 }}>

      {/* Popular badge */}
      {tier.popular && (
        <span className="absolute -top-px left-1/2 -translate-x-1/2 badge-xs whitespace-nowrap z-20"
          style={{ background: "linear-gradient(135deg,#D4A017,#F0C842)", color: "#0A1F5C", fontWeight: 800, borderColor: "transparent", borderRadius: "0 0 8px 8px" }}>
          ★ {fc.popular}
        </span>
      )}

      {/* Top glow blob */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl pointer-events-none"
        style={{ background: m.ring, opacity: selected ? 0.18 : 0.06 }} />

      {/* Tier label + classes */}
      <div style={{ marginBottom: "var(--igap-sm)" }}>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: m.ring }}>
          {tier.label}
        </span>
        <p className="text-white/45 text-xs mt-1 font-normal">{tier.classes}</p>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ marginBottom: "var(--igap-sm)", background: `linear-gradient(90deg,transparent,${m.ring}55,transparent)` }} />

      {/* Feature list */}
      <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: m.ring, marginBottom: "var(--igap-sm)" }}>
        {fc.includes}
      </p>
      <ul className="item-gap">
        {tier.features.map((f: string) => (
          <li key={f} className="flex items-start gap-3 text-white/70 text-sm leading-snug">
            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: m.badge, border: `1px solid ${m.ring}55` }}>
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Select indicator */}
      <div className="flex items-center justify-center gap-2 text-xs font-semibold transition-colors duration-200"
        style={{ marginTop: "var(--igap-sm)", color: selected ? m.ring : "rgba(255,255,255,0.30)" }}>
        {selected
          ? <><span className="w-2 h-2 rounded-full animate-pulse" style={{ background: m.ring }} /> Selected</>
          : "Tap to select →"}
      </div>
    </motion.div>
  );
}

/* ── Lead capture form ── */
function LeadForm({ selectedTier, whatsapp, fc }: {
  selectedTier: Tier | null;
  whatsapp: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fc: any;
}) {
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [errors,  setErrors]  = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (!name.trim()) e.name = "Please enter the student's name.";
    const digits = phone.replace(/\D/g, "");
    if (!digits) e.phone = "Please enter a mobile number.";
    else if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit Indian mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    const raw = whatsapp.replace(/\D/g, "");
    const plan = selectedTier
      ? `${selectedTier.label} (${selectedTier.classes}) — ${selectedTier.price}/mo`
      : "Not selected yet";
    const msg = encodeURIComponent(
      `Hi, I want to book a FREE demo class at Vision Coaching Institute.\n\n` +
      `Student Name: ${name.trim()}\n` +
      `Plan Interested In: ${plan}\n` +
      `Parent Phone: ${phone.trim()}\n\n` +
      `Please confirm my seat.`
    );
    window.open(`https://wa.me/${raw}?text=${msg}`, "_blank", "noopener,noreferrer");
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
    setTimeout(() => setSent(false), 5000);
  };

  const activeMeta = selectedTier ? (TIER_META[selectedTier.color] ?? TIER_META.blue) : null;

  const inputCls =
    "w-full rounded-xl px-4 py-3.5 text-base text-white/85 font-normal border outline-none transition-all duration-200 " +
    "focus:ring-2 placeholder-white/25 bg-white/5 " +
    (activeMeta
      ? `border-white/12 focus:border-[${activeMeta.ring}] focus:ring-[${activeMeta.ring}]/15`
      : "border-white/12 focus:border-gold/60 focus:ring-gold/15");

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border"
      style={{
        background:  "linear-gradient(160deg,#0D1B4B,#091540)",
        borderColor: activeMeta ? `${activeMeta.ring}40` : "rgba(212,160,23,0.18)",
        boxShadow:   activeMeta ? `0 0 40px ${activeMeta.glow}` : "0 0 40px rgba(212,160,23,0.08)",
        transition:  "border-color 0.3s, box-shadow 0.3s",
      }}>

      {/* Header */}
      <div className="px-6 sm:px-8 py-5 border-b"
        style={{ borderColor: activeMeta ? `${activeMeta.ring}25` : "rgba(255,255,255,0.07)", background: "rgba(212,160,23,0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: activeMeta ? activeMeta.bg : "rgba(212,160,23,0.10)", border: `1px solid ${activeMeta?.ring ?? "#D4A017"}40` }}>
            🎓
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-base leading-tight">
              {selectedTier ? `${selectedTier.label} — ${selectedTier.classes}` : fc.ctaBtn}
            </h3>
            <p className="text-white/40 text-xs mt-0.5 font-normal">
              {selectedTier ? selectedTier.classes : "← Select a plan first"}
            </p>
          </div>
        </div>
      </div>

      {/* Selected plan pill */}
      <AnimatePresence>
        {selectedTier && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="px-6 sm:px-8 pt-5 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {selectedTier.features.slice(0, 3).map((f: string) => (
                <span key={f} className="badge-xs"
                  style={{ background: activeMeta!.bg, color: activeMeta!.ring, borderColor: `${activeMeta!.ring}40` }}>
                  ✓ {f}
                </span>
              ))}
              {selectedTier.features.length > 3 && (
                <span className="badge-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.12)" }}>
                  +{selectedTier.features.length - 3} more
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form body */}
      <form onSubmit={submit} className="px-6 sm:px-8 py-7 item-gap">
        <div>
          <input
            type="text" required value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
            placeholder={fc.namePlaceholder} className={inputCls} />
          {errors.name && <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>}
        </div>
        <div>
          <input
          type="tel" required value={phone} onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })); }}
          placeholder={fc.phonePlaceholder} className={inputCls} />
          {errors.phone && <p className="mt-1.5 text-red-400 text-xs">{errors.phone}</p>}
        </div>

        {/* Submit */}
        <motion.button
          type="submit" disabled={sending || sent}
          className="btn-whatsapp w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {sent ? (
            <>✅ WhatsApp opened — confirm your seat!</>
          ) : sending ? (
            <>Opening WhatsApp…</>
          ) : (
            <>
              <WhatsAppIcon />
              {fc.ctaBtn}
            </>
          )}
        </motion.button>

        <p className="text-center text-white/25 text-xs font-normal leading-snug">{fc.privacyNote}</p>
      </form>

      {/* Trust strip */}
      <div className="grid grid-cols-3 px-6 sm:px-8 pb-7" style={{ gap: "var(--igap-sm)" }}>
        {[
          { icon: "🔒", label: "100% Private" },
          { icon: "⚡", label: "2-hr Response" },
          { icon: "🎓", label: "Free Demo First" },
        ].map(({ icon, label }) => (
          <div key={label} className="rounded-xl py-3 px-2 text-center border border-white/8"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-white/40 text-xs font-medium leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export default function FeeCard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fc   = (t as any).feeCard as {
    title: string; subtitle: string; seatsLeft: string;
    perMonth: string; popular: string; includes: string;
    ctaBtn: string; privacyNote: string;
    namePlaceholder: string; phonePlaceholder: string;
    tiers: Tier[];
  };
  const whatsapp = t.contact.whatsapp;

  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.1 });

  /* Default to the popular (middle) tier */
  const defaultIdx = fc.tiers.findIndex(t => t.popular) ?? 1;
  const [selectedIdx, setSelectedIdx] = useState<number>(defaultIdx);
  const [scrollIdx,   setScrollIdx]   = useState<number>(defaultIdx);
  const selectedTier = fc.tiers[selectedIdx] ?? null;

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(180deg,#050D1F 0%,#0A1F5C 60%,#050D1F 100%)",
        paddingTop: "clamp(2.5rem, 5vw, 4rem)",
        paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
        overflowX: "hidden",
        overflowY: "visible",
      }}
      ref={sectionRef}>

      {/* Background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(212,160,23,0.06) 0%,transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(68,136,255,0.07) 0%,transparent 70%)" }} />

      <div className="relative z-10 layout-container" style={{ display: "flex", flexDirection: "column", gap: "var(--igap-sm)" }}>
        <SectionHeading title={fc.title} subtitle={fc.subtitle} />

        {/* Urgency pill */}
        <div className="flex justify-center gsap-reveal">
          <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold min-h-[46px]"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.30)", color: "#fca5a5" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
            {fc.seatsLeft}
          </span>
        </div>

        {/* Main layout: tiers left + form right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-start gsap-reveal" style={{ gap: "var(--igap)" }}>

          {/* Pricing cards */}
          <div>
            {/* ── Mobile: horizontal scroll-snap ── */}
            <style>{`
              .fee-scroll::-webkit-scrollbar { display: none; }
              .fee-scroll { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div
              className="fee-scroll flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-3"
              style={{ WebkitOverflowScrolling: "touch", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
              onScroll={e => {
                const el = e.currentTarget;
                const idx = Math.round(el.scrollLeft / (el.scrollWidth / fc.tiers.length));
                setScrollIdx(idx);
              }}>
              {/* Left spacer so first card is centred */}
              <div className="flex-none w-[11vw]" />
              {fc.tiers.map((tier, i) => (
                <div key={tier.label} className="flex-none w-[72vw] max-w-[290px] snap-center">
                  <TierCard tier={tier} selected={selectedIdx === i} onSelect={() => setSelectedIdx(i)} />
                </div>
              ))}
              {/* Right spacer */}
              <div className="flex-none w-[11vw]" />
            </div>

            {/* Dot indicators — mobile only */}
            <div className="flex md:hidden justify-center gap-2 mt-3">
              {fc.tiers.map((tier, i) => {
                const m = TIER_META[tier.color] ?? TIER_META.blue;
                return (
                  <div
                    key={tier.label}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      scrollIdx === i ? "20px" : "8px",
                      height:     "8px",
                      background: scrollIdx === i ? m.ring : "rgba(255,255,255,0.20)",
                    }}
                  />
                );
              })}
            </div>
            <p className="md:hidden text-center text-white/30 text-[11px] mt-2">
              ← Swipe to see all plans →
            </p>

            {/* ── Tablet +: 3-column grid ── */}
            <div className="hidden md:grid md:grid-cols-3 gap-5">
              {fc.tiers.map((tier, i) => (
                <TierCard key={tier.label} tier={tier} selected={selectedIdx === i} onSelect={() => setSelectedIdx(i)} />
              ))}
            </div>
          </div>

          {/* Lead form — sticky from md up */}
          <div className="md:sticky" style={{ top: "calc(var(--navbar-h) + 1.5rem)" }}>
            <LeadForm selectedTier={selectedTier} whatsapp={whatsapp} fc={fc} />
          </div>
        </div>
      </div>
    </div>
  );
}

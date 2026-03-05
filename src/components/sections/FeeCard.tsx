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
      className="relative rounded-2xl p-6 sm:p-7 cursor-pointer overflow-hidden border transition-all duration-300 h-full"
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

      {/* Price */}
      <div className="flex items-end gap-1" style={{ marginBottom: "var(--igap-sm)" }}>
        <span className="font-heading font-bold text-4xl sm:text-5xl leading-none text-white">{tier.price}</span>
        <span className="text-white/40 text-sm mb-1 font-normal">{fc.perMonth}</span>
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
      <div className="px-6 py-5 border-b"
        style={{ borderColor: activeMeta ? `${activeMeta.ring}25` : "rgba(255,255,255,0.07)", background: "rgba(212,160,23,0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: activeMeta ? activeMeta.bg : "rgba(212,160,23,0.10)", border: `1px solid ${activeMeta?.ring ?? "#D4A017"}40` }}>
            🎓
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-base leading-tight">
              {selectedTier
                ? `${selectedTier.label} — ${selectedTier.price}${fc.perMonth}`
                : fc.ctaBtn}
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
            className="px-6 pt-5 overflow-hidden">
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
      <form onSubmit={submit} className="px-6 py-6 item-gap">
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
              <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {fc.ctaBtn}
            </>
          )}
        </motion.button>

        <p className="text-center text-white/25 text-xs font-normal leading-snug">{fc.privacyNote}</p>
      </form>

      {/* Trust strip */}
      <div className="grid grid-cols-3 px-6 pb-6" style={{ gap: "var(--igap-sm)" }}>
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
  const selectedTier = fc.tiers[selectedIdx] ?? null;

  return (
    <div
      className="relative section-pad overflow-hidden"
      style={{ background: "linear-gradient(180deg,#050D1F 0%,#0A1F5C 60%,#050D1F 100%)" }}
      ref={sectionRef}>

      {/* Background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center,rgba(212,160,23,0.06) 0%,transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(68,136,255,0.07) 0%,transparent 70%)" }} />

      <div className="relative z-10 layout-container section-inner">
        <SectionHeading title={fc.title} subtitle={fc.subtitle} />

        {/* Urgency pill */}
        <div className="flex justify-center gsap-reveal">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.30)", color: "#fca5a5" }}>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
            {fc.seatsLeft}
          </span>
        </div>

        {/* Main layout: tiers left + form right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] items-start gsap-reveal" style={{ gap: "var(--igap)" }}>

          {/* Pricing cards — swipe carousel on mobile, 3-col grid from md */}
          <div>
            {/* Mobile: horizontal scroll-snap */}
            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 carousel-track"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
              {fc.tiers.map((tier, i) => (
                <div key={tier.label} className="flex-none w-[78vw] max-w-[300px] snap-center">
                  <TierCard tier={tier} selected={selectedIdx === i} onSelect={() => setSelectedIdx(i)} />
                </div>
              ))}
            </div>
            <p className="md:hidden text-center text-white/30 text-xs mt-1">← Swipe to see all plans →</p>
            {/* Tablet+: 3-column grid */}
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

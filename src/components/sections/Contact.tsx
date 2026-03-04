"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useScrollReveal } from "@/lib/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/* ─── Copy-phone helper ──────────────────────────────────────────── */
function CopyPhone({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(phone.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* fallback */ }
  };
  return (
    <a href={`tel:${phone.replace(/\s/g, "")}`} onClick={handleCopy}
      className="flex items-center gap-4 text-white/70 hover:text-gold transition-colors group">
      <span className="w-10 h-10 rounded-full border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 flex items-center justify-center text-sm transition-all flex-shrink-0">
        📞
      </span>
      <span className="text-base sm:text-lg font-medium flex-1">{phone}</span>
      <span className={`transition-all duration-200 flex-shrink-0 ${copied ? "text-green-400 opacity-100" : "text-white/30 opacity-0 group-hover:opacity-100"}`}>
        {copied
          ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>}
      </span>
    </a>
  );
}

/* ─── Enquiry Form ───────────────────────────────────────────────── */
type EnquiryFormProps = {
  tf: {
    title: string; subtitle: string; namePlaceholder: string; phonePlaceholder: string;
    classLabel: string; classOptions: string[]; boardLabel: string; boardOptions: string[];
    submitBtn: string; privacyNote: string;
  };
  whatsapp: string;
};

function EnquiryForm({ tf, whatsapp }: EnquiryFormProps) {
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [cls,     setCls]     = useState(tf.classOptions[3]);   // default 9th
  const [board,   setBoard]   = useState(tf.boardOptions[0]);   // default CBSE
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    const raw = whatsapp.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Hi, I want to book a FREE demo class at Vision Coaching Institute.\n\nStudent Name: ${name.trim()}\nClass: ${cls}\nBoard: ${board}\nParent Phone: ${phone.trim()}\n\nPlease confirm the slot.`
    );
    window.open(`https://wa.me/${raw}?text=${msg}`, "_blank", "noopener,noreferrer");
    setTimeout(() => setSending(false), 2000);
  };

  const inputCls = "w-full rounded-lg px-4 py-3.5 text-base text-white/85 font-normal border outline-none transition-all duration-200 focus:border-gold/60 focus:ring-2 focus:ring-gold/15 placeholder-white/25"
    + " " + "bg-white/5 border-white/12";

  return (
    <div className="rounded-2xl border border-gold/18 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0D1B4B 0%, #091540 100%)" }}>
      {/* Header stripe */}
      <div className="px-6 py-5 border-b border-white/8"
        style={{ background: "linear-gradient(90deg, rgba(212,160,23,0.08), transparent)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-lg flex-shrink-0">
            🎓
          </div>
          <div>
            <h3 className="text-white font-heading font-bold text-base leading-tight">{tf.title}</h3>
            <p className="text-white/40 text-xs mt-0.5 font-normal">{tf.subtitle}</p>
          </div>
        </div>
      </div>
      

      {/* Form body */}
      <form onSubmit={submit} className="px-6 py-6 item-gap">
        {/* Name */}
        <input
          type="text" required value={name} onChange={e => setName(e.target.value)}
          placeholder={tf.namePlaceholder} className={inputCls} />

        {/* Class + Board side by side */}
        <div className="grid grid-cols-2" style={{ gap: "var(--igap-sm)" }}>
          <div>
            <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5 font-semibold">
              {tf.classLabel}
            </label>
            <select value={cls} onChange={e => setCls(e.target.value)} className={inputCls + " cursor-pointer"}>
              {tf.classOptions.map(o => <option key={o} value={o} className="bg-[#0D1B4B] text-base">{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/35 uppercase tracking-wider mb-1.5 font-semibold">
              {tf.boardLabel}
            </label>
            <select value={board} onChange={e => setBoard(e.target.value)} className={inputCls + " cursor-pointer"}>
              {tf.boardOptions.map(o => <option key={o} value={o} className="bg-[#0D1B4B] text-base">{o}</option>)}
            </select>
          </div>
        </div>
        

        {/* Phone */}
        <input
          type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
          placeholder={tf.phonePlaceholder} className={inputCls} />

        {/* Submit */}
        <button type="submit" disabled={sending}
          className="btn-whatsapp w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
          <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          {sending ? "Opening WhatsApp…" : tf.submitBtn}
        </button>

        <p className="text-center text-white/25 text-xs font-normal leading-snug">{tf.privacyNote}</p>
      </form>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────── */
export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>, { stagger: 0.15 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tf = (t as any).enquiryForm;

  return (
    <div className="section-pad bg-bg-dark" ref={sectionRef}>
      <div className="layout-container section-inner">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "var(--igap)" }}>

          {/* ── Left: Info + WhatsApp ── */}
          <motion.div className="item-gap"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.2 }}>

            {/* Phones */}
            <div>
              <h3 className="text-gold font-bold uppercase text-[11px] tracking-widest" style={{ marginBottom: "var(--igap-sm)" }}>{t.contact.callLabel}</h3>
              <div className="item-gap">
                {t.contact.phones.map((p) => <CopyPhone key={p} phone={p} />)}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">📍</span>
              <div>
                <div className="text-gold font-bold uppercase text-[11px] tracking-widest mb-2">{t.contact.locationLabel}</div>
                <p className="text-white/60 text-sm leading-relaxed font-normal">{t.contact.address}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sm flex-shrink-0">🕐</span>
              <div>
                <div className="text-gold font-bold uppercase text-[11px] tracking-widest mb-2">{t.contact.hoursLabel}</div>
                <p className="text-white/60 text-sm leading-relaxed font-normal">{t.contact.hours}</p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${t.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp"
              whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.098.543 4.072 1.493 5.782L0 24l6.388-1.676A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.52-5.16-1.426l-.37-.22-3.794.995.992-3.706-.242-.383A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              {t.contact.whatsappBtn}
            </motion.a>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/8 h-[220px]"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <iframe
                src="https://maps.google.com/maps?q=Purani+Bazar,+Tulsipur,+Uttar+Pradesh&output=embed"
                width="100%" height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vision Coaching Institute Location" />
            </motion.div>
          </motion.div>

          {/* ── Right: Enquiry Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }} viewport={{ once: true, amount: 0.2 }}>
            <EnquiryForm tf={tf} whatsapp={t.contact.whatsapp} />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 text-center" style={{ marginTop: "var(--igap-sm)" }}>
              {[
                { icon: "🔒", label: "100% Private" },
                { icon: "⚡", label: "2-hr Response" },
                { icon: "🎓", label: "Free Demo First" },
              ].map(({ icon, label }) => (
                <div key={label} className="rounded-lg py-2.5 px-1.5 border border-white/8"
                  style={{ background: "rgba(13,27,75,0.5)" }}>
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-white/40 text-xs font-medium leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * shareUtils.ts — WhatsApp share message builders
 * All messages use WhatsApp markdown: *bold*, newlines encoded as %0A
 */

const SITE_URL = "https://vision-coaching-institute.vercel.app";
const PHONE    = "+91 72104 33685";
const ADDRESS  = "GCM8+GJW, Purani Bazar, Tulsipur, Balrampur, UP 271208";
const MAPS_URL = "https://maps.google.com/?q=GCM8%2BGJW+Tulsipur+Uttar+Pradesh";
const WA_NUM   = "917210433685";

function wa(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/** Share a specific board/course */
export function shareCourse(boardName: string, classes: string, subjects: string[]): string {
  const msg = [
    `🎓 *Vision Coaching Institute – Tulsipur*`,
    ``,
    `📚 *${boardName} Coaching (${classes})*`,
    `Subjects: ${subjects.join(", ")}`,
    ``,
    `✅ Small batches (max 15–20 students)`,
    `✅ Daily doubt-solving sessions`,
    `✅ Weekly tests & performance tracking`,
    `🎓 *Free demo class every Saturday*`,
    ``,
    `📍 ${ADDRESS}`,
    `📞 ${PHONE}`,
    ``,
    `👉 ${SITE_URL}/#courses`,
  ].join("\n");
  return wa(msg);
}

/** Share location */
export function shareLocation(): string {
  const msg = [
    `📍 *Vision Coaching Institute – Tulsipur*`,
    ``,
    `*Address:* ${ADDRESS}`,
    ``,
    `🗺️ Google Maps: ${MAPS_URL}`,
    ``,
    `🕐 Mon–Sat: 7:00 AM – 8:00 PM`,
    `📞 ${PHONE}`,
    ``,
    `👉 ${SITE_URL}/#contact`,
  ].join("\n");
  return wa(msg);
}

/** Share all contact details */
export function shareContact(): string {
  const msg = [
    `📞 *Vision Coaching Institute – Tulsipur*`,
    ``,
    `*Phone numbers:*`,
    `• +91 72104 33685`,
    `• +91 72359 37827`,
    `• +91 99568 41282`,
    ``,
    `💬 WhatsApp: https://wa.me/${WA_NUM}`,
    `📍 ${ADDRESS}`,
    `🕐 Mon–Sat: 7:00 AM – 8:00 PM`,
    ``,
    `👉 ${SITE_URL}/#contact`,
  ].join("\n");
  return wa(msg);
}

/**
 * Data for WhatsApp Status share via Web Share API.
 * Hinglish hook — short, emotional, curiosity-first.
 * The URL at the end triggers WhatsApp's link-preview card (OG image).
 */
export function getStatusShareData(): { title: string; text: string; url: string } {
  return {
    title: "Vision Coaching Institute – Tulsipur",
    text: [
      `Kya aapke bache ke marks improve nahi ho rahe? 📉`,
      ``,
      `Tulsipur mein 500+ students ke results badal gaye — sirf sahi coaching se. 🎯`,
      ``,
      `FREE Demo Class available hai. Seats limited hain.`,
    ].join("\n"),
    url: SITE_URL,
  };
}

/**
 * WhatsApp deep-link fallback for browsers without Web Share API.
 */
export function shareStatusFallback(): string {
  const msg = [
    `Kya aapke bache ke marks improve nahi ho rahe? 📉`,
    ``,
    `Tulsipur mein 500+ students ke results badal gaye — sirf sahi coaching se. 🎯`,
    ``,
    `*Vision Coaching Institute* — Classes 6th–12th`,
    `📘 CBSE · 📗 ICSE · 📙 ISC · 📕 UP Board`,
    ``,
    `🆓 FREE Demo Class available hai`,
    `📍 Purani Bazar, Tulsipur, UP`,
    `📞 ${PHONE}`,
    ``,
    `👉 ${SITE_URL}`,
  ].join("\n");
  return wa(msg);
}

/** Share the institute generally (about) */
export function shareAbout(): string {
  const msg = [
    `🎓 *Vision Coaching Institute – Tulsipur*`,
    ``,
    `Expert coaching for Classes 6th–12th`,
    `📘 CBSE · 📗 ICSE · 📙 ISC · 📕 UP Board`,
    `Subjects: Maths, Physics, Chemistry, Biology`,
    ``,
    `✅ Small batches | Daily doubt sessions`,
    `✅ Weekly tests | *Free demo class*`,
    `⭐ 95% pass rate | 500+ students taught`,
    ``,
    `📍 Purani Bazar, Tulsipur, UP`,
    `📞 ${PHONE}`,
    ``,
    `👉 ${SITE_URL}`,
  ].join("\n");
  return wa(msg);
}

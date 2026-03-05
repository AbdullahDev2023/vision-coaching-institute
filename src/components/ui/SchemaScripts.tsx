/**
 * SchemaScripts — Server Component
 * Injects FAQPage + Course JSON-LD schemas for rich results in Google SERPs.
 * Rendered server-side so bots see them immediately (no JS required).
 */
import enStrings from "@/lib/i18n/en.json";

const SITE_URL = "https://www.visioncoachinginstitute.online";

export default function SchemaScripts() {
  /* ── FAQPage schema → enables expandable Q&A in Google results ── */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    "mainEntity": enStrings.faq.items.map(item => ({
      "@type": "Question",
      "name":  item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text":  item.a,
      },
    })),
  };

  /* ── Course schema per tier → enables price/availability rich results ── */
  const courseSchemas = enStrings.feeCard.tiers.map(tier => {
    const priceNum = parseInt(tier.price.replace(/[^0-9]/g, ""), 10);
    return {
      "@context": "https://schema.org",
      "@type":    "Course",
      "name":     `${tier.label} Coaching — ${tier.classes}`,
      "description": tier.features.join(". ") + ".",
      "provider": {
        "@type": "EducationalOrganization",
        "@id":   `${SITE_URL}/#organization`,
        "name":  "Vision Coaching Institute",
      },
      "offers": {
        "@type":        "Offer",
        "price":         priceNum,
        "priceCurrency": "INR",
        "availability":  "https://schema.org/LimitedAvailability",
        "url":           SITE_URL,
      },
      "hasCourseInstance": {
        "@type":      "CourseInstance",
        "courseMode": "Onsite",
        "location": {
          "@type": "Place",
          "name":  "Vision Coaching Institute, Tulsipur",
          "address": {
            "@type":           "PostalAddress",
            "streetAddress":   "Purani Bazar",
            "addressLocality": "Tulsipur",
            "addressRegion":   "Uttar Pradesh",
            "postalCode":      "271208",
            "addressCountry":  "IN",
          },
        },
      },
    };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {courseSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

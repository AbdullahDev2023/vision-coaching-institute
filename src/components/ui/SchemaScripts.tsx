/**
 * SchemaScripts — Server Component
 * Injects FAQPage + Course + Review + ImageGallery JSON-LD schemas.
 * Rendered server-side so bots see them immediately (no JS required).
 */
import enStrings from "@/lib/i18n/en.json";

/** All 19 gallery photos with keyword-rich descriptions for Google Images */
const GALLERY_PHOTOS = [
  { src: "/images/gallery/photo-01.jpg", label: "Vision Coaching Institute classroom – Tulsipur, Uttar Pradesh" },
  { src: "/images/gallery/photo-02.jpg", label: "CBSE coaching class at Vision Coaching Institute, Tulsipur" },
  { src: "/images/gallery/photo-03.jpg", label: "Science tuition class – Vision Coaching Tulsipur, UP Board" },
  { src: "/images/gallery/photo-04.jpg", label: "Expert faculty teaching at Vision Coaching Institute, Tulsipur" },
  { src: "/images/gallery/photo-05.jpg", label: "Physics class – Vision Coaching Tulsipur, small batch teaching" },
  { src: "/images/gallery/photo-06.jpg", label: "Physics lecture session – Vision Coaching Institute, Tulsipur UP" },
  { src: "/images/gallery/photo-07.jpg", label: "Chemistry coaching class – Vision Coaching Tulsipur, Uttar Pradesh" },
  { src: "/images/gallery/photo-08.jpg", label: "Chemistry lab concepts – Vision Coaching Institute Tulsipur" },
  { src: "/images/gallery/photo-09.jpg", label: "Biology coaching class – Vision Coaching Institute, Tulsipur UP" },
  { src: "/images/gallery/photo-10.jpg", label: "Maths batch coaching – Vision Coaching Institute, Purani Bazar Tulsipur" },
  { src: "/images/gallery/photo-11.jpg", label: "UP Board coaching session – Vision Coaching Institute, Tulsipur" },
  { src: "/images/gallery/photo-12.jpg", label: "UP Board class preparation – Vision Coaching Tulsipur, Balrampur" },
  { src: "/images/gallery/photo-13.jpg", label: "ICSE ISC coaching batch – Vision Coaching Institute, Tulsipur UP" },
  { src: "/images/gallery/photo-14.jpg", label: "Best coaching centre in Tulsipur – Vision Coaching Institute" },
  { src: "/images/gallery/photo-15.jpg", label: "Class 10 board exam preparation – Vision Coaching, Tulsipur" },
  { src: "/images/gallery/photo-16.jpg", label: "Class 12 board preparation batch – Vision Coaching Institute Tulsipur" },
  { src: "/images/gallery/photo-17.jpg", label: "Science batch students – Vision Coaching Institute, Tulsipur UP" },
  { src: "/images/gallery/photo-18.jpg", label: "Student study session – Vision Coaching, Purani Bazar Tulsipur" },
  { src: "/images/gallery/photo-19.jpg", label: "Vision Coaching Institute exterior – Purani Bazar, Tulsipur, UP" },
];

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

  /* ── Review schema per testimonial → boosts aggregateRating signals ── */
  const reviewSchemas = enStrings.testimonials.reviews.map(review => ({
    "@context": "https://schema.org",
    "@type":    "Review",
    "reviewBody": review.text,
    "reviewRating": {
      "@type":       "Rating",
      "ratingValue": review.rating,
      "bestRating":  "5",
      "worstRating": "1",
    },
    "author": {
      "@type": "Person",
      "name":  review.name,
    },
    "itemReviewed": {
      "@type": "EducationalOrganization",
      "@id":   `${SITE_URL}/#organization`,
      "name":  "Vision Coaching Institute",
    },
  }));

  /* ── ImageGallery schema → makes photos eligible for Google Image Search ── */
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type":    "ImageGallery",
    "name":     "Vision Coaching Institute — Classroom & Campus Gallery, Tulsipur",
    "description":
      "Photos from Vision Coaching Institute, Purani Bazar, Tulsipur. Classrooms, faculty, " +
      "student batches and coaching sessions for CBSE, ICSE, ISC, UP Board and BSc.",
    "url":      `${SITE_URL}/gallery`,
    "author": {
      "@type": "Organization",
      "@id":   `${SITE_URL}/#organization`,
      "name":  "Vision Coaching Institute",
    },
    "image": GALLERY_PHOTOS.map(p => ({
      "@type":            "ImageObject",
      "url":              `${SITE_URL}${p.src}`,
      "name":              p.label,
      "description":       p.label,
      "author": { "@type": "Organization", "name": "Vision Coaching Institute" },
      "copyrightHolder": { "@type": "Organization", "name": "Vision Coaching Institute" },
      "contentLocation": {
        "@type":           "Place",
        "name":            "Vision Coaching Institute, Tulsipur",
        "address": {
          "@type":           "PostalAddress",
          "addressLocality": "Tulsipur",
          "addressRegion":   "Uttar Pradesh",
          "addressCountry":  "IN",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      {courseSchemas.map((schema, i) => (
        <script
          key={`course-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {reviewSchemas.map((schema, i) => (
        <script
          key={`review-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

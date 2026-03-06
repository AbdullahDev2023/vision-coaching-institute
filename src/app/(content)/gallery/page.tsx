import type { Metadata } from "next";
import Image from "next/image";
import ContentPageShell from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "Gallery — Classrooms & Campus | Vision Coaching Institute Tulsipur";
const DESC     =
  "Photos from Vision Coaching Institute, Purani Bazar, Tulsipur. See our classrooms, " +
  "coaching sessions, faculty and student batches for CBSE, ICSE, ISC, UP Board and BSc.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords: [
    "Vision Coaching Institute photos Tulsipur",
    "coaching centre Tulsipur images",
    "classroom photos Tulsipur coaching",
    "CBSE coaching class photos UP",
    "best coaching institute Tulsipur gallery",
  ],
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: TITLE, description: DESC,
    url: `${SITE_URL}/gallery`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "website",
  },
};

const PHOTOS = [
  { src: "/images/gallery/photo-01.jpg", alt: "Vision Coaching Institute classroom – Tulsipur, Uttar Pradesh",         caption: "Main classroom — Tulsipur" },
  { src: "/images/gallery/photo-02.jpg", alt: "CBSE coaching class at Vision Coaching Institute, Tulsipur",            caption: "CBSE coaching batch" },
  { src: "/images/gallery/photo-03.jpg", alt: "Science tuition class – Vision Coaching Tulsipur, UP Board",            caption: "Science tuition — UP Board" },
  { src: "/images/gallery/photo-04.jpg", alt: "Expert faculty teaching at Vision Coaching Institute, Tulsipur",        caption: "Faculty in session" },
  { src: "/images/gallery/photo-05.jpg", alt: "Physics class – Vision Coaching Tulsipur, small batch",                 caption: "Physics — small batch" },
  { src: "/images/gallery/photo-06.jpg", alt: "Physics lecture session – Vision Coaching Institute, Tulsipur UP",      caption: "Physics lecture" },
  { src: "/images/gallery/photo-07.jpg", alt: "Chemistry coaching class – Vision Coaching Tulsipur, Uttar Pradesh",    caption: "Chemistry class" },
  { src: "/images/gallery/photo-08.jpg", alt: "Chemistry concepts session – Vision Coaching Institute Tulsipur",       caption: "Chemistry concepts" },
  { src: "/images/gallery/photo-09.jpg", alt: "Biology coaching class – Vision Coaching Institute, Tulsipur UP",       caption: "Biology coaching" },
  { src: "/images/gallery/photo-10.jpg", alt: "Maths batch coaching – Vision Coaching Institute, Purani Bazar Tulsipur", caption: "Mathematics batch" },
  { src: "/images/gallery/photo-11.jpg", alt: "UP Board coaching session – Vision Coaching Institute, Tulsipur",       caption: "UP Board session" },
  { src: "/images/gallery/photo-12.jpg", alt: "UP Board class preparation – Vision Coaching Tulsipur, Balrampur",      caption: "UP Board preparation" },
  { src: "/images/gallery/photo-13.jpg", alt: "ICSE ISC coaching batch – Vision Coaching Institute, Tulsipur UP",      caption: "ICSE / ISC batch" },
  { src: "/images/gallery/photo-14.jpg", alt: "Best coaching centre in Tulsipur – Vision Coaching Institute",          caption: "Vision Coaching Institute" },
  { src: "/images/gallery/photo-15.jpg", alt: "Class 10 board exam preparation – Vision Coaching, Tulsipur",           caption: "Class 10 board prep" },
  { src: "/images/gallery/photo-16.jpg", alt: "Class 12 board preparation batch – Vision Coaching Institute Tulsipur", caption: "Class 12 senior batch" },
  { src: "/images/gallery/photo-17.jpg", alt: "Science batch students – Vision Coaching Institute, Tulsipur UP",       caption: "Science students" },
  { src: "/images/gallery/photo-18.jpg", alt: "Student study session – Vision Coaching, Purani Bazar Tulsipur",        caption: "Study session" },
  { src: "/images/gallery/photo-19.jpg", alt: "Vision Coaching Institute campus – Purani Bazar, Tulsipur, UP 271208",  caption: "Institute campus, Tulsipur" },
];

const CRUMBS = [
  { label: "Home",    href: "/" },
  { label: "Gallery", href: "/gallery" },
];

export default function GalleryPage() {
  /* ImageGallery JSON-LD — page-level, supplements the one in SchemaScripts */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "ImageGallery",
    "name":     "Vision Coaching Institute — Gallery, Tulsipur",
    "description": DESC,
    "url":      `${SITE_URL}/gallery`,
    "author":   { "@type": "Organization", "@id": `${SITE_URL}/#organization`, "name": "Vision Coaching Institute" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": CRUMBS.map((c, i) => ({
        "@type": "ListItem", "position": i + 1, "name": c.label,
        "item":  `${SITE_URL}${c.href === "/" ? "" : c.href}`,
      })),
    },
    "image": PHOTOS.map(p => ({
      "@type":       "ImageObject",
      "url":          `${SITE_URL}${p.src}`,
      "name":          p.alt,
      "description":   p.alt,
      "contentUrl":   `${SITE_URL}${p.src}`,
      "author":       { "@type": "Organization", "name": "Vision Coaching Institute" },
      "copyrightHolder": { "@type": "Organization", "name": "Vision Coaching Institute" },
      "contentLocation": {
        "@type": "Place", "name": "Purani Bazar, Tulsipur, Uttar Pradesh",
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "Gallery", lastUpdated: "March 2026" }}
        title="Gallery — Vision Coaching Institute, Tulsipur"
        subtitle="A look inside our classrooms, coaching sessions and campus at Purani Bazar, Tulsipur, Uttar Pradesh."
        ctaTitle="See It in Person — Free Demo Every Saturday"
        ctaBody="Walk in any Saturday to see our classrooms and meet our faculty. No appointment needed. First class is free."
      >
        <p style={{ color: "rgba(10,31,92,0.6)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          19 photos from our CBSE, ICSE, ISC, UP Board and BSc coaching batches in Tulsipur, Uttar Pradesh.
          Visit us at Purani Bazar, Tulsipur — Mon–Sat, 7 AM to 8 PM.
        </p>

        {/* Server-rendered image grid — fully crawlable by Google Images */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          margin: "1rem 0 2rem",
        }}>
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              style={{
                margin: 0,
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid rgba(10,31,92,0.12)",
                background: "#F0F3FF",
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16/9", width: "100%" }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <figcaption style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.78rem",
                color: "rgba(10,31,92,0.65)",
                fontWeight: 500,
              }}>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p style={{ color: "rgba(10,31,92,0.5)", fontSize: "0.82rem", textAlign: "center" }}>
          📍 Vision Coaching Institute · Purani Bazar, Tulsipur, Balrampur, UP 271208 ·
          📞 +91 72104 33685
        </p>
      </ContentPageShell>
    </>
  );
}

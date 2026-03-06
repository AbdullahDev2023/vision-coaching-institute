import { MetadataRoute } from "next";

const SITE_URL = "https://www.visioncoachinginstitute.online";

/**
 * Next.js App Router sitemap — auto-served at /sitemap.xml
 * Do NOT add a public/sitemap.xml — that will conflict with this file.
 *
 * This is a single-page app; sections are hash anchors on the root page.
 * Google treats /#section URLs as variants of / but we include them for
 * completeness and to signal content structure.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // ── Root page — highest priority ──────────────────────────────
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // ── Named section anchors (required by the brief) ─────────────
    {
      url: `${SITE_URL}/#fees`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#courses`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // ── Additional section anchors ────────────────────────────────
    {
      url: `${SITE_URL}/#features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#faculty`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#results`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Phase 5 content / landing pages ───────────────────────────
    {
      url: `${SITE_URL}/cbse-coaching-tulsipur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/up-board-coaching-tulsipur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/class-10-science-coaching`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/class-12-pcb-coaching`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/results`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // ── Blog / Vlogs ──────────────────────────────────────────────
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog/how-to-prepare-cbse-board-exam`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/top-scoring-students-tulsipur`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}

import { MetadataRoute } from "next";

const SITE_URL = "https://www.visioncoachinginstitute.online";

/**
 * Next.js App Router sitemap — auto-served at /sitemap.xml
 *
 * Rules:
 * 1. Only list URLs that actually return 200 (no 404s in sitemap).
 * 2. Hash anchors (/#section) are silently ignored by Google — omitted.
 * 3. Admin, API, and noindex pages are excluded.
 * 4. Add blog-post URLs here only after their page.tsx files exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    /* ── Root (SPA with all sections) ───────────────────── */
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    /* ── Content / landing pages ─────────────────────────── */
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
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /* ── Blog index ──────────────────────────────────────── */
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    /* ── Blog posts (add each entry only when page.tsx exists) ── */
    {
      url: `${SITE_URL}/blog/how-to-prepare-cbse-board-exam`,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/top-scoring-students-tulsipur`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}

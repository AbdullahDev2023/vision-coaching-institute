import { MetadataRoute } from "next";

const SITE_URL = "https://vision-coaching-institute.vercel.app";

/**
 * Next.js App Router sitemap — auto-served at /sitemap.xml
 * Mirrors public/sitemap.xml but generated programmatically at build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2025-01-01");

  const sections = [
    { id: "about",        priority: 0.8, changeFrequency: "monthly" as const },
    { id: "features",     priority: 0.7, changeFrequency: "monthly" as const },
    { id: "courses",      priority: 0.9, changeFrequency: "monthly" as const },
    { id: "faculty",      priority: 0.7, changeFrequency: "monthly" as const },
    { id: "results",      priority: 0.8, changeFrequency: "yearly"  as const },
    { id: "gallery",      priority: 0.6, changeFrequency: "monthly" as const },
    { id: "testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { id: "contact",      priority: 0.8, changeFrequency: "yearly"  as const },
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...sections.map(({ id, priority, changeFrequency }) => ({
      url: `${SITE_URL}/#${id}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
  ];
}

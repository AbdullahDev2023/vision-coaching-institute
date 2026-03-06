import type { Metadata } from "next";
import Link from "next/link";
import ContentPageShell from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";

export const metadata: Metadata = {
  title: "Vlogs & Blog — Study Tips, Results & News | Vision Coaching Institute",
  description:
    "Read expert study tips, exam strategies, topper stories and coaching news from Vision Coaching Institute, Tulsipur. Helping students excel in CBSE, ICSE, ISC & UP Board.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Vlogs & Blog | Vision Coaching Institute Tulsipur",
    description:
      "Expert tips, topper stories and exam strategies from Vision Coaching Institute, Tulsipur.",
    url: `${SITE_URL}/blog`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

const POSTS = [
  {
    slug: "how-to-prepare-cbse-board-exam",
    title: "How to Prepare for CBSE Board Exams",
    desc: "Expert tips on subject-wise strategy, study schedule, mock tests and exam-day advice for Class 10 & 12 students.",
    date: "10 Feb 2026",
  },
  {
    slug: "top-scoring-students-tulsipur",
    title: "Top Scoring Students of Tulsipur",
    desc: "Meet the toppers from Vision Coaching Institute — their stories, study habits and advice for upcoming students.",
    date: "5 Mar 2026",
  },
];

export default function BlogIndex() {
  return (
    <ContentPageShell
      title="Vlogs & Blog"
      subtitle="Study tips, topper stories and coaching news from our faculty."
      crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2rem" }}>
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article
              style={{
                padding: "1.5rem",
                borderRadius: "1rem",
                border: "1px solid rgba(212,160,23,0.20)",
                background: "rgba(10,31,92,0.35)",
                transition: "border-color 0.2s",
              }}
            >
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
                📅 {post.date}
              </p>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#F0C842", marginBottom: "0.5rem" }}>
                {post.title}
              </h2>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                {post.desc}
              </p>
              <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#D4A017", fontWeight: 600 }}>
                Read more →
              </p>
            </article>
          </Link>
        ))}
      </div>
    </ContentPageShell>
  );
}

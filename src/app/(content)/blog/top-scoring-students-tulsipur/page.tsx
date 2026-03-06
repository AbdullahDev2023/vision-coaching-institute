import type { Metadata } from "next";
import ContentPageShell, {
  H2, H3, P, UL, InfoBox, InternalLink,
} from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const SLUG     = "/blog/top-scoring-students-tulsipur";
const TITLE    = "Top Scoring Students of Tulsipur | Vision Coaching Institute";
const DESC     =
  "Meet the high-scoring students from Vision Coaching Institute, Tulsipur — their stories, " +
  "study habits and advice for students preparing for CBSE, ISC, ICSE and UP Board exams.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords: [
    "top students Tulsipur","CBSE toppers Tulsipur","Vision Coaching results",
    "board exam toppers Tulsipur UP","best students coaching Tulsipur",
    "ISC topper Tulsipur","UP board topper Tulsipur",
  ],
  alternates: { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}${SLUG}`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
};

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Top Scoring Students of Tulsipur", href: SLUG },
];

const TOPPERS = [
  {
    name: "Aarav Gupta",
    score: "98.6%",
    board: "CBSE Class 12",
    stream: "PCM (Physics, Chemistry, Maths)",
    quote: "Attending every doubt session and solving every NCERT example was the difference. Vision Coaching never let a doubt stay overnight.",
    tips: [
      "Solve NCERT completely before any guide book",
      "Attend every class — missing even one creates a gap that compounds",
      "Write practice answers as if it is the actual board paper",
    ],
  },
  {
    name: "Priya Tiwari",
    score: "97.2%",
    board: "ISC Class 12",
    stream: "PCB (Physics, Chemistry, Biology)",
    quote: "The weekly tests at Vision Coaching showed me exactly where I was weak. I fixed those chapters early — that's why my score was consistent across all subjects.",
    tips: [
      "Use weekly test scores as a diagnostic tool, not just a grade",
      "Draw every Biology diagram from memory at least five times",
      "Revise formulae every morning — even on non-study days",
    ],
  },
  {
    name: "Rahul Mishra",
    score: "95.8%",
    board: "UP Board Class 12",
    stream: "PCB (Physics, Chemistry, Biology)",
    quote: "I was average in Maths until I joined Vision Coaching. Daily practice problems and clearing doubts same-day changed everything.",
    tips: [
      "Never skip the doubt session after class",
      "Practice problems daily, even if just 10 questions",
      "Focus on UP Board marking patterns — they differ from CBSE in presentation",
    ],
  },
];

export default function TopScorersPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Top Scoring Students of Tulsipur",
    "description": DESC,
    "url": `${SITE_URL}${SLUG}`,
    "datePublished": "2026-03-05",
    "dateModified": "2026-03-05",
    "author": {
      "@type": "Organization",
      "name": "Vision Coaching Institute",
      "@id": `${SITE_URL}/#organization`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vision Coaching Institute",
      "@id": `${SITE_URL}/#organization`,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": CRUMBS.map((c, i) => ({
        "@type": "ListItem", "position": i + 1, "name": c.label,
        "item": `${SITE_URL}${c.href === "/" ? "" : c.href}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "Topper Stories", lastUpdated: "5 Mar 2026" }}
        title="Top Scoring Students of Tulsipur"
        subtitle="Every year, Vision Coaching Institute students achieve outstanding results across CBSE, ISC, ICSE and UP Board. Here are their stories, strategies and advice — in their own words."
        ctaTitle="Join the Next Batch at Vision Coaching, Tulsipur"
        ctaBody="Small batches · Daily doubt sessions · Free demo class every Saturday. Call or WhatsApp +91 72104 33685 to reserve your seat."
      >
        <H2>Our 2024 Board Toppers</H2>
        <P>
          These results come from real students who attended Vision Coaching Institute at
          Purani Bazar, Tulsipur. Their names and scores are published with consent. For
          full results across all boards and years, visit our{" "}
          <InternalLink href="/results">Results page</InternalLink>.
        </P>

        {TOPPERS.map((t) => (
          <div key={t.name} style={{ marginBottom: "2.5rem" }}>
            <H2>{t.name} — {t.score}</H2>
            <P>
              <strong>Board:</strong> {t.board} &nbsp;|&nbsp; <strong>Stream:</strong> {t.stream}
            </P>
            <InfoBox icon="💬" title={`In ${t.name.split(" ")[0]}'s words`} body={t.quote} />
            <H3>Study habits that made the difference</H3>
            <UL items={t.tips} />
          </div>
        ))}

        <H2>What These Toppers Have in Common</H2>
        <P>
          Looking across all our top-scoring students, three patterns repeat without exception:
        </P>
        <UL items={[
          "Consistency — they attended every class and completed every assignment",
          "Active doubt-clearing — no question was left unresolved beyond the same day",
          "Test-based revision — weekly tests at Vision Coaching gave them regular feedback and kept revision ongoing throughout the year",
        ]} />

        <H2>The Role of Small-Batch Coaching</H2>
        <P>
          All of these students attribute a significant part of their results to the small batch
          sizes at Vision Coaching Institute. With a maximum of 12–20 students per batch, every
          student is visible to the teacher. Attendance is tracked, doubts are noticed, and slow
          progress is caught early — not at exam time.
        </P>
        <P>
          This is fundamentally different from large coaching centres where students can sit
          quietly and fall behind without anyone noticing for months.
        </P>

        <H2>How to Be Next Year's Topper</H2>
        <UL items={[
          "Enrol early — batches fill quickly and small-batch access closes when the cap is reached",
          "Attend the free demo class first — see the teaching style before you commit",
          "Start with NCERT and build from there — do not jump to guides and question banks first",
          "Track your weekly test scores — treat every test as a diagnostic, not a judgement",
          "Clear every doubt the same day — let nothing carry to the next week",
        ]} />

        <P>
          For our full topper list and board-wise performance breakdown, see the{" "}
          <InternalLink href="/results">Results page</InternalLink>. To book your free demo
          class or check our CBSE, ISC and UP Board coaching details, visit our{" "}
          <InternalLink href="/">homepage</InternalLink> or call +91 72104 33685.
        </P>
      </ContentPageShell>
    </>
  );
}

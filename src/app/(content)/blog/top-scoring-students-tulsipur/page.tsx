import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const SLUG     = "/blog/top-scoring-students-tulsipur";
const TITLE    = "Top Scoring Students from Tulsipur — Vision Coaching Success Stories 2024";
const DESC     = "Topper stories and success journeys from Vision Coaching Institute, Tulsipur. How students from Tulsipur and Balrampur achieved 93–98% in CBSE, ISC, ICSE and UP Board exams with the right coaching and study strategy.";
const DATE_PUB = "2026-01-20";
const DATE_MOD = "2026-03-05";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["top scoring students Tulsipur","coaching results Tulsipur","topper coaching Tulsipur","Vision Coaching toppers","CBSE topper Tulsipur","UP board topper Tulsipur","best student Balrampur","coaching success stories Tulsipur"],
  alternates:  { canonical: `${SITE_URL}${SLUG}` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}${SLUG}`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "article",
  },
};

const CRUMBS = [
  { label: "Home",            href: "/"     },
  { label: "Blog",            href: "/blog" },
  { label: "Toppers 2024",    href: SLUG    },
];

export default function ToppersBlogPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": TITLE, "description": DESC,
    "datePublished": DATE_PUB, "dateModified": DATE_MOD,
    "author":    { "@type": "Organization", "name": "Vision Coaching Institute", "url": SITE_URL },
    "publisher": { "@type": "Organization", "name": "Vision Coaching Institute", "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` } },
    "image": `${SITE_URL}/og-image.png`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_URL}${SLUG}` },
    "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": CRUMBS.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.label, "item": `${SITE_URL}${c.href === "/" ? "" : c.href}` })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "Student Stories", readTime: "6 min read", lastUpdated: "March 2026", isArticle: true }}
        title="Top Scoring Students from Tulsipur — Class of 2024"
        subtitle="How students from Tulsipur, Balrampur and surrounding areas achieved outstanding board exam results through smart preparation, consistent effort and expert coaching at Vision Coaching Institute."
        ctaTitle="Your Child Could Be the Next Topper from Tulsipur"
        ctaBody="Every student in this article started exactly where your child is now. The right guidance changes everything — and the first step is a free demo class."
      >
        <StatGrid stats={[
          { value: "98.6%", label: "Highest Score 2024" },
          { value: "95%",   label: "Overall Pass Rate"  },
          { value: "500+",  label: "Students Coached"   },
          { value: "4",     label: "Boards Covered"     },
        ]} />

        <P>
          Every board exam season, a number of students from Tulsipur and the surrounding Balrampur
          district achieve results that their families did not think were possible when they first
          walked into a coaching class. This is the story of the 2024 batch — who they are, what
          they achieved, and — more importantly — how they did it.
        </P>

        <H2>Aarav Gupta — 98.6% in CBSE Class 12</H2>
        <P>
          Aarav came to Vision Coaching Institute in Tulsipur at the start of Class 11 with a
          strong interest in Physics but inconsistent Chemistry scores. Over two years, daily
          doubt-solving sessions and weekly chapter tests helped him eliminate his weak areas
          systematically. By the time he sat his Class 12 CBSE boards in 2024, he had completed
          over 200 hours of practice within the coaching programme.
        </P>
        <P>
          His final score of <strong>98.6%</strong> in CBSE Class 12 (PCM stream) was the
          highest result from our Tulsipur centre that year.
        </P>
        <InfoBox icon="💬" title='Aarav says:'
          body='"The weekly tests at Vision Coaching were the most important thing. They forced me to study chapter by chapter rather than leaving everything for the last month. By November I already knew my weak topics, and I fixed them before boards."' />

        <H2>Priya Tiwari — 97.2% in ISC Class 12</H2>
        <P>
          Priya enrolled in our Senior PCB batch in Tulsipur at the beginning of Class 12 after
          struggling with Biology in Class 11. Within three months of structured coaching,
          her Biology scores in weekly tests had risen from 55% to consistently above 80%.
        </P>
        <P>
          Her ISC Class 12 score of <strong>97.2%</strong> placed her among the top ISC
          performers in Balrampur district.
        </P>
        <InfoBox icon="💬" title='Priya says:'
          body='"I used to think Biology was all about mugging up. The way Biology is taught at Vision Coaching — with diagrams and process logic — changed my approach completely. I started understanding it instead of memorising it, and the marks followed."' />

        <H2>Rahul Mishra — 95.8% in UP Board Class 12</H2>
        <P>
          Rahul is from a village near Tulsipur and had studied in a Hindi-medium school throughout.
          His concern when joining Vision Coaching was whether he could keep up with students from
          English-medium backgrounds. Our bilingual teaching approach — where concepts are explained
          in whichever language the student is comfortable with — meant he never felt left behind.
        </P>
        <P>
          Rahul's <strong>95.8%</strong> in UP Board Class 12 (PCB) in 2024 was a personal milestone
          and a source of pride for his family in Tulsipur.
        </P>
        <InfoBox icon="💬" title='Rahul says:'
          body='"The teachers here never made me feel like Hindi was a disadvantage. I asked questions in Hindi and they explained in Hindi. By the end, I could read and write answers in English too because I understood the concepts — not because I memorised translations."' />

        <H2>Ananya Singh &amp; Vikash Yadav — Class 10 Toppers 2023</H2>
        <P>
          Ananya (96.4% in ICSE) and Vikash (94.2% in CBSE) both completed our Pre-Board
          batch for Classes 9–10. Both joined at the beginning of Class 9 — giving the coaching
          programme two full years to work.
        </P>
        <P>
          Their consistent weekly test performance flagged weak areas early — Vikash in
          Trigonometry, Ananya in Chemistry. By the time board exams arrived, both had addressed
          their gaps so thoroughly that those subjects became their highest-scoring papers.
        </P>

        <H2>What These Results Have in Common</H2>
        <H3>1. They Joined Early</H3>
        <P>
          Every student above joined at the beginning of a class, not 3 months before boards.
          Quality coaching takes time to work — it changes study habits, fills conceptual gaps
          and builds exam confidence through repetition.
        </P>
        <H3>2. They Attended Every Session</H3>
        <P>
          Attendance in a small batch coaching class in Tulsipur is not like sitting in a
          school lecture where you can catch up later. Each session builds on the previous one.
          Consistent attendance is non-negotiable for top results.
        </P>
        <H3>3. They Used the Doubt Sessions</H3>
        <P>
          Every one of these students actively used the daily doubt-clearing sessions after
          lectures. The students who achieve the highest results are not necessarily the
          most naturally talented — they are the ones who leave no unresolved question
          for exam day.
        </P>

        <UL items={[
          "Join at the beginning of the academic year — give coaching time to work",
          "Attend every session — small batches mean every absence creates a visible gap",
          "Use doubt sessions daily — no question is too small to ask",
          "Take weekly tests seriously — they are the most accurate predictor of board performance",
          "Trust the process — results compound slowly then all at once",
        ]} />

        <H2>Who Is the Next Topper from Tulsipur?</H2>
        <P>
          The students in this article all started from the same place your child is starting
          from right now. What separated them was a decision — to take their preparation seriously
          and to get the right support. Vision Coaching Institute in Tulsipur has been that
          support for hundreds of students across Balrampur district.
        </P>
        <P>
          See our full <InternalLink href="/results">Results page</InternalLink>, read about
          our <InternalLink href="/#faculty">faculty</InternalLink>, or
          visit <InternalLink href="/#courses">Courses</InternalLink> to explore
          what we teach. The first class is free — walk in any Saturday.
        </P>
      </ContentPageShell>
    </>
  );
}

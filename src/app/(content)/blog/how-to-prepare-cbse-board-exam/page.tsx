import type { Metadata } from "next";
import ContentPageShell, {
  H2, H3, P, UL, InfoBox, InternalLink,
} from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const SLUG     = "/blog/how-to-prepare-cbse-board-exam";
const TITLE    = "How to Prepare for CBSE Board Exams | Vision Coaching Tulsipur";
const DESC     =
  "Expert tips on subject-wise strategy, study schedule, mock tests and exam-day advice " +
  "for CBSE Class 10 & 12 students. From the faculty at Vision Coaching Institute, Tulsipur, UP.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords: [
    "CBSE board exam preparation","how to prepare CBSE board","CBSE Class 10 tips",
    "CBSE Class 12 tips","board exam study schedule","CBSE mock test strategy",
    "coaching Tulsipur CBSE","Vision Coaching study tips",
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
  { label: "How to Prepare for CBSE Board Exams", href: SLUG },
];

export default function CBSEBoardPrepPost() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Prepare for CBSE Board Exams",
    "description": DESC,
    "url": `${SITE_URL}${SLUG}`,
    "datePublished": "2026-02-10",
    "dateModified": "2026-02-10",
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
        meta={{ badge: "Study Tips", lastUpdated: "10 Feb 2026" }}
        title="How to Prepare for CBSE Board Exams"
        subtitle="A subject-wise strategy guide from the faculty at Vision Coaching Institute, Tulsipur — covering study schedules, mock tests and exam-day habits that consistently produce 90%+ scores."
        ctaTitle="Need Guided CBSE Coaching in Tulsipur?"
        ctaBody="Join our small-batch CBSE coaching at Vision Coaching Institute, Purani Bazar, Tulsipur. Free demo class every Saturday — no commitment required."
      >
        <H2>Start with the NCERT — Always</H2>
        <P>
          The single most important advice for any CBSE student is this: the NCERT textbook
          is the board exam. Every question in the CBSE Class 10 and Class 12 paper — including
          the application-based and case-study questions — traces back to an NCERT concept.
          Students who complete NCERT thoroughly before touching any guide book consistently
          outperform those who jump straight to reference books.
        </P>
        <P>
          At Vision Coaching Institute in Tulsipur, every lecture begins with the NCERT
          paragraph. Only after the concept is clear do we move to additional questions.
        </P>

        <H2>Build a Realistic Study Schedule</H2>
        <H3>6 Months Before Boards</H3>
        <UL items={[
          "Complete the full syllabus — one chapter per subject every week",
          "Maintain a doubt notebook — write every unresolved question immediately",
          "Attend every coaching class; do not skip for revisions (revise at home instead)",
          "Solve 2–3 NCERT exercises per chapter on the same day they are taught",
        ]} />

        <H3>3 Months Before Boards</H3>
        <UL items={[
          "Begin the first full revision — chapter summaries and formula sheets",
          "Start solving previous 5 years' question papers under timed conditions",
          "Identify your weak chapters via test scores and give them extra time",
          "Increase sleep to at least 7 hours — this is when memory consolidates",
        ]} />

        <H3>1 Month Before Boards</H3>
        <UL items={[
          "Do NOT start new topics — revise what you already know",
          "Complete at least 2 full mock exams per subject in board-exam format",
          "Practise answer writing: diagrams, headings, numbered steps, word limits",
          "Solve the last 3 years' CBSE board question papers — focus on marking patterns",
        ]} />

        <H2>Subject-Wise Strategy</H2>

        <H3>Mathematics</H3>
        <P>
          Maths is entirely about practice. Solve every NCERT example and exercise — not just
          read them. For Class 12, Chapter-wise Probability, Integration and Matrices are
          high-weightage and predictable. Use the marking scheme from previous years to understand
          step-wise marks — even a wrong final answer earns partial credit if steps are shown.
        </P>

        <H3>Physics</H3>
        <P>
          Physics requires both conceptual understanding and numerical fluency. Write all formulae
          in a single sheet and revise daily. For Class 12, Electrostatics, Current Electricity and
          Optics together carry over 30 marks. Derivations must be memorised — they appear verbatim
          in the board paper.
        </P>

        <H3>Chemistry</H3>
        <P>
          Divide Chemistry into three parts: Physical (numerical-heavy), Organic (mechanism-based)
          and Inorganic (memory-based). Inorganic Chemistry — particularly p-block and d-block
          elements — is easiest to score in with regular revision. NCERT reactions in Organic
          Chemistry are directly quoted in board questions.
        </P>

        <H3>Biology</H3>
        <P>
          Biology is a high-scoring subject for students who read NCERT carefully and draw
          clean, labelled diagrams. Every diagram in NCERT is a potential 2–3 mark question.
          Genetics, Reproduction and Ecology together account for nearly 50 marks in Class 12.
          Make flowcharts for cycles (nitrogen, carbon, water) — they simplify revision.
        </P>

        <InfoBox icon="⏱️" title="The 1-Hour Mock Rule"
          body="Sit at your study table at 10:30 AM (the same time as the board exam) and solve one past paper under strict time conditions once a week from November onwards. This trains your brain to perform at peak during the actual exam time." />

        <H2>Exam-Day Habits That Cost Marks</H2>
        <UL items={[
          "Not reading the question paper for the first 15 minutes (use this time — it is free)",
          "Writing long answers for 1-mark questions — answer in one line and move on",
          "Skipping diagrams in Biology and Physics (each diagram is worth 1–2 marks)",
          "Attempting questions in the wrong order — attempt your strongest section first",
          "Leaving blank spaces — attempt everything; partial marks are real marks",
        ]} />

        <H2>One Final Point — Consistent Coaching Beats Last-Minute Cramming</H2>
        <P>
          Students who attend regular coaching throughout the year — solving doubts as they arise,
          taking weekly tests and getting faculty feedback — consistently score higher than students
          who study alone for long hours only in the final weeks. This is the core reason why our
          students at Vision Coaching in Tulsipur have maintained a 95%+ pass rate across CBSE,
          ISC, ICSE and UP Board every year.
        </P>
        <P>
          If you are looking for structured CBSE coaching in Tulsipur, visit our{" "}
          <InternalLink href="/cbse-coaching-tulsipur">CBSE Coaching page</InternalLink> or
          check our <InternalLink href="/#fees">fee structure</InternalLink> and book a free
          demo class — call or WhatsApp +91 72104 33685.
        </P>
      </ContentPageShell>
    </>
  );
}

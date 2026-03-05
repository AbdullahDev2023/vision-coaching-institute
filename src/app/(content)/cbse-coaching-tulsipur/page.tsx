import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "CBSE Coaching in Tulsipur | Classes 6–12 | Vision Institute";
const DESC     = "Looking for the best CBSE coaching in Tulsipur? Vision Coaching Institute offers expert CBSE tuition for Classes 6–12 in Maths, Physics, Chemistry & Biology. Small batches, daily doubt-solving, free demo. Purani Bazar, Tulsipur, UP.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["CBSE coaching Tulsipur","CBSE tuition Tulsipur","CBSE classes Tulsipur UP","class 6 to 12 CBSE coaching","best CBSE coaching Tulsipur","CBSE board coaching Uttar Pradesh","PCB coaching Tulsipur","PCM coaching Tulsipur"],
  alternates:  { canonical: `${SITE_URL}/cbse-coaching-tulsipur` },
  openGraph: {
    title:       TITLE, description: DESC, url: `${SITE_URL}/cbse-coaching-tulsipur`,
    siteName:    "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "website",
  },
};

const CRUMBS = [
  { label: "Home",           href: "/" },
  { label: "CBSE Coaching",  href: "/cbse-coaching-tulsipur" },
];

export default function CBSECoachingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type":    "EducationalOrganization",
    "name":     "Vision Coaching Institute — CBSE Coaching Tulsipur",
    "url":      `${SITE_URL}/cbse-coaching-tulsipur`,
    "description": DESC,
    "address": {
      "@type": "PostalAddress", "streetAddress": "Purani Bazar",
      "addressLocality": "Tulsipur", "addressRegion": "Uttar Pradesh",
      "postalCode": "271208", "addressCountry": "IN",
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": CRUMBS.map((c, i) => ({
        "@type": "ListItem", "position": i + 1, "name": c.label,
        "item":  `${SITE_URL}${c.href === "/" ? "" : c.href}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "CBSE Coaching", lastUpdated: "March 2026" }}
        title="Expert CBSE Coaching in Tulsipur"
        subtitle="Dedicated CBSE tuition for Classes 6–12 in Maths, Physics, Chemistry and Biology — with small batches, experienced faculty and a proven track record of top results at Vision Coaching Institute, Tulsipur."
        ctaTitle="Join the Best CBSE Coaching in Tulsipur"
        ctaBody="Free demo class available every Saturday. No commitment — walk in, attend, and decide for yourself."
      >
        <StatGrid stats={[
          { value: "500+", label: "Students Taught" },
          { value: "95%",  label: "Pass Rate"        },
          { value: "4",    label: "CBSE Subjects"    },
          { value: "Free", label: "Demo Class"       },
        ]} />

        <H2>Why CBSE Students in Tulsipur Choose Vision Coaching</H2>
        <P>
          The Central Board of Secondary Education (CBSE) curriculum demands consistent practice,
          conceptual clarity and strong fundamentals — and that is exactly what Vision Coaching
          Institute in Tulsipur has been delivering since day one. Our CBSE coaching programme is
          built around the specific needs of students from Class 6 through Class 12, covering every
          chapter, every concept and every board-pattern question type.
        </P>
        <P>
          Located at Purani Bazar, Tulsipur, we serve students not only from Tulsipur itself but
          also from neighbouring areas of Balrampur, Gonda, Bahraich and Shravasti who need
          serious CBSE preparation.
        </P>

        <H2>CBSE Subjects We Cover</H2>
        <P>Our CBSE coaching covers all four core science and mathematics subjects from Class 6 to Class 12:</P>
        <UL items={[
          "Mathematics — NCERT-aligned theory, board-pattern problems, full mock tests",
          "Physics — concept-first teaching, derivations, numericals, previous year papers",
          "Chemistry — organic, inorganic & physical chemistry with lab-linked explanations",
          "Biology — diagram-based learning, NCERT mastery, board-mark scoring strategies",
        ]} />

        <H2>Classes We Teach (CBSE)</H2>

        <H3>Classes 6, 7 &amp; 8 — Foundation Batch</H3>
        <P>
          Building the right base early is everything in CBSE. Our Foundation Batch for Classes 6–8
          focuses on NCERT textbook mastery, strong mathematical reasoning and a clear understanding
          of science concepts before the syllabus gets demanding. Batch size is capped at 20 students
          for maximum attention.
        </P>

        <H3>Classes 9 &amp; 10 — Pre-Board Batch</H3>
        <P>
          Class 10 is the first major board examination for CBSE students. Our Pre-Board batch in
          Tulsipur prepares students through chapter-wise tests, full syllabus mock exams and detailed
          performance analysis. We cover CBSE Class 9 and 10 thoroughly so students enter the board
          hall with confidence.
        </P>

        <H3>Classes 11 &amp; 12 — Senior Science Batch</H3>
        <P>
          CBSE Class 12 determines college admissions. Our Senior Batch covers PCB (Physics,
          Chemistry, Biology) for medical aspirants and PCM (Physics, Chemistry, Maths) for
          engineering aspirants. Small batches of maximum 12 students ensure individual attention
          and focused doubt-clearing every single day.
        </P>

        <H2>Our Approach to CBSE Preparation</H2>
        <UL items={[
          "NCERT-first methodology — every concept taught from the board's own textbook",
          "Daily doubt-solving sessions after every lecture — no question left unanswered",
          "Weekly chapter tests with detailed feedback and performance tracking",
          "Full-length board mock exams in the actual CBSE answer-writing format",
          "Previous 10 years' board paper analysis integrated into each topic",
          "Individual progress reports shared with parents every month",
        ]} />

        <InfoBox icon="🏆" title="95% Pass Rate in CBSE Board Exams"
          body="Students coached at Vision Coaching Institute, Tulsipur, have consistently scored 90%+ in CBSE board exams. Our topper Aarav Gupta scored 98.6% in CBSE Class 12 in 2024." />

        <H2>Our CBSE Faculty in Tulsipur</H2>
        <P>
          Every teacher at Vision Coaching Institute holds a postgraduate degree in their subject
          along with a B.Ed qualification. Our physics faculty brings 10+ years of CBSE teaching
          experience; our chemistry and biology teachers have guided hundreds of students through
          board and competitive exam preparation.
        </P>
        <P>
          Visit our <InternalLink href="/#faculty">Faculty page</InternalLink> to meet the team,
          or check our <InternalLink href="/#results">Results page</InternalLink> to see what
          our CBSE students have achieved.
        </P>

        <H2>Batch Timings for CBSE Students</H2>
        <UL items={[
          "Classes 6–8 (Foundation): 7:00 AM – 9:00 AM, Monday to Saturday",
          "Classes 9–10 (Pre-Board): 9:30 AM – 11:30 AM, Monday to Saturday",
          "Classes 11–12 (Senior): 5:00 PM – 7:00 PM, Monday to Saturday",
          "Free Demo Class: Every Saturday (call to book your slot)",
        ]} />

        <H2>Fees for CBSE Coaching in Tulsipur</H2>
        <P>
          Our CBSE coaching fees are kept affordable and transparent — no hidden charges, no annual
          fees beyond what is stated. See our full <InternalLink href="/#fees">Fee Structure</InternalLink> for
          month-wise pricing for each batch.
        </P>

        <InfoBox icon="📍" title="Location — Purani Bazar, Tulsipur"
          body="Vision Coaching Institute is located at Purani Bazar, Tulsipur, Balrampur, Uttar Pradesh 271208. Easily accessible from all parts of Tulsipur and nearby towns." />

        <H2>Frequently Asked Questions — CBSE Coaching Tulsipur</H2>

        <H3>Does Vision Coaching follow the latest CBSE syllabus?</H3>
        <P>Yes. Our curriculum is updated every academic year to match the latest CBSE board syllabus, including any NCERT revisions.</P>

        <H3>Is there a free demo class before enrolment?</H3>
        <P>Absolutely. We offer a free demo class every Saturday for all new students. Call or WhatsApp +91 72104 33685 to book your slot.</P>

        <H3>What is the batch size for CBSE coaching?</H3>
        <P>We maintain a strict cap: maximum 20 students for Classes 6–8, 15 for Classes 9–10, and 12 for Classes 11–12. This ensures every student gets personal attention.</P>

        <H3>Do you provide study materials?</H3>
        <P>Yes. Printed notes, chapter summaries and practice question sets are provided as part of the course. Students also work through full NCERT textbooks in class.</P>
      </ContentPageShell>
    </>
  );
}

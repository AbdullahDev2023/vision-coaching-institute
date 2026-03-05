import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "UP Board Coaching in Tulsipur | Classes 6–12 | Vision Institute";
const DESC     = "Best UP Board coaching in Tulsipur for Classes 6–12. Expert tuition in Maths, Physics, Chemistry & Biology aligned with UP Madhyamik Shiksha Parishad syllabus. Small batches, daily doubt sessions. Purani Bazar, Tulsipur, UP.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["UP Board coaching Tulsipur","UP Board tuition Tulsipur","Madhyamik coaching Tulsipur","UP board class 10 coaching","UP board class 12 coaching","yupboard coaching Uttar Pradesh","coaching Tulsipur UP","best UP board classes Tulsipur"],
  alternates:  { canonical: `${SITE_URL}/up-board-coaching-tulsipur` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}/up-board-coaching-tulsipur`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "website",
  },
};

const CRUMBS = [
  { label: "Home",             href: "/" },
  { label: "UP Board Coaching",href: "/up-board-coaching-tulsipur" },
];

export default function UPBoardCoachingPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "EducationalOrganization",
    "name": "Vision Coaching Institute — UP Board Coaching Tulsipur",
    "url":  `${SITE_URL}/up-board-coaching-tulsipur`, "description": DESC,
    "address": { "@type": "PostalAddress", "streetAddress": "Purani Bazar", "addressLocality": "Tulsipur", "addressRegion": "Uttar Pradesh", "postalCode": "271208", "addressCountry": "IN" },
    "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": CRUMBS.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.label, "item": `${SITE_URL}${c.href === "/" ? "" : c.href}` })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "UP Board Coaching", lastUpdated: "March 2026" }}
        title="UP Board Coaching in Tulsipur — Classes 6 to 12"
        subtitle="Comprehensive UP Madhyamik Shiksha Parishad coaching for Classes 6–12 at Vision Coaching Institute, Tulsipur. Expert faculty, syllabus-specific preparation and result-proven teaching — in Hindi and English."
        ctaTitle="Enrol for UP Board Coaching in Tulsipur Today"
        ctaBody="Seats are limited per batch. Book your free demo class on WhatsApp and secure your place before the session fills up."
      >
        <StatGrid stats={[
          { value: "500+", label: "Students"    },
          { value: "95%",  label: "Pass Rate"   },
          { value: "6–12", label: "Classes"     },
          { value: "2",    label: "Languages"   },
        ]} />

        <H2>Dedicated UP Board Coaching at Vision, Tulsipur</H2>
        <P>
          Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP) — commonly called UP Board — is the
          examination board for the majority of students in Tulsipur and across Balrampur district.
          Its syllabus, question patterns and answer-writing expectations are distinct from CBSE or
          ICSE, which is why students preparing for UP Board need coaching that is specifically
          designed for it.
        </P>
        <P>
          Vision Coaching Institute in Tulsipur has been a trusted name for UP Board students from
          Classes 6 through 12. Our teachers understand the exact marking scheme, the weight given
          to diagram-based answers, and the Hindi-medium requirement for many UP Board papers. We
          teach in both Hindi and English so every student follows at their comfort level.
        </P>

        <H2>Subjects Covered in UP Board Coaching</H2>
        <UL items={[
          "Mathematics (Ganit) — thorough NCERT + UP Board pattern problems for Classes 6–12",
          "Physics (Bhautiki) — theory, numerical problems and derivations per UP Board syllabus",
          "Chemistry (Rasayan Vigyan) — organic, inorganic and physical chemistry, board-focused",
          "Biology (Jeev Vigyan) — NCERT diagrams, chapter-wise mastery, board scoring strategies",
        ]} />

        <H2>Batch Structure for UP Board Students</H2>

        <H3>Classes 6 to 8 — Foundation</H3>
        <P>
          UP Board foundation coaching builds strong subject-level understanding before the syllabus
          intensifies. Our Classes 6–8 batch in Tulsipur focuses on conceptual clarity, regular
          revision and building the habit of systematic study — all within a batch of maximum 20 students.
        </P>

        <H3>Classes 9 &amp; 10 — Board Preparation</H3>
        <P>
          UP Board Class 10 (High School) is the first public board examination. Our Class 9–10
          coaching in Tulsipur covers the full UPMSP syllabus with chapter-wise tests, full mock
          exams and answer-writing technique specifically for UP Board's marking scheme. Students
          learn how to score maximum marks in subjective questions.
        </P>

        <H3>Classes 11 &amp; 12 — Intermediate Preparation</H3>
        <P>
          UP Board Intermediate (Class 12) results determine admissions to colleges across Uttar Pradesh.
          Our Class 11–12 coaching covers the full Intermediate syllabus in Physics, Chemistry,
          Biology and Mathematics. Batch size is capped at 12 to ensure intensive individual attention.
        </P>

        <H2>Why Vision Coaching Is the Right Choice for UP Board in Tulsipur</H2>
        <UL items={[
          "Teachers fully trained in UP Board syllabus and UPMSP answer-writing patterns",
          "Teaching medium: Hindi and English — student chooses what works best",
          "Daily doubt-solving sessions — every concept cleared before moving forward",
          "Weekly chapter tests with detailed performance feedback and progress reports",
          "Full-length UPMSP mock exams in exam-hall conditions",
          "Previous 10 years' UP Board paper analysis woven into every chapter",
          "Small batch sizes for maximum personal attention and engagement",
        ]} />

        <InfoBox icon="📝" title="UP Board Answer Writing Strategy"
          body="UP Board examiners award marks for structured, point-wise answers with correct headings and diagrams. Our teachers specifically train students in this format — a skill that can add 15–25 marks in board exams." />

        <H2>Location and Timings</H2>
        <P>
          Vision Coaching Institute is located at Purani Bazar, Tulsipur, Balrampur district, UP 271208.
          We are easily reachable from all areas within Tulsipur and nearby towns including Utraula,
          Pachperwa and Tulsipur khatima road areas.
        </P>
        <UL items={[
          "Classes 6–8: 7:00 AM – 9:00 AM | Mon–Sat",
          "Classes 9–10: 9:30 AM – 11:30 AM | Mon–Sat",
          "Classes 11–12: 5:00 PM – 7:00 PM | Mon–Sat",
          "Free Demo: Every Saturday — call +91 72104 33685 to book",
        ]} />

        <InfoBox icon="💬" title="Teaching in Hindi & English"
          body="Many UP Board students are more comfortable studying in Hindi. At Vision Coaching Institute, Tulsipur, our faculty explains concepts in whichever language the student finds clearest — ensuring no student is left behind due to language barriers." />

        <H2>View Our Results &amp; Courses</H2>
        <P>
          To see detailed UP Board results and topper profiles from our students, visit
          our <InternalLink href="/#results">Results section</InternalLink>. For detailed course
          offerings and fee information,
          see <InternalLink href="/#courses">Courses</InternalLink> and <InternalLink href="/#fees">Fee Structure</InternalLink>.
        </P>
      </ContentPageShell>
    </>
  );
}

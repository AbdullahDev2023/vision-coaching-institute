import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "Class 10 Science Coaching in Tulsipur | CBSE UP Board | Vision";
const DESC     = "Expert Class 10 Science coaching in Tulsipur for CBSE & UP Board. Maths, Physics, Chemistry, Biology with small batches, daily doubt-solving & board mock tests. Vision Coaching Institute, Purani Bazar, Tulsipur, UP.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["class 10 science coaching Tulsipur","class 10 coaching Tulsipur","class 10 maths coaching Tulsipur","class 10 board exam preparation Tulsipur","CBSE class 10 coaching UP","UP board class 10 coaching Tulsipur","science tuition Tulsipur class 10"],
  alternates:  { canonical: `${SITE_URL}/class-10-science-coaching` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}/class-10-science-coaching`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Class 10 Science Coaching Tulsipur — Vision Coaching Institute" }],
    locale: "en_IN", type: "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:        TITLE,
    description:  DESC,
    images:      [`${SITE_URL}/opengraph-image`],
  },
};

const CRUMBS = [
  { label: "Home",                    href: "/" },
  { label: "Class 10 Science Coaching", href: "/class-10-science-coaching" },
];

export default function Class10Page() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Course",
    "name":     "Class 10 Science & Maths Coaching — Tulsipur",
    "description": DESC,
    "provider": { "@type": "EducationalOrganization", "name": "Vision Coaching Institute", "url": SITE_URL },
    "offers":   { "@type": "Offer", "price": "1500", "priceCurrency": "INR", "availability": "https://schema.org/LimitedAvailability", "url": `${SITE_URL}/class-10-science-coaching` },
    "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "Onsite", "location": { "@type": "Place", "name": "Vision Coaching Institute, Tulsipur", "address": { "@type": "PostalAddress", "addressLocality": "Tulsipur", "addressRegion": "Uttar Pradesh", "addressCountry": "IN" } } },
    "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": CRUMBS.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.label, "item": `${SITE_URL}${c.href === "/" ? "" : c.href}` })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "Class 10 Coaching", lastUpdated: "March 2026" }}
        title="Class 10 Science Coaching in Tulsipur"
        subtitle="Board exam preparation for Class 10 students across CBSE and UP Board. Maths, Physics, Chemistry and Biology — taught by expert faculty in small batches at Vision Coaching Institute, Tulsipur."
        ctaTitle="Prepare for Class 10 Boards with Vision Coaching, Tulsipur"
        ctaBody="Seats in our Class 9–10 batch are limited to 15 students. Book your free demo today and see the Vision difference."
      >
        <StatGrid stats={[
          { value: "95%",  label: "Pass Rate"     },
          { value: "15",   label: "Max Batch Size"},
          { value: "10+",  label: "Yrs Experience"},
          { value: "Free", label: "Demo Class"    },
        ]} />

        <H2>Why Class 10 Matters — and Why You Need the Right Coaching</H2>
        <P>
          Class 10 board examinations — whether CBSE or UP Board — are the first major academic
          milestone in a student's life. The marks earned in Class 10 determine school-level
          recognition, build the confidence needed for Class 11–12, and shape the stream choices
          (Science, Commerce, Arts) that define a student's career path.
        </P>
        <P>
          At Vision Coaching Institute in Tulsipur, we have designed our Class 9–10 Pre-Board
          batch specifically around what board examiners look for. Our students do not just
          study — they learn how to perform in an exam hall.
        </P>

        <H2>Subjects in Our Class 10 Coaching Batch</H2>

        <H3>Mathematics</H3>
        <P>
          Mathematics is often the subject where the most marks are gained or lost in Class 10 boards.
          Our Maths coaching in Tulsipur covers NCERT-aligned topics — Real Numbers, Polynomials,
          Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry,
          Circles, Areas and Volumes, Statistics and Probability — with rigorous practice of
          board-format multi-step problems.
        </P>

        <H3>Science (Physics, Chemistry, Biology)</H3>
        <P>
          Class 10 Science is a combined paper covering Physics (Light, Electricity, Magnetic Effects),
          Chemistry (Chemical Reactions, Acids-Bases, Metals, Carbon Compounds) and Biology
          (Life Processes, Reproduction, Heredity, Environment). Our teachers dedicate separate
          focused sessions to each domain so no topic is glossed over.
        </P>

        <H2>Our Board Exam Preparation Strategy</H2>
        <UL items={[
          "Chapter-by-chapter teaching aligned to CBSE/UP Board exam weightage",
          "Board-pattern answer writing — full marks techniques for 3-mark and 5-mark questions",
          "Weekly tests after every 3–4 chapters with detailed error analysis",
          "3 full-length mock exams in the final 60 days before boards",
          "Special diagram and map revision sessions for Science and Social Science",
          "Previous 10 years' board paper solving — identifying high-frequency questions",
          "Parent progress report shared monthly so families track improvement",
        ]} />

        <InfoBox icon="📊" title="Board Exam Pattern Focus"
          body="We analyse CBSE and UP Board question patterns each year. Students at Vision Coaching, Tulsipur, learn exactly which chapter combinations appear most, how to allocate time in the exam, and how to structure answers for maximum marks." />

        <H2>Small Batches — Personal Attention for Every Class 10 Student</H2>
        <P>
          Our Class 9–10 batch in Tulsipur is capped at 15 students. This is a deliberate choice.
          A small batch means every student's doubt gets addressed in the same session — not
          deferred to the next day. Our teachers know every student by name, track their weekly
          performance, and proactively reach out when someone falls behind.
        </P>

        <H2>Daily Doubt Solving</H2>
        <P>
          After every lecture, a dedicated 20–30 minute doubt session is held. Students can also
          send questions via WhatsApp to their subject teacher for quick resolution between classes.
          No exam-month surprise gaps — every concept is cleared when it is taught.
        </P>

        <InfoBox icon="🎯" title="Topper from Our Batch"
          body="Vikash Yadav scored 94.2% in CBSE Class 10 (2023) after just one year of coaching at Vision Coaching Institute, Tulsipur. Ananya Singh scored 96.4% in ICSE Class 10 the same year." />

        <H2>Batch Timings &amp; Fees</H2>
        <P>
          The Class 9–10 (Pre-Board) batch runs from <strong>9:30 AM to 11:30 AM, Monday to Saturday</strong>.
          Monthly fee is <strong>₹1,500</strong> — covering all four subjects, weekly tests, study
          material and doubt sessions. See the full <InternalLink href="/#fees">fee breakdown</InternalLink> or
          check available <InternalLink href="/#courses">course details</InternalLink>.
        </P>

        <H3>How to Enrol</H3>
        <P>
          Call or WhatsApp <strong>+91 72104 33685</strong>. Attend a free Saturday demo class, and if
          you are satisfied, your admission is done the same day. We are located at Purani Bazar,
          Tulsipur, Balrampur, UP 271208.
        </P>
      </ContentPageShell>
    </>
  );
}

import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "Class 12 PCB Coaching in Tulsipur | Physics Chemistry Biology | Vision";
const DESC     = "Top Class 12 PCB coaching in Tulsipur for CBSE, ISC & UP Board. Expert Physics, Chemistry & Biology tuition for board exams and NEET foundation. Small batches of 12. Vision Coaching Institute, Tulsipur, UP.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["class 12 PCB coaching Tulsipur","PCB coaching Tulsipur","physics chemistry biology coaching Tulsipur","NEET coaching Tulsipur","class 12 science coaching Tulsipur","class 11 12 coaching Tulsipur UP","ISC coaching Tulsipur","CBSE class 12 science coaching"],
  alternates:  { canonical: `${SITE_URL}/class-12-pcb-coaching` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}/class-12-pcb-coaching`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "website",
  },
};

const CRUMBS = [
  { label: "Home",             href: "/" },
  { label: "Class 12 PCB Coaching", href: "/class-12-pcb-coaching" },
];

export default function Class12PCBPage() {
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Course",
    "name":     "Class 11–12 PCB Coaching — Tulsipur",
    "description": DESC,
    "provider": { "@type": "EducationalOrganization", "name": "Vision Coaching Institute", "url": SITE_URL },
    "offers":   { "@type": "Offer", "price": "2400", "priceCurrency": "INR", "availability": "https://schema.org/LimitedAvailability", "url": `${SITE_URL}/class-12-pcb-coaching` },
    "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "Onsite", "location": { "@type": "Place", "name": "Vision Coaching Institute, Tulsipur", "address": { "@type": "PostalAddress", "addressLocality": "Tulsipur", "addressRegion": "Uttar Pradesh", "addressCountry": "IN" } } },
    "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": CRUMBS.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.label, "item": `${SITE_URL}${c.href === "/" ? "" : c.href}` })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPageShell
        crumbs={CRUMBS}
        meta={{ badge: "Class 12 PCB", lastUpdated: "March 2026" }}
        title="Class 12 PCB Coaching in Tulsipur"
        subtitle="Intensive Physics, Chemistry and Biology coaching for Class 11 & 12 students across CBSE, ISC and UP Board. Expert faculty, maximum 12 students per batch, and a curriculum that prepares you for both board exams and future competitive entrance tests."
        ctaTitle="Book Your Seat — Class 12 PCB Batch, Tulsipur"
        ctaBody="Only 12 seats per batch. Senior Science batches fill up fast. Call or WhatsApp today to reserve your spot and attend a free Saturday demo."
      >
        <StatGrid stats={[
          { value: "12",   label: "Max Batch"    },
          { value: "95%",  label: "Pass Rate"    },
          { value: "3",    label: "PCB Subjects" },
          { value: "₹2,400", label: "Per Month" },
        ]} />

        <H2>PCB in Class 11–12: The Highest-Stakes Two Years</H2>
        <P>
          Class 11 and 12 are the most critical years in a science student's school life. The
          PCB stream — Physics, Chemistry and Biology — lays the foundation not just for
          board exam scores but for NEET aspirations, BSc admissions and any biology-based
          higher education. Getting the right coaching in Tulsipur at this stage is not optional;
          it is essential.
        </P>
        <P>
          Vision Coaching Institute's Senior Science batch is designed specifically for Class 11 and 12
          PCB students. With a hard cap of 12 students per batch and faculty who hold postgraduate
          degrees with 7–10 years of experience, every student in this batch receives a level of
          attention that large coaching centres cannot provide.
        </P>

        <H2>What We Cover — PCB Coaching Syllabus</H2>

        <H3>Physics (Class 11 &amp; 12)</H3>
        <P>
          From Kinematics and Laws of Motion to Electrostatics, Current Electricity, Optics and
          Modern Physics — our Physics coaching in Tulsipur covers the complete CBSE/UP Board
          syllabus. Every chapter includes derivation practice, numerical solving drills and
          board-pattern long answer practice. Concept clarity is built before problem-solving begins.
        </P>

        <H3>Chemistry (Class 11 &amp; 12)</H3>
        <P>
          Physical Chemistry (Thermodynamics, Equilibrium, Electrochemistry), Organic Chemistry
          (complete reaction mechanisms and named reactions) and Inorganic Chemistry (periodic trends,
          coordination compounds, p-block elements) — our Chemistry coaching is thorough, structured
          and anchored to board scoring strategy. Special attention is paid to Organic Chemistry,
          which students consistently find most challenging.
        </P>

        <H3>Biology (Class 11 &amp; 12)</H3>
        <P>
          Biology is a marks-rich subject when taught right. Our Biology sessions in Tulsipur cover
          Cell Biology, Plant &amp; Animal Physiology, Genetics, Evolution, Ecology and Biotechnology
          through diagram-based learning and NCERT mastery. Students learn to write board answers
          that earn full marks — with correct labels, headings and point structure.
        </P>

        <H2>Why Our PCB Batch Is Different</H2>
        <UL items={[
          "Maximum 12 students — every doubt resolved in every session, not deferred",
          "Experienced M.Sc. + B.Ed. faculty for each PCB subject separately",
          "Daily doubt-clearing sessions plus WhatsApp access for between-class questions",
          "Weekly subject-wise tests with full performance analysis report",
          "3 full board mock exams in the 60-day pre-board window",
          "Diagram and practicals revision woven into every Biology chapter",
          "Chapter-wise weightage analysis from 10 years of CBSE/UP Board papers",
          "Individual monthly performance report shared with parents",
        ]} />

        <InfoBox icon="🏆" title="Our Class 12 Toppers"
          body="Priya Tiwari scored 97.2% in ISC Class 12 (2024). Rahul Mishra scored 95.8% in UP Board Class 12 (2024). Both were coached at Vision Coaching Institute, Tulsipur, in our Senior Science batch." />

        <H2>PCB Coaching and NEET Foundation in Tulsipur</H2>
        <P>
          While Vision Coaching Institute focuses on board exam excellence, our PCB syllabus
          coverage naturally builds a foundation for NEET. Students who complete our Class 11–12
          PCB course in Tulsipur develop the conceptual depth in Physics, Chemistry and Biology
          that competitive entrance exams demand. Many of our alumni have gone on to pursue MBBS,
          BDS and pharmacy programmes.
        </P>

        <H2>Timings, Fees &amp; Location</H2>
        <UL items={[
          "Batch timing: 5:00 PM – 7:00 PM, Monday to Saturday",
          "Monthly fee: ₹2,400 (all 3 PCB subjects + study material + weekly tests)",
          "Location: Purani Bazar, Tulsipur, Balrampur, UP 271208",
          "Free demo class every Saturday — call +91 72104 33685",
        ]} />

        <P>
          Full fee details and what is included are listed on
          our <InternalLink href="/#fees">Fees page</InternalLink>. For faculty profiles,
          see <InternalLink href="/#faculty">Meet Our Faculty</InternalLink>.
        </P>

        <H3>Start with a Free Demo Class</H3>
        <P>
          Every new student — Class 11 or 12 — is welcome to attend one free class before
          committing. Walk into our Tulsipur centre on any Saturday or call +91 72104 33685 to
          book your preferred subject session.
        </P>
      </ContentPageShell>
    </>
  );
}

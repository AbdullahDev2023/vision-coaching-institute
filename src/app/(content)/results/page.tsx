import type { Metadata } from "next";
import ContentPageShell, { H2, H3, P, UL, StatGrid, InfoBox, InternalLink } from "@/components/ui/ContentPageShell";

const SITE_URL = "https://www.visioncoachinginstitute.online";
const TITLE    = "Coaching Results 2024–25 | Toppers from Tulsipur | Vision Institute";
const DESC     = "See the results and topper achievements from Vision Coaching Institute, Tulsipur. Our students have scored 95%+ across CBSE, ISC, ICSE and UP Board. Coaching results 2024, 2025 — Tulsipur, Uttar Pradesh.";

export const metadata: Metadata = {
  title:       TITLE,
  description: DESC,
  keywords:    ["coaching results Tulsipur","Vision Coaching toppers Tulsipur","CBSE result coaching Tulsipur","UP board result coaching Tulsipur","best result coaching Tulsipur 2025","top students Tulsipur"],
  alternates:  { canonical: `${SITE_URL}/results` },
  openGraph: {
    title: TITLE, description: DESC, url: `${SITE_URL}/results`,
    siteName: "Vision Coaching Institute",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    locale: "en_IN", type: "website",
  },
};

const CRUMBS = [
  { label: "Home",    href: "/" },
  { label: "Results", href: "/results" },
];

const TOPPERS_2024 = [
  { name: "Aarav Gupta",  board: "CBSE",     pct: "98.6%", class: "12th", subject: "PCM" },
  { name: "Priya Tiwari", board: "ISC",      pct: "97.2%", class: "12th", subject: "PCB" },
  { name: "Rahul Mishra", board: "UP Board", pct: "95.8%", class: "12th", subject: "PCB" },
];
const TOPPERS_2023 = [
  { name: "Ananya Singh",  board: "ICSE",    pct: "96.4%", class: "10th", subject: "Science" },
  { name: "Vikash Yadav",  board: "CBSE",    pct: "94.2%", class: "10th", subject: "Science" },
  { name: "Nisha Pandey",  board: "ISC",     pct: "93.8%", class: "12th", subject: "PCB"     },
];

const BOARD_COLOR: Record<string, string> = {
  CBSE: "#4488ff", ISC: "#D4A017", ICSE: "#44ddaa", "UP Board": "#ff6688",
};

function TopperCard({ name, board, pct, cls, subject }: { name: string; board: string; pct: string; cls: string; subject: string }) {
  const color = BOARD_COLOR[board] ?? "#aaa";
  return (
    <div style={{ border: `1px solid ${color}40`, borderRadius: "0.875rem", padding: "1.25rem 1.5rem", background: `${color}08`, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color, textTransform: "uppercase" }}>{board} · {cls}</span>
      <strong style={{ fontSize: "1.05rem", color: "#0A1F5C", fontWeight: 700 }}>{name}</strong>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#6B7280", fontSize: "0.82rem" }}>{subject}</span>
        <span style={{ fontSize: "1.3rem", fontWeight: 800, color, fontFamily: "var(--font-playfair,serif)" }}>{pct}</span>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <ContentPageShell
      crumbs={CRUMBS}
      meta={{ badge: "Student Results", lastUpdated: "March 2026" }}
      title="Vision Coaching Results — Toppers & Achievers"
      subtitle="Every year, students from Vision Coaching Institute in Tulsipur achieve outstanding results in CBSE, ICSE, ISC and UP Board examinations. This page celebrates their hard work."
      ctaTitle="Be the Next Topper from Tulsipur"
      ctaBody="Our proven teaching method, small batches and daily doubt-solving have produced consistent top results. Join us — first demo class is free."
    >
      <StatGrid stats={[
        { value: "500+", label: "Students Taught"  },
        { value: "95%",  label: "Overall Pass Rate" },
        { value: "10+",  label: "Years of Results"  },
        { value: "4",    label: "Boards Covered"    },
      ]} />

      <H2>Board Exam Results 2024</H2>
      <P>Here are some of our top-scoring students from the 2024 board exam cycle:</P>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        {TOPPERS_2024.map(t => <TopperCard key={t.name} name={t.name} board={t.board} pct={t.pct} cls={t.class} subject={t.subject} />)}
      </div>

      <H2>Board Exam Results 2023</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1rem", margin: "1.5rem 0" }}>
        {TOPPERS_2023.map(t => <TopperCard key={t.name} name={t.name} board={t.board} pct={t.pct} cls={t.class} subject={t.subject} />)}
      </div>

      <H2>Board-Wise Performance at a Glance</H2>
      <UL items={[
        "CBSE — Multiple students scoring 90%+ in Classes 10 and 12 every year",
        "ISC — Consistent 93%+ results in PCB stream from our Senior batch",
        "ICSE — Strong Class 10 results with board toppers from Tulsipur",
        "UP Board — Scores above 90% in Science for both High School and Intermediate batches",
      ]} />

      <InfoBox icon="📈" title="95% Overall Pass Rate"
        body="Across all boards and all years, Vision Coaching Institute students in Tulsipur have maintained a 95% board pass rate. Students who attend regularly and complete all weekly tests show a significantly higher average score than the district average." />

      <H2>What Drives These Results</H2>
      <H3>Small Batches — The Most Important Factor</H3>
      <P>
        Large coaching centres in bigger cities may have 50–100 students per class. At Vision
        Coaching in Tulsipur, we cap every batch: 20 for Foundation, 15 for Pre-Board and 12 for
        Senior. This means every doubt is cleared in the session it arises — not accumulated
        until exam time.
      </P>
      <H3>Weekly Tests With Detailed Feedback</H3>
      <P>
        Students who test regularly consistently outperform those who only revise at exam time.
        Our weekly chapter tests identify weak areas early and allow teachers to course-correct
        before chapters pile up. Performance data is tracked and shared with parents monthly.
      </P>
      <H3>Daily Doubt-Solving Sessions</H3>
      <P>
        After every lecture, a dedicated doubt session is held. No student leaves class with
        an unresolved question. Between classes, WhatsApp access to subject teachers is available
        for quick follow-up doubts.
      </P>

      <H2>Live Results on the Main Site</H2>
      <P>
        For the interactive results carousel including year filters and board-wise tabs,
        visit the <InternalLink href="/#results">Results section on our homepage</InternalLink>.
        To read what parents and students say, see
        our <InternalLink href="/#testimonials">Testimonials</InternalLink>.
      </P>
    </ContentPageShell>
  );
}

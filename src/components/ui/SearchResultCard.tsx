"use client";

import Link from "next/link";
import SiteLinkItem, { SiteLink } from "./SiteLinkItem";

/* ── Static data ─────────────────────────────────────────────────── */

const SITE_LINKS: SiteLink[] = [
  {
    title: "Contact Us",
    description:
      "Reach out to Vision Coaching Institute for admissions, demo classes, or any course enquiries.",
    href: "#contact",
  },
  {
    title: "Our Courses",
    description:
      "Explore JEE, NEET, and board exam preparation courses for Class 6 through 12.",
    href: "#courses",
  },
  {
    title: "Fee Structure",
    description:
      "Transparent, affordable pricing across Foundation, Pre-Board, and Senior tiers.",
    href: "#fees",
  },
  {
    title: "Our Faculty",
    description:
      "Meet our expert teachers — specialists in Physics, Chemistry, and Biology.",
    href: "#faculty",
  },
  {
    title: "Results & Toppers",
    description:
      "See the outstanding board and competitive exam results achieved by our students.",
    href: "#results",
  },
];

interface SearchResultCardProps {
  /** Override defaults for reuse across pages */
  title?: string;
  url?: string;
  displayUrl?: string;
  description?: string;
  siteLinks?: SiteLink[];
}

export default function SearchResultCard({
  title = "Vision Coaching Institute — JEE, NEET & Board Classes | Tulsipur",
  url = "https://visioncoaching.in",
  displayUrl = "visioncoaching.in",
  description = `Vision Coaching Institute, Tulsipur (UP), provides expert coaching for Class 6–12 students
    preparing for JEE, NEET, and state board exams. Led by experienced faculty in Physics,
    Chemistry, and Biology, we combine personalised teaching with proven study strategies
    to help every student reach their full potential.`,
  siteLinks = SITE_LINKS,
}: SearchResultCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* ── Main result card ────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-5">

        {/* Favicon + URL row */}
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <span className="text-white text-[9px] font-bold select-none">V</span>
          </div>
          <div>
            <p className="text-xs text-gray-800 leading-none font-medium">
              Vision Coaching Institute
            </p>
            <p className="text-xs text-gray-500 leading-none mt-0.5">{displayUrl}</p>
          </div>
        </div>

        {/* Title */}
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            block text-blue-600 text-xl font-semibold leading-snug
            hover:underline focus:outline-none focus-visible:ring-2
            focus-visible:ring-blue-500 rounded mt-2
          "
        >
          {title}
        </Link>

        {/* Display URL */}
        <p className="text-sm text-gray-600 mt-0.5">{url}</p>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-2 leading-relaxed">{description}</p>

        {/* ── Sitelinks ───────────────────────────────────────── */}
        {siteLinks.length > 0 && (
          <div className="mt-4 pt-1 border-t border-gray-100">
            <div role="list" aria-label="Quick links">
              {siteLinks.map((link) => (
                <div key={link.title} role="listitem">
                  <SiteLinkItem link={link} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

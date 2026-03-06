"use client";

import Link from "next/link";

export interface SiteLink {
  title: string;
  description: string;
  href: string;
}

interface SiteLinkItemProps {
  link: SiteLink;
}

export default function SiteLinkItem({ link }: SiteLinkItemProps) {
  return (
    <Link
      href={link.href}
      className="
        flex justify-between items-center
        py-3 px-3 border-b border-gray-100
        rounded-md cursor-pointer
        hover:bg-gray-50
        transition-colors duration-150 ease-in-out
        group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
      "
      tabIndex={0}
      aria-label={`${link.title}: ${link.description}`}
    >
      <div className="flex-1 pr-4">
        <p className="text-blue-600 text-sm font-medium group-hover:underline leading-snug">
          {link.title}
        </p>
        <p className="text-gray-600 text-xs mt-0.5 leading-relaxed line-clamp-2">
          {link.description}
        </p>
      </div>

      {/* Right arrow icon — inline SVG (Heroicons ChevronRight) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-blue-500 transition-colors duration-150"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

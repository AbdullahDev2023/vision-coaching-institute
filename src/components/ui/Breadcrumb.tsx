"use client";
import Link from "next/link";

export type Crumb = { label: string; href: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
      <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.375rem", listStyle: "none", margin: 0, padding: 0 }}>
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={c.href} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              {i > 0 && (
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }} aria-hidden>›</span>
              )}
              {isLast ? (
                <span style={{ color: "#D4A017", fontSize: "0.78rem", fontWeight: 600 }} aria-current="page">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href}
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontWeight: 400, textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#D4A017")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

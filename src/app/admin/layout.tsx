/**
 * Admin route layout — Server Component.
 * Declares noindex so Google never indexes the admin panel.
 * Must live at app/admin/layout.tsx (not in the page, which is "use client").
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Vision Coaching Institute",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import CustomCursor from "@/components/ui/CustomCursor";
import HtmlLangSync from "@/components/ui/HtmlLangSync";

const SITE_URL = "https://visioncoaching.in";

export const metadata: Metadata = {
  title: {
    default: "Vision Coaching Institute Tulsipur | CBSE ICSE ISC UP Board",
    template: "%s | Vision Coaching Institute Tulsipur",
  },
  description:
    "Expert coaching for Classes 6–12 in CBSE, ICSE, ISC & UP Board. Maths, Physics, Chemistry, Biology. Small batches, daily doubt-clearing sessions. Purani Bazar, Tulsipur, Uttar Pradesh.",
  keywords: [
    "coaching tulsipur", "CBSE coaching tulsipur", "ICSE coaching tulsipur",
    "UP Board coaching", "maths physics coaching", "vision coaching institute",
    "class 6 to 12 coaching tulsipur", "best coaching tulsipur",
  ],
  authors: [{ name: "Vision Coaching Institute" }],
  creator: "Vision Coaching Institute",
  publisher: "Vision Coaching Institute",
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vision Coaching Institute",
    title: "Vision Coaching Institute Tulsipur | CBSE ICSE ISC UP Board",
    description:
      "Expert coaching for Classes 6–12 in Maths, Physics, Chemistry & Biology. Small batches, daily doubt sessions. Tulsipur, UP.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision Coaching Institute Tulsipur",
    description:
      "Expert coaching for Classes 6–12. CBSE · ICSE · ISC · UP Board. Purani Bazar, Tulsipur, UP.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#0A1F5C",
    "google-site-verification": "VT__ykYSkc_c9HPva45gsnFfsfkBJlhSzUgNNXM-os8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <LanguageProvider>
          <HtmlLangSync />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

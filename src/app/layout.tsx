import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import CustomCursor from "@/components/ui/CustomCursor";
import HtmlLangSync from "@/components/ui/HtmlLangSync";

// Set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX in Vercel environment variables
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

const SITE_URL = "https://www.visioncoachinginstitute.online";
const OG_IMAGE = `${SITE_URL}/opengraph-image`;
const OG_TITLE = "Vision Coaching Institute Tulsipur | CBSE · ICSE · ISC · UP Board";
const OG_DESC  =
  "Expert coaching for Classes 6–12 in Maths, Physics, Chemistry & Biology. " +
  "Small batches · Daily doubt solving · Weekly tests · Free demo classes. " +
  "Purani Bazar, Tulsipur, Uttar Pradesh. Call: +91 72104 33685";

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: "%s | Vision Coaching Institute Tulsipur",
  },
  description: OG_DESC,
  keywords: [
    "coaching tulsipur", "CBSE coaching tulsipur", "ICSE coaching tulsipur",
    "UP Board coaching", "maths physics coaching", "vision coaching institute",
    "class 6 to 12 coaching tulsipur", "best coaching tulsipur",
    "physics chemistry biology coaching", "board exam coaching uttar pradesh",
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
    title: OG_TITLE,
    description: OG_DESC,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vision Coaching Institute Tulsipur — Expert Coaching for CBSE, ICSE, ISC & UP Board",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Vision Coaching Institute Tulsipur",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico",    sizes: "any" },
      { url: "/favicon_32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon_16.png", sizes: "16x16", type: "image/png" },
    ],
    apple:    { url: "/favicon_180.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon.ico",
  },
  other: {
    "theme-color": "#0A1F5C",
    "google-site-verification": "VT__ykYSkc_c9HPva45gsnFfsfkBJlhSzUgNNXM-os8",
    // WhatsApp reads og: tags — no extra tags needed, but these reinforce it
    "og:phone_number": "+917210433685",
    "og:locality": "Tulsipur",
    "og:region": "Uttar Pradesh",
    "og:country-name": "India",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Vision Coaching Institute",
    "url": SITE_URL,
    "telephone": "+917210433685",
    "image": OG_IMAGE,
    "description": "Expert coaching for Classes 6\u201312 in CBSE, ICSE, ISC & UP Board. Maths, Physics, Chemistry, Biology. Purani Bazar, Tulsipur, Uttar Pradesh.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Purani Bazar",
      "addressLocality": "Tulsipur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "271602",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.5500",
      "longitude": "82.4167"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "07:00",
      "closes": "20:00"
    },
    "sameAs": []
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${notoDevanagari.variable} scroll-smooth`}>
      <head suppressHydrationWarning>
        {/* Hard favicon links — belt-and-suspenders for Vercel edge caching */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon_32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon_48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/favicon_180.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* ── Google Analytics 4 ── loads after page is interactive (strategy="afterInteractive") */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <LanguageProvider>
          <HtmlLangSync />
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import CustomCursor from "@/components/ui/CustomCursor";
import HtmlLangSync from "@/components/ui/HtmlLangSync";
import siteConfig from "@/lib/site-config.json";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-FWQX2WWT41";

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

const SITE_URL  = "https://www.visioncoachinginstitute.online";
const OG_IMAGE  = `${SITE_URL}/og-image.png`;
const OG_TITLE  = "Best Coaching in Tulsipur | CBSE ICSE UP Board | Vision Institute";
const OG_DESC   =
  "Top coaching institute in Tulsipur for CBSE, ICSE, ISC & UP Board Classes 6–12. " +
  "Maths, Science, PCB, PCM — small batches, daily doubt sessions, free demo class. " +
  "Purani Bazar, Tulsipur, UP. Call: +91 72104 33685";

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: "%s | Vision Coaching Tulsipur",
  },
  description: OG_DESC,
  keywords: [
    /* ── Primary city-level ── */
    "coaching in tulsipur",
    "best coaching tulsipur",
    "tuition tulsipur",
    "coaching centre tulsipur",
    "science coaching tulsipur",
    "maths coaching tulsipur",
    "best coaching center tulsipur up",
    "coaching classes tulsipur uttar pradesh",
    "class 10 coaching tulsipur",
    "class 12 coaching tulsipur",
    "class 9 coaching tulsipur",
    "CBSE coaching tulsipur",
    "ICSE coaching tulsipur",
    "UP Board coaching tulsipur",
    "ISC coaching tulsipur",
    /* ── Nearby city radius targets ── */
    "coaching near balrampur",
    "coaching near gonda",
    "coaching near bahraich",
    "best coaching shravasti up",
    "tuition near tulsipur",
    "education center tulsipur uttar pradesh",
    /* ── Subject & intent keywords ── */
    "PCB coaching tulsipur",
    "PCM coaching tulsipur",
    "physics chemistry biology coaching tulsipur",
    "board exam preparation tulsipur",
    "class 9 10 coaching uttar pradesh",
    "class 11 12 coaching tulsipur",
    "free demo class coaching tulsipur",
    "admission open coaching 2026 tulsipur",
    "BSc coaching tulsipur",
    "BSc science coaching UP",
    "vision coaching institute",
    "vision coaching tulsipur",
    /* ── Hindi keywords (critical for local search) ── */
    "तुलसीपुर कोचिंग",
    "तुलसीपुर ट्यूशन",
    "विज्ञान कोचिंग तुलसीपुर",
    "बेस्ट कोचिंग सेंटर तुलसीपुर",
    "क्लास 12 कोचिंग उत्तर प्रदेश",
    "विजन कोचिंग इंस्टीट्यूट तुलसीपुर",
    /* ── General education ── */
    "coaching classes uttar pradesh",
    "CBSE coaching uttar pradesh",
    "UP board tuition center",
    "small batch coaching UP",
    "daily doubt solving coaching",
    "weekly test coaching UP board",
  ],
  authors:   [{ name: "Vision Coaching Institute" }],
  creator:   "Vision Coaching Institute",
  publisher: "Vision Coaching Institute",
  robots:    { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  alternates:   { canonical: "/" },
  openGraph: {
    type:     "website",
    url:      SITE_URL,
    siteName: "Vision Coaching Institute",
    title:    OG_TITLE,
    description: OG_DESC,
    locale:   "en_IN",
    images: [
      {
        url:       OG_IMAGE,
        secureUrl: OG_IMAGE,
        width:     1200,
        height:    630,
        alt:  "Vision Coaching Institute Tulsipur — Expert Coaching CBSE ICSE ISC UP Board",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       OG_TITLE,
    description: OG_DESC,
    images:      [OG_IMAGE],
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
    "theme-color":             "#0A1F5C",
    "google-site-verification": "VT__ykYSkc_c9HPva45gsnFfsfkBJlhSzUgNNXM-os8",
    "og:image:secure_url": OG_IMAGE,
    "og:image:width":  "1200",
    "og:image:height": "630",
    "og:image:type":   "image/png",
    "og:phone_number": "+917210433685",
    "og:locality":     "Tulsipur",
    "og:region":       "Uttar Pradesh",
    "og:country-name": "India",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* Build sameAs from site-config — only include non-empty URLs */
  const sameAs = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
  ].filter(Boolean);

  const { ratingValue, reviewCount } = siteConfig.seo.aggregateRating;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      /* ── 1. Organisation (LocalBusiness + EducationalOrganization) ── */
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id":   `${SITE_URL}/#organization`,
        "name":  "Vision Coaching Institute",
        "alternateName": [
          "Vision Coaching",
          "VCI Tulsipur",
          "विज़न कोचिंग इंस्टीट्यूट",
        ],
        "url":   SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url":   `${SITE_URL}/logo.png`,
        },
        "image": OG_IMAGE,
        "description":
          "Expert coaching for Classes 6–12 and BSc in CBSE, ICSE, ISC & UP Board. " +
          "Maths, Physics, Chemistry, Biology. Small batches, daily doubt solving, " +
          "weekly tests. Purani Bazar, Tulsipur, Uttar Pradesh.",
        "telephone":          ["+917210433685", "+917235937827", "+919956841282"],
        "priceRange":         "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted":    "Cash, UPI",
        "address": {
          "@type":           "PostalAddress",
          "streetAddress":   "Purani Bazar",
          "addressLocality": "Tulsipur",
          "addressRegion":   "Uttar Pradesh",
          "postalCode":      "271208",
          "addressCountry":  "IN",
        },
        "geo": {
          "@type":    "GeoCoordinates",
          "latitude":  27.55,
          "longitude": 82.4167,
        },
        "hasMap":
          "https://maps.google.com/?q=Purani+Bazar,+Tulsipur,+Uttar+Pradesh",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
            ],
            "opens":  "07:00",
            "closes": "20:00",
          },
        ],
        "areaServed": [
          { "@type": "City", "name": "Tulsipur"  },
          { "@type": "City", "name": "Balrampur" },
          { "@type": "City", "name": "Gonda"     },
          { "@type": "City", "name": "Bahraich"  },
          { "@type": "City", "name": "Shravasti" },
        ],
        "knowsAbout": [
          "CBSE","ICSE","ISC","UP Board",
          "Physics","Chemistry","Biology","Mathematics","BSc Science",
        ],
        "teaches":
          "Science and Mathematics coaching for Classes 6–12 and BSc in Tulsipur, UP",
        /* Aggregate rating — shown as gold stars in Google SERPs */
        ...(Number(reviewCount) > 0 && {
          "aggregateRating": {
            "@type":       "AggregateRating",
            "ratingValue": ratingValue,
            "reviewCount": reviewCount,
            "bestRating":  "5",
            "worstRating": "1",
          },
        }),
        /* Social media profiles — updated from admin panel */
        ...(sameAs.length > 0 && { "sameAs": sameAs }),
      },

      /* ── 2. WebSite ── */
      {
        "@type":     "WebSite",
        "@id":       `${SITE_URL}/#website`,
        "url":        SITE_URL,
        "name":       "Vision Coaching Institute Tulsipur",
        "description": OG_DESC,
        "publisher":  { "@id": `${SITE_URL}/#organization` },
        "inLanguage": ["en-IN", "hi-IN"],
        "potentialAction": {
          "@type":       "SearchAction",
          "target":      `${SITE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      /* ── 3. WebPage ── */
      {
        "@type":        "WebPage",
        "@id":          `${SITE_URL}/#webpage`,
        "url":           SITE_URL,
        "name":          OG_TITLE,
        "description":   OG_DESC,
        "isPartOf":     { "@id": `${SITE_URL}/#website`      },
        "about":        { "@id": `${SITE_URL}/#organization` },
        "inLanguage":   "en-IN",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type":    "ListItem",
              "position": 1,
              "name":     "Home",
              "item":      SITE_URL,
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoDevanagari.variable} scroll-smooth`}>
      <head suppressHydrationWarning>
        {/* ── Critical resource hints ── */}
        {/* next/font already owns fonts.googleapis.com + fonts.gstatic.com —
            do NOT add those preconnects here or you waste a connection slot. */}

        {/* Preload LCP image — logo is the first above-fold branded element */}
        <link rel="preload" as="image" href="/logo.webp" type="image/webp" />

        {/* Supabase CDN — gallery + faculty images load from here */}
        <link rel="preconnect" href="https://ncvcdhcdpiylvyvbjrot.supabase.co" />

        {/* GA4 — dns-prefetch only (not critical path) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Hard favicon links — belt-and-suspenders for Vercel edge caching */}
        <link rel="icon"             href="/favicon.ico"    sizes="any" />
        <link rel="icon"             href="/favicon_32.png" type="image/png" sizes="32x32" />
        <link rel="icon"             href="/favicon_48.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/favicon_180.png" sizes="180x180" />
        <script
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* ── Google Analytics 4 ── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga4-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
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

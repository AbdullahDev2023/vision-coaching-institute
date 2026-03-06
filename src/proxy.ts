import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  /* ─── Generate a per-request nonce ─────────────────────────────────── */
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const nonce = btoa(String.fromCharCode(...array));

  /* ─── Content-Security-Policy ───────────────────────────────────────
   *
   * Key choices:
   *  • 'nonce-{nonce}' + 'strict-dynamic' — the nonce allowlists our own
   *    inline scripts (JSON-LD, GA4 init) and 'strict-dynamic' propagates
   *    trust to scripts they load (GTM, GA4), avoiding wildcard hosts.
   *  • style-src keeps 'unsafe-inline' because Framer Motion + GSAP set
   *    inline style attributes at runtime; removing it breaks animations.
   *  • frame-src allows Google Maps embed.
   *  • worker-src blob: is required by Three.js / react-three-fiber.
   *  • form-action 'self' + wa.me — WhatsApp redirect from fee form.
   *  • trusted-types report-only only — Three.js uses innerHTML internally
   *    so full enforcement would break the 3D scene.
   * ─────────────────────────────────────────────────────────────────── */
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' data: https://fonts.gstatic.com`,
    `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://*.supabase.co`,
    `frame-src https://www.google.com https://maps.google.com`,
    `worker-src blob:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self' https://wa.me`,
    `upgrade-insecure-requests`,
  ].join("; ");

  /* Forward nonce to the layout via a request header so the server
     component can attach it to inline <script> tags. */
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  /* ─── Security response headers ──────────────────────────────────── */
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  /* same-origin-allow-popups: Google Maps opens popups, strict same-origin
     would block them.  This still prevents cross-origin opener access. */
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  /* Trusted Types — report-only so the site works while we collect
     violation data.  Upgrade to enforced once all libraries are patched. */
  response.headers.set(
    "Content-Security-Policy-Report-Only",
    "require-trusted-types-for 'script'"
  );

  return response;
}

export const config = {
  /* Run on every page route; skip static assets and Next.js internals. */
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};

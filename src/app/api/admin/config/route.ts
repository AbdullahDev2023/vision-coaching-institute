import { NextRequest, NextResponse } from "next/server";
import fs   from "fs";
import path from "path";

const CONFIG_PATH    = path.join(process.cwd(), "src", "lib", "site-config.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "vci@admin2026";

type SiteConfig = {
  social: { facebook: string; instagram: string; youtube: string };
  seo:    { aggregateRating: { ratingValue: string; reviewCount: string } };
};

function readConfig(): SiteConfig {
  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

/* ── GET /api/admin/config?pw=xxx  → returns current config if password ok ── */
export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw") ?? "";
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: "Invalid password." }, { status: 401 });
  }
  try {
    const config = readConfig();
    return NextResponse.json({ success: true, config });
  } catch {
    return NextResponse.json({ success: false, error: "Could not read config file." }, { status: 500 });
  }
}

/* ── POST /api/admin/config  → saves config if password ok ── */
export async function POST(req: NextRequest) {
  let body: { password?: string } & Partial<SiteConfig>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ success: false, error: "Invalid password." }, { status: 401 });
  }

  try {
    const current = readConfig();

    /* Merge incoming fields on top of current values */
    const updated: SiteConfig = {
      social: {
        facebook:  body.social?.facebook  ?? current.social.facebook,
        instagram: body.social?.instagram ?? current.social.instagram,
        youtube:   body.social?.youtube   ?? current.social.youtube,
      },
      seo: {
        aggregateRating: {
          ratingValue: body.seo?.aggregateRating?.ratingValue ?? current.seo.aggregateRating.ratingValue,
          reviewCount: body.seo?.aggregateRating?.reviewCount ?? current.seo.aggregateRating.reviewCount,
        },
      },
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2) + "\n", "utf-8");
    return NextResponse.json({ success: true, config: updated });
  } catch (err) {
    console.error("[admin/config POST]", err);
    return NextResponse.json({ success: false, error: "Could not write config file." }, { status: 500 });
  }
}

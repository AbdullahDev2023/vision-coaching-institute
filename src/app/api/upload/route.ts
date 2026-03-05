// src/app/api/upload/route.ts
// Server-side upload proxy — bypasses browser CORS on Supabase Storage
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file     = formData.get("file") as File;
    const path     = formData.get("path") as string;
    const bucket   = path.startsWith("faculty") ? "faculty" : "gallery";

    if (!file || !path) {
      return NextResponse.json({ error: "file and path are required" }, { status: 400 });
    }

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, buffer, { upsert: true, contentType: file.type });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

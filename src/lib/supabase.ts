// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Guard against missing env vars during SSR / build-time pre-rendering.
// The real values are always present at runtime (browser + server route handlers).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export const supabase = createClient(url, key);

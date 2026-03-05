// src/lib/supabaseDb.ts  — drop-in replacement for firestoreDb.ts
import { supabase } from "@/lib/supabase";

/* ─── Types (identical shape to firestoreDb.ts) ─────────────────── */
export type GalleryItem = {
  id:          string;
  type:        "photo" | "video";
  label:       string;
  url:         string;
  storagePath: string;
  order:       number;
  active:      boolean;
};

export type FacultyMember = {
  id:            string;
  name:          string;
  subject:       string;
  qualification: string;
  exp:           string;
  photoUrl:      string;
  storagePath:   string;
  order:         number;
};

/* ─── Row → camelCase mappers ────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toGallery(row: any): GalleryItem {
  return {
    id:          row.id,
    type:        row.type,
    label:       row.label,
    url:         row.url,
    storagePath: row.storage_path ?? "",
    order:       row.order ?? 0,
    active:      row.active ?? true,
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFaculty(row: any): FacultyMember {
  return {
    id:            row.id,
    name:          row.name,
    subject:       row.subject,
    qualification: row.qualification ?? "",
    exp:           row.exp ?? "",
    photoUrl:      row.photo_url ?? "",
    storagePath:   row.storage_path ?? "",
    order:         row.order ?? 0,
  };
}

/* ─── Gallery ────────────────────────────────────────────────────── */
export async function fetchGallery(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("active", true)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toGallery);
}

export async function saveGalleryDoc(item: {
  type: "photo" | "video"; label: string; url: string;
  storagePath: string; order: number;
}) {
  const { error } = await supabase.from("gallery").insert({
    type:         item.type,
    label:        item.label,
    url:          item.url,
    storage_path: item.storagePath,
    order:        item.order,
    active:       true,
  });
  if (error) throw error;
}

export async function deleteGalleryItem(item: GalleryItem): Promise<void> {
  const { error } = await supabase.from("gallery").delete().eq("id", item.id);
  if (error) throw error;
  if (item.storagePath) {
    await supabase.storage.from("gallery").remove([item.storagePath]);
  }
}

/* ─── Faculty ────────────────────────────────────────────────────── */
export async function fetchFaculty(): Promise<FacultyMember[]> {
  const { data, error } = await supabase
    .from("faculty")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(toFaculty);
}

export async function saveFacultyDoc(member: {
  name: string; subject: string; qualification: string;
  exp: string; photoUrl: string; storagePath: string; order: number;
}) {
  const { error } = await supabase.from("faculty").insert({
    name:          member.name,
    subject:       member.subject,
    qualification: member.qualification,
    exp:           member.exp,
    photo_url:     member.photoUrl,
    storage_path:  member.storagePath,
    order:         member.order,
  });
  if (error) throw error;
}

export async function deleteFacultyMember(member: FacultyMember): Promise<void> {
  const { error } = await supabase.from("faculty").delete().eq("id", member.id);
  if (error) throw error;
  if (member.storagePath) {
    await supabase.storage.from("faculty").remove([member.storagePath]);
  }
}

export async function updateFacultyDoc(id: string, data: Partial<FacultyMember>) {
  const patch: Record<string, unknown> = {};
  if (data.name          !== undefined) patch.name          = data.name;
  if (data.subject       !== undefined) patch.subject       = data.subject;
  if (data.qualification !== undefined) patch.qualification = data.qualification;
  if (data.exp           !== undefined) patch.exp           = data.exp;
  if (data.photoUrl      !== undefined) patch.photo_url     = data.photoUrl;
  if (data.storagePath   !== undefined) patch.storage_path  = data.storagePath;
  if (data.order         !== undefined) patch.order         = data.order;
  const { error } = await supabase.from("faculty").update(patch).eq("id", id);
  if (error) throw error;
}

/* ─── File upload via Supabase Storage ──────────────────────────── */
export async function uploadFile(
  storagePath: string,
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  // Supabase JS v2 doesn't expose upload progress in the browser;
  // fire a fake 50 % tick so the UI doesn't look frozen.
  onProgress(50);

  // Derive bucket from path prefix (gallery/… or faculty/…)
  const bucket = storagePath.startsWith("faculty") ? "faculty" : "gallery";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, { upsert: true, contentType: file.type });

  if (error) throw error;
  onProgress(100);

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

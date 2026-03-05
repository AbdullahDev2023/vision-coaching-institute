/**
 * upload-to-supabase.mjs
 * Uploads gallery + faculty images/videos to Supabase Storage,
 * inserts rows into the gallery / faculty tables, then
 * deletes the local public/images/gallery and public/images/faculty folders.
 *
 * Run: node scripts/upload-to-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";
import fs   from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, "..");

/* ── Supabase client ─────────────────────────────────────────────── */
const SUPABASE_URL = "https://ncvcdhcdpiylvyvbjrot.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdmNkaGNkcGl5bHZ5dmJqcm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTM1MDQsImV4cCI6MjA4ODI4OTUwNH0.5gV4ItsPcHepFuhZHZM6sl0LYbf05Tteag1QImmRYWE";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ── Helpers ─────────────────────────────────────────────────────── */
function mime(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png":  "image/png",
    ".webp": "image/webp",
    ".mp4":  "video/mp4",
    ".mov":  "video/quicktime",
  };
  return map[ext] ?? "application/octet-stream";
}

async function uploadToStorage(bucket, storagePath, localPath) {
  const fileBuffer = fs.readFileSync(localPath);
  const contentType = mime(localPath);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,   // overwrite if it already exists
    });

  if (error) throw new Error(`Storage upload failed [${storagePath}]: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

function log(msg, ok = true) {
  process.stdout.write(`${ok ? "✅" : "❌"} ${msg}\n`);
}

/* ══════════════════════════════════════════════════════════════════
   1. GALLERY  (19 photos + 6 videos)
══════════════════════════════════════════════════════════════════ */
async function uploadGallery() {
  const galleryDir = path.join(ROOT, "public", "images", "gallery");
  if (!fs.existsSync(galleryDir)) { log("Gallery folder not found — skipping.", false); return; }

  const files = fs.readdirSync(galleryDir).filter(f => !f.startsWith("."));

  // Labels matching the existing STATIC_ITEMS in Gallery.tsx
  const LABELS = {
    "photo-01.jpg": "Vision Coaching Institute classroom – Tulsipur 1",
    "photo-02.jpg": "Vision Coaching Institute classroom – Tulsipur 2",
    "photo-03.jpg": "CBSE coaching class – Vision Coaching Tulsipur 3",
    "photo-04.jpg": "CBSE coaching class – Vision Coaching Tulsipur 4",
    "photo-05.jpg": "Physics class – Vision Coaching Tulsipur 5",
    "photo-06.jpg": "Physics class – Vision Coaching Tulsipur 6",
    "photo-07.jpg": "Chemistry class – Vision Coaching Tulsipur 7",
    "photo-08.jpg": "Chemistry class – Vision Coaching Tulsipur 8",
    "photo-09.jpg": "Biology class – Vision Coaching Tulsipur 9",
    "photo-10.jpg": "Maths batch – Vision Coaching Tulsipur 10",
    "photo-11.jpg": "UP Board coaching – Vision Coaching Tulsipur 11",
    "photo-12.jpg": "UP Board coaching – Vision Coaching Tulsipur 12",
    "photo-13.jpg": "ICSE ISC batch – Vision Coaching Tulsipur 13",
    "photo-14.jpg": "Best coaching Tulsipur – Vision 14",
    "photo-15.jpg": "Class 10 board prep – Vision Coaching 15",
    "photo-16.jpg": "Class 12 board prep – Vision Coaching 16",
    "photo-17.jpg": "Science batch – Vision Coaching Tulsipur 17",
    "photo-18.jpg": "Science batch – Vision Coaching Tulsipur 18",
    "photo-19.jpg": "Vision Coaching – Purani Bazar Tulsipur 19",
    "video-01.mp4": "Classroom session – Vision Coaching Tulsipur 1",
    "video-02.mp4": "Classroom session – Vision Coaching Tulsipur 2",
    "video-03.mp4": "Classroom session – Vision Coaching Tulsipur 3",
    "video-04.mp4": "Classroom session – Vision Coaching Tulsipur 4",
    "video-05.mp4": "Classroom session – Vision Coaching Tulsipur 5",
    "video-06.mp4": "Classroom session – Vision Coaching Tulsipur 6",
  };

  // Check existing rows so we don't double-insert
  const { data: existing } = await supabase.from("gallery").select("storage_path");
  const existingPaths = new Set((existing ?? []).map(r => r.storage_path));

  let order = 1;
  for (const file of files.sort()) {
    const localPath   = path.join(galleryDir, file);
    const storagePath = file;             // e.g. "photo-01.jpg"
    const isVideo     = file.endsWith(".mp4");
    const type        = isVideo ? "video" : "photo";
    const label       = LABELS[file] ?? file;

    process.stdout.write(`  ↑ Uploading gallery/${file} … `);

    try {
      const publicUrl = await uploadToStorage("gallery", storagePath, localPath);

      if (existingPaths.has(storagePath)) {
        process.stdout.write("already in DB — skipping insert\n");
      } else {
        const { error: dbErr } = await supabase.from("gallery").insert({
          type,
          label,
          url:          publicUrl,
          storage_path: storagePath,
          order:        order++,
          active:       true,
        });
        if (dbErr) throw dbErr;
        process.stdout.write(`done (order ${order - 1})\n`);
      }
    } catch (err) {
      process.stdout.write(`FAILED — ${err.message}\n`);
    }
  }

  log("Gallery upload complete.");
}

/* ══════════════════════════════════════════════════════════════════
   2. FACULTY  (4 teacher photos)
══════════════════════════════════════════════════════════════════ */
async function uploadFaculty() {
  const facultyDir = path.join(ROOT, "public", "images", "faculty");
  if (!fs.existsSync(facultyDir)) { log("Faculty folder not found — skipping.", false); return; }

  // Metadata matching Faculty.tsx / en.json
  const FACULTY_META = {
    "shivam-sir-physics.jpeg": {
      name: "Shivam Sir",
      subject: "Physics",
      qualification: "B.Tech (IIT)",
      exp: "8+ Years",
      order: 1,
    },
    "yusuf-sir-physics.jpeg": {
      name: "Yusuf Sir",
      subject: "Physics",
      qualification: "M.Sc. Physics",
      exp: "6+ Years",
      order: 2,
    },
    "satish-sir-chemistry.jpeg": {
      name: "Satish Sir",
      subject: "Chemistry",
      qualification: "M.Sc. Chemistry",
      exp: "10+ Years",
      order: 3,
    },
    "farhan-sir-biology.jpeg": {
      name: "Farhan Sir",
      subject: "Biology",
      qualification: "MBBS (pursuing)",
      exp: "5+ Years",
      order: 4,
    },
  };

  const { data: existing } = await supabase.from("faculty").select("storage_path");
  const existingPaths = new Set((existing ?? []).map(r => r.storage_path));

  const files = fs.readdirSync(facultyDir).filter(f => f !== "README.md" && !f.startsWith("."));

  for (const file of files.sort()) {
    const localPath   = path.join(facultyDir, file);
    const storagePath = file;   // e.g. "shivam-sir-physics.jpeg"
    const meta        = FACULTY_META[file];

    if (!meta) { process.stdout.write(`  ⚠ No metadata for ${file} — skipping\n`); continue; }

    process.stdout.write(`  ↑ Uploading faculty/${file} … `);

    try {
      const publicUrl = await uploadToStorage("faculty", storagePath, localPath);

      if (existingPaths.has(storagePath)) {
        process.stdout.write("already in DB — skipping insert\n");
      } else {
        const { error: dbErr } = await supabase.from("faculty").insert({
          name:          meta.name,
          subject:       meta.subject,
          qualification: meta.qualification,
          exp:           meta.exp,
          photo_url:     publicUrl,
          storage_path:  storagePath,
          order:         meta.order,
        });
        if (dbErr) throw dbErr;
        process.stdout.write(`done\n`);
      }
    } catch (err) {
      process.stdout.write(`FAILED — ${err.message}\n`);
    }
  }

  log("Faculty upload complete.");
}

/* ══════════════════════════════════════════════════════════════════
   3. DELETE LOCAL FOLDERS
══════════════════════════════════════════════════════════════════ */
function deleteFolder(folderPath) {
  if (!fs.existsSync(folderPath)) return;
  fs.rmSync(folderPath, { recursive: true, force: true });
  log(`Deleted local folder: ${folderPath}`);
}

/* ══════════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════════ */
(async () => {
  console.log("\n🚀 Starting Supabase upload…\n");

  console.log("📷 GALLERY");
  await uploadGallery();

  console.log("\n👨‍🏫 FACULTY");
  await uploadFaculty();

  console.log("\n🗑  Cleaning up local image folders…");
  deleteFolder(path.join(ROOT, "public", "images", "gallery"));
  deleteFolder(path.join(ROOT, "public", "images", "faculty"));

  console.log("\n✨ All done! Check your Supabase dashboard.\n");
})();

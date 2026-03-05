// src/lib/firestoreDb.ts
import {
  collection, getDocs, addDoc, deleteDoc, doc,
  updateDoc, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import {
  ref, uploadBytesResumable, getDownloadURL, deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";

/* ─── Types ──────────────────────────────────────────────────────── */
export type GalleryItem = {
  id:        string;
  type:      "photo" | "video";
  label:     string;
  url:       string;
  storagePath: string;
  order:     number;
  active:    boolean;
};

export type FacultyMember = {
  id:           string;
  name:         string;
  subject:      string;
  qualification:string;
  exp:          string;
  photoUrl:     string;
  storagePath:  string;
  order:        number;
};

/* ─── Gallery ─────────────────────────────────────────────────────── */
export async function fetchGallery(): Promise<GalleryItem[]> {
  const q = query(collection(db, "gallery"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() } as GalleryItem))
    .filter(i => i.active !== false);
}

export async function deleteGalleryItem(item: GalleryItem): Promise<void> {
  await deleteDoc(doc(db, "gallery", item.id));
  if (item.storagePath) {
    try { await deleteObject(ref(storage, item.storagePath)); } catch {}
  }
}

/* ─── Faculty ─────────────────────────────────────────────────────── */
export async function fetchFaculty(): Promise<FacultyMember[]> {
  const q = query(collection(db, "faculty"), orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as FacultyMember));
}

export async function deleteFacultyMember(member: FacultyMember): Promise<void> {
  await deleteDoc(doc(db, "faculty", member.id));
  if (member.storagePath) {
    try { await deleteObject(ref(storage, member.storagePath)); } catch {}
  }
}

/* ─── Upload helpers ─────────────────────────────────────────────── */
export function uploadFile(
  path: string,
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      snap => onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => resolve(await getDownloadURL(task.snapshot.ref)),
    );
  });
}

export async function saveGalleryDoc(data: {
  type: "photo" | "video"; label: string; url: string;
  storagePath: string; order: number;
}) {
  await addDoc(collection(db, "gallery"), { ...data, active: true, createdAt: serverTimestamp() });
}

export async function saveFacultyDoc(data: {
  name: string; subject: string; qualification: string;
  exp: string; photoUrl: string; storagePath: string; order: number;
}) {
  await addDoc(collection(db, "faculty"), { ...data, createdAt: serverTimestamp() });
}

export async function updateFacultyDoc(id: string, data: Partial<FacultyMember>) {
  await updateDoc(doc(db, "faculty", id), data as Record<string, unknown>);
}

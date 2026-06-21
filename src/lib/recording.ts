import { KEYS, newId, read, todayKey, write, type StoredRecording } from "./storage";

const MAX_STORED = 5;

export async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onloadend = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

export async function saveRecording(input: {
  topicId: string;
  durationSec: number;
  blob: Blob;
}): Promise<StoredRecording> {
  const dataUrl = await blobToDataUrl(input.blob);
  const entry: StoredRecording = {
    id: newId(),
    date: todayKey(),
    topicId: input.topicId,
    durationSec: input.durationSec,
    dataUrl,
    mimeType: input.blob.type || "audio/webm",
  };
  const all = read<StoredRecording[]>(KEYS.recordings, []);
  all.push(entry);
  const trimmed = all.slice(-MAX_STORED);
  try {
    write(KEYS.recordings, trimmed);
  } catch {
    write(KEYS.recordings, trimmed.slice(-3));
  }
  return entry;
}

export function getRecordings(): StoredRecording[] {
  return read<StoredRecording[]>(KEYS.recordings, []).slice().reverse();
}

export function pickRecorderMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  for (const c of candidates) {
    try {
      if (MediaRecorder.isTypeSupported(c)) return c;
    } catch {}
  }
  return undefined;
}

export function formatDuration(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}
// LocalStorage layer for Speak Sphere. All access is SSR-safe.

export type UserProfile = {
  goal: "Public Speaking" | "Debate" | "Interviews" | "MUN";
  level: "Beginner" | "Intermediate" | "Advanced";
  challenge: "Confidence" | "Nervousness" | "Organization" | "Filler Words";
  createdAt: string;
};

export type CompletedChallenge = {
  id: string;
  topicId: string;
  date: string;
  durationSec: number;
  score: number;
  kind: "primary" | "bonus";
  completedAt: string;
};

export type StreakData = {
  current: number;
  longest: number;
  lastDate: string | null;
};

export type ReflectionEntry = {
  id: string;
  date: string;
  topicId: string;
  text: string;
};

export type ScoreEntry = {
  id: string;
  date: string;
  topicId: string;
  score: number;
};

export type StoredRecording = {
  id: string;
  date: string;
  topicId: string;
  durationSec: number;
  dataUrl: string;
  mimeType: string;
};

export type InstallPromptState = {
  dismissedAt?: string;
  installed?: boolean;
  firstCompletionAt?: string;
};

export const KEYS = {
  userProfile: "ss.userProfile",
  completedChallenges: "ss.completedChallenges",
  completedTopics: "ss.completedTopics",
  streakData: "ss.streakData",
  reflectionEntries: "ss.reflectionEntries",
  scoreHistory: "ss.scoreHistory",
  recordings: "ss.recordings",
  installPromptState: "ss.installPromptState",
} as const;

function safeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function read<T>(key: string, fallback: T): T {
  const ls = safeStorage();
  if (!ls) return fallback;
  try {
    const raw = ls.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    try {
      ls.removeItem(key);
    } catch {}
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  const ls = safeStorage();
  if (!ls) return;
  try {
    ls.setItem(key, JSON.stringify(value));
  } catch {}
}

export function remove(key: string): void {
  const ls = safeStorage();
  if (!ls) return;
  try {
    ls.removeItem(key);
  } catch {}
}

export function resetAll(): void {
  Object.values(KEYS).forEach(remove);
  remove("ss.dailyAssignment");
}

export function exportAll(): string {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(KEYS)) {
    out[k] = read(v, null);
  }
  return JSON.stringify(out, null, 2);
}

export function importAll(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as Record<string, unknown>;
    for (const [k, key] of Object.entries(KEYS)) {
      if (parsed[k] != null) write(key, parsed[k]);
    }
    return true;
  } catch {
    return false;
  }
}

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
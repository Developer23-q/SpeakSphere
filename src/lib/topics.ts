import topicsData from "@/data/topics.json";
import { KEYS, read, todayKey, write } from "./storage";

export type Topic = {
  id: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  talking_points: string[];
  structure: { opening: string; body: string; conclusion: string };
  mistakes: string[];
};

export const ALL_TOPICS: Topic[] = topicsData as Topic[];

export function getTopic(id: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === id);
}

type DailyAssignment = {
  date: string;
  primaryId: string;
  bonusId: string | null;
};

const DAILY_KEY = "ss.dailyAssignment";

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice();
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function dateSeed(dateStr: string): number {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getDailyAssignment(): { primary: Topic; bonus: Topic | null } {
  const today = todayKey();
  const stored = read<DailyAssignment | null>(DAILY_KEY, null);
  if (stored && stored.date === today) {
    const primary = getTopic(stored.primaryId) ?? ALL_TOPICS[0];
    const bonus = stored.bonusId ? getTopic(stored.bonusId) ?? null : null;
    return { primary, bonus };
  }

  let usedIds = read<string[]>(KEYS.completedTopics, []);
  if (usedIds.length >= ALL_TOPICS.length) usedIds = [];

  const remaining = ALL_TOPICS.filter((t) => !usedIds.includes(t.id));
  const pool = remaining.length > 0 ? remaining : ALL_TOPICS;
  const shuffled = seededShuffle(pool, dateSeed(today));
  const primary = shuffled[0];
  const bonus = shuffled.find((t) => t.id !== primary.id) ?? null;

  const assignment: DailyAssignment = {
    date: today,
    primaryId: primary.id,
    bonusId: bonus?.id ?? null,
  };
  write(DAILY_KEY, assignment);
  return { primary, bonus };
}

export function markTopicUsed(topicId: string): void {
  const used = read<string[]>(KEYS.completedTopics, []);
  if (!used.includes(topicId)) {
    used.push(topicId);
    write(KEYS.completedTopics, used);
  }
}

export function estimatedMinutes(_topic: Topic): string {
  return "2 min";
}
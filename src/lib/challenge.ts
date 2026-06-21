import {
  KEYS,
  newId,
  read,
  todayKey,
  write,
  type CompletedChallenge,
  type ReflectionEntry,
  type ScoreEntry,
} from "./storage";
import { markTopicUsed } from "./topics";
import { recordCompletionForStreak } from "./streak";

export function getCompleted(): CompletedChallenge[] {
  return read<CompletedChallenge[]>(KEYS.completedChallenges, []);
}

export function getTodayCompletions(): CompletedChallenge[] {
  const today = todayKey();
  return getCompleted().filter((c) => c.date === today);
}

export function canStartChallenge(): boolean {
  return getTodayCompletions().length < 2;
}

export function isTopicDoneToday(topicId: string): boolean {
  return getTodayCompletions().some((c) => c.topicId === topicId);
}

export function totalSpeakingSeconds(): number {
  return getCompleted().reduce((sum, c) => sum + c.durationSec, 0);
}

export type SaveChallengeInput = {
  topicId: string;
  durationSec: number;
  score: number;
  kind: "primary" | "bonus";
};

export function saveCompletedChallenge(input: SaveChallengeInput): CompletedChallenge {
  const entry: CompletedChallenge = {
    id: newId(),
    topicId: input.topicId,
    date: todayKey(),
    durationSec: input.durationSec,
    score: input.score,
    kind: input.kind,
    completedAt: new Date().toISOString(),
  };
  const all = getCompleted();
  all.push(entry);
  write(KEYS.completedChallenges, all);
  markTopicUsed(input.topicId);
  recordCompletionForStreak();

  const scores = read<ScoreEntry[]>(KEYS.scoreHistory, []);
  scores.push({ id: entry.id, date: entry.date, topicId: entry.topicId, score: entry.score });
  write(KEYS.scoreHistory, scores);

  return entry;
}

export function saveReflection(topicId: string, text: string): void {
  if (!text.trim()) return;
  const entries = read<ReflectionEntry[]>(KEYS.reflectionEntries, []);
  entries.push({ id: newId(), date: todayKey(), topicId, text: text.trim() });
  write(KEYS.reflectionEntries, entries);
}

export function getRecentReflections(n = 5): ReflectionEntry[] {
  return read<ReflectionEntry[]>(KEYS.reflectionEntries, []).slice(-n).reverse();
}

export function getRecentScores(n = 5): ScoreEntry[] {
  return read<ScoreEntry[]>(KEYS.scoreHistory, []).slice(-n).reverse();
}
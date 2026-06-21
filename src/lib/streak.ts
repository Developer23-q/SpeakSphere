import { KEYS, read, todayKey, write, type StreakData } from "./storage";

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00");
  const db = new Date(b + "T00:00:00");
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

export function getStreak(): StreakData {
  const data = read<StreakData>(KEYS.streakData, { current: 0, longest: 0, lastDate: null });
  if (data.lastDate) {
    const gap = daysBetween(data.lastDate, todayKey());
    if (gap > 1) {
      const fresh: StreakData = { current: 0, longest: data.longest, lastDate: data.lastDate };
      write(KEYS.streakData, fresh);
      return fresh;
    }
  }
  return data;
}

export function recordCompletionForStreak(): StreakData {
  const today = todayKey();
  const data = getStreak();
  if (data.lastDate === today) return data;
  let current = data.current;
  if (data.lastDate && daysBetween(data.lastDate, today) === 1) current += 1;
  else current = 1;
  const next: StreakData = {
    current,
    longest: Math.max(current, data.longest),
    lastDate: today,
  };
  write(KEYS.streakData, next);
  return next;
}
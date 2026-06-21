export type FeedbackInput = {
  durationSec: number;
  confidence: number;
  difficulty: number;
};

export type FeedbackResult = {
  score: number;
  strength: string;
  suggestion: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function computeFeedback({ durationSec, confidence, difficulty }: FeedbackInput): FeedbackResult {
  let base: number;
  let strength: string;
  let suggestion: string;

  if (durationSec < 30) {
    base = 40 + Math.round(Math.random() * 10);
    strength = "You showed up and pressed record — that's the hardest part.";
    suggestion = "Speak longer next time. Aim for 45 seconds and develop one idea fully.";
  } else if (durationSec < 60) {
    base = 55 + Math.round(Math.random() * 20);
    strength = "Good warm-up. You held your thought together for nearly a minute.";
    suggestion = "Add one supporting example or short story to each point.";
  } else {
    base = 75 + Math.round(Math.random() * 15);
    strength = "Strong effort and great stamina at the mic.";
    suggestion = "Tighten your structure: opening hook, two points, and a clear close.";
  }

  base += (confidence - 3) * 2;
  base += (difficulty - 3) * 1;

  return { score: clamp(Math.round(base), 30, 99), strength, suggestion };
}
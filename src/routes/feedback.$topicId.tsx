import { createFileRoute, Link, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Flame, PartyPopper, Sparkles, Timer, Trophy } from "lucide-react";
import { z } from "zod";
import { getTopic } from "@/lib/topics";
import { computeFeedback } from "@/lib/feedback";
import { getDailyAssignment } from "@/lib/topics";
import { saveCompletedChallenge, saveReflection, getCompleted, totalSpeakingSeconds } from "@/lib/challenge";
import { getStreak } from "@/lib/streak";
import { formatDuration } from "@/lib/recording";
import { setInstallState, getInstallState } from "@/lib/pwa";

const searchSchema = z.object({ duration: z.coerce.number().min(0).max(600) });

export const Route = createFileRoute("/feedback/$topicId")({
  head: () => ({
    meta: [
      { title: "Your feedback — Speak Sphere" },
      { name: "description", content: "See your score, your strength, and one thing to work on." },
    ],
  }),
  validateSearch: searchSchema,
  component: Feedback,
});

type Phase = "rate" | "result" | "reflect" | "success";

function Feedback() {
  const { topicId } = useParams({ from: "/feedback/$topicId" });
  const { duration } = useSearch({ from: "/feedback/$topicId" });
  const navigate = useNavigate();
  const topic = getTopic(topicId);

  const [phase, setPhase] = useState<Phase>("rate");
  const [confidence, setConfidence] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [reflection, setReflection] = useState("");

  const feedback = useMemo(() => computeFeedback({ durationSec: duration, confidence, difficulty }), [duration, confidence, difficulty]);
  const [summary, setSummary] = useState<{ streak: number; total: number; sec: number } | null>(null);

  if (!topic) {
    return (
      <div className="mx-auto max-w-xl px-5 py-12">
        <p className="text-muted-foreground">Topic not found.</p>
        <Link to="/home" className="mt-4 inline-flex text-sm font-semibold text-primary">← Back home</Link>
      </div>
    );
  }

  function submitRatings() {
    setPhase("result");
  }

  function completeChallenge() {
    const { primary } = getDailyAssignment();
    const kind: "primary" | "bonus" = topic!.id === primary.id ? "primary" : "bonus";
    saveCompletedChallenge({ topicId: topic!.id, durationSec: duration, score: feedback.score, kind });
    if (reflection.trim()) saveReflection(topic!.id, reflection);
    const state = getInstallState();
    if (!state.firstCompletionAt) setInstallState({ firstCompletionAt: new Date().toISOString() });
    setSummary({ streak: getStreak().current, total: getCompleted().length, sec: totalSpeakingSeconds() });
    setPhase("success");
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-xl px-5 py-10">
        {phase === "rate" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick check-in</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">How did that feel?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Two quick ratings help us give you better feedback.</p>

            <RatingRow label="Confidence" value={confidence} onChange={setConfidence} hintLow="Shaky" hintHigh="Solid" />
            <RatingRow label="Difficulty" value={difficulty} onChange={setDifficulty} hintLow="Easy" hintHigh="Tough" />

            <button
              onClick={submitRatings}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              See my feedback <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : null}

        {phase === "result" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your feedback</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">{topic.title}</h1>

            <div className="mt-8 grid place-items-center rounded-3xl border border-border p-8 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-card)" }}>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Score</div>
              <div className="mt-2 text-6xl font-bold tracking-tight text-primary">{feedback.score}</div>
              <div className="mt-1 text-xs text-muted-foreground">out of 100 · {formatDuration(duration)} spoken</div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-accent/30 bg-accent-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/80">Strength</p>
                <p className="mt-1 text-sm text-accent-foreground">{feedback.strength}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Try next time</p>
                <p className="mt-1 text-sm text-foreground">{feedback.suggestion}</p>
              </div>
            </div>

            <button
              onClick={() => setPhase("reflect")}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : null}

        {phase === "reflect" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reflection journal</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">What did you improve today?</h1>
            <p className="mt-2 text-sm text-muted-foreground">One sentence is enough. Optional, but it helps the habit stick.</p>

            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Today I focused on…"
              className="mt-6 min-h-[140px] w-full resize-y rounded-2xl border border-border bg-card p-4 text-sm outline-none focus:border-primary"
            />

            <button
              onClick={completeChallenge}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              Complete challenge <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : null}

        {phase === "success" && summary ? (
          <div className="flex flex-col items-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-hero)" }}>
              <PartyPopper className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">Challenge completed</h1>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tomorrow's challenge unlocks tomorrow. Come back to keep your streak alive.
            </p>
            <div className="mt-8 grid w-full grid-cols-3 gap-3">
              <SummaryStat icon={Flame} label="Streak" value={`${summary.streak}d`} />
              <SummaryStat icon={Trophy} label="Done" value={summary.total} />
              <SummaryStat icon={Timer} label="Spoken" value={formatDuration(summary.sec)} />
            </div>
            <button
              onClick={() => navigate({ to: "/home" })}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              <Sparkles className="h-4 w-4" /> Return home
            </button>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
  hintLow,
  hintHigh,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  hintLow: string;
  hintHigh: string;
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{value}/5</span>
      </div>
      <div className="mt-3 flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`h-12 flex-1 rounded-2xl border text-sm font-bold transition ${n <= value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{hintLow}</span>
        <span>{hintHigh}</span>
      </div>
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-[var(--shadow-soft)]">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <div className="mt-2 text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
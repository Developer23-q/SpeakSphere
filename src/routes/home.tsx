import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Trophy, Timer, Radio, BookOpen, Mic, Sparkles, Lock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { KEYS, read } from "@/lib/storage";
import { getDailyAssignment, type Topic } from "@/lib/topics";
import { getStreak } from "@/lib/streak";
import { getCompleted, isTopicDoneToday, totalSpeakingSeconds } from "@/lib/challenge";
import { formatDuration } from "@/lib/recording";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Today's challenge — Speak Sphere" },
      { name: "description", content: "Your daily 2-minute speaking challenge, ready to go." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<{
    primary: Topic;
    bonus: Topic | null;
    streak: number;
    completed: number;
    totalSec: number;
    primaryDone: boolean;
    bonusDone: boolean;
  } | null>(null);

  useEffect(() => {
    const profile = read(KEYS.userProfile, null);
    if (!profile) {
      navigate({ to: "/onboarding", replace: true });
      return;
    }
    const { primary, bonus } = getDailyAssignment();
    setState({
      primary,
      bonus,
      streak: getStreak().current,
      completed: getCompleted().length,
      totalSec: totalSpeakingSeconds(),
      primaryDone: isTopicDoneToday(primary.id),
      bonusDone: bonus ? isTopicDoneToday(bonus.id) : false,
    });
    setReady(true);
  }, [navigate]);

  if (!ready || !state) {
    return (
      <AppShell>
        <div className="h-40 animate-pulse rounded-2xl bg-secondary" />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="grid grid-cols-3 gap-3">
        <StatCard label="Streak" value={`${state.streak}d`} icon={Flame} />
        <StatCard label="Done" value={state.completed} icon={Trophy} />
        <StatCard label="Spoken" value={formatDuration(state.totalSec)} icon={Timer} />
      </section>

      <section className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today's challenge</p>
        <ChallengeCard topic={state.primary} done={state.primaryDone} primary />
      </section>

      {state.bonus ? (
        <section className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Bonus challenge</p>
          <ChallengeCard topic={state.bonus} done={state.bonusDone} />
        </section>
      ) : null}

      <section className="mt-8 rounded-3xl border border-border p-6 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-card)" }}>
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Radio className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold tracking-tight">Weekly live session</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Optional Sunday speaking practice with peers. Registration opens Monday.
            </p>
            <Link to="/live" className="mt-3 inline-flex text-sm font-semibold text-primary">
              See this week's session →
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ChallengeCard({ topic, done, primary }: { topic: Topic; done: boolean; primary?: boolean }) {
  return (
    <div
      className={`mt-2 rounded-3xl border p-6 shadow-[var(--shadow-soft)] ${primary ? "border-primary/20" : "border-border"}`}
      style={primary ? { background: "var(--gradient-card)" } : undefined}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="rounded-full bg-secondary px-2 py-0.5">{topic.difficulty}</span>
        <span>·</span>
        <span>2 min</span>
        {done ? (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent-foreground">
            <Sparkles className="h-3 w-3" /> Done today
          </span>
        ) : null}
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">{topic.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{topic.description}</p>
      <div className="mt-5 flex gap-2">
        <Link
          to="/learn/$topicId"
          params={{ topicId: topic.id }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground"
        >
          <BookOpen className="h-4 w-4" /> Learn
        </Link>
        {done ? (
          <button
            disabled
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground"
          >
            <Lock className="h-4 w-4" /> Practiced
          </button>
        ) : (
          <Link
            to="/practice/$topicId"
            params={{ topicId: topic.id }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
          >
            <Mic className="h-4 w-4" /> Practice
          </Link>
        )}
      </div>
    </div>
  );
}
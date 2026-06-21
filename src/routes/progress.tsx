import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Trophy, Timer, Award, Star, NotebookPen, Mic } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { getStreak } from "@/lib/streak";
import { getCompleted, getRecentReflections, getRecentScores, totalSpeakingSeconds } from "@/lib/challenge";
import { getRecordings } from "@/lib/recording";
import { formatDuration } from "@/lib/recording";
import { getTopic } from "@/lib/topics";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your progress — Speak Sphere" },
      { name: "description", content: "Streaks, scores, reflections, and your last recordings — all in one place." },
    ],
  }),
  component: Progress,
});

function Progress() {
  const [data, setData] = useState<ReturnType<typeof load> | null>(null);
  useEffect(() => setData(load()), []);
  if (!data) return <AppShell title="Progress"><div className="h-40 animate-pulse rounded-2xl bg-secondary" /></AppShell>;

  return (
    <AppShell title="Progress">
      <section className="grid grid-cols-2 gap-3">
        <StatCard label="Current streak" value={`${data.streak.current}d`} icon={Flame} />
        <StatCard label="Longest streak" value={`${data.streak.longest}d`} icon={Award} />
        <StatCard label="Challenges done" value={data.completed} icon={Trophy} />
        <StatCard label="Total spoken" value={formatDuration(data.totalSec)} icon={Timer} />
      </section>

      <Block title="Recent scores" icon={Star}>
        {data.scores.length === 0 ? <Empty>Finish a challenge to see scores here.</Empty> : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {data.scores.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm font-medium">{getTopic(s.topicId)?.title ?? "Topic"}</div>
                  <div className="text-xs text-muted-foreground">{s.date}</div>
                </div>
                <div className="text-lg font-bold text-primary">{s.score}</div>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block title="Recent reflections" icon={NotebookPen}>
        {data.reflections.length === 0 ? <Empty>Your reflections will appear here.</Empty> : (
          <ul className="space-y-2">
            {data.reflections.map((r) => (
              <li key={r.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="text-xs text-muted-foreground">{r.date}</div>
                <p className="mt-1 text-sm">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <Block title="Last recordings" icon={Mic}>
        {data.recordings.length === 0 ? <Empty>Your last five recordings live here.</Empty> : (
          <ul className="space-y-3">
            {data.recordings.map((r) => (
              <li key={r.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{getTopic(r.topicId)?.title ?? "Topic"}</span>
                  <span className="text-xs text-muted-foreground">{formatDuration(r.durationSec)} · {r.date}</span>
                </div>
                <audio controls src={r.dataUrl} className="mt-3 w-full" />
              </li>
            ))}
          </ul>
        )}
      </Block>
    </AppShell>
  );
}

function load() {
  return {
    streak: getStreak(),
    completed: getCompleted().length,
    totalSec: totalSpeakingSeconds(),
    scores: getRecentScores(5),
    reflections: getRecentReflections(5),
    recordings: getRecordings(),
  };
}

function Block({ title, icon: Icon, children }: { title: string; icon: typeof Star; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
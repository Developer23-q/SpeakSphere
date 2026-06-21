import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Radio, Calendar, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live session — Speak Sphere" },
      { name: "description", content: "Optional weekly live speaking session with peers. Sundays." },
    ],
  }),
  component: Live,
});

function nextSunday(now: Date): Date {
  const d = new Date(now);
  const day = d.getDay();
  const add = day === 0 ? 7 : 7 - day;
  d.setDate(d.getDate() + add);
  d.setHours(18, 0, 0, 0);
  return d;
}

function isRegistrationOpen(now: Date): boolean {
  const day = now.getDay();
  // Monday (1) through Friday (5) registration is open.
  return day >= 1 && day <= 5;
}

function Live() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return <AppShell title="Live"><div className="h-40 animate-pulse rounded-2xl bg-secondary" /></AppShell>;

  const target = nextSunday(now);
  const ms = target.getTime() - now.getTime();
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const open = isRegistrationOpen(now);

  return (
    <AppShell title="Live">
      <div className="rounded-3xl border border-border p-6 shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-card)" }}>
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Radio className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Weekly live session</h1>
            <p className="text-sm text-muted-foreground">Sundays · Optional · 30 minutes</p>
          </div>
        </div>

        <div className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${open ? "bg-accent-soft text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
          <span className={`h-2 w-2 rounded-full ${open ? "bg-accent" : "bg-muted-foreground"}`} />
          {open ? "Registration open" : "Registration closed"}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Days", days],
            ["Hours", hours],
            ["Mins", mins],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl border border-border bg-background p-4 text-center">
              <div className="text-3xl font-bold tabular-nums">{Math.max(0, v as number)}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={open ? "https://forms.gle/" : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!open}
            onClick={(e) => { if (!open) e.preventDefault(); }}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ${open ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]" : "cursor-not-allowed bg-secondary text-muted-foreground"}`}
          >
            {open ? "Register now" : "Opens Monday"} <ExternalLink className="h-4 w-4" />
          </a>
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" /> {target.toLocaleString(undefined, { weekday: "long", month: "short", day: "numeric" })}
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Live sessions are completely optional. Your daily practice is what builds the habit.
      </p>
    </AppShell>
  );
}
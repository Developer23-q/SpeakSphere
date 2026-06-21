import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, BookOpen, Mic, Sparkles, Radio, Download } from "lucide-react";
import { KEYS, read } from "@/lib/storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Speak Sphere — Speak Better. 2 Minutes a Day." },
      { name: "description", content: "Build speaking confidence with short daily challenges. Designed for students who want to grow." },
      { property: "og:title", content: "Speak Sphere" },
      { property: "og:description", content: "Speak Better. 2 Minutes a Day." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    const profile = read(KEYS.userProfile, null);
    if (profile) navigate({ to: "/home", replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
            <Mic className="h-4 w-4" />
          </span>
          Speak Sphere
        </div>
        <Link to="/onboarding" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Get started
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-5 pt-6 pb-16 sm:pt-12 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Daily speaking practice
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Speak Better.<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                2 Minutes a Day.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Build confidence through short daily speaking challenges. No camera. No audience. Just you and your voice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/onboarding"
                className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5"
              >
                Start Your First Speaking Challenge
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Free. No account. Works offline.</p>
          </div>

          <HeroArt />
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">Three small steps, every day.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <StepCard step="1" title="Learn" body="A topic, three talking points, a clear structure." icon={BookOpen} />
            <StepCard step="2" title="Speak" body="Record yourself for 30–90 seconds. No pressure." icon={Mic} />
            <StepCard step="3" title="Improve" body="Get an honest score and one thing to work on tomorrow." icon={Sparkles} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16">
        <h2 className="text-3xl font-bold tracking-tight">Why students stick with it</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Tiny daily commitment", "Two minutes is short enough to never skip and long enough to compound."],
            ["Quiet, judgment-free", "No live audience, no scores shared. Just you tracking your own growth."],
            ["Topics that matter", "Built around public speaking, debate, interviews, and MUN."],
            ["Streaks that stick", "Show up every day. Watch your streak — and your voice — grow."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
              <h3 className="font-semibold text-foreground">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl border border-border p-8 shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-card)" }}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                <Radio className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Weekly live speaking sessions</h3>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Practice with peers every Sunday. Registration opens Mondays — completely optional.
                </p>
              </div>
            </div>
            <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              Join the next session
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="rounded-3xl bg-foreground p-8 text-background shadow-[var(--shadow-elegant)] sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-medium">
                <Download className="h-3.5 w-3.5" /> Install the app
              </div>
              <h3 className="mt-4 text-3xl font-bold tracking-tight">Carry your practice with you.</h3>
              <p className="mt-2 max-w-md text-sm opacity-80">
                Add Speak Sphere to your home screen and practice anywhere — even offline.
              </p>
            </div>
            <Link to="/onboarding" className="inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-4 text-base font-semibold text-foreground">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground">
          <span>© Speak Sphere · MVP v1.0</span>
          <div className="flex gap-4">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({
  step,
  title,
  body,
  icon: Icon,
}: {
  step: string;
  title: string;
  body: string;
  icon: typeof BookOpen;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {step}</span>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function HeroArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        className="absolute inset-0 rounded-[2.5rem] opacity-90"
        style={{ background: "var(--gradient-hero)", filter: "blur(40px)", transform: "scale(0.85)" }}
      />
      <div className="relative grid h-full w-full place-items-center rounded-[2.5rem] border border-border bg-card shadow-[var(--shadow-elegant)]">
        <div className="text-center">
          <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Mic className="h-12 w-12" />
            <span className="absolute inset-0 -m-3 animate-ping rounded-full border border-primary/30" />
          </div>
          <p className="mt-6 text-sm font-medium text-muted-foreground">Today's challenge</p>
          <p className="mt-1 text-lg font-semibold">Introduce yourself with confidence</p>
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            <span className="h-2 w-2 rounded-full bg-accent" /> 45–60 seconds
          </div>
        </div>
      </div>
    </div>
  );
}

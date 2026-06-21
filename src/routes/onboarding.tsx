import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { KEYS, write, type UserProfile } from "@/lib/storage";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — Speak Sphere" },
      { name: "description", content: "Three quick questions to personalize your daily speaking practice." },
    ],
  }),
  component: Onboarding,
});

type Step = {
  key: keyof Omit<UserProfile, "createdAt">;
  question: string;
  options: string[];
};

const STEPS: Step[] = [
  { key: "goal", question: "Why are you here?", options: ["Public Speaking", "Debate", "Interviews", "MUN"] },
  { key: "level", question: "What's your experience?", options: ["Beginner", "Intermediate", "Advanced"] },
  { key: "challenge", question: "What's your biggest challenge?", options: ["Confidence", "Nervousness", "Organization", "Filler Words"] },
];

function Onboarding() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const step = STEPS[idx];
  const selected = answers[step.key];
  const isLast = idx === STEPS.length - 1;

  function choose(opt: string) {
    setAnswers((a) => ({ ...a, [step.key]: opt }));
  }

  function next() {
    if (!selected) return;
    if (!isLast) {
      setIdx((i) => i + 1);
      return;
    }
    const profile: UserProfile = {
      goal: answers.goal as UserProfile["goal"],
      level: answers.level as UserProfile["level"],
      challenge: answers.challenge as UserProfile["challenge"],
      createdAt: new Date().toISOString(),
    };
    write(KEYS.userProfile, profile);
    navigate({ to: "/home", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-8">
        <div className="flex items-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= idx ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>

        <div className="mt-12 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Question {idx + 1} of {STEPS.length}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{step.question}</h1>

          <div className="mt-8 space-y-3">
            {step.options.map((opt) => {
              const active = selected === opt;
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${active ? "border-primary bg-primary/5 text-foreground shadow-[var(--shadow-soft)]" : "border-border bg-card text-foreground hover:border-primary/40"}`}
                >
                  {opt}
                  {active ? (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="text-sm font-medium text-muted-foreground disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!selected}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] disabled:opacity-40"
          >
            {isLast ? "Start practicing" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
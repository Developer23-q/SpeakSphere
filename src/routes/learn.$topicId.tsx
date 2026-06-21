import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Mic, AlertTriangle, Layers } from "lucide-react";
import { getTopic } from "@/lib/topics";

export const Route = createFileRoute("/learn/$topicId")({
  head: ({ params }) => ({
    meta: [
      { title: `Learn: ${params.topicId} — Speak Sphere` },
      { name: "description", content: "Topic explanation, talking points, structure, and common mistakes." },
    ],
  }),
  component: Learn,
  notFoundComponent: () => <NotFound />,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <p className="text-muted-foreground">Topic not found.</p>
      <Link to="/home" className="mt-4 inline-flex text-sm font-semibold text-primary">← Back home</Link>
    </div>
  );
}

function Learn() {
  const { topicId } = useParams({ from: "/learn/$topicId" });
  const navigate = useNavigate();
  const topic = getTopic(topicId);
  if (!topic) return <NotFound />;

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-4">
          <button onClick={() => navigate({ to: "/home" })} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">Learn</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{topic.category.replaceAll("_", " ")}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{topic.title}</h1>
        <p className="mt-3 text-base text-muted-foreground">{topic.description}</p>

        <Section icon={BookOpen} title="Three talking points">
          <ul className="space-y-3">
            {topic.talking_points.map((p, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={Layers} title="Suggested structure">
          <div className="grid gap-3">
            <StructureBlock label="Opening" text={topic.structure.opening} />
            <StructureBlock label="Body" text={topic.structure.body} />
            <StructureBlock label="Conclusion" text={topic.structure.conclusion} />
          </div>
        </Section>

        <Section icon={AlertTriangle} title="Common mistakes">
          <ul className="space-y-2">
            {topic.mistakes.map((m, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                <span className="text-destructive">·</span>
                {m}
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <p className="text-xs text-muted-foreground">Ready when you are.</p>
          <Link
            to="/practice/$topicId"
            params={{ topicId: topic.id }}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
          >
            <Mic className="h-4 w-4" /> Practice now
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof BookOpen; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function StructureBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</p>
      <p className="mt-1 text-sm text-foreground">{text}</p>
    </div>
  );
}
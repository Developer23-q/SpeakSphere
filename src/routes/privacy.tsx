import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Speak Sphere" },
      { name: "description", content: "How Speak Sphere handles your data. Short version: it stays on your device." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <Link to="/settings" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Privacy</h1>
      <div className="prose prose-sm mt-4 max-w-none text-foreground">
        <p>Speak Sphere is built for privacy. There is no account, no server, no analytics, and no third-party trackers.</p>
        <h2 className="mt-6 text-lg font-semibold">What we store</h2>
        <p>Your onboarding answers, streak, completed challenges, reflections, scores, and the last five practice recordings are all stored locally in your browser using LocalStorage. Nothing ever leaves your device.</p>
        <h2 className="mt-6 text-lg font-semibold">Microphone</h2>
        <p>We use your browser's microphone only while you are recording. Recordings are saved on your device. Clearing your browser data removes everything.</p>
        <h2 className="mt-6 text-lg font-semibold">Your choice</h2>
        <p>Visit Settings to export, import, or fully reset your data at any time.</p>
      </div>
    </div>
  );
}
import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Mic, Square, RotateCcw, Check, AlertCircle } from "lucide-react";
import { getTopic } from "@/lib/topics";
import { canStartChallenge, isTopicDoneToday } from "@/lib/challenge";
import { formatDuration, pickRecorderMime, saveRecording } from "@/lib/recording";

const MIN_SEC = 30;
const MAX_SEC = 90;

export const Route = createFileRoute("/practice/$topicId")({
  head: ({ params }) => ({
    meta: [
      { title: `Practice: ${params.topicId} — Speak Sphere` },
      { name: "description", content: "Record your speaking practice for today's challenge." },
    ],
  }),
  component: Practice,
});

type Status = "idle" | "requesting" | "recording" | "stopped" | "saving" | "denied" | "unsupported" | "error";

function Practice() {
  const { topicId } = useParams({ from: "/practice/$topicId" });
  const navigate = useNavigate();
  const topic = getTopic(topicId);

  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const startedAtRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => cleanup(), []);

  function cleanup() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }

  async function start() {
    setError(null);
    if (!isTopicDoneToday(topic?.id ?? "") && !canStartChallenge()) {
      setError("You've already completed 2 challenges today. Come back tomorrow.");
      return;
    }
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setStatus("unsupported");
      return;
    }
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = pickRecorderMime();
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      recorderRef.current = rec;
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const finalBlob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        setBlob(finalBlob);
        setPreviewUrl(URL.createObjectURL(finalBlob));
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setStatus("stopped");
      };
      rec.start();
      startedAtRef.current = Date.now();
      setElapsed(0);
      setStatus("recording");
      timerRef.current = window.setInterval(() => {
        const sec = (Date.now() - startedAtRef.current) / 1000;
        setElapsed(sec);
        if (sec >= MAX_SEC) stop();
      }, 100);
    } catch (e) {
      const name = (e as { name?: string }).name;
      if (name === "NotAllowedError" || name === "SecurityError") setStatus("denied");
      else {
        setStatus("error");
        setError("Couldn't start recording. Try again.");
      }
    }
  }

  function stop() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    try {
      recorderRef.current?.stop();
    } catch {}
  }

  function retake() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setBlob(null);
    setElapsed(0);
    setStatus("idle");
  }

  async function submit() {
    if (!blob || !topic) return;
    setStatus("saving");
    const sec = Math.round(elapsed);
    try {
      await saveRecording({ topicId: topic.id, durationSec: sec, blob });
    } catch {}
    navigate({
      to: "/feedback/$topicId",
      params: { topicId: topic.id },
      search: { duration: sec },
    });
  }

  if (!topic) {
    return (
      <div className="mx-auto max-w-xl px-5 py-12">
        <p className="text-muted-foreground">Topic not found.</p>
        <Link to="/home" className="mt-4 inline-flex text-sm font-semibold text-primary">← Back home</Link>
      </div>
    );
  }

  const pct = Math.min(100, (elapsed / MAX_SEC) * 100);
  const minReached = elapsed >= MIN_SEC;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4">
          <button onClick={() => navigate({ to: "/home" })} aria-label="Back" className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">Practice</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-xl flex-col items-center px-5 py-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{topic.category.replaceAll("_", " ")}</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{topic.title}</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Aim for 45–60 seconds. Maximum 90 seconds.
        </p>

        <div className="relative mt-10 grid h-56 w-56 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="46" stroke="var(--color-secondary)" strokeWidth="4" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke={minReached ? "var(--color-accent)" : "var(--color-primary)"}
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${(Math.PI * 92 * pct) / 100} ${Math.PI * 92}`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
          <div className={`grid h-36 w-36 place-items-center rounded-full text-primary-foreground transition ${status === "recording" ? "scale-105" : ""}`} style={{ background: "var(--gradient-hero)" }}>
            <Mic className={`h-16 w-16 ${status === "recording" ? "animate-pulse" : ""}`} />
          </div>
        </div>

        <div className="mt-6 font-mono text-3xl font-bold tabular-nums">{formatDuration(elapsed)}</div>
        <p className="mt-1 text-xs text-muted-foreground">
          {status === "recording"
            ? minReached
              ? "Great pace — keep going or tap stop."
              : `Speak for at least ${MIN_SEC}s`
            : "Tap to start"}
        </p>

        {error ? (
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" /> {error}
          </div>
        ) : null}

        {status === "denied" ? (
          <div className="mt-6 max-w-sm rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Microphone access was denied. Enable it in your browser's site settings and try again.
          </div>
        ) : null}
        {status === "unsupported" ? (
          <div className="mt-6 max-w-sm rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Your browser doesn't support audio recording. Try Chrome, Edge, or Safari on a recent device.
          </div>
        ) : null}

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          {status === "idle" || status === "denied" || status === "unsupported" || status === "error" ? (
            <button
              onClick={start}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              <Mic className="h-5 w-5" /> Start recording
            </button>
          ) : null}
          {status === "requesting" ? (
            <p className="text-sm text-muted-foreground">Requesting microphone…</p>
          ) : null}
          {status === "recording" ? (
            <button
              onClick={stop}
              disabled={!minReached}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background disabled:opacity-50"
            >
              <Square className="h-5 w-5" /> {minReached ? "Stop" : `Stop available at ${MIN_SEC}s`}
            </button>
          ) : null}
          {status === "stopped" ? (
            <>
              {previewUrl ? (
                <audio src={previewUrl} controls className="w-full" />
              ) : null}
              <div className="flex gap-2">
                <button
                  onClick={retake}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                >
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
                <button
                  onClick={submit}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]"
                >
                  <Check className="h-4 w-4" /> Submit
                </button>
              </div>
            </>
          ) : null}
          {status === "saving" ? <p className="text-sm text-muted-foreground">Saving…</p> : null}
        </div>
      </main>
    </div>
  );
}
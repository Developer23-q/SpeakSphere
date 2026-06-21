import { n as getTopic } from "./topics-Dp1zJQfY.js";
import { a as canStartChallenge, i as saveRecording, l as isTopicDoneToday, r as pickRecorderMime, t as formatDuration } from "./recording-Cl6tv2EO.js";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AlertCircle, ArrowLeft, Check, Mic, RotateCcw, Square } from "lucide-react";
//#region src/routes/practice.$topicId.tsx?tsr-split=component
var MIN_SEC = 30;
var MAX_SEC = 90;
function Practice() {
	const { topicId } = useParams({ from: "/practice/$topicId" });
	const navigate = useNavigate();
	const topic = getTopic(topicId);
	const [status, setStatus] = useState("idle");
	const [elapsed, setElapsed] = useState(0);
	const [error, setError] = useState(null);
	const [blob, setBlob] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const recorderRef = useRef(null);
	const chunksRef = useRef([]);
	const streamRef = useRef(null);
	const startedAtRef = useRef(0);
	const timerRef = useRef(null);
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
				const sec = (Date.now() - startedAtRef.current) / 1e3;
				setElapsed(sec);
				if (sec >= MAX_SEC) stop();
			}, 100);
		} catch (e) {
			const name = e.name;
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
			await saveRecording({
				topicId: topic.id,
				durationSec: sec,
				blob
			});
		} catch {}
		navigate({
			to: "/feedback/$topicId",
			params: { topicId: topic.id },
			search: { duration: sec }
		});
	}
	if (!topic) return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-xl px-5 py-12",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: "Topic not found."
		}), /* @__PURE__ */ jsx(Link, {
			to: "/home",
			className: "mt-4 inline-flex text-sm font-semibold text-primary",
			children: "← Back home"
		})]
	});
	const pct = Math.min(100, elapsed / MAX_SEC * 100);
	const minReached = elapsed >= MIN_SEC;
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b border-border/60",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-xl items-center gap-3 px-5 py-4",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => navigate({ to: "/home" }),
					"aria-label": "Back",
					className: "grid h-9 w-9 place-items-center rounded-xl border border-border bg-card",
					children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
				}), /* @__PURE__ */ jsx("span", {
					className: "text-sm font-medium text-muted-foreground",
					children: "Practice"
				})]
			})
		}), /* @__PURE__ */ jsxs("main", {
			className: "mx-auto flex max-w-xl flex-col items-center px-5 py-10 text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: topic.category.replaceAll("_", " ")
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
					children: topic.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 max-w-md text-sm text-muted-foreground",
					children: "Aim for 45–60 seconds. Maximum 90 seconds."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative mt-10 grid h-56 w-56 place-items-center",
					children: [/* @__PURE__ */ jsxs("svg", {
						viewBox: "0 0 100 100",
						className: "absolute inset-0 -rotate-90",
						children: [/* @__PURE__ */ jsx("circle", {
							cx: "50",
							cy: "50",
							r: "46",
							stroke: "var(--color-secondary)",
							strokeWidth: "4",
							fill: "none"
						}), /* @__PURE__ */ jsx("circle", {
							cx: "50",
							cy: "50",
							r: "46",
							stroke: minReached ? "var(--color-accent)" : "var(--color-primary)",
							strokeWidth: "4",
							fill: "none",
							strokeDasharray: `${Math.PI * 92 * pct / 100} ${Math.PI * 92}`,
							strokeLinecap: "round",
							className: "transition-all duration-100"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: `grid h-36 w-36 place-items-center rounded-full text-primary-foreground transition ${status === "recording" ? "scale-105" : ""}`,
						style: { background: "var(--gradient-hero)" },
						children: /* @__PURE__ */ jsx(Mic, { className: `h-16 w-16 ${status === "recording" ? "animate-pulse" : ""}` })
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 font-mono text-3xl font-bold tabular-nums",
					children: formatDuration(elapsed)
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: status === "recording" ? minReached ? "Great pace — keep going or tap stop." : `Speak for at least ${MIN_SEC}s` : "Tap to start"
				}),
				error ? /* @__PURE__ */ jsxs("div", {
					className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive",
					children: [
						/* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
						" ",
						error
					]
				}) : null,
				status === "denied" ? /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-sm rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground",
					children: "Microphone access was denied. Enable it in your browser's site settings and try again."
				}) : null,
				status === "unsupported" ? /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-sm rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground",
					children: "Your browser doesn't support audio recording. Try Chrome, Edge, or Safari on a recent device."
				}) : null,
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex w-full max-w-sm flex-col gap-3",
					children: [
						status === "idle" || status === "denied" || status === "unsupported" || status === "error" ? /* @__PURE__ */ jsxs("button", {
							onClick: start,
							className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
							children: [/* @__PURE__ */ jsx(Mic, { className: "h-5 w-5" }), " Start recording"]
						}) : null,
						status === "requesting" ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Requesting microphone…"
						}) : null,
						status === "recording" ? /* @__PURE__ */ jsxs("button", {
							onClick: stop,
							disabled: !minReached,
							className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-base font-semibold text-background disabled:opacity-50",
							children: [
								/* @__PURE__ */ jsx(Square, { className: "h-5 w-5" }),
								" ",
								minReached ? "Stop" : `Stop available at ${MIN_SEC}s`
							]
						}) : null,
						status === "stopped" ? /* @__PURE__ */ jsxs(Fragment, { children: [previewUrl ? /* @__PURE__ */ jsx("audio", {
							src: previewUrl,
							controls: true,
							className: "w-full"
						}) : null, /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: retake,
								className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold",
								children: [/* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }), " Retake"]
							}), /* @__PURE__ */ jsxs("button", {
								onClick: submit,
								className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
								children: [/* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }), " Submit"]
							})]
						})] }) : null,
						status === "saving" ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Saving…"
						}) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { Practice as component };

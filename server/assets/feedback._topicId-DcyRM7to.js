import { i as setInstallState, t as getInstallState } from "./pwa-BoobZY18.js";
import { n as getTopic, t as getDailyAssignment } from "./topics-Dp1zJQfY.js";
import { d as saveReflection, f as totalSpeakingSeconds, o as getCompleted, p as getStreak, t as formatDuration, u as saveCompletedChallenge } from "./recording-Cl6tv2EO.js";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Flame, PartyPopper, Sparkles, Timer, Trophy } from "lucide-react";
//#region src/lib/feedback.ts
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
function computeFeedback({ durationSec, confidence, difficulty }) {
	let base;
	let strength;
	let suggestion;
	if (durationSec < 30) {
		base = 40 + Math.round(Math.random() * 10);
		strength = "You showed up and pressed record — that's the hardest part.";
		suggestion = "Speak longer next time. Aim for 45 seconds and develop one idea fully.";
	} else if (durationSec < 60) {
		base = 55 + Math.round(Math.random() * 20);
		strength = "Good warm-up. You held your thought together for nearly a minute.";
		suggestion = "Add one supporting example or short story to each point.";
	} else {
		base = 75 + Math.round(Math.random() * 15);
		strength = "Strong effort and great stamina at the mic.";
		suggestion = "Tighten your structure: opening hook, two points, and a clear close.";
	}
	base += (confidence - 3) * 2;
	base += (difficulty - 3) * 1;
	return {
		score: clamp(Math.round(base), 30, 99),
		strength,
		suggestion
	};
}
//#endregion
//#region src/routes/feedback.$topicId.tsx?tsr-split=component
function Feedback() {
	const { topicId } = useParams({ from: "/feedback/$topicId" });
	const { duration } = useSearch({ from: "/feedback/$topicId" });
	const navigate = useNavigate();
	const topic = getTopic(topicId);
	const [phase, setPhase] = useState("rate");
	const [confidence, setConfidence] = useState(3);
	const [difficulty, setDifficulty] = useState(3);
	const [reflection, setReflection] = useState("");
	const feedback = useMemo(() => computeFeedback({
		durationSec: duration,
		confidence,
		difficulty
	}), [
		duration,
		confidence,
		difficulty
	]);
	const [summary, setSummary] = useState(null);
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
	function submitRatings() {
		setPhase("result");
	}
	function completeChallenge() {
		const { primary } = getDailyAssignment();
		const kind = topic.id === primary.id ? "primary" : "bonus";
		saveCompletedChallenge({
			topicId: topic.id,
			durationSec: duration,
			score: feedback.score,
			kind
		});
		if (reflection.trim()) saveReflection(topic.id, reflection);
		if (!getInstallState().firstCompletionAt) setInstallState({ firstCompletionAt: (/* @__PURE__ */ new Date()).toISOString() });
		setSummary({
			streak: getStreak().current,
			total: getCompleted().length,
			sec: totalSpeakingSeconds()
		});
		setPhase("success");
	}
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ jsxs("main", {
			className: "mx-auto max-w-xl px-5 py-10",
			children: [
				phase === "rate" ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Quick check-in"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-3xl font-bold tracking-tight",
						children: "How did that feel?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Two quick ratings help us give you better feedback."
					}),
					/* @__PURE__ */ jsx(RatingRow, {
						label: "Confidence",
						value: confidence,
						onChange: setConfidence,
						hintLow: "Shaky",
						hintHigh: "Solid"
					}),
					/* @__PURE__ */ jsx(RatingRow, {
						label: "Difficulty",
						value: difficulty,
						onChange: setDifficulty,
						hintLow: "Easy",
						hintHigh: "Tough"
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: submitRatings,
						className: "mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
						children: ["See my feedback ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				] }) : null,
				phase === "result" ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Your feedback"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-3xl font-bold tracking-tight",
						children: topic.title
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 grid place-items-center rounded-3xl border border-border p-8 shadow-[var(--shadow-soft)]",
						style: { background: "var(--gradient-card)" },
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Score"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-2 text-6xl font-bold tracking-tight text-primary",
								children: feedback.score
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									"out of 100 · ",
									formatDuration(duration),
									" spoken"
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-accent/30 bg-accent-soft p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-accent-foreground/80",
								children: "Strength"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-accent-foreground",
								children: feedback.strength
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-primary",
								children: "Try next time"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-sm text-foreground",
								children: feedback.suggestion
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: () => setPhase("reflect"),
						className: "mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
						children: ["Continue ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				] }) : null,
				phase === "reflect" ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Reflection journal"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-3xl font-bold tracking-tight",
						children: "What did you improve today?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "One sentence is enough. Optional, but it helps the habit stick."
					}),
					/* @__PURE__ */ jsx("textarea", {
						value: reflection,
						onChange: (e) => setReflection(e.target.value),
						placeholder: "Today I focused on…",
						className: "mt-6 min-h-[140px] w-full resize-y rounded-2xl border border-border bg-card p-4 text-sm outline-none focus:border-primary"
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: completeChallenge,
						className: "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
						children: ["Complete challenge ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				] }) : null,
				phase === "success" && summary ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-20 w-20 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-elegant)]",
							style: { background: "var(--gradient-hero)" },
							children: /* @__PURE__ */ jsx(PartyPopper, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-6 text-3xl font-bold tracking-tight",
							children: "Challenge completed"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 max-w-sm text-sm text-muted-foreground",
							children: "Tomorrow's challenge unlocks tomorrow. Come back to keep your streak alive."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 grid w-full grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ jsx(SummaryStat, {
									icon: Flame,
									label: "Streak",
									value: `${summary.streak}d`
								}),
								/* @__PURE__ */ jsx(SummaryStat, {
									icon: Trophy,
									label: "Done",
									value: summary.total
								}),
								/* @__PURE__ */ jsx(SummaryStat, {
									icon: Timer,
									label: "Spoken",
									value: formatDuration(summary.sec)
								})
							]
						}),
						/* @__PURE__ */ jsxs("button", {
							onClick: () => navigate({ to: "/home" }),
							className: "mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), " Return home"]
						})
					]
				}) : null
			]
		})
	});
}
function RatingRow({ label, value, onChange, hintLow, hintHigh }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-semibold",
					children: label
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-muted-foreground",
					children: [value, "/5"]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3 flex gap-2",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((n) => /* @__PURE__ */ jsx("button", {
					onClick: () => onChange(n),
					className: `h-12 flex-1 rounded-2xl border text-sm font-bold transition ${n <= value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`,
					children: n
				}, n))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ jsx("span", { children: hintLow }), /* @__PURE__ */ jsx("span", { children: hintHigh })]
			})
		]
	});
}
function SummaryStat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-border bg-card p-4 text-center shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ jsx(Icon, { className: "mx-auto h-5 w-5 text-primary" }),
			/* @__PURE__ */ jsx("div", {
				className: "mt-2 text-lg font-bold",
				children: value
			}),
			/* @__PURE__ */ jsx("div", {
				className: "text-[10px] uppercase tracking-wider text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { Feedback as component };

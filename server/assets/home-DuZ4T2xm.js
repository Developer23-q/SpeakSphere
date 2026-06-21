import { a as read, t as KEYS } from "./storage-CbiPQ69e.js";
import { t as getDailyAssignment } from "./topics-Dp1zJQfY.js";
import { f as totalSpeakingSeconds, l as isTopicDoneToday, o as getCompleted, p as getStreak, t as formatDuration } from "./recording-Cl6tv2EO.js";
import { t as AppShell } from "./AppShell-CXpfxu9l.js";
import { t as StatCard } from "./StatCard-BMSCIXWe.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BookOpen, Flame, Lock, Mic, Radio, Sparkles, Timer, Trophy } from "lucide-react";
//#region src/routes/home.tsx?tsr-split=component
function Home() {
	const navigate = useNavigate();
	const [ready, setReady] = useState(false);
	const [state, setState] = useState(null);
	useEffect(() => {
		if (!read(KEYS.userProfile, null)) {
			navigate({
				to: "/onboarding",
				replace: true
			});
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
			bonusDone: bonus ? isTopicDoneToday(bonus.id) : false
		});
		setReady(true);
	}, [navigate]);
	if (!ready || !state) return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-secondary" }) });
	return /* @__PURE__ */ jsxs(AppShell, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ jsx(StatCard, {
					label: "Streak",
					value: `${state.streak}d`,
					icon: Flame
				}),
				/* @__PURE__ */ jsx(StatCard, {
					label: "Done",
					value: state.completed,
					icon: Trophy
				}),
				/* @__PURE__ */ jsx(StatCard, {
					label: "Spoken",
					value: formatDuration(state.totalSec),
					icon: Timer
				})
			]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Today's challenge"
			}), /* @__PURE__ */ jsx(ChallengeCard, {
				topic: state.primary,
				done: state.primaryDone,
				primary: true
			})]
		}),
		state.bonus ? /* @__PURE__ */ jsxs("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Bonus challenge"
			}), /* @__PURE__ */ jsx(ChallengeCard, {
				topic: state.bonus,
				done: state.bonusDone
			})]
		}) : null,
		/* @__PURE__ */ jsx("section", {
			className: "mt-8 rounded-3xl border border-border p-6 shadow-[var(--shadow-soft)]",
			style: { background: "var(--gradient-card)" },
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-start gap-4",
				children: [/* @__PURE__ */ jsx("span", {
					className: "grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground",
					style: { background: "var(--gradient-hero)" },
					children: /* @__PURE__ */ jsx(Radio, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-bold tracking-tight",
							children: "Weekly live session"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Optional Sunday speaking practice with peers. Registration opens Monday."
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/live",
							className: "mt-3 inline-flex text-sm font-semibold text-primary",
							children: "See this week's session →"
						})
					]
				})]
			})
		})
	] });
}
function ChallengeCard({ topic, done, primary }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `mt-2 rounded-3xl border p-6 shadow-[var(--shadow-soft)] ${primary ? "border-primary/20" : "border-border"}`,
		style: primary ? { background: "var(--gradient-card)" } : void 0,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "rounded-full bg-secondary px-2 py-0.5",
						children: topic.difficulty
					}),
					/* @__PURE__ */ jsx("span", { children: "·" }),
					/* @__PURE__ */ jsx("span", { children: "2 min" }),
					done ? /* @__PURE__ */ jsxs("span", {
						className: "ml-auto inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-accent-foreground",
						children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }), " Done today"]
					}) : null
				]
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-3 text-2xl font-bold tracking-tight",
				children: topic.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
				children: topic.description
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/learn/$topicId",
					params: { topicId: topic.id },
					className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ jsx(BookOpen, { className: "h-4 w-4" }), " Learn"]
				}), done ? /* @__PURE__ */ jsxs("button", {
					disabled: true,
					className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-muted-foreground",
					children: [/* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }), " Practiced"]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: "/practice/$topicId",
					params: { topicId: topic.id },
					className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
					children: [/* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" }), " Practice"]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };

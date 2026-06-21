import { n as getTopic } from "./topics-Dp1zJQfY.js";
import { c as getRecentScores, f as totalSpeakingSeconds, n as getRecordings, o as getCompleted, p as getStreak, s as getRecentReflections, t as formatDuration } from "./recording-Cl6tv2EO.js";
import { t as AppShell } from "./AppShell-CXpfxu9l.js";
import { t as StatCard } from "./StatCard-BMSCIXWe.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Award, Flame, Mic, NotebookPen, Star, Timer, Trophy } from "lucide-react";
//#region src/routes/progress.tsx?tsr-split=component
function Progress() {
	const [data, setData] = useState(null);
	useEffect(() => setData(load()), []);
	if (!data) return /* @__PURE__ */ jsx(AppShell, {
		title: "Progress",
		children: /* @__PURE__ */ jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-secondary" })
	});
	return /* @__PURE__ */ jsxs(AppShell, {
		title: "Progress",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ jsx(StatCard, {
						label: "Current streak",
						value: `${data.streak.current}d`,
						icon: Flame
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Longest streak",
						value: `${data.streak.longest}d`,
						icon: Award
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Challenges done",
						value: data.completed,
						icon: Trophy
					}),
					/* @__PURE__ */ jsx(StatCard, {
						label: "Total spoken",
						value: formatDuration(data.totalSec),
						icon: Timer
					})
				]
			}),
			/* @__PURE__ */ jsx(Block, {
				title: "Recent scores",
				icon: Star,
				children: data.scores.length === 0 ? /* @__PURE__ */ jsx(Empty, { children: "Finish a challenge to see scores here." }) : /* @__PURE__ */ jsx("ul", {
					className: "divide-y divide-border rounded-2xl border border-border bg-card",
					children: data.scores.map((s) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-medium",
							children: getTopic(s.topicId)?.title ?? "Topic"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: s.date
						})] }), /* @__PURE__ */ jsx("div", {
							className: "text-lg font-bold text-primary",
							children: s.score
						})]
					}, s.id))
				})
			}),
			/* @__PURE__ */ jsx(Block, {
				title: "Recent reflections",
				icon: NotebookPen,
				children: data.reflections.length === 0 ? /* @__PURE__ */ jsx(Empty, { children: "Your reflections will appear here." }) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-2",
					children: data.reflections.map((r) => /* @__PURE__ */ jsxs("li", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs text-muted-foreground",
							children: r.date
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm",
							children: r.text
						})]
					}, r.id))
				})
			}),
			/* @__PURE__ */ jsx(Block, {
				title: "Last recordings",
				icon: Mic,
				children: data.recordings.length === 0 ? /* @__PURE__ */ jsx(Empty, { children: "Your last five recordings live here." }) : /* @__PURE__ */ jsx("ul", {
					className: "space-y-3",
					children: data.recordings.map((r) => /* @__PURE__ */ jsxs("li", {
						className: "rounded-2xl border border-border bg-card p-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: getTopic(r.topicId)?.title ?? "Topic"
							}), /* @__PURE__ */ jsxs("span", {
								className: "text-xs text-muted-foreground",
								children: [
									formatDuration(r.durationSec),
									" · ",
									r.date
								]
							})]
						}), /* @__PURE__ */ jsx("audio", {
							controls: true,
							src: r.dataUrl,
							className: "mt-3 w-full"
						})]
					}, r.id))
				})
			})
		]
	});
}
function load() {
	return {
		streak: getStreak(),
		completed: getCompleted().length,
		totalSec: totalSpeakingSeconds(),
		scores: getRecentScores(5),
		reflections: getRecentReflections(5),
		recordings: getRecordings()
	};
}
function Block({ title, icon: Icon, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground",
			children: [
				/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
				" ",
				title
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-3",
			children
		})]
	});
}
function Empty({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground",
		children
	});
}
//#endregion
export { Progress as component };

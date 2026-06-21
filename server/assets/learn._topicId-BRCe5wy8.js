import { n as getTopic } from "./topics-Dp1zJQfY.js";
import { t as NotFound } from "./learn._topicId-CanylV9T.js";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { AlertTriangle, ArrowLeft, BookOpen, Layers, Mic } from "lucide-react";
//#region src/routes/learn.$topicId.tsx?tsr-split=component
function Learn() {
	const { topicId } = useParams({ from: "/learn/$topicId" });
	const navigate = useNavigate();
	const topic = getTopic(topicId);
	if (!topic) return /* @__PURE__ */ jsx(NotFound, {});
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background pb-32",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-2xl items-center gap-3 px-5 py-4",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => navigate({ to: "/home" }),
						"aria-label": "Back",
						className: "grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-foreground",
						children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium text-muted-foreground",
						children: "Learn"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("main", {
				className: "mx-auto max-w-2xl px-5 py-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: topic.category.replaceAll("_", " ")
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
						children: topic.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 text-base text-muted-foreground",
						children: topic.description
					}),
					/* @__PURE__ */ jsx(Section, {
						icon: BookOpen,
						title: "Three talking points",
						children: /* @__PURE__ */ jsx("ul", {
							className: "space-y-3",
							children: topic.talking_points.map((p, i) => /* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground",
									children: i + 1
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm",
									children: p
								})]
							}, i))
						})
					}),
					/* @__PURE__ */ jsx(Section, {
						icon: Layers,
						title: "Suggested structure",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-3",
							children: [
								/* @__PURE__ */ jsx(StructureBlock, {
									label: "Opening",
									text: topic.structure.opening
								}),
								/* @__PURE__ */ jsx(StructureBlock, {
									label: "Body",
									text: topic.structure.body
								}),
								/* @__PURE__ */ jsx(StructureBlock, {
									label: "Conclusion",
									text: topic.structure.conclusion
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(Section, {
						icon: AlertTriangle,
						title: "Common mistakes",
						children: /* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: topic.mistakes.map((m, i) => /* @__PURE__ */ jsxs("li", {
								className: "flex gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-destructive",
									children: "·"
								}), m]
							}, i))
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "fixed bottom-0 left-0 right-0 border-t border-border/60 bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-2xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-xs text-muted-foreground",
						children: "Ready when you are."
					}), /* @__PURE__ */ jsxs(Link, {
						to: "/practice/$topicId",
						params: { topicId: topic.id },
						className: "inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]",
						children: [/* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" }), " Practice now"]
					})]
				})
			})
		]
	});
}
function Section({ icon: Icon, title, children }) {
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
function StructureBlock({ label, text }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xs font-semibold uppercase tracking-wider text-primary",
			children: label
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-foreground",
			children: text
		})]
	});
}
//#endregion
export { Learn as component };

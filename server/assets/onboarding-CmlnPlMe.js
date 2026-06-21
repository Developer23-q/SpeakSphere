import { c as write, t as KEYS } from "./storage-CbiPQ69e.js";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Check } from "lucide-react";
//#region src/routes/onboarding.tsx?tsr-split=component
var STEPS = [
	{
		key: "goal",
		question: "Why are you here?",
		options: [
			"Public Speaking",
			"Debate",
			"Interviews",
			"MUN"
		]
	},
	{
		key: "level",
		question: "What's your experience?",
		options: [
			"Beginner",
			"Intermediate",
			"Advanced"
		]
	},
	{
		key: "challenge",
		question: "What's your biggest challenge?",
		options: [
			"Confidence",
			"Nervousness",
			"Organization",
			"Filler Words"
		]
	}
];
function Onboarding() {
	const navigate = useNavigate();
	const [idx, setIdx] = useState(0);
	const [answers, setAnswers] = useState({});
	const step = STEPS[idx];
	const selected = answers[step.key];
	const isLast = idx === STEPS.length - 1;
	function choose(opt) {
		setAnswers((a) => ({
			...a,
			[step.key]: opt
		}));
	}
	function next() {
		if (!selected) return;
		if (!isLast) {
			setIdx((i) => i + 1);
			return;
		}
		const profile = {
			goal: answers.goal,
			level: answers.level,
			challenge: answers.challenge,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		write(KEYS.userProfile, profile);
		navigate({
			to: "/home",
			replace: true
		});
	}
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto flex min-h-screen max-w-xl flex-col px-5 py-8",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex items-center gap-2",
					children: STEPS.map((_, i) => /* @__PURE__ */ jsx("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${i <= idx ? "bg-primary" : "bg-secondary"}` }, i))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-12 flex-1",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								"Question ",
								idx + 1,
								" of ",
								STEPS.length
							]
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-3 text-3xl font-bold tracking-tight sm:text-4xl",
							children: step.question
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8 space-y-3",
							children: step.options.map((opt) => {
								const active = selected === opt;
								return /* @__PURE__ */ jsxs("button", {
									onClick: () => choose(opt),
									className: `flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${active ? "border-primary bg-primary/5 text-foreground shadow-[var(--shadow-soft)]" : "border-border bg-card text-foreground hover:border-primary/40"}`,
									children: [opt, active ? /* @__PURE__ */ jsx("span", {
										className: "grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground",
										children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" })
									}) : null]
								}, opt);
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setIdx((i) => Math.max(0, i - 1)),
						disabled: idx === 0,
						className: "text-sm font-medium text-muted-foreground disabled:opacity-40",
						children: "Back"
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: next,
						disabled: !selected,
						className: "inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] disabled:opacity-40",
						children: [isLast ? "Start practicing" : "Continue", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})]
				})
			]
		})
	});
}
//#endregion
export { Onboarding as component };

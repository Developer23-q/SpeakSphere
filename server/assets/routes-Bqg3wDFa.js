import { a as read, t as KEYS } from "./storage-CbiPQ69e.js";
import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, BookOpen, Download, Mic, Radio, Sparkles } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
function Landing() {
	const navigate = useNavigate();
	useEffect(() => {
		if (read(KEYS.userProfile, null)) navigate({
			to: "/home",
			replace: true
		});
	}, [navigate]);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "mx-auto flex max-w-5xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 font-semibold tracking-tight",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)]",
						style: { background: "var(--gradient-hero)" },
						children: /* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" })
					}), "Speak Sphere"]
				}), /* @__PURE__ */ jsx(Link, {
					to: "/onboarding",
					className: "text-sm font-medium text-muted-foreground hover:text-foreground",
					children: "Get started"
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "mx-auto max-w-5xl px-5 pt-6 pb-16 sm:pt-12 sm:pb-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent" }), " Daily speaking practice"]
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl",
							children: [
								"Speak Better.",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "bg-clip-text text-transparent",
									style: { backgroundImage: "var(--gradient-hero)" },
									children: "2 Minutes a Day."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 max-w-lg text-lg text-muted-foreground",
							children: "Build confidence through short daily speaking challenges. No camera. No audience. Just you and your voice."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/onboarding",
								className: "group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform hover:-translate-y-0.5",
								children: ["Start Your First Speaking Challenge", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "Free. No account. Works offline."
						})
					] }), /* @__PURE__ */ jsx(HeroArt, {})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-t border-border/60 bg-secondary/40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-5xl px-5 py-16",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl font-bold tracking-tight",
							children: "How it works"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 max-w-xl text-muted-foreground",
							children: "Three small steps, every day."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 grid gap-5 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(StepCard, {
									step: "1",
									title: "Learn",
									body: "A topic, three talking points, a clear structure.",
									icon: BookOpen
								}),
								/* @__PURE__ */ jsx(StepCard, {
									step: "2",
									title: "Speak",
									body: "Record yourself for 30–90 seconds. No pressure.",
									icon: Mic
								}),
								/* @__PURE__ */ jsx(StepCard, {
									step: "3",
									title: "Improve",
									body: "Get an honest score and one thing to work on tomorrow.",
									icon: Sparkles
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mx-auto max-w-5xl px-5 py-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl font-bold tracking-tight",
					children: "Why students stick with it"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: [
						["Tiny daily commitment", "Two minutes is short enough to never skip and long enough to compound."],
						["Quiet, judgment-free", "No live audience, no scores shared. Just you tracking your own growth."],
						["Topics that matter", "Built around public speaking, debate, interviews, and MUN."],
						["Streaks that stick", "Show up every day. Watch your streak — and your voice — grow."]
					].map(([t, b]) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold text-foreground",
							children: t
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: b
						})]
					}, t))
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "mx-auto max-w-5xl px-5 pb-16",
				children: /* @__PURE__ */ jsx("div", {
					className: "rounded-3xl border border-border p-8 shadow-[var(--shadow-elegant)]",
					style: { background: "var(--gradient-card)" },
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground",
								style: { background: "var(--gradient-hero)" },
								children: /* @__PURE__ */ jsx(Radio, { className: "h-5 w-5" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-bold tracking-tight",
								children: "Weekly live speaking sessions"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 max-w-md text-sm text-muted-foreground",
								children: "Practice with peers every Sunday. Registration opens Mondays — completely optional."
							})] })]
						}), /* @__PURE__ */ jsx(Link, {
							to: "/onboarding",
							className: "inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary",
							children: "Join the next session"
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "mx-auto max-w-5xl px-5 pb-20",
				children: /* @__PURE__ */ jsx("div", {
					className: "rounded-3xl bg-foreground p-8 text-background shadow-[var(--shadow-elegant)] sm:p-12",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-medium",
								children: [/* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }), " Install the app"]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-4 text-3xl font-bold tracking-tight",
								children: "Carry your practice with you."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-md text-sm opacity-80",
								children: "Add Speak Sphere to your home screen and practice anywhere — even offline."
							})
						] }), /* @__PURE__ */ jsxs(Link, {
							to: "/onboarding",
							className: "inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-4 text-base font-semibold text-foreground",
							children: ["Get started ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("footer", {
				className: "border-t border-border/60",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ jsx("span", { children: "© Speak Sphere · MVP v1.0" }), /* @__PURE__ */ jsxs("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/privacy",
							children: "Privacy"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/terms",
							children: "Terms"
						})]
					})]
				})
			})
		]
	});
}
function StepCard({ step, title, body, icon: Icon }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ jsx("span", {
					className: "grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary",
					children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
					children: ["Step ", step]
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-4 text-xl font-bold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: body
			})
		]
	});
}
function HeroArt() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative mx-auto aspect-square w-full max-w-md",
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute inset-0 rounded-[2.5rem] opacity-90",
			style: {
				background: "var(--gradient-hero)",
				filter: "blur(40px)",
				transform: "scale(0.85)"
			}
		}), /* @__PURE__ */ jsx("div", {
			className: "relative grid h-full w-full place-items-center rounded-[2.5rem] border border-border bg-card shadow-[var(--shadow-elegant)]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto grid h-32 w-32 place-items-center rounded-full text-primary-foreground",
						style: { background: "var(--gradient-hero)" },
						children: [/* @__PURE__ */ jsx(Mic, { className: "h-12 w-12" }), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -m-3 animate-ping rounded-full border border-primary/30" })]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 text-sm font-medium text-muted-foreground",
						children: "Today's challenge"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1 text-lg font-semibold",
						children: "Introduce yourself with confidence"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-foreground",
						children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-accent" }), " 45–60 seconds"]
					})
				]
			})
		})]
	});
}
//#endregion
export { Landing as component };

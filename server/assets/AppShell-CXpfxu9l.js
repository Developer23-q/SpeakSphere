import { a as read, t as KEYS } from "./storage-CbiPQ69e.js";
import { i as setInstallState, n as isStandalone, t as getInstallState } from "./pwa-BoobZY18.js";
import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, Download, Home, Mic, Radio, Settings, X } from "lucide-react";
//#region src/components/InstallPrompt.tsx
function InstallPrompt() {
	const [evt, setEvt] = useState(null);
	const [eligible, setEligible] = useState(false);
	useEffect(() => {
		if (isStandalone()) return;
		const onBIP = (e) => {
			e.preventDefault();
			setEvt(e);
		};
		const onInstalled = () => {
			setInstallState({ installed: true });
			setEvt(null);
			setEligible(false);
		};
		window.addEventListener("beforeinstallprompt", onBIP);
		window.addEventListener("appinstalled", onInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", onBIP);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	useEffect(() => {
		const state = getInstallState();
		if (state.installed || state.dismissedAt) {
			setEligible(false);
			return;
		}
		setEligible(read(KEYS.completedChallenges, []).length >= 1);
	}, []);
	if (!eligible || !evt) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "fixed bottom-24 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elegant)]",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground",
					style: { background: "var(--gradient-hero)" },
					children: /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-sm font-semibold text-foreground",
							children: "Install Speak Sphere"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Add to your home screen for one-tap daily practice."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								onClick: async () => {
									await evt.prompt();
									if ((await evt.userChoice).outcome === "accepted") setInstallState({ installed: true });
									else setInstallState({ dismissedAt: (/* @__PURE__ */ new Date()).toISOString() });
									setEvt(null);
									setEligible(false);
								},
								className: "inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground",
								children: "Install"
							}), /* @__PURE__ */ jsx("button", {
								onClick: () => {
									setInstallState({ dismissedAt: (/* @__PURE__ */ new Date()).toISOString() });
									setEligible(false);
								},
								className: "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground",
								children: "Not now"
							})]
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					"aria-label": "Dismiss",
					onClick: () => {
						setInstallState({ dismissedAt: (/* @__PURE__ */ new Date()).toISOString() });
						setEligible(false);
					},
					className: "rounded-md p-1 text-muted-foreground hover:text-foreground",
					children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
				})
			]
		})
	});
}
//#endregion
//#region src/components/AppShell.tsx
var tabs = [
	{
		to: "/home",
		label: "Home",
		icon: Home
	},
	{
		to: "/progress",
		label: "Progress",
		icon: BarChart3
	},
	{
		to: "/live",
		label: "Live",
		icon: Radio
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell({ children, title }) {
	const { pathname } = useLocation();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex max-w-3xl items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/home",
						className: "flex items-center gap-2 font-semibold tracking-tight text-foreground",
						children: [/* @__PURE__ */ jsx("span", {
							className: "grid h-8 w-8 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)]",
							style: { background: "var(--gradient-hero)" },
							children: /* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" })
						}), "Speak Sphere"]
					}), title ? /* @__PURE__ */ jsx("span", {
						className: "text-sm font-medium text-muted-foreground",
						children: title
					}) : null]
				})
			}),
			/* @__PURE__ */ jsx("main", {
				className: "mx-auto max-w-3xl px-5 py-6",
				children
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ jsx("ul", {
					className: "mx-auto flex max-w-3xl items-stretch justify-between px-2",
					children: tabs.map((t) => {
						const active = pathname === t.to || pathname.startsWith(t.to + "/");
						const Icon = t.icon;
						return /* @__PURE__ */ jsx("li", {
							className: "flex-1",
							children: /* @__PURE__ */ jsxs(Link, {
								to: t.to,
								className: `flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 ${active ? "stroke-[2.4]" : ""}` }), t.label]
							})
						}, t.to);
					})
				})
			}),
			/* @__PURE__ */ jsx(InstallPrompt, {})
		]
	});
}
//#endregion
export { AppShell as t };

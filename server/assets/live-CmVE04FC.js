import { t as AppShell } from "./AppShell-CXpfxu9l.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Calendar, ExternalLink, Radio } from "lucide-react";
//#region src/routes/live.tsx?tsr-split=component
function nextSunday(now) {
	const d = new Date(now);
	const day = d.getDay();
	const add = day === 0 ? 7 : 7 - day;
	d.setDate(d.getDate() + add);
	d.setHours(18, 0, 0, 0);
	return d;
}
function isRegistrationOpen(now) {
	const day = now.getDay();
	return day >= 1 && day <= 5;
}
function Live() {
	const [now, setNow] = useState(null);
	useEffect(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(id);
	}, []);
	if (!now) return /* @__PURE__ */ jsx(AppShell, {
		title: "Live",
		children: /* @__PURE__ */ jsx("div", { className: "h-40 animate-pulse rounded-2xl bg-secondary" })
	});
	const target = nextSunday(now);
	const ms = target.getTime() - now.getTime();
	const days = Math.floor(ms / 864e5);
	const hours = Math.floor(ms % 864e5 / 36e5);
	const mins = Math.floor(ms % 36e5 / 6e4);
	const open = isRegistrationOpen(now);
	return /* @__PURE__ */ jsxs(AppShell, {
		title: "Live",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "rounded-3xl border border-border p-6 shadow-[var(--shadow-elegant)]",
			style: { background: "var(--gradient-card)" },
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground",
						style: { background: "var(--gradient-hero)" },
						children: /* @__PURE__ */ jsx(Radio, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Weekly live session"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Sundays · Optional · 30 minutes"
					})] })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: `mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${open ? "bg-accent-soft text-accent-foreground" : "bg-secondary text-muted-foreground"}`,
					children: [/* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${open ? "bg-accent" : "bg-muted-foreground"}` }), open ? "Registration open" : "Registration closed"]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 grid grid-cols-3 gap-3",
					children: [
						["Days", days],
						["Hours", hours],
						["Mins", mins]
					].map(([k, v]) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-border bg-background p-4 text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-3xl font-bold tabular-nums",
							children: Math.max(0, v)
						}), /* @__PURE__ */ jsx("div", {
							className: "text-[10px] uppercase tracking-wider text-muted-foreground",
							children: k
						})]
					}, k))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ jsxs("a", {
						href: open ? "https://forms.gle/" : void 0,
						target: "_blank",
						rel: "noreferrer",
						"aria-disabled": !open,
						onClick: (e) => {
							if (!open) e.preventDefault();
						},
						className: `inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold ${open ? "bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]" : "cursor-not-allowed bg-secondary text-muted-foreground"}`,
						children: [
							open ? "Register now" : "Opens Monday",
							" ",
							/* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" })
						]
					}), /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
							" ",
							target.toLocaleString(void 0, {
								weekday: "long",
								month: "short",
								day: "numeric"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-6 text-xs text-muted-foreground",
			children: "Live sessions are completely optional. Your daily practice is what builds the habit."
		})]
	});
}
//#endregion
export { Live as component };

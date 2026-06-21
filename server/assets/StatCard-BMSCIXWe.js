import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/StatCard.tsx
function StatCard({ label, value, icon: Icon }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]",
		children: [/* @__PURE__ */ jsx("div", {
			className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary",
			children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
			className: "text-xl font-bold text-foreground",
			children: value
		}), /* @__PURE__ */ jsx("div", {
			className: "text-xs uppercase tracking-wide text-muted-foreground",
			children: label
		})] })]
	});
}
//#endregion
export { StatCard as t };

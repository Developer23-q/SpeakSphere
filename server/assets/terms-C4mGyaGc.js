import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
//#region src/routes/terms.tsx?tsr-split=component
function Terms() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-2xl px-5 py-10",
		children: [
			/* @__PURE__ */ jsxs(Link, {
				to: "/settings",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Back"]
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "mt-6 text-3xl font-bold tracking-tight",
				children: "Terms of use"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "prose prose-sm mt-4 max-w-none text-foreground",
				children: [
					/* @__PURE__ */ jsx("p", { children: "Speak Sphere is offered as-is for personal speaking practice. By using it, you agree to use it for that purpose." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "No guarantees"
					}),
					/* @__PURE__ */ jsx("p", { children: "We do our best, but we don't promise the app will be available, error-free, or suit every situation. Use at your own discretion." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "Your responsibility"
					}),
					/* @__PURE__ */ jsx("p", { children: "You're responsible for what you record and for protecting your device. Don't use Speak Sphere to capture anything you don't have the right to record." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "Changes"
					}),
					/* @__PURE__ */ jsx("p", { children: "These terms may evolve as the product grows. Significant changes will be reflected on this page." })
				]
			})
		]
	});
}
//#endregion
export { Terms as component };

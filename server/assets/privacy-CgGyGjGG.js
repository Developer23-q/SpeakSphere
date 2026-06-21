import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
//#region src/routes/privacy.tsx?tsr-split=component
function Privacy() {
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
				children: "Privacy"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "prose prose-sm mt-4 max-w-none text-foreground",
				children: [
					/* @__PURE__ */ jsx("p", { children: "Speak Sphere is built for privacy. There is no account, no server, no analytics, and no third-party trackers." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "What we store"
					}),
					/* @__PURE__ */ jsx("p", { children: "Your onboarding answers, streak, completed challenges, reflections, scores, and the last five practice recordings are all stored locally in your browser using LocalStorage. Nothing ever leaves your device." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "Microphone"
					}),
					/* @__PURE__ */ jsx("p", { children: "We use your browser's microphone only while you are recording. Recordings are saved on your device. Clearing your browser data removes everything." }),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-6 text-lg font-semibold",
						children: "Your choice"
					}),
					/* @__PURE__ */ jsx("p", { children: "Visit Settings to export, import, or fully reset your data at any time." })
				]
			})
		]
	});
}
//#endregion
export { Privacy as component };

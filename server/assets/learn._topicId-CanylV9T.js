import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/learn.$topicId.tsx?tsr-shared=1
function NotFound() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-xl px-5 py-12",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground",
			children: "Topic not found."
		}), /* @__PURE__ */ jsx(Link, {
			to: "/home",
			className: "mt-4 inline-flex text-sm font-semibold text-primary",
			children: "← Back home"
		})]
	});
}
//#endregion
export { NotFound as t };

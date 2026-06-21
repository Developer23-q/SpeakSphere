import { r as registerServiceWorker } from "./pwa-BoobZY18.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";
//#region src/styles.css?url
var styles_default = "/assets/styles-DqmHWeSE.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$11 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Speak Sphere — Practice speaking 2 minutes a day" },
			{
				name: "description",
				content: "Build confidence through short daily speaking challenges. Two minutes a day is all it takes."
			},
			{
				name: "theme-color",
				content: "#1d3a8a"
			},
			{
				property: "og:title",
				content: "Speak Sphere"
			},
			{
				property: "og:description",
				content: "Practice speaking for 2 minutes a day."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.json"
			},
			{
				rel: "icon",
				href: "/icon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon.svg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$11.useRouteContext();
	useEffect(() => {
		registerServiceWorker();
	}, []);
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/terms.tsx
var $$splitComponentImporter$10 = () => import("./terms-C4mGyaGc.js");
var Route$10 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms — Speak Sphere" }, {
		name: "description",
		content: "The simple terms of using Speak Sphere."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
//#endregion
//#region src/routes/settings.tsx
var $$splitComponentImporter$9 = () => import("./settings-CGOaZJi9.js");
var Route$9 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings — Speak Sphere" }, {
		name: "description",
		content: "Export, import, or reset your local Speak Sphere progress."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/progress.tsx
var $$splitComponentImporter$8 = () => import("./progress-BvhsZmrv.js");
var Route$8 = createFileRoute("/progress")({
	head: () => ({ meta: [{ title: "Your progress — Speak Sphere" }, {
		name: "description",
		content: "Streaks, scores, reflections, and your last recordings — all in one place."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/privacy.tsx
var $$splitComponentImporter$7 = () => import("./privacy-CgGyGjGG.js");
var Route$7 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy — Speak Sphere" }, {
		name: "description",
		content: "How Speak Sphere handles your data. Short version: it stays on your device."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/onboarding.tsx
var $$splitComponentImporter$6 = () => import("./onboarding-CmlnPlMe.js");
var Route$6 = createFileRoute("/onboarding")({
	head: () => ({ meta: [{ title: "Get started — Speak Sphere" }, {
		name: "description",
		content: "Three quick questions to personalize your daily speaking practice."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/live.tsx
var $$splitComponentImporter$5 = () => import("./live-CmVE04FC.js");
var Route$5 = createFileRoute("/live")({
	head: () => ({ meta: [{ title: "Live session — Speak Sphere" }, {
		name: "description",
		content: "Optional weekly live speaking session with peers. Sundays."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/home.tsx
var $$splitComponentImporter$4 = () => import("./home-DuZ4T2xm.js");
var Route$4 = createFileRoute("/home")({
	head: () => ({ meta: [{ title: "Today's challenge — Speak Sphere" }, {
		name: "description",
		content: "Your daily 2-minute speaking challenge, ready to go."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$3 = () => import("./routes-Bqg3wDFa.js");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Speak Sphere — Speak Better. 2 Minutes a Day." },
		{
			name: "description",
			content: "Build speaking confidence with short daily challenges. Designed for students who want to grow."
		},
		{
			property: "og:title",
			content: "Speak Sphere"
		},
		{
			property: "og:description",
			content: "Speak Better. 2 Minutes a Day."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/practice.$topicId.tsx
var $$splitComponentImporter$2 = () => import("./practice._topicId-BaSkt9WQ.js");
var Route$2 = createFileRoute("/practice/$topicId")({
	head: ({ params }) => ({ meta: [{ title: `Practice: ${params.topicId} — Speak Sphere` }, {
		name: "description",
		content: "Record your speaking practice for today's challenge."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/learn.$topicId.tsx
var $$splitNotFoundComponentImporter = () => import("./learn._topicId-CqB131Vs.js");
var $$splitComponentImporter$1 = () => import("./learn._topicId-BRCe5wy8.js");
var Route$1 = createFileRoute("/learn/$topicId")({
	head: ({ params }) => ({ meta: [{ title: `Learn: ${params.topicId} — Speak Sphere` }, {
		name: "description",
		content: "Topic explanation, talking points, structure, and common mistakes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
//#region src/routes/feedback.$topicId.tsx
var $$splitComponentImporter = () => import("./feedback._topicId-DcyRM7to.js");
var searchSchema = z.object({ duration: z.coerce.number().min(0).max(600) });
var Route = createFileRoute("/feedback/$topicId")({
	head: () => ({ meta: [{ title: "Your feedback — Speak Sphere" }, {
		name: "description",
		content: "See your score, your strength, and one thing to work on."
	}] }),
	validateSearch: searchSchema,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var TermsRoute = Route$10.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$11
});
var SettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$11
});
var ProgressRoute = Route$8.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$11
});
var PrivacyRoute = Route$7.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$11
});
var OnboardingRoute = Route$6.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$11
});
var LiveRoute = Route$5.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$11
});
var HomeRoute = Route$4.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$11
});
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var PracticeTopicIdRoute = Route$2.update({
	id: "/practice/$topicId",
	path: "/practice/$topicId",
	getParentRoute: () => Route$11
});
var LearnTopicIdRoute = Route$1.update({
	id: "/learn/$topicId",
	path: "/learn/$topicId",
	getParentRoute: () => Route$11
});
var rootRouteChildren = {
	IndexRoute,
	HomeRoute,
	LiveRoute,
	OnboardingRoute,
	PrivacyRoute,
	ProgressRoute,
	SettingsRoute,
	TermsRoute,
	FeedbackTopicIdRoute: Route.update({
		id: "/feedback/$topicId",
		path: "/feedback/$topicId",
		getParentRoute: () => Route$11
	}),
	LearnTopicIdRoute,
	PracticeTopicIdRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

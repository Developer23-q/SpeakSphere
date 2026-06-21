import { a as read, c as write, t as KEYS } from "./storage-CbiPQ69e.js";
//#region src/lib/pwa.ts
function registerServiceWorker() {
	if (typeof window === "undefined") return;
	if (!("serviceWorker" in navigator)) return;
	const host = window.location.hostname;
	if (host.startsWith("id-preview--") || host.startsWith("preview--") || host.endsWith(".lovableproject.com") || host.endsWith(".lovableproject-dev.com") || host.endsWith(".beta.lovable.dev")) return;
	if (window.top !== window.self) return;
	navigator.serviceWorker.register("/service-worker.js").catch(() => {});
}
function isStandalone() {
	if (typeof window === "undefined") return false;
	const nav = window.navigator;
	return window.matchMedia?.("(display-mode: standalone)").matches === true || nav.standalone === true;
}
function getInstallState() {
	return read(KEYS.installPromptState, {});
}
function setInstallState(patch) {
	const next = {
		...getInstallState(),
		...patch
	};
	write(KEYS.installPromptState, next);
	return next;
}
//#endregion
export { setInstallState as i, isStandalone as n, registerServiceWorker as r, getInstallState as t };

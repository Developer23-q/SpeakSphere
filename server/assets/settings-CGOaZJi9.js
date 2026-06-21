import { n as exportAll, o as resetAll, r as importAll } from "./storage-CbiPQ69e.js";
import { t as AppShell } from "./AppShell-CXpfxu9l.js";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Download, FileText, Info, Shield, Trash2, Upload } from "lucide-react";
//#region src/routes/settings.tsx?tsr-split=component
function Settings() {
	const fileRef = useRef(null);
	const [msg, setMsg] = useState(null);
	function doExport() {
		const json = exportAll();
		const blob = new Blob([json], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "speaksphere-progress.json";
		a.click();
		URL.revokeObjectURL(url);
		setMsg("Exported.");
	}
	function doImport(file) {
		const reader = new FileReader();
		reader.onload = () => {
			setMsg(importAll(String(reader.result || "")) ? "Imported. Reload to see updates." : "Couldn't read that file.");
		};
		reader.readAsText(file);
	}
	function doReset() {
		if (!window.confirm("Reset all progress? This cannot be undone.")) return;
		resetAll();
		setMsg("All progress cleared.");
	}
	return /* @__PURE__ */ jsxs(AppShell, {
		title: "Settings",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Settings"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Speak Sphere "
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "mt-8 divide-y divide-border rounded-2xl border border-border bg-card",
				children: [
					/* @__PURE__ */ jsx(Row, {
						icon: Download,
						title: "Export progress",
						subtitle: "Download a JSON backup of your streak, scores, reflections, and settings.",
						action: /* @__PURE__ */ jsx("button", {
							onClick: doExport,
							className: "text-sm font-semibold text-primary",
							children: "Export"
						})
					}),
					/* @__PURE__ */ jsx(Row, {
						icon: Upload,
						title: "Import progress",
						subtitle: "Restore from a previously exported JSON file.",
						action: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("input", {
							ref: fileRef,
							type: "file",
							accept: "application/json",
							className: "hidden",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) doImport(f);
							}
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => fileRef.current?.click(),
							className: "text-sm font-semibold text-primary",
							children: "Import"
						})] })
					}),
					/* @__PURE__ */ jsx(Row, {
						icon: Trash2,
						title: "Reset progress",
						subtitle: "Clear everything stored on this device.",
						action: /* @__PURE__ */ jsx("button", {
							onClick: doReset,
							className: "text-sm font-semibold text-destructive",
							children: "Reset"
						})
					})
				]
			}),
			msg ? /* @__PURE__ */ jsx("div", {
				className: "mt-4 rounded-xl border border-border bg-secondary px-4 py-3 text-sm",
				children: msg
			}) : null,
			/* @__PURE__ */ jsxs("section", {
				className: "mt-8 divide-y divide-border rounded-2xl border border-border bg-card",
				children: [
					/* @__PURE__ */ jsx(RowLink, {
						icon: Shield,
						title: "Privacy policy",
						to: "/privacy"
					}),
					/* @__PURE__ */ jsx(RowLink, {
						icon: FileText,
						title: "Terms of use",
						to: "/terms"
					}),
					/* @__PURE__ */ jsx(RowLink, {
						icon: Info,
						title: "About Speak Sphere",
						to: "/"
					})
				]
			})
		]
	});
}
function Row({ icon: Icon, title, subtitle, action }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-4 p-4",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: subtitle
				})]
			}),
			action
		]
	});
}
function RowLink({ icon: Icon, title, to }) {
	return /* @__PURE__ */ jsxs(Link, {
		to,
		className: "flex items-center gap-4 p-4",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ jsx("span", {
				className: "text-muted-foreground",
				children: "→"
			})
		]
	});
}
//#endregion
export { Settings as component };

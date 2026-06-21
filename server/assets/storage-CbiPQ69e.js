//#region src/lib/storage.ts
var KEYS = {
	userProfile: "ss.userProfile",
	completedChallenges: "ss.completedChallenges",
	completedTopics: "ss.completedTopics",
	streakData: "ss.streakData",
	reflectionEntries: "ss.reflectionEntries",
	scoreHistory: "ss.scoreHistory",
	recordings: "ss.recordings",
	installPromptState: "ss.installPromptState"
};
function safeStorage() {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage;
	} catch {
		return null;
	}
}
function read(key, fallback) {
	const ls = safeStorage();
	if (!ls) return fallback;
	try {
		const raw = ls.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		try {
			ls.removeItem(key);
		} catch {}
		return fallback;
	}
}
function write(key, value) {
	const ls = safeStorage();
	if (!ls) return;
	try {
		ls.setItem(key, JSON.stringify(value));
	} catch {}
}
function remove(key) {
	const ls = safeStorage();
	if (!ls) return;
	try {
		ls.removeItem(key);
	} catch {}
}
function resetAll() {
	Object.values(KEYS).forEach(remove);
	remove("ss.dailyAssignment");
}
function exportAll() {
	const out = {};
	for (const [k, v] of Object.entries(KEYS)) out[k] = read(v, null);
	return JSON.stringify(out, null, 2);
}
function importAll(json) {
	try {
		const parsed = JSON.parse(json);
		for (const [k, key] of Object.entries(KEYS)) if (parsed[k] != null) write(key, parsed[k]);
		return true;
	} catch {
		return false;
	}
}
function todayKey(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function newId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
//#endregion
export { read as a, write as c, newId as i, exportAll as n, resetAll as o, importAll as r, todayKey as s, KEYS as t };

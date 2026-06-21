import { a as read, c as write, i as newId, s as todayKey, t as KEYS } from "./storage-CbiPQ69e.js";
import { r as markTopicUsed } from "./topics-Dp1zJQfY.js";
//#region src/lib/streak.ts
function daysBetween(a, b) {
	const da = /* @__PURE__ */ new Date(a + "T00:00:00");
	const db = /* @__PURE__ */ new Date(b + "T00:00:00");
	return Math.round((db.getTime() - da.getTime()) / 864e5);
}
function getStreak() {
	const data = read(KEYS.streakData, {
		current: 0,
		longest: 0,
		lastDate: null
	});
	if (data.lastDate) {
		if (daysBetween(data.lastDate, todayKey()) > 1) {
			const fresh = {
				current: 0,
				longest: data.longest,
				lastDate: data.lastDate
			};
			write(KEYS.streakData, fresh);
			return fresh;
		}
	}
	return data;
}
function recordCompletionForStreak() {
	const today = todayKey();
	const data = getStreak();
	if (data.lastDate === today) return data;
	let current = data.current;
	if (data.lastDate && daysBetween(data.lastDate, today) === 1) current += 1;
	else current = 1;
	const next = {
		current,
		longest: Math.max(current, data.longest),
		lastDate: today
	};
	write(KEYS.streakData, next);
	return next;
}
//#endregion
//#region src/lib/challenge.ts
function getCompleted() {
	return read(KEYS.completedChallenges, []);
}
function getTodayCompletions() {
	const today = todayKey();
	return getCompleted().filter((c) => c.date === today);
}
function canStartChallenge() {
	return getTodayCompletions().length < 2;
}
function isTopicDoneToday(topicId) {
	return getTodayCompletions().some((c) => c.topicId === topicId);
}
function totalSpeakingSeconds() {
	return getCompleted().reduce((sum, c) => sum + c.durationSec, 0);
}
function saveCompletedChallenge(input) {
	const entry = {
		id: newId(),
		topicId: input.topicId,
		date: todayKey(),
		durationSec: input.durationSec,
		score: input.score,
		kind: input.kind,
		completedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const all = getCompleted();
	all.push(entry);
	write(KEYS.completedChallenges, all);
	markTopicUsed(input.topicId);
	recordCompletionForStreak();
	const scores = read(KEYS.scoreHistory, []);
	scores.push({
		id: entry.id,
		date: entry.date,
		topicId: entry.topicId,
		score: entry.score
	});
	write(KEYS.scoreHistory, scores);
	return entry;
}
function saveReflection(topicId, text) {
	if (!text.trim()) return;
	const entries = read(KEYS.reflectionEntries, []);
	entries.push({
		id: newId(),
		date: todayKey(),
		topicId,
		text: text.trim()
	});
	write(KEYS.reflectionEntries, entries);
}
function getRecentReflections(n = 5) {
	return read(KEYS.reflectionEntries, []).slice(-n).reverse();
}
function getRecentScores(n = 5) {
	return read(KEYS.scoreHistory, []).slice(-n).reverse();
}
//#endregion
//#region src/lib/recording.ts
async function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onloadend = () => resolve(r.result);
		r.onerror = reject;
		r.readAsDataURL(blob);
	});
}
async function saveRecording(input) {
	const dataUrl = await blobToDataUrl(input.blob);
	const entry = {
		id: newId(),
		date: todayKey(),
		topicId: input.topicId,
		durationSec: input.durationSec,
		dataUrl,
		mimeType: input.blob.type || "audio/webm"
	};
	const all = read(KEYS.recordings, []);
	all.push(entry);
	const trimmed = all.slice(-5);
	try {
		write(KEYS.recordings, trimmed);
	} catch {
		write(KEYS.recordings, trimmed.slice(-3));
	}
	return entry;
}
function getRecordings() {
	return read(KEYS.recordings, []).slice().reverse();
}
function pickRecorderMime() {
	if (typeof MediaRecorder === "undefined") return void 0;
	for (const c of [
		"audio/webm;codecs=opus",
		"audio/webm",
		"audio/mp4",
		"audio/ogg"
	]) try {
		if (MediaRecorder.isTypeSupported(c)) return c;
	} catch {}
}
function formatDuration(sec) {
	const s = Math.max(0, Math.floor(sec));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `${m}:${String(r).padStart(2, "0")}`;
}
//#endregion
export { canStartChallenge as a, getRecentScores as c, saveReflection as d, totalSpeakingSeconds as f, saveRecording as i, isTopicDoneToday as l, getRecordings as n, getCompleted as o, getStreak as p, pickRecorderMime as r, getRecentReflections as s, formatDuration as t, saveCompletedChallenge as u };

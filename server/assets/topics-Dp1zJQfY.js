import { a as read, c as write, s as todayKey, t as KEYS } from "./storage-CbiPQ69e.js";
//#endregion
//#region src/lib/topics.ts
var ALL_TOPICS = [
	{
		"id": "topic_001",
		"category": "public_speaking",
		"difficulty": "beginner",
		"title": "Introduce Yourself with Confidence",
		"description": "A clear self-introduction is the foundation of every speaking situation. Practice presenting who you are, what you do, and what drives you in under a minute.",
		"talking_points": [
			"State your name and where you're from clearly",
			"Share one passion, project, or goal that defines you",
			"End with what you hope to learn or contribute"
		],
		"structure": {
			"opening": "Greet the audience and say your name slowly.",
			"body": "Share two or three details that paint a picture of who you are.",
			"conclusion": "Close with an inviting line that opens a conversation."
		},
		"mistakes": [
			"Speaking too fast out of nervousness",
			"Listing job titles instead of telling a small story",
			"Forgetting to smile and make eye contact"
		]
	},
	{
		"id": "topic_002",
		"category": "debate",
		"difficulty": "intermediate",
		"title": "Argue Both Sides: Social Media for Teens",
		"description": "Strong debaters can defend any position. Practice constructing a balanced argument on whether social media helps or harms teenagers.",
		"talking_points": [
			"State your position in one clear sentence",
			"Give two concrete reasons with examples",
			"Acknowledge the opposing view and rebut it"
		],
		"structure": {
			"opening": "Define the issue and state your stance.",
			"body": "Present evidence, then respond to the strongest counter-argument.",
			"conclusion": "Restate why your position holds up under pressure."
		},
		"mistakes": [
			"Attacking the other side instead of the argument",
			"Relying on opinion without examples",
			"Forgetting to signpost — 'first', 'second', 'finally'"
		]
	},
	{
		"id": "topic_003",
		"category": "interview",
		"difficulty": "intermediate",
		"title": "Tell Me About a Time You Failed",
		"description": "Interviewers love this question because it reveals self-awareness. Use the STAR method to turn a setback into a story of growth.",
		"talking_points": [
			"Pick a real, specific situation — not 'I work too hard'",
			"Walk through Situation, Task, Action, Result",
			"End on what you learned and how you apply it now"
		],
		"structure": {
			"opening": "Briefly frame the situation and the stakes.",
			"body": "Describe what you tried, what went wrong, and what you did next.",
			"conclusion": "State the lesson and how it changed your approach."
		},
		"mistakes": [
			"Choosing a fake weakness disguised as a strength",
			"Blaming teammates or circumstances",
			"Skipping the lesson — the reflection is the whole point"
		]
	},
	{
		"id": "topic_004",
		"category": "confidence_building",
		"difficulty": "beginner",
		"title": "Describe Your Perfect Day",
		"description": "A low-pressure prompt to warm up your voice, your pacing, and your storytelling muscles. There are no wrong answers — only your version.",
		"talking_points": [
			"Set the scene: where you are and what time it is",
			"Walk through three small moments that make the day great",
			"Explain why this day matters to you"
		],
		"structure": {
			"opening": "Paint the setting in one or two sentences.",
			"body": "Move through the day in order, using sensory details.",
			"conclusion": "Reflect on what this perfect day says about what you value."
		},
		"mistakes": [
			"Listing activities without describing how they feel",
			"Speaking in a monotone — vary your pace",
			"Filler words like 'um', 'like', 'basically' — pause instead"
		]
	}
];
function getTopic(id) {
	return ALL_TOPICS.find((t) => t.id === id);
}
var DAILY_KEY = "ss.dailyAssignment";
function seededShuffle(arr, seed) {
	const out = arr.slice();
	let s = seed;
	for (let i = out.length - 1; i > 0; i--) {
		s = (s * 9301 + 49297) % 233280;
		const j = Math.floor(s / 233280 * (i + 1));
		[out[i], out[j]] = [out[j], out[i]];
	}
	return out;
}
function dateSeed(dateStr) {
	let h = 0;
	for (let i = 0; i < dateStr.length; i++) h = h * 31 + dateStr.charCodeAt(i) | 0;
	return Math.abs(h);
}
function getDailyAssignment() {
	const today = todayKey();
	const stored = read(DAILY_KEY, null);
	if (stored && stored.date === today) return {
		primary: getTopic(stored.primaryId) ?? ALL_TOPICS[0],
		bonus: stored.bonusId ? getTopic(stored.bonusId) ?? null : null
	};
	let usedIds = read(KEYS.completedTopics, []);
	if (usedIds.length >= ALL_TOPICS.length) usedIds = [];
	const remaining = ALL_TOPICS.filter((t) => !usedIds.includes(t.id));
	const shuffled = seededShuffle(remaining.length > 0 ? remaining : ALL_TOPICS, dateSeed(today));
	const primary = shuffled[0];
	const bonus = shuffled.find((t) => t.id !== primary.id) ?? null;
	write(DAILY_KEY, {
		date: today,
		primaryId: primary.id,
		bonusId: bonus?.id ?? null
	});
	return {
		primary,
		bonus
	};
}
function markTopicUsed(topicId) {
	const used = read(KEYS.completedTopics, []);
	if (!used.includes(topicId)) {
		used.push(topicId);
		write(KEYS.completedTopics, used);
	}
}
//#endregion
export { getTopic as n, markTopicUsed as r, getDailyAssignment as t };

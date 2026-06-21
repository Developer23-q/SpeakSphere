# Speak Sphere MVP — Build Plan

## Stack adaptation (important)

The spec requests vanilla HTML/CSS/JS, but this project is a TanStack Start (React + Vite) template and the supported stack cannot be swapped. I will build the same product, same features, same content, same scope — implemented in React + TypeScript + Tailwind, with **LocalStorage only** (no backend, no auth, no DB), and a real PWA (manifest + service worker). Functionally identical to the spec.

If you want true vanilla HTML/JS instead, say so and I'll stop — that would require a different project.

## Design direction

- "Duolingo for speaking" — friendly, focused, multi-task screens.
- Deep blue primary, fresh green accent, warm white background, dark slate text. Rounded cards, soft shadows, big confident type, generous whitespace. Mobile-first with bottom tab nav.and web also
- All colors as semantic tokens in `src/styles.css` (no hardcoded colors in components).
- One hero illustration on landing; otherwise minimal imagery.

## Routes (TanStack Start file routes)

- `/` — Landing (hero, How It Works, Benefits, Live Sessions teaser, Install CTA). If onboarded → redirect to `/home`.
- `/onboarding` — 3-question flow, saves `userProfile`, then redirects to `/home` (no welcome screen).
- `/home` — Dashboard: streak / completed / total time stats, Today's Challenge card (Learn / Practice), Bonus Challenge, Live Session card.
- `/learn/$topicId` — Topic explanation, 3 talking points, opening/body/conclusion, common mistakes, Practice button.
- `/practice/$topicId` — MediaRecorder UI (start/stop/retake/submit), timer, min 30s / max 90s enforcement, permission error states.
- `/feedback/$challengeId` — Self-rating (confidence 1–5, difficulty 1–5) → rule-based score + strength + suggestion, then Reflection journal textarea, then Success screen (streak, completed, total time, "Tomorrow's challenge unlocks tomorrow", Return Home).
- `/progress` — Current streak, longest streak, challenges completed, total speaking time, recent scores, recent reflections, last 5 recordings (playback + auto-prune).
- `/live` — Weekly session card: Mon registration opens / Sun session; status badge + countdown + static registration link.
- `/settings` — Version, Export JSON, Import JSON, Reset, links to Privacy / Terms / About.
- `/privacy`, `/terms` — Static content pages.
- Bottom tab nav (Home / Progress / Live / Settings) shown on app routes only.

Each route gets unique `head()` (title + description + og tags). Root provides notFound + error boundaries.

## Core modules (`src/lib/`)

- `storage.ts` — typed get/set for keys: `userProfile`, `completedChallenges`, `completedTopics`, `streakData`, `reflectionEntries`, `scoreHistory`, `recordings`, `installPromptState`. Safe-parse with corruption recovery.
- `topics.ts` — loads `src/data/topics.json` (4 seeded topics across Public Speaking / Debate / Interview / Confidence Building, each with talking_points, structure, mistakes). Selects today's primary + bonus, no repeats until exhausted, resets at local midnight.
- `challenge.ts` — challenge lifecycle, day-key by local date, enforces max 2/day.
- `recording.ts` — MediaRecorder wrapper, returns blob + duration, stores last 5 as base64 in localStorage with auto-prune.
- `feedback.ts` — rule-based scoring (<30s: 40–50, 30–60s: 55–75, 60–90s: 75–90), adjusted by self-ratings; returns score + strength + improvement.
- `streak.ts` — increment on first completion of a new day; reset if a day was missed; tracks longest.
- `pwa.ts` — registers service worker, captures `beforeinstallprompt`, exposes floating install button (shown only after first completed challenge; hidden if installed).

## PWA

- `public/manifest.json` — name, short_name, theme/background, icons (use logo).
- `public/service-worker.js` — cache-first for static assets, network-first for documents, offline fallback.
- Registration in client-only effect from root.
- Floating install button component, gated by `installPromptState` + first completion.

## Content

- `src/data/topics.json` — 4 sample topics matching spec schema.
- Hero image: one generated illustration in `src/assets/`.
- Logo: simple generated mark.

## Excluded (per spec)

No leaderboards, badges, social, AI coach, peer matching, backend, auth, DB, advanced analytics.

## Verification

- Build passes.
- Playwright smoke: landing → onboarding → home → learn → practice (mocked) → feedback → success → progress shows updated stats.
- LocalStorage keys present and round-trip via Export/Import.

After approval I'll implement in one pass.
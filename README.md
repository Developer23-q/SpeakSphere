# Canvas of Your Dreams

> A polished starter app built on TanStack Start, React, TypeScript and Vite — tailored for learning, practice, and simple PWA-enabled experiences.

---

## Table of Contents
- **About**: Project summary and purpose
- **Features**: Quick feature list
- **Tech Stack**: Libraries and tools used
- **Prerequisites**: What you need locally
- **Install**: How to get the project running
- **Development**: Local dev workflow
- **Build & Preview**: Production build and preview
- **Scripts**: Helpful npm scripts
- **Project Structure**: Important files and folders
- **PWA**: Progressive Web App notes
- **Contributing**: How to help
- **Troubleshooting**: Common issues and tips
- **License & Credits**n

---

## About

This repository is a modern React starter app scaffolded with TanStack Start and opinionated UI primitives. It focuses on a pleasant developer experience (Vite + TypeScript), accessible UI components, and optional PWA support. The app demonstrates routing, UI components, utilities, and small integrations useful for learning and building small to medium client-side apps.

## Features

- TypeScript-first React app
- Routing with `@tanstack/react-router`
- UI primitives and components (Radix, custom `ui/` components)
- Local utilities under `src/lib/` (storage, pwa, feedback, etc.)
- Pre-configured linting and formatting
- PWA support (service worker registration in production)

## Tech Stack

- Runtime: React 19
- Bundler / Dev: Vite
- State & Data: `@tanstack/react-query` and TanStack router
- UI primitives: Radix UI and custom components under `src/components/ui`
- Styling: Tailwind CSS
- Form validation: `react-hook-form` + `zod`
- Charts: `recharts`
- Language: TypeScript

## Prerequisites

- Node.js (v18+ recommended) and a package manager (`npm`, `pnpm`, or `yarn`).
- A modern browser for local testing.

## Install

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd canvas-of-your-dreams-main
npm install
# or: pnpm install
# or: yarn
```

## Development

Start the dev server with hot reload:

```bash
npm run dev
# or: pnpm dev
# or: yarn dev
```

The dev server uses Vite. Open http://localhost:5173 (or the port printed by Vite).

## Build & Preview

Build a production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

For a dev-mode production build (useful for testing non-minified production output):

```bash
npm run build:dev
```

## Scripts

The most important scripts available from `package.json`:

- `dev` — Run Vite dev server
- `build` — Create a production build
- `build:dev` — Build using development-mode flags
- `preview` — Preview production bundle locally
- `lint` — Run ESLint
- `format` — Run Prettier to format codebase

Run them with your package manager, e.g. `npm run dev`.

## Project Structure (selected)

- `public/` — Static assets and `service-worker.js`
- `src/` — Application source
  - `src/components` — App-level components and `ui/` primitives
  - `src/lib` — Utilities and small feature modules (pwa, storage, feedback, etc.)
  - `src/routes` — Route components and route-specific pages
  - `src/router.tsx` — Router setup
  - `src/start.ts` — App entry/bootstrapping
  - `src/server.ts` — (If present) server-side hooks or helpers

Refer to the source for more details; the code is intentionally small and modular.

## PWA

This app includes basic Progressive Web App support:

- A simple service worker is present at `public/service-worker.js` and is registered by `src/lib/pwa.ts` in production builds only. The registration guard prevents SW registration in preview domains or inside iframes.
- Install prompt state management is provided via `src/lib/storage.ts` and `src/lib/pwa.ts`.

To test the PWA experience locally, run a production build and preview (`npm run build && npm run preview`) and then open devtools → Application → Manifest and Service Workers.

## Environment & Configuration

This project uses Vite and respects `import.meta.env.*` variables. Common overrides can be supplied via `.env` files (e.g. `.env`, `.env.production`). Check `vite.config.ts` for `define` and plugin configuration.

## Linting & Formatting

- Lint with ESLint:

```bash
npm run lint
```

- Format files using Prettier:

```bash
npm run format
```

The project config files include `eslint.config.js` and Prettier configuration in the repository root.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork or branch from `main`.
2. Create a small, focused change with clear commit messages.
3. Run `npm run lint` and `npm run format` before creating a pull request.
4. Open a PR with a brief description and testing notes.

Please try to keep changes scoped and include screenshots or steps to reproduce for UI changes.

## Troubleshooting

- If the dev server fails to start, check for a port conflict or missing dependencies. Remove `node_modules` and reinstall if necessary.
- If typescript errors appear, ensure your IDE is using the workspace TypeScript version (v5+ as in `devDependencies`).
- Service worker not registering in dev: by design the SW is only registered in production mode.

## Credits

- Built with TanStack Start starter pieces and Radix UI primitives. See `package.json` for a full dependency list.

## License

Specify your license here. If you don't have one, consider adding an OSI-approved license file, for example `MIT`.

---

If you'd like, I can also:
- Add repository badges (build, license, dependencies)
- Add a short CONTRIBUTING.md and ISSUE_TEMPLATE
- Add example deployment instructions for Vercel/Netlify

---

Created automatically from the project contents. If you want changes, tell me what to add or the exact tone/format to prefer.

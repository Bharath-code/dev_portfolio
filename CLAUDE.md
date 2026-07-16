# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build static site to dist/
npm run preview    # Preview built output
```

No linter or test suite is configured. TypeScript type checking runs implicitly via Astro's build.

## Architecture

**Static Astro site** (`output: 'static'`) — all data fetching (GitHub API, blog RSS) happens at build time. Nothing runs in the browser from these integrations.

**Path alias**: `@/` → `src/` (configured in `tsconfig.json`).

### Data flow

- `src/data/site-content.json` — single source of truth for all displayed content (hero, projects, skills, experience, availability, contact). Pages import this directly.
- `src/content/site-content.ts` — TypeScript interfaces for that JSON, plus helper functions used by dynamic routes (`getProjectBySlug`, `getAllProjectSlugs`, `getNextProject`).
- `src/lib/github.ts` — GitHub GraphQL API helper. Requires `GITHUB_TOKEN` env var at build time. Gracefully degrades if token is missing.
- `src/lib/blog.ts` — Fetches posts from Dev.to API and Medium RSS at build time.
- `src/lib/books.ts` — Books data helper.

### Page routing

- `src/pages/index.astro` — Homepage; all sections assembled inline.
- `src/pages/projects/[slug].astro` — Dynamic project detail pages; slugs come from `site-content.json` projects array.
- `src/pages/blog.astro`, `books.astro`, `404.astro`, `rss.xml.js` — Other routes.

### Styling

- Tailwind CSS + `src/styles/global.css` for component utilities.
- Design uses CSS custom properties (`--bg`, `--ink`, `--accent`, etc.) defined in `:root`. Use these variables — not hardcoded colors — for consistency with the light/dark theme toggle.
- Typography: `font-sans` (Manrope), `font-display` (Archivo Black), `font-serif` (Instrument Serif), `font-mono` (JetBrains Mono). Fonts are bundled via `@fontsource/*` imports in `Layout.astro`.
- Layout utility classes: `.layout-shell` (max-width container), `.section`, `.card`, `.pill`, `.button-primary`, `.button-secondary`.

### Components

- The homepage (`index.astro`) assembles all of its sections inline; `Layout.astro` provides the header/footer. There is no separate per-section component for the home page.
- `src/components/ui/` — Shared building blocks used by routes: `Heading`, `NextProject` (project detail pages), and the GitHub data-viz components (`GitHubHeatmap`, `LanguageChart`, `RepoShowcase`) which read from `src/lib/github.ts`.
- `src/components/site/` — Reusable card components (ProjectShowcaseCard, BookShelfCard, PostCard, SectionIntro).
- All components are `.astro`. The React integration is installed but no React component currently ships on any page.
- GSAP (`gsap`) powers the homepage hero and scroll-reveal animations (inline `<script>` in `index.astro`).

## Env vars

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` | GitHub GraphQL API — contribution heatmap, pinned repos, language stats |

Create `.env` locally; never commit it.

## Adding/editing content

All visible text, projects, skills, and experience live in `src/data/site-content.json`. To add a new project with a detail page, add an entry with a unique `slug` — the dynamic route picks it up automatically.

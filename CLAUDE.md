# GitHub Dashboard — Claude Code Project Instructions

## Project overview

A GitHub profile analytics dashboard built with React and Vite. Users type a GitHub username and see their profile info, repo stats, and data visualizations. Deployed on GitHub Pages.

## Tech stack

- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **Charts:** Recharts
- **API:** GitHub REST API (public, no auth required for basic use)
- **Styling:** CSS Modules
- **Deployment:** GitHub Pages via gh-pages

## Folder structure

```
src/
├── components/        # Reusable UI components (ProfileCard, StatCard, RepoTable, etc.)
├── hooks/             # Custom hooks (useGitHubUser, useRepos)
├── pages/             # Page-level components (HomePage, UserPage)
├── utils/             # Helper functions (formatDate, calcLanguageStats, etc.)
├── context/           # React context (ThemeContext)
└── assets/            # Static assets
```

## Dev commands

```bash
npm run dev       # Start local dev server at http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build locally
npm run deploy    # Deploy to GitHub Pages (runs build first)
```

## Coding conventions

- Use **functional components** only — no class components
- Use **CSS Modules** for all component styles (e.g. `Button.module.css`)
- Use **named exports** for components, default exports only for pages
- All async data fetching goes inside **custom hooks** in `src/hooks/` — never fetch directly inside components
- Every custom hook must return `{ data, loading, error }` at minimum
- Use `async/await` — no `.then()` chains
- Use **TypeScript-style JSDoc** comments on all hooks and utility functions
- Prefer `const` over `let`; never use `var`

## API details

Base URL: `https://api.github.com`

Key endpoints used:
- `GET /users/:username` — profile data
- `GET /users/:username/repos?per_page=100&sort=updated` — repo list

Rate limits: 60 req/hr unauthenticated. Token stored in `.env` as `VITE_GITHUB_TOKEN` for higher limits (5000/hr). Always access via `import.meta.env.VITE_GITHUB_TOKEN` — never hardcode tokens.

## Environment variables

```
VITE_GITHUB_TOKEN=your_personal_access_token_here
```

The `.env` file is gitignored. Never commit API keys.

## Key components to build / already built

| Component | Description |
|---|---|
| `SearchBar` | Username input, triggers on Enter key |
| `ProfileCard` | Avatar, name, bio, followers, location |
| `StatRow` | 4 metric cards: repos, stars, top language, forks |
| `RepoTable` | Sortable table: name, language, stars, forks, updated |
| `StarBarChart` | Top 8 repos by star count (Recharts BarChart) |
| `LanguagePieChart` | Language distribution across all repos (Recharts PieChart) |
| `RepoTimelineChart` | Repos created per year (Recharts LineChart) |
| `ThemeToggle` | Dark/light mode toggle button |

## State management

- Local component state: `useState`
- Theme (dark/light): `ThemeContext` in `src/context/ThemeContext.jsx`, persisted to `localStorage`
- No external state library needed — keep it simple

## Error handling rules

- Always show a user-friendly error card when an API call fails (not just a console.log)
- Handle 404 specifically: show "User not found" message
- Handle rate limit (403): show "GitHub rate limit hit — try again later"
- Show loading skeletons (not spinners) while data is fetching

## Recharts conventions

- Always wrap charts in `<ResponsiveContainer width="100%" height={300}>`
- Use `CustomTooltip` components for consistent tooltip styling
- Group languages under 3% of total into an "Other" category in the pie chart
- Chart color palette: `['#7F77DD', '#1D9E75', '#D85A30', '#378ADD', '#BA7517', '#D4537E', '#639922']`

## Routing

```
/                   → HomePage (search prompt)
/user/:username     → UserPage (full dashboard for that user)
```

URL should update when a user searches — so dashboards are shareable links.

## Deployment notes

- Base URL in `vite.config.js` must match the GitHub Pages repo path: `base: '/github-dashboard/'`
- Run `npm run deploy` to push the `dist/` folder to the `gh-pages` branch
- The live URL will be: `https://<your-github-username>.github.io/github-dashboard/`

## Things to avoid

- Do NOT use `useEffect` for derived data that can be computed inline
- Do NOT store API responses in context — only theme and UI preferences go in context
- Do NOT use inline styles — always use CSS Modules
- Do NOT add unnecessary dependencies — keep the bundle lean

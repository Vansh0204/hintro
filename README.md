# Hintro Dashboard

A responsive dashboard built for the Hintro Frontend Assignment.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS (custom design system)
- Framer Motion (animations)
- TanStack Query v5 (API state management)
- Zustand (global state)
- React Router v6 (navigation)
- date-fns (date formatting)
- Lucide React (icons)

## Setup
```bash
npm install
npm run dev
```

## User Switching
Use the demo switcher in the bottom-right corner:
- **u1** — New user, shows empty states
- **u2** — Active user, shows randomized data

## API
Base URL: https://mock-backend-hintro.vercel.app/
Auth via `x-user-id` header.

## Key Design Decisions
- Follows Figma design pixel-for-pixel (white/light theme, Inter font)
- Feedback stored in `localStorage` via Zustand persist
- Duration formatted as "14m 22sec" to match Figma convention
- Last Session shown as relative time ("2 days ago")
- Responsive: mobile drawer sidebar, 1→2→4 col stats grid
- No hardcoded data — all values from API

## Assumptions
- Login page is UI-only (no real auth)
- "Start New Call", "Watch Tutorial" are UI-only buttons
- Feedback title defaults to "My First Call" (no call context available)
- u1/u2 switcher replaces real auth for demo purposes

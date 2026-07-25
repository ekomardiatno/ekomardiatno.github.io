# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EMDEV — a React SPA that serves as a personal portfolio landing page and the guest-facing wedding invitation renderer for EMVITE. Built with React 19, TypeScript 5, Vite 7, and Tailwind CSS v4. Deployed as a PWA on GitHub Pages (HashRouter).

## Commands

```bash
npm run dev              # Vite dev server (--host for network access)
npm run build            # TypeScript check + Vite production build
npm run preview          # Serve built dist/ locally
npm run lint             # ESLint check
npm run deploy           # Deploy dist/ to GitHub Pages via gh-pages
```

## Tech Stack

- React 19.2, TypeScript ~5.9, Vite 7
- Tailwind CSS v4 (as Vite plugin, no `tailwind.config.js`)
- Routing: react-router v7 with **HashRouter** (`/#/path`)
- HTTP: Axios with response interceptor (unwraps `{ success, data, message }`)
- Date formatting: `moment`
- Utility: `classnames` for conditional CSS classes
- Icons: `react-icons`
- PWA: `vite-plugin-pwa` with autoUpdate service worker

## Architecture

### Source Layout (`src/`)

- `pages/` — Page components (Home, Monflo, Eksamart, EmvitePrivacyPolicy)
- `pages/Emvite/` — Core invitation renderer + template registry
- `pages/Emvite/{TemplateName}/` — Template implementations (one folder per template)
- `pages/EmviteDemo*.tsx` — Demo pages with hardcoded data for each template
- `components/` — Shared UI: `Spinner`, `LoadingState`, `ErrorState`, `NavigationHeader`
- `hooks/useEmvite.ts` — `EmviteContext` + `useEmvite()` hook
- `services/common.ts` — Axios instance, `ApiError`/`ApiResponse` types
- `services/emvite.service.ts` — API calls: `getInvitationDetail`, `getInvitationDetailByGuest`, `createRsvp`, `createWish`
- `types/emvite.type.ts` — TypeScript interfaces for all domain types
- `constants/index.ts` — `PROVIDERS` array (10 payment providers with `.logo.regular` and `.logo.white`)
- `config/index.ts` — `EMVITE_API_URL` from env
- `style.css` — Tailwind v4 import + Google Fonts + all per-template CSS classes

### Templates (7 total)

| Code | Name | Navigation | Theme |
|------|------|------------|-------|
| `THE_BEGINNING` | TheBeginning | Vertical scroll | Light slate |
| `EVERGREEN` | Evergreen | Vertical scroll | Stone/emerald |
| `CELESTIAL` | Celestial | Vertical scroll | Dark navy/gold starfield |
| `ENCHANTED` | Enchanted | Vertical snap-scroll | Warm white/rose, floating petals |
| `VELVET` | Velvet | Vertical scroll + side nav | Dark purple-navy, typewriter |
| `OPULENT` | Opulent | Vertical scroll | Cream/gold, floating particles |
| `MEMOIR` | Memoir | **Horizontal swipe/tap (story-format)** | Dark cinematic, terracotta |

Registered in `pages/Emvite/constants.ts`. Backend stores `templateCode`; SPA maps it to a React component. Falls back to `TheBeginning` if unrecognized.

### Section-Based Template Structure (TheBeginning through Opulent)

Each template folder contains:
```
index.tsx              — Top-level layout (wraps all sections)
HeroSection.tsx        — Full-viewport hero with couple names + date
CountdownSection.tsx   — Countdown to main event
CoupleSection.tsx      — Groom + bride profiles
PersonCard.tsx         — Individual person card
EventDetailsSection.tsx— Event list
EventCard.tsx          — Single event card
LocationSection.tsx    — Google Maps embed
RsvpSection.tsx        — RSVP form
WeddingGiftSection.tsx — Digital envelope (bank/e-wallet)
GuestbookSection.tsx   — Wish form + wish list
FooterSection.tsx      — Closing message
```

### Memoir Template (Story-Format)

Completely different structure — horizontal pages navigated by swipe/tap/keyboard:
```
index.tsx              — Assembles dynamic page array
StoryNavigator.tsx     — Core: swipe/tap/keyboard, progress bars, page counter
CoverPage.tsx          — Cover page
CountdownPage.tsx      — Countdown
PersonPage.tsx         — Reusable groom/bride page
EventPage.tsx          — Per-event page (dynamic count)
RsvpPage.tsx           — RSVP form (scrollable)
GiftPage.tsx           — Gift cards (scrollable, conditional)
GuestbookPage.tsx      — Wishes + form (scrollable)
ClosingPage.tsx        — Thank you / footer
useCountdown.ts        — Countdown hook
```

### Key Patterns

- **Context-over-props**: All template sections use `useEmvite()` to access `data`, `mode`, `toast`, `pushWish`, `patchRsvp` — no prop drilling
- **Template selection**: `pages/Emvite/index.tsx` fetches data, looks up `templateCode` in the registry, renders the matched component
- **Mode gating**: `mode === "preview"` disables form submissions and shows toasts; `mode === "guest"` enables live interaction
- **Async pattern**: `isSubmitting` state → `useEffect` + `AbortController` → `useCallback` fetch function. Cleanup aborts on unmount
- **Optimistic updates**: `pushWish` prepends wish to state; `patchRsvp` replaces rsvp — no re-fetch needed
- **Photo URLs**: `${EMVITE_API_URL}/file?filePath=${photoPath}`
- **Map links**: Location stored as `"-6.9175, 107.6191"` string, split to build Google Maps URL
- **CSS-in-one-file**: All template CSS is in `src/style.css`, prefixed per template (`velvet-*`, `memoir-*`, `op-*`, etc.)
- **Viewport height**: Use `dvh` units (`h-dvh`, `min-h-dvh`, `100dvh`) instead of `vh`/`h-screen`/`min-h-screen` for elements that depend on viewport height, to avoid mobile browser address bar truncation

### Template-Specific Hooks

| Hook | Used by | Purpose |
|------|---------|---------|
| `useScrollReveal.ts` | Enchanted, Velvet, Opulent | IntersectionObserver → `{ ref, isVisible }` |
| `useTypewriter.ts` | Velvet | Character-by-character text reveal |
| `useCountUp.ts` | Opulent | Eased count-up via `requestAnimationFrame` |
| `useCountdown.ts` | Memoir | `{ days, hours, minutes, seconds }` with 1s interval |

## Adding a New Template

1. Create a folder `src/pages/Emvite/{TemplateName}/` with `index.tsx` + section components
2. Add font `@import` to `src/style.css` and prefix all CSS classes with template name
3. Import and register in `src/pages/Emvite/constants.ts`: `{ TemplateComponent, code: "CODE" }`
4. Create `src/pages/EmviteDemo{TemplateName}.tsx` with hardcoded `demoData`
5. Add demo route in `src/App.tsx`: `/emvite/demo/{name}`
6. Verify with `npm run build`

## Demo Pages

Each `EmviteDemo*.tsx` follows the same pattern:
- Static `demoData: WeddingInvitationDetailDataType` with Indonesian wedding data
- Local `data` state for optimistic RSVP/wish updates
- Wraps template in `EmviteContext.Provider` with `mode: "preview"`
- Renders `<Toast />` for notifications

## Environment

Single env var in `.env` (copy from `.env.example`):
- `VITE_EMVITE_API_URL` — Backend API base URL (default: `http://localhost:5001/api`)

## CI/CD

GitHub Actions (`.github/workflows/deploy.yml`) triggers on push:
- **`main` branch** → Build + deploy to GitHub Pages
- **`vps` branch** → Build + SSH/SCP to VPS + restart nginx

`VITE_EMVITE_API_URL` is set via GitHub Actions repository variable.

### Manual Deploy

```bash
npm run build && npm run deploy   # pushes dist/ to gh-pages branch
```

## Code Conventions

- Functional components only
- No Prettier config — code style enforced via ESLint only
- ESLint v9 flat config (`eslint.config.js`)
- Inline styles used extensively for template-specific theming (colors via `style={{}}`)
- `classnames` for conditional class composition
- No test framework configured
- No state management library — React `useState`/`useContext`/`useCallback` only

## Related Repos

- **Mobile App**: `https://github.com/ekomardiatno/emvitation.git` — React Native app for creating/managing invitations
- **Backend**: `https://github.com/ekomardiatno/emvite-node.git` — Express.js API server

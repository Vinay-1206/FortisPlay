# FortisPlay Admin — Next.js + TypeScript + Tailwind CSS + PWA Starter

A production-ready, enterprise-grade starter built with **Next.js 15 (App Router)**,
**TypeScript**, **Tailwind CSS**, and full **PWA support** (installable, offline-capable,
service worker, manifest, icons). The UI matches the FortisPlay admin console design
(Admin Login, Live Events dashboard, Masters → Venues).

---

## 1. Tech Stack

- **Next.js 15** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom design tokens matching the FortisPlay brand)
- **PWA**: manifest, service worker, offline fallback, app icons
- **ESLint + Prettier** (with `prettier-plugin-tailwindcss`)
- **lucide-react** for icons

---

## 2. Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:3000
```

Other scripts:

```bash
npm run build     # production build
npm run start     # run the production build
npm run lint      # ESLint
npm run format    # Prettier --write
```

> **Note on PWA in development**: service workers only register over HTTPS or on
> `localhost`. `npm run dev` on `localhost` works fine. For a full offline test,
> run `npm run build && npm run start` and open the app, reload once (to let the
> service worker install/activate), then go offline and reload again.

---

## 3. Project Structure

```
fortisplay-admin/
├── public/
│   ├── icons/                # Generated PWA icons (72px → 512px, maskable, apple-touch)
│   ├── manifest.json         # PWA manifest (name, icons, theme color, shortcuts)
│   ├── sw.js                 # Service worker (cache strategies, offline fallback)
│   ├── offline.html           # Static offline fallback page
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout: fonts, metadata, providers, SW registration
│   │   ├── globals.css        # Tailwind directives + base/utility layers
│   │   ├── page.tsx           # "/" — Admin Login page
│   │   ├── not-found.tsx      # Custom 404
│   │   └── (app)/             # Route group for authenticated shell
│   │       ├── layout.tsx     # Navbar + content + Footer
│   │       ├── dashboard/
│   │       │   └── page.tsx   # "/dashboard" — Live Events
│   │       └── masters/
│   │           └── page.tsx   # "/masters" — Venues table
│   ├── components/
│   │   ├── ui/                # Reusable, generic UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   └── Toast.tsx
│   │   ├── layout/             # App shell: Navbar, Sidebar, Footer, Breadcrumb, Logo
│   │   ├── dashboard/           # Live Events feature components
│   │   ├── masters/             # Masters/Venues feature components
│   │   └── auth/                # Login form
│   ├── lib/
│   │   └── utils.ts            # cn(), formatNumber(), truncate()
│   ├── hooks/                   # (custom hooks live here)
│   ├── services/                # Data-access layer (replace with real API calls)
│   │   ├── events.ts
│   │   └── venues.ts
│   └── types/
│       └── index.ts             # Shared TypeScript interfaces
├── scripts/
│   └── generate-icons.py        # Regenerates PWA icon set from the brand mark
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── package.json
```

### Why this structure?

- **`app/(app)`** is a *route group* — it shares one layout (Navbar + Footer) across
  `/dashboard`, `/masters`, and any future authenticated routes, without affecting the URL.
- **`components/ui`** holds *generic, app-agnostic* primitives (Button, Modal, Table…).
  These have zero business logic and can be reused in any project.
- **`components/<feature>`** (dashboard, masters, auth) holds *feature-specific*
  compositions that combine `ui` primitives with business logic/data.
- **`services`** is the single seam between UI and data. Today it returns static
  mock data shaped exactly like the real API responses; swap the implementation
  for `fetch()` calls to your backend without touching any components.
- **`types`** centralizes shared interfaces so every layer (services, components,
  pages) agrees on the same shapes.

---

## 4. Tailwind Setup

`tailwind.config.ts` defines design tokens derived from the source screenshots:

| Token | Value | Usage |
|---|---|---|
| `primary.500` | `#2563FF` | Primary buttons, links, active states |
| `ink.900` | `#0F172A` | Headings / primary text |
| `ink.500` | `#64748B` | Secondary text |
| `surface.subtle` | `#F8FAFC` | Table header backgrounds, hover rows |
| `surface.muted` | `#F1F5F9` | Borders / dividers |
| `surface.page` | `#F5F7FB` | App background |
| `status.live` | `#16A34A` | "Betting in Progress" |
| `status.stopped` | `#DC2626` | "Betting Stopped" |

Border radius (`xl` = 12px, `2xl` = 16px, `3xl` = 20px), shadows (`card`, `elevated`,
`modal`), and the `auth-gradient` background (login page) are also defined here.
The body font is **Manrope**, loaded via `next/font/google` (self-hosted, zero
layout shift, no external requests at runtime).

---

## 5. PWA Setup

- **`public/manifest.json`** — app name, theme color (`#2563FF`), background color,
  9 icon sizes (72–512px, including a maskable 512px icon), and app shortcuts to
  `/dashboard` and `/masters`.
- **`public/icons/*`** — generated via `scripts/generate-icons.py` (Pillow). Re-run
  `python3 scripts/generate-icons.py` after changing the brand mark.
- **`public/sw.js`** — a hand-written service worker (no external dependency):
  - **Navigations**: network-first, falling back to cache, then `offline.html`.
  - **Static assets** (`/_next/static`, icons, fonts): cache-first.
  - **Everything else**: stale-while-revalidate.
  - Old caches are purged on `activate`.
- **`src/components/PwaRegister.tsx`** — client component mounted in the root
  layout; registers `/sw.js` once the page has loaded.
- **`metadata`/`viewport`** in `src/app/layout.tsx` wire up the manifest link,
  theme color, Apple touch icon, and `apple-mobile-web-app-capable` meta tags so
  the app is installable on iOS and Android.

To verify installability: build & run in production mode, open Chrome DevTools →
Application → Manifest/Service Workers, or use Lighthouse's PWA audit.

---

## 6. Responsive Design

Mobile-first throughout, using Tailwind breakpoints:

| Breakpoint | Width | Behavior |
|---|---|---|
| (default) | 320px+ | Single-column cards, stacked header, mobile search bar, hamburger menu |
| `md:` | 768px+ | Search bar moves into the top bar |
| `lg:` | 1024px+ | Secondary tab navigation becomes visible; hamburger hidden |
| `xl`/`2xl` | 1440px+/1920px+ | Content remains comfortably centered; tables/grids use available width with horizontal scroll for wide schedules |

- **Navigation**: collapses to a left-side `Drawer`-based `Sidebar` below `lg`,
  becomes a horizontal tab bar at `lg+` (`Navbar.tsx`).
- **Tables**: wrapped in `TableContainer` (horizontal scroll on small screens),
  with a sticky first column for the schedule grids.
- **Cards/Grids**: stack vertically on mobile, full-width on desktop.

---

## 7. Reusable Components

All components live in `src/components/ui` and are exported from
`src/components/ui/index.ts` for convenient imports:

```tsx
import { Button, Input, Card, Modal, Pagination, useToast } from '@/components/ui';
```

| Component | Notes |
|---|---|
| `Button` | 5 variants (`primary`, `secondary`, `outline`, `ghost`, `danger`), 3 sizes, loading state, icon slots |
| `Input` | Label, hint, error state, left icon, right element (e.g. password toggle) |
| `Select` | Styled native `<select>` with chevron |
| `SearchBar` | Icon-prefixed search input |
| `Badge` / `StatusDot` | Status pills for race/draw times and legends |
| `Card`, `CardHeader`, `CardTitle` | Base surface container |
| `Table*` primitives | `TableContainer`, `TableHead`, `TableBody`, `TableRow`, `Th`, `Td` |
| `Pagination` | Numbered pagination with ellipsis collapsing |
| `Skeleton`, `CardTableSkeleton`, `TableRowSkeleton` | Loading placeholders |
| `EmptyState` | Icon + title + description + optional action |
| `Modal` | Centered dialog (portal, ESC to close, focus-safe) |
| `Drawer` | Slide-in side panel (left/right) |
| `Toast` / `useToast` / `ToastProvider` | Global toast notifications |

Layout components (`src/components/layout`):

| Component | Notes |
|---|---|
| `Navbar` | Brand, global search, account menu, section tabs, mobile hamburger |
| `Sidebar` | Mobile navigation drawer |
| `Footer` | Copyright footer |
| `Breadcrumb` | "Control Center › Dashboard" trail |
| `Logo` | FortisPlay hexagon mark + wordmark |

---

## 8. Example Pages

- **`/`** — Admin Login (gradient background, centered card, password toggle).
- **`/dashboard`** — Live Events: tabs (All / Horse Racing / Karambola / Lucky Sign),
  status legend, refresh button, schedule tables per event group, and a
  "Master Data Required" modal triggered from "Create Race Card" / "Create Meeting".
- **`/masters`** — Masters → Venues: secondary tab bar, searchable/paginated venue
  table with row selection, and an "Add Venue" side drawer form.

---

## 9. Code Quality & Architecture

- **Strict TypeScript** everywhere; shared types in `src/types/index.ts`.
- **Server Components by default** — pages fetch data via `services/*` on the
  server (`async function PageContent()` patterns with `<Suspense>` + skeleton
  fallbacks). `'use client'` is only added where interactivity is required
  (forms, modals, tabs, toasts).
- **Separation of concerns**: UI primitives (`components/ui`) never contain
  business logic; feature components compose them with data from `services`.
- **No duplication**: shared visuals (badges, tables, cards) are implemented once
  and reused across Dashboard and Masters.
- **Accessibility**: semantic landmarks (`<nav>`, `<header>`, `<main>`, `<footer>`),
  `aria-*` attributes on interactive elements, visible focus rings
  (`:focus-visible`), `prefers-reduced-motion` respected in `globals.css`.

---

## 10. Performance Notes

- Fonts are loaded via `next/font/google` (self-hosted, no render-blocking requests).
- Static pages are pre-rendered (`○ Static` in the build output for `/`,
  `/dashboard`, `/masters`).
- Heavy/interactive pieces (`Modal`, `Drawer`, `Toast`) are client components but
  are small and tree-shaken; consider `next/dynamic` for any future
  rarely-used, large client widgets (charts, rich editors, etc.).
- Use the Next.js `<Image>` component for any real photographic assets you add
  (`next/image`), which provides automatic resizing, lazy loading, and modern
  formats (AVIF/WebP, already enabled in `next.config.js`).

---

## 11. Next Steps

- Replace `src/services/*` with real API calls (REST/GraphQL) — the function
  signatures are already async and typed.
- Add authentication (NextAuth.js, or your own session/cookie-based auth) and
  protect the `(app)` route group with middleware.
- Add the remaining Masters tabs (Pools, LS Prize, Distributions, etc.) by
  reusing `VenuesTable`'s pattern with new types/services.
- Add unit/integration tests (Vitest + React Testing Library) and Lighthouse CI.

# FortisPlay Admin — Frontend Architecture Documentation

> **Generated**: June 2026 · **Codebase Version**: 1.0.0 · **Framework**: Next.js 15 (App Router)

---

## Executive Summary

### Project Purpose

**FortisPlay Admin** is an enterprise-grade administration console for managing live betting events, venues, and master data for the FortisPlay platform. It serves as the back-office control center used by operations teams to monitor live horse-racing, Karambola, and Lucky Sign events, manage race cards and meetings, and configure venue and pool master data.

### Business Objective

Provide a responsive, installable (PWA) admin panel that enables real-time operations management for live betting events, including event scheduling, master data CRUD, and operational dashboards.

### Architecture Overview

The application follows a **Server-First Component Architecture** using Next.js 15 App Router with React 19. Pages are rendered as React Server Components (RSC) that call async data-fetching services; interactive islands are explicitly marked with `'use client'`. The UI layer is built from a custom component library atop TailwindCSS 3, and data currently flows from hardcoded mock services rather than backend APIs.

### Architectural Style

| Characteristic | Value |
|---|---|
| Rendering Model | Hybrid RSC + Client Components |
| Architecture Pattern | Feature-based component grouping |
| State Management | Local `useState` + React Context (Toast) |
| Data Source | Mock service layer (no backend APIs) |
| Styling | Utility-first (TailwindCSS 3) |
| Deployment Target | PWA-capable SPA |

---

## Technology Stack

All technologies identified from `package.json`, configuration files, and actual imports:

| Category | Technology | Version | Source |
|---|---|---|---|
| **Framework** | Next.js (App Router) | ^15.1.0 | `package.json` |
| **Language** | TypeScript | ^5.6.3 | `package.json` + `tsconfig.json` |
| **UI Library** | React | ^19.0.0 | `package.json` |
| **Styling** | TailwindCSS | ^3.4.14 | `package.json` + `tailwind.config.ts` |
| **CSS Processing** | PostCSS + Autoprefixer | ^8.4.49 / ^10.4.20 | `postcss.config.js` |
| **Icons** | Lucide React | ^0.460.0 | `package.json` |
| **Class Names** | clsx | ^2.1.1 | `package.json` |
| **Linting** | ESLint + eslint-config-next | ^8.57.1 / ^15.1.0 | `.eslintrc.json` |
| **Formatting** | Prettier + prettier-plugin-tailwindcss | ^3.3.3 / ^0.6.8 | `.prettierrc` |
| **Build Tool** | Next.js Built-in (Webpack/Turbopack) | via Next 15 | `next.config.js` |
| **Fonts** | Google Fonts (Manrope) | Runtime | `src/app/layout.tsx` |

### Notable Absences

| Technology | Status |
|---|---|
| Redux / Redux Toolkit | **Not installed** |
| State Management Library | **None** (only React local state + Context) |
| Form Libraries (React Hook Form, Formik) | **Not installed** |
| Validation Libraries (Zod, Yup) | **Not installed** |
| Testing Frameworks (Jest, Vitest, Playwright) | **Not installed** |
| API Client (Axios, TanStack Query) | **Not installed** |
| Routing Library | **Built-in** (Next.js App Router) |

---

## Project Structure Analysis

```
fortisplay-admin/
├── public/                          # Static assets served at root
│   ├── favicon.ico / favicon.png    # Browser favicon
│   ├── icons/                       # PWA icons (72–512px)
│   ├── manifest.json                # PWA web app manifest
│   ├── offline.html                 # Offline fallback page
│   └── sw.js                        # Service worker (cache strategies)
├── scripts/
│   └── generate-icons.py            # Icon generation utility
├── src/
│   ├── app/                         # Next.js App Router — pages & layouts
│   │   ├── globals.css              # Tailwind base + custom utilities
│   │   ├── layout.tsx               # Root layout (font, metadata, ToastProvider)
│   │   ├── page.tsx                 # Login page (public, unauthenticated)
│   │   ├── not-found.tsx            # Custom 404 page
│   │   └── (app)/                   # Route group for authenticated shell
│   │       ├── layout.tsx           # App shell (Navbar + Footer)
│   │       ├── dashboard/page.tsx   # Live Events dashboard
│   │       ├── event-day/page.tsx   # Event Day view
│   │       └── masters/page.tsx     # Masters > Venues management
│   ├── components/                  # Reusable UI & feature components
│   │   ├── PwaRegister.tsx          # Service worker registration
│   │   ├── auth/                    # Authentication feature
│   │   │   └── LoginForm.tsx        # Login form (simulated auth)
│   │   ├── dashboard/              # Dashboard feature components
│   │   │   ├── EventGroupCard.tsx   # Event group panel
│   │   │   ├── EventScheduleTable.tsx  # Schedule grid
│   │   │   ├── LiveEventsView.tsx   # Live events orchestrator
│   │   │   └── MasterDataModal.tsx  # Master data prerequisite dialog
│   │   ├── layout/                  # Layout shell components
│   │   │   ├── Breadcrumb.tsx       # Breadcrumb navigation
│   │   │   ├── Footer.tsx           # Page footer
│   │   │   ├── Logo.tsx             # SVG brand mark + wordmark
│   │   │   ├── Navbar.tsx           # Top navigation bar
│   │   │   ├── Sidebar.tsx          # Mobile drawer navigation
│   │   │   └── nav-config.ts        # Navigation link definitions
│   │   ├── masters/                # Masters feature components
│   │   │   ├── AddVenueDrawer.tsx   # Venue creation side panel
│   │   │   ├── MastersTabs.tsx      # Section tab navigation
│   │   │   └── VenuesTable.tsx      # Venues data table with search/pagination
│   │   └── ui/                      # Primitive UI component library
│   │       ├── index.ts             # Barrel export
│   │       ├── Badge.tsx            # Status badge + dot
│   │       ├── Button.tsx           # Multi-variant button
│   │       ├── Card.tsx             # Surface card containers
│   │       ├── Drawer.tsx           # Slide-in panel
│   │       ├── EmptyState.tsx       # Empty data placeholder
│   │       ├── Input.tsx            # Text input w/ label, icon, error
│   │       ├── Modal.tsx            # Centered dialog
│   │       ├── Pagination.tsx       # Page controls
│   │       ├── SearchBar.tsx        # Search input
│   │       ├── Select.tsx           # Styled native select
│   │       ├── Skeleton.tsx         # Loading placeholders
│   │       ├── Table.tsx            # Table primitives
│   │       └── Toast.tsx            # Toast notification system
│   ├── lib/                         # Shared utility functions
│   │   └── utils.ts                 # cn(), formatNumber(), truncate()
│   ├── services/                    # Data access layer (mock)
│   │   ├── events.ts               # Mock live event data
│   │   └── venues.ts               # Mock venue data
│   └── types/                       # Shared TypeScript types
│       └── index.ts                 # Domain type definitions
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc                      # Prettier configuration
├── next.config.js                   # Next.js configuration
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.ts               # Tailwind configuration
└── tsconfig.json                    # TypeScript configuration
```

### Folder Responsibilities

| Folder | Purpose | Dependencies | Ownership |
|---|---|---|---|
| `src/app/` | Page routes, layouts, metadata via Next.js App Router | Components, services | Routing / pages |
| `src/components/ui/` | Design-system primitives (13 components) | `lib/utils`, `lucide-react` | Shared / design system |
| `src/components/layout/` | App shell (Navbar, Sidebar, Footer, Breadcrumb, Logo) | UI components, `nav-config` | Layout |
| `src/components/auth/` | Login form and authentication UI | UI components, `next/navigation` | Auth feature |
| `src/components/dashboard/` | Live events dashboard feature | UI components, types | Dashboard feature |
| `src/components/masters/` | Master data management (Venues) | UI components, types | Masters feature |
| `src/services/` | Data access abstraction (currently static/mock) | Types | Data layer |
| `src/types/` | Shared TypeScript interfaces and types | None | Cross-cutting |
| `src/lib/` | Utility functions | `clsx` | Cross-cutting |
| `public/` | Static assets, PWA manifest, service worker | None | Infrastructure |

---

## Architectural Patterns

### 1. Server-First Rendering (RSC Pattern)

**Evidence:** Pages in `src/app/(app)/dashboard/page.tsx` and `src/app/(app)/masters/page.tsx` use **async Server Components** to fetch data at the component level, with `<Suspense>` boundaries for loading states.

```
DashboardPage (Server Component)
├── Breadcrumb (Server Component)
└── <Suspense fallback={<DashboardSkeleton />}>
    └── DashboardContent (async Server Component)
        └── LiveEventsView (Client Component — 'use client')
```

### 2. Feature-Based Component Grouping

Components are organized by feature domain:
- `components/auth/` — Authentication
- `components/dashboard/` — Live events dashboard
- `components/masters/` — Master data management
- `components/layout/` — Application shell
- `components/ui/` — Shared design-system primitives

### 3. Container / Presentational Separation

Pages act as **containers** fetching data and passing it down:
- `DashboardPage → DashboardContent` fetches `getLiveEvents()` → passes to `LiveEventsView`
- `MastersPage → VenuesContent` fetches `getVenues()` → passes to `VenuesTable`

Presentational components (`EventGroupCard`, `EventScheduleTable`) receive data via props.

### 4. Service Abstraction Layer

`src/services/` provides an abstraction over data sources. Functions return `Promise<T>` signatures identical to what real API calls would use, enabling future backend integration with minimal refactoring.

**Evidence:**
```typescript
// src/services/events.ts
export async function getLiveEvents(): Promise<EventGroup[]> { /* returns static data */ }

// src/services/venues.ts
export async function getVenues(): Promise<Venue[]> { /* returns static array */ }
export async function searchVenues(query: string): Promise<Venue[]> { /* client-side filter */ }
```

### 5. Custom UI Component Library (Atomic Design — Atoms Level)

13 reusable primitives in `src/components/ui/` with:
- Consistent API patterns (`variant`, `size`, `className` props)
- `forwardRef` for form elements (`Button`, `Input`, `Select`)
- Prop-driven styling via Tailwind class composition
- Barrel export via `index.ts`

### 6. Context-Based Cross-Cutting Concerns

The `ToastProvider` in `src/components/ui/Toast.tsx` wraps the entire app via the root layout, providing a `useToast()` hook for any component to show notifications. This is the **only** React Context in the application.

---

## State Management Architecture

### Current State: No External State Management

The application does **not** use Redux, Zustand, MobX, or any state management library. All state is managed through:

| Mechanism | Usage | Location |
|---|---|---|
| React `useState` | Form state, UI toggles, pagination, tab selection, search queries | All `'use client'` components |
| React Context | Toast notification system | `src/components/ui/Toast.tsx` |
| Server Component props | Data flows from async services into client components | `src/app/(app)/*/page.tsx` |

### State Inventory

| State Variable | Component | Type | Purpose |
|---|---|---|---|
| `showPassword` | `LoginForm` | `boolean` | Password visibility toggle |
| `isLoading` | `LoginForm` | `boolean` | Login submission state |
| `activeTab` | `LiveEventsView` | `Tab` | Filter events by category |
| `isRefreshing` | `LiveEventsView` | `boolean` | Refresh animation state |
| `isModalOpen` | `LiveEventsView` | `boolean` | Master data modal visibility |
| `query` | `VenuesTable` | `string` | Search filter |
| `page` | `VenuesTable` | `number` | Current page number |
| `selected` | `VenuesTable` | `Set<string>` | Row selection state |
| `isDrawerOpen` | `VenuesTable` | `boolean` | Add venue drawer visibility |
| `status` | `AddVenueDrawer` | `'Active' \| 'Deactive'` | Venue status radio |
| `isSubmitting` | `AddVenueDrawer` | `boolean` | Form submission state |
| `sidebarOpen` | `Navbar` | `boolean` | Mobile sidebar visibility |
| `toasts` | `ToastProvider` | `ToastMessage[]` | Active toast notifications |

### State Flow Diagram

```
[Server Component (Page)]
    │
    ├── (async) services/events.ts → getLiveEvents() → EventGroup[]
    ├── (async) services/venues.ts → getVenues() → Venue[]
    │
    └── [Client Component (Feature)]
         ├── useState() → local UI state
         ├── useToast() → global toast context
         └── Props → child presentational components
```

---

## Component Architecture

### Component Classification

#### Layout Components (5)
| Component | File | Role |
|---|---|---|
| `Navbar` | `components/layout/Navbar.tsx` | Top bar: branding, search, account, section tabs |
| `Sidebar` | `components/layout/Sidebar.tsx` | Mobile navigation drawer |
| `Breadcrumb` | `components/layout/Breadcrumb.tsx` | Navigation breadcrumb trail |
| `Footer` | `components/layout/Footer.tsx` | Copyright footer |
| `Logo` | `components/layout/Logo.tsx` | SVG brand mark + optional wordmark |

#### Shared UI Components (13)
| Component | File | Props |
|---|---|---|
| `Button` | `ui/Button.tsx` | `variant`, `size`, `isLoading`, `leftIcon`, `rightIcon` |
| `Input` | `ui/Input.tsx` | `label`, `error`, `hint`, `leftIcon`, `rightElement` |
| `Select` | `ui/Select.tsx` | `label`, `error`, `options`, `placeholder` |
| `SearchBar` | `ui/SearchBar.tsx` | `containerClassName` + standard input props |
| `Badge` | `ui/Badge.tsx` | `status` (live/stopped/idle) |
| `StatusDot` | `ui/Badge.tsx` | `status` |
| `Card` / `CardHeader` / `CardTitle` | `ui/Card.tsx` | `noPadding` |
| `Table` / `Th` / `Td` / etc. | `ui/Table.tsx` | Standard HTML table props |
| `Modal` | `ui/Modal.tsx` | `isOpen`, `onClose`, `size`, `title`, `footer` |
| `Drawer` | `ui/Drawer.tsx` | `isOpen`, `onClose`, `side`, `title` |
| `Pagination` | `ui/Pagination.tsx` | `page`, `pageSize`, `total`, `onPageChange` |
| `EmptyState` | `ui/EmptyState.tsx` | `icon`, `title`, `description`, `action` |
| `Skeleton` / `CardTableSkeleton` / `TableRowSkeleton` | `ui/Skeleton.tsx` | `rows`, `cols` |
| `Toast` / `ToastProvider` / `useToast` | `ui/Toast.tsx` | Context-driven |

#### Feature Components
| Component | Feature | File |
|---|---|---|
| `LoginForm` | Auth | `components/auth/LoginForm.tsx` |
| `LiveEventsView` | Dashboard | `components/dashboard/LiveEventsView.tsx` |
| `EventGroupCard` | Dashboard | `components/dashboard/EventGroupCard.tsx` |
| `EventScheduleTable` | Dashboard | `components/dashboard/EventScheduleTable.tsx` |
| `MasterDataModal` | Dashboard | `components/dashboard/MasterDataModal.tsx` |
| `VenuesTable` | Masters | `components/masters/VenuesTable.tsx` |
| `MastersTabs` | Masters | `components/masters/MastersTabs.tsx` |
| `AddVenueDrawer` | Masters | `components/masters/AddVenueDrawer.tsx` |

#### Infrastructure Components
| Component | File | Role |
|---|---|---|
| `PwaRegister` | `components/PwaRegister.tsx` | Service worker registration |

### Component Relationships

```
RootLayout
├── ToastProvider (Context)
├── PwaRegister
└── children
    ├── LoginPage (/) → Logo, LoginForm, Footer
    └── AppLayout ((app)/) → Navbar (→ Sidebar), Footer
        ├── DashboardPage → Breadcrumb, LiveEventsView
        │   └── LiveEventsView → EventGroupCard[] → EventScheduleTable
        │                     → MasterDataModal
        ├── EventDayPage → Breadcrumb, LiveEventsView (same)
        └── MastersPage → Breadcrumb, MastersTabs, VenuesTable
                          └── VenuesTable → AddVenueDrawer
```

---

## Current Data Flow Architecture

### Dashboard Flow (Actual)

```
1. Browser navigates to /dashboard
2. Next.js renders DashboardPage (Server Component)
3. DashboardContent calls getLiveEvents() (async)
4. getLiveEvents() returns hardcoded EventGroup[] from src/services/events.ts
5. Data passed as props: <LiveEventsView groups={groups} />
6. LiveEventsView (Client) renders EventGroupCard components
7. User clicks tab → local useState filters visible groups (client-side)
8. User clicks "Create Race Card" → opens MasterDataModal (client-side)
```

### Masters Flow (Actual)

```
1. Browser navigates to /masters
2. MastersPage (Server Component) calls getVenues() (async)
3. getVenues() returns hardcoded Venue[] from src/services/venues.ts
4. Data passed as props: <VenuesTable venues={venues} />
5. VenuesTable (Client) manages search/pagination/selection locally
6. User clicks "Create New" → opens AddVenueDrawer (client-side)
7. Form submission simulated with setTimeout → shows toast
```

### Login Flow (Actual)

```
1. User opens / (root) → LoginPage (Server Component)
2. LoginForm (Client) handles form submission
3. handleSubmit: setTimeout(800ms) simulates auth
4. Success → show toast → router.push('/dashboard')
5. No actual authentication occurs — no tokens, no session
```

---

## Styling Architecture

### Strategy: Utility-First with Custom Design Tokens

The styling approach uses **TailwindCSS 3** with a comprehensive custom design system defined in `tailwind.config.ts`:

#### Color System
| Token Group | Purpose | Example |
|---|---|---|
| `primary-50..900` | Brand blue palette | `#2563FF` (primary-500) |
| `surface-*` | Background surfaces | `page`, `subtle`, `muted`, `DEFAULT` |
| `status-*` | Semantic status colors | `live` (#16A34A), `stopped` (#DC2626), `warning` (#F59E0B) |
| `ink-300..900` | Text/foreground hierarchy | 5-level gray scale |

#### Typography
- **Font**: Manrope (Google Fonts) via `next/font` with CSS variable `--font-manrope`
- **Anti-aliasing**: Enabled globally via `antialiased` class
- **Text sizing**: Tailwind defaults (no custom font sizes)

#### Custom Animations
| Animation | Keyframes | Duration |
|---|---|---|
| `fade-in` | Opacity 0→1 + translateY 4→0 | 0.2s ease-out |
| `slide-in-right` | translateX 100%→0 | 0.25s ease-out |
| `shimmer` | Background position scroll | 2s infinite linear |

#### Background Gradients
- `auth-gradient`: Radial cyan-to-white for login screen
- `brand-gradient`: Linear blue-to-navy for brand elements

#### Accessibility
- Focus-visible ring: `ring-2 ring-primary-300 ring-offset-2` (`globals.css`)
- Reduced-motion media query support (`globals.css`)
- ARIA attributes on all interactive UI components

### Design Consistency Assessment

| Aspect | Rating | Notes |
|---|---|---|
| Color consistency | ★★★★★ | Strict adherence to token palette |
| Spacing consistency | ★★★★☆ | Mostly consistent, some ad-hoc values |
| Border radius | ★★★★★ | Uniform `rounded-xl` across cards/inputs |
| Shadow system | ★★★★★ | Three-tier: `card`, `elevated`, `modal` |

---

## Routing Architecture

### Route Structure (Next.js App Router)

```
/                        → src/app/page.tsx              (Login — public)
├── not-found            → src/app/not-found.tsx         (Custom 404)
└── (app)/               → src/app/(app)/layout.tsx      (Authenticated shell)
    ├── /dashboard       → src/app/(app)/dashboard/page.tsx
    ├── /event-day       → src/app/(app)/event-day/page.tsx
    └── /masters         → src/app/(app)/masters/page.tsx
```

### Navigation Configuration

**Primary Nav** (`nav-config.ts`):
| Route | Label | Status |
|---|---|---|
| `/dashboard` | Dashboard | **Implemented** |
| `/event-day` | Event Day | **Implemented** (duplicate of dashboard) |
| `/masters` | Masters | **Implemented** (Venues only) |
| `/allotments` | Allotments | **Not implemented** (nav link only) |
| `/reports` | Reports | **Not implemented** (nav link only) |
| `/cctv` | CCTV | **Not implemented** (nav link only) |
| `/collection-merger` | Collection Merger | **Not implemented** (nav link only) |

**Masters Sub-Tabs** (`nav-config.ts`):
| Route | Label | Status |
|---|---|---|
| `/masters` | Venues | **Implemented** |
| `/masters/pools` | Pools | **Not implemented** |
| `/masters/ls-prize` | LS Prize | **Not implemented** |
| `/masters/distributions` | Distributions | **Not implemented** |
| `/masters/enclosures` | Enclosures | **Not implemented** |
| `/masters/terminals` | Terminals | **Not implemented** |
| `/masters/users` | Users | **Not implemented** |
| `/masters/users-kyc` | Users KYC | **Not implemented** |
| `/masters/locations` | Locations | **Not implemented** |

### Route Protection

**Authentication is NOT implemented.** No route guards, middleware, or token checks exist. The `(app)` route group provides a visual shell but no access control.

### Lazy Loading

Pages within the `(app)` route group use Next.js automatic code splitting. `<Suspense>` boundaries are used in `dashboard/page.tsx`, `event-day/page.tsx`, and `masters/page.tsx` for loading states via skeleton components.

---

## Configuration Architecture

| File | Purpose | Key Settings |
|---|---|---|
| `next.config.js` | Next.js build config | `reactStrictMode: true`, image formats (AVIF, WebP), service worker headers |
| `tsconfig.json` | TypeScript config | `strict: true`, `noUncheckedIndexedAccess: true`, path alias `@/* → ./src/*` |
| `tailwind.config.ts` | Tailwind CSS config | Custom brand colors, fonts, animations, shadows |
| `.eslintrc.json` | Linting rules | Extends `next/core-web-vitals`, `next/typescript`, `prettier` |
| `.prettierrc` | Code formatting | 2-space tabs, single quotes, trailing commas, 100 char width |
| `postcss.config.js` | CSS processing | TailwindCSS + Autoprefixer plugins |
| `manifest.json` | PWA manifest | Display standalone, 9 icon sizes, 2 shortcuts |

### Environment Variables

**No `.env` files exist.** No environment variable usage found in the codebase. The metadata base URL is hardcoded as `https://admin.fortisplay.example` in `src/app/layout.tsx`.

---

## Security Considerations

### Current State

| Area | Status | Details |
|---|---|---|
| Authentication | ⚠️ **Not implemented** | Login form simulates auth with `setTimeout`, then navigates to `/dashboard` |
| Token handling | ⚠️ **Not implemented** | No tokens stored, no auth headers sent |
| Route protection | ⚠️ **Not implemented** | No middleware, no guards. All routes are publicly accessible |
| Local storage | ✅ Not used | No sensitive data stored in localStorage/sessionStorage |
| CSRF protection | N/A | No API calls to protect |
| XSS protection | ✅ Low risk | React's built-in JSX escaping, no `dangerouslySetInnerHTML` usage |
| Content Security Policy | ⚠️ **Not configured** | No CSP headers set |
| HTTPS enforcement | ⚠️ **Not configured** | No redirect rules |

### Security Risks (Prioritized)

1. **Critical** — No authentication: Any visitor can access `/dashboard` and `/masters` directly.
2. **High** — No CSRF protection planned for form submissions.
3. **Medium** — Hardcoded metadata base URL instead of environment variable.
4. **Low** — PWA service worker currently caches all same-origin responses, which could cache sensitive data once APIs are integrated.

---

## Performance Analysis

### Current Strengths

| Technique | Implementation | Evidence |
|---|---|---|
| Server Components | ✅ Pages render on server | `dashboard/page.tsx`, `masters/page.tsx` use async RSC |
| Automatic code splitting | ✅ Built into App Router | Each `page.tsx` is a separate chunk |
| Font optimization | ✅ `next/font` | Manrope loaded via `Manrope()` with `display: 'swap'` |
| Image optimization | ✅ Configured | `formats: ['image/avif', 'image/webp']` in `next.config.js` |
| Suspense loading | ✅ Skeleton UI | `<Suspense fallback={<CardTableSkeleton />}>` on data pages |
| PWA caching | ✅ Service worker | Cache-first for static, network-first for navigation, SWR for runtime |
| Reduced motion | ✅ Media query | `globals.css` respects `prefers-reduced-motion` |

### Opportunities for Improvement

| Area | Current | Recommendation |
|---|---|---|
| `useMemo` usage | Used in `LiveEventsView`, `VenuesTable` | Good — consider adding `useCallback` for event handlers passed as props |
| Re-render risk | Tab filtering re-renders all event cards | Minimal impact with current data volumes |
| Runtime table rendering | Horizontally scrollable tables with many columns | Consider virtualization for large datasets |
| Bundle size | Only 4 production dependencies (`next`, `react`, `react-dom`, `clsx`, `lucide-react`) | Lean — maintain this discipline |
| Lazy loading routes | Not explicitly using `next/dynamic` | App Router handles this automatically |

---

## Technical Debt

### Architecture Issues

| Issue | Severity | Evidence | Impact |
|---|---|---|---|
| Event Day page is a duplicate of Dashboard | Medium | `event-day/page.tsx` is identical to `dashboard/page.tsx` | Dead code, confusing architecture |
| No authentication layer | Critical | `LoginForm` uses `setTimeout` for fake auth | Security vulnerability |
| Hardcoded metadata URL | Low | `layout.tsx`: `metadataBase: new URL('https://admin.fortisplay.example')` | Breaks in different environments |
| No error boundaries | Medium | No `error.tsx` files in any route segment | Unhandled errors crash the full page |
| Inconsistent `combined` type | Low | `Venue.combined: 'Y' \| 'N' \| 'No'` — `'N'` and `'No'` mixed | Data inconsistency |
| No form validation | Medium | `LoginForm`, `AddVenueDrawer` rely only on HTML `required` | No client-side validation beyond browser defaults |
| Phantom `{app` directory | Low | `src/{app` directory exists (likely a typo) | Unnecessary artifact |

### Folder Structure Concerns

- The `src/components/dashboard/LiveEventsView.tsx` is reused by both `/dashboard` and `/event-day` pages — this should be documented or refactored into a shared location.
- `nav-config.ts` lives inside `components/layout/` but is a pure configuration file — would be better placed in a `config/` directory.

### Scalability Concerns

- **No global state management**: Adding Redux or Zustand will be essential when backend APIs are integrated.
- **Mock services return static arrays**: No pagination, sorting, or error handling in the service layer.
- **Single `types/index.ts`**: Will become unwieldy as more domain types are added; should migrate to feature-specific type files.

---

## Enterprise Readiness Assessment

| Dimension | Score | Rationale |
|---|---|---|
| **Maintainability** | 7/10 | Clean component architecture, TypeScript strict mode, consistent patterns. Lacks tests and error boundaries. |
| **Scalability** | 5/10 | Feature-based structure is good, but no state management, no API layer, single types file, limited routing. |
| **Performance** | 8/10 | Server Components, Suspense, font optimization, PWA caching, lean dependencies. Excellent for current scope. |
| **Developer Experience** | 7/10 | Good tooling (ESLint, Prettier, TS strict, path aliases). No tests, no Storybook, no CI/CD config. |
| **Code Organization** | 7/10 | Logical feature-based structure. Some issues (duplicate page, phantom directory, shared config placement). |
| **Security** | 2/10 | No authentication, no route protection, no CSP, no environment variables. Critical gap. |
| **Testability** | 2/10 | No test framework installed, no test files exist. Components are testable in design but untested. |
| **Overall** | **5.4/10** | Solid UI foundation with critical gaps in security, testing, and backend integration readiness. |

---

## Recommendations

### Immediate Improvements (Sprint 1–2)

1. **Install and configure a testing framework** (Vitest + React Testing Library + Playwright)
2. **Add `error.tsx` files** to every route segment for graceful error handling
3. **Remove the duplicate `event-day/page.tsx`** or differentiate it from `dashboard/page.tsx`
4. **Move hardcoded URLs to environment variables** (`.env.local`)
5. **Fix the `Venue.combined` type** — standardize to `'Y' | 'N'`
6. **Delete the phantom `src/{app` directory**
7. **Add form validation library** (Zod + React Hook Form recommended)

### Medium-Term Improvements (Sprint 3–6)

8. **Implement authentication** — JWT/session-based auth with Next.js middleware for route protection
9. **Install Redux Toolkit** with RTK Query for backend API integration
10. **Create a service/API layer** that abstracts HTTP calls with retry, error handling, and caching
11. **Add loading and error states** to all async data flows
12. **Implement the remaining Masters sub-pages** (Pools, Distributions, Users, etc.)
13. **Add Storybook** for UI component documentation and visual testing
14. **Set up CI/CD pipeline** with linting, type checking, tests, and build verification

### Long-Term Improvements (Quarter 2+)

15. **Implement RBAC** (Role-Based Access Control) for different admin levels
16. **Add real-time data** via WebSockets or Server-Sent Events for live event monitoring
17. **Implement data caching strategy** with RTK Query or TanStack Query
18. **Add internationalization (i18n)** for multi-language support
19. **Performance monitoring** — integrate Web Vitals reporting
20. **Implement comprehensive E2E test suite** covering all critical user flows

---

## Appendix: File Inventory

| File | Lines | Type | Client? |
|---|---|---|---|
| `src/app/layout.tsx` | 54 | Root Layout | No (Server) |
| `src/app/page.tsx` | 28 | Login Page | No (Server) |
| `src/app/not-found.tsx` | 20 | 404 Page | No (Server) |
| `src/app/globals.css` | 42 | Global Styles | N/A |
| `src/app/(app)/layout.tsx` | 17 | App Shell Layout | No (Server) |
| `src/app/(app)/dashboard/page.tsx` | 37 | Dashboard Page | No (Server) |
| `src/app/(app)/event-day/page.tsx` | 37 | Event Day Page | No (Server) |
| `src/app/(app)/masters/page.tsx` | 30 | Masters Page | No (Server) |
| `src/components/PwaRegister.tsx` | 30 | PWA Registration | Yes |
| `src/components/auth/LoginForm.tsx` | 73 | Login Form | Yes |
| `src/components/dashboard/LiveEventsView.tsx` | 83 | Live Events | Yes |
| `src/components/dashboard/EventGroupCard.tsx` | 41 | Event Card | No (Server) |
| `src/components/dashboard/EventScheduleTable.tsx` | 47 | Schedule Table | No (Server) |
| `src/components/dashboard/MasterDataModal.tsx` | 74 | Master Dialog | Yes |
| `src/components/layout/Navbar.tsx` | 91 | Top Navigation | Yes |
| `src/components/layout/Sidebar.tsx` | 53 | Mobile Nav | Yes |
| `src/components/layout/Breadcrumb.tsx` | 28 | Breadcrumb | No (Server) |
| `src/components/layout/Footer.tsx` | 10 | Footer | No (Server) |
| `src/components/layout/Logo.tsx` | 26 | Brand Logo | No (Server) |
| `src/components/layout/nav-config.ts` | 26 | Nav Config | N/A |
| `src/components/masters/MastersTabs.tsx` | 36 | Section Tabs | Yes |
| `src/components/masters/VenuesTable.tsx` | 155 | Venues Table | Yes |
| `src/components/masters/AddVenueDrawer.tsx` | 80 | Add Venue Form | Yes |
| `src/components/ui/Badge.tsx` | 44 | Status Badge | No (Server) |
| `src/components/ui/Button.tsx` | 79 | Button | No (Server) |
| `src/components/ui/Card.tsx` | 45 | Card | No (Server) |
| `src/components/ui/Drawer.tsx` | 75 | Drawer Panel | Yes |
| `src/components/ui/EmptyState.tsx` | 26 | Empty State | No (Server) |
| `src/components/ui/Input.tsx` | 71 | Text Input | No (Server) |
| `src/components/ui/Modal.tsx` | 85 | Modal Dialog | Yes |
| `src/components/ui/Pagination.tsx` | 87 | Pagination | Yes |
| `src/components/ui/SearchBar.tsx` | 28 | Search Input | Yes |
| `src/components/ui/Select.tsx` | 65 | Select Input | No (Server) |
| `src/components/ui/Skeleton.tsx` | 52 | Loading Skeleton | No (Server) |
| `src/components/ui/Table.tsx` | 59 | Table Primitives | No (Server) |
| `src/components/ui/Toast.tsx` | 98 | Toast System | Yes |
| `src/components/ui/index.ts` | 14 | Barrel Export | N/A |
| `src/lib/utils.ts` | 21 | Utilities | N/A |
| `src/services/events.ts` | 119 | Event Service | N/A |
| `src/services/venues.ts` | 34 | Venue Service | N/A |
| `src/types/index.ts` | 63 | Type Defs | N/A |

# FortisPlay Admin — Architecture Review Report

> **Review Date**: June 2026 · **Reviewer**: Frontend Architecture Analysis · **Codebase**: v1.0.0

---

## Architecture Scorecard

| Dimension | Score | Grade |
|---|---|---|
| Maintainability | 7/10 | B |
| Scalability | 5/10 | C |
| Performance | 8/10 | A- |
| Security | 2/10 | F |
| Testability | 2/10 | F |
| Developer Experience | 7/10 | B |
| **Overall** | **5.2/10** | **C** |

---

## Detailed Findings

### 1. Maintainability — 7/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| M1 | **Clean component architecture**: Feature-based grouping with clear separation of UI primitives (`components/ui/`) from feature components (`components/dashboard/`, `components/masters/`). | Positive | — |
| M2 | **TypeScript strict mode**: `strict: true` + `noUncheckedIndexedAccess: true` in `tsconfig.json` catches errors at compile time. | Positive | — |
| M3 | **Consistent coding patterns**: All client components marked with `'use client'`, consistent prop interfaces, `forwardRef` on form elements. | Positive | — |
| M4 | **Duplicate page**: `event-day/page.tsx` is an exact copy of `dashboard/page.tsx` with same content and metadata. Creates confusion. | Negative | Medium |
| M5 | **No error boundaries**: No `error.tsx` files exist in any route segment. Runtime errors will crash the entire page. | Negative | High |
| M6 | **No inline documentation strategy**: JSDoc comments are sparse and inconsistent across components. | Negative | Low |

**Evidence**: `src/app/(app)/event-day/page.tsx` lines 1–37 are identical to `src/app/(app)/dashboard/page.tsx`.

---

### 2. Scalability — 5/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| S1 | **Feature-based component organization**: Scales well as new features are added (auth/, dashboard/, masters/). | Positive | — |
| S2 | **No state management library**: As API integration grows, `useState` won't scale for shared state, caching, or optimistic updates. | Negative | Critical |
| S3 | **Single types file**: `types/index.ts` (63 lines) will become unwieldy. Should be split per domain/feature. | Negative | Medium |
| S4 | **Monolithic nav-config**: `nav-config.ts` defines all routes — consider per-feature route configs. | Negative | Low |
| S5 | **No API abstraction**: Services return hardcoded data with no HTTP client, error handling, retry, or caching infrastructure. | Negative | Critical |
| S6 | **4 of 7 primary nav routes unimplemented**: Significant surface area still to build. | Informational | — |
| S7 | **8 of 9 Masters sub-sections unimplemented**: Only Venues is functional. | Informational | — |

**Evidence**: `nav-config.ts` defines 7 primary nav items and 9 masters tabs, but only 3 pages and 1 sub-section exist.

---

### 3. Performance — 8/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| P1 | **Server Components by default**: Pages render on server, reducing client JS bundle. | Positive | — |
| P2 | **Suspense boundaries**: Dashboard and Masters pages use `<Suspense>` with skeleton fallbacks. | Positive | — |
| P3 | **Optimized font loading**: Google Fonts via `next/font` with `display: 'swap'` and CSS variable. | Positive | — |
| P4 | **Lean dependency tree**: Only 4 runtime dependencies (next, react, react-dom, clsx, lucide-react). | Positive | — |
| P5 | **PWA caching**: Service worker with cache-first (static), network-first (navigation), SWR (runtime). | Positive | — |
| P6 | **No virtualization for large tables**: `VenuesTable` renders all rows on current page but may need virtualization at scale. | Minor Risk | Low |
| P7 | **No `React.memo` usage**: Components re-render fully on parent state changes. Minimal impact at current scale. | Minor Risk | Low |

---

### 4. Security — 2/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| SEC1 | **No authentication**: `LoginForm` uses `setTimeout(800ms)` to simulate login, then navigates to `/dashboard` without any token or session. | Critical vulnerability | Critical |
| SEC2 | **No route protection**: No Next.js middleware, no auth guards. All `(app)/` routes are publicly accessible via URL. | Critical vulnerability | Critical |
| SEC3 | **No CSRF protection**: Form submissions (AddVenueDrawer) have no CSRF tokens. | Risk when APIs added | High |
| SEC4 | **Hardcoded metadata URL**: `metadataBase: new URL('https://admin.fortisplay.example')` in root layout. | Environment leak | Medium |
| SEC5 | **No Content Security Policy**: No CSP headers configured in `next.config.js` or middleware. | Risk | Medium |
| SEC6 | **Service worker caches broadly**: Will cache API responses once backend is integrated, potentially exposing sensitive data offline. | Future risk | Medium |

**Evidence**: `src/components/auth/LoginForm.tsx` line 22: `await new Promise((resolve) => setTimeout(resolve, 800));`

**Recommendation**: Implement JWT-based auth with Next.js middleware (`middleware.ts`) that checks for valid tokens on all `(app)/` routes before rendering.

---

### 5. Testability — 2/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| T1 | **No test framework installed**: No Jest, Vitest, React Testing Library, or Playwright in `package.json`. | No automated tests | Critical |
| T2 | **No test files exist**: Zero `*.test.ts`, `*.spec.ts`, or `__tests__/` directories. | No test coverage | Critical |
| T3 | **Components are testable in design**: Props-based, typed, with clear interfaces — good testing potential. | Positive | — |
| T4 | **Service layer is mockable**: Async functions returning typed data make dependency injection straightforward. | Positive | — |
| T5 | **No CI/CD configuration**: No GitHub Actions, no pre-commit hooks for lint/type-check. | No automation | High |

**Recommendation**: Install Vitest + React Testing Library for unit/component tests and Playwright for E2E. Add `"test": "vitest"` to `package.json` scripts.

---

### 6. Developer Experience — 7/10

| # | Finding | Impact | Priority |
|---|---|---|---|
| DX1 | **TypeScript strict mode**: Catches bugs early, improves autocomplete and refactoring confidence. | Positive | — |
| DX2 | **Path aliases**: `@/*` → `./src/*` simplifies imports. | Positive | — |
| DX3 | **Prettier + ESLint integration**: Consistent formatting with `prettier-plugin-tailwindcss` for class ordering. | Positive | — |
| DX4 | **Barrel exports**: `components/ui/index.ts` enables clean single-line imports. | Positive | — |
| DX5 | **No Storybook**: No component playground for isolated development and visual testing. | Negative | Medium |
| DX6 | **No hot module replacement issues**: Next.js dev server handles HMR automatically. | Positive | — |
| DX7 | **No environment variable management**: No `.env.example`, no validation of required env vars. | Negative | Medium |

---

## Priority Matrix

| Priority | Count | Items |
|---|---|---|
| **Critical** | 4 | SEC1 (no auth), SEC2 (no route protection), S2 (no state management), T1 (no tests) |
| **High** | 3 | M5 (no error boundaries), SEC3 (no CSRF), T5 (no CI/CD) |
| **Medium** | 6 | M4 (duplicate page), S3 (single types file), SEC4 (hardcoded URL), SEC5 (no CSP), DX5 (no Storybook), DX7 (no env management) |
| **Low** | 4 | M6 (docs), S4 (nav config), P6 (no virtualization), P7 (no memo) |

---

## Future Backend Integration Recommendations

### Recommended Architecture

```
src/
├── app/                    # Next.js pages (keep as-is)
├── store/                  # NEW — Redux Toolkit store
│   ├── store.ts            # configureStore() with middleware
│   ├── hooks.ts            # useAppDispatch, useAppSelector
│   ├── slices/             # Feature state slices
│   │   ├── authSlice.ts    # Auth state (tokens, user info)
│   │   ├── eventsSlice.ts  # Live events state
│   │   ├── venuesSlice.ts  # Venues state
│   │   └── uiSlice.ts     # Global UI state (modals, toasts)
│   ├── api/                # RTK Query API definitions
│   │   ├── baseApi.ts      # createApi() with base query + auth
│   │   ├── eventsApi.ts    # Event endpoints
│   │   ├── venuesApi.ts    # Venue endpoints
│   │   └── authApi.ts      # Auth endpoints
│   └── middleware/
│       └── errorMiddleware.ts  # Global error handling
├── services/               # REFACTOR — HTTP client abstraction
│   ├── apiClient.ts        # Axios/fetch wrapper with interceptors
│   ├── auth.ts             # Auth token management
│   └── config.ts           # API base URLs, timeouts
├── features/               # NEW — Feature modules (optional)
│   ├── auth/
│   ├── dashboard/
│   └── masters/
├── hooks/                  # NEW — Shared custom hooks
│   ├── useAuth.ts          # Auth state hook
│   ├── useDebounce.ts      # Input debouncing
│   └── usePagination.ts    # Pagination logic
├── components/             # Keep as-is
├── lib/                    # Keep as-is
└── types/                  # REFACTOR — Split per feature
    ├── auth.ts
    ├── events.ts
    ├── venues.ts
    └── common.ts
```

### API Integration Strategy

#### 1. HTTP Client Layer (`services/apiClient.ts`)

```typescript
// Recommended: Axios with interceptors
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach auth token
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle 401, refresh tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh or redirect to login
    }
    return Promise.reject(error);
  }
);
```

#### 2. Redux Architecture (RTK Query)

```typescript
// store/api/baseApi.ts
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Events', 'Venues', 'Pools'],
  endpoints: () => ({}),
});
```

#### 3. Request Lifecycle

```
User Action
→ Component dispatches action / calls RTK Query hook
→ RTK Query checks cache
  → Cache HIT: return cached data
  → Cache MISS:
    → API Layer sends HTTP request
    → Request interceptor adds auth token
    → Backend processes request
    → Response received
    → Response interceptor handles errors
    → RTK Query normalizes + caches data
    → Redux state updated
    → Component re-renders with new data
```

#### 4. Error Handling Strategy

| Error Type | Handler | User Experience |
|---|---|---|
| Network error | API interceptor + retry | Toast: "Connection lost. Retrying..." |
| 401 Unauthorized | Token refresh → retry or redirect | Redirect to login if refresh fails |
| 403 Forbidden | Error boundary | "You don't have permission to access this resource" |
| 404 Not Found | Component error state | Empty state with "Resource not found" |
| 422 Validation | Form field errors | Inline validation errors on form fields |
| 500 Server Error | Global error handler | Toast: "Something went wrong. Please try again." |

#### 5. Authentication Flow

```
1. User submits credentials (LoginForm)
2. POST /api/auth/login → { accessToken, refreshToken }
3. Store accessToken in Redux state (memory)
4. Store refreshToken in httpOnly cookie (secure)
5. All API requests use accessToken via interceptor
6. On 401 → attempt refresh via refreshToken
7. On refresh failure → clear state → redirect to login
8. Next.js middleware checks token on server-side route access
```

#### 6. Caching Strategy

| Data Type | Cache Duration | Invalidation |
|---|---|---|
| Live events | 30 seconds | On manual refresh, WebSocket update |
| Venues | 5 minutes | On CRUD operation |
| Master data | 10 minutes | On CRUD operation |
| User profile | 30 minutes | On profile update |
| Static config | 1 hour | On deployment |

#### 7. Scalability Considerations

- **Feature slicing**: Each feature module owns its types, components, hooks, and API definitions
- **Code splitting**: Use `next/dynamic` for heavy feature modules
- **Data normalization**: RTK Query auto-normalizes API responses
- **Optimistic updates**: RTK Query supports optimistic updates for CRUD operations
- **WebSocket integration**: RTK Query supports streaming updates for real-time data
- **Pagination**: Server-side pagination with cursor-based or offset-based strategies
- **Search debouncing**: Custom `useDebounce` hook for search inputs (300ms delay)

---

## Summary

### Technology Stack Summary
Next.js 15 (App Router) + React 19 + TypeScript 5 + TailwindCSS 3 + Lucide React — with no state management library, no testing framework, and no backend integration.

### Architecture Summary
Clean, server-first frontend with a custom UI component library, feature-based organization, and mock service layer. Strong UI foundation hampered by critical gaps in security and testing.

### Major Risks
1. **Zero authentication** — all routes publicly accessible
2. **Zero test coverage** — no automated quality gates
3. **No state management** — will be essential for backend integration
4. **Significant unimplemented surface area** — 4/7 primary nav routes and 8/9 masters sub-sections

### Top 10 Recommendations

| # | Recommendation | Priority | Effort |
|---|---|---|---|
| 1 | Implement JWT authentication with Next.js middleware | Critical | Large |
| 2 | Install Vitest + React Testing Library + Playwright | Critical | Medium |
| 3 | Install Redux Toolkit with RTK Query | Critical | Large |
| 4 | Add `error.tsx` error boundaries to all route segments | High | Small |
| 5 | Set up CI/CD pipeline (lint → type-check → test → build) | High | Medium |
| 6 | Create API client layer with interceptors and error handling | High | Medium |
| 7 | Add environment variable management (`.env.local`, `.env.example`) | Medium | Small |
| 8 | Remove/differentiate the duplicate `event-day/page.tsx` | Medium | Small |
| 9 | Split `types/index.ts` into feature-specific type files | Medium | Small |
| 10 | Add Storybook for UI component documentation | Medium | Medium |

### Generated Files Summary

| File | Description |
|---|---|
| `docs/frontend-architecture.md` | Comprehensive frontend architecture documentation |
| `docs/frontend-mermaid-diagrams.md` | 7 Mermaid diagrams (architecture, components, state, data flow, routing) |
| `docs/architecture-review.md` | Architecture scorecard + review report with prioritized findings |
| `docs/frontend-architecture.drawio.xml` | Draw.io importable architecture diagrams (current + future) |

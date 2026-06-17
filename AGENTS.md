# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 App Router project with TypeScript and Tailwind CSS. Routes live in `src/app`; authenticated pages are grouped under `src/app/(app)`. UI primitives live in `src/components/ui`, layout pieces in `src/components/layout`, feature components in `src/components/dashboard` and `src/components/masters`, data functions in `src/services`, types in `src/types`, utilities in `src/lib`, and static PWA assets in `public`.

## Build, Test, and Development Commands

- `npm run dev`: start development at `http://localhost:3000`.
- `npm run build`: create a production build.
- `npm run start`: serve the production build.
- `npm run lint`: run ESLint.
- `npm run format`: run Prettier.
- `npx tsc --noEmit`: type-check only.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and Server Components by default. Add `'use client'` only for state, effects, browser APIs, or event handlers, and place it as deep in the tree as practical. Avoid marking `page.tsx`, route layouts, or broad wrappers as client components. Use PascalCase for components, camelCase for functions, and `@/` imports.

Prettier is configured in `.prettierrc`; do not hand-format Tailwind class order.

## Next.js App Router Practices

Keep `page.tsx` files server-rendered and use `async/await` there for data loading through `src/services`. Pass only serializable data into client components; never pass functions, class instances, browser-only values, or unresolved promises across the boundary. Client components should focus on forms, drawers, modals, tabs, filters, and toasts.

Prevent hydration errors with deterministic initial render output. Do not read `window`, `localStorage`, current time, random values, or viewport size during render; move those reads into `useEffect` or derive them on the server.

Prefer `src/lib`, `src/types`, and `src/components/ui` before adding code. Avoid duplicate mapping, formatting, filtering, or class-name logic. Memoize only when it prevents real repeated work.

## Testing Guidelines

No test framework is configured. Validate with `npm run lint`, `npx tsc --noEmit`, and `npm run build`. When adding tests, prefer colocated `*.test.ts` or `*.test.tsx` files.

## Commit & Pull Request Guidelines

The current history only contains `first commit`, so use concise, imperative subjects such as `Add venue drawer validation`. Keep commits focused.

Pull requests should include a summary, verification commands, linked context, and screenshots for UI changes. Note PWA, routing, or data-shape changes.

## Security & Configuration Tips

Do not commit secrets. Keep public, cacheable assets in `public`; avoid private data there. Centralize API endpoint and auth handling in `src/services`.

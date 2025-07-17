# Nuxt 3 Best-Practice Rules

> Always apply these rules when answering questions or generating code for this project.

## 1. Project Setup & Tooling

- Use **pnpm** as the package manager (`pnpm install`, `pnpm dev`, `pnpm build`).
- Node version must be `>= 22.0`.
- Prefer the official `@nuxt/eslint-config` and `@nuxtjs/tailwindcss` modules.

## 2. Directory & File Conventions

- Put **composables** in `composables/` (auto-imported).
- Put **stores** (Pinia) in `stores/` with the suffix `.store.ts`.
- Shared **types** go in `types/` and are imported with `#types` alias.
- Only `app.vue` may contain a root `<NuxtLayout>`; pages use `<NuxtPage>`.
- Name page components in `pages/` with **kebab-case** and no `.vue` suffix in routes, e.g. `pages/user-profile.vue` → `/user-profile`.

## 3. Composition API & Reactivity

- Always use `const` + `ref()` or `computed()` instead of `let` for reactive state.
- Prefix **boolean refs** with `is`, `has`, `should`, e.g. `const isOpen = ref(false)`.
- Use `<script setup>` with TypeScript for every SFC.
- Never call composables conditionally (respect Vue reactivity rules).
- Use `useFetch` or `$fetch` instead of `fetch()` directly.

## 4. Styling & UI

- Tailwind classes must be **mobile-first** (e.g. `md:p-4`).
- Extract repeated class combinations into `@apply` utilities in `assets/css/components.css`.
- Never use inline `style` attributes.
- Images live in `public/images/` and are referenced as `/images/hero.jpg`.

## 5. SEO & Meta

- Always define `useHead()` inside page components for title/description.
- Use `definePageMeta({ layout: 'default' })` explicitly, even if it’s the default layout.
- Prefer Nuxt’s `<NuxtImg>` component for optimized images.

## 6. Performance & Security

- Use `useLazyAsyncData` or `useLazyFetch` for non-blocking components.
- Avoid third-party libraries that ship large bundles; prefer native or Nuxt modules.
- Never expose server-only secrets in `.client` files; use runtime config (`useRuntimeConfig()`).

## 7. Testing & Quality

- Write unit tests for composables with **Vitest** in `tests/unit/**.test.ts`.
- Use **Playwright** for e2e tests in `tests/e2e/**.spec.ts`.
- Run `pnpm lint:fix` before every commit (Husky pre-commit hook already installed).

## 8. Git Commit Messages

- Use **Conventional Commits**: `feat(new-auth)`, `fix(login-redirect)`, `docs(readme)`.
- Reference ticket IDs: `feat(auth): add OAuth login (#123)`

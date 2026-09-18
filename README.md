# react-native-boilerplate

Minimal Expo (SDK 57) + React Native boilerplate with file-based routing, layered data fetching, and single-file theming.

## Stack

| Concern      | Choice                                              |
| ------------ | --------------------------------------------------- |
| Framework    | Expo SDK 57, React 19.2, React Native 0.86          |
| Routing      | Expo Router (file-based, in `app/`)                 |
| Data fetching| TanStack Query v5 + axios                           |
| Styling      | react-native-unistyles v3 (light/dark themes)       |
| Language     | TypeScript (strict)                                 |
| Imports      | `@/*` alias → project root (no relative imports)    |

## Quickstart

```bash
npm install
npm run ios      # or: android, web, start
```

No flags needed — plain `npm install` / `npx expo install <pkg>` resolve strictly
(`react-dom` is pinned to match `react` so peer resolution never drifts).

## Scripts

| Command          | What it does              |
| ---------------- | ------------------------- |
| `npm run start`  | Expo dev server           |
| `npm run ios` / `android` / `web` | Run on a platform |
| `npx tsc --noEmit` | Typecheck               |
| `npx expo-doctor`  | Expo health checks      |
| `npx expo export --platform web` | Static web export |

## Project structure

```
app/                  # Routes (expo-router). ALL styled components live here*
  _layout.tsx         # Root Stack + QueryProvider + theme init
  index.tsx           # Home (theme toggle demo)
  details.tsx
  posts/index.tsx     # List + create-post mutation demo
  posts/[id].tsx      # Detail demo
hooks/                # React hooks (root-level)
  usePosts.ts / usePost.ts / useCreatePost.ts
  useAppTheme.ts      # Light/dark/system theme switcher
lib/
  api/
    client.ts         # Sole axios importer (baseURL, timeout, interceptors)
    services/         # Service layer: endpoints + DTOs, no React imports
  query/              # QueryClient, key factory, QueryProvider
theme/
  tokens.ts           # THE theme file: colors, spacing, radius, typography
  unistyles.ts        # Theme wiring + StyleSheet.configure
```

\* The Unistyles Babel plugin is configured with `root: 'app'` — keep styled
components under `app/` (e.g. `app/components/`) so styles stay reactive.

## Conventions

**Data flow (one-way imports):** `app/` → `hooks/` → `lib/api/services/` → `lib/api/client.ts`.
Screens never touch axios or services; hooks never touch axios.

**Theming:** to re-theme, edit only `theme/tokens.ts` — screens use semantic
tokens (`theme.colors.background`, `theme.spacing.md`, …), never hex values.
Import `StyleSheet` from `react-native-unistyles` only, and combine styles with
array syntax (`[styles.a, styles.b]`), never spreads. The OS color scheme applies
by default; `useAppTheme()` takes manual control (`toggle()`) or hands back
control (`resetToSystem()`).

**API config:** `lib/api/client.ts` reads `EXPO_PUBLIC_API_URL` and falls back to
JSONPlaceholder (demo API for the sample posts screens).

## Health

`npx tsc --noEmit` and `npx expo-doctor` (21/21) are the gates before pushing.

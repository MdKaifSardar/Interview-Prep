# Drill 07: Theme Context with Persistence (Q23, Q68)

## Problem Statement
The React Context API prevents prop drilling by propagating state across the component tree. Synchronizing with `localStorage` preserves user preferences across page reloads.

## Task
Implement `ThemeProvider` and `useTheme()` in `starter.jsx`.
- `theme`: defaults to value from `localStorage.getItem('app-theme')` or `'light'`.
- `toggleTheme()`: switches between `'light'` and `'dark'` and saves to `localStorage.setItem('app-theme', ...)`.
- Export a test consumer component `<ThemeToggle />` with button (`data-testid="toggle-btn"`) and display (`<span data-testid="current-theme">`).

## Hint
Master Answer Reference: [03-core-hooks-deep-dive.md](../../answers/03-core-hooks-deep-dive.md#23-what-is-usecontext-how-does-context-api-propagate-state-and-what-is-its-primary-re-rendering-performance-drawback)

# Drill 13: Data Fetching with AbortController (Q39, Q43)

## Problem Statement
When component unmounts or query parameters change while a network request is in-flight, unhandled fetches trigger state updates on unmounted components and race conditions. An `AbortController` cancels in-flight fetches cleanly.

## Task
Implement `useFetch(url)` in `starter.jsx`.
- Returns `{ data, loading, error }`.
- Creates an `AbortController` and passes its `signal` to `fetch(url, { signal })`.
- On cleanup: Calls `controller.abort()`.
- Ignores abort errors (`err.name === 'AbortError'`).

## Hint
Master Answer Reference: [06-client-state-management-and-data-fetching.md](../../answers/06-client-state-management-and-data-fetching.md#39-how-do-you-handle-race-conditions-during-api-data-fetching-in-react-using-abortcontroller)

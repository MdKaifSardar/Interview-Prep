# React & Next.js Technical Interview Hands-On Lab

An ultra-lean, zero-bloat, 100% local coding workspace for React hooks, performance optimization, and scenario drills.

---

## Quick Start

```bash
# 1. Navigate to lab
cd "e:\CSE\interview prep\react\lab"

# 2. View all available drills
node runner.js list

# 3. Practice a specific drill (e.g. Drill 05 or 09)
node runner.js 05
node runner.js debounce

# 4. Or validate all drills simultaneously
npm test
# or
node runner.js all
```

---

## How It Works

1. **Pick a Drill:** Choose from `src/exercises/` below.
2. **Open `starter.jsx`:** Implement your solution following the problem statement in `README.md`.
3. **Run the Test:** Run `node runner.js <drill_number>` to validate your code in Vitest.
4. **Compare with Solution:** Reference `solution.jsx` or the [master answer key](../../react-interview-answers.md).

---

## Drill Catalog (20 High-Yield Coding Drills)

| # | Folder | Target Questions | Skills Tested |
| :-: | :--- | :--- | :--- |
| **01** | [`01_functional_state_updates`](./src/exercises/01_functional_state_updates/) | Q10, Q11 | Functional State Updates (`setCount(prev => prev + 1)`) & Batching |
| **02** | [`02_derived_state_elimination`](./src/exercises/02_derived_state_elimination/) | Q14 | Eliminating redundant `useState` / `useEffect` derived state anti-patterns |
| **03** | [`03_controlled_vs_uncontrolled`](./src/exercises/03_controlled_vs_uncontrolled/) | Q15 | Controlled inputs with state vs Uncontrolled inputs with `useRef` |
| **04** | [`04_effect_cleanup_leak`](./src/exercises/04_effect_cleanup_leak/) | Q18, Q19 | Effect subscription cleanup & memory leak prevention on unmount |
| **05** | [`05_stale_closure_fix`](./src/exercises/05_stale_closure_fix/) | Q20 | Fixing the Stale Closure bug in `setInterval` / `useEffect` |
| **06** | [`06_use_ref_timer_prev`](./src/exercises/06_use_ref_timer_prev/) | Q21, Q22 | Mutable `useRef` stopwatch interval & custom `usePrevious` hook |
| **07** | [`07_theme_context`](./src/exercises/07_theme_context/) | Q23, Q68 | Theme Context Provider (`light`/`dark`) with `localStorage` persistence |
| **08** | [`08_use_memo_callback`](./src/exercises/08_use_memo_callback/) | Q25, Q26 | `useMemo` & `useCallback` referential equality with `React.memo` |
| **09** | [`09_use_debounce`](./src/exercises/09_use_debounce/) | Q28, Q62 | Custom Hook: `useDebounce(value, delay)` with timer cleanup |
| **10** | [`10_use_local_storage`](./src/exercises/10_use_local_storage/) | Q28, Q63 | Custom Hook: `useLocalStorage(key, initialValue)` with serialization |
| **11** | [`11_key_index_anti_pattern`](./src/exercises/11_key_index_anti_pattern/) | Q32, Q33 | Fixing list item state corruption caused by `key={index}` |
| **12** | [`12_composition_vs_memo`](./src/exercises/12_composition_vs_memo/) | Q34 | Component Composition (`children` prop) vs `React.memo` optimization |
| **13** | [`13_use_fetch_abort`](./src/exercises/13_use_fetch_abort/) | Q39, Q43 | Custom Hook: `useFetch(url)` with `AbortController` cancellation |
| **14** | [`14_protected_route`](./src/exercises/14_protected_route/) | Q47 | Client-side `<ProtectedRoute>` auth guard component |
| **15** | [`15_api_timeout_retry`](./src/exercises/15_api_timeout_retry/) | Q49 | Frontend `fetchWithRetry` with timeout abort and exponential backoff |
| **16** | [`16_dynamic_form_validation`](./src/exercises/16_dynamic_form_validation/) | Q50, Q65 | Zero-dependency form validation with field errors & submit guards |
| **17** | [`17_autocomplete_typeahead`](./src/exercises/17_autocomplete_typeahead/) | Q64 | Accessible dynamic Search Autocomplete / Typeahead dropdown |
| **18** | [`18_modal_portal`](./src/exercises/18_modal_portal/) | Q66 | Accessible Modal Dialog using `createPortal` with backdrop and ESC key |
| **19** | [`19_infinite_scroll_list`](./src/exercises/19_infinite_scroll_list/) | Q67 | Infinite scroll data list using `IntersectionObserver` sentinel |
| **20** | [`20_imperative_handle_ref`](./src/exercises/20_imperative_handle_ref/) | Q74 | Exposing imperative methods with `forwardRef` + `useImperativeHandle` |

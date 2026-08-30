# React & Next.js Full-Stack Master List (75 Questions)
**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup ROI) · 🟠 P1 Important · 🟡 P2 Depth / Skim

**Type** — [C] Conceptual · [Q] Code/Hook Mechanic · [D] Architecture/Design · [P] Performance/Optimization

---

## 1. Core Fundamentals & JSX Architecture

1. 🔴 P0 [C] What is React, and what makes it a declarative, component-based library rather than an imperative framework?
2. 🔴 P0 [C] What is JSX? How does JSX get transpiled into plain JavaScript (`React.createElement` / JSX Transform)?
3. 🔴 P0 [C] What is the Virtual DOM? How does React's Reconciliation and Diffing algorithm work?
4. 🔴 P0 [C] What is One-Way Data Flow (Unidirectional Data Flow) in React, and why does it make state predictable?
5. 🟠 P1 [C] What is the difference between Functional Components and Class Components? Why are Functional Components standard today?
6. 🟠 P1 [C] How does React handle events (`SyntheticEvent`)? How does it differ from native DOM event handling?
7. 🟠 P1 [C] Component Composition vs Inheritance: Why does React favor Composition over Class Inheritance?

## 2. Functional Components, Props & State Modeling

8. 🔴 P0 [C] What are Props in React? Why must Props be strictly immutable?
9. 🔴 P0 [C] What is State in React? How does State differ from Props?
10. 🔴 P0 [Q] Why must State be treated as immutable? Why should you never mutate state directly (`state.count = 5`)?
11. 🔴 P0 [Q] What is the functional state updater syntax (`setCount(prev => prev + 1)`), and when MUST you use it?
12. 🔴 P0 [D] What is "Lifting State Up" in React, and when should you apply it?
13. 🔴 P0 [D] What is Prop Drilling, and what are the best techniques to prevent it?
14. 🔴 P0 [D] What is Derived State, and why is copying props into state an anti-pattern?
15. 🟠 P1 [Q] Controlled vs Uncontrolled Components: What is the difference, and when would you use an Uncontrolled Component?

## 3. Core Hooks Deep-Dive (`useState`, `useEffect`, `useRef`, `useContext`)

16. 🔴 P0 [C] What are React Hooks? What are the **Two Fundamental Rules of Hooks**, and why do they exist?
17. 🔴 P0 [Q] How does `useState` batch state updates? Why is state updating queued/asynchronous?
18. 🔴 P0 [Q] How does `useEffect` work? Explain its 3 dependency array behaviors (`no array`, `[]`, `[dep]`).
19. 🔴 P0 [Q] What is the Cleanup Function in `useEffect`? When does it run, and why is it essential for preventing memory leaks?
20. 🔴 P0 [Q] What is the **Stale Closure** problem in `useEffect` or callbacks, and how do you fix it?
21. 🔴 P0 [Q] What is `useRef`? How does `useRef` differ from `useState`, and why does modifying `ref.current` **NOT** trigger a re-render?
22. 🔴 P0 [Q] What are common real-world use cases for `useRef` (DOM manipulation, storing timer IDs, previous state)?
23. 🔴 P0 [Q] What is `useContext`? How does Context API propagate state, and what is its primary re-rendering performance drawback?
24. 🟠 P1 [Q] How do you replace class component lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) with `useEffect`?

## 4. Advanced Hooks & Memoization (`useMemo`, `useCallback`, Custom Hooks)

25. 🔴 P0 [P] What is `useMemo`? What problem does it solve, and when should you use it?
26. 🔴 P0 [P] What is `useCallback`? How does `useCallback` differ from `useMemo`?
27. 🔴 P0 [P] When should you **NOT** use `useMemo` or `useCallback`? (Overhead of premature optimization).
28. 🔴 P0 [D] What is a Custom Hook? How do you extract reusable stateful logic into a custom hook (`useFetch`, `useDebounce`, `useLocalStorage`)?
29. 🟠 P1 [Q] What is `useLayoutEffect`? How does it differ from `useEffect` regarding browser paint and DOM measurement?

## 5. Re-rendering, Keys & Performance Optimization

30. 🔴 P0 [C] What causes a React component to re-render, and what does/doesn't trigger a re-render?
31. 🔴 P0 [P] What is `React.memo` (Higher-Order Component)? How does shallow prop comparison work?
32. 🔴 P0 [P] Why are `keys` mandatory when rendering lists in React? What happens internally during Reconciliation if you omit keys?
33. 🔴 P0 [P] Why is using array index as a `key` (`key={index}`) an anti-pattern for dynamic lists? Show a scenario where it causes UI bugs.
34. 🔴 P0 [P] How can Component Composition (passing `children`) prevent parent re-renders from cascading down without using `React.memo`?
35. 🔴 P0 [P] What is Code Splitting in React? How do `React.lazy()` and `Suspense` reduce initial JavaScript bundle size?
36. 🟠 P1 [P] What is Virtualization / Windowing (e.g. `react-window`), and how does it render lists of 100,000 items efficiently?

## 6. Client State Management & Data Fetching Basics

37. 🔴 P0 [D] Local State vs Context API vs External Store (Zustand / Redux Toolkit): How do you decide where state should live?
38. 🔴 P0 [D] Why is fetching data inside raw `useEffect` considered an anti-pattern in modern React? (Race conditions, missing cleanup, network waterfalls).
39. 🔴 P0 [Q] How do you handle race conditions during API data fetching in React using `AbortController`?
40. 🔴 P0 [D] What is Server State vs Client State? Why are dedicated data-fetching libraries (TanStack Query / SWR) preferred over Redux for API data?
41. 🟠 P1 [D] How does Redux Toolkit (RTK) simplify state management over legacy Redux (slices, `createAsyncThunk`)?
42. 🟠 P1 [D] What is Zustand, and why is it popular as a lightweight alternative to Redux and Context API?

## 7. Full-Stack React + Backend Integration & Authentication

43. 🔴 P0 [Q] How do you handle loading, success, and error states when fetching REST API data in React?
44. 🔴 P0 [D] What is CORS (Cross-Origin Resource Sharing), why does it happen when React calls a Node/Express backend, and how do you resolve it?
45. 🔴 P0 [D] How does Authentication work in a Full-Stack React application? Explain the JWT access token + refresh token flow.
46. 🔴 P0 [D] Storage Security Debate: `HttpOnly Cookies` vs `localStorage` for JWT tokens—which should you use and why?
47. 🔴 P0 [Q] How do you build a `<ProtectedRoute>` component in React to restrict access to authenticated users?
48. 🔴 P0 [D] How do you persist authentication state across page refreshes and implement a clean logout mechanism in React?
49. 🔴 P0 [Q] How do you handle API request timeouts and global network error handling in React?
50. 🟠 P1 [Q] How do you handle form submission from React to a backend API with field validation and error responses?

## 8. Next.js Architecture & Server Rendering

51. 🔴 P0 [C] Why use Next.js instead of a plain React Single Page Application (SPA)? What problems does Next.js solve (SEO, Initial Load, Full-Stack Routing)?
52. 🔴 P0 [C] What are the rendering strategies in Next.js? Compare SSR (Server-Side Rendering), SSG (Static Site Generation), ISR (Incremental Static Regeneration), and CSR (Client-Side Rendering).
53. 🔴 P0 [C] What are React Server Components (RSC)? How do Server Components differ from Client Components (`"use client"`) in Next.js?
54. 🔴 P0 [D] Where should you place the `"use client"` boundary in a Next.js application, and why should you push client components to the leaf nodes of your component tree?
55. 🔴 P0 [D] App Router vs Pages Router in Next.js: What are the main directory structure and architectural differences (`layout.tsx`, `page.tsx`, `loading.tsx`)?
56. 🔴 P0 [Q] How do Server Actions (`"use server"`) work in Next.js, and how do they replace traditional API route handlers for form mutations?
57. 🔴 P0 [Q] What are Route Handlers (`app/api/route.ts`) in Next.js, and how do you build custom REST API endpoints inside Next.js?
58. 🔴 P0 [D] How does Next.js Middleware (`middleware.ts`) work, and how do you use it for server-side auth redirects and request filtering?
59. 🔴 P0 [P] How does Data Caching and Revalidation work in Next.js (`revalidatePath`, `revalidateTag`, time-based revalidation)?
60. 🔴 P0 [Q] What causes a Hydration Mismatch Error in Next.js (e.g. `new Date()`, `window`), and how do you fix it?
61. 🟠 P1 [P] How do `next/image` and `next/font` optimize images and fonts to improve Google Core Web Vitals (LCP, CLS)?

## 9. Practical Coding Exercises & Scenario Drills

62. 🔴 P0 [Q] Build a custom `useDebounce(value, delay)` hook in React.
63. 🔴 P0 [Q] Build a custom `useLocalStorage(key, initialValue)` hook.
64. 🔴 P0 [Q] Build an accessible, dynamic Search Autocomplete / Typeahead component with API debouncing and keyboard navigation.
65. 🔴 P0 [Q] Build a dynamic Form with validation, field arrays, and submit state without third-party libraries.
66. 🔴 P0 [Q] Build a modal dialog component using React Portals (`createPortal`) that closes on ESC key or backdrop click.
67. 🔴 P0 [Q] Implement a paginated / infinite scroll data list component using `IntersectionObserver` or scroll events.
68. 🔴 P0 [Q] Implement a Theme Provider using Context API with `light` / `dark` modes persisted to localStorage.

## 10. Skim-Level Advanced Topics & Edge Cases

69. 🟠 P1 [C] What is Automatic Batching in React 18, and how does it group state updates inside promises and timeouts?
70. 🟠 P1 [C] What is an Error Boundary in React? Why must Error Boundaries currently be written using Class Components (`componentDidCatch`)?
71. 🟠 P1 [C] How does React prevent Cross-Site Scripting (XSS) attacks by default, and when can `dangerouslySetInnerHTML` expose vulnerabilities?
72. 🟡 P2 [C] What is React Fiber (conceptual overview)? How does Fiber enable interruptible, prioritized rendering work units?
73. 🟡 P2 [Q] What are `useTransition` and `useDeferredValue` in React 18, and when would you use them for non-urgent UI updates?
74. 🟡 P2 [Q] What are `forwardRef` and `useImperativeHandle`? How do you expose child component methods to a parent?
75. 🟡 P2 [D] What is Micro-Frontend Architecture (Module Federation), and when should an enterprise adopt it over a monolithic React app?

---

## Revision Modes

- **Full-Stack Startup Core (Highest ROI):** all 🔴 P0 questions (Sections 1–9)
- **Full React + Next.js Coverage:** 🔴 P0 + 🟠 P1
- **Deep Technical / Senior Skim:** 🔴 P0 + 🟠 P1 + 🟡 P2

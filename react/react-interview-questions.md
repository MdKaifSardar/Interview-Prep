# React Interview Master List (75 Questions)
**Track:** Fresher → 0–1 YOE → Junior Full Stack / Frontend / Startup

## Legend

**Priority** — 🔴 P0 Essential (don't skip) · 🟠 P1 Important · 🟡 P2 Depth (stronger/deeper interviews)

**Type** — [C] Conceptual · [Q] Code/Hook Mechanic · [D] Architecture/Design · [P] Performance/Optimization

---

## 1. Core Fundamentals & JSX Architecture

1. 🔴 P0 [C] What is React, and what makes it a declarative, component-based library rather than an imperative framework?
2. 🔴 P0 [C] What is JSX? How does JSX get transpiled into plain JavaScript (`React.createElement` / JSX Transform)?
3. 🔴 P0 [C] What is the Virtual DOM? How does React's Reconciliation and Diffing algorithm work?
4. 🔴 P0 [C] What is React Fiber, and how did it improve rendering performance over the legacy stack reconciler?
5. 🔴 P0 [C] What is One-Way Data Flow (Unidirectional Data Flow) in React, and why does it make state predictable?
6. 🟠 P1 [C] What is the difference between Functional Components and Class Components? Why are Functional Components standard today?
7. 🟠 P1 [C] How does React handle events (`SyntheticEvent`)? How does it differ from native DOM event handling?
8. 🟠 P1 [C] Component Composition vs Inheritance: Why does React favor Composition over Class Inheritance?

## 2. Functional Components, Props & State Modeling

9. 🔴 P0 [C] What are Props in React? Why must Props be strictly immutable?
10. 🔴 P0 [C] What is State in React? How does State differ from Props?
11. 🔴 P0 [Q] Why must State be treated as immutable? Why should you never mutate state directly (`state.count = 5`)?
12. 🔴 P0 [Q] What is the functional state updater syntax (`setCount(prev => prev + 1)`), and when MUST you use it instead of passing a value?
13. 🔴 P0 [D] What is "Lifting State Up" in React, and when should you apply it?
14. 🔴 P0 [D] What is Prop Drilling, and what are the best techniques to prevent it?
15. 🔴 P0 [D] What is Derived State, and why is copying props into state an anti-pattern?
16. 🟠 P1 [Q] Controlled vs Uncontrolled Components: What is the difference, and when would you use an Uncontrolled Component?
17. 🟠 P1 [D] How should form state be handled in React (Controlled Inputs vs FormData / Uncontrolled)?

## 3. Core Hooks Deep-Dive (`useState`, `useEffect`, `useRef`, `useContext`)

18. 🔴 P0 [C] What are React Hooks? What are the **Two Fundamental Rules of Hooks**, and why do they exist?
19. 🔴 P0 [Q] How does `useState` batch state updates? Why is state updating asynchronous / queued?
20. 🔴 P0 [Q] How does `useEffect` work? Explain its 3 dependency array behaviors (`no array`, `[]`, `[dep]`).
21. 🔴 P0 [Q] What is the Cleanup Function in `useEffect`? When does it run, and why is it essential for preventing memory leaks?
22. 🔴 P0 [Q] What is the **Stale Closure** problem in `useEffect` or callbacks, and how do you fix it?
23. 🔴 P0 [Q] What is `useRef`? How does `useRef` differ from `useState`, and why does modifying `ref.current` **NOT** trigger a re-render?
24. 🔴 P0 [Q] What are the common real-world use cases for `useRef` (DOM manipulation, storing timer IDs, previous state)?
25. 🔴 P0 [Q] What is `useContext`? How does Context API propagate state, and what is its primary re-rendering performance drawback?
26. 🟠 P1 [Q] How do you replace class component lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) with `useEffect`?

## 4. Advanced & Performance Hooks (`useMemo`, `useCallback`, `useLayoutEffect`, Custom Hooks)

27. 🔴 P0 [P] What is `useMemo`? What problem does it solve, and when should you use it?
28. 🔴 P0 [P] What is `useCallback`? How does `useCallback` differ from `useMemo`?
29. 🔴 P0 [P] When should you **NOT** use `useMemo` or `useCallback`? (Overhead of premature optimization).
30. 🔴 P0 [D] What is a Custom Hook? How do you extract reusable stateful logic into a custom hook (e.g. `useFetch`, `useDebounce`, `useLocalStorage`)?
31. 🟠 P1 [Q] What is `useLayoutEffect`? How does it differ from `useEffect` regarding browser paint and DOM measurement?
32. 🟠 P1 [Q] What is `forwardRef` and `useImperativeHandle`? How do you expose child component methods to a parent?
33. 🟡 P2 [Q] What is `useId` in React 18, and why is it useful for SSR accessibility attributes?

## 5. Re-rendering, Reconciliation & Performance Optimization

34. 🔴 P0 [C] What exact 4 triggers cause a React component to re-render?
35. 🔴 P0 [P] What is `React.memo` (Higher-Order Component)? How does shallow prop comparison work?
36. 🔴 P0 [P] Why are `keys` mandatory when rendering lists in React? What happens internally during Reconciliation if you omit keys?
37. 🔴 P0 [P] Why is using array index as a `key` (`key={index}`) an anti-pattern for dynamic lists? Show a scenario where it causes UI bugs.
38. 🔴 P0 [P] How can Component Composition (passing `children` or render props) prevent parent re-renders from cascading down without using `React.memo`?
39. 🔴 P0 [P] What is Code Splitting in React? How do `React.lazy()` and `Suspense` reduce initial JavaScript bundle size?
40. 🟠 P1 [P] What is Virtualization / Windowing (e.g. `react-window`), and how does it render lists of 100,000 items efficiently?
41. 🟠 P1 [P] What are High-Order Components (HOCs) vs Render Props? Why have Hooks largely replaced both patterns?

## 6. State Management & Data Fetching Architecture

42. 🔴 P0 [D] Local State vs Context API vs External Store (Zustand / Redux Toolkit): How do you decide where state should live?
43. 🔴 P0 [D] Why is fetching data inside raw `useEffect` considered an anti-pattern in modern React? (Race conditions, missing cleanup, network waterfalls).
44. 🔴 P0 [Q] How do you handle race conditions during API data fetching in React using `AbortController`?
45. 🔴 P0 [D] What is Server State vs Client State? Why are dedicated data-fetching libraries (TanStack Query / SWR) preferred over Redux for API data?
46. 🟠 P1 [D] How does Redux Toolkit (RTK) simplify state management over legacy Redux (slices, `createAsyncThunk`)?
47. 🟠 P1 [D] What is Zustand, and why is it popular as a lightweight alternative to Redux and Context API?

## 7. React 18 & Concurrent Features

48. 🔴 P0 [C] What is Automatic Batching in React 18, and how does it differ from React 17 batching inside promises and timeouts?
49. 🔴 P0 [C] What is Concurrent Rendering in React 18? How does non-blocking UI rendering work?
50. 🔴 P0 [Q] What is `useTransition`? How do you separate urgent UI updates (input typing) from non-urgent transitions (large list filtering)?
51. 🔴 P0 [Q] What is `useDeferredValue`? How does `useDeferredValue` differ from `useDebounce`?
52. 🔴 P0 [C] Why does React 18 `StrictMode` run `useEffect` twice in development mode, and what is it testing?
53. 🟠 P1 [C] What is Hydration in React SSR (Server-Side Rendering), and what causes a Hydration Mismatch Error?

## 8. React 19, Server Components & Modern Ecosystem

54. 🔴 P0 [C] What are React Server Components (RSC)? How do Server Components differ from traditional Client Components (`"use client"`)?
55. 🔴 P0 [C] What are the benefits of Server Components (Zero bundle size, direct DB access, server-side data fetching)?
56. 🔴 P0 [Q] What are React 19 Actions? How do `useActionState` and `useFormStatus` simplify form handling?
57. 🔴 P0 [Q] What is `useOptimistic` in React 19, and how does it implement instant optimistic UI updates before server response?
58. 🔴 P0 [C] What is an Error Boundary in React? Why must Error Boundaries currently be written using Class Components (`componentDidCatch`)?
59. 🔴 P0 [C] How does React prevent Cross-Site Scripting (XSS) attacks by default, and when can `dangerouslySetInnerHTML` expose vulnerabilities?
60. 🟠 P1 [D] How do you test React components effectively (React Testing Library philosophy: testing behavior over implementation details)?

## 9. Practical Coding Exercises & Scenario Drills

61. 🔴 P0 [Q] Build a custom `useDebounce(value, delay)` hook in React.
62. 🔴 P0 [Q] Build a custom `useLocalStorage(key, initialValue)` hook.
63. 🔴 P0 [Q] Build an accessible, dynamic Search Autocomplete / Typeahead component with API debouncing and keyboard navigation.
64. 🔴 P0 [Q] Build a dynamic Form with validation, field arrays, and submit state without third-party libraries.
65. 🔴 P0 [Q] Build a modal dialog component using React Portals (`createPortal`) that closes on ESC key or backdrop click.
66. 🔴 P0 [Q] Implement a paginated / infinite scroll data list component using `IntersectionObserver` or scroll events.
67. 🔴 P0 [Q] Implement a Theme Provider using Context API with `light` / `dark` modes persisted to localStorage.
68. 🟠 P1 [Q] Build a Star Rating component that supports hover states and click selection.
69. 🟠 P1 [Q] Build a collapsible Accordion / Tree View component supporting multi-level nested items.
70. 🟠 P1 [Q] Build an Image Carousel / Slider component with auto-play, next/prev controls, and dot navigation.

## 10. System Design & Micro-Frontend Architecture

71. 🔴 P0 [D] How would you architect a large enterprise React application (Folder structure: Feature-based vs Layer-based)?
72. 🔴 P0 [D] How do you handle Global Error Handling, Fallback UIs, and Telemetry/Logging in a production React application?
73. 🟠 P1 [D] What is Micro-Frontend Architecture (Module Federation), and when should an enterprise adopt it over a monolithic React app?
74. 🟠 P1 [D] How do you manage Design Systems and UI Component Libraries (Tailwind CSS, Radix UI, Shadcn UI, Storybook) in modern React teams?
75. 🟠 P1 [D] Single Page Applications (SPA) vs Server-Side Rendering (SSR / Next.js) vs Static Site Generation (SSG): When to pick which?

---

## Revision Modes

- **Easy / basic fresher interview:** all 🔴 P0 questions
- **Normal full-stack / frontend interview:** 🔴 P0 + 🟠 P1
- **Strong startup / deep technical round:** 🔴 P0 + 🟠 P1 + 🟡 P2
- **Fundamental revision:** for every [C] question, explain the mental model in your own words
- **Hook revision:** for every [Q] question, understand dependency array and closure rules
- **Performance revision:** for [P] questions, trace trigger -> render -> diffing -> commit -> browser paint

# React & Next.js Full-Stack Master Answer Key (Comprehensive Edition)

Companion answer key to `react-interview-questions.md`. Every answer follows a standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive breakdown of *why* and *how* the underlying mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working code snippet, Next.js App Router pattern, ASCII flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Real-world edge cases, security risks, stale closure bugs, and interviewer follow-ups.

---

## 1. Core Fundamentals & JSX Architecture

### 1. 🔴 P0 [C] What is React, and what makes it a declarative, component-based library rather than an imperative framework?

> **TL;DR:** React is a UI library that uses a **declarative programming model** (you describe *what* the UI should look like for a given state) and **component composition** (building complex UIs from isolated, reusable units), leaving raw DOM manipulations to React's internal reconciler.

#### 💡 Core Concept & Explanation
In **Imperative** JavaScript (vanilla JS / jQuery), you manually select DOM elements and issue step-by-step modification commands (`document.getElementById().appendChild()`). This creates fragile, unmaintainable code as UI complexity grows. In **Declarative** React, you define components as pure functions of `(props, state) => UI`. When state updates, React automatically recalculates the Virtual DOM diff and updates the real browser DOM efficiently.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// IMPERATIVE (Vanilla JS): Manually step-by-step
const btn = document.createElement('button');
btn.innerText = 'Count: 0';
let count = 0;
btn.onclick = () => { count++; btn.innerText = `Count: ${count}`; };

// DECLARATIVE (React): Describe UI as a function of State
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
React is a **library** (focused strictly on the View layer of MVC), not a full framework like Angular or Ember. It gives developers freedom to choose routing, state management, and build tools.

---

### 2. 🔴 P0 [C] What is JSX? How does JSX get transpiled into plain JavaScript (`React.createElement` / JSX Transform)?

> **TL;DR:** JSX (JavaScript XML) is a syntax extension for JavaScript that lets you write HTML-like markup inside JS code. Browsers cannot read JSX directly; build tools (Babel/SWC) transpile JSX tags into `React.createElement()` calls or the modern `jsx()` runtime.

#### 💡 Core Concept & Explanation
JSX provides visual structure while giving you the full power of JavaScript inside curly braces `{}`. During compilation, every JSX element is transformed into JavaScript function calls that produce plain Virtual DOM JavaScript objects.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// 1. JSX written by developer:
const element = <h1 className="title">Hello {name}!</h1>;

// 2. Transpiled JavaScript (Legacy Babel Transform):
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello ',
  name,
  '!'
);

// 3. Output Virtual DOM JavaScript Object:
{
  type: 'h1',
  props: { className: 'title', children: ['Hello ', 'Asha', '!'] }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Since React 17's **New JSX Transform**, you no longer need to write `import React from 'react'` at the top of every file just to use JSX! The compiler automatically imports functions from `react/jsx-runtime`.

---

### 3. 🔴 P0 [C] What is the Virtual DOM? How does React's Reconciliation and Diffing algorithm work?

> **TL;DR:** The Virtual DOM (VDOM) is a lightweight in-memory JavaScript representation of the real DOM. When state changes, React creates a new VDOM tree, runs a fast **Diffing algorithm** ($O(N)$) against the previous VDOM tree, and updates *only* the changed nodes in the real browser DOM (Reconciliation).

#### 💡 Core Concept & Explanation
Direct browser DOM manipulation is slow because it triggers browser layout recalculations and repaints. React minimizes real DOM touches:
1. **Render Phase:** State updates $\rightarrow$ Component function re-runs $\rightarrow$ New Virtual DOM tree generated in memory.
2. **Diffing Phase:** React compares the new VDOM with the old VDOM using two heuristics:
   - Elements of different types produce entirely different trees (unmounts old, mounts new).
   - Lists use `key` props to match child elements across renders.
3. **Commit Phase:** React applies the calculated minimal diff set to the physical browser DOM.

#### 🛠️ Code / Visual Diagram / Table

```
[ State Update ] ──> [ New Virtual DOM Tree ]
                             │
                     (Diffing Algorithm O(N))
                             │
                             ▼
                    [ Calculated Delta/Diff ] ──> [ Commit to Real Browser DOM ]
```

---

### 4. 🔴 P0 [C] What is One-Way Data Flow (Unidirectional Data Flow) in React, and why does it make state predictable?

> **TL;DR:** One-way data flow means data flows in a single top-down direction: **Parent $\rightarrow$ Child via Props**. Children cannot directly modify parent state; they must emit events via callback functions passed as props.

#### 💡 Core Concept & Explanation
In two-way data binding (like legacy AngularJS), child inputs can implicitly mutate parent state, creating unpredictable cascade updates that are difficult to trace and debug. React's top-down flow ensures that state lives in a single source of truth and flows down as immutable props, making data updates explicit and predictable.

---

### 5. 🟠 P1 [C] Functional Components vs Class Components?

> **TL;DR:** Functional Components are plain JS functions using Hooks. Class Components extend `React.Component` and rely on `this` and lifecycle methods. Functional components paired with Hooks are standard due to cleaner code, no `this` bugs, and easy logic sharing.

---

### 6. 🟠 P1 [C] How does React handle events (`SyntheticEvent`)?

> **TL;DR:** React wraps native browser events in a cross-browser `SyntheticEvent` wrapper to ensure identical event API behavior across all browsers. React uses **Event Delegation**, attaching a single event listener at the root container level (`#root`).

---

### 7. 🟠 P1 [C] Component Composition vs Inheritance?

> **TL;DR:** React favors **Composition** (combining smaller components using `children` props or render props) over Class Inheritance (`extends`), avoiding rigid OOP hierarchies.

---

## 2. Functional Components, Props & State Modeling

### 8. 🔴 P0 [C] What are Props in React? Why must Props be strictly immutable?

> **TL;DR:** Props (properties) are read-only inputs passed from a parent component to a child component. Props must be strictly immutable to ensure pure component rendering, predictable data flow, and reliable shallow prop comparison (`React.memo`).

---

### 9. 🔴 P0 [C] What is State in React? How does State differ from Props?

> **TL;DR:** **State** is internal, mutable data owned and managed directly within a component that triggers re-renders when updated. **Props** are immutable data passed into a component from its parent.

---

### 10. 🔴 P0 [Q] Why must State be treated as immutable? Why should you never mutate state directly (`state.count = 5`)?

> **TL;DR:** Direct state mutation (`state.count = 5`) does **not** trigger a re-render because React checks state changes using shallow reference equality (`Object.is`). Mutating an object in-place preserves its reference, causing React to assume nothing changed!

#### 🛠️ Code / Visual Diagram / Table

```jsx
const [user, setUser] = useState({ name: 'Asha', age: 24 });

// INCORRECT (Direct Mutation - UI WILL NOT RE-RENDER!):
user.age = 25;
setUser(user); // Object reference is identical!

// CORRECT (Immutable Update - Spreads new object copy):
setUser(prevUser => ({ ...prevUser, age: 25 })); // New object reference!
```

---

### 11. 🔴 P0 [Q] What is the functional state updater syntax (`setCount(prev => prev + 1)`), and when MUST you use it?

> **TL;DR:** The functional updater syntax passes a callback function `setCount(prev => prev + 1)` to the state setter. You **MUST** use it whenever the next state depends on the previous state to avoid reading stale closure state values during batched updates.

---

### 12. 🔴 P0 [D] What is "Lifting State Up" in React, and when should you apply it?

> **TL;DR:** "Lifting State Up" is moving state to the **closest common ancestor** component when two or more sibling components need to reflect or share the same changing data.

---

### 13. 🔴 P0 [D] What is Prop Drilling, and what are the best techniques to prevent it?

> **TL;DR:** Prop Drilling is passing props through multiple levels of intermediate components that do not need the data themselves. Prevent it using **Component Composition (passing `children`)**, **Context API**, or **Zustand/Redux**.

---

### 14. 🔴 P0 [D] What is Derived State, and why is copying props into state an anti-pattern?

> **TL;DR:** Derived State is data that can be calculated dynamically during rendering from existing props or state. Copying props into `useState` (`const [email, setEmail] = useState(props.email)`) creates duplicated state that gets out of sync when props update.

---

### 15. 🟠 P1 [Q] Controlled vs Uncontrolled Components: What is the difference?

> **TL;DR:** **Controlled Components** let React drive input values via `useState` and `onChange` handlers (single source of truth). **Uncontrolled Components** let the DOM maintain input state internally, accessed via `useRef`.

---

## 3. Core Hooks Deep-Dive (`useState`, `useEffect`, `useRef`, `useContext`)

### 16. 🔴 P0 [C] What are React Hooks? What are the Two Fundamental Rules of Hooks?

> **TL;DR:** Hooks are special functions (`use...`) that let functional components use state and lifecycle features. 
> 1. **Call Hooks ONLY at the Top Level:** Never call Hooks inside loops, conditions, or nested functions.
> 2. **Call Hooks ONLY from React Functions:** Only call Hooks from React Functional Components or Custom Hooks.

---

### 17. 🔴 P0 [Q] How does `useState` batch state updates?

> **TL;DR:** React **batches** multiple state updates triggered within the same event handler into a single re-render cycle to prevent redundant DOM updates and maximize UI performance.

---

### 18. 🔴 P0 [Q] How does `useEffect` work? Explain its 3 dependency array behaviors.

> **TL;DR:** `useEffect` runs side effects after rendering. `no array`: runs after EVERY render. `[]`: runs ONCE on initial mount. `[a, b]`: runs on mount AND when `a` or `b` reference changes.

---

### 19. 🔴 P0 [Q] What is the Cleanup Function in `useEffect`? When does it run?

> **TL;DR:** The cleanup function is returned from `useEffect` (`return () => { ... }`). It runs **before unmounting** AND **before re-running the effect** on subsequent dependency updates, preventing memory leaks (clearing timers, unsubscribing events).

---

### 20. 🔴 P0 [Q] What is the Stale Closure problem in `useEffect` or callbacks, and how do you fix it?

> **TL;DR:** A Stale Closure occurs when an effect captures state variables inside its closure scope at creation time, but the dependency array omits the variable, causing the closure to read old state values indefinitely. Fix by adding dependencies or using functional updater functions `setCount(c => c + 1)`.

---

### 21. 🔴 P0 [Q] What is `useRef`? How does it differ from `useState`?

> **TL;DR:** `useRef` returns a mutable object `{ current: value }` that persists across renders. Changing `ref.current` **does NOT trigger a component re-render**, unlike `useState`.

---

### 22. 🔴 P0 [Q] What are common real-world use cases for `useRef`?

> **TL;DR:** 1. Accessing DOM elements (`inputRef.current.focus()`). 2. Storing timer/interval IDs (`clearInterval(timerRef.current)`). 3. Storing previous prop/state values across renders without re-rendering.

---

### 23. 🔴 P0 [Q] What is `useContext`? What is its primary re-rendering performance drawback?

> **TL;DR:** `useContext` provides global state to child components without prop drilling. Its primary performance drawback is that **EVERY component consuming the Context re-renders** whenever ANY value inside the Context value object changes!

---

### 24. 🟠 P1 [Q] Replacing class component lifecycles with `useEffect`?

> **TL;DR:** `componentDidMount` = `useEffect(fn, [])`. `componentDidUpdate` = `useEffect(fn, [dep])`. `componentWillUnmount` = cleanup function returned from `useEffect`.

---

## 4. Advanced Hooks & Memoization (`useMemo`, `useCallback`, Custom Hooks)

### 25. 🔴 P0 [P] What is `useMemo`? What problem does it solve?

> **TL;DR:** `useMemo` caches (memoizes) the **result of a costly calculation** between renders. It only recalculates when one of its dependencies changes.

---

### 26. 🔴 P0 [P] What is `useCallback`? How does `useCallback` differ from `useMemo`?

> **TL;DR:** `useCallback` memoizes a **function instance** between renders. `useMemo` memoizes the **returned value** of a function. `useCallback(fn, deps)` is shorthand for `useMemo(() => fn, deps)`.

---

### 27. 🔴 P0 [P] When should you NOT use `useMemo` or `useCallback`?

> **TL;DR:** Do NOT use them for simple/cheap operations or when passing callbacks to standard HTML elements (`<button onClick>`). The memory and execution overhead of `useMemo`/`useCallback` dependency array checks is higher than re-running cheap functions!

---

### 28. 🔴 P0 [D] What is a Custom Hook? How do you extract reusable stateful logic?

> **TL;DR:** A Custom Hook is a JavaScript function starting with `use` that can call other React Hooks. It extracts reusable stateful logic (e.g., `useFetch`, `useDebounce`, `useLocalStorage`) away from UI components.

---

### 29. 🟠 P1 [Q] `useLayoutEffect` vs `useEffect`?

> **TL;DR:** `useEffect` runs **asynchronously AFTER** browser paint. `useLayoutEffect` runs **synchronously BEFORE** browser paint, preventing visual UI flicker when measuring DOM elements.

---

## 5. Re-rendering, Keys & Performance Optimization

### 30. 🔴 P0 [C] What causes a React component to re-render, and what does/doesn't trigger a re-render?

> **TL;DR:** A component re-renders when: 1. Its internal **State** changes. 2. Its **Parent** re-renders (unless wrapped in `React.memo`). 3. A **Context** it consumes changes. 4. An **External Store** it subscribes to emits a new value. Modifying `useRef.current` or local variables does **NOT** trigger a re-render.

#### 💡 Core Concept & Explanation
Components act as functions of state. When parent renders, child renders down the tree by default.

---

### 31. 🔴 P0 [P] What is `React.memo`? How does shallow prop comparison work?

> **TL;DR:** `React.memo` is a Higher-Order Component that skips re-rendering a component if its props have not changed (using shallow equality `prevProps === nextProps`).

---

### 32. 🔴 P0 [P] Why are `keys` mandatory when rendering lists in React?

> **TL;DR:** `key` props give elements a stable identity across renders. React's Diffing algorithm uses keys to match old list nodes with new list nodes, determining whether items were added, removed, or reordered.

---

### 33. 🔴 P0 [P] Why is using array index as a `key` (`key={index}`) an anti-pattern for dynamic lists?

> **TL;DR:** Using index as key causes UI state corruption bugs when list items are reordered, inserted at top, or deleted. React matches items by index number instead of item identity, attaching old DOM state to wrong items!

---

### 34. 🔴 P0 [P] How can Component Composition (passing `children`) prevent parent re-renders without `React.memo`?

> **TL;DR:** Move state down into a smaller container or pass heavy children via `props.children`. Because `children` is instantiated in the un-rendered outer parent, React skips re-rendering the `children` subtree!

---

### 35. 🔴 P0 [P] What is Code Splitting in React? How do `React.lazy()` and `Suspense` work?

> **TL;DR:** Code splitting breaks large JS bundles into smaller chunks loaded dynamically on demand. `React.lazy()` dynamically imports components, and `<Suspense>` displays a loading fallback while the JS chunk downloads.

---

### 36. 🟠 P1 [P] What is Virtualization / Windowing (`react-window`)?

> **TL;DR:** Virtualization renders **only the visible rows** inside the browser viewport (e.g. 20 DOM nodes out of 100,000 total items), updating visible content on scroll to maintain 60 FPS performance.

---

## 6. Client State Management & Data Fetching Basics

### 37. 🔴 P0 [D] Local State vs Context API vs External Store (Zustand / Redux): How do you decide where state lives?

> **TL;DR:** 1. **Local State (`useState`):** UI toggle, single component form. 2. **Lifted State / Context:** Small global themes/auth. 3. **Zustand / Redux:** Complex high-frequency shared app state. 4. **TanStack Query:** Remote API data.

---

### 38. 🔴 P0 [D] Why is fetching data inside raw `useEffect` an anti-pattern in modern React?

> **TL;DR:** Raw `useEffect` fetching causes **race conditions** (out-of-order network responses), **network waterfalls**, missing cancellation (`AbortController`), and lacks caching/deduplication out of the box.

---

### 39. 🔴 P0 [Q] How do you handle race conditions during API data fetching using `AbortController`?

> **TL;DR:** Use `AbortController` in `useEffect` cleanup to cancel inflight HTTP requests when dependencies change.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${userId}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => { if (err.name !== 'AbortError') setError(err); });

  return () => controller.abort(); // Cancels inflight network request on userId change!
}, [userId]);
```

---

### 40. 🔴 P0 [D] What is Server State vs Client State? Why use TanStack Query?

> **TL;DR:** **Client State** is local UI data (open modals, input tabs). **Server State** is remote data owned by DB APIs. TanStack Query manages caching, refetching, background deduplication, and stale data automatically.

---

### 41. 🟠 P1 [D] Redux Toolkit (RTK) vs Legacy Redux?

> **TL;DR:** RTK removes legacy Redux boilerplate by combining actions and reducers into `createSlice()`, using **Immer** under the hood for immutable state mutations (`state.value += 1`).

---

### 42. 🟠 P1 [D] What is Zustand, and why is it popular?

> **TL;DR:** Zustand is a lightweight (~1KB) state management store. Components using Zustand **only re-render when their selected state slice changes**, eliminating Context re-render bloat without providers.

---

## 7. Full-Stack React + Backend Integration & Authentication

### 43. 🔴 P0 [Q] How do you handle loading, success, and error states when fetching REST API data in React?

> **TL;DR:** Explicitly model state as an object or enum `{ status: 'idle' | 'loading' | 'success' | 'error', data, error }` to prevent illegal UI combinations (e.g., showing both loading spinner and error alert simultaneously).

#### 💡 Core Concept & Explanation
Instead of 3 separate un-synced booleans (`isLoading`, `isError`, `isSuccess`), use explicit state modeling or dedicated data-fetching hooks to guarantee clean rendering transitions.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function UserProfile({ userId }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    setState({ status: 'loading', data: null, error: null });
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setState({ status: 'success', data, error: null }))
      .catch(err => setState({ status: 'error', data: null, error: err.message }));
  }, [userId]);

  if (state.status === 'loading') return <Spinner />;
  if (state.status === 'error') return <Alert variant="error">{state.error}</Alert>;
  return <div>Welcome, {state.data.name}</div>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always check `if (!res.ok)` when using native `fetch()`! `fetch()` does **NOT** reject promises on 404 or 500 HTTP status codes; it only rejects on network failures.

---

### 44. 🔴 P0 [D] What is CORS, why does it happen when React calls a Node/Express backend, and how do you resolve it?

> **TL;DR:** CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks client JS from reading HTTP responses from a different origin (domain, protocol, or port) unless the server returns appropriate `Access-Control-Allow-Origin` headers.

#### 💡 Core Concept & Explanation
If React runs on `http://localhost:3000` and Node/Express runs on `http://localhost:5000`, they have different ports (different origins). The browser sends an HTTP `OPTIONS` preflight request. If Express doesn't handle CORS, the browser blocks the response.

#### 🛠️ Code / Visual Diagram / Table

```javascript
// Express.js Backend Fix:
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Allow React client origin
  credentials: true                // Allow cookies across origins
}));
```

---

### 45. 🔴 P0 [D] How does Authentication work in a Full-Stack React application? Explain the JWT access token + refresh token flow.

> **TL;DR:** Upon login, the backend issues a short-lived **Access Token** (15 mins) and a long-lived **Refresh Token** (7 days). React attaches the Access Token to `Authorization: Bearer <token>` headers. When it expires (401 error), an Axios/fetch interceptor uses the Refresh Token to get a new Access Token seamlessly.

#### 💡 Core Concept & Explanation
Security flow breakdown:

```
[ React App ] ─── 1. POST /api/login ──────────────> [ Node Backend ]
[ React App ] <── 2. Returns Access Token + Cookie ── [ Node Backend ]
[ React App ] ─── 3. GET /api/data (Bearer Token) ─> [ Node Backend ]
[ React App ] <── 4. 401 Unauthorized (Expired) ──── [ Node Backend ]
[ React App ] ─── 5. POST /api/refresh ─────────────> [ Node Backend ]
[ React App ] <── 6. New Access Token ────────────── [ Node Backend ]
```

---

### 46. 🔴 P0 [D] Storage Security Debate: `HttpOnly Cookies` vs `localStorage` for JWT tokens—which should you use and why?

> **TL;DR:** **HttpOnly, Secure, SameSite Cookies** are vastly superior for storing Refresh Tokens because client-side JavaScript cannot read them, making them immune to XSS (Cross-Site Scripting) attacks. `localStorage` is vulnerable to XSS malicious script theft.

#### 💡 Core Concept & Explanation
Comparison matrix:

| Storage Location | XSS Vulnerability | CSRF Vulnerability | Recommendation |
| :--- | :--- | :--- | :--- |
| **`localStorage`** | ❌ **High Risk** (Any 3rd party script can steal tokens) | ✅ Immune | Avoid for sensitive tokens |
| **`HttpOnly Cookie`** | ✅ **Immune** (JS cannot read cookie) | ⚠️ Vulnerable (Mitigate via `SameSite=Strict` & CSRF tokens) | 🟢 **Industry Standard** |

---

### 47. 🔴 P0 [Q] How do you build a `<ProtectedRoute>` component in React?

> **TL;DR:** Create a wrapper component that checks authentication state from Context/Auth Hook. If authenticated, render `<Outlet />` or `children`; if not, render `<Navigate to="/login" replace />`.

#### 🛠️ Code / Visual Diagram / Table

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullPageSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // Renders protected child route components
}
```

---

### 48. 🔴 P0 [D] How do you persist authentication state across page refreshes and implement logout?

> **TL;DR:** On app initialization, run a `useAuth` effect that calls a `/api/me` or `/api/refresh` endpoint to restore user session state from HttpOnly cookies. On logout, call `/api/logout` to clear server cookies and reset local state to `null`.

---

### 49. 🔴 P0 [Q] How do you handle API request timeouts and global network error handling in React?

> **TL;DR:** Use `AbortSignal.timeout(5000)` or Axios interceptors to enforce request timeouts, and wrap top-level route layouts in Error Boundaries or global toast notification handlers.

---

### 50. 🟠 P1 [Q] How do you handle form submission from React to a backend API with validation and error responses?

> **TL;DR:** Prevent default form submission (`e.preventDefault()`), disable submit button (`isSubmitting`), validate fields, send POST payload, and map backend validation error objects (e.g. 400 Bad Request) back to field error state.

---

## 8. Next.js Architecture & Server Rendering

### 51. 🔴 P0 [C] Why use Next.js instead of a plain React Single Page Application (SPA)?

> **TL;DR:** Plain React SPAs render empty HTML (`<div id="root"></div>`) and execute all JS on the client (poor SEO, slow initial load). Next.js provides **Server-Side Rendering (SSR)**, automatic code splitting, file-system routing, built-in image/font optimization, and API route handlers out of the box.

#### 🛠️ Code / Visual Diagram / Table

```
Plain React SPA (Client-Side Rendering):
Browser Downloads Empty HTML ──> Downloads 2MB JS Bundle ──> Client Executes JS ──> UI Visible (Slow FCP)

Next.js (Server-Side Rendering):
Server Renders Pre-populated HTML ──> Browser Displays UI Instantly (Fast FCP) ──> Hydrates Interactivity
```

---

### 52. 🔴 P0 [C] What are the rendering strategies in Next.js? Compare SSR, SSG, ISR, and CSR.

> **TL;DR:** 
> - **SSR (Server-Side Rendering):** Renders HTML on the server **for every incoming request** (best for real-time dynamic data like feeds).
> - **SSG (Static Site Generation):** Pre-renders HTML at **build time** (best for blogs/marketing pages).
> - **ISR (Incremental Static Regeneration):** Updates static pages in the background after a revalidation time without rebuilding the whole site.
> - **CSR (Client-Side Rendering):** Standard client-side React rendering (`"use client"` + `useEffect`).

---

### 53. 🔴 P0 [C] What are React Server Components (RSC)? How do Server Components differ from Client Components (`"use client"`)?

> **TL;DR:** Server Components execute **exclusively on the server** during request/build time, sending **0 KB JS** to the browser bundle. Client Components (`"use client"`) run on both server (for HTML) and client, enabling interactivity (`useState`, `useEffect`, event listeners).

#### 🛠️ Code / Visual Diagram / Table

| Feature | Server Components (RSC - Default) | Client Components (`"use client"`) |
| :--- | :--- | :--- |
| **Execution** | Runs **only on Server** | Runs on Server (initial HTML) & **Client** |
| **JS Bundle Size** | **0 KB** sent to browser | Included in client JS bundle |
| **Direct DB Access** | ✅ Yes (`await db.query()`) | ❌ No (Must call API endpoint) |
| **Interactivity** | ❌ No (`useState`, `onClick` forbidden) | ✅ Full (`useState`, `useEffect`, `onClick`) |

---

### 54. 🔴 P0 [D] Where should you place the `"use client"` boundary in a Next.js application?

> **TL;DR:** Push `"use client"` as far down the component tree as possible (to leaf node interactive elements). Keep parent pages and layouts as Server Components to maximize server data fetching and minimize client JS bundle size.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// GOOD (Leaf Node Client Boundary):
// app/page.tsx (Server Component - fetches data directly from DB)
import LikeButton from './LikeButton';

export default async function Page() {
  const posts = await db.query('SELECT * FROM posts');
  return (
    <div>
      {posts.map(p => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <LikeButton postId={p.id} /> {/* Only LikeButton is 'use client'! */}
        </div>
      ))}
    </div>
  );
}
```

---

### 55. 🔴 P0 [D] App Router vs Pages Router in Next.js?

> **TL;DR:** **App Router (`app/` directory)** is the modern Next.js architecture built on React Server Components, nested layouts (`layout.tsx`, `page.tsx`, `loading.tsx`), and granular caching. **Pages Router (`pages/` directory)** is legacy, using `getServerSideProps` and client-rendered component trees.

---

### 56. 🔴 P0 [Q] How do Server Actions (`"use server"`) work in Next.js?

> **TL;DR:** Server Actions are asynchronous functions executed on the server that can be invoked directly from HTML forms or client components, eliminating the need to write manual API routes for data mutations.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  const title = formData.get('title');
  await db.insert({ title });
  revalidatePath('/posts'); // Automatically purges stale cache and refreshes UI!
}

// app/page.tsx (Server Component Form)
export default function NewPostPage() {
  return (
    <form action={addPost}>
      <input name="title" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

---

### 57. 🔴 P0 [Q] What are Route Handlers (`app/api/route.ts`) in Next.js?

> **TL;DR:** Route Handlers allow you to create custom HTTP request handlers (GET, POST, PUT, DELETE) for a given route using the Web Request and Response APIs.

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.query('SELECT * FROM users');
  return NextResponse.json(users);
}
```

---

### 58. 🔴 P0 [D] How does Next.js Middleware (`middleware.ts`) work?

> **TL;DR:** Middleware runs code **before a request is completed** on the Edge/Server runtime. Use it to inspect cookies/headers and perform instant server-side auth redirects (`NextResponse.redirect('/login')`).

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

### 59. 🔴 P0 [P] How does Data Caching and Revalidation work in Next.js?

> **TL;DR:** Next.js caches `fetch()` requests by default in the Server Data Cache. Purge stale cache using **Time-based revalidation** (`fetch(url, { next: { revalidate: 3600 } })`) or **On-Demand revalidation** (`revalidatePath('/posts')` / `revalidateTag('user-posts')`).

---

### 60. 🔴 P0 [Q] What causes a Hydration Mismatch Error in Next.js, and how do you fix it?

> **TL;DR:** A Hydration Mismatch occurs when the HTML generated on the server does not match the initial HTML rendered by the client (e.g. `new Date()`, `Math.random()`, or checking `window.innerWidth`). Fix using `suppressHydrationWarning` or running client-only checks inside `useEffect`.

---

### 61. 🟠 P1 [P] How do `next/image` and `next/font` optimize Web Vitals?

> **TL;DR:** `<Image />` automatically serves WebP/AVIF formats, resizes images dynamically, prevents layout shifts (CLS) by requiring aspect ratios, and lazy-loads offscreen images. `next/font` zero-hosts Google Fonts locally to eliminate render-blocking external network requests.

---

## 9. Practical Coding Exercises & Scenario Drills

### 62. 🔴 P0 [Q] Build a custom `useDebounce(value, delay)` hook in React.

```jsx
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup clears timer on rapid typing!
  }, [value, delay]);

  return debouncedValue;
}
```

---

### 63. 🔴 P0 [Q] Build a custom `useLocalStorage(key, initialValue)` hook.

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) { console.error(err); }
  };

  return [storedValue, setValue];
}
```

---

### 64. 🔴 P0 [Q] Build an Search Autocomplete component with API debouncing.

```jsx
function Autocomplete() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) { setResults([]); return; }
    fetch(`/api/search?q=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [debouncedQuery]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
}
```

---

### 65. 🔴 P0 [Q] Build a dynamic Form without third-party libraries.

```jsx
function Form() {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return <input name="username" value={formData.username} onChange={handleChange} />;
}
```

---

### 66. 🔴 P0 [Q] Build a Modal Dialog using React Portals (`createPortal`).

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>{children}</div>
    </div>,
    document.body // Appends directly to body!
  );
}
```

---

### 67. 🔴 P0 [Q] Implement Infinite Scroll using `IntersectionObserver`.

```jsx
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && hasMore) fetchNextPage();
  });
  if (sentinelRef.current) observer.observe(sentinelRef.current);
  return () => observer.disconnect();
}, [hasMore]);
```

---

### 68. 🔴 P0 [Q] Implement a Theme Provider using Context API.

```jsx
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
```

---

## 10. Skim-Level Advanced Topics & Edge Cases

### 69. 🟠 P1 [C] What is Automatic Batching in React 18?

> **TL;DR:** React 18 automatically batches ALL state updates (inside promises, timeouts, native events) into a single re-render cycle.

---

### 70. 🟠 P1 [C] What is an Error Boundary in React?

> **TL;DR:** Error Boundaries catch JavaScript errors in their child component tree, log errors, and render a fallback UI. Must use Class Components (`componentDidCatch`).

---

### 71. 🟠 P1 [C] How does React prevent XSS attacks by default?

> **TL;DR:** React automatically escapes strings inside JSX `{}`. Using `dangerouslySetInnerHTML={{ __html: userString }}` bypasses escaping and creates XSS risks.

---

### 72. 🟡 P2 [C] What is React Fiber (conceptual overview)?

> **TL;DR:** Fiber is React's reconciler engine that breaks rendering into small units of work (Fiber nodes) that can be paused, prioritized, or aborted by the browser.

---

### 73. 🟡 P2 [Q] `useTransition` and `useDeferredValue` in React 18?

> **TL;DR:** `useTransition` marks state updates as non-urgent transitions. `useDeferredValue` defers updating non-critical UI values until urgent renders complete.

---

### 74. 🟡 P2 [Q] `forwardRef` and `useImperativeHandle`?

> **TL;DR:** `forwardRef` passes a ref down to a child node. `useImperativeHandle` customizes the imperative handle exposed to parent components.

---

### 75. 🟡 P2 [D] What is Micro-Frontend Architecture (Module Federation)?

> **TL;DR:** Splitting a large monolithic frontend into independently built and deployed applications loaded dynamically at runtime via Webpack Module Federation.

---

_End of Master Answer Key — Synchronized with `react-interview-questions.md`._

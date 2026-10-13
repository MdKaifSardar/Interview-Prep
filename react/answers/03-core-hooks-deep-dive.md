[⬅️ Previous: 02 · Components, Props & State](02-functional-components-props-and-state-modeling.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Advanced Hooks & Memoization ➡️](04-advanced-hooks-and-memoization.md)

---

## 3. Core Hooks Deep-Dive (`useState`, `useEffect`, `useRef`, `useContext`)

### 16. 🔴 P0 [C] What are React Hooks? What are the Two Fundamental Rules of Hooks, and why do they exist?

> **TL;DR:** Hooks are special functions (`use...`) that let functional components use state and lifecycle features. 
> 1. **Call Hooks ONLY at the Top Level:** Never call Hooks inside loops, conditions, or nested functions.
> 2. **Call Hooks ONLY from React Functions:** Only call Hooks from React Functional Components or Custom Hooks.

#### 💡 Core Concept & Explanation
React relies on the **order in which Hooks are called** on every render to map state variables to internal linked list nodes. Calling a Hook conditionally alters the call order, mismatching state variables across renders!

#### 🛠️ Code / Visual Diagram / Table

```jsx
// INCORRECT (Breaks Rule 1 - Conditional Hook Call!):
function Profile({ user }) {
  if (user) {
    useEffect(() => { ... }); // ❌ React will throw an error! Hook order altered!
  }
}

// CORRECT (Hook at top level, condition inside hook):
function Profile({ user }) {
  useEffect(() => {
    if (user) { ... } // ✅ Always executes hook in identical order!
  }, [user]);
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
The ESLint plugin `eslint-plugin-react-hooks` enforces these two rules automatically during development and build time.

---

### 17. 🔴 P0 [Q] How does `useState` batch state updates? Why is state updating queued/asynchronous?

> **TL;DR:** React **batches** multiple state updates triggered within the same event handler into a single re-render cycle to prevent redundant DOM updates and maximize UI performance.

#### 💡 Core Concept & Explanation
In React 18, **Automatic Batching** groups all state updates (even inside promises, `setTimeout`, or native event handlers) into 1 single re-render.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const handleClick = () => {
  setCount(c => c + 1);
  setFlag(f => !f);
  setTheme('dark');
  // React queues all 3 updates and triggers ONLY 1 single re-render at the end!
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
State variables do not update immediately on the next line of code after calling `setState(val)`. They update on the *next render*.

---

### 18. 🔴 P0 [Q] How does `useEffect` work? Explain its 3 dependency array behaviors (`no array`, `[]`, `[dep]`).

> **TL;DR:** `useEffect` runs side effects (data fetching, DOM listeners, subscriptions) after rendering. Dependency array options: `no array` (runs after EVERY render), `[]` (runs ONCE on mount), `[a, b]` (runs on mount AND when `a` or `b` changes).

#### 💡 Core Concept & Explanation
`useEffect` synchronizes your component with an external system (network, DOM, timer).

#### 🛠️ Code / Visual Diagram / Table

```jsx
// 1. No Dependency Array -> Runs after EVERY render
useEffect(() => { console.log('Rendered!'); });

// 2. Empty Array [] -> Runs ONCE after initial mount (like componentDidMount)
useEffect(() => { fetchData(); }, []);

// 3. Array with Dependencies [user] -> Runs on mount + whenever 'user' reference changes
useEffect(() => { fetchUserData(user.id); }, [user.id]);
```

#### ⚠️ Interview Pitfall / Pro-Tip
Never lie to your dependency array by omitting variables used inside the effect callback. Omitted dependencies lead to stale closures and subtle bugs.

---

### 19. 🔴 P0 [Q] What is the Cleanup Function in `useEffect`? When does it run, and why is it essential for preventing memory leaks?

> **TL;DR:** The cleanup function is the function returned from `useEffect` (`return () => { ... }`). It runs **before unmounting** the component AND **before re-running the effect** on subsequent dependency updates, preventing memory leaks.

#### 💡 Core Concept & Explanation
Essential for clearing timers, unsubscribing from WebSockets, and aborting active HTTP requests.

#### 🛠️ Code / Visual Diagram / Table

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);

  // CLEANUP FUNCTION:
  return () => {
    clearInterval(timer); // ✅ Clears interval when component unmounts or effect re-runs!
  };
}, []);
```

#### ⚠️ Interview Pitfall / Pro-Tip
If a component unmounts while an asynchronous fetch is inflight without a cleanup/abort mechanism, updating state on the unmounted component triggers console warnings or memory leaks.

---

### 20. 🔴 P0 [Q] What is the Stale Closure problem in `useEffect` or callbacks, and how do you fix it?

> **TL;DR:** A Stale Closure occurs when an effect or callback captures state variables inside its JavaScript closure scope at creation time, but the dependency array omits the state variable, causing the closure to read old state values indefinitely.

#### 💡 Core Concept & Explanation
JavaScript functions capture variables in their lexical environment when instantiated. If a callback created on render 1 accesses `count` (0), and the dependency array is `[]`, that callback will forever read `count = 0`, even after `count` updates to 10 in React!

#### 🛠️ Code / Visual Diagram / Table

```jsx
// BUG (Stale Closure: 'count' captured as 0 forever because [] is empty):
useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // ❌ Always prints 0!
  }, 1000);
  return () => clearInterval(id);
}, []); // Missing 'count' in dependencies!

// FIX 1: Add 'count' to dependency array [count]
// FIX 2: Use functional updater setCount(c => c + 1)
```

#### ⚠️ Interview Pitfall / Pro-Tip
This is one of the most common live coding debugging interview questions. Always check dependency arrays first when facing frozen timer or state values inside callbacks.

---

### 21. 🔴 P0 [Q] What is `useRef`? How does `useRef` differ from `useState`, and why does modifying `ref.current` NOT trigger a re-render?

> **TL;DR:** `useRef` returns a mutable object `{ current: value }` that persists across renders. Changing `ref.current` **does NOT trigger a component re-render**, unlike `useState`.

#### 💡 Core Concept & Explanation
Use `useState` for data rendered on the screen. Use `useRef` for hidden data that needs to persist across renders without affecting the visual UI (e.g., storing timer IDs, DOM nodes, previous state).

#### 🛠️ Code / Visual Diagram / Table

| Property | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Return Value** | State value + Setter function | Mutable object `{ current: initialValue }` |
| **Re-render Trigger** | **Triggers Re-render** when state updates | ❌ **No Re-render** when `current` changes |
| **Primary Use** | Rendered UI data & interactive state | Direct DOM references, timer IDs, non-UI variables |

#### ⚠️ Interview Pitfall / Pro-Tip
Do not read or write `ref.current` during rendering (inside the component JSX body). Only write to refs inside `useEffect` or event handlers.

---

### 22. 🔴 P0 [Q] What are common real-world use cases for `useRef` (DOM manipulation, storing timer IDs, previous state)?

> **TL;DR:** 1. Accessing DOM elements (`inputRef.current.focus()`). 2. Storing timer/interval IDs (`clearInterval(timerRef.current)`). 3. Storing previous prop/state values across renders without re-rendering.

#### 💡 Core Concept & Explanation
Code examples for DOM focus and timer reference:

#### 🛠️ Code / Visual Diagram / Table

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Direct DOM node access!
  }, []);

  return <input ref={inputRef} />;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Avoid overusing `useRef` for DOM manipulation (e.g. manually modifying styles or innerHTML). Let React handle the DOM declarative tree whenever possible.

---

### 23. 🔴 P0 [Q] What is `useContext`? How does Context API propagate state, and what is its primary re-rendering performance drawback?

> **TL;DR:** `useContext` provides global state to child components without prop drilling. Its primary performance drawback is that **EVERY component consuming the Context re-renders** whenever ANY value inside the Context value object changes!

#### 💡 Core Concept & Explanation
If Context stores `{ user, theme }`, and ONLY `theme` updates, components consuming Context for `user` will still re-render! Fix by splitting into multiple focused contexts or using external store libraries (Zustand).

#### 🛠️ Code / Visual Diagram / Table

```jsx
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext); // Reads "dark" directly without prop drilling!
  return <button className={theme}>Click</button>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Context API is designed for low-frequency global updates (theme, current user, language). Do not use Context for high-frequency updates (e.g., mouse position or real-time tickers).

---

### 24. 🟠 P1 [Q] How do you replace class component lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) with `useEffect`?

> **TL;DR:** `componentDidMount` = `useEffect(fn, [])`. `componentDidUpdate` = `useEffect(fn, [dep])`. `componentWillUnmount` = cleanup function returned from `useEffect`.

#### 💡 Core Concept & Explanation
`useEffect` handles side-effect synchronization rather than lifecycle timeline steps.

#### 🛠️ Code / Visual Diagram / Table

| Class Lifecycle Method | `useEffect` Equivalent |
| :--- | :--- |
| **`componentDidMount`** | `useEffect(() => { ... }, [])` |
| **`componentDidUpdate`** | `useEffect(() => { ... }, [dep1, dep2])` |
| **`componentWillUnmount`** | `useEffect(() => { return () => { /* cleanup */ }; }, [])` |

#### ⚠️ Interview Pitfall / Pro-Tip
`useEffect` runs *after* browser paint, whereas `componentDidMount`/`componentDidUpdate` ran synchronously before paint in class components. If you need synchronous paint execution, use `useLayoutEffect`.

---

[⬅️ Previous: 02 · Components, Props & State](02-functional-components-props-and-state-modeling.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Advanced Hooks & Memoization ➡️](04-advanced-hooks-and-memoization.md)

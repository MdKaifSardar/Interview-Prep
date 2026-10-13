[⬅️ Previous: 03 · Core Hooks Deep-Dive](03-core-hooks-deep-dive.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Re-rendering & Performance ➡️](05-re-rendering-keys-and-performance-optimization.md)

---

## 4. Advanced Hooks & Memoization (`useMemo`, `useCallback`, Custom Hooks)

### 25. 🔴 P0 [P] What is `useMemo`? What problem does it solve, and when should you use it?

> **TL;DR:** `useMemo` caches (memoizes) the **result of a costly calculation** between renders. It only recalculates when one of its dependencies changes.

#### 💡 Core Concept & Explanation
Avoid running expensive filtering, sorting, or mathematical calculations on every single component render.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function ProductList({ products, query }) {
  // Expensive filter only runs when 'products' or 'query' changes!
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.includes(query));
  }, [products, query]);

  return <div>{filteredProducts.map(...)}</div>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Do not wrap every simple calculation in `useMemo`. The memory overhead and dependency array checks of `useMemo` can cost more CPU than recalculating small numbers!

---

### 26. 🔴 P0 [P] What is `useCallback`? How does `useCallback` differ from `useMemo`?

> **TL;DR:** `useCallback` memoizes a **function instance** between renders. `useMemo` memoizes the **returned value** of a function. `useCallback(fn, deps)` is shorthand for `useMemo(() => fn, deps)`.

#### 💡 Core Concept & Explanation
In JavaScript, functions declared inside component bodies are recreated as new reference objects on every render (`() => {} !== () => {}`). Passing an un-memoized inline function as a prop to a `React.memo` child breaks memoization! `useCallback` maintains the same function memory reference.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Function reference is preserved across renders:
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <MemoizedChildButton onClick={handleClick} />;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
`useCallback` does **not** prevent a function from being created; it prevents a *new function reference* from being passed to child props across renders.

---

### 27. 🔴 P0 [P] When should you NOT use `useMemo` or `useCallback`? (Overhead of premature optimization).

> **TL;DR:** Do NOT use them for simple/cheap operations or when passing callbacks to standard HTML elements (`<button onClick>`). The memory and execution overhead of `useMemo`/`useCallback` dependency array checks is higher than re-running cheap functions!

#### 💡 Core Concept & Explanation
Premature optimization anti-pattern. Only use `useMemo`/`useCallback` when:
1. Computation is demonstrably slow (e.g. processing 10,000 array items).
2. Passing function/object props to a child component wrapped in `React.memo`.
3. Function is used as a dependency in another `useEffect`.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// ANTI-PATTERN (Useless useCallback - <button> is native HTML, doesn't benefit!):
const handleClick = useCallback(() => console.log('hi'), []);
return <button onClick={handleClick}>Click</button>;

// CORRECT (Simple inline function is faster and cleaner!):
return <button onClick={() => console.log('hi')}>Click</button>;
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always measure with React DevTools Profiler before adding `useMemo` or `useCallback` to prove a performance bottleneck exists.

---

### 28. 🔴 P0 [D] What is a Custom Hook? How do you extract reusable stateful logic into a custom hook (`useFetch`, `useDebounce`, `useLocalStorage`)?

> **TL;DR:** A Custom Hook is a JavaScript function whose name starts with `use` and that can call other React Hooks. It extracts reusable stateful logic (e.g. data fetching, event listeners) away from UI components.

#### 💡 Core Concept & Explanation
Custom Hooks share stateful *logic*, not state *data*. Every component calling a custom hook gets its own isolated state instance.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// Custom Hook for Window Resize Tracking
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Component Usage:
function Header() {
  const { width } = useWindowSize(); // Clean reusable hook!
  return <div>Width: {width}px</div>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always prefix custom hook names with `use` (e.g. `useAuth`), otherwise React's linter cannot automatically check for hook rule violations.

---

### 29. 🟠 P1 [Q] What is `useLayoutEffect`? How does it differ from `useEffect` regarding browser paint and DOM measurement?

> **TL;DR:** `useEffect` runs **asynchronously AFTER** the browser paints the screen. `useLayoutEffect` runs **synchronously BEFORE** the browser paints, preventing visual UI flicker when measuring DOM elements.

#### 💡 Core Concept & Explanation
Use `useEffect` by default for 99% of tasks. Use `useLayoutEffect` only when measuring DOM element dimensions (`getBoundingClientRect()`) and immediately mutating the DOM to prevent visual layout flashing.

#### 🛠️ Code / Visual Diagram / Table

```
useEffect Execution Timeline:
Render ──> DOM Mutated ──> Browser Paint (Screen Updated) ──> useEffect Runs Async

useLayoutEffect Execution Timeline:
Render ──> DOM Mutated ──> useLayoutEffect Runs Sync ──> Browser Paint (Screen Updated)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `useLayoutEffect` blocking code can delay time-to-first-paint. Use it strictly for DOM measurement adjustments.

---

[⬅️ Previous: 03 · Core Hooks Deep-Dive](03-core-hooks-deep-dive.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 05 · Re-rendering & Performance ➡️](05-re-rendering-keys-and-performance-optimization.md)

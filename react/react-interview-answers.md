# React Interview Questions — Master Answer Key (Comprehensive Edition)

Companion answer key to `react-interview-questions.md`. Every answer follows a standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive explanation of *why* and *how* the mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working React code snippet, custom hook, ASCII flow, or comparative table.
4. **⚠️ Interview Pitfall / Pro-Tip:** Critical edge cases, performance traps, stale closure bugs, and common interviewer follow-ups.

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

#### ⚠️ Interview Pitfall / Pro-Tip
The Virtual DOM is **not** faster than manual handwritten raw DOM operations for a single element; its power lies in providing deterministic, automated performance at scale across complex application trees without manual DOM tracking.

---

### 4. 🔴 P0 [C] What is React Fiber, and how did it improve rendering performance over the legacy stack reconciler?

> **TL;DR:** React Fiber (introduced in React 16) is a complete rewrite of React's core reconciliation engine. It breaks rendering work into small units of work (Fiber nodes) that can be **paused, prioritized, aborted, or resumed** by the browser.

#### 💡 Core Concept & Explanation
The old "Stack Reconciler" processed rendering synchronously using recursive function calls. If a large component tree took 100ms to render, it blocked the main browser thread, causing frame drops and input lag (frozen typing/scrolling). Fiber converts the component tree into a **singly linked list of Fiber nodes** (work units). Using browser APIs like `requestIdleCallback`, Fiber processes work incrementally, yielding control back to the main thread for high-priority browser events (user clicks, animations).

#### 🛠️ Code / Visual Diagram / Table

```
Legacy Stack Reconciler: 
[Render Component Tree Synchronously (100ms Uninterruptible Block)] ──> [Main Thread Frozen!]

React Fiber Reconciler:
[Chunk 1 (5ms)] ──> (Yield to Browser for User Click) ──> [Chunk 2 (5ms)] ──> [Commit]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Fiber enabled all of React 18's concurrent features (`useTransition`, `useDeferredValue`, Suspense streaming) because work units can now be tagged with different priority levels.

---

### 5. 🔴 P0 [C] What is One-Way Data Flow (Unidirectional Data Flow) in React, and why does it make state predictable?

> **TL;DR:** One-way data flow means data flows in a single top-down direction: **Parent $\rightarrow$ Child via Props**. Children cannot directly modify parent state; they must emit events via callback functions passed as props.

#### 💡 Core Concept & Explanation
In two-way data binding (like legacy AngularJS), child inputs can implicitly mutate parent state, creating unpredictable cascade updates that are difficult to trace and debug. React's top-down flow ensures that state lives in a single source of truth and flows down as immutable props, making data updates explicit and predictable.

#### 🛠️ Code / Visual Diagram / Table

```
[ Parent Component (Holds State) ]
            │
       Passes Props (Data Down)
            ▼
 [ Child Component (Displays Data) ]
            │
  Triggers Callback (Events Up)
            ▼
[ Parent Updates State & Re-renders ]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Child components *can* request state updates, but only by executing callback functions explicitly passed to them by the parent (e.g., `onSelect={handleSelect}`).

---

### 6. 🟠 P1 [C] What is the difference between Functional Components and Class Components? Why are Functional Components standard today?

> **TL;DR:** Functional Components are plain JavaScript functions that take `props` and return JSX. Class Components extend `React.Component` and rely on `this` binding and lifecycle methods. Functional components paired with Hooks are standard due to cleaner code, zero `this` confusion, better tree-shaking, and easier custom logic reuse.

#### 💡 Core Concept & Explanation
Comparison breakdown:

#### 🛠️ Code / Visual Diagram / Table

| Feature | Functional Components (Modern) | Class Components (Legacy) |
| :--- | :--- | :--- |
| **Syntax** | Plain JS Function returning JSX | ES6 Class extending `React.Component` |
| **State** | `useState()` hook | `this.state` object & `this.setState()` |
| **Lifecycle** | `useEffect()` hook | `componentDidMount`, `componentDidUpdate`, etc. |
| **`this` Binding** | ❌ No `this` keyword needed | ⚠️ Must bind methods in constructor or arrow syntax |
| **Code Reuse** | Custom Hooks (clean composition) | HOCs & Render Props (wrapper hell) |
| **Bundle Size** | Smaller (minifies better) | Larger (ES6 class boilerplate) |

---

### 7. 🟠 P1 [C] How does React handle events (`SyntheticEvent`)? How does it differ from native DOM event handling?

> **TL;DR:** React wraps native browser events in a cross-browser `SyntheticEvent` wrapper to ensure identical event API behavior across all browsers. React uses **Event Delegation**, attaching a single event listener at the root container level (`#root`).

#### 💡 Core Concept & Explanation
Instead of attaching individual event listeners to thousands of DOM nodes (which consumes heavy memory), React delegates all events to the root DOM container. When a user clicks a button, the event bubbles to the root container, where React routes it to the appropriate component handler using synthetic wrappers.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function Button() {
  const handleClick = (e) => {
    // 'e' is a React SyntheticEvent instance (cross-browser compatible)
    e.preventDefault();
    console.log(e.nativeEvent); // Access raw underlying browser event
  };
  return <button onClick={handleClick}>Click Me</button>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
In React 17+, event delegation attaches to the root DOM container (`#root`), **not** the `document` node! This allows embedding multiple independent React app roots on the same HTML page without event interference.

---

### 8. 🟠 P1 [C] Component Composition vs Inheritance: Why does React favor Composition over Class Inheritance?

> **TL;DR:** React recommends using **Composition** (combining smaller components using `children` props or render props) rather than Class Inheritance (`extends`). Composition is more flexible and avoids rigid class hierarchy coupling.

#### 💡 Core Concept & Explanation
If you have a `Dialog` component and want a `WelcomeDialog`, in OOP you might extend `Dialog`. In React, you compose `<Dialog>` by passing specific title/message `children` or props into a generic `<Dialog>` wrapper.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// COMPOSITION PATTERN (React Way):
function FancyBorder(props) {
  return <div className={'border-' + props.color}>{props.children}</div>;
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1>Welcome</h1>
      <p>Thank you for visiting!</p>
    </FancyBorder>
  );
}
```

---

## 2. Functional Components, Props & State Modeling

### 9. 🔴 P0 [C] What are Props in React? Why must Props be strictly immutable?

> **TL;DR:** Props (properties) are read-only inputs passed from a parent component to a child component. Props must be strictly immutable to ensure pure component rendering, predictable data flow, and reliable shallow prop comparison (`React.memo`).

#### 💡 Core Concept & Explanation
React components act as pure functions with respect to their props. If a child component mutates `props.user.name = 'Ravi'`, it modifies shared memory outside React's state tracking system, breaking parent-child sync and rendering optimization checks.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// INCORRECT (Direct Prop Mutation - Dangerous!):
function UserCard(props) {
  props.user.name = 'Ravi'; // ❌ MUTATES PROP IN-PLACE! Breaks Pure Rendering!
  return <div>{props.user.name}</div>;
}

// CORRECT (Read-only Props):
function UserCard({ user }) {
  return <div>{user.name}</div>; // ✅ Treated as read-only input
}
```

---

### 10. 🔴 P0 [C] What is State in React? How does State differ from Props?

> **TL;DR:** **State** is internal, mutable data owned and managed directly within a component that triggers re-renders when updated. **Props** are immutable data passed into a component from its parent.

#### 💡 Core Concept & Explanation
State represents the interactive memory of a component (e.g. form inputs, toggle flags, API data). When state changes via its updater function, React schedules a re-render.

#### 🛠️ Code / Visual Diagram / Table

| Property | Props | State |
| :--- | :--- | :--- |
| **Ownership** | Owned and passed by **Parent** component | Owned and managed **Internally** by component |
| **Mutability** | **Immutable** inside child component | **Mutable** via `useState` setter function |
| **Re-render Trigger** | Re-renders child when parent passes new props | Re-renders component when state setter is called |
| **Usage** | Passing data down / Callback functions | Component interactive memory |

---

### 11. 🔴 P0 [Q] Why must State be treated as immutable? Why should you never mutate state directly (`state.count = 5`)?

> **TL;DR:** Direct state mutation (`state.count = 5`) does **not** trigger a re-render because React checks state changes using shallow reference equality (`Object.is`). Mutating an object in-place preserves its reference, causing React to assume nothing changed!

#### 💡 Core Concept & Explanation
React compares `oldState === newState`. If you modify an array or object directly (`user.age = 25`), the object reference in RAM remains identical. React's reconciler skips the update entirely, leaving the UI stale and out of sync.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const [user, setUser] = useState({ name: 'Asha', age: 24 });

// INCORRECT (Direct Mutation - UI WILL NOT RE-RENDER!):
user.age = 25;
setUser(user); // Object reference is identical! Object.is(user, user) === true

// CORRECT (Immutable Update - Spreads new object copy):
setUser(prevUser => ({ ...prevUser, age: 25 })); // New object reference!
```

---

### 12. 🔴 P0 [Q] What is the functional state updater syntax (`setCount(prev => prev + 1)`), and when MUST you use it?

> **TL;DR:** The functional updater syntax passes a callback function `setCount(prevCount => prevCount + 1)` to the state setter. You **MUST** use it whenever the next state depends on the previous state to avoid stale closure state bugs during batched updates.

#### 💡 Core Concept & Explanation
Because state updates are asynchronous and queued, reading state variables directly inside rapid consecutive updates causes updates to read stale state snapshot values from the current render closure.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const [count, setCount] = useState(0);

const handleTripleIncrement = () => {
  // INCORRECT (Reads stale 'count' value of 0 three times -> Result is 1, NOT 3!):
  setCount(count + 1); // setCount(0 + 1)
  setCount(count + 1); // setCount(0 + 1)
  setCount(count + 1); // setCount(0 + 1)

  // CORRECT (Uses previous pending state value -> Result is 3!):
  setCount(prev => prev + 1); // prev = 0 -> 1
  setCount(prev => prev + 1); // prev = 1 -> 2
  setCount(prev => prev + 1); // prev = 2 -> 3
};
```

---

### 13. 🔴 P0 [D] What is "Lifting State Up" in React, and when should you apply it?

> **TL;DR:** "Lifting State Up" is moving state to the **closest common ancestor** component when two or more sibling components need to reflect or share the same changing data.

#### 💡 Core Concept & Explanation
If Component A (SearchInput) and Component B (SearchResultsList) need access to the query string, you lift `searchQuery` state up to their common parent component (SearchDashboard). The parent passes the value down to B as a prop and passes the setter to A as a callback.

#### 🛠️ Code / Visual Diagram / Table

```
Lifting State Up:
       [ Parent Component (Holds searchQuery State) ]
         │                                       │
   Passes Query Prop                       Passes onChange Callback
         ▼                                       ▼
[ SearchResults Component ]             [ SearchInput Component ]
```

---

### 14. 🔴 P0 [D] What is Prop Drilling, and what are the best techniques to prevent it?

> **TL;DR:** Prop Drilling is passing props through multiple levels of intermediate components that do not need the data themselves, purely to reach a deeply nested child. Prevent it using **Component Composition (passing `children`)**, **Context API**, or **Zustand/Redux**.

#### 💡 Core Concept & Explanation
Prop drilling tightly couples intermediate components to data they don't care about, causing unnecessary maintenance overhead when props change.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// BAD (Prop Drilling through 3 layers):
<App user={user}> -> <Header user={user}> -> <Nav user={user}> -> <Avatar user={user}>

// BETTER (Component Composition via children):
function Header({ children }) {
  return <header>{children}</header>;
}
// App renders Avatar directly inside Header slot:
<Header><Avatar user={user} /></Header>
```

---

### 15. 🔴 P0 [D] What is Derived State, and why is copying props into state an anti-pattern?

> **TL;DR:** Derived State is data that can be calculated dynamically during rendering from existing props or state. Copying props into `useState` (`const [email, setEmail] = useState(props.email)`) creates duplicated state that gets out of sync when props update.

#### 💡 Core Concept & Explanation
If you can compute a value during render (e.g. `fullName = firstName + ' ' + lastName` or `activeCount = items.filter(...).length`), compute it as a plain variable inside the component body! Do not store it in a separate `useState`.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// INCORRECT (Anti-pattern: Duplicated / Synced State in useState):
function UserProfile({ firstName, lastName }) {
  const [fullName, setFullName] = useState(firstName + ' ' + lastName); // ❌ Out of sync when props change!
}

// CORRECT (Calculated Derived State during render):
function UserProfile({ firstName, lastName }) {
  const fullName = `${firstName} ${lastName}`; // ✅ Computed instantly, always 100% in sync!
}
```

---

### 16. 🟠 P1 [Q] Controlled vs Uncontrolled Components: What is the difference?

> **TL;DR:** **Controlled Components** let React drive input values via `useState` and `onChange` handlers (single source of truth). **Uncontrolled Components** let the DOM maintain input state internally, accessed via `useRef`.

#### 💡 Core Concept & Explanation
Comparison breakdown:

#### 🛠️ Code / Visual Diagram / Table

```jsx
// CONTROLLED (React manages state on every keypress):
function ControlledInput() {
  const [val, setVal] = useState('');
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// UNCONTROLLED (DOM manages state, read on submit via ref):
function UncontrolledInput() {
  const inputRef = useRef();
  const handleSubmit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} defaultValue="Initial" />;
}
```

---

### 17. 🟠 P1 [D] How should form state be handled in React?

> **TL;DR:** Use **Controlled Inputs** for real-time validation / dynamic inputs. Use **Uncontrolled Form Data (`new FormData(e.target)`)** or libraries like **React Hook Form / Formik** for large forms to avoid expensive re-renders on every keystroke.

---

## 3. Core Hooks Deep-Dive (`useState`, `useEffect`, `useRef`, `useContext`)

### 18. 🔴 P0 [C] What are React Hooks? What are the Two Fundamental Rules of Hooks?

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

---

### 19. 🔴 P0 [Q] How does `useState` batch state updates?

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

---

### 20. 🔴 P0 [Q] How does `useEffect` work? Explain its 3 dependency array behaviors.

> **TL;DR:** `useEffect` runs side effects (data fetching, DOM listeners, subscriptions) after rendering. Dependency array options: `no array` (runs after EVERY render), `[]` (runs ONCE on mount), `[a, b]` (runs on mount AND when `a` or `b` changes).

#### 💡 Core Concept & Explanation
Behavior matrix:

#### 🛠️ Code / Visual Diagram / Table

```jsx
// 1. No Dependency Array -> Runs after EVERY render
useEffect(() => { console.log('Rendered!'); });

// 2. Empty Array [] -> Runs ONCE after initial mount (like componentDidMount)
useEffect(() => { fetchData(); }, []);

// 3. Array with Dependencies [user] -> Runs on mount + whenever 'user' reference changes
useEffect(() => { fetchUserData(user.id); }, [user.id]);
```

---

### 21. 🔴 P0 [Q] What is the Cleanup Function in `useEffect`? When does it run?

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

---

### 22. 🔴 P0 [Q] What is the Stale Closure problem in `useEffect` or callbacks, and how do you fix it?

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

---

### 23. 🔴 P0 [Q] What is `useRef`? How does it differ from `useState`?

> **TL;DR:** `useRef` returns a mutable object `{ current: value }` that persists across renders. Changing `ref.current` **does NOT trigger a component re-render**, unlike `useState`.

#### 💡 Core Concept & Explanation
Use `useState` for data rendered on the screen. Use `useRef` for hidden data that needs to persist across renders without affecting the visual UI (e.g., storing timer IDs, DOM nodes, previous state).

#### 🛠️ Code / Visual Diagram / Table

| Property | `useState` | `useRef` |
| :--- | :--- | :--- |
| **Return Value** | State value + Setter function | Mutable object `{ current: initialValue }` |
| **Re-render Trigger** | **Triggers Re-render** when state updates | ❌ **No Re-render** when `current` changes |
| **Primary Use** | Rendered UI data & interactive state | Direct DOM references, timer IDs, non-UI variables |

---

### 24. 🔴 P0 [Q] What are common real-world use cases for `useRef`?

> **TL;DR:** 1. Accessing DOM elements (`inputRef.current.focus()`). 2. Storing timer/interval IDs (`clearInterval(timerRef.current)`). 3. Storing previous prop/state values across renders.

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

---

### 25. 🔴 P0 [Q] What is `useContext`? What is its primary re-rendering performance drawback?

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

---

### 26. 🟠 P1 [Q] How do you replace class component lifecycle methods with `useEffect`?

> **TL;DR:** `componentDidMount` = `useEffect(fn, [])`. `componentDidUpdate` = `useEffect(fn, [dep])`. `componentWillUnmount` = cleanup function returned from `useEffect`.

#### 💡 Core Concept & Explanation
`useEffect` handles side-effect synchronization rather than lifecycle timeline steps.

---

## 4. Advanced & Performance Hooks (`useMemo`, `useCallback`, `useLayoutEffect`, Custom Hooks)

### 27. 🔴 P0 [P] What is `useMemo`? What problem does it solve?

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

---

### 28. 🔴 P0 [P] What is `useCallback`? How does `useCallback` differ from `useMemo`?

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

---

### 29. 🔴 P0 [P] When should you NOT use `useMemo` or `useCallback`?

> **TL;DR:** Do NOT use them for simple/cheap operations or when passing callbacks to standard HTML elements (`<button onClick>`). The memory and execution overhead of `useMemo`/`useCallback` dependency array checks is higher than re-running cheap functions!

#### 💡 Core Concept & Explanation
Premature optimization anti-pattern. Only use `useMemo`/`useCallback` when:
1. Computation is demonstrably slow (e.g. processing 10,000 array items).
2. Passing function/object props to a child component wrapped in `React.memo`.
3. Function is used as a dependency in another `useEffect`.

---

### 30. 🔴 P0 [D] What is a Custom Hook? How do you extract reusable stateful logic?

> **TL;DR:** A Custom Hook is a JavaScript function whose name starts with `use` and that can call other React Hooks. It extracts reusable stateful logic (e.g. data fetching, event listeners) away from UI components.

#### 💡 Core Concept & Explanation
Custom Hook pattern:

#### 🛠️ Code / Visual Diagram / Table

```jsx
// Custom Hook for Window Window Resize Tracking
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

---

### 31. 🟠 P1 [Q] What is `useLayoutEffect`? How does it differ from `useEffect`?

> **TL;DR:** `useEffect` runs **asynchronously AFTER** the browser paints the screen. `useLayoutEffect` runs **synchronously BEFORE** the browser paints, preventing visual UI flicker when measuring DOM elements.

#### 💡 Core Concept & Explanation
Use `useEffect` by default for 99% of tasks. Use `useLayoutEffect` only when measuring DOM element dimensions (`getBoundingClientRect()`) and immediately mutating the DOM to prevent visual layout flashing.

---

### 32. 🟠 P1 [Q] What is `forwardRef` and `useImperativeHandle`?

> **TL;DR:** `forwardRef` lets a parent component pass a `ref` down to a child DOM node. `useImperativeHandle` customizes the ref handle instance exposed to the parent (restricting access to specific methods like `.focus()`).

---

### 33. 🟡 P2 [Q] What is `useId` in React 18?

> **TL;DR:** `useId` generates unique, stable IDs across server and client rendering, preventing SSR hydration mismatch errors on accessibility attributes (`htmlFor`, `aria-describedby`).

---

## 5. Re-rendering, Reconciliation & Performance Optimization

### 34. 🔴 P0 [C] What exact 4 triggers cause a React component to re-render?

> **TL;DR:** A component re-renders when: 1. Its **State** updates. 2. Its **Parent** component re-renders. 3. A **Context** it consumes updates. 4. Its **Props** reference changes.

#### 💡 Core Concept & Explanation
Understanding that **a child re-renders automatically when its parent re-renders** (regardless of whether props changed) is the foundation of React performance tuning!

---

### 35. 🔴 P0 [P] What is `React.memo`? How does shallow prop comparison work?

> **TL;DR:** `React.memo` is a Higher-Order Component that skips re-rendering a component if its props have not changed (using shallow equality `prevProps === nextProps`).

#### 💡 Core Concept & Explanation
By default, when Parent renders, Child renders. Wrapping Child in `React.memo(Child)` stops this automatic re-render unless a prop reference actually changes.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const MemoizedChild = React.memo(function Child({ name }) {
  return <div>{name}</div>;
});
```

#### ⚠️ Interview Pitfall / Pro-Tip
If you pass an inline function `onClick={() => {}}` or inline object `style={{ margin: 0 }}` to a `React.memo` component, shallow comparison **fails** every time because inline objects create new RAM references!

---

### 36. 🔴 P0 [P] Why are `keys` mandatory when rendering lists in React?

> **TL;DR:** `key` props give elements a stable identity across renders. React's Diffing algorithm uses keys to match old list nodes with new list nodes, determining whether items were **added, removed, or reordered**.

---

### 37. 🔴 P0 [P] Why is using array index as a `key` (`key={index}`) an anti-pattern for dynamic lists?

> **TL;DR:** Using index as key causes UI state corruption bugs when list items are reordered, inserted at top, or deleted. React matches items by index number instead of item identity, attaching old DOM state to wrong items!

#### 💡 Core Concept & Explanation
If item 0 ("Apple") is deleted from `["Apple", "Banana"]`, "Banana" becomes index 0. React sees key `0` still exists and reuses item 0's old DOM node and un-reset input state!

#### 🛠️ Code / Visual Diagram / Table

```jsx
// BAD (Index key causes input state bugs on item deletion!):
{items.map((item, index) => <TodoItem key={index} item={item} />)}

// GOOD (Stable unique ID key):
{items.map(item => <TodoItem key={item.id} item={item} />)}
```

---

### 38. 🔴 P0 [P] How can Component Composition (passing `children`) prevent parent re-renders from cascading down without `React.memo`?

> **TL;DR:** Move state down into a smaller container or pass heavy children via `props.children`. Because `children` is instantiated in the un-rendered outer parent, React skips re-rendering the `children` subtree!

#### 💡 Core Concept & Explanation
Powerful performance pattern without `React.memo`:

#### 🛠️ Code / Visual Diagram / Table

```jsx
// Moving State Down / Children Slot:
function ScrollContainer({ children }) {
  const [scrollPos, setScrollPos] = useState(0); // State updates here
  return (
    <div onScroll={e => setScrollPos(e.target.scrollTop)}>
      {children} {/* ✅ 'children' DOES NOT RE-RENDER when scrollPos changes! */}
    </div>
  );
}
```

---

### 39. 🔴 P0 [P] What is Code Splitting in React? How do `React.lazy()` and `Suspense` work?

> **TL;DR:** Code splitting breaks large JS bundles into smaller chunks loaded dynamically on demand. `React.lazy()` dynamically imports components, and `<Suspense>` displays a loading fallback while the JS chunk downloads.

#### 💡 Core Concept & Explanation
Bundling an entire app into 1 bundle forces users to download 5MB of JS on initial load. Code splitting loads heavy admin routes or charts only when navigated to.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function AnalyticsPage() {
  return (
    <Suspense fallback={<div>Loading Chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}
```

---

### 40. 🟠 P1 [P] What is Virtualization / Windowing (`react-window`)?

> **TL;DR:** Virtualization renders **only the visible rows** inside the browser viewport (e.g. 20 DOM nodes out of 100,000 total items), updating visible content on scroll to maintain 60 FPS performance.

---

### 41. 🟠 P1 [P] HOCs vs Render Props vs Hooks?

> **TL;DR:** HOCs and Render Props were legacy patterns for sharing stateful logic. Custom Hooks replaced both because Hooks avoid "wrapper hell" (deeply nested component trees).

---

## 6. State Management & Data Fetching Architecture

### 42. 🔴 P0 [D] Local State vs Context API vs External Store (Zustand / Redux): How do you decide where state lives?

> **TL;DR:** 1. **Local State (`useState`):** UI toggle, single component form. 2. **Lifted State / Context:** Small global themes/auth. 3. **Zustand / Redux:** Complex high-frequency shared app state. 4. **TanStack Query:** Server API data.

---

### 43. 🔴 P0 [D] Why is fetching data inside raw `useEffect` an anti-pattern in modern React?

> **TL;DR:** Raw `useEffect` fetching causes **race conditions** (out-of-order network responses), **network waterfalls**, missing cancellation (`AbortController`), and lacks caching/deduplication out of the box.

---

### 44. 🔴 P0 [Q] How do you handle race conditions during API data fetching using `AbortController`?

> **TL;DR:** Use `AbortController` in `useEffect` cleanup to cancel inflight HTTP requests when dependencies change.

#### 💡 Core Concept & Explanation
Handling async response ordering:

#### 🛠️ Code / Visual Diagram / Table

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${userId}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  // CLEANUP: Aborts network request if userId changes before response arrives!
  return () => controller.abort();
}, [userId]);
```

---

### 45. 🔴 P0 [D] What is Server State vs Client State? Why use TanStack Query?

> **TL;DR:** **Client State** is local UI data (open modals, input tabs). **Server State** is remote data owned by DB APIs. TanStack Query manages caching, refetching, background deduplication, and stale data automatically.

---

### 46. 🟠 P1 [D] How does Redux Toolkit (RTK) simplify state management over legacy Redux?

> **TL;DR:** RTK removes legacy Redux boilerplate by combining actions and reducers into `createSlice()`, using **Immer** under the hood for immutable state mutations (`state.value += 1`), and including Redux Thunk by default.

---

### 47. 🟠 P1 [D] What is Zustand, and why is it popular?

> **TL;DR:** Zustand is a lightweight (~1KB) state management store. Unlike Context API, components using Zustand **only re-render when their selected state slice changes**, eliminating Context re-render bloat without providers.

---

## 7. React 18 & Concurrent Features

### 48. 🔴 P0 [C] What is Automatic Batching in React 18?

> **TL;DR:** React 18 automatically batches **ALL** state updates (inside promises, `setTimeout`, native events) into a single re-render cycle. In React 17, batching only occurred inside React event handlers.

---

### 49. 🔴 P0 [C] What is Concurrent Rendering in React 18?

> **TL;DR:** Concurrent Rendering allows React to interrupt, pause, or resume rendering a heavy component tree to respond immediately to urgent user input events (clicks/typing).

---

### 50. 🔴 P0 [Q] What is `useTransition`?

> **TL;DR:** `useTransition` marks specific state updates as **non-urgent transitions**, allowing React to keep the UI responsive for urgent inputs (typing) while rendering heavy filtered lists in the background.

#### 💡 Core Concept & Explanation
Code usage pattern:

#### 🛠️ Code / Visual Diagram / Table

```jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [listQuery, setListQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // Urgent update (typing responsiveness)
    startTransition(() => {
      setListQuery(e.target.value); // Non-urgent update (heavy filtering)
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <HeavyList query={listQuery} />}
    </div>
  );
}
```

---

### 51. 🔴 P0 [Q] What is `useDeferredValue`? How does it differ from `useDebounce`?

> **TL;DR:** `useDeferredValue` defers updating a non-critical value until urgent renders finish. Unlike `useDebounce` (fixed delay timer like 300ms), `useDeferredValue` adapts dynamically to user device hardware speed with 0 fixed delay.

---

### 52. 🔴 P0 [C] Why does React 18 `StrictMode` run `useEffect` twice in development?

> **TL;DR:** `StrictMode` intentionally mounts, unmounts, and remounts components in development to test if effects correctly clean up side-effects (timers, subscriptions) for future React features like offscreen state preservation.

---

### 53. 🟠 P1 [C] What is Hydration in React SSR, and what causes Hydration Mismatch Errors?

> **TL;DR:** Hydration attaches JS event listeners to server-rendered HTML. Hydration mismatch errors occur when server HTML output differs from initial client render output (e.g. rendering `new Date()` or `window.innerWidth`).

---

## 8. React 19, Server Components & Modern Ecosystem

### 54. 🔴 P0 [C] What are React Server Components (RSC)?

> **TL;DR:** Server Components execute **exclusively on the server** during build/request time. They render to raw UI streams without sending JavaScript component code to the client bundle.

#### 💡 Core Concept & Explanation
Comparison:

#### 🛠️ Code / Visual Diagram / Table

| Feature | Server Components (RSC) | Client Components (`"use client"`) |
| :--- | :--- | :--- |
| **Execution** | Runs **only on Server** | Runs on Server (initial HTML) & **Client** |
| **JS Bundle Size** | **0 KB** sent to browser | Included in client JS bundle |
| **Direct DB Access** | ✅ Yes (`await db.query()`) | ❌ No (Must call REST/GraphQL API) |
| **Interactivity** | ❌ No (`useState`, `onClick` forbidden) | ✅ Full (`useState`, `useEffect`, `onClick`) |

---

### 55. 🔴 P0 [C] What are the benefits of Server Components?

> **TL;DR:** Zero client bundle size, direct access to backend database/filesystem, automatic security (API secrets stay on server), and reduced network waterfalling.

---

### 56. 🔴 P0 [Q] What are React 19 Actions (`useActionState`)?

> **TL;DR:** React 19 Actions handle async transitions and form submissions natively, providing pending states, optimistic updates, and automatic error handling via `useActionState` and `useFormStatus`.

---

### 57. 🔴 P0 [Q] What is `useOptimistic` in React 19?

> **TL;DR:** `useOptimistic` displays an **instant optimistic state update** on screen while an async server action completes, reverting automatically if the server action fails.

#### 💡 Core Concept & Explanation
Code pattern for instant UI feedback:

#### 🛠️ Code / Visual Diagram / Table

```jsx
function LikeButton({ currentLikes, onLike }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    currentLikes,
    (state, newAmount) => state + newAmount
  );

  const handleLike = async () => {
    setOptimisticLikes(1); // Instant UI update!
    await onLike();        // Server Action
  };

  return <button onClick={handleLike}>Likes: {optimisticLikes}</button>;
}
```

---

### 58. 🔴 P0 [C] What is an Error Boundary in React?

> **TL;DR:** Error Boundaries catch JavaScript errors anywhere in their child component tree, log errors, and render a fallback UI. They must currently use Class Components (`componentDidCatch`).

---

### 59. 🔴 P0 [C] How does React prevent Cross-Site Scripting (XSS) attacks by default?

> **TL;DR:** React automatically **escapes strings** inside JSX expressions `{}` before rendering them to DOM. Using `dangerouslySetInnerHTML={{ __html: userString }}` bypasses escaping and creates XSS risks.

---

### 60. 🟠 P1 [D] How do you test React components effectively (React Testing Library)?

> **TL;DR:** Test **component behavior from the user's perspective** (e.g. `screen.getByRole('button', { name: /submit/i })`), rather than implementation details (internal state/class names).

---

## 9. Practical Coding Exercises & Scenario Drills

### 61. 🔴 P0 [Q] Build a custom `useDebounce(value, delay)` hook in React.

> **TL;DR:** Custom debouncing hook implementation.

#### 💡 Core Concept & Explanation
Delays updating value until user stops typing for `delay` ms.

#### 🛠️ Code / Visual Diagram / Table

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

### 62. 🔴 P0 [Q] Build a custom `useLocalStorage(key, initialValue)` hook.

> **TL;DR:** Sync state automatically with `window.localStorage`.

#### 🛠️ Code / Visual Diagram / Table

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
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
}
```

---

### 63. 🔴 P0 [Q] Build an Search Autocomplete component with API debouncing.

> **TL;DR:** Implementation template using `useDebounce` and input state.

#### 🛠️ Code / Visual Diagram / Table

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

### 64. 🔴 P0 [Q] Build a dynamic Form without third-party libraries.

> **TL;DR:** Single-object state handler pattern.

```jsx
function Form() {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return <input name="username" value={formData.username} onChange={handleChange} />;
}
```

---

### 65. 🔴 P0 [Q] Build a Modal Dialog using React Portals (`createPortal`).

> **TL;DR:** Render modal DOM nodes outside parent hierarchy into `document.body`.

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

### 66. 🔴 P0 [Q] Implement Infinite Scroll using `IntersectionObserver`.

> **TL;DR:** Sentinel element tracking with `useRef` and `IntersectionObserver`.

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

### 67. 🔴 P0 [Q] Implement a Theme Provider using Context API.

> **TL;DR:** Theme context with light/dark state.

```jsx
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
```

---

### 68. 🟠 P1 [Q] Build a Star Rating Component.

---

### 69. 🟠 P1 [Q] Build an Accordion / Tree View Component.

---

### 70. 🟠 P1 [Q] Build an Image Carousel Slider.

---

## 10. System Design & Micro-Frontend Architecture

### 71. 🔴 P0 [D] How would you architect a large enterprise React application?

> **TL;DR:** Use Feature-Based folder structure (`src/features/auth`, `src/features/cart`), clear module boundaries, barrel exports, shared UI primitives, and isolated state slices.

---

### 72. 🔴 P0 [D] How do you handle Global Error Handling and Telemetry in React?

> **TL;DR:** Wrap routes with Error Boundaries for fallback UIs, intercept global uncaught errors via `window.onerror`, and stream error metrics to telemetry tools (Sentry/LogRocket).

---

### 73. 🟠 P1 [D] What is Micro-Frontend Architecture (Module Federation)?

> **TL;DR:** Splitting a large monolithic frontend into independently built, tested, and deployed React applications loaded dynamically at runtime via Webpack 5 Module Federation.

---

### 74. 🟠 P1 [D] How do you manage Design Systems and UI Component Libraries?

> **TL;DR:** Use headless unstyled UI primitives (Radix UI / Shadcn UI) for accessibility + Tailwind CSS for design tokens + Storybook for isolated component documentation.

---

### 75. 🟠 P1 [D] Single Page Applications (SPA) vs SSR (Next.js) vs SSG?

> **TL;DR:** **SPA (Vite):** Client-side rendering, best for private admin dashboards. **SSR (Next.js):** Dynamic server rendering per request, best for SEO & e-commerce. **SSG:** Pre-rendered HTML at build time, best for static blogs/docs.

---

_End of Master Answer Key — Synchronized with `react-interview-questions.md`._

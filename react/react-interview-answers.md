# React & Next.js Full-Stack Master Answer Key (Comprehensive Edition)

Companion answer key to `react-interview-questions.md`. Every single answer strictly follows our standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
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

#### ⚠️ Interview Pitfall / Pro-Tip
The Virtual DOM is **not** inherently faster than direct handwritten raw DOM operations for a single element; its power lies in providing deterministic, automated performance at scale across complex application trees without manual DOM tracking.

---

### 4. 🔴 P0 [C] What is One-Way Data Flow (Unidirectional Data Flow) in React, and why does it make state predictable?

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

### 5. 🟠 P1 [C] What is the difference between Functional Components and Class Components? Why are Functional Components standard today?

> **TL;DR:** Functional Components are plain JavaScript functions using Hooks. Class Components extend `React.Component` and rely on `this` and lifecycle methods. Functional components paired with Hooks are standard due to cleaner code, zero `this` bugs, better minification, and simple custom logic reuse.

#### 💡 Core Concept & Explanation
Class components require ES6 class syntax, constructor boilerplate, and explicit `this` binding for event handlers. Functional components eliminate `this` confusion entirely and allow modular logic sharing via custom hooks instead of complex HOC wrapper chains.

#### 🛠️ Code / Visual Diagram / Table

| Feature | Functional Components (Modern) | Class Components (Legacy) |
| :--- | :--- | :--- |
| **Syntax** | Plain JS Function returning JSX | ES6 Class extending `React.Component` |
| **State** | `useState()` hook | `this.state` object & `this.setState()` |
| **Lifecycle** | `useEffect()` hook | `componentDidMount`, `componentDidUpdate`, etc. |
| **`this` Binding** | ❌ No `this` keyword needed | ⚠️ Must bind methods in constructor or arrow syntax |
| **Code Reuse** | Custom Hooks (clean composition) | HOCs & Render Props (wrapper hell) |

#### ⚠️ Interview Pitfall / Pro-Tip
Do not say "Class components are deprecated". They are still supported by React for backward compatibility, but 99% of modern production codebases write functional components exclusively.

---

### 6. 🟠 P1 [C] How does React handle events (`SyntheticEvent`)? How does it differ from native DOM event handling?

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

### 7. 🟠 P1 [C] Component Composition vs Inheritance: Why does React favor Composition over Class Inheritance?

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

#### ⚠️ Interview Pitfall / Pro-Tip
React core team has stated they have evaluated thousands of components at Meta and found zero use cases where class inheritance was superior to composition.

---

## 2. Functional Components, Props & State Modeling

### 8. 🔴 P0 [C] What are Props in React? Why must Props be strictly immutable?

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

#### ⚠️ Interview Pitfall / Pro-Tip
If a child needs to modify a value passed via props, the parent must pass down a callback function (e.g. `onUpdateName`) so the parent can update its own state immutably.

---

### 9. 🔴 P0 [C] What is State in React? How does State differ from Props?

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

#### ⚠️ Interview Pitfall / Pro-Tip
A common mistake is treating state as global by default. State should always be kept as local as possible, lifted up only when siblings require shared access.

---

### 10. 🔴 P0 [Q] Why must State be treated as immutable? Why should you never mutate state directly (`state.count = 5`)?

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

#### ⚠️ Interview Pitfall / Pro-Tip
For arrays, avoid mutating methods like `.push()`, `.pop()`, or `.sort()`. Use non-mutating alternatives like `[...arr, newItem]`, `.filter()`, `.map()`, or `[...arr].sort()`.

---

### 11. 🔴 P0 [Q] What is the functional state updater syntax (`setCount(prev => prev + 1)`), and when MUST you use it?

> **TL;DR:** The functional updater syntax passes a callback function `setCount(prevCount => prevCount + 1)` to the state setter. You **MUST** use it whenever the next state depends on the previous state to avoid reading stale closure state values during batched updates.

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

#### ⚠️ Interview Pitfall / Pro-Tip
Whenever state calculation involves `prev => ...`, the callback function must be pure and return the new state value without side-effects.

---

### 12. 🔴 P0 [D] What is "Lifting State Up" in React, and when should you apply it?

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

#### ⚠️ Interview Pitfall / Pro-Tip
Lifting state too high in the component tree causes unnecessary re-renders in unrelated child branches. Keep state at the *closest* common parent.

---

### 13. 🔴 P0 [D] What is Prop Drilling, and what are the best techniques to prevent it?

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

#### ⚠️ Interview Pitfall / Pro-Tip
Don't jump to Context API for every prop drilling issue! Component composition (slot pattern via `children`) solves 80% of prop drilling cases without Context overhead.

---

### 14. 🔴 P0 [D] What is Derived State, and why is copying props into state an anti-pattern?

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

#### ⚠️ Interview Pitfall / Pro-Tip
If calculating derived state is computationally expensive (e.g. filtering 10,000 array items), wrap the calculation in `useMemo()` rather than putting it in `useState`.

---

### 15. 🟠 P1 [Q] Controlled vs Uncontrolled Components: What is the difference, and when would you use an Uncontrolled Component?

> **TL;DR:** **Controlled Components** let React drive input values via `useState` and `onChange` handlers (single source of truth). **Uncontrolled Components** let the DOM maintain input state internally, accessed via `useRef`.

#### 💡 Core Concept & Explanation
Controlled inputs offer instant validation and conditional submit enabling. Uncontrolled inputs are useful for non-interactive forms, file inputs (`<input type="file" />`), or integrating with non-React DOM libraries.

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

#### ⚠️ Interview Pitfall / Pro-Tip
File inputs (`<input type="file" />`) in HTML are read-only and **must** be uncontrolled components in React because JavaScript cannot set their value programmatically for security reasons.

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

## 5. Re-rendering, Keys & Performance Optimization

### 30. 🔴 P0 [C] What causes a React component to re-render, and what does/doesn't trigger a re-render?

> **TL;DR:** A component re-renders when: 1. Its internal **State** changes. 2. Its **Parent** re-renders (unless wrapped in `React.memo`). 3. A **Context** it consumes changes. 4. An **External Store** it subscribes to emits a new value. Modifying `useRef.current` or local variables does **NOT** trigger a re-render.

#### 💡 Core Concept & Explanation
Components act as functions of state. When parent renders, child renders down the tree by default.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const ref = useRef(0);

  const handleRefInc = () => {
    ref.current += 1; // ❌ Modifying ref DOES NOT trigger re-render!
  };

  const handleStateInc = () => {
    setCount(c => c + 1); // ✅ Triggers Parent AND Child re-render!
  };

  return (
    <div>
      <button onClick={handleStateInc}>State: {count}</button>
      <Child />
    </div>
  );
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Props changing on a child component does **not** trigger a re-render directly; the child re-renders because its *parent* re-rendered to pass those new props!

---

### 31. 🔴 P0 [P] What is `React.memo` (Higher-Order Component)? How does shallow prop comparison work?

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

### 32. 🔴 P0 [P] Why are `keys` mandatory when rendering lists in React? What happens internally during Reconciliation if you omit keys?

> **TL;DR:** `key` props give elements a stable identity across renders. React's Diffing algorithm uses keys to match old list nodes with new list nodes, determining whether items were added, removed, or reordered.

#### 💡 Core Concept & Explanation
Without keys, React falls back to in-place node mutation. If an item is unshifted to the top of a list, React re-renders every single existing child node rather than moving the DOM node.

#### 🛠️ Code / Visual Diagram / Table

```
Without Keys (Re-renders ALL items):
Old List: [A, B] -> Insert X at start -> New List: [X, A, B]
React mutates DOM Node 0 (A->X), mutates Node 1 (B->A), appends Node 2 (B).

With Unique Keys (Moves existing DOM nodes):
React recognizes key 'A' and 'B', inserts 1 new DOM node for 'X', preserves 'A' & 'B'!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Keys must be unique among siblings, but do not need to be globally unique across the entire application.

---

### 33. 🔴 P0 [P] Why is using array index as a `key` (`key={index}`) an anti-pattern for dynamic lists? Show a scenario where it causes UI bugs.

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

#### ⚠️ Interview Pitfall / Pro-Tip
You can safely use index as a key ONLY if: 1. The list is static (never reordered or filtered). 2. Items have no internal state. 3. Items are never inserted or removed from the middle/top.

---

### 34. 🔴 P0 [P] How can Component Composition (passing `children`) prevent parent re-renders from cascading down without using `React.memo`?

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

#### ⚠️ Interview Pitfall / Pro-Tip
This pattern leverages JSX element evaluation timing—`children` was created when the outer component rendered, so its element reference remains identical.

---

### 35. 🔴 P0 [P] What is Code Splitting in React? How do `React.lazy()` and `Suspense` reduce initial JavaScript bundle size?

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

#### ⚠️ Interview Pitfall / Pro-Tip
`React.lazy` currently only supports default exports (`export default Component`), not named exports.

---

### 36. 🟠 P1 [P] What is Virtualization / Windowing (e.g. `react-window`), and how does it render lists of 100,000 items efficiently?

> **TL;DR:** Virtualization renders **only the visible rows** inside the browser viewport (e.g. 20 DOM nodes out of 100,000 total items), updating visible content on scroll to maintain 60 FPS performance.

#### 💡 Core Concept & Explanation
Rendering 100,000 DOM nodes crashes browser memory. Virtualization calculates scroll offset and renders a fixed container with absolute positioning for visible items only.

#### 🛠️ Code / Visual Diagram / Table

```
Total Items: [1 ...... 100,000]
Browser Viewport: [Renders Nodes 20 - 35 ONLY (15 Nodes in DOM!)]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Virtualization requires fixed or dynamically measurable row heights to calculate scroll positions accurately.

---

## 6. Client State Management & Data Fetching Basics

### 37. 🔴 P0 [D] Local State vs Context API vs External Store (Zustand / Redux Toolkit): How do you decide where state should live?

> **TL;DR:** 1. **Local State (`useState`):** UI toggle, single component form. 2. **Lifted State / Context:** Small global themes/auth. 3. **Zustand / Redux:** Complex high-frequency shared app state. 4. **TanStack Query:** Server API data.

#### 💡 Core Concept & Explanation
State decision matrix:

| State Type | Solution | Example |
| :--- | :--- | :--- |
| **Component Local** | `useState` / `useReducer` | Form input, Modal open/close |
| **Shared Feature** | Lifted State / Context | Tab selection, Accordion state |
| **Global App State** | Zustand / Redux Toolkit | User preferences, Shopping cart |
| **Server Cache** | TanStack Query / SWR | Users list, Product search API |

#### ⚠️ Interview Pitfall / Pro-Tip
Do not put server API response data into Redux/Zustand manually if you can use TanStack Query; managing loading, caching, and invalidation in Redux requires massive boilerplate.

---

### 38. 🔴 P0 [D] Why is fetching data inside raw `useEffect` considered an anti-pattern in modern React? (Race conditions, missing cleanup, network waterfalls).

> **TL;DR:** Raw `useEffect` fetching causes **race conditions** (out-of-order network responses), **network waterfalls**, missing cancellation (`AbortController`), and lacks caching/deduplication out of the box.

#### 💡 Core Concept & Explanation
If user clicks User 1 then User 2 rapidly, Response 1 might arrive *after* Response 2, leaving the UI showing User 1 data for User 2!

#### 🛠️ Code / Visual Diagram / Table

```
User Clicks 'A' ──> Fetch A Sent ────────────────────> Response A Arrives (Late!)
User Clicks 'B' ──> Fetch B Sent ──> Response B Arrives
Result: UI displays stale Response A data!
```

#### ⚠️ Interview Pitfall / Pro-Tip
In React 18 `StrictMode` development, `useEffect` fires twice on mount, causing duplicate fetch requests if unmanaged.

---

### 39. 🔴 P0 [Q] How do you handle race conditions during API data fetching in React using `AbortController`?

> **TL;DR:** Use `AbortController` in `useEffect` cleanup to cancel inflight HTTP requests when dependencies change.

#### 🛠️ Code / Visual Diagram / Table

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

#### ⚠️ Interview Pitfall / Pro-Tip
Remember to ignore `AbortError` in your `.catch()` block, otherwise canceled requests will mistakenly trigger user-facing error UI alerts!

---

### 40. 🔴 P0 [D] What is Server State vs Client State? Why are dedicated data-fetching libraries (TanStack Query / SWR) preferred over Redux for API data?

> **TL;DR:** **Client State** is local UI data (open modals, input tabs). **Server State** is remote data owned by DB APIs. TanStack Query manages caching, refetching, background deduplication, and stale data automatically.

#### 💡 Core Concept & Explanation
Server state is asynchronous, shared remotely, and can become stale without client knowledge. TanStack Query treats API data as a cached server snapshot.

#### ⚠️ Interview Pitfall / Pro-Tip
Using Redux for API data requires writing manual actions for `REQUEST`, `SUCCESS`, `FAILURE`, cache timers, and refetch listeners. TanStack Query does all of this in 1 line: `useQuery({ queryKey: ['users'], queryFn: fetchUsers })`.

---

### 41. 🟠 P1 [D] How does Redux Toolkit (RTK) simplify state management over legacy Redux (slices, `createAsyncThunk`)?

> **TL;DR:** RTK removes legacy Redux boilerplate by combining actions and reducers into `createSlice()`, using **Immer** under the hood for immutable state mutations (`state.value += 1`), and including Redux Thunk by default.

#### 💡 Core Concept & Explanation
Legacy Redux required separate files for Action Types, Actions, Reducers, and Switch statements. RTK unifies them.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; } // Immer handles immutability!
  }
});
```

#### ⚠️ Interview Pitfall / Pro-Tip
Immer allows writing "mutable" syntax (`state.push()`), but it converts it to immutable copies under the hood. Do not return a new state AND mutate `state` simultaneously in Immer!

---

### 42. 🟠 P1 [D] What is Zustand, and why is it popular as a lightweight alternative to Redux and Context API?

> **TL;DR:** Zustand is a lightweight (~1KB) state management store. Components using Zustand **only re-render when their selected state slice changes**, eliminating Context re-render bloat without providers.

#### 💡 Core Concept & Explanation
Zustand uses a pub/sub store outside React's component tree. Components subscribe to exact slices via selectors.

#### 🛠️ Code / Visual Diagram / Table

```javascript
const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));

// Component only re-renders when 'bears' value changes:
function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} bears around here...</h1>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always use selectors (`useStore(state => state.bears)`) instead of destructuring the whole store (`useStore()`), otherwise your component re-renders on any store update.

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

### 44. 🔴 P0 [D] What is CORS (Cross-Origin Resource Sharing), why does it happen when React calls a Node/Express backend, and how do you resolve it?

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

#### ⚠️ Interview Pitfall / Pro-Tip
CORS is enforced by the **browser**, not the server! Server-to-server HTTP requests (e.g. Postman or Next.js Server Components) never trigger CORS errors.

---

### 45. 🔴 P0 [D] How does Authentication work in a Full-Stack React application? Explain the JWT access token + refresh token flow.

> **TL;DR:** Upon login, the backend issues a short-lived **Access Token** (15 mins) and a long-lived **Refresh Token** (7 days). React attaches the Access Token to `Authorization: Bearer <token>` headers. When it expires (401 error), an Axios/fetch interceptor uses the Refresh Token to get a new Access Token seamlessly.

#### 💡 Core Concept & Explanation
Security flow breakdown:

#### 🛠️ Code / Visual Diagram / Table

```
[ React App ] ─── 1. POST /api/login ──────────────> [ Node Backend ]
[ React App ] <── 2. Returns Access Token + Cookie ── [ Node Backend ]
[ React App ] ─── 3. GET /api/data (Bearer Token) ─> [ Node Backend ]
[ React App ] <── 4. 401 Unauthorized (Expired) ──── [ Node Backend ]
[ React App ] ─── 5. POST /api/refresh ─────────────> [ Node Backend ]
[ React App ] <── 6. New Access Token ────────────── [ Node Backend ]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Never store long-lived access tokens without expiration checks. If an access token is compromised, a 15-minute expiration limits attacker window.

---

### 46. 🔴 P0 [D] Storage Security Debate: `HttpOnly Cookies` vs `localStorage` for JWT tokens—which should you use and why?

> **TL;DR:** **HttpOnly, Secure, SameSite Cookies** are vastly superior for storing Refresh Tokens because client-side JavaScript cannot read them, making them immune to XSS (Cross-Site Scripting) attacks. `localStorage` is vulnerable to XSS malicious script theft.

#### 💡 Core Concept & Explanation
Comparison matrix:

#### 🛠️ Code / Visual Diagram / Table

| Storage Location | XSS Vulnerability | CSRF Vulnerability | Recommendation |
| :--- | :--- | :--- | :--- |
| **`localStorage`** | ❌ **High Risk** (Any 3rd party script can steal tokens) | ✅ Immune | Avoid for sensitive tokens |
| **`HttpOnly Cookie`** | ✅ **Immune** (JS cannot read cookie) | ⚠️ Vulnerable (Mitigate via `SameSite=Strict` & CSRF tokens) | 🟢 **Industry Standard** |

#### ⚠️ Interview Pitfall / Pro-Tip
If using cookies across domains, set `SameSite=Lax` or `SameSite=None; Secure` and enable `credentials: 'include'` on client fetch requests.

---

### 47. 🔴 P0 [Q] How do you build a `<ProtectedRoute>` component in React to restrict access to authenticated users?

> **TL;DR:** Create a wrapper component that checks authentication state from Context/Auth Hook. If authenticated, render `<Outlet />` or `children`; if not, render `<Navigate to="/login" replace />`.

#### 💡 Core Concept & Explanation
Restricts unauthorized route rendering while waiting for async auth verification.

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

#### ⚠️ Interview Pitfall / Pro-Tip
Always handle the `isLoading` initial state check! Otherwise, unauthenticated redirect triggers before session revalidation completes on page refresh.

---

### 48. 🔴 P0 [D] How do you persist authentication state across page refreshes and implement a clean logout mechanism in React?

> **TL;DR:** On app initialization, run a `useAuth` effect that calls a `/api/me` or `/api/refresh` endpoint to restore user session state from HttpOnly cookies. On logout, call `/api/logout` to clear server cookies and reset local state to `null`.

#### 💡 Core Concept & Explanation
Page refreshes wipe JavaScript in-memory state. Calling a refresh endpoint on mount restores in-memory auth state securely.

#### 🛠️ Code / Visual Diagram / Table

```jsx
useEffect(() => {
  async function checkAuth() {
    try {
      const user = await fetchSession(); // GET /api/me
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }
  checkAuth();
}, []);
```

#### ⚠️ Interview Pitfall / Pro-Tip
On logout, ensure you also clear any cached client queries (e.g., `queryClient.clear()` in TanStack Query) so subsequent users on the same machine don't see stale cached data.

---

### 49. 🔴 P0 [Q] How do you handle API request timeouts and global network error handling in React?

> **TL;DR:** Use `AbortSignal.timeout(5000)` or Axios interceptors to enforce request timeouts, and wrap top-level route layouts in Error Boundaries or global toast notification handlers.

#### 💡 Core Concept & Explanation
Prevent UI from hanging indefinitely on stalled backend servers.

#### 🛠️ Code / Visual Diagram / Table

```jsx
async function fetchWithTimeout(url, options = {}) {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out');
    throw err;
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always clear the `setTimeout` timer inside a `finally` or immediately after fetch completes to avoid background timer leaks.

---

### 50. 🟠 P1 [Q] How do you handle form submission from React to a backend API with field validation and error responses?

> **TL;DR:** Prevent default form submission (`e.preventDefault()`), disable submit button (`isSubmitting`), validate fields, send POST payload, and map backend validation error objects (e.g. 400 Bad Request) back to field error state.

#### 💡 Core Concept & Explanation
Bridge frontend client validation with backend API validation response schemas.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setFieldErrors({});

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!res.ok) {
    const errData = await res.json();
    setFieldErrors(errData.errors || { global: 'Registration failed' });
  } else {
    navigate('/dashboard');
  }
  setIsSubmitting(false);
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always disable the submit button while `isSubmitting === true` to prevent duplicate form submissions from rapid user double-clicking.

---

## 8. Next.js Architecture & Server Rendering

### 51. 🔴 P0 [C] Why use Next.js instead of a plain React Single Page Application (SPA)? What problems does Next.js solve (SEO, Initial Load, Full-Stack Routing)?

> **TL;DR:** Plain React SPAs render empty HTML (`<div id="root"></div>`) and execute all JS on the client (poor SEO, slow initial load). Next.js provides **Server-Side Rendering (SSR)**, automatic code splitting, file-system routing, built-in image/font optimization, and API route handlers out of the box.

#### 💡 Core Concept & Explanation
Next.js delivers HTML pre-populated with content from the server, giving instant First Contentful Paint (FCP) and full SEO indexing by web crawlers.

#### 🛠️ Code / Visual Diagram / Table

```
Plain React SPA (Client-Side Rendering):
Browser Downloads Empty HTML ──> Downloads 2MB JS Bundle ──> Client Executes JS ──> UI Visible (Slow FCP)

Next.js (Server-Side Rendering):
Server Renders Pre-populated HTML ──> Browser Displays UI Instantly (Fast FCP) ──> Hydrates Interactivity
```

#### ⚠️ Interview Pitfall / Pro-Tip
If your app is a private password-protected dashboard where SEO is irrelevant, a plain React SPA (Vite) can still be a simpler choice. Next.js shines for public, content-heavy, or full-stack apps.

---

### 52. 🔴 P0 [C] What are the rendering strategies in Next.js? Compare SSR, SSG, ISR, and CSR.

> **TL;DR:** 
> - **SSR (Server-Side Rendering):** Renders HTML on the server **for every incoming request** (best for real-time dynamic data like feeds).
> - **SSG (Static Site Generation):** Pre-renders HTML at **build time** (best for blogs/marketing pages).
> - **ISR (Incremental Static Regeneration):** Updates static pages in the background after a revalidation time without rebuilding the whole site.
> - **CSR (Client-Side Rendering):** Standard client-side React rendering (`"use client"` + `useEffect`).

#### 💡 Core Concept & Explanation
Rendering decision matrix:

#### 🛠️ Code / Visual Diagram / Table

| Strategy | When HTML Generated | Use Case | Next.js API |
| :--- | :--- | :--- | :--- |
| **SSG** | At Build Time | Blogs, Docs, Landing pages | Default in App Router |
| **ISR** | Background revalidation | E-commerce product catalog | `fetch(url, { next: { revalidate: 60 } })` |
| **SSR** | On every request | User feeds, Financial dashboards | `fetch(url, { cache: 'no-store' })` |
| **CSR** | In browser | Interactive widgets, Canvas | `"use client"` + `useEffect` |

#### ⚠️ Interview Pitfall / Pro-Tip
In Next.js App Router, pages are static by default unless you use dynamic functions (like `cookies()`, `headers()`) or un-cached `fetch` calls.

---

### 53. 🔴 P0 [C] What are React Server Components (RSC)? How do Server Components differ from Client Components (`"use client"`) in Next.js?

> **TL;DR:** Server Components execute **exclusively on the server** during request/build time, sending **0 KB JS** to the browser bundle. Client Components (`"use client"`) run on both server (for HTML) and client, enabling interactivity (`useState`, `useEffect`, event listeners).

#### 💡 Core Concept & Explanation
RSC allows executing heavy node packages or direct database queries on the server without shipping dependencies to the client.

#### 🛠️ Code / Visual Diagram / Table

| Feature | Server Components (RSC - Default) | Client Components (`"use client"`) |
| :--- | :--- | :--- |
| **Execution** | Runs **only on Server** | Runs on Server (initial HTML) & **Client** |
| **JS Bundle Size** | **0 KB** sent to browser | Included in client JS bundle |
| **Direct DB Access** | ✅ Yes (`await db.query()`) | ❌ No (Must call API endpoint) |
| **Interactivity** | ❌ No (`useState`, `onClick` forbidden) | ✅ Full (`useState`, `useEffect`, `onClick`) |

#### ⚠️ Interview Pitfall / Pro-Tip
Adding `"use client"` at the top of a file does **not** mean the component runs ONLY in the browser; it is still pre-rendered into HTML on the server during initial page load!

---

### 54. 🔴 P0 [D] Where should you place the `"use client"` boundary in a Next.js application, and why should you push client components to the leaf nodes of your component tree?

> **TL;DR:** Push `"use client"` as far down the component tree as possible (to leaf node interactive elements). Keep parent pages and layouts as Server Components to maximize server data fetching and minimize client JS bundle size.

#### 💡 Core Concept & Explanation
When a component has `"use client"`, all components imported into it automatically become client components too! Push `"use client"` down to button/toggle leafs.

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

#### ⚠️ Interview Pitfall / Pro-Tip
You can pass Server Components *as `children` props* into Client Components without turning the Server Components into client components!

---

### 55. 🔴 P0 [D] App Router vs Pages Router in Next.js: What are the main directory structure and architectural differences (`layout.tsx`, `page.tsx`, `loading.tsx`)?

> **TL;DR:** **App Router (`app/` directory)** is the modern Next.js architecture built on React Server Components, nested layouts (`layout.tsx`, `page.tsx`, `loading.tsx`), and granular caching. **Pages Router (`pages/` directory)** is legacy, using `getServerSideProps` and client-rendered component trees.

#### 💡 Core Concept & Explanation
App router uses special file conventions for nested UI states.

#### 🛠️ Code / Visual Diagram / Table

```
app/
├── layout.tsx      <-- Persistent shell across child routes
├── page.tsx        <-- Main route UI
├── loading.tsx     <-- Automatic React Suspense fallback UI
├── error.tsx       <-- Automatic React Error Boundary fallback
└── api/
    └── route.ts    <-- REST API endpoint handler
```

#### ⚠️ Interview Pitfall / Pro-Tip
In App Router, `error.tsx` **must** be a Client Component (`"use client"`).

---

### 56. 🔴 P0 [Q] How do Server Actions (`"use server"`) work in Next.js, and how do they replace traditional API route handlers for form mutations?

> **TL;DR:** Server Actions are asynchronous functions executed on the server that can be invoked directly from HTML forms or client components, eliminating the need to write manual API routes for data mutations.

#### 💡 Core Concept & Explanation
Server actions handle form submission and data revalidation seamlessly.

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

#### ⚠️ Interview Pitfall / Pro-Tip
Always validate incoming `formData` inside Server Actions (e.g. with Zod) because Server Actions create public HTTP POST endpoints under the hood.

---

### 57. 🔴 P0 [Q] What are Route Handlers (`app/api/route.ts`) in Next.js, and how do you build custom REST API endpoints inside Next.js?

> **TL;DR:** Route Handlers allow you to create custom HTTP request handlers (GET, POST, PUT, DELETE) for a given route using the Web Request and Response APIs.

#### 💡 Core Concept & Explanation
Replaces legacy `pages/api` handlers with modern Web API Request/Response standards.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.query('SELECT * FROM users');
  return NextResponse.json(users);
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Do not call Route Handlers from Server Components using `fetch()`! Server Components can call database queries directly in their body.

---

### 58. 🔴 P0 [D] How does Next.js Middleware (`middleware.ts`) work, and how do you use it for server-side auth redirects and request filtering?

> **TL;DR:** Middleware runs code **before a request is completed** on the Edge/Server runtime. Use it to inspect cookies/headers and perform instant server-side auth redirects (`NextResponse.redirect('/login')`).

#### 💡 Core Concept & Explanation
Runs before routes are rendered, stopping unauthenticated requests at the network edge.

#### 🛠️ Code / Visual Diagram / Table

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

#### ⚠️ Interview Pitfall / Pro-Tip
Middleware runs on the Edge runtime, meaning node-specific packages (like heavy ORMs or `fs` modules) cannot be used inside `middleware.ts`.

---

### 59. 🔴 P0 [P] How does Data Caching and Revalidation work in Next.js (`revalidatePath`, `revalidateTag`, time-based revalidation)?

> **TL;DR:** Next.js caches `fetch()` requests by default in the Server Data Cache. Purge stale cache using **Time-based revalidation** (`fetch(url, { next: { revalidate: 3600 } })`) or **On-Demand revalidation** (`revalidatePath('/posts')` / `revalidateTag('user-posts')`).

#### 💡 Core Concept & Explanation
Combines static speed with dynamic cache freshness.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Time-based (Cache for 1 hour):
fetch('https://api.com/data', { next: { revalidate: 3600 } });

// Tag-based (Purge on demand):
fetch('https://api.com/data', { next: { tags: ['posts'] } });
// In Server Action:
revalidateTag('posts');
```

#### ⚠️ Interview Pitfall / Pro-Tip
To opt out of caching completely for real-time requests, pass `{ cache: 'no-store' }` to `fetch()`.

---

### 60. 🔴 P0 [Q] What causes a Hydration Mismatch Error in Next.js (e.g. `new Date()`, `window`), and how do you fix it?

> **TL;DR:** A Hydration Mismatch occurs when the HTML generated on the server does not match the initial HTML rendered by the client (e.g. `new Date()`, `Math.random()`, or checking `window.innerWidth`). Fix using `suppressHydrationWarning` or running client-only checks inside `useEffect`.

#### 💡 Core Concept & Explanation
Server renders HTML at 10:00:00. Client hydrates JS at 10:00:02. The DOM timestamp text mismatches!

#### 🛠️ Code / Visual Diagram / Table

```jsx
// FIX: Run client-only date formatting inside useEffect
function Time() {
  const [time, setTime] = useState(null);
  useEffect(() => { setTime(new Date().toLocaleTimeString()); }, []);
  return <span>{time || 'Loading...'}</span>;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Do not abuse `suppressHydrationWarning` to suppress real DOM nesting errors (e.g., placing `<p>` inside `<p>` or `<div>` inside `<p>`).

---

### 61. 🟠 P1 [P] How do `next/image` and `next/font` optimize images and fonts to improve Google Core Web Vitals (LCP, CLS)?

> **TL;DR:** `<Image />` automatically serves WebP/AVIF formats, resizes images dynamically, prevents layout shifts (CLS) by requiring aspect ratios, and lazy-loads offscreen images. `next/font` zero-hosts Google Fonts locally to eliminate render-blocking external network requests.

#### 💡 Core Concept & Explanation
Protects Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).

#### 🛠️ Code / Visual Diagram / Table

```jsx
import Image from 'next/image';
import profilePic from './me.png';

<Image src={profilePic} alt="Profile" width={500} height={500} placeholder="blur" />
```

#### ⚠️ Interview Pitfall / Pro-Tip
For remote image URLs in `<Image />`, you must explicitly register the domain hostname inside `next.config.js` under `images.remotePatterns`.

---

## 9. Practical Coding Exercises & Scenario Drills

### 62. 🔴 P0 [Q] Build a custom `useDebounce(value, delay)` hook in React.

> **TL;DR:** Delays updating value until user stops typing for `delay` ms.

#### 💡 Core Concept & Explanation
Prevents firing API requests on every single keystroke.

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

#### ⚠️ Interview Pitfall / Pro-Tip
Make sure to clean up the timeout in the return callback so rapid typing resets the timer continuously.

---

### 63. 🔴 P0 [Q] Build a custom `useLocalStorage(key, initialValue)` hook.

> **TL;DR:** Sync state automatically with `window.localStorage`.

#### 💡 Core Concept & Explanation
Persists state across browser tab reloads with JSON serialization.

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
    } catch (err) { console.error(err); }
  };

  return [storedValue, setValue];
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Use lazy state initialization `useState(() => ...)` so `localStorage.getItem` is only called once on initial component mount, not on every render!

---

### 64. 🔴 P0 [Q] Build an Search Autocomplete component with API debouncing.

> **TL;DR:** Implementation template using `useDebounce` and input state.

#### 💡 Core Concept & Explanation
Combines input state, debounced value, and effect API fetching.

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

#### ⚠️ Interview Pitfall / Pro-Tip
Add a clear check `if (!query) setResults([])` to reset the UI list when the search input is cleared.

---

### 65. 🔴 P0 [Q] Build a dynamic Form without third-party libraries.

> **TL;DR:** Single-object state handler pattern for inputs.

#### 💡 Core Concept & Explanation
Uses input `name` attribute to update dynamic keys in a single form object state.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function Form() {
  const [formData, setFormData] = useState({ username: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </form>
  );
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Ensure input `name` attributes match state keys exactly (`name="email"` $\rightarrow$ `formData.email`).

---

### 66. 🔴 P0 [Q] Build a Modal Dialog using React Portals (`createPortal`).

> **TL;DR:** Render modal DOM nodes outside parent hierarchy into `document.body`.

#### 💡 Core Concept & Explanation
Bypasses parent CSS `overflow: hidden` or `z-index` stacking context issues.

#### 🛠️ Code / Visual Diagram / Table

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

#### ⚠️ Interview Pitfall / Pro-Tip
Call `e.stopPropagation()` on the inner modal content container to prevent clicks inside the modal from bubbling up and closing the backdrop!

---

### 67. 🔴 P0 [Q] Implement Infinite Scroll using `IntersectionObserver`.

> **TL;DR:** Sentinel element tracking with `useRef` and `IntersectionObserver`.

#### 💡 Core Concept & Explanation
Monitors invisible sentinel element at list bottom to trigger async next page fetches.

#### 🛠️ Code / Visual Diagram / Table

```jsx
function InfiniteList({ fetchNextPage, hasMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) fetchNextPage();
    });
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, fetchNextPage]);

  return (
    <div>
      {/* Items list */}
      <div ref={sentinelRef} style={{ height: 10 }} />
    </div>
  );
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Always disconnect the observer in the effect cleanup function to avoid multiple active observers firing concurrent fetch requests.

---

### 68. 🔴 P0 [Q] Implement a Theme Provider using Context API.

> **TL;DR:** Theme context with light/dark state and localStorage persistence.

#### 💡 Core Concept & Explanation
Exposes global theme mode and toggle function to child components.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Export a custom hook `useTheme()` that throws a helpful error if used outside `<ThemeProvider>`.

---

## 10. Skim-Level Advanced Topics & Edge Cases

### 69. 🟠 P1 [C] What is Automatic Batching in React 18, and how does it group state updates inside promises and timeouts?

> **TL;DR:** React 18 automatically batches ALL state updates (inside promises, timeouts, native events) into a single re-render cycle. In React 17, batching only occurred inside React event handlers.

#### 💡 Core Concept & Explanation
Reduces un-needed intermediate re-renders across asynchronous callbacks.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// React 18: Triggers ONLY 1 re-render even inside setTimeout!
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);
```

#### ⚠️ Interview Pitfall / Pro-Tip
If you ever need to opt out of automatic batching for immediate DOM reading, wrap the update in `flushSync(() => { setState(...) })`.

---

### 70. 🟠 P1 [C] What is an Error Boundary in React? Why must Error Boundaries currently be written using Class Components (`componentDidCatch`)?

> **TL;DR:** Error Boundaries catch JavaScript errors in their child component tree, log errors, and render a fallback UI. Must use Class Components (`componentDidCatch`).

#### 💡 Core Concept & Explanation
Prevents the entire React component tree from unmounting into a blank white screen upon unhandled JS runtime errors.

#### 🛠️ Code / Visual Diagram / Table

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { console.log(error, info); }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Error Boundaries do **NOT** catch errors inside event handlers, asynchronous code (`setTimeout`), or server-side rendering! Use standard try/catch blocks for event handlers.

---

### 71. 🟠 P1 [C] How does React prevent Cross-Site Scripting (XSS) attacks by default, and when can `dangerouslySetInnerHTML` expose vulnerabilities?

> **TL;DR:** React automatically escapes strings inside JSX `{}`. Using `dangerouslySetInnerHTML={{ __html: userString }}` bypasses escaping and creates XSS risks.

#### 💡 Core Concept & Explanation
Strings rendered inside JSX elements are sanitized as plain text. `dangerouslySetInnerHTML` injects raw HTML strings.

#### 🛠️ Code / Visual Diagram / Table

```jsx
// SAFE (React escapes HTML characters automatically):
const comment = '<script>stealCookies()</script>';
return <div>{comment}</div>; // Renders as plain visible text!

// UNSAFE (Executes malicious script if not sanitized!):
return <div dangerouslySetInnerHTML={{ __html: sanitize(comment) }} />;
```

#### ⚠️ Interview Pitfall / Pro-Tip
If you must use `dangerouslySetInnerHTML` to render user-generated HTML (e.g. rich text editor output), always sanitize it first using libraries like `DOMPurify`.

---

### 72. 🟡 P2 [C] What is React Fiber (conceptual overview)? How does Fiber enable interruptible, prioritized rendering work units?

> **TL;DR:** Fiber is React's reconciler engine that breaks rendering into small units of work (Fiber nodes) that can be paused, prioritized, or aborted by the browser.

#### 💡 Core Concept & Explanation
Fiber nodes form a singly linked list tree. React processes units of work during browser idle periods without blocking main thread input events.

#### 🛠️ Code / Visual Diagram / Table

```
Fiber Node Linked List Structure:
child ──> sibling ──> return (parent)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Fiber is an internal implementation detail of React; your component code shouldn't depend directly on Fiber node APIs.

---

### 73. 🟡 P2 [Q] What are `useTransition` and `useDeferredValue` in React 18, and when would you use them for non-urgent UI updates?

> **TL;DR:** `useTransition` marks state updates as non-urgent transitions. `useDeferredValue` defers updating non-critical UI values until urgent renders complete.

#### 💡 Core Concept & Explanation
Keeps input typing snappy while filtering large lists in background.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const [isPending, startTransition] = useTransition();
// Inside handler:
startTransition(() => setLargeListQuery(inputVal));
```

#### ⚠️ Interview Pitfall / Pro-Tip
`useTransition` is used when you control the state update code. `useDeferredValue` is used when receiving a value as a prop from above.

---

### 74. 🟡 P2 [Q] What are `forwardRef` and `useImperativeHandle`? How do you expose child component methods to a parent?

> **TL;DR:** `forwardRef` passes a ref down to a child node. `useImperativeHandle` customizes the imperative handle exposed to parent components.

#### 💡 Core Concept & Explanation
Exposes restricted imperative API methods (e.g. `.focus()`, `.scrollIntoView()`) from a child component to a parent ref.

#### 🛠️ Code / Visual Diagram / Table

```jsx
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus()
  }));
  return <input ref={inputRef} />;
});
```

#### ⚠️ Interview Pitfall / Pro-Tip
Use imperative handles sparingly; declarative state and props are preferred over manual imperative method calls in React.

---

### 75. 🟡 P2 [D] What is Micro-Frontend Architecture (Module Federation), and when should an enterprise adopt it over a monolithic React app?

> **TL;DR:** Splitting a large monolithic frontend into independently built and deployed applications loaded dynamically at runtime via Webpack Module Federation.

#### 💡 Core Concept & Explanation
Allows separate autonomous team ownership across giant enterprise web portals (e.g. Checkout App, Auth App, Search App).

#### 🛠️ Code / Visual Diagram / Table

```
[ Host Shell App ]
   ├── Dynamic Import ──> [ Remote Auth Micro-App ]
   └── Dynamic Import ──> [ Remote Checkout Micro-App ]
```

#### ⚠️ Interview Pitfall / Pro-Tip
Micro-frontends introduce significant operational, routing, and shared dependency overhead. Do not adopt for small/medium apps or small teams.

---

_End of Master Answer Key — Synchronized with `react-interview-questions.md` across all 75 questions._

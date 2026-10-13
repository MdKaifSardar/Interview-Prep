⏮️ (start) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Components, Props & State ➡️](02-functional-components-props-and-state-modeling.md)

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

⏮️ (start) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 02 · Components, Props & State ➡️](02-functional-components-props-and-state-modeling.md)

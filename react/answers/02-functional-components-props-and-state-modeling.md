[⬅️ Previous: 01 · Fundamentals & JSX](01-core-fundamentals-and-jsx-architecture.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Core Hooks Deep-Dive ➡️](03-core-hooks-deep-dive.md)

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

[⬅️ Previous: 01 · Fundamentals & JSX](01-core-fundamentals-and-jsx-architecture.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 03 · Core Hooks Deep-Dive ➡️](03-core-hooks-deep-dive.md)

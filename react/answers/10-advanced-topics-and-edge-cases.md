[⬅️ Previous: 09 · Coding Exercises & Drills](09-practical-coding-exercises-and-scenario-drills.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

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

[⬅️ Previous: 09 · Coding Exercises & Drills](09-practical-coding-exercises-and-scenario-drills.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; ⏭️ (end)

[⬅️ Previous: 04 · Advanced Hooks & Memoization](04-advanced-hooks-and-memoization.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · State Management & Data Fetching ➡️](06-client-state-management-and-data-fetching.md)

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

[⬅️ Previous: 04 · Advanced Hooks & Memoization](04-advanced-hooks-and-memoization.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 06 · State Management & Data Fetching ➡️](06-client-state-management-and-data-fetching.md)

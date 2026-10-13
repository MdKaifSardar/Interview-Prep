[⬅️ Previous: 05 · Re-rendering & Performance](05-re-rendering-keys-and-performance-optimization.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Full-Stack Integration & Auth ➡️](07-full-stack-integration-and-authentication.md)

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

[⬅️ Previous: 05 · Re-rendering & Performance](05-re-rendering-keys-and-performance-optimization.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Full-Stack Integration & Auth ➡️](07-full-stack-integration-and-authentication.md)

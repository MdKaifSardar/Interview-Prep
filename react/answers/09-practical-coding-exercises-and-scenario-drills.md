[⬅️ Previous: 08 · Next.js & Server Rendering](08-nextjs-architecture-and-server-rendering.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Advanced Topics & Edge Cases ➡️](10-advanced-topics-and-edge-cases.md)

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

[⬅️ Previous: 08 · Next.js & Server Rendering](08-nextjs-architecture-and-server-rendering.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 10 · Advanced Topics & Edge Cases ➡️](10-advanced-topics-and-edge-cases.md)

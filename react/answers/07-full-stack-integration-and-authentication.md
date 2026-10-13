[⬅️ Previous: 06 · State Management & Data Fetching](06-client-state-management-and-data-fetching.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Next.js & Server Rendering ➡️](08-nextjs-architecture-and-server-rendering.md)

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

[⬅️ Previous: 06 · State Management & Data Fetching](06-client-state-management-and-data-fetching.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 08 · Next.js & Server Rendering ➡️](08-nextjs-architecture-and-server-rendering.md)

[⬅️ Previous: 07 · Full-Stack Integration & Auth](07-full-stack-integration-and-authentication.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Coding Exercises & Drills ➡️](09-practical-coding-exercises-and-scenario-drills.md)

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

[⬅️ Previous: 07 · Full-Stack Integration & Auth](07-full-stack-integration-and-authentication.md) &nbsp;|&nbsp; [📋 Index](../react-interview-answers.md) &nbsp;|&nbsp; [Next: 09 · Coding Exercises & Drills ➡️](09-practical-coding-exercises-and-scenario-drills.md)

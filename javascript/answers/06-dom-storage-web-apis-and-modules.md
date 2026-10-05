[⬅️ Previous: 05 · Async & Event Loop](05-async-event-loop-and-promises.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Output & Debugging ➡️](07-output-and-debugging-questions.md)

---

## 6. DOM, Storage, Web APIs & Modules

### 46. 🟠 P1 [Q] What is the DOM, and how does JavaScript interact with it?

> **TL;DR:** The DOM (Document Object Model) is a tree-structure object representation of an HTML document created by the browser, allowing JS to read and manipulate page structure, content, and styling.

**💡 Core Concept & Explanation**
**DOM Interaction:**
The browser parses HTML documents into a DOM tree where nodes represent HTML tags, text nodes, and attributes. JavaScript accesses nodes via host objects like `document.querySelector`, modifies attributes/classes, and listens to events.

**🛠️ Code / Visual Diagram / Table**

```javascript
const btn = document.querySelector('#submit-btn');
btn.textContent = 'Processing...';
btn.classList.add('active');
```

**⚠️ Interview Pitfall / Pro-Tip**
- Directly querying the DOM in loops (`for (...) { document.getElementById(...) }`), causing layout thrashing. Cache DOM references!


---

### 47. 🔴 P0 [Q] How do event bubbling, capturing, and delegation work, and what are the differences between event.target and event.currentTarget, and between preventDefault() and stopPropagation()?

> **TL;DR:** Event propagation has 3 phases: Capturing (down from window to target), Target, and Bubbling (up from target to window). Event delegation attaches one listener to a parent. target is element clicked; currentTarget is element with listener.

**💡 Core Concept & Explanation**
**Phases:**
1. **Capturing:** Event travels top-down from `window` $\rightarrow$ `target`.
2. **Target:** Event reaches target element.
3. **Bubbling:** Event travels bottom-up from `target` $\rightarrow$ `window`.

**Event Delegation:**
Attaching a single event listener on a parent container to manage events from multiple existing or dynamically added child elements via event bubbling.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Event Delegation on parent <ul>
document.querySelector('#item-list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log("Clicked Item:", e.target.textContent);
    console.log("Handler attached to:", e.currentTarget.id);
  }
});
```

**⚠️ Interview Pitfall / Pro-Tip**
- Confusing `event.target` (actual clicked node) with `event.currentTarget` (node carrying listener).


---

### 48. 🟠 P1 [Q] What is the difference between innerHTML, innerText, and textContent, and what is the XSS risk with innerHTML?

> **TL;DR:** innerHTML parses and returns HTML tags (vulnerable to XSS). textContent returns raw unformatted text of all nodes. innerText returns visible rendered text (triggers layout recalculation).

**💡 Core Concept & Explanation**
- **`innerHTML`:** Gets/sets raw HTML string. Parses HTML markup. Vulnerable to Cross-Site Scripting (XSS) if un-sanitized user inputs are inserted!
- **`textContent`:** Gets/sets raw text of element and all descendants, including `<script>` and `<style>` tags. Fast.
- **`innerText`:** Gets/sets rendered visible text. Aware of CSS styling (`display: none`), triggering expensive browser layout reflows.

**🛠️ Code / Visual Diagram / Table**

```javascript
const el = document.getElementById('content');
// DANGEROUS XSS:
el.innerHTML = `<img src=x onerror="alert('Hacked!')">`;

// SAFE:
el.textContent = `<img src=x onerror="alert('Safe')">`;
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `innerHTML` to set text received from user inputs without sanitization.


---

### 49. 🟠 P1 [Q] What is the difference between localStorage, sessionStorage, and cookies, how do XSS and CSRF differ as risks, and what do the HttpOnly, Secure, and SameSite cookie flags do?

> **TL;DR:** localStorage persists until manually cleared (5MB); sessionStorage persists until tab closes (5MB); cookies send with HTTP requests (4KB). HttpOnly cookies prevent XSS theft; SameSite mitigates CSRF.

**💡 Core Concept & Explanation**
**Storage Comparison:**
- **localStorage:** 5-10MB, persistent storage across sessions. Accessible via JS.
- **sessionStorage:** 5-10MB, scoped to tab session. Accessible via JS.
- **Cookies:** 4KB, automatically sent in HTTP headers.

**Security Flags:**
- **`HttpOnly`:** Prevents JavaScript access via `document.cookie` (Mitigates XSS token theft!).
- **`Secure`:** Transmitted ONLY over HTTPS.
- **`SameSite=Strict/Lax`:** Restricts cross-site request sending (Mitigates CSRF attack!).

**🛠️ Code / Visual Diagram / Table**

```javascript
// Storing JSON in localStorage
localStorage.setItem('user', JSON.stringify({ id: 1 }));
const user = JSON.parse(localStorage.getItem('user'));
```

**⚠️ Interview Pitfall / Pro-Tip**
- Storing sensitive auth JWT tokens in `localStorage` where XSS scripts can read them via `localStorage.getItem()`. Store auth tokens in `HttpOnly` cookies!


---

### 50. 🔴 P0 [C] What does fetch() return (the Response object), why doesn't it reject on 4xx/5xx errors and how do you check response.ok, how are credentials sent, and what is CORS and why does it exist?

> **TL;DR:** fetch() returns a Promise resolving to a Response object. It does NOT reject on 4xx/5xx HTTP status codes (check response.ok). CORS is a browser security mechanism blocking cross-origin requests unless server headers allow it.

**💡 Core Concept & Explanation**
**fetch() Behavior:**
- `fetch()` only rejects on network failures or request blocking.
- HTTP error statuses (`404`, `500`) resolve successfully. Developers must check `response.ok` (status 200-299).

**CORS (Cross-Origin Resource Sharing):**
Browser security feature enforcing Same-Origin Policy (SOP). Cross-origin requests trigger preflight `OPTIONS` requests unless server sends `Access-Control-Allow-Origin` headers.

**🛠️ Code / Visual Diagram / Table**

```javascript
async function loadData() {
  const res = await fetch("https://api.example.com/data");
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming `fetch()` rejects automatically when server returns a 404 or 500 status code.

---

## Modules

---

### 51. 🟠 P1 [Q] What is the difference between ES modules and CommonJS?

> **TL;DR:** CommonJS (module.exports / require) is synchronous, used in traditional Node.js, and evaluated at runtime. ES Modules (import / export) are asynchronous, statically analyzed at compile-time (enabling tree-shaking), and native to modern JS.

**💡 Core Concept & Explanation**
**CJS vs ESM:**
- **CommonJS (CJS):** `require()`, `module.exports`. Synchronous file loading. Evaluates dynamically at runtime.
- **ES Modules (ESM):** `import`, `export`. Static analysis at parse time before execution. Supports top-level `await` and tree-shaking.

**🛠️ Code / Visual Diagram / Table**

```javascript
// CommonJS (CJS)
const fs = require('fs');
module.exports = { calc: (x) => x * 2 };

// ES Module (ESM)
import { useState } from 'react';
export const calc = (x) => x * 2;
```

**⚠️ Interview Pitfall / Pro-Tip**
- Trying to use `require()` inside ES modules or using top-level `import` conditionally inside functions.

---

## Output & Debugging Questions

---

[⬅️ Previous: 05 · Async & Event Loop](05-async-event-loop-and-promises.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 07 · Output & Debugging ➡️](07-output-and-debugging-questions.md)

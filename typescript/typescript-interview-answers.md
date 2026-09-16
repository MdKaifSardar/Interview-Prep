# TypeScript Full-Stack & GenAI Technical Master Answer Key (Comprehensive Edition)

Companion answer key to `typescript-interview-questions.md`. Every single answer strictly follows our standardized 4-part framework designed for rapid revision AND deep conceptual mastery:
1. **TL;DR:** 1–2 sentence summary for rapid recall.
2. **💡 Core Concept & Explanation:** Intuitive breakdown of *why* and *how* the underlying mechanism works.
3. **🛠️ Code / Visual Diagram / Table:** Working TypeScript snippet, runtime comparison table, or schema pattern.
4. **⚠️ Interview Pitfall / Pro-Tip:** Real-world edge cases, runtime traps, compiler gotchas, and interviewer follow-ups.

---

## 1. TypeScript Fundamentals

### 1. 🔴 P0 [C] What is TypeScript, and what problems does it solve compared with JavaScript?

> **TL;DR:** TypeScript is a statically typed syntactic superset of JavaScript that compiles to clean JS by erasing type annotations. It catches type errors at compile time, enhances IDE tooling, and documents contracts without altering runtime behavior.

#### 💡 Core Concept & Explanation
JavaScript is dynamically typed—types belong to runtime values, not variables. Type mismatches (e.g. calling a non-existent method or accessing a property on `undefined`) only crash code at execution. TypeScript introduces an opt-in static type system checked at compile time by `tsc`.

Key problems solved:
1. **Early Error Detection:** Catches type mismatches, typos, and null references during development.
2. **Enhanced DX:** Powers precise IDE auto-completion, navigation, and safe automated refactoring.
3. **Self-Documenting Code:** Interfaces and types serve as living documentation for code contracts.
4. **Target Compilation:** Compiles modern ECMAScript to legacy JS targets (e.g. ES5/ES6).

#### 🛠️ Code / Visual Diagram / Table

```typescript
// ❌ JavaScript (Runtime Crash):
function calculateTotal(price, tax) {
  return price.toFixed(2) + tax; // String concatenation bug if price is "100"!
}

// ✅ TypeScript (Compile-Time Catch):
function calculateTotalTS(price: number, tax: number): number {
  return Number(price.toFixed(2)) + tax;
}
// Compiler Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// calculateTotalTS("100", 0.05);
```

#### ⚠️ Interview Pitfall / Pro-Tip
TypeScript does **not** alter runtime execution semantics. All types are erased during compilation. TS cannot prevent runtime errors caused by unexpected external network payloads unless paired with runtime schema validation.

---

### 2. 🔴 P0 [C] What is the difference between compile-time type checking and runtime validation? Why can't TypeScript itself validate runtime data?

> **TL;DR:** Compile-time checking happens strictly during build time via type erasure, stripping all type syntax. Runtime validation checks actual data values while execution takes place. TS cannot validate runtime data because types do not exist at runtime.

#### 💡 Core Concept & Explanation
TypeScript operates via **Type Erasure**. `tsc` checks code contracts and removes all `type`, `interface`, and `enum` declarations, leaving pure JavaScript.

At runtime in Node.js or the browser, the engine has no access to TypeScript types. Therefore:
- **Compile-time checking (`tsc`):** Verifies code logic and developer intent before build.
- **Runtime validation (Zod, Joi):** Parses actual network payloads, user input, or LLM JSON outputs at execution.

Casting API responses with `as MyType` bypasses compile errors but does not validate data.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface UserResponse {
  id: string;
  email: string;
}

// ⚠️ Dangerous: Casting API response assumes data is valid
async function fetchUser(): Promise<UserResponse> {
  const res = await fetch('/api/user');
  return (await res.json()) as UserResponse; // Compiles, but data might be malformed!
}

// ✅ Safe: Runtime validation with Zod + static type inference
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;

async function fetchUserSafe(): Promise<User> {
  const res = await fetch('/api/user');
  return UserSchema.parse(await res.json()); // Throws runtime error if invalid!
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Writing `const user: User = JSON.parse(jsonString)` does **not** validate `jsonString`. TypeScript blindly accepts your type annotation. Always use runtime validators for untrusted input.

---

### 3. 🔴 P0 [Q] What is type inference, and when does TypeScript infer a type versus requiring an annotation?

> **TL;DR:** Type inference is TypeScript automatically determining types from initial values, return statements, and context. Explicit annotations are required for uninitialized variables, function parameters, and complex public API signatures.

#### 💡 Core Concept & Explanation
TypeScript uses contextual typing and assignment analysis to infer types automatically.

**When TS Infers Types (No annotation needed):**
- Initialized variables: `let name = 'Alex';` (`string`).
- Function return types based on return statements.
- Array literal members: `const arr = [1, 2];` (`number[]`).
- Default function parameters: `function greet(name = 'Guest')`.

**When Annotations ARE Required:**
- Uninitialized variables: `let data: string;`.
- Function parameters (without default values).
- Disambiguating complex union types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Inferred automatically:
let username = "alex"; // string
const port = 3000;     // 3000 (literal type)
const numbers = [1, 2, 3]; // number[]

// Explicit Annotation Required:
function multiply(a: number, b: number): number { // Parameter types required
  return a * b;
}

// Uninitialized variable (Infers 'any' without annotation):
let payload: { id: string; status: boolean };
payload = { id: "abc", status: true };
```

#### ⚠️ Interview Pitfall / Pro-Tip
Over-annotating code (`const name: string = 'Alex';`) creates visual clutter. Trust inference for local initializations, and reserve annotations for boundaries.

---

### 4. 🔴 P0 [C] What is structural typing, and how does it differ from nominal typing?

> **TL;DR:** Structural typing ('duck typing') evaluates type compatibility based solely on the shape/members of a type, whereas nominal typing (Java/C#) requires explicit class or interface declaration inheritance.

#### 💡 Core Concept & Explanation
In a **Structural Type System** (like TypeScript):
If type `A` contains all properties required by type `B` with matching types, `A` is assignable to `B`, regardless of explicit inheritance.

In a **Nominal Type System** (like Java or C#):
Two types with identical structures are **not** assignable unless they share an explicit named interface or class hierarchy.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Point2D {
  x: number;
  y: number;
}

class Vector2D {
  constructor(public x: number, public y: number) {}
}

function renderPoint(p: Point2D) {
  console.log(`Point at ${p.x}, ${p.y}`);
}

// ✅ Works! Vector2D matches the shape of Point2D structurally:
const vec = new Vector2D(10, 20);
renderPoint(vec);

// ✅ Plain object literal works too:
const obj = { x: 5, y: 15, name: "origin" };
renderPoint(obj); // Allowed because obj has x & y!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Structural typing can accidentally allow assigning two logically distinct domain identifiers (e.g. `UserId` and `OrderId` both defined as `{ id: string }`). Use **Branded Types** (`type UserId = string & { readonly __brand: unique symbol }`) for nominal behavior.

---

### 5. 🟠 P1 [Q] What is excess property checking, and why can an object literal fail assignment while an intermediate variable succeeds?

> **TL;DR:** Excess property checking is a validation triggered only on fresh object literals passed directly to typed targets to catch typos. Assigning via an intermediate variable bypasses this check due to standard structural subtyping.

#### 💡 Core Concept & Explanation
To catch typos in inline object literals (e.g. `authenicated: true`), TypeScript triggers **Excess Property Checking** on *fresh object literals*:
- **Direct assignment:** Throws a compiler error if unknown properties are passed.
- **Indirect variable assignment:** Bypasses the check because the intermediate variable might hold extra fields intended for other usages.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Options {
  title: string;
  delay?: number;
}

function setup(opts: Options) {}

// ❌ Direct object literal -> Excess property check fails on typo:
// setup({ title: "Main", delaay: 500 }); 
// Error: 'delaay' does not exist in type 'Options'.

// ✅ Indirect variable assignment -> Bypasses excess property check:
const myOpts = { title: "Main", delaay: 500 };
setup(myOpts); // Compiles cleanly via structural subtyping!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Excess property checking only applies to fresh object literals. It does not strip extra properties at runtime—the extra properties still exist on the JS object!

---

## 2. Types, Interfaces, and Object Shapes

### 6. 🔴 P0 [C] What is the difference between type and interface? When would you use each?

> **TL;DR:** interface defines object shapes and supports declaration merging. type alias can define primitives, unions, intersections, tuples, and mapped types. Use interface for object shapes; use type for unions and utility types.

#### 💡 Core Concept & Explanation
**Interface (`interface`):**
- Describes object shapes and class structures (`implements`).
- Supports **Declaration Merging** (multiple interfaces with the same name auto-merge).
- Preferred for public library APIs and OOP designs.

**Type Alias (`type`):**
- Alias for any valid TS type (primitives, unions, intersections, tuples, mapped types).
- Does NOT support declaration merging.
- Preferred for unions (`string | number`), tuples, and functional type transformations.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Interface: Object shapes & Declaration Merging
interface User {
  id: string;
}
interface User { // Declaration Merging
  name: string;
}
const user: User = { id: "1", name: "Alice" };

// Type Alias: Unions, Primitives, Tuples, Intersections
type Status = "pending" | "success" | "error"; // Union
type Point = [number, number];                // Tuple
type Admin = User & { role: string };         // Intersection
```

#### ⚠️ Interview Pitfall / Pro-Tip
Attempting to re-declare a `type` alias with the same name throws a compiler error, whereas `interface` definitions silently merge.

---

### 7. 🔴 P0 [C] What are union types, intersection types, and literal types?

> **TL;DR:** Union types (A | B) allow a value to be either type A or type B. Intersection types (A & B) combine multiple types requiring all properties. Literal types restrict values to exact specific strings, numbers, or booleans.

#### 💡 Core Concept & Explanation
Set theory in TypeScript:
- **Union (`|`):** Logical OR. Value can belong to set A or set B.
- **Intersection (`&`):** Logical AND. Value must satisfy both set A and set B.
- **Literal Types:** Narrow a primitive type down to exact specific values (e.g. `'GET' | 'POST'`).

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Union Type:
type ID = string | number;

// Literal Types in a Union:
type HttpMethod = "GET" | "POST" | "DELETE";

// Intersection Type:
type Timestamps = { createdAt: Date; updatedAt: Date };
type Product = { id: string; price: number };
type DbProduct = Product & Timestamps;

const item: DbProduct = {
  id: "p1",
  price: 99,
  createdAt: new Date(),
  updatedAt: new Date()
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Intersecting incompatible primitive types (e.g. `string & number`) yields `never` because no value can be both a string and a number simultaneously.

---

### 8. 🔴 P0 [Q] What are optional properties and readonly properties? What does readonly actually guarantee?

> **TL;DR:** Optional properties (key?: T) allow properties to be T | undefined or omitted. readonly prevents property reassignment at compile time, but does not deeply freeze objects or arrays at runtime.

#### 💡 Core Concept & Explanation
- **Optional Properties (`key?: T`):** Property may be omitted or set to `undefined`.
- **Readonly Properties (`readonly key: T`):** Prevents reassignment (`obj.key = val`) in TS.
- **Readonly Guarantee:** `readonly` is strictly a compile-time check. Nested properties inside a `readonly` object remain mutable unless recursively marked `Readonly<T>`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Config {
  readonly endpoint: string; // Reassignment forbidden
  timeout?: number;          // Optional
  readonly metadata: { env: string }; // Shallow readonly
}

const cfg: Config = {
  endpoint: "https://api.com",
  metadata: { env: "prod" }
};

// ❌ Error: Cannot assign to 'endpoint'
// cfg.endpoint = "https://other.com";

// ⚠️ Allowed! Readonly is shallow:
cfg.metadata.env = "staging"; // Compiles cleanly unless metadata is Readonly!
```

#### ⚠️ Interview Pitfall / Pro-Tip
`readonly` on an array (`readonly string[]`) prevents mutations like `.push()`, but standard `readonly` on an object property does not deeply freeze nested structures.

---

### 9. 🔴 P0 [Q] What are tuples, and how are they different from arrays?

> **TL;DR:** Tuples are fixed-length arrays where each element position has a known, specific type. Regular arrays (T[]) hold a variable number of elements of homogeneous or union types.

#### 💡 Core Concept & Explanation
Arrays (`number[]`) can contain any number of items. Tuples (`[string, number]`) enforce exact element types at specific index positions (index 0 is `string`, index 1 is `number`).

Tuples are ideal for returning multiple values from functions (e.g. React's `useState` returning `[value, setter]`).

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Array (Variable length):
const scores: number[] = [10, 20, 30, 40];

// Tuple (Fixed structure & positional types):
type HTTPResponse = [statusCode: number, statusText: string];

const okResponse: HTTPResponse = [200, "OK"];
const statusNum = okResponse[0]; // number
const statusStr = okResponse[1]; // string

// Destructuring Tuple:
const [code, text] = okResponse;
```

#### ⚠️ Interview Pitfall / Pro-Tip
In non-readonly tuples, JS array mutation methods like `.push()` are permitted by TypeScript due to legacy array implementation details! Use `readonly [number, string]` to prevent `.push()`.

---

### 10. 🟠 P1 [C] What is declaration merging, and why is it one reason to use interface?

> **TL;DR:** Declaration merging is TypeScript automatically combining multiple interface definitions sharing the same name in the same namespace into a single merged interface. It enables extending global and third-party types.

#### 💡 Core Concept & Explanation
When multiple interfaces with the exact same name are declared, TypeScript automatically merges their fields into a single combined interface contract.

This is essential for:
- Adding custom properties to third-party NPM library interfaces (e.g. adding `user` to Express `Request`).
- Extending global environment objects like `Window` or `ProcessEnv`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// File 1: Third-party library definition
interface Window {
  title: string;
}

// File 2: Application extension (Declaration Merging)
interface Window {
  customAnalytics: () => void;
}

// Resulting merged interface:
window.title = "App";
window.customAnalytics = () => console.log("Tracked");
```

#### ⚠️ Interview Pitfall / Pro-Tip
If merged interfaces define the same property name with incompatible types, TypeScript throws a compilation error.

---

### 11. 🟠 P1 [Q] What are index signatures such as [key: string]: T, and when are they useful?

> **TL;DR:** Index signatures define types for objects with dynamic or unknown property keys, enforcing that all string (or number) keys map to values of type T.

#### 💡 Core Concept & Explanation
Used when object keys are dynamic at runtime (e.g. dictionary lookups, headers map, caching layers).

Syntax: `[key: string]: ValueType` or `[key: number]: ValueType`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface CacheMap {
  [key: string]: string; // Any string key maps to a string value
}

const cache: CacheMap = {
  token: "abc123",
  theme: "dark"
};

// Accessing dynamic keys:
const val = cache["dynamicKey"]; // string
```

#### ⚠️ Interview Pitfall / Pro-Tip
Without `noUncheckedIndexedAccess: true` in `tsconfig.json`, accessing `cache["missing"]` returns type `string` at compile-time even though it evaluates to `undefined` at runtime!

---

## 3. Type Safety and Narrowing

### 12. 🔴 P0 [C] What are any, unknown, and never? What are their practical differences?

> **TL;DR:** any disables all type checking. unknown is the type-safe top type requiring type narrowing before usage. never is the bottom type representing values that can never occur.

#### 💡 Core Concept & Explanation
**`any` (Escape hatch):**
Disables type checking completely. Can be assigned to anything, and anything can be called on it. Bypasses compiler safety.

**`unknown` (Type-safe top type):**
Any value can be assigned to `unknown`, but no properties/methods can be accessed without narrowing (via `typeof`, `instanceof`, or custom type guard).

**`never` (Bottom type):**
Represents impossible state (e.g. function throwing an exception or exhaustive switch check). No value can be assigned to `never` except `never` itself.

#### 🛠️ Code / Visual Diagram / Table

```typescript
let valAny: any = "hello";
valAny.nonExistentMethod(); // Compiles, crashes at runtime!

let valUnknown: unknown = "hello";
// valUnknown.toUpperCase(); // Error: Object is of type 'unknown'.
if (typeof valUnknown === "string") {
  console.log(valUnknown.toUpperCase()); // ✅ Safe after narrowing!
}

function throwError(msg: string): never {
  throw new Error(msg); // Never completes normally
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `any` propagates infectious untyped behavior throughout a codebase. Always prefer `unknown` for dynamic values.

---

### 13. 🔴 P0 [Q] What is type narrowing, and how does TypeScript use control-flow analysis and runtime checks to narrow types?

> **TL;DR:** Type narrowing is TypeScript refining a broad type (like string | number) into a specific type within conditional code blocks using control-flow analysis of JS runtime checks.

#### 💡 Core Concept & Explanation
TypeScript inspects runtime JavaScript checks at compile time to narrow types:
- `typeof x === 'string'`
- `x instanceof Date`
- `'property' in object`
- Equality checks: `x === 'success'`
- Truthiness: `if (x)`
- Custom Type Guards: `isFish(pet)`

#### 🛠️ Code / Visual Diagram / Table

```typescript
function processInput(val: string | number | Date) {
  if (typeof val === "string") {
    return val.toUpperCase(); // Inferred as string
  }
  if (val instanceof Date) {
    return val.toISOString(); // Inferred as Date
  }
  return val.toFixed(2);       // Inferred as number
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
`typeof null === 'object'` in JavaScript. If you check `if (typeof val === 'object')`, `val` can still be `null` unless guarded with `if (val && typeof val === 'object')`.

---

### 14. 🔴 P0 [Q] What is a user-defined type guard? Explain value is SomeType.

> **TL;DR:** A user-defined type guard is a custom function whose return type signature uses the type predicate 'arg is TargetType'. If the function returns true at runtime, TS narrows the argument to TargetType.

#### 💡 Core Concept & Explanation
When standard `typeof` or `instanceof` checks are insufficient for custom interface objects, user-defined type guards tell TypeScript's type checker how to evaluate complex runtime checks.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface User { id: string; name: string; }
interface Admin { id: string; permissions: string[]; }

// Type Guard Function:
function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).permissions !== undefined;
}

function handleUser(person: User | Admin) {
  if (isAdmin(person)) {
    console.log(person.permissions); // Inferred as Admin!
  } else {
    console.log(person.name);        // Inferred as User!
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
If your type guard function returns `true` when the runtime check is actually false, TypeScript will trust your assertion, leading to runtime crashes.

---

### 15. 🔴 P0 [Q] What are discriminated unions, and why are they useful?

> **TL;DR:** A discriminated union is a pattern where every type in a union shares a single common literal property (the discriminant tag), allowing TS to narrow types deterministically in switch/if statements.

#### 💡 Core Concept & Explanation
Essential pattern for modeling state machines, Redux actions, API results, and event payloads.

Structure:
1. Multiple types in a union.
2. Shared literal property (e.g. `kind`, `type`, `status`).
3. Type narrowing via `switch` or `if` on the shared literal.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type NetworkState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function renderScreen(state: NetworkState) {
  switch (state.status) {
    case "idle": return "Click to load";
    case "loading": return "Loading...";
    case "success": return `Data: ${state.data}`;
    case "error": return `Error: ${state.error.message}`;
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Pair discriminated unions with an exhaustive `never` check in the default branch of a `switch` statement to catch missing case handlers at build time!

---

### 16. 🔴 P0 [C] What is the difference between null and undefined, and what does strictNullChecks change?

> **TL;DR:** undefined means a variable is declared but has not been assigned a value. null represents an intentional absence of value. strictNullChecks prevents assignability of null and undefined to normal types.

#### 💡 Core Concept & Explanation
Without `strictNullChecks: true`, `null` and `undefined` are valid values for any type (`string`, `number`, `User`), leading to frequent `NullPointerException` runtime bugs.

With `strictNullChecks: true`, `null` and `undefined` become distinct types that must be explicitly unioned (`string | null`).

#### 🛠️ Code / Visual Diagram / Table

```typescript
// With strictNullChecks: true:
let name: string = "Alice";
// name = null; // Error: Type 'null' is not assignable to type 'string'.

let optionalName: string | null = null; // Must be explicit!

// Optional Chaining & Nullish Coalescing:
const len = optionalName?.length; // number | undefined
const displayName = optionalName ?? "Anonymous"; // Fallback if null/undefined
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using loose equality `x == null` checks for **both** `null` and `undefined`, whereas strict equality `x === null` checks only for `null`.

---

### 17. 🟠 P1 [C] What is void, and how is it different from undefined and never?

> **TL;DR:** void indicates a function returns no meaningful value (caller ignores return value). undefined is a primitive value. never indicates execution non-return (function throws or loops infinitely).

#### 💡 Core Concept & Explanation
- `void`: Return type for functions that don't return values. Callbacks typed as `void` can return values, but the caller will ignore them.
- `undefined`: Real primitive value. Declaring `(): undefined` forces an explicit `return undefined;` statement.
- `never`: Function execution never reaches its end.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Return void (implicitly returns undefined):
function logMsg(msg: string): void {
  console.log(msg);
}

// Return undefined (Must explicitly return undefined):
function getNothing(): undefined {
  return undefined;
}

// Return never (Never returns execution):
function fail(): never {
  throw new Error("Fatal error");
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Function types with `void` return permit callbacks to return values (e.g. `const fn: () => void = () => 42;`), preventing unnecessary boilerplate.

---

## 4. Generics

### 18. 🔴 P0 [C] What are generics, and why are they preferable to any in many situations?

> **TL;DR:** Generics (<T>) are type variables that allow functions, classes, and interfaces to work with a variety of types while preserving exact input-output type relationships, unlike any.

#### 💡 Core Concept & Explanation
Generics parameterize types. Instead of using `any` (which destroys type safety), generics capture the type passed in and enforce that type relationship across parameters and return types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// ❌ Loose (any loses return type):
function firstElementAny(arr: any[]): any {
  return arr[0];
}
const resAny = firstElementAny([1, 2, 3]); // resAny is 'any'

// ✅ Generic (Preserves exact type):
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
const resNum = firstElement([1, 2, 3]); // resNum inferred as 'number | undefined'!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Don't add generic parameters if they are only used once in a function signature and not tied to return types or other parameters—use standard types instead.

---

### 19. 🔴 P0 [Q] What does T extends U mean in a generic constraint?

> **TL;DR:** T extends U restricts a generic type parameter T so that it must be assignable to (satisfy the structure of) type U.

#### 💡 Core Concept & Explanation
Generic constraints limit what types can be passed to `<T>`. `T extends U` mandates that whatever type `T` is provided, it must possess at least all members of `U`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Lengthwise {
  length: number;
}

// Constraint: T MUST have a numeric .length property
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("hello");       // ✅ string has .length
logLength([1, 2, 3]);     // ✅ Array has .length
logLength({ length: 10 });// ✅ Object has .length
// logLength(42);         // ❌ Error: Type 'number' has no .length property.
```

#### ⚠️ Interview Pitfall / Pro-Tip
Confusing `extends` in generic constraints (structure requirement) with `extends` in conditional types (`T extends U ? X : Y`).

---

### 20. 🔴 P0 [C] How does generic type inference work?

> **TL;DR:** TypeScript infers generic type parameters automatically from the runtime arguments passed to a function call, eliminating the need to explicitly specify <TypeName>.

#### 💡 Core Concept & Explanation
When calling a generic function, TS inspects the arguments passed at runtime and matches them against generic parameters, inferring `T` contextually.

#### 🛠️ Code / Visual Diagram / Table

```typescript
function makePair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Infers K = string, V = number automatically:
const pair = makePair("age", 30); // [string, number]

// Explicit override if needed:
const explicitPair = makePair<string, string | number>("id", "abc123");
```

#### ⚠️ Interview Pitfall / Pro-Tip
If passed arguments are mismatched or ambiguous, TS may infer a wide union type instead of throwing an error unless generic constraints are specified.

---

### 21. 🔴 P0 [Q] How would you design getProperty<T, K extends keyof T>(obj, key) while preserving the T[K] relationship?

> **TL;DR:** Use generic parameter T for the object and K extends keyof T for the key constraint, returning the indexed access type T[K].

#### 💡 Core Concept & Explanation
Guarantees compile-time safety when accessing properties dynamically. It ensures `key` is a valid key of `obj` and returns the exact type of `obj[key]`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 101, name: "Alice", active: true };

const userName = getProperty(user, "name"); // inferred as string
const userId = getProperty(user, "id");     // inferred as number

// ❌ Error: Argument of type '"email"' is not assignable to parameter of type '"id" | "name" | "active"'.
// getProperty(user, "email");
```

#### ⚠️ Interview Pitfall / Pro-Tip
Attempting to access dynamic keys without `K extends keyof T` forces returning `any` or causes compilation errors.

---

### 22. 🟠 P1 [Q] What are generic default type parameters, and when are they useful?

> **TL;DR:** Generic defaults (<T = DefaultType>) provide a fallback type when T is not explicitly provided or cannot be inferred from function arguments.

#### 💡 Core Concept & Explanation
Works like default function parameters. Extremely useful for API response wrappers or generic components where a default type is standard.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Default T to 'any' or 'unknown' if not provided:
interface ApiResponse<Data = unknown, ErrorType = Error> {
  data: Data;
  status: number;
  error?: ErrorType;
}

// Using default Data = unknown:
const res1: ApiResponse = { data: "anything", status: 200 };

// Overriding default Data type:
interface UserData { name: string; }
const res2: ApiResponse<UserData> = {
  data: { name: "Bob" },
  status: 200
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Mandatory generic parameters cannot follow default generic parameters in a type declaration list.

---

## 5. Type Operators and Assertions

### 23. 🔴 P0 [Q] What is keyof, and how is it used with generics?

> **TL;DR:** keyof is an index type operator that produces a union of string, number, or symbol literal types representing all keys of a type T.

#### 💡 Core Concept & Explanation
`keyof T` extracts all key names of object type `T` into a union of string literals.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Person {
  name: string;
  age: number;
  location: string;
}

type PersonKeys = keyof Person; // "name" | "age" | "location"

function printProperty<T, K extends keyof T>(obj: T, key: K) {
  console.log(obj[key]);
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `keyof` on `any` produces `string | number | symbol`, whereas `keyof {}` produces `never`.

---

### 24. 🔴 P0 [Q] What are indexed access types such as T[K]?

> **TL;DR:** Indexed access types (lookup types) use T[K] syntax to look up the exact type of property K on type T.

#### 💡 Core Concept & Explanation
Allows extracting property types directly from interfaces without re-declaring types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface User {
  id: number;
  profile: {
    avatar: string;
    roles: string[];
  };
}

type Profile = User['profile']; // { avatar: string; roles: string[]; }
type Role = User['profile']['roles'][number]; // string (extracts element type)
```

#### ⚠️ Interview Pitfall / Pro-Tip
Indexing with a key string that does not exist on interface `T` causes a compilation error.

---

### 25. 🔴 P0 [Q] What is typeof when used in a type position?

> **TL;DR:** In a type position, typeof extracts the static TypeScript type of an existing JavaScript variable, constant, or function.

#### 💡 Core Concept & Explanation
Enables deriving TypeScript types directly from runtime implementation code or config objects.

#### 🛠️ Code / Visual Diagram / Table

```typescript
const appConfig = {
  env: "production",
  port: 8080,
  features: ["auth", "analytics"]
};

// Derive TS Type from runtime object:
type AppConfig = typeof appConfig;

// Usage:
const devConfig: AppConfig = {
  env: "development",
  port: 3000,
  features: ["auth"]
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
`typeof` in type position is executed at compile time by `tsc`, distinct from JavaScript runtime `typeof x === 'string'`.

---

### 26. 🔴 P0 [Q] What is a type assertion (as)? Does it perform runtime conversion or validation?

> **TL;DR:** A type assertion (val as TargetType) overrides compiler inference to tell TS to treat a value as TargetType. It performs ZERO runtime conversion or validation.

#### 💡 Core Concept & Explanation
Type assertions are completely erased in emitted JS code. They tell the compiler 'trust me, I know what I'm doing'.

#### 🛠️ Code / Visual Diagram / Table

```typescript
const inputEl = document.getElementById("email") as HTMLInputElement;
// TS now allows accessing inputEl.value

// ⚠️ Assertion performs NO runtime conversion:
const strVal: any = "123";
const numVal = strVal as number; // Compiles, but typeof numVal is still 'string' at runtime!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Overusing `as` to silence compiler errors masks genuine bugs and invalid data types.

---

### 27. 🟠 P1 [Q] What is as const, and how does it affect literal types and readonly behavior?

> **TL;DR:** as const is a const assertion that instructs TS to infer the narrowest literal types for an expression and mark all object and array properties as readonly.

#### 💡 Core Concept & Explanation
Converts mutable objects and arrays into deeply immutable structures with exact literal types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Without as const: inferred as string[]
const colorsMutable = ["red", "green", "blue"]; 

// With as const: inferred as readonly ["red", "green", "blue"]
const colors = ["red", "green", "blue"] as const; 

// colors[0] = "yellow"; // Error: Cannot assign to read-only index.

const config = {
  endpoint: "api.com",
  retries: 3
} as const;
// Inferred as: { readonly endpoint: "api.com"; readonly retries: 3; }
```

#### ⚠️ Interview Pitfall / Pro-Tip
`as const` does not freeze JS objects at runtime (`Object.freeze`). It is purely a compile-time instruction.

---

### 28. 🟠 P1 [Q] What is the satisfies operator, and how is it different from a type annotation and as?

> **TL;DR:** satisfies verifies that an expression matches a target type without overriding or widening the inferred specific literal type of the expression.

#### 💡 Core Concept & Explanation
Solves the drawback of type annotations: Type annotations widen literal types and lose specific property metadata. `satisfies` checks compliance while retaining specific inferred types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type RGB = [red: number, green: number, blue: number];
type Color = string | RGB;

// Using satisfies:
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, Color>;

// Retains specific property methods!
palette.green.toUpperCase(); // ✅ Works because TS knows green is string!
palette.red.map(x => x);     // ✅ Works because TS knows red is array!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Confusing `satisfies` with type assertions `as`. `satisfies` throws errors if types are invalid, whereas `as` forces invalid assignments.

---

## 6. Utility Types

### 29. 🔴 P0 [Q] What are Partial, Required, Readonly, Pick, and Omit?

> **TL;DR:** Built-in utility types for transforming object shapes:
- Partial<T>: Makes all properties optional.
- Required<T>: Makes all properties mandatory.
- Readonly<T>: Makes all properties readonly.
- Pick<T, K>: Creates type with selected keys K.
- Omit<T, K>: Creates type excluding keys K.

#### 💡 Core Concept & Explanation
Built-in type transformations operating on object keys.

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface User {
  id: string;
  name: string;
  email?: string;
}

type OptionalUser = Partial<User>;   // { id?: string; name?: string; email?: string; }
type FullUser     = Required<User>;  // { id: string; name: string; email: string; }
type ReadUser     = Readonly<User>;  // readonly keys
type UserPreview  = Pick<User, "id" | "name">; // { id: string; name: string; }
type CreateUser   = Omit<User, "id">;          // { name: string; email?: string; }
```

#### ⚠️ Interview Pitfall / Pro-Tip
`Omit<T, K>` does not check if `K` exists on `T` (unlike `Pick`), which can hide typos in key names.

---

### 30. 🔴 P0 [Q] What are Record, Exclude, Extract, and NonNullable?

> **TL;DR:** Built-in utility types:
- Record<K, T>: Object type with keys K and value type T.
- Exclude<T, U>: Removes assignable types U from union T.
- Extract<T, U>: Selects assignable types U from union T.
- NonNullable<T>: Removes null and undefined from T.

#### 💡 Core Concept & Explanation
Utility types operating on maps and union types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Record:
type PageMeta = Record<"home" | "about", { title: string }>;

// Exclude & Extract (on Unions):
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T2 = Extract<"a" | "b" | "c", "a" | "z">; // "a"

// NonNullable:
type T3 = NonNullable<string | number | null | undefined>; // string | number
```

#### ⚠️ Interview Pitfall / Pro-Tip
Confusing `Exclude` (operates on union members) with `Omit` (operates on object properties).

---

### 31. 🔴 P0 [Q] What are ReturnType, Parameters, and Awaited used for?

> **TL;DR:** Function and Promise introspection utility types:
- ReturnType<T>: Extracts function return type.
- Parameters<T>: Extracts function parameter tuple.
- Awaited<T>: Unwraps Promises recursively to get resolved value type.

#### 💡 Core Concept & Explanation
Inspects function types and unwraps asynchronous Promise return values.

#### 🛠️ Code / Visual Diagram / Table

```typescript
async function fetchAccount(id: number) {
  return { id, name: "Alice", active: true };
}

type FnParams = Parameters<typeof fetchAccount>; // [id: number]
type FnReturn = ReturnType<typeof fetchAccount>; // Promise<{ id: number; name: string; active: boolean }>
type Account  = Awaited<ReturnType<typeof fetchAccount>>; // { id: number; name: string; active: boolean }
```

#### ⚠️ Interview Pitfall / Pro-Tip
Passing a function implementation `fetchAccount` directly to `ReturnType` instead of its type `typeof fetchAccount` causes a compiler error.

---

## 7. Runtime Data, APIs, and GenAI

### 32. 🔴 P0 [D] Why doesn't a TypeScript interface or type validate an API response or LLM response at runtime?

> **TL;DR:** Because TypeScript types are completely erased during build compilation. External network payloads arrive at execution when zero TypeScript checking exists.

#### 💡 Core Concept & Explanation
TypeScript design-time interfaces do not exist at runtime. Network inputs, external APIs, and LLM JSON streams can contain missing fields, altered types, or unexpected structures that crash applications if unvalidated.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// ❌ Fake safety:
const res = await fetch("https://api.com/llm-out");
const data: { response: string } = await res.json(); 
// At runtime, if LLM returns { error: "Quota exceeded" }, data.response is undefined!
console.log(data.response.toUpperCase()); // 💥 Runtime Crash!
```

#### ⚠️ Interview Pitfall / Pro-Tip
Treat all external API responses, database queries, and LLM outputs as `unknown` until parsed by a runtime validator.

---

### 33. 🟠 P1 [D] How does a runtime schema validator such as Zod complement TypeScript?

> **TL;DR:** Zod provides runtime payload parsing and validation while automatically driving static TypeScript type inference, eliminating duplicate interface definitions.

#### 💡 Core Concept & Explanation
Zod serves as the single source of truth: parses incoming data at runtime (throwing errors on invalid payloads) while exporting identical static TS types.

#### 🛠️ Code / Visual Diagram / Table

```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  age: z.number().min(18),
});

// Derive TS Type automatically:
type User = z.infer<typeof UserSchema>;

function processUser(rawInput: unknown): User {
  return UserSchema.parse(rawInput); // Runtime validation + TS type guarantee!
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Manually maintaining separate TS interfaces alongside validator schemas leads to schema drift and silent bugs.

---

### 34. 🟠 P1 [Q] How do you derive a TypeScript type from a Zod schema using z.infer?

> **TL;DR:** Use type MyType = z.infer<typeof MySchema>; to extract the static TS type directly from a Zod schema definition.

#### 💡 Core Concept & Explanation
Eliminates duplicate type maintenance by generating TS types straight from Zod runtime schemas.

#### 🛠️ Code / Visual Diagram / Table

```typescript
import { z } from "zod";

export const ProductSchema = z.object({
  sku: z.string(),
  price: z.number().positive(),
  tags: z.array(z.string())
});

// Infer static type:
export type Product = z.infer<typeof ProductSchema>;
```

#### ⚠️ Interview Pitfall / Pro-Tip
Forgetting `typeof` inside `z.infer<typeof Schema>` causes a TS compilation error because `Schema` is a JavaScript runtime value.

---

### 35. 🟠 P1 [D] How would you type structured LLM output so that the runtime validation schema and TypeScript type remain consistent?

> **TL;DR:** Define a Zod schema matching the required structured LLM JSON output (e.g. OpenAI Function Calling / Structured Outputs), infer the TS type via z.infer, and parse LLM output through schema.safeParse().

#### 💡 Core Concept & Explanation
LLMs produce non-deterministic text outputs. Passing raw JSON into `zodSchema.safeParse(JSON.parse(llmOutput))` guarantees type safety and failure handling.

#### 🛠️ Code / Visual Diagram / Table

```typescript
import { z } from "zod";

// 1. Define Structured Output Schema
const SentimentAnalysisSchema = z.object({
  sentiment: z.enum(["positive", "neutral", "negative"]),
  confidence: z.number().min(0).max(1),
  keywords: z.array(z.string()),
});

export type SentimentAnalysis = z.infer<typeof SentimentAnalysisSchema>;

// 2. Safely Process LLM Output
function parseLLMResponse(jsonText: string): SentimentAnalysis | null {
  try {
    const rawObj = JSON.parse(jsonText);
    const result = SentimentAnalysisSchema.safeParse(rawObj);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `JSON.parse()` on raw LLM outputs without `safeParse()` crashes when LLMs return markdown blocks or invalid JSON.

---

### 36. 🟠 P1 [Q] How would you model arbitrary or recursive JSON data in TypeScript?

> **TL;DR:** Define a recursive type alias covering JSON primitives, arrays, and objects: type JSONValue = string | number | boolean | null | JSONObject | JSONArray;.

#### 💡 Core Concept & Explanation
Models nested structures like ASTs, tree nodes, or dynamic config files safely without resorting to `any`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

type JSONValue = JSONPrimitive | JSONObject | JSONArray;

const payload: JSONValue = {
  name: "Config",
  version: 1.0,
  nested: {
    enabled: true,
    tags: ["a", "b"]
  }
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using `Record<string, any>` permits invalid non-JSON types (like functions or Symbols); recursive `JSONValue` strictly enforces valid JSON shapes.

---

### 37. 🟠 P1 [Q] How do you type asynchronous streams using AsyncIterable, AsyncIterator, or AsyncGenerator?

> **TL;DR:** Use AsyncIterable<T> or AsyncGenerator<T, ReturnType, NextType> to type asynchronous streaming data (e.g. LLM token streams or Node.js readline streams).

#### 💡 Core Concept & Explanation
Enables `for await (const chunk of stream)` loops with full TS type inference for emitted stream chunks.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Async Generator for Streaming Tokens from LLM:
async function* streamLLMResponse(prompt: string): AsyncGenerator<string, void, unknown> {
  yield "Hello";
  yield " world";
  yield "!";
}

// Consuming Stream:
async function consume() {
  for await (const token of streamLLMResponse("hi")) {
    console.log(token.toUpperCase()); // Typed as string!
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Using standard `for...of` instead of `for await...of` on an `AsyncIterable` causes a runtime error.

---

## 8. TypeScript Configuration and Modules

### 38. 🔴 P0 [P] What does strict in tsconfig.json mean, and what important checks does it enable?

> **TL;DR:** "strict": true enables a master suite of strict type checking flags in compiler, providing maximum type safety and catching null pointer bugs.

#### 💡 Core Concept & Explanation
Enables key strict checking flags:
- `strictNullChecks`: Makes null/undefined distinct types.
- `noImplicitAny`: Errors on un-annotated implicit any.
- `strictFunctionTypes`: Strict function parameter checking.
- `strictPropertyInitialization`: Ensures class properties are initialized.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Disabling `strictNullChecks` or `noImplicitAny` weakens TypeScript's ability to catch runtime crashes.

---

### 39. 🟠 P1 [P] What are the important tsconfig.json options for a Node/Next.js project, particularly module, moduleResolution, esModuleInterop, paths, and skipLibCheck?

> **TL;DR:** Key options:
- module: Specifies module system (ESNext, NodeNext).
- moduleResolution: Specifies strategy (bundler, NodeNext).
- esModuleInterop: Enables CommonJS default imports.
- paths: Configures path aliases (@/components/*).
- skipLibCheck: Skips checking .d.ts files for speed.

#### 💡 Core Concept & Explanation
Standard configuration options for modern Node/Next.js full-stack projects.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Production tsconfig.json snippet:
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Mismatching `module` and `moduleResolution` settings causing module import resolution errors.

---

### 40. 🟠 P1 [P] What are declaration files (.d.ts), and why are they needed?

> **TL;DR:** Declaration files (.d.ts) contain ambient type declarations only (no executable JS) to describe the shape of vanilla JS modules or environment APIs to TypeScript.

#### 💡 Core Concept & Explanation
Provides type information for external JS libraries (e.g. from `@types/*` / DefinitelyTyped) without altering source code.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// custom-lib.d.ts
declare module "legacy-lib" {
  export function calculate(val: number): number;
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Including executable JavaScript code inside `.d.ts` files is invalid syntax.

---

### 41. 🟠 P1 [D] What is module augmentation, and how would you use it to extend types from a third-party library such as Express.Request?

> **TL;DR:** Module augmentation uses declare module 'lib-name' to inject new properties into existing third-party library interfaces via interface declaration merging.

#### 💡 Core Concept & Explanation
Extends types exported by external NPM modules.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// types/express.d.ts
import "express"; // Must import to make file a module!

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; role: string };
  }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Forgetting `import 'express'` at the top turns the file into a global module replacement rather than an augmentation.

---

### 42. 🟠 P1 [Q] What are TypeScript enums, how do they behave at runtime, and what are alternatives such as objects with as const?

> **TL;DR:** Enums create named constants that generate real runtime JS objects. Objects with as const combined with union types are preferred in modern TS due to zero runtime bloat.

#### 💡 Core Concept & Explanation
Comparison of Enums vs `as const` object patterns.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// 1. TS Enum (Generates runtime JS object):
enum StatusEnum { PENDING = "PENDING", DONE = "DONE" }

// 2. Modern as const Pattern (Zero runtime overhead):
const StatusObj = {
  PENDING: "PENDING",
  DONE: "DONE"
} as const;

type Status = typeof StatusObj[keyof typeof StatusObj]; // "PENDING" | "DONE" 
```

#### ⚠️ Interview Pitfall / Pro-Tip
String enums require referencing the Enum object explicitly, whereas `as const` string unions allow passing matching raw string literals directly.

---

## 9. Advanced TypeScript

### 43. 🟠 P1 [Q] What are conditional types? Explain the T extends U ? X : Y pattern.

> **TL;DR:** Conditional types select one of two types based on a type relation check: T extends U ? X : Y (like a ternary operator at type level).

#### 💡 Core Concept & Explanation
Evaluates types dynamically based on subtyping constraints.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

type NonNullableType<T> = T extends null | undefined ? never : T;
```

#### ⚠️ Interview Pitfall / Pro-Tip
Union types distribute over conditional types automatically unless wrapped in tuples.

---

### 44. 🟠 P1 [Q] What is infer in conditional types? Give a practical example.

> **TL;DR:** infer introduces a temporary type variable within the extends clause of a conditional type to unwrap and extract internal types.

#### 💡 Core Concept & Explanation
Extracts return types, array element types, or Promise resolved types dynamically.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Extract Promise resolved type:
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type Resolved = UnpackPromise<Promise<number>>; // number

// Extract Function Return Type:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

#### ⚠️ Interview Pitfall / Pro-Tip
`infer` can only be used inside the true branch of a conditional type's `extends` clause.

---

### 45. 🟠 P1 [Q] What are mapped types, and how can you create your own utility type with them?

> **TL;DR:** Mapped types create new object types by iterating over keys using [K in keyof T] syntax, modifying property flags or values.

#### 💡 Core Concept & Explanation
Powers custom utility types like `MyPartial`, `MyReadonly`, and key remapping via `as`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
// Custom Readonly Mapped Type:
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Custom Nullable Properties:
type NullableProps<T> = {
  [K in keyof T]: T[K] | null;
};
```

#### ⚠️ Interview Pitfall / Pro-Tip
Forgetting `-readonly` or `-?` modifiers when attempting to remove flags from properties.

---

### 46. 🟠 P1 [P] What is noUncheckedIndexedAccess, and how does it affect expressions such as arr[i]?

> **TL;DR:** noUncheckedIndexedAccess automatically appends | undefined to indexed access lookups (e.g. arr[i] or obj[key]), catching out-of-bounds array access bugs.

#### 💡 Core Concept & Explanation
Forces explicit null checks on array and dictionary lookups.

#### 🛠️ Code / Visual Diagram / Table

```typescript
const names: string[] = ["Alice", "Bob"];

// With noUncheckedIndexedAccess: true
const name = names[0]; // Type is 'string | undefined'!

if (name !== undefined) {
  console.log(name.toUpperCase()); // Safe!
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Requires explicit non-null guards or assertions on valid index access throughout the codebase when enabled.

---

### 47. 🟡 P2 [Q] What are distributive conditional types, and when can they produce surprising results?

> **TL;DR:** When acting on an unwrapped type parameter T, generic conditional types automatically distribute over union members: (A | B) extends U ? X : Y becomes (A extends U ? X : Y) | (B extends U ? X : Y).

#### 💡 Core Concept & Explanation
Powers union filtering (`Exclude`, `Extract`). Wrap in tuples `[T] extends [U]` to disable distribution.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type ToArray<T> = T extends any ? T[] : never;
type Distributed = ToArray<string | number>; // string[] | number[]

// Non-Distributive (wrapped in tuple):
type ToArrayTuple<T> = [T] extends [any] ? T[] : never;
type NonDistributed = ToArrayTuple<string | number>; // (string | number)[]
```

#### ⚠️ Interview Pitfall / Pro-Tip
`never` cancels out completely in distributive conditional types because `never` represents an empty union.

---

### 48. 🟡 P2 [Q] What are template literal types, and what practical problems can they solve?

> **TL;DR:** Template literal types use ES6 template string syntax inside type definitions to concatenate, format, and validate string types at compile time.

#### 💡 Core Concept & Explanation
Useful for typing event handlers (`${event}Changed`), CSS units (`${number}px`), and API routes.

#### 🛠️ Code / Visual Diagram / Table

```typescript
type Event = "click" | "hover";
type EventHandler = `on${Capitalize<Event>}`; // "onClick" | "onHover"

type CSSPixel = `${number}px`;
const margin: CSSPixel = "20px"; // ✅
```

#### ⚠️ Interview Pitfall / Pro-Tip
Combining multiple large union types inside template literal strings can cause combinatorial memory explosion in the compiler.

---

### 49. 🟡 P2 [C] What are abstract classes and implements in TypeScript, and how do they differ from extends?

> **TL;DR:** An abstract class cannot be instantiated directly and can define abstract methods for child classes. implements enforces interface contracts without inheriting code. extends inherits actual class implementation.

#### 💡 Core Concept & Explanation
Comparison of Abstract Classes vs Interfaces (`implements`) vs Class Inheritance (`extends`).

#### 🛠️ Code / Visual Diagram / Table

```typescript
interface Printable { print(): void; }

abstract class BaseLogger implements Printable {
  abstract print(): void; // Must be implemented by child
  log(msg: string) { console.log(`[LOG]: ${msg}`); } // Shared behavior
}

class ConsoleLogger extends BaseLogger {
  print() { this.log("Printing..."); }
}
```

#### ⚠️ Interview Pitfall / Pro-Tip
Interfaces emit zero JavaScript output, whereas abstract classes generate real runtime ES6 class code.

---

### 50. 🟡 P2 [C] What are the practical implications of TypeScript's variance and function parameter assignability?

> **TL;DR:** Covariance preserves hierarchy (used for return types: Subtype -> Supertype is assignable). Contravariance reverses hierarchy (used for function parameters: Supertype -> Subtype is assignable). Method syntax is bivariant by default unless strictFunctionTypes is enabled.

#### 💡 Core Concept & Explanation
Understanding function assignability and `strictFunctionTypes: true`.

#### 🛠️ Code / Visual Diagram / Table

```typescript
class Animal { name!: string; }
class Dog extends Animal { bark() {} }

// Return type Covariance: Dog return assignable to Animal return
type GetAnimal = () => Animal;
type GetDog = () => Dog;
let fnGet: GetAnimal = (() => new Dog()) as GetDog; // ✅

// Parameter Contravariance under strictFunctionTypes:
type AcceptDog = (d: Dog) => void;
type AcceptAnimal = (a: Animal) => void;
let fnAccept: AcceptDog = ((a: Animal) => {}) as AcceptAnimal; // ✅
```

#### ⚠️ Interview Pitfall / Pro-Tip
Method syntax `{ fn(x: Animal): void }` is bivariant, whereas property function syntax `{ fn: (x: Animal) => void }` enforces strict contravariance.

---

[⬅️ Previous: 09 · DSA in JavaScript](09-dsa-in-javascript.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️

---

## 10. TypeScript

### 85. 🔴 P0 [C] What is TypeScript, how does it relate to JavaScript, and why doesn't it check types at runtime (type erasure)?

> **TL;DR:** TypeScript is a statically typed superset of JavaScript that compiles down to plain JavaScript. All type annotations are erased during compilation (Type Erasure), meaning zero type-checking overhead occurs at JavaScript runtime.

**💡 Core Concept & Explanation**
- **Compile-Time vs Runtime:** The TypeScript Compiler (`tsc`) checks types strictly during build time. Once compiled, all interface, type, and generic syntax is completely stripped out, emitting standard JavaScript (ES6+).
- **Type Erasure Mechanism:** Because types are erased, TypeScript types do NOT exist at runtime. Calling `typeof user` at runtime returns `"object"`, regardless of whether `user` was defined as `interface User { name: string }`.
- **Runtime Validation:** For network API calls or user inputs, runtime validation libraries (such as `Zod`, `Valibot`, or custom Type Predicates) are required.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. TypeScript Source Code (Build Time)
interface User {
  id: number;
  name: string;
}

function greet(user: User): string {
  return `Hello, ${user.name}`;
}

// 2. Compiled JavaScript Output (Runtime Emitted Output)
function greet(user) {
  return "Hello, " + user.name;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Runtime Type Inspection Trap:** Writing `if (val instanceof UserInterface)` throws a runtime `ReferenceError: UserInterface is not defined` because interfaces are erased. Only JavaScript classes (`class UserClass`) exist at runtime as constructor functions and can be checked with `instanceof`.


---

### 86. 🔴 P0 [C] How does type inference work, and when should you add explicit type annotations?

> **TL;DR:** TypeScript automatically infers types based on variable initializers, default values, and function return values (Contextual Typing). Explicit type annotations should be added for uninitialized variables, function parameters, exported public API boundaries, or when overriding default inference.

**💡 Core Concept & Explanation**
- **Type Inference:** When initializing `let count = 10`, TS infers `count: number` automatically.
- **`noImplicitAny` Compiler Flag:** When parameters are un-annotated (`function log(msg)`), TS defaults `msg` to `any`. Enabling `noImplicitAny: true` in `tsconfig.json` forces explicit annotations.
- **When to Annotate Explicitly:**
  1. Function parameters (`(x: number, y: string)`).
  2. Variables declared without immediate initialization (`let user: User;`).
  3. Exported functions / library public API contracts (improves build speed and documentation clarity).

**🛠️ Code / Visual Diagram / Table**

```typescript
// ✅ Good: Automatic Type Inference
let age = 25; // Inferred as number
const name = "Alice"; // Inferred as literal type "Alice"
const numbers = [1, 2, 3]; // Inferred as number[]

// ✅ Good: Explicit Annotations required
let user: { id: number; role: string }; // Uninitialized variable

function calculateTotal(price: number, taxRate: number): number {
  return price + price * taxRate; // Parameter types MUST be explicit
}

// ❌ Avoid: Redundant Annotations (Noise)
let count: number = 10; // Redundant! 'let count = 10' is cleaner.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Wider vs Narrower Inference (`let` vs `const`):** `let x = "hello"` is inferred widely as `string` (since `x` can be reassigned). `const x = "hello"` is inferred narrowly as literal type `"hello"`.


---

### 87. 🔴 P0 [Q] What is the difference between type and interface, and when would you use each?

> **TL;DR:** `interface` is designed for object shapes and supports Declaration Merging (open for extension). `type` aliases can represent objects, primitives, unions (`A | B`), tuples, and mapped types. Use `interface` for object-oriented designs and public library APIs; use `type` for complex union types and utility logic.

**💡 Core Concept & Explanation**
- **Declaration Merging:** Multiple `interface` declarations with the exact same name in the same scope merge their properties into a single interface. `type` aliases cannot be re-declared.
- **Union Types:** `type Point = { x: number } | { y: number }` is valid, whereas an `interface` cannot directly alias a union.

**🛠️ Code / Visual Diagram / Table**

| Feature | `interface` | `type` Alias |
| :--- | :--- | :--- |
| **Primary Purpose** | Object shapes & Class contracts | Any type definition (Unions, Primitives, Tuples) |
| **Declaration Merging** | **Supported** (Open for extension) | Not Supported (`Duplicate identifier`) |
| **Unions & Intersections** | Cannot directly define unions | **Supported** (`type X = A \| B`) |
| **Extends Syntax** | `interface B extends A` | Intersection `type B = A & { ... }` |

```typescript
// 1. Declaration Merging (Interface only)
interface Window {
  customProp: string;
}
interface Window {
  anotherProp: number;
}
// Merged Window interface has BOTH customProp AND anotherProp!

// 2. Unions & Tuples (Type only)
type Status = "pending" | "success" | "error";
type Point2D = [number, number];
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Library API Rule:** When building a library or NPM package, use `interface` for public configuration options so consumers can extend them via declaration merging if needed.


---

### 88. 🟠 P1 [C] What is structural typing, and how does it differ from nominal typing?

> **TL;DR:** TypeScript uses a Structural Type System ("duck typing"): two types are compatible if their internal shapes/properties match, regardless of how or where they were named. Languages like Java/C# use Nominal Typing, where type compatibility requires explicit class inheritance or interface implementation.

**💡 Core Concept & Explanation**
- **Structural Equivalence:** If object `A` has at least all required properties of type `T` with matching types, `A` is assignable to `T`.
- **Nominal Emulation (Branded Types):** To enforce nominal typing (e.g., preventing a `UserId` string from being accidentally passed to a `OrderId` parameter), TS developers use Branded/Tagged types (`type UserId = string & { readonly __brand: unique symbol }`).

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Point {
  x: number;
  y: number;
}

class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

function printPoint(p: Point) {
  console.log(`x: ${p.x}, y: ${p.y}`);
}

const vec = new Vector2D(10, 20);
printPoint(vec); // ✅ Valid! Vector2D matches the shape of Point structurally!

// Branded Types Example (Nominal Emulation)
type USD = number & { readonly __brand: "USD" };
type EUR = number & { readonly __brand: "EUR" };

let usd = 100 as USD;
let eur = 100 as EUR;
// usd = eur; // ❌ Compile Error: Type '"EUR"' is not assignable to type '"USD"'
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Excess Property Checks:** Passing an object literal directly `printPoint({ x: 1, y: 2, z: 3 })` triggers Excess Property Checking and throws a compile error. Assigning to a intermediate variable `const obj = { x: 1, y: 2, z: 3 }; printPoint(obj);` succeeds due to structural subtyping!


---

### 89. 🔴 P0 [Q] What is the difference between any, unknown, and never?

> **TL;DR:** `any` disables all type-checking (unsafe escape hatch). `unknown` is the type-safe top type that represents any value but requires Type Narrowing before performing operations. `never` is the bottom type representing values that can never occur (unreachable code, functions that throw errors or loop infinitely).

**💡 Core Concept & Explanation**
- **`any`:** Turns off type checker. `any.foo.bar()` compiles without errors, causing runtime crashes.
- **`unknown`:** Accepts any value, but TS blocks property access, method calls, or assignments until narrowed via `typeof`, `instanceof`, or type assertions.
- **`never`:** Subtype of every type, but no type is assignable to `never` (except `never` itself). Used for exhaustiveness checks in switch statements.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. any (Unsafe)
let valAny: any = "hello";
valAny.nonExistentMethod(); // ✅ Compiles fine -> Runtime Crash!

// 2. unknown (Safe Top Type)
let valUnknown: unknown = "hello";
// valUnknown.toUpperCase(); // ❌ Compile Error: Object is of type 'unknown'.

if (typeof valUnknown === "string") {
  console.log(valUnknown.toUpperCase()); // ✅ Valid after narrowing!
}

// 3. never (Bottom Type)
function throwError(msg: string): never {
  throw new Error(msg); // Never returns!
}
```

| Type | Assignable to `unknown`? | Assignable from `unknown`? | Allows Arbitrary Property Access? |
| :--- | :--- | :--- | :--- |
| **`any`** | Yes | Yes | Yes (Unsafe) |
| **`unknown`** | Yes | No (Requires Narrowing) | No (Type Safe) |
| **`never`** | Yes | No | No |

**⚠️ Interview Pitfall / Pro-Tip**
- Avoid `any` in production code. Prefer `unknown` for third-party API data or dynamic payloads, forcing callers to safely narrow types before access.


---

### 90. 🔴 P0 [Q] What are union and intersection types, and how do literal types work?

> **TL;DR:** Union types (`A | B`) allow a value to be one of several specified types. Intersection types (`A & B`) combine multiple type definitions into a single composite type requiring all properties. Literal types constrain values to exact specific strings, numbers, or booleans.

**💡 Core Concept & Explanation**
- **Set Theory Math:**
  - **Union ($A \cup B$):** Property access is limited to common properties shared by both types unless narrowed.
  - **Intersection ($A \cap B$):** Combines all properties of both types into a single unified type.
- **Literal Types:** `type Direction = "North" | "South" | "East" | "West";`. Restricts variable assignments exclusively to those exact string values.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Union Types (|)
type Id = string | number;
function printId(id: Id) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // Narrowed to string
  } else {
    console.log(id.toFixed(2)); // Narrowed to number
  }
}

// 2. Intersection Types (&)
interface Person {
  name: string;
}
interface Loggable {
  log(): void;
}

type Employee = Person & Loggable;

const emp: Employee = {
  name: "Alice",
  log() { console.log(this.name); }
};

// 3. String Literal Types
type Theme = "light" | "dark" | "system";
let currentTheme: Theme = "dark"; // ✅ Valid
// currentTheme = "blue"; // ❌ Compile Error!
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Conflicting Intersection Trap:** Intersecting primitive types `type Impossible = string & number` evaluates to `never`, because a value can never be both a string and a number simultaneously.


---

### 91. 🟠 P1 [Q] How do optional properties, null/undefined, and strictNullChecks work, what does strict mode enable, and what does readonly do?

> **TL;DR:** Optional properties (`prop?: T`) permit properties to be `T | undefined`. `strictNullChecks` prevents implicit assignment of `null`/`undefined` to other types. `strict: true` enables full type-checking rigor. `readonly` prevents property reassignment at compile-time.

**💡 Core Concept & Explanation**
- **`strictNullChecks: true`:** Without this flag, `null` and `undefined` are assignable to any type (`let s: string = null;` compiles!). Enabling `strictNullChecks` forces explicit handling of `null` and `undefined`.
- **`readonly` Modifier:** Marks properties or arrays immutable for compiler operations.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Optional Properties & strictNullChecks
interface UserProfile {
  id: number;
  nickname?: string; // Type is: string | undefined
}

function getUpperNickname(user: UserProfile): string {
  // return user.nickname.toUpperCase(); // ❌ Error under strictNullChecks!
  return user.nickname ? user.nickname.toUpperCase() : "ANONYMOUS";
}

// 2. Readonly Properties
interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

const p: Point3D = { x: 10, y: 20, z: 30 };
// p.x = 50; // ❌ Compile Error: Cannot assign to 'x' because it is a read-only property.

// Readonly Array
const readonlyNums: ReadonlyArray<number> = [1, 2, 3];
// readonlyNums.push(4); // ❌ Compile Error: Property 'push' does not exist on type 'ReadonlyArray'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`readonly` Shallow Immutability:** `readonly` prevents reassigning the property reference itself (`p.x = 50`), but does NOT deeply freeze nested object properties at runtime. Use `Object.freeze()` for runtime immutability.


---

### 92. 🔴 P0 [Q] What is type narrowing, and how do typeof, instanceof, in, and custom type predicates (x is T) narrow types?

> **TL;DR:** Type Narrowing refines a broad type (like `string | number` or `unknown`) into a specific concrete type using JavaScript control flow guards (`typeof`, `instanceof`, `in`) or user-defined Type Predicates (`fn(x): x is TargetType`).

**💡 Core Concept & Explanation**
1. **Control Flow Analysis:** TypeScript analyzes conditional code paths (`if`, `switch`, `return`) to narrow variable types automatically within each branch.
2. **Type Guards:**
   - `typeof x === "string"`: Narrows primitive types.
   - `x instanceof ClassName`: Narrows class instances along prototype chain.
   - `'prop' in obj`: Narrows object union types based on key existence.
   - **Custom Type Predicate:** A function returning `param is Type` boolean signature.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Dog { walk(): void; }
interface Fish { swim(): void; }

// Custom Type Predicate (x is Fish)
function isFish(pet: Dog | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Dog | Fish) {
  if (isFish(pet)) {
    pet.swim(); // ✅ TS knows pet is Fish here!
  } else {
    pet.walk(); // ✅ TS knows pet is Dog here!
  }
}

// typeof & instanceof narrowing
function processInput(val: string | Date) {
  if (val instanceof Date) {
    console.log(val.toISOString()); // Narrowed to Date
  } else {
    console.log(val.toUpperCase());  // Narrowed to string
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **`typeof null` Trap:** `typeof null` evaluates to `"object"` in JavaScript! Writing `if (typeof val === "object")` does NOT narrow out `null`. You MUST write `if (val !== null && typeof val === "object")`.


---

### 93. 🟠 P1 [Q] What is a discriminated union, and how do you use never for exhaustive checks?

> **TL;DR:** A Discriminated Union combines object types sharing a common literal property (the "discriminant", e.g. `kind: 'circle' | 'square'`). Matching on the discriminant in a `switch` statement with a `default` case returning a `never` assignment enforces compile-time exhaustiveness checking.

**💡 Core Concept & Explanation**
- **Discriminant Property:** A single shared literal property (e.g. `type`, `kind`, `status`) present on all members of a union.
- **Exhaustiveness Checking with `never`:** If a new variant is added to the union but missing from a `switch` statement, assigning the unhandled variant to a variable of type `never` triggers a compile-time error.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
interface Square {
  kind: "square";
  size: number;
}
interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Square | Triangle;

function assertUnreachable(x: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(x)}`);
}

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size * shape.size;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default:
      return assertUnreachable(shape); // ✅ Ensures all shapes are handled at compile time!
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- If a developer adds a new `Rectangle` shape to the `Shape` union without updating `calculateArea`, the `default: assertUnreachable(shape)` line immediately fails compilation: `Type 'Rectangle' is not assignable to type 'never'`.


---

### 94. 🟠 P1 [Q] How do you type function parameters, return values, optional/default parameters, and callbacks, and what are function overloads?

> **TL;DR:** Function signatures specify parameter types, return types, optional/default args (`(x: number, y = 10) => number`), and callbacks. Function Overloads declare multiple public type signatures backed by a single flexible implementation signature.

**💡 Core Concept & Explanation**
- **Function Overloads:** Useful when a function's return type varies depending on the input parameter types (e.g., passing a `string` returns a `string`, passing a `number` returns a `number`).
- **Implementation Signature:** Must be broad enough to encompass all overload signatures, but is NOT directly visible to consumers.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Function Overload Signatures (Public API)
function format(val: string): string;
function format(val: number): string;
function format(val: boolean): string;

// 2. Single Implementation Signature (Internal)
function format(val: string | number | boolean): string {
  if (typeof val === "string") return val.trim();
  if (typeof val === "number") return `$${val.toFixed(2)}`;
  return val ? "TRUE" : "FALSE";
}

const res1 = format(" hello "); // res1 typed as string
const res2 = format(49.99);     // res2 typed as string

// Callback Function Signature
type EventListenerCallback = (event: string, timestamp: number) => void;
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Overload Implementation Visibility:** The implementation signature `function format(val: any)` is hidden from callers. Callers can ONLY invoke signatures explicitly listed in the top overload declarations.


---

### 95. 🔴 P0 [Q] What are generics, how do you write generic functions, interfaces, and types, and how do generic constraints (extends) work?

> **TL;DR:** Generics enable creating reusable, type-safe code components using Type Variables (`<T>`). Generic Constraints (`<T extends Constraint>`) restrict the set of valid types allowed for a generic parameter.

**💡 Core Concept & Explanation**
- **Type Variables (`<T>`):** Act as placeholders for types passed in by callers or inferred by the compiler.
- **Constraints (`extends`):** Ensures a generic type parameter possesses specific properties (`<T extends { length: number }>`).

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Generic Function
function identity<T>(arg: T): T {
  return arg;
}

// 2. Generic Interface
interface ApiResponse<TData> {
  status: number;
  success: boolean;
  data: TData;
}

interface User { name: string; }
type UserResponse = ApiResponse<User>;

// 3. Generic Constraints (extends)
function logLength<T extends { length: number }>(arg: T): number {
  console.log(arg.length);
  return arg.length;
}

logLength("hello");       // ✅ String has .length property
logLength([1, 2, 3]);     // ✅ Array has .length property
// logLength(123);        // ❌ Compile Error: Argument of type 'number' is not assignable to parameter of type '{ length: number }'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Over-Using Generics:** Do NOT add generic parameters if the type parameter appears only once in the signature without relating to return types or other arguments. Use simple types instead.


---

### 96. 🟠 P1 [Q] How do keyof and indexed access types (T[K]) work, and how do they combine with generics (e.g., a type-safe getProperty function)?

> **TL;DR:** `keyof T` produces a string/symbol union of an object type's keys. Indexed Access `T[K]` extracts the type of property `K` from type `T`. Combining them with generics `<T, K extends keyof T>(obj: T, key: K): T[K]` produces 100% type-safe object property accessors.

**💡 Core Concept & Explanation**
- `keyof User`: If `User` is `{ id: number; name: string }`, `keyof User` is `"id" | "name"`.
- `User["name"]`: Resolves to type `string`.
- `getProperty(user, "name")`: Prevents accessing invalid keys and infers exact return type.

**🛠️ Code / Visual Diagram / Table**

```typescript
interface Car {
  make: string;
  model: string;
  year: number;
}

// Type-Safe Property Accessor Function
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const myCar: Car = { make: "Toyota", model: "Corolla", year: 2022 };

const carMake = getProperty(myCar, "make"); // Inferred as string
const carYear = getProperty(myCar, "year"); // Inferred as number

// getProperty(myCar, "color"); 
// ❌ Compile Error: Argument of type '"color"' is not assignable to parameter of type '"make" | "model" | "year"'.
```

**⚠️ Interview Pitfall / Pro-Tip**
- Combining `keyof T` with dynamic lookup string indexes requires type assertions or mapped constraints when iterating object keys in loops (`(Object.keys(obj) as (keyof T)[]).forEach(...)`).


---

### 97. 🔴 P0 [Q] What do Partial, Required, Pick, Omit, and Record do, and when would you use each?

> **TL;DR:** Built-in Mapped Utility Types transform existing object types: `Partial<T>` makes all fields optional; `Required<T>` makes all fields required; `Pick<T, K>` selects subset keys; `Omit<T, K>` removes specified keys; `Record<K, T>` constructs an object type with key type `K` and value type `T`.

**💡 Core Concept & Explanation**
Under the hood, utility types use Mapped Type syntax:
- `Partial<T>` $
ightarrow$ `{ [P in keyof T]?: T[P] }`
- `Required<T>` $
ightarrow$ `{ [P in keyof T]-?: T[P] }`
- `Pick<T, K extends keyof T>` $
ightarrow$ `{ [P in K]: T[P] }`
- `Omit<T, K>` $
ightarrow$ `Pick<T, Exclude<keyof T, K>>`
- `Record<K extends keyof any, T>` $
ightarrow$ `{ [P in K]: T }`

**🛠️ Code / Visual Diagram / Table**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// 1. Partial<T> -> Useful for UPDATE payloads
type UserUpdatePayload = Partial<User>; // { id?: number; name?: string; email?: string; age?: number; }

// 2. Required<T> -> Forces all optional fields
type StrictUser = Required<User>; // { id: number; name: string; email: string; age: number; }

// 3. Pick<T, K> -> Extracts specific fields
type UserPreview = Pick<User, "id" | "name">; // { id: number; name: string; }

// 4. Omit<T, K> -> Strips specific fields (e.g. create payload without id)
type CreateUserDTO = Omit<User, "id">; // { name: string; email: string; age?: number; }

// 5. Record<K, T> -> Key-Value Dictionary
type RolePermissions = Record<"admin" | "user" | "guest", string[]>;
```

**⚠️ Interview Pitfall / Pro-Tip**
- `Omit` does not enforce that the key being omitted actually exists on `T` (`Omit<User, "invalidKey">` compiles silently). Prefer `Pick` when strict key checking is needed.


---

### 98. 🟠 P1 [Q] What do ReturnType and Parameters do, and when are they useful?

> **TL;DR:** `ReturnType<T>` extracts the return type of a function type `T`. `Parameters<T>` extracts a tuple type of a function type's parameter types. Both use Conditional Types and the `infer` keyword internally.

**💡 Core Concept & Explanation**
- **Third-Party Types:** Essential when working with external libraries that export functions but forget to export internal response payload types.
- **Internal Mechanisms:**
  - `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;`
  - `type Parameters<T> = T extends (...args: infer P) => any ? P : never;`

**🛠️ Code / Visual Diagram / Table**

```typescript
// Third-party API function without exported payload types
function fetchSDKConfig(endpoint: string, retries: number) {
  return {
    endpoint,
    retries,
    timeout: 5000,
    headers: { Authorization: "Bearer token" }
  };
}

// Extract Return Type dynamically!
type SDKConfig = ReturnType<typeof fetchSDKConfig>;
// Result: { endpoint: string; retries: number; timeout: number; headers: { Authorization: string }; }

// Extract Parameters Tuple dynamically!
type FetchParams = Parameters<typeof fetchSDKConfig>;
// Result: [endpoint: string, retries: number]
```

**⚠️ Interview Pitfall / Pro-Tip**
- Passing a direct function instance `ReturnType<fetchSDKConfig>` throws a compile error. You MUST pass the function's type signature using the `typeof` operator: `ReturnType<typeof fetchSDKConfig>`.


---

### 99. 🟠 P1 [Q] What is the difference between an enum and a union of string literals, and what does as const do?

> **TL;DR:** Enums emit runtime JavaScript objects with IIFEs. String literal unions (`'admin' | 'user'`) are zero-cost compile-time types. `as const` creates deeply `readonly` literal type assertions on objects and arrays without runtime code generation.

**💡 Core Concept & Explanation**
- **Enum Drawbacks:** Enums break TypeScript's rule of emitting zero runtime JS code. Numeric enums allow unsafe reverse mapping and invalid assignment numbers (`enum Status { Active }; let s: Status = 999;` compiles!).
- **`as const` Assertions:** Converts mutable types into deeply `readonly` literal types.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. String Union (Preferred - Zero Runtime Overhead)
type UserRole = "admin" | "editor" | "viewer";

// 2. as const Object Pattern (Best Practice)
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer"
} as const;

type Role = typeof ROLES[keyof typeof ROLES]; // "admin" | "editor" | "viewer"

// 3. Enum (Emits IIFE Object Code into JS output)
enum EnumRole {
  Admin = "ADMIN",
  Editor = "EDITOR"
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Prefer `const` object maps with `as const` or string unions over Enums in modern TypeScript codebases to keep emitted JS bundles minimal and prevent enum scoping gotchas.


---

### 100. 🟠 P1 [Q] How do you type an async function that fetches API data, and why should you still validate the response at runtime?

> **TL;DR:** Typing `fetch` responses using generics (`fetch<User>()` or `as User`) only asserts types at compile-time. Because network payloads can change, fail, or return unexpected data, runtime schema validation using libraries like `Zod` or custom Type Predicates is mandatory for production safety.

**💡 Core Concept & Explanation**
- **The API Trust Fallacy:** TypeScript cannot verify network data coming across the HTTP boundary. Type assertions (`const data = await res.json() as UserData`) lie to the compiler, hiding potential runtime `TypeError: Cannot read property of undefined` crashes.

**🛠️ Code / Visual Diagram / Table**

```typescript
import { z } from "zod"; // Schema validation library

// 1. Define Zod Runtime Validation Schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

// Infer TypeScript type automatically from Schema!
type User = z.infer<typeof UserSchema>;

async function fetchUserSafe(userId: number): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  const rawData = await response.json();

  // 2. Validate at RUNTIME! Throws detailed error if schema mismatches payload.
  const validatedUser = UserSchema.parse(rawData);
  return validatedUser;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Writing `const res: User = await fetch(url).then(r => r.json())` does NOT perform runtime checking. If the server returns `{ error: "500 Internal Error" }`, TS still treats `res` as a valid `User` object, crashing downstream code!


---

### 101. 🟠 P1 [Q] What are type assertions (as), what are their risks, and how do you safely handle unknown errors in catch blocks?

> **TL;DR:** Type assertions (`val as TargetType`) override TypeScript's inferred type without performing runtime data conversion. In `catch (err: unknown)` blocks, `err` defaults to `unknown` in modern TS (`useUnknownInCatchVariables`), requiring `instanceof Error` checks for safe error handling.

**💡 Core Concept & Explanation**
- **Type Assertion Risks:** `const num = "123" as unknown as number;` tricks the compiler, but `num.toFixed(2)` crashes at runtime (`TypeError: num.toFixed is not a function`).
- **Safe `catch` Error Handling:** In TypeScript 4+, catch block variables default to `unknown` instead of `any`.

**🛠️ Code / Visual Diagram / Table**

```typescript
// 1. Type Assertion (Use sparingly when caller knows shape better than TS)
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;

// 2. Safe Error Handling in Catch Blocks
async function executeTask() {
  try {
    await performRiskyOperation();
  } catch (err: unknown) { // In strict TS, err is unknown
    // err.message; // ❌ Compile Error: Object is of type 'unknown'.

    if (err instanceof Error) {
      console.error("Task failed cleanly:", err.message, err.stack);
    } else if (typeof err === "string") {
      console.error("String error thrown:", err);
    } else {
      console.error("Unknown error payload:", err);
    }
  }
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- **Non-Null Assertion Operator (`!`):** Writing `user!.name` tells TS "trust me, user is not null". If `user` is actually `null` at runtime, it causes a `TypeError`. Prefer optional chaining `user?.name` instead.


---

[⬅️ Previous: 09 · DSA in JavaScript](09-dsa-in-javascript.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; (end) ⏭️

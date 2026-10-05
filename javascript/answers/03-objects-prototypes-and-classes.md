[⬅️ Previous: 02 · Functions, Closures & this](02-functions-closures-and-this.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Arrays & Error Handling ➡️](04-arrays-iteration-and-error-handling.md)

---

## 3. Objects, Prototypes & Classes

### 25. 🟠 P1 [C] How are objects created and accessed (dot vs bracket notation), how does destructuring work for objects and arrays, and what do Object.keys(), Object.values(), and Object.entries() do?

> **TL;DR:** Objects are created via literals {}, Object.create(), or constructors. Properties are accessed via dot or bracket notation. Destructuring extracts values into variables. Object.keys/values/entries return arrays of own enumerable property keys, values, or [key, value] pairs.

**💡 Core Concept & Explanation**
- **Dot vs Bracket Notation:** Dot (`obj.key`) requires valid static identifiers. Bracket (`obj[key]`) evaluates dynamic expressions or keys with special characters/spaces.
- **Destructuring:** Syntax unpacking array elements or object properties into distinct variables with default value support.
- **Static Object Reflection:**
  - `Object.keys(obj)` $\rightarrow$ `['a', 'b']`
  - `Object.values(obj)` $\rightarrow$ `[1, 2]`
  - `Object.entries(obj)` $\rightarrow$ `[['a', 1], ['b', 2]]`

**🛠️ Code / Visual Diagram / Table**

```javascript
const user = { id: 101, fullName: "Sarah", role: "Admin" };

// Destructuring with renaming & default value
const { fullName: name, role, salary = 50000 } = user;
console.log(name, role, salary); // "Sarah" "Admin" 50000

// Object.entries iteration
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Accessing nested destructured properties when parent object is `undefined` (`const { a: { b } } = null`), throwing `TypeError`.


---

### 26. 🔴 P0 [Q] What is the difference between a shallow and a deep copy, and what are the limitations of spread, Object.assign(), JSON.parse(JSON.stringify(obj)), and structuredClone()?

> **TL;DR:** Shallow copy duplicates top-level properties but retains shared references to nested objects. Deep copy duplicates all levels recursively. Spread and Object.assign create shallow copies; JSON.parse/stringify fails on functions/Date/undefined/circular refs; structuredClone() performs true deep cloning natively.

**💡 Core Concept & Explanation**
**Shallow Copy:** Copies primitive values, but copies heap pointers for nested objects/arrays. Mutating nested values affects the source object!
**Deep Copy:** Recursively clones all nested objects/arrays creating independent heap instances.

**Cloning Techniques & Limitations:**
1. **Spread `{...obj}` / `Object.assign()`:** Shallow copy only.
2. **`JSON.parse(JSON.stringify(obj))`:** Deep copy hack. FAILS on `Date` (converts to string), `RegExp`, `Symbol`, `undefined`, `Function` (stripped out!), and throws Error on Circular References.
3. **`structuredClone(obj)`:** Modern native API. Deep clones circular references, ArrayBuffers, Dates, Maps, Sets. FAILS on functions and DOM nodes.

**🛠️ Code / Visual Diagram / Table**

```javascript
const original = { a: 1, nested: { b: 2 } };

// Shallow Copy
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 (MUTATED!)

// Native Deep Copy with structuredClone
const deep = structuredClone(original);
deep.nested.b = 500;
console.log(original.nested.b); // 99 (SAFE & INDEPENDENT!)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using JSON.stringify for deep cloning objects containing methods, dates, or undefined values.


---

### 27. 🟠 P1 [C] What are object mutation and immutability, and why does Object.freeze() not deeply freeze an object?

> **TL;DR:** Object.freeze() makes an object shallowly immutable (prevents adding, deleting, or modifying top-level properties). It is shallow; nested objects remain mutable unless recursively frozen.

**💡 Core Concept & Explanation**
- **Immutability:** Preventing modifications to an object's state.
- **`Object.freeze(obj)`:** Prevents adding new properties, deleting existing properties, or changing property values/descriptors.
- **Shallow Nature of Freeze:** `Object.freeze` only locks the immediate top-level primitive property bindings. If a property references a nested object, that nested object remains completely mutable!

**🛠️ Code / Visual Diagram / Table**

```javascript
const config = Object.freeze({
  host: "localhost",
  db: { port: 5432 } // Nested object
});

config.host = "127.0.0.1"; // Silently fails or throws in strict mode
console.log(config.host); // "localhost"

config.db.port = 8080; // MUTATED! (Nested objects not frozen)
console.log(config.db.port); // 8080

// Deep Freeze Helper:
function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Assuming `Object.freeze()` performs a deep freeze on nested objects.


---

### 28. 🔴 P0 [Q] What is the prototype chain, how does prototypal inheritance work, and what is the difference between prototype and \_\_proto\_\_?

> **TL;DR:** Every JS object has an internal prototype link to another object. Prototypal inheritance allows objects to inherit properties/methods via this chain. .prototype is the object attached to constructor functions; __proto__ is the internal accessor link on object instances.

**💡 Core Concept & Explanation**
**Prototype Chain Mechanism:**
When looking up a property on an object (`obj.prop`), JS first searches the object's own properties. If not found, it traverses up its `__proto__` link to its prototype object, continuing up the chain until it finds the property or hits `null` (end of chain).

**`prototype` vs `__proto__`:**
- **`fn.prototype`:** Object template property present on constructor functions. Defines properties/methods shared by instances instantiated via `new fn()`.
- **`instance.__proto__`:** Internal accessor property pointing to the prototype object from which the instance inherited.

**🛠️ Code / Visual Diagram / Table**

```javascript
function Animal(name) { this.name = name; }
Animal.prototype.eat = function() { console.log(this.name, "eats."); };

const dog = new Animal("Rex");
dog.eat(); // "Rex eats." (Found on Animal.prototype via prototype chain!)

console.log(dog.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (End of chain)
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `__proto__` directly in production code (deprecated). Use `Object.getPrototypeOf(obj)` and `Object.setPrototypeOf(obj)` instead.

---

## Classes & Structures

---

### 29. 🟠 P1 [Q] What happens internally when new is used, and how do constructor functions and Object.create() relate to it?

> **TL;DR:** When new Fn() is called: 1) A new empty object is created, 2) Its __proto__ is linked to Fn.prototype, 3) Fn is executed with this set to the new object, 4) The object is returned (unless Fn returns its own explicit object).

**💡 Core Concept & Explanation**
**The 4 Steps of the `new` Operator:**
1. Creates a brand new empty plain JavaScript object `{}`.
2. Links the new object's `__proto__` to the constructor's `prototype` property (`obj.__proto__ = Constructor.prototype`).
3. Binds the new object as `this` context for the constructor function and executes the constructor code.
4. If the constructor returns a non-primitive object, that object is returned. Otherwise, the created instance object is returned automatically.

**🛠️ Code / Visual Diagram / Table**

```javascript
function CustomNew(Constructor, ...args) {
  // Step 1 & 2: Create object & link prototype
  const instance = Object.create(Constructor.prototype);
  
  // Step 3: Execute constructor with this = instance
  const result = Constructor.apply(instance, args);
  
  // Step 4: Return object
  return (typeof result === 'object' && result !== null) ? result : instance;
}
```

**⚠️ Interview Pitfall / Pro-Tip**
- Forgetting `new` when calling a constructor function (`const user = User()`), causing `this` to point to global `window` and polluting global variables!


---

### 30. 🟠 P1 [C] How do classes relate to prototypes, and how do extends, super, static methods, method overriding, getters/setters, and #private fields work?

> **TL;DR:** ES6 classes are syntactic sugar over prototypal inheritance. extends sets up prototype links; super calls parent constructor/methods; static methods belong to the class itself; #private fields are encapsulated at runtime.

**💡 Core Concept & Explanation**
**Class Core Architecture:**
ES6 `class` syntax is syntactic sugar over prototype delegation.
- **`extends`:** Links `SubClass.prototype.__proto__ = SuperClass.prototype`.
- **`super(...)`:** Invokes parent constructor inside child constructor (mandatory before using `this`).
- **`static`:** Attaches methods directly to class function object (`Class.method`), not instance prototype.
- **`#private`:** Hard private fields enforced by JS engine runtime (accessing outside class throws SyntaxError).

**🛠️ Code / Visual Diagram / Table**

```javascript
class BankAccount {
  #balance = 0; // Truly Private Field

  constructor(owner, initial) {
    this.owner = owner;
    this.#balance = initial;
  }

  deposit(amount) { this.#balance += amount; }
  getBalance() { return this.#balance; }
}

const acc = new BankAccount("Alice", 100);
acc.deposit(50);
console.log(acc.getBalance()); // 150
// console.log(acc.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using `this` inside child constructor before calling `super()` (throws `ReferenceError`).


---

### 31. 🟠 P1 [Q] When would you use a Map or Set instead of an object or array, and how do you remove duplicates from an array with a Set?

> **TL;DR:** Map accepts keys of any data type and maintains insertion order. Set stores unique values of any type. Use Set with Array.from() or spread to remove array duplicates in O(N) time.

**💡 Core Concept & Explanation**
- **Map vs Object:** Objects only accept String/Symbol keys. Maps accept any type (objects, functions, primitives) as keys, preserve insertion order, and have built-in `.size` property.
- **Set:** Collection of unique values. Prevents duplicate entries automatically using SameValueZero algorithm.

**🛠️ Code / Visual Diagram / Table**

```javascript
// Deduplicating Array with Set
const nums = [1, 2, 2, 3, 4, 4, 5];
const uniqueNums = [...new Set(nums)]; // [1, 2, 3, 4, 5]

// Map with Object Keys
const keyObj = { id: 1 };
const map = new Map();
map.set(keyObj, "User Data Payload");
console.log(map.get(keyObj)); // "User Data Payload"
```

**⚠️ Interview Pitfall / Pro-Tip**
- Using objects as Map keys in plain Objects (`obj[keyObj]`), which converts keyObj to string `'[object Object]'`, overwriting other object keys!

---

## Array Methods & Iteration

---

[⬅️ Previous: 02 · Functions, Closures & this](02-functions-closures-and-this.md) &nbsp;|&nbsp; [📋 Index](../javascript-interview-answers.md) &nbsp;|&nbsp; [Next: 04 · Arrays & Error Handling ➡️](04-arrays-iteration-and-error-handling.md)

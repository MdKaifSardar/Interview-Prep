# Java & Object-Oriented Programming (OOP) Technical Interview Master List (40 Questions)

**Track:** Fresher → 0–1 YOE → Junior Backend / Software Engineer / Enterprise Java

## Legend

**Priority** — 🔴 P0 Essential (Highest frequency / interview ROI) · 🟠 P1 Important (Mid-level differentiators)

**Type** — [C] Conceptual · [Q] Code/Mechanism · [D] Architecture/Design · [P] Performance/Optimization

---

## 1. OOP Foundations in Java

1. 🔴 P0 [C] What are the four core pillars of Object-Oriented Programming (Encapsulation, Abstraction, Inheritance, Polymorphism), and how does Java specifically implement and enforce each one?
2. 🔴 P0 [Q] What is the difference between compile-time polymorphism (method overloading) and runtime polymorphism (method overriding), and how does the JVM resolve overridden methods at runtime using the Virtual Method Table (vtable) and dynamic method dispatch?
3. 🔴 P0 [C] Why does object-oriented design favor Composition over Inheritance ("HAS-A" vs "IS-A"), and why does Java intentionally forbid multiple inheritance of classes (the Diamond Problem)?
4. 🟠 P1 [Q] What is the difference between `super()` and `this()`, and can you override `private`, `static`, or `final` methods in Java? Why or why not?
5. 🟠 P1 [D] What are the five SOLID design principles, and how do you concretely apply each principle in Java object-oriented architecture?

---

## 2. Interfaces, Abstract Classes & Modern Types

6. 🔴 P0 [Q] What is the exact difference between an `abstract class` and an `interface` in Java, and what design heuristics dictate choosing one over the other?
7. 🔴 P0 [C] How did Java 8 and Java 9 expand interfaces with `default`, `static`, and `private` methods, and how does the compiler resolve multiple inheritance conflicts between two interfaces with identical default methods?
8. 🟠 P1 [C] What is a Functional Interface, what does the `@FunctionalInterface` annotation enforce, and what are the standard built-in functional interfaces in `java.util.function` (`Predicate`, `Function`, `Consumer`, `Supplier`)?
9. 🟠 P1 [C] What are Marker Interfaces (e.g., `Serializable`, `Cloneable`, `Remote`), how do they work without declaring any methods, and why have modern annotations largely replaced them?
10. 🟠 P1 [C] What are Records (`record`, Java 16+) and Sealed Classes (`sealed`/`permits`, Java 17+), and how do they eliminate boilerplate and restrict algebraic class hierarchies?

---

## 3. Core Java & JVM Architecture

11. 🔴 P0 [C] What is the architectural difference between the JDK, JRE, and JVM, and how does the JIT (Just-In-Time) compiler optimize Java bytecode into native machine code at runtime?
12. 🔴 P0 [C] What is the difference between Stack Memory and Heap Memory in the JVM, what resides in each, and what runtime errors occur when either is exhausted (`StackOverflowError` vs `OutOfMemoryError`)?
13. 🔴 P0 [Q] Is Java pass-by-value or pass-by-reference? What exact memory manipulation occurs when an object reference is passed to a method and reassigned versus when its internal fields are mutated?
14. 🟠 P1 [C] What are Java's four access modifiers (`public`, `protected`, default/package-private, `private`), and what is their visibility across packages and subclasses?
15. 🟠 P1 [Q] What does the `final` keyword enforce when applied to a local variable/field, a method, and a class?

---

## 4. Object Equality, Immutability & Strings

16. 🔴 P0 [Q] What is the contract between `equals()` and `hashCode()` in `java.lang.Object`, what breaks if you override `equals()` without `hashCode()` when using hash-based collections (`HashMap`, `HashSet`), and how does `==` differ from `.equals()`?
17. 🔴 P0 [Q] Why are `String` objects immutable in Java, how does the String Constant Pool save memory, and what are the performance and thread-safety differences between `String`, `StringBuilder`, and `StringBuffer`?
18. 🔴 P0 [Q] How do you construct a truly immutable class in Java (the 5 essential design rules: `final class`, private final fields, no setters, deep copy in constructor, deep copy in getters)?

---

## 5. Memory Management & Garbage Collection

19. 🔴 P0 [C] How does Garbage Collection work in HotSpot JVM (Generational hypothesis: Young Gen Eden/Survivor spaces vs Old Gen / Tenured), and what constitutes a Garbage Collection Root (GC Root)?
20. 🟠 P1 [C] Can a memory leak still occur in Java despite automatic Garbage Collection? Provide real-world scenarios (unclosed streams, static collection buildup, improper `equals`/`hashCode` keys, thread-local variables).
21. 🟠 P1 [C] What does `System.gc()` do, why is the `finalize()` method deprecated and dangerous, and what modern alternative (`Cleaner` / `PhantomReference`) does Java provide?

---

## 6. Exception Handling & Resource Safety

22. 🔴 P0 [C] What is the Java Exception hierarchy (`Throwable` → `Error` vs `Exception`), and what is the exact operational and architectural difference between Checked Exceptions and Unchecked (Runtime) Exceptions?
23. 🔴 P0 [Q] How does `try-with-resources` work, what contract does the `AutoCloseable` interface mandate, and how are suppressed exceptions handled when both the try-block and auto-close throw?
24. 🟠 P1 [Q] Does the `finally` block always execute in Java? In what specific JVM edge-case scenarios will `finally` fail to run?

---

## 7. Java Collections Framework

25. 🔴 P0 [D] What is the structural hierarchy of the Java Collections Framework (`Iterable` → `Collection` → `List`, `Set`, `Queue`, and the separate `Map` hierarchy)?
26. 🔴 P0 [P] What are the differences between `ArrayList` and `LinkedList` regarding underlying data structures, time complexity for indexing vs insertions/deletions, and cache locality?
27. 🔴 P0 [Q] How does `HashMap` work internally in Java 8+ (hashing function, bucket indexing, collision resolution via singly-linked lists, and treeification into Red-Black Trees at `TREEIFY_THRESHOLD = 8`)?
28. 🔴 P0 [Q] What is the difference between `HashMap`, `Hashtable`, and `ConcurrentHashMap`? How does `ConcurrentHashMap` achieve thread-safe reads and writes without locking the entire map (CAS + synchronized bucket heads)?
29. 🟠 P1 [Q] What is the difference between `Comparable<T>` (`compareTo`) and `Comparator<T>` (`compare`), and how do you write custom sorting logic using lambda comparator chains?
30. 🟠 P1 [C] Why does a `Set` reject duplicate elements, and how does `HashSet` internally leverage a backing `HashMap` and dummy presentation object (`PRESENT`) to achieve its guarantees?

---

## 8. Generics & Type Safety

31. 🔴 P0 [C] What is Type Erasure in Java Generics, why was it implemented for backward compatibility with pre-Java 5 bytecode, and why does it prevent generic array creation (`new T[]`) or primitive type arguments?
32. 🟠 P1 [Q] What are upper-bounded (`? extends T`) and lower-bounded (`? super T`) wildcards, and how does the PECS guideline ("Producer Extends, Consumer Super") dictate their usage in API design?

---

## 9. Multithreading & Concurrency Basics

33. 🔴 P0 [Q] What are the different ways to create and execute a thread in Java (`Thread` class, `Runnable` interface, `Callable<V>` interface), and what is the difference between calling `.start()` versus `.run()`?
34. 🔴 P0 [Q] How does the `synchronized` keyword work in Java (method vs block locking, monitor locks, reentrancy), and what four conditions must be met for a Deadlock to occur?
35. 🔴 P0 [Q] What guarantees does the `volatile` keyword provide under the Java Memory Model (Visibility and Instruction Reordering prevention / happens-before relationship), and why does `volatile` NOT guarantee atomicity (e.g., `count++`)?
36. 🟠 P1 [D] What is the `ExecutorService` and Thread Pool pattern, what are the common thread pool factory types in `Executors`, and why should production applications avoid unbounded thread pools?
37. 🟠 P1 [C] What are Virtual Threads (Project Loom, Java 21+), how do they decouple carrier OS threads from lightweight user-mode tasks, and how do they alter high-throughput server architecture?

---

## 10. Java 8+ Functional Programming & Modern Features

38. 🔴 P0 [Q] How does the Java Streams API work (Source → Intermediate Operations → Terminal Operation), why are streams lazy, and how do Streams differ from traditional Collections?
39. 🔴 P0 [Q] What are the mechanics and differences between common Stream operations: `map()`, `filter()`, `flatMap()`, `reduce()`, and `collect()` (`Collectors.groupingBy`, `toList`)?
40. 🟠 P1 [Q] What is `Optional<T>`, what problems was it designed to solve, and what anti-patterns should be avoided when using it (e.g., calling `.get()` without check, serializing `Optional`, using it in method parameters or field members)?

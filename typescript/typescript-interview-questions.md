# TypeScript Full-Stack & GenAI Technical Master List (50 Questions)

**Track:** Fresher → 0–1 YOE → Junior Full Stack / Backend / Frontend / Startup

## Legend

**Priority** — 🔴 P0 Essential (Highest startup/interview ROI) · 🟠 P1 Important · 🟡 P2 Advanced / Worst-case

**Type** — [C] Conceptual · [Q] Code/Type Mechanic · [D] Architecture/Design · [P] Performance/Config

---

## 1. TypeScript Fundamentals

1. 🔴 P0 [C] What is TypeScript, and what problems does it solve compared with JavaScript?
2. 🔴 P0 [C] What is the difference between compile-time type checking and runtime validation? Why can't TypeScript itself validate runtime data?
3. 🔴 P0 [Q] What is type inference, and when does TypeScript infer a type versus requiring an annotation?
4. 🔴 P0 [C] What is structural typing, and how does it differ from nominal typing?
5. 🟠 P1 [Q] What is excess property checking, and why can an object literal fail assignment while an intermediate variable succeeds?

---

## 2. Types, Interfaces, and Object Shapes

6. 🔴 P0 [C] What is the difference between type and interface? When would you use each?
7. 🔴 P0 [C] What are union types, intersection types, and literal types?
8. 🔴 P0 [Q] What are optional properties and readonly properties? What does readonly actually guarantee?
9. 🔴 P0 [Q] What are tuples, and how are they different from arrays?
10. 🟠 P1 [C] What is declaration merging, and why is it one reason to use interface?
11. 🟠 P1 [Q] What are index signatures such as [key: string]: T, and when are they useful?

---

## 3. Type Safety and Narrowing

12. 🔴 P0 [C] What are any, unknown, and never? What are their practical differences?
13. 🔴 P0 [Q] What is type narrowing, and how does TypeScript use control-flow analysis and runtime checks to narrow types?
14. 🔴 P0 [Q] What is a user-defined type guard? Explain value is SomeType.
15. 🔴 P0 [Q] What are discriminated unions, and why are they useful?
16. 🔴 P0 [C] What is the difference between null and undefined, and what does strictNullChecks change?
17. 🟠 P1 [C] What is void, and how is it different from undefined and never?

---

## 4. Generics

18. 🔴 P0 [C] What are generics, and why are they preferable to any in many situations?
19. 🔴 P0 [Q] What does T extends U mean in a generic constraint?
20. 🔴 P0 [C] How does generic type inference work?
21. 🔴 P0 [Q] How would you design getProperty<T, K extends keyof T>(obj, key) while preserving the T[K] relationship?
22. 🟠 P1 [Q] What are generic default type parameters, and when are they useful?

---

## 5. Type Operators and Assertions

23. 🔴 P0 [Q] What is keyof, and how is it used with generics?
24. 🔴 P0 [Q] What are indexed access types such as T[K]?
25. 🔴 P0 [Q] What is typeof when used in a type position?
26. 🔴 P0 [Q] What is a type assertion (as)? Does it perform runtime conversion or validation?
27. 🟠 P1 [Q] What is as const, and how does it affect literal types and readonly behavior?
28. 🟠 P1 [Q] What is the satisfies operator, and how is it different from a type annotation and as?

---

## 6. Utility Types

29. 🔴 P0 [Q] What are Partial, Required, Readonly, Pick, and Omit?
30. 🔴 P0 [Q] What are Record, Exclude, Extract, and NonNullable?
31. 🔴 P0 [Q] What are ReturnType, Parameters, and Awaited used for?

---

## 7. Runtime Data, APIs, and GenAI

32. 🔴 P0 [D] Why doesn't a TypeScript interface or type validate an API response or LLM response at runtime?
33. 🟠 P1 [D] How does a runtime schema validator such as Zod complement TypeScript?
34. 🟠 P1 [Q] How do you derive a TypeScript type from a Zod schema using z.infer?
35. 🟠 P1 [D] How would you type structured LLM output so that the runtime validation schema and TypeScript type remain consistent?
36. 🟠 P1 [Q] How would you model arbitrary or recursive JSON data in TypeScript?
37. 🟠 P1 [Q] How do you type asynchronous streams using AsyncIterable, AsyncIterator, or AsyncGenerator?

---

## 8. TypeScript Configuration and Modules

38. 🔴 P0 [P] What does strict in tsconfig.json mean, and what important checks does it enable?
39. 🟠 P1 [P] What are the important tsconfig.json options for a Node/Next.js project, particularly module, moduleResolution, esModuleInterop, paths, and skipLibCheck?
40. 🟠 P1 [P] What are declaration files (.d.ts), and why are they needed?
41. 🟠 P1 [D] What is module augmentation, and how would you use it to extend types from a third-party library such as Express.Request?
42. 🟠 P1 [Q] What are TypeScript enums, how do they behave at runtime, and what are alternatives such as objects with as const?

---

## 9. Advanced TypeScript

43. 🟠 P1 [Q] What are conditional types? Explain the T extends U ? X : Y pattern.
44. 🟠 P1 [Q] What is infer in conditional types? Give a practical example.
45. 🟠 P1 [Q] What are mapped types, and how can you create your own utility type with them?
46. 🟠 P1 [P] What is noUncheckedIndexedAccess, and how does it affect expressions such as arr[i]?
47. 🟡 P2 [Q] What are distributive conditional types, and when can they produce surprising results?
48. 🟡 P2 [Q] What are template literal types, and what practical problems can they solve?
49. 🟡 P2 [C] What are abstract classes and implements in TypeScript, and how do they differ from extends?
50. 🟡 P2 [C] What are the practical implications of TypeScript's variance and function parameter assignability?

---
